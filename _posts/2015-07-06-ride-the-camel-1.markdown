---
layout: post
title: "Getting started with Apache Camel"
date: 2015-07-22 21:11:55 +0200
comments: true
categories: Camel, Java, Integration
---

#### Context
Any application in an enterprise context, regardless how small this context might be, must relate with other systems. These systems might be File system, databases, webservices, message queues, logging systems, or systems using a particular communication protocol. Moreover, data typically undergo transformations, switching and routing logics before reaching other systems. The variety of combinations this allows is enormous, and tackling each of these in a hand made, custom way might easily become an integration nightmare. _Enterprise Integration Patterns_ (EIP) establish a standard way to describe and identify the different approaches that one can follow to deal with an integration problem (see [http://www.enterpriseintegrationpatterns.com](http://www.enterpriseintegrationpatterns.com)). They establish a common vocabulary that can be used unambiguously when talking about integration. If we consider that integration solutions are ubuquitous in application development, we realize easily how convenient it might be to have solid foundations on this subject.

[Apache Camel](http://camel.apache.org/) is a framework that implements EIPs through a very expressive DSL, so one can translate almost immediately any EIP to a corresponding expression in the DSL. Moreover, Camel provides an extensible set of components that allows you to deal with basically any system that might come at hand. A key feature of Camel is that it deals with a _normalized message format_, so after the consumption point the message has a standard format, e.g. it can be handled identically either if it comes from consuming from a JMS queue or from a SOAP or REST webservice.

It is easier to grasp the concepts setting up a simple Camel project and seeing these features at work.

Camel is a Spring-based framework, so the easiest way to use it is to include it in your Spring context. We will use Camel 2.15.1 that provides a way to setup a Camel-based application without the need of xml configuration.

#### Maven Dependencies
First of all let's include the dependencies in our `pom.xml`:

```xml
    <dependencies>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
            <scope>test</scope>
        </dependency>

        <!-- camel -->
        <dependency>
            <groupId>org.apache.camel</groupId>
            <artifactId>camel-core</artifactId>
            <version>${camel.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.camel</groupId>
            <artifactId>camel-spring</artifactId>
            <version>${camel.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.camel</groupId>
            <artifactId>camel-spring-javaconfig</artifactId>
            <version>${camel.version}</version>
        </dependency>
    </dependencies>

```

`camel-core` provides the essence of the camel infrastructure and basic components, `camel-spring` and `camel-spring-javaconfig` provide the classes and annotations that allow us to configure and run Camel within a Java-configured Spring application.

####  Embed Camel in a bootable application
The `org.apache.camel.spring.javaconfig.CamelConfiguration` abstract class can be used as a base Spring configuration class, where we can reference all the beans we might need in the standard Spring way (xml or annotations based). The additional thing that this class does is loading a `CamelContext` and injecting any bean that extends `RouteBuilder` available in the Spring context, in the `CamelContext`. More about the `CamelContext` will follow along the article.
To give ourselves some more flexibility we will also use a standard xml Spring configuration file.

The simplest configuration of such an application boils down to:

```java
/**
 * We extend CamelConfiguration so we can build a Camel Context using purely annotated classes
 *
 */
@Configuration
public class Boot extends CamelConfiguration {

    public static void main( String[] args ) throws Exception {
        Main main = new Main();
        //use any route builder and components declared within this package
        main.setFileApplicationContextUri("classpath:/spring/spring.xml");
        main.setBasedPackages("nl.sytac.edu");
        main.run();
    }

    @Bean
    public RouteBuilder getSimpleRouteBuilder() {
        return new SimpleRouteBuilder();
    }
}
```

#### Integrating Camel in an existing (web) application
If you want to integrate Camel in an existing application, injecting a `CamelContext` in an existing Spring application context is pretty straightforward, see e.g. [https://github.com/pierangeloc/webshop-camel-springmvc](https://github.com/pierangeloc/webshop-camel-springmvc) for an example of how to integrate Camel within an existing web application.

### Simple Example
Now that we outlined the base structure of a Camel-based application, let's try to put this at work and build a simple application. The purpose is just to show how we can have a working application with minimum effort. Let us suppose we have a simple ERP application that provides us periodically with an updated stock situation about our e-shop, and we want to provide this information to a third application, e.g. an analytics application. We want to expose a simple REST service, with one URL and supporting only POST method. The aim is to persist the body of our POST call in a file, in a configured location. A file will be created for every request.

#### Setup Rest Endpoint
The most convenient way to expose or consume a REST or SOAP webservices in Camel is to use the CXF component. With CXF we can use `JAX-RS` and `JAX-WS` annotations to configure the service classes.

The first thing we must do is to setup the serving class that describes the resource we want to expose:

```java
package io.sytac.edu.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 * Service class for our REST endpoint
 */

@Path("/inventory/status")
public class InventoryResource {

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Response updateStatus(String status) {
        return null;
    }
}
```

We provided a trivial implementation of the method, as the real implementation of the logic will be delegated to the route we are about to create. The JAX-RS annotations allow us to specify in a transparent way the supported content types, having the implementation actually enforcing them.
To make the endpoint available to our route, the most flexible way is to create a CXF bean that delegates to it, and to set it in our Spring context:

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:cxf="http://camel.apache.org/schema/cxf"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
              http://camel.apache.org/schema/cxf http://camel.apache.org/schema/cxf/camel-cxf.xsd
              http://camel.apache.org/schema/spring http://camel.apache.org/schema/spring/camel-spring.xsd">

        <cxf:rsServer id="restInventory" address="http://localhost:8000/services"
                serviceClass="io.sytac.edu.rest.InventoryResource" loggingFeatureEnabled="true"/>

</beans>
```

Here we created a `cxf:rsServer` bean as we want it to serve requests, and specified the hostname, port, base url. The `serviceClass` attribute points to the class we defined above. Again, the implementation of this class is just ignored as the real processing of the request is specified in the route, which we are about to explore.

#### Routing
Routes are specified in Camel by extending the abstract class  `RouteBuilder`, which provides all the Camel DSL goodness. All we have to do is implement the `configure() ` method and specify the route(s). A route has one _consumer endpoint_, representing the point the processing starts from, and one or more _producer endpoints_, to represent delegation steps outside the present route, typically using _Camel components_.
In our case we want to consume requests coming to our REST resource, therefore we will specify this circumstance in the `from`. The [`cxfrs`](http://camel.apache.org/cxfrs.html) component is used to expose or consume rest services through CXF. Being used in a `from` clause means it is acting as a REST server. The _transport layer_ is provided in our case by a _Jetty server_ that we embed in our application, but a standard Servlet transport could be used as well when running within a container.

After the `from(...)` we specify the EIP that must be applied in our processing logic, and the DSL provides a natural and straightforward way to do so.
A simple, dummy  implementation of this concept applied to our use case results in this initial version of our route builder, that defines one route that accepts any JSON request and replies with a static JSON response.
This allows us to inspect how a `Processor` works in Camel. All the processing steps in Camel are essentially done through a chain of `Processor` implementations, each acting on a mutable instance of `Exchange` (we will get back later to the details of the `Exchange`). The DSL implicitly introduces processors in a transparent way, however in an explicit `Processor` we can access directly the structure of the `Exchange`. To some extent we can do this also through the DSL, and in general using the DSL gives us a more consistent view of the processing, without the need to inspect the details of a specific `Processor` implementation.

```java

@Component
public class SimpleRouteBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        from("cxfrs:bean:restInventory")
            .routeId("restInventoryRoute")
            .process(
                new Processor() {
                    public void process(Exchange exchange) throws Exception {
                        exchange.getOut().setBody(
                                Response.ok().entity(
                                    "{\n" +
                                    "  \"status\": \"OK\",\n" +
                                    "  \"message\": \"stock update received\"\n" +
                                    "}").build());
                    }
                }
            );
    }
}

```

If you [run the code at this check-point](https://github.com/sytac/camel-handson/commit/3a83bd88e6b4e9742d8330413ae5bcb2205ebba6) you will see that the server is running and it accepts only JSON POST, replying always with the same message.

What happened exactly along the route?

The `cxf` component accepted the request, and mapped the body of the request in the body of the `In` message of the `Exchange`, and the request headers in equivalent message headers. At this point any processing step deals with the _normalized message structure_ being the `Exchange`, and can access it and modify being completely agnostic of where it comes from (it could come equivalently from consuming a JMS queue) or where it will go to (file system or DB).

The equivalent version that uses purely DSL constructs looks like this:

```java
@Component
public class SimpleRouteBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        from("cxfrs:bean:restInventory")
            .routeId("restInventoryRoute")
            .setBody(constant("{\n" +
                                "  \"status\": \"OK\",\n" +
                                "  \"message\": \"stock update received\"\n" +
                                "}"))
        ;
    }
}

