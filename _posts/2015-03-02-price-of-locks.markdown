---
layout: post
title: "Parallelizing costs"
date: 2015-03-08 10:27:37 +0100
comments: true
categories: [Java, Concurrency, Threads] 
---

####Why learning concurrency
Studying for the OCP exam offers a nice opportunity to dive into one of the most important (and sometimes overlooked) aspects of the Java language and JVM: threads and concurrency frameworks.
Before I never delved into the details about concurrency just because I have been working on a container (like Tomcat) or on a framework (like Apache Camel) that takes care of distributing load on a thread pool, and basically every request or every message processing can in 99% of cases be treated as a synchronous process, so I survived for many years without having a good understanding of how concurrency works in Java.

Learning how threads and concurrency works is important especially if we look at how hardware is evolving. Processors speed is not increasing any more (due to physical limitations) but processors are getting *large*, i.e. the number of cores is increasing, and we must be able to make best use of them.

####Threads in Java
When we talk about threads a distinction must be made between a *thread as object* and a *thread of execution*. Java has supported threads since the very beginning in a native way. As everything in Java is handled as an object, threads are not an exception, and a thread is represented by the `java.lang.Thread` class. A thread of execution instead represents a call stack that is being executed on the JVM. You can visualize multiple threads running as many call stacks running independently. However threads can possibly work on the same objects in the Heap, and there are a number of mechanisms provided within the language to allow handling in a safe way these shared objects (synchronized blocks and methods, locks, read/write locks, atomic variables).
I used to think myself that parallelizing things could lead automatically to better performance, but after diving a bit into the subject, I came across a great presentation from Martin Thompson that I really [recommend](https://www.youtube.com/watch?v=4dfk3ucthN8). This presentation is great for a couple of reasons, first it makes it clear that having knowledge about the general structure of the machine on  which our programs run is paramount to have efficient code. We don't need to know all the details as if we are developing firmware code for a particular processor, but a general understanding of how modern multicore CPUs work is recommended (*mechanical sympathy*). Secondly, it conveys the important concept that having threads contending a certain resource and swapping context take time, and it might be not always convenient to parallelize. So *parallelize with a grain of salt*. 

####Benchmark
To convince myself of the fact that parallelization is not necessarily good,  I used the same example suggested in the [Disruptor presentation](http://lmax-exchange.github.io/disruptor/files/Disruptor-1.0.pdf), a very trivial problem which is incrementing an `int` variable 10.000.000 times. The aim is to compare the performance of these approaches in dealing with this problem.
Let's first outline the different approaches used, then we will go through the performance results. The code can be found [here](https://github.com/pierangeloc/java-8-playground/tree/master/src/main/java/com/pierangeloc/java8/threads)
 
######Single threaded, with a while loop
This is the most trivial approach:

``` Java
while (i < times) {
    i++;
}
```
The while loop is executed on one single thread. 

######Single threaded, with a lock/unlock within the loop
To measure the price of a simple lock and unlock, without any other thread involved in it (no actual contention), I used this second strategy:

``` Java
while (i < times) {
    lock.lock();
    i++;
    lock.unlock();
}
```

######Single threaded, with synchronized block within the loop
An equivalent approach to the previous one is to synchronize the whole block in the while loop

``` Java
while (i < times) {
    synchronized (lock) {
        i++;
    }
}
```

Then we can start to really parallelize things and see how it goes. I tested this on an Intel i7 (8 cores) machine, using 4 threads

######4 threads, without locking nor synchronizing (inconsistent results)
We define a list of Callables that share the same integer holder, increasing it concurrently

``` Java
/**
 * MultiThreadedUnlockedStrategy.java
*/
IntHolder intHolder = new IntHolder();
List<IntIncrementer> incrementers = new LinkedList<>();
for(int i = 0; i < times; i++) {
    incrementers.add(new IntIncrementer(intHolder));
}

executorService.invokeAll(incrementers);

/**
 * IntIncrementer.java
*/
@Override
public IntHolder call() throws Exception {
    LOGGER.debug("incrementing");
    holder.value++;
    return holder;
}
        
```
As expected, this strategy leads to incorrect and inconsistent results, e.g. 9978258

######4  threads, with locking/unlocking in each incrementation
The incrementation block is synchronized on the holder object

``` Java
/**
 * MultiThreadedLockedStrategy.java
*/
IntHolder intHolder = new IntHolder();
List<LockingIntIncrementer> incrementers = new LinkedList<>();
for(int i = 0; i < times; i++) {
    incrementers.add(new LockingIntIncrementer(intHolder));
}

executorService.invokeAll(incrementers);

/**
 * LockingIntIncrementer.java
 */
@Override
public IntHolder call() throws Exception {
    synchronized (holder) {
        LOGGER.debug("incrementing");
        holder.value++;
    }
    return holder;
}
        
```
This leads to consistent and correct results.

######4  threads, with AtomicInteger
The incrementation block is synchronized on the holder object

``` Java
/**
 * MultiThreadedLockedStrategy.java
*/
AtomicInteger atomicInteger = new AtomicInteger();
List<AtomicIntIncrementer> incrementers = new LinkedList<>();
for(int i = 0; i < times; i++) {
    incrementers.add(new AtomicIntIncrementer(atomicInteger));
}

executorService.invokeAll(incrementers);


/**
 * AtomicIntIncrementer.java
 */
private AtomicInteger atomicInteger;

@Override
public Integer call() throws Exception {
    LOGGER.debug("incrementing");
    return atomicInteger.incrementAndGet();
}
        
```
This strategy also leads to correct results.


######4  threads, with ForkJoin
The approach followed in this case has been totally different. We have constructed an array of 10.000.000 ones, and added the values through a fork/join.

``` Java
/**
 * MultiThreadedLockedStrategy.java
*/
int[] ones = new int[times];
AddingTask mainTask = new AddingTask(ones, 0, ones.length);
int result = forkJoinPool.invoke(mainTask);

/**
 * AddingTask.java
 */
public AddingTask(int[] array, int from, int to) {
        this.array = array;
        this.from = from;
        this.to = to;
    }

@Override
protected Integer compute() {
    if(to - from <= THRESHOLD) {
        return to - from;
    } else {
        int mid = (to + from) / 2;
        AddingTask left = new AddingTask(array, from, mid);
        left.fork();
        AddingTask right = new AddingTask(array, mid, to);
        int rightComputationResult = right.compute();
        int leftComputationResult = left.join();
        return leftComputationResult + rightComputationResult;
    }
}
```
This strategy leads to correct results.


####Performance analysys
The following table sums up the results from the various strategies, and compares their performances

```
+------------------------------------+----------------+---------------------+
| Strategy                           | Correct result | Execution time [ms] |
|------------------------------------|----------------|---------------------|
| Single Threaded Lock Free          | Yes            | 3                   |
| Single Threaded with lock          | Yes            | 197                 |
| Single Threaded with syncchronized | Yes            | 237                 |
| 4 Threads without lock             | No             | 25710               |
| 4 Threads with lock                | Yes            | 10498               |
| 4 Threads with AtomicInteger       | Yes            | 11121               |
| 4 Threads with Fork/Join           | Yes            | 1045                |
+------------------------------------+----------------+---------------------+
```

The problem we tried to solve here was trivial, but from this table we can se that the easiest approach is also the most efficient.

We can also see that just introducing a locking mechanism in a single thread, so without any contention of the lock itself, makes the application about 70 times slower.

When we start working with 4 threads sharing an object, we can see that without locking the results are inconsistent, but in any case the approach is extremely inefficient. Threads must share this object so there is a continuous context switch and update between the cores on which the threads are running.

When we introduce the locking mechanism, results are correct and paradoxically the execution time got reduced. 

With `AtomicInteger` I was expecting a better performance than with the locking mechanism, but actually it got worse. This proves that when there is high contention on an object, also AtomicInteger is not a panacea.

Among the parallelized approaches, the one that proved to work best is the Fork/Join, but in order to apply it we had to change the approach and get to adding the elements of an array.