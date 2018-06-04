---
layout: post
title: "Referential Transparency"
date: 2018-06-01 00:30:55 +0200
comments: true
categories: Scala, Functional_Programming
mathjax: true
---

One foundation of Functional Programming is Referential Transparency (RT). Purely functional languages (like Haskell), and purely functional libraries for non purely functional languages (like scalaz or cats for Scala) aim at building Referential Transparent programs. 
The benefit of this constraint might not be immediately visible, so in this post I want to expose my thoughts on this, and see what Referential Transparency can buy us.

# Reasoning and modeling

The benefit of RT is that it allows us to focus on something we can handle in our head, draw some conclusions, and drag this conclusion in a different context where we focus again. 
In this different context we don't need to think about the whole process that allowed us to reach our conclusion, as we can just take this conclusion as a given and proceed further with our reasoning.

For example, when we study calculus we define what a limit of a function \\(f(x)\\) in a point \\(x_0\\) is. Then we define the derivative of a function in \\(x_0\\) as \\(f\\):

$$ \frac{d f}{dx}(x_0) = \lim_{x \rightarrow x_0} \frac{f(x)- f(x_0)}{x - x_0} $$

In physics this brings to the definition of velocity of a point moving in a line under a motion \\(x(t)\\) as

$$ v(t) = \frac{d x}{d t} $$

We can then calculate the kinetic energy of an object of mass \\(m\\) as 

$$ E_k = \frac{1}{2}mv^2 $$

Now, when we want to calculate the kinetic energy of a ball of a given mass at a given speed, what we do is just replacing known values in place of the variables of our definition, and we are done. 
We don't have to think, to calculate the energy, how the velocity has been calculated, in principle we don't even need to be aware of the notion of limit. 
A person that knows how to add and multiply can easily calculate the kinetic energy of a baseball ball at a given speed without any knowledge of calculus. 

On the other hand, we could unfold \\(v\\) to its definition and still we would get to a correct result:

$$ E_k = \frac{1}{2}m\Big(\frac{d x}{d t}\Big )^2 $$

Being able to replace definitions into variables and viceversa, allows us to simplify our reasoning and limit or broaden the scope of deductions.

# Referential Transparency 
Referential transparency is exactly what we just exposed. A definition is RT if we can exchange reference for definition without mutating the effect of my reasoning. 

When we write a program, we describe a process that performs some logical steps. 
The approach of functional programming is to model the program in terms of mathematical functions and expressions, so that we can apply reductions or expansions in our reasoning, 
making our implementation more robust from the logical point of view.
Let's see how we can apply this in Scala.

## Pure functions
A function that adheres to the RT rule `f: A => B` takes a value `a: A`, produces a `b: B`, and _does nothing else_. 

This brings along a few _advantages_:
- We can reason _locally_ about our code. When implementing the function, I can just think about how to transform `a: A` into a `b: B`. 
When using the result of the computation of `f` into another piece of code, I can just focus on the value `B` without having to think about the context that `b` might carry along, 
because _there is no context_.
- We can _prove_ behaviors, and establish explicit _laws_ that our behaviors must adhere to
- Testing becomes easier as there is no need to setup any context

## Breaking RT: mutable state
In Maths when we write \\(x = 1\\) it means that the value assigned to \\(x\\) is \\(1\\) and it will not change.
Also, for any function \\(f(x)\\), for any given input we will have always the same output, on multiple computations.

Scala is a hybrid language, in that it allows to do FP, but we can mix in non-functional code, so if e.g. we want to model an `Account` object we could do

```scala
scala> case class Account(var balance: BigDecimal = 0) {
     |   def debit(value: BigDecimal): Account = {
     |     this.balance = this.balance - value
     |     this
     |   }
     |   
     |   def credit(value: BigDecimal): Account = {
     |       this.balance = this.balance + value
     |       this
     |     }
     | }
defined class Account

scala> val openAccount = Account(1000)
openAccount: Account = Account(1000)

scala> openAccount.debit(10)
res0: Account = Account(990)

scala> openAccount.debit(10)
res1: Account = Account(980)
```
and we can see that invoking our function `debit` with the same input, we have 2 different outputs. 
The reason is that the computation carries along a context change due to the `var` we used in our case class.

This approach has a few drawbacks:
- It is more difficult to reason about, due to the context mutation
- It can yield errors in a concurrent situation, where multiple threads can call `debit`

A pure functional version of this doesn't mutate anything in place, but rather produces a new object for every computation. 
The object returned by our function is structurally identical every time we compute it. 
In principle our computation could cache these values and return exactly the same instance for repeated invocations.

```scala
scala> case class Account(balance: BigDecimal = 0)
defined class Account

scala> def debit(account: Account, amt: BigDecimal): Account = account.copy(balance = account.balance - amt)
debit: (account: Account, amt: BigDecimal)Account

scala> val myAccount = Account(1000)
myAccount: Account = Account(1000)

scala> debit(myAccount, 100)
res2: Account = Account(900)

scala> debit(myAccount, 100)
res3: Account = Account(900)
```

## Breaking RT: Exceptions
When we define a function `f: A => B`, we expect this function to return an output `b: B` for every input `a: A`. 
If in the implementation of `f` we introduce a `throw` or an `assert`, or rely on `null`, we end up with our computation breaking the contract we established when we defined `f`.
The behavior of code throwing exceptions is not Referentially Transparent, as you can see from the following example