```

or even better, using Jackson as a provider for CXF i.e. having the whole serialization being handled behind the scenes:

```java
@Component
public class SimpleRouteBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        from("cxfrs:bean:restInventory")
            .routeId("restInventoryRoute")
            .setBody(constant(new Response("Ok", "stock update received")));
    }
}
```

This requires only a slight complication on the configuration of the `rsServer`, to set the provider to a Jackson bean. In any case this pays off in terms of conciseness and clarity.

[Code check-point](https://github.com/sytac/camel-handson/commit/176bfd4949db3b5655827fdfa3259758326c15d0)


#### Persisting the message to a file
After this diversion on the routing logic, let's focus again on our use case. We want to persist each JSON message we receive through the request body into a file, and we want a new file for each request to be written. The camel [File component](https://camel.apache.org/file2.html) provides a flexible and straightforward way to do so. We must simply introduce a step that sends the `Exchange` to the `file` component, that takes care of all the boilerplate and tricky parts we have to deal with when writing on file system in a concurrent environment.

```java
@Component
public class SimpleRouteBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        from("cxfrs:bean:restInventory")
            .routeId("restInventoryRoute")
            .to("file:///tmp/inventory?fileName=inventory-${date:now:yyyyMMdd@HHmmssSS}.json")
            .setBody(constant(new Response("Ok", "stock update received")));
    }
}
```

In general components in Camel are addressed by means of a url where the protocol represents the component we want to use, followed by a base url and a query string to configure and tweak the component itself. In this case we instruct `file` on how to create the file name, by means of the _simple expression language_ which is very useful in Camel when we have to deal with dynamic content. In this case we want the file name to contain a simple timestamp.
If we run this example, we can see that for every request there is a new file created and saved with the name we defined. We didn't have to bother about serializing/deserializing anything, as Camel did this for us. It is even possible to configure the components to deal properly with _streaming_ situations, e.g. when we have to upload resources.

[Code check-point](https://github.com/sytac/camel-handson/commit/ec3b524e495b630154a5cbbc6ce89d8a7d39edee)

#### Persisting the message to a file and to MongoDB
Let us suppose we want to store the incoming JSON on a MongoDB collection instead of file system. Of course Camel provides us with a component for this case, just it requires us to add an extra dependency:

```XML
    <dependency>
        <groupId>org.apache.camel</groupId>
        <artifactId>camel-mongodb</artifactId>
        <version>${camel.version}</version>
    </dependency>
