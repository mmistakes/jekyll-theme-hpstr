---
layout: post
title: "A Process for Prioritizing and Managing Problem Resolution in a Complex Environment"
description: "A Process for Prioritizing and Managing Problem Resolution in a Complex Environment"
tags: [system design, process, strategy]
modified: 2016-12-23
---
Just because you can make a decision or solve a problem does not mean you should. There are times when it’s better to delay until the last possible moment, others when its best to go half way and stop, and of course times when action must be taken immediately. Recognizing the best way to handle any given situation is fundamental when handling large numbers of problems. Recently I’ve been working with a client on defining a change management process for a large system and have been thinking about these issues.


Not all problems are equal some are more urgent that others. In large systems problems can spawn other problems and often have complex relationships with each other. It is usually possible to draw a hierarchy of problems, more fundamental problems rise to the top, and less severe symptomatic problems fall to the bottom. Choosing whether to resolve a problem or ignore it depends on its relative urgency and degree of subservience within the problem hierarchy. These issues have little to do with the problem itself, they are outside the scope of the problem and are more correctly thought of as the meta-problem or problem context. Understanding the context of a problem is vitally important. The same problem in different contexts may have radically different solutions.

This process flow diagram shows a generic problem resolution process. For this discussion the important features are the parallelization of problem definition and problem context definition and the separation of candidate solution evaluation and candidate solution selection.

<div align="center">
{% capture images %}
    /images/2003-03-Problem_Resolution_Flow.jpg
{% endcapture %}
{% include gallery images=images caption="Problem resolution flow diagram" cols=1 %}
</div>

### Parallelization of Problem Context Definition and Problem Definition

By understanding the context of a problem it is possible to make decisions about its resolution without actually understanding much about the problem itself. The two primary pieces of information needed to understand a problems context are its relative urgency and the degree to which it is subservient to other problems. An isolated problem that is unrelated to any other problem can only be resolved by a direct attack. Whereas a problem that is merely a symptom of some deeper, more fundamental problem can be resolved either by a direct attack or by resolving the more fundamental problem.

### Keeping your Options Open

Retaining the option to solve a problem using any candidate solution for as long as possible has significant advantages. Most importantly the ability to learn from mistakes and hard won experience is preserved. If the opportunity arises solutions to more fundamental problems can be implemented instead, thus reducing total costs and wasted effort while increasing quality. And resources can be committed to more urgent problems if the relative urgency changes or new urgent problems arise.

Although tempting, there is often no pressing need to select a candidate solution. In the absence of such a pressing need it is better to wait. Large systems are typically dynamic, new problems occur all the time and existing problems morph as more is learned about them. In such an environment retaining the ability to change your mind for as long as possible is highly desirable since a better overall solution may be discovered. If however a candidate solution has been selected then decisions can and should be made on the assumption that the selected candidate solution will be implemented. It is my experience that too many system designers select candidate solutions when there is no pressing need. This boxes the designer in, reducing thier options and forces them along paths that may reduce overall quality unnecessarily.

This table recommends an approach for solution definition and development based on an evaluation of a problems context in two dimensions; relative urgency, and degree of likely subservience to other problems.

|                        | Low Urgency  | Medium Urgency | High Urgency |
|------------------------|:-------------|:---------------|:-------------|
|------
| **High Subservience** | Ignore the problem. It will go away when the more fundamental problem, to which this problem is subservient, is resolved. | Solve the more fundamental problem to which this problem is subservient. | Implement the easiest candidate solution available. Expect this temporary solution to be replaced when the more fundamental problem is resolved. |
|------
| **Medium Subservience** | Solve the more fundamental problem to which this problem is subservient. | Evaluate candidate solutions then wait until the last moment before selecting one. Keep looking to solve a more fundamental problem while waiting. | Select a candidate solution but do not develop it until the last moment. Keep looking to solve a more fundamental problem while waiting. |
|------
| **Low Subservience**  | Select a solution but do not develop it until there is nothing more urgent to do or its urgency increases. | Select a candidate solution but do not develop it until the last moment. Retain the option to do something more important for as long as possible | Implement the cleanest candidate solution you can in the time available |
|------
{: rules="groups"}
