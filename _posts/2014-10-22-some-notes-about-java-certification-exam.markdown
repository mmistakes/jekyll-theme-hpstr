---
layout: post
title: "Some notes about Java Certification exam"
date: 2014-10-22 21:37:45 +0200
comments: true
categories: 
---

With this post I am starting my blog, and I dedicate it (like probably the next few ones) to topics I am encountering during the preparation of the Java Professional Certification exam.
Even if you probably have been using Java for many years, Java certification offers an opportunity to discover details about the language and its features.
In the following notes I am collecting a few points that I found at least not obvious, either because I never had the chance to look into them before, or because they showed some peculiar behavior worth keeping in mind. The following notes refer to Java 7.

####Precise rethrow
This is a feature that has been introduced in the Java 7 compiler, and it can be expressed in this way:  
*When rethrowing an exception, the rethrown type doesn't have necessarily to be of the same type declared in the `catch` block. If e.g. the `try` block can throw exceptions of type `E1`, `E2`, `E3` all subtypes of `E` which is the type in the `catch` clause, the rethrowing action is aware of being restricted to types `E1`, `E2`, `E3` and not necessarily to `E`.*  
This can be easily better explained through an example

``` Java
public class PreciseRethrow {

    public void rethrowException(String exceptionOrdinal) throws ExceptionB, ExceptionA {
        try {
            if(exceptionOrdinal.equals("first"))
                throw new ExceptionA();
            else
                throw new ExceptionB();
        } catch (Exception e) {
            e.printStackTrace();
            Exception f = e;
            throw f;
        }
    }

}

class ExceptionA extends Exception {}
class ExceptionB extends Exception {}
```
The compiler analyzes the code in the `try` clause and detects that only `FirstException` or `SecondException` can be thrown, therefore despite the `catch` block refers to a generic `Exception` class, it is aware that the actual exception being rethrown in the `throw e;` can either be of type `FirstException` or `SecondException`, therefore the `rethrowException()` method can declare `throws ExceptionB, ExceptionA` instead of `throws Exception`.  
If the exception being rethrown is copied to a variable local to the `catch` block which is in turn rethrown, like in this version of the `catch` block

``` Java
catch (Exception e) {
            e.printStackTrace();
            Exception f = e;
            throw f;
        }
```

this nice behavior of the compiler ceases to occur, so it will produce a compilation error.

___