```

Then we must just configure a `MongoClient` bean in our Spring context:

```java
    @Bean(name = "mongoClient")
    public Mongo mongoDb() throws UnknownHostException {
        //default port on localhost
        return new MongoClient("localhost", 27017);
    }
```

and then the ceremony is over. All we are left to do is replacing our `file` component with a `mongodb` component, configured to use the `mongoClient` bean above defined, and to use the `inventory` database, with `updates`  as collection, and `save` operation (as we are saving our data in the collection).

```java
@Component
public class SimpleRouteBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        from("cxfrs:bean:restInventory")
            .routeId("restInventoryRoute")
            .to("mongodb:mongoClient?database=inventory&collection=updates&operation=save")
            .setBody(constant(new Response("Ok", "stock update received")));
    }
}
```

If we run this code we can see that for every POST to our REST api we have an insertion on our database.
[Code check-point](https://github.com/sytac/camel-handson/commit/b85dc966736fc4bc669fbbc2f7b80050dfa4661b)


We can even decide to store the message both on file system and on Mongo, and the route looks like this:

```java
@Component
public class SimpleRouteBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        from("cxfrs:bean:restInventory")
            .routeId("restInventoryRoute")
            .to("file:///tmp/inventory?fileName=inventory-${date:now:yyyyMMdd@HHmmssSS}.json")
            .to("mongodb:mongoClient?database=inventory&collection=updates&operation=save")
            .setBody(constant(new Response("Ok", "stock update received")));
    }
}
```

[Code check-point](https://github.com/sytac/camel-handson/commit/0f72b67e863b4f0415955938d89e9184a47fcf3b)

#### Adding routing logic
In the previous example we have stored the same message both on DB and filesystem. We might think to split the incoming message based on its structure, and store e.g. some jeans related stock information on DB and the shoes related information on filesystem.

For this kind of purposes an easy approach is to introduce a `when` clause where we can specify `jsonpath` expressions that our input message must match in order to be treated the way we need.
For this exercise we will deal with shoes inventory updates that will be persisted on file:

```json
{
    "shoes": [{
                "name": "Nike AIR",
                "description": "Running shoes",
                "DC1": 13,
                "DC2": 23
            },
            {
                "name": "Adidas Ultra Boost",
                "description": "Running shoes",
                "DC1": 7,
                "DC2": 3
            },
            {
                "name": "TOD's Suede",
                "description": "Sneakers",
                "DC1": 3,
                "DC2": 9
            }
    ]
}
```

and jeans inventory messages that will be persisted on DB:

```json
{
    "jeans": [{
                "name": "Levi's 501",
                "description": "Blue jeans",
                "DC1": 32,
                "DC2": 10
            },
            {
                "name": "Diesel",
                "description": "Blue jeans",
                "DC1": 11,
                "DC2": 7
            }
    ]
}
```

We want also to deal with messages that do not conform to any of these 2 options, saving them in corresponding error files (we could also send them alternatively to a _dead letter queue_) .

The solution is very straightforward, it just might take a bit if you are new to jsonpath expressions:

```java
@Component
public class SimpleRouteBuilder extends RouteBuilder {

