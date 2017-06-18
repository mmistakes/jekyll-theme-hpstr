---
layout: post
title: "A simple Scala application: calculating integrals"
date: 2015-04-06 20:57:33 +0200
comments: true
categories: [Scala, functional-programming]
mathjax: true
---

I embraced functional programming through Scala starting with the great Marting Odersky's course in Coursera, following with the Reactive Programming course in Coursera (a second edition of which will start shortly and I really recommend you to sign up and follow it), and later on working with Play framework and Akka streams.

I spent a few years programming in Java in a purely imperative way, and as soon as I could understand the functional approach, I realized it is a great way to focus on the essence of the problem, and it provides a more organic way to decompose reasoning and handling complexity.

Of course the language itself doesn't guarantee that the approach is functional: if you want you can write Scala almost like Java without semicolons. But despite not being purely functional and allowing mutable variables, Scala provides all the features to put in practice purely functional approach. Moreover the syntax is very similar to Java so the transition from Java, from the language point of view, is pretty smooth.

When I have seen the first examples of functional code I appreciated the fact that it provides the language tools to model directly mathematical functions. For example a mathematical function \\(f\\) from \\(A\\) to \\(B\\):

$$ f: A \rightarrow B $$

is translated into a definition of a function in Scala as (the `???` mean that the function is still undefined):

```Scala
scala> def f: Double => Double = ???
f: Double => Double
```

Functions in Scala are first class citizens, and they can be passed as arguments to other functions. This allows to compose things in a very straightforward way that procedural programming simply wouldn't allow.

Consider for example calculating the integral of the \\(sin(x)\\) function over the interval \\([0, \pi]\\), which we know from our math classes being 2. We map real numbers to their finite precision representation as Double, and we can have a Scala definition of \\(\sin(x), x \in \mathbb{R}\\) as

```Scala
def f: Double => Double = (x: Double) => Math.sin(x)
```

or even more concisely

```Scala
scala> import Math.sin
import Math.sin
scala>def f: Double => Double = sin(_)
f: Double => Double
```

Now we can pproximate the integral with a finite sum:

$$ \int_0^{\pi}\sin(x)dx \approx \Delta x \sum_{n=0}^{N}\sin(x_n) $$

with \\(\Delta x = \pi / N\\) and \\(x_n = n\Delta x\\).


We know the explicit way of finding N given \\(\Delta x\\) and \\(\pi\\), however let's exploit a great feature of Scala which are `Stream`s and lazy evaluation (see http://www.scala-lang.org/api/2.11.5/index.html#scala.collection.immutable.Stream).
We can define the `Stream` of \\(x_n\\) as a potentially unbounded sequence of doubles, with the guarantee that the next number will be generated on demand, lazily, only when required:

```Scala
scala> val deltaX = 0.01
deltaX: Double = 0.01
scala> def xn = Stream.iterate(0.0)(_ + deltaX)
xn: scala.collection.immutable.Stream[Double]
```

Here we did two things: we created a `Stream`, where no value is allocated yet, all the  values of which are created on demand, and we defined it with a `def` and not with a `val` in order to save memory allocation once we consumed the stream, as we want just the \\(x_n\\) to be produced to generate the sum and we don't want to retain it afterwards.

The stream `xn` defined above is potentially unbound, it represents all the sequence of `xn` obtained as `0, deltaX, deltaX + deltaX, deltaX + deltaX + deltaX, ...` but we can set easily an upper limit in this way

```Scala
scala> def xnPi = xn.takeWhile(_ < Math.PI)
xnPi: scala.collection.immutable.Stream[Double]
```
We can now take the values of the `f` function in each of these values simply by mapping the `Stream` of `xn` through the function:

```Scala
scala> def ynPi = xnPi.map(f)
ynPi: scala.collection.immutable.Stream[Double]
```

In the context of `Stream`s we can see the map application as a transformation from the sequence of \\(x_n\\) to the sequence of \\(f_n := f(x_n)\\).
This interpretation of the `map` function applies only to sequence-like types such as Streams and Lists, but it has a very different interpretation in other types, where concepts coming from Category Theory come into place, and lead to the ideas of Monoids and Monads.

Now the only thing left to do is add up the `ynPi` and multiply them by \\(\Delta x\\), and this can easily be achieved through a `foldLeft` application:

```Scala
scala> deltaX * ynPi.foldLeft(0.0)(_ + _)
res1: Double = 1.9999900283082575
```

So we obtained quite simply, mapping directly the theoretical concepts down to language constructs, in 5 lines of code, a value pretty close to the real one. Consider how much verbosity and focus on the implementation details it would have taken having this implemented in Java or in any case in a procedural way. With Scala and in general with a functional approach we just focus on what we want to achieve, through which transformations, instead of focusing on the processing details. In this way we produce code that is more isolated, testable, and appliable in different contexts.