```scala
scala> case class Account(name: String, balance: Int) {
     |   require(name.length < 20, "Account name cannot contain more than 20 chars")
     | }
defined class Account

scala> Account("Very very very personal", 100)
java.lang.IllegalArgumentException: requirement failed: Account name cannot contain more than 20 chars
  at scala.Predef$.require(Predef.scala:293)
  ... 45 elided
```

The `Account` creation can throw an exception. Now let's consider this implementation that relies on account creation

```scala
scala> def wealthyAccountFromDb(nameColumn: String, balanceColumn: Int): Option[Account] = {
     |   val acct = Account(nameColumn, balanceColumn)
     |   try {
     |     if (balanceColumn > 1000) Some(acct) else None 
     |   } catch {
     |     case NonFatal(_) => None
     |   }
     | }
wealthyAccountFromDb: (nameColumn: String, balanceColumn: Int)Option[Account]

scala> wealthyAccountFromDb("Very very very personal", 1500)
java.lang.IllegalArgumentException: requirement failed: Account name cannot contain more than 20 chars
  at scala.Predef$.require(Predef.scala:293)
  ... 46 elided
```
 
and let's compare it with the substitution of the definition of `acct` in the place where `acct` is used

```scala
scala> def wealthyAccountFromDb(nameColumn: String, balanceColumn: Int): Option[Account] = {
     |   try {
     |     if (balanceColumn > 1000) Some(Account(nameColumn, balanceColumn)) else None 
     |   } catch {
     |     case NonFatal(_) => None
     |   }
     | }
wealthyAccountFromDb: (nameColumn: String, balanceColumn: Int)Option[Account]

scala> wealthyAccountFromDb("Very very very personal", 1500)
res6: Option[Account] = None
```

Does this yield the same result? No, so this code is not Referentially Transparent.

Throwing exceptions has also a few specific drawbacks:

- It breaks totality of `f: A => B`, as exceptions could be thrown for some `a` in our domain
- It forces us to think, every time we invoke a function, that it might throw an exception, so it makes our style very defensive and repetitive

The alternative is to convey the fact that some code can fail, explicitly in the output type. Use an `Option[B]` or `Either[E, B]` to express the fact that computation can fail. Rather that `require` we could rather use a [smart constructor](https://www.cakesolutions.net/teamblogs/enforcing-invariants-in-scala-datatypes).
If the type is simply `B` it means that the function is total and guarantees to work and provide a `b :B`.

## Breaking RT: Scala Future
Scala `scala.concurrent.Future` provides the way to handle asynchronous execution. 
In order for `Future` to run the basic operations, we need an `ExecutionContext` available (typically it is provided implicitly). 
When a `Future` is created, it does not only create a value, but it runs immediately on the provided `ExecutionContext`.


```scala
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
```

```scala
scala> val x = Future({println("Future is running!"); "result"})
Future is running!
x: scala.concurrent.Future[String] = Future(Success(result))
```

The fact that `Future` executes eagerly as soon as it is created, is a violation of RT, as you can see from this simple case
 
```scala
scala> val x = Future({println("running"); "result"})
running
x: scala.concurrent.Future[String] = Future(Success(result))

scala> x flatMap(_ => x)
res7: scala.concurrent.Future[String] = Future(Success(result))
```

is different than

```scala
scala> Future({println("running"); "result"}) flatMap{_ => Future({println("running"); "result"})}
running
running
res8: scala.concurrent.Future[String] = Future(<not completed>)
```
because one never prints `"running"` (as it was printed when we created the `Future` in first place), another one prints it twice.

Alternative libraries such as Monix, cats-effects or scalaz8 provide alternatives to `Future` that separate declaration from execution, giving us back RT.

Let's do the same as above with Monix `Task`.
Defining a `Task` just creates a value that describes how things will be executed, it doesn't trigger any execution.

```scala
scala> import monix.execution.Scheduler.Implicits.global
import monix.execution.Scheduler.Implicits.global

scala> import monix.eval.Task
import monix.eval.Task

scala> val task = Task({println("Task is running!"); "result"})
task: monix.eval.Task[String] = Task.FlatMap$1855446670
```

Execution must be explicitly invoked _at the end of the world_
```scala
scala> task.runAsync.foreach(println)
Task is running!
result
```

Now let's verify that this property guarantees RT

```scala
scala> val t1 = task flatMap(_ => task)
t1: monix.eval.Task[String] = Task.FlatMap$1362502256

scala> val t2 = Task({println("Task is running!"); "result"}) flatMap {_ => Task({println("Task is running!"); "result"})}
t2: monix.eval.Task[String] = Task.FlatMap$446650376

scala> t1.runAsync.foreach(println)
Task is running!
Task is running!
result

scala> t2.runAsync.foreach(println)
Task is running!
Task is running!
```

As you can see `t1` and `t2` produce the same result, so they respect RT.


# Conclusions
I hope the examples exposed above give a good idea of the benefits of Referential Transparency. 

The same concepts we have explored here apply when we develop our business application, when we are dealing with a DB call, or building an object out of a DB row, or performing a call to an API.

What we want is to apply one of the principles of Functional programming, i.e. being pure, rigorous and explicit about expectations and guarantees. This allows us to _think in the little_ to _compose in the big_ context, without juggling with too many concepts in our head. 

RT plays a fundamental role in this and by using it we make our code easier to reason about, improving its maintainability and becoming ultimately more productive as developers.