    public static final String FILE_INVENTORY_ENDPOINT = "file:///tmp/inventory?fileName=inventory-${date:now:yyyyMMdd@HHmmssSS}.json";
    public static final String MONGO_INVENTORY_ENDPOINT = "mongodb:mongoClient?database=inventory&collection=updates&operation=save";
    public static final String FILE_ERROR_ENDPOINT = "file:///tmp/inventory?fileName=error-${date:now:yyyyMMdd@HHmmssSS}.json";

    @Override
    public void configure() throws Exception {
        from("cxfrs:bean:restInventory")
            .routeId("restInventoryRoute")
                .choice()
                    .when().jsonpath("$[?(@.shoes)]")
                        .to(FILE_INVENTORY_ENDPOINT)
                    .when().jsonpath("$[?(@.jeans)]")
                        .to(MONGO_INVENTORY_ENDPOINT)
                    .otherwise()
                        .to(FILE_ERROR_ENDPOINT)
                .end()
            .setBody(constant(new Response("Ok", "stock update received")));
    }
}
```

The `choice` clause allows us to specify any predicate or expression we might want to evaluate on the incoming `Exchange`, in this case as we know we are dealing with JSON body so we make direct use of the [`jsonpath`](http://goessner.net/articles/JsonPath/) construct. Camel Expression language is very rich and it might be subject of a future post.

[Code check-point](https://github.com/sytac/camel-handson/commit/f3e17df4b817da441550aa9eab58fed07a0ae0b6)


At this point I think the concept about Camel routing is pretty clear, and you can appreciate how easy it is to make use of the components and of the routing logic. Just looking at the DSL we can understand and reason about the processing steps our data go through. In a future post we will explore further some of the DSL routing features, e.g. how to handle errors or perform testing.

I will close this article with an overview of the structural foundations of Camel and recurring concepts that will appear any time you have to deal with it.

### Camel foundations
Camel is built around some key concepts that we will try to explain in this section: `CamelContext`, `RouteBuilder`, `Endpoint` `Exchange`, `Message`, `ProducerTemplate`

#### `CamelContext`
The foundation on top of which all the Camel machinery runs is the `CamelContext`, which is in control of the lifecycle of the routes and messages running on it. A `CamelContext` can be started/suspended/resumed/stopped, and it provides a number of configuration tweaks, e.g. to handle the underlying `ExecutorService`.
A `CamelContext` can manage many _routes_, which represent processing paths for _messages_.

#### `RouteBuilder`
A `Route` is a description of the processing steps a message can encounter. A route starts from a _consumer_ endpoint that consumes messages and processes them, and can end to a _producer_ endpoint if the messages must result in an outcome of some type (e.g. a call to a webservice, or a message on a JMS queue). The standard way to create a `Route` in Camel is to inject a `RouteBuilder` in the `CamelContext` and override its `define()` method.
The `RouteBuilder` class provides the Camel DSL which makes the implementation of EIP straightforward. We will see later a few examples of routes.

#### `Endpoint`
A `Route` could not process messages without a source of these messages, which is a _consumer_ endpoint, and without a destination to which messages can be delivered after being processed, a _producer_ endpoint. The concept of _endpoint_ is itself an EIP [http://www.enterpriseintegrationpatterns.com/MessageEndpoint.html](http://www.enterpriseintegrationpatterns.com/MessageEndpoint.html) and it is a cornerstone of the Camel solution to the integration problem: regardless of the nature of the producer or consumer endpoint, the intermediate steps deal with a message that have a standard structure and is in general agnostic about the nature of the source or destination of the message. The processing steps along the route deal with the same type of message, whether it came to the route through a webservice exposed by the route, or because it has been delivered as a file on a directory the route is listening to. The webservice, or the file listening service in this case, are different implementations of a _consuming_ endpoint.

#### `Exchange`
Endpoints can produce or consume `Exchange`s. An `Exchange` is structured in an IN and an OUT message. When dealing with a _consumer endpoint_, we can see it as a source of `Exchange`s with IN message. The processing steps along the route can modify the IN message and ultimately populate the OUT message that is used by the consumer endpoint as a response (imagine the IN/OUT pattern as a mapping of the Request/Response pattern)

#### `Message`
The IN/OUT `Message`s in the exchange have a standard structure, being constituted of header, body and attachments. The processing steps can read or modify freely each of these parts, being all these mutable structures.

#### `ProducerTemplate`
In testing scenarios, or in situations where messages are not consumed from a Camel endpoint, you might want to create an Exchange and send it to an endpoint. This can happen e.g. when you are integrating Camel in an existing web  application, and you want to use it to handle only one part of the request/response cycle, delegating the final handling to the existing framework (e.g. to a Spring Controller). Moreover, you want to be completely sure of not ending up in thread safety problems.
For these cases the `CamelContext` provides with an instance of `ProducerTemplate` which allows to ultimately synthesize on the flight an `Exchange` and send it to an endpoint, all in a _thread safe manner_. `ProducerTemplate` provides a number of methods to build an `Exchange`.


### Conclusions
In this post we just scraped the surface of Camel, and there is a lot more to discover. I will try in future posts to dive further into features of Camel that I find particularly interesting, e.g. the testing support, parallel processing features, integration with Akka.

The way the Camel DSL is structured provides a way to write code in linear manner, making it easier to reason about, and even _visualize it_ (through the DSL and through HawtIO which we will explore later), and it tackles the problems of modularity of an application. For example we could just split any processing flow in subroutes and replace only those when necessary, provided the structure of the `Exchange` up and downstream is preserverd. This also fits perfectly with the need of distributing work in a team without risking of stepping in each others' toes. If we consider also that a very natural way of deploying routes is through OSGi bundles (this is the principle followed in  [JBoss Fuse](http://www.jboss.org/products/fuse/overview)), we can see how allowing modularity is one of the core principles at the base of this project, and it has definitely been achieved.
