---
layout: post
title: "Software Design Reviews – Lessons Learned and Best Practices"
description: "Software Design Reviews – Lessons Learned and Best Practices"
tags: [system design, process, review]
modified: 2016-12-23
---
Joel Rosi-Schwartz once advised me that if I ever found myself solving the same problem for a third time I should stop and take the opportunity to improve my efficiency by thinking of a better way to do it. Joel was very disciplined about this and over the years had developed a big bag of tricks for solving common problems encountered during systems design and development. In many ways Joel was an inspiration for me and this is one of his traits I have tried to emulate.

In my career I have designed more than a few systems and reviewed the designs for many more. There were times when I reviewed two or three in a week and others when I went 6 months between reviews, but they have never stopped coming. Following Joels advice I have tried to incrementally improving my approach to both designing systems and reviewing others designs by developing a set of aphorisms that remind me what should be present in a good system design.


> 1 Everything in moderation and nothing to excess

Ok so this is a platitude not an aphorism, but it is amazing how often system designers, myself included, carry otherwise good ideas to extremes. Knowing when to stop is sometimes the hardest skill of all to master. Too many designers solve problems that don’t exist, reinterpret requirements to fit their preconceived idea of an appropriate solution, or refuse to take advantage of new techniques in the name of risk reduction. Every solution and technique has an appropriate range of applicability, going beyond this range generally causes more problems that it solves. Practicality and reasonableness coupled with a willingness to use new techniques if they are better than old ones are characteristics that all systems designers would do well to cultivate.

> 2 A good system design is based on a sound conceptual model (Architecture)

Many of the system designs I have been asked to review were little more than arbitrary collections of sub-systems and components. It was obvious that little or no thought had been given to the overall interaction of these parts. The Shorter Oxford English Dictionary defines the word Architecture as “The conceptual structure and logical organization of a computer or computer based system.” I take it as self-evident that a system design which has no conceptual structure and little logic to its organization is going to be ultimately unsuccessful. If you don’t agree you should probably stop reading now. This begs the question: what are the attributes of a sound conceptual model that allow it to support the development of a good system design?

> 3 A sound conceptual model accounts for all system requirements at a reasonable level of abstraction

What constitutes a reasonable level of abstraction will obviously vary from system to system and will necessarily depend on the requirements, but in general I believe a reasonable level of abstraction is reached when a balance is achieved between specificity and generality.

> 3.1 A conceptual model is sufficiently generalized when it can account for all significant use cases in a concise way that reduces complexity by consolidating similar features.

There are two important concepts here. The first is the concept of a significant use case. For any given system there are a vast number of potential use cases only some of which are significant. Determining the relative significance of use cases is an art not a science. Ultimately only the user of the system can determine the relative significance of use cases. However, most users concentrate on the normal operation of the system being designed and fail to consider more exceptional scenarios. It is up to the system designer to include use cases that go beyond the normal operation of systems. System designers commonly fail to do this and often neglect system validation (testing), installation, commissioning or recovery from failure when defining use cases.

The second important concept is that of reducing complexity by consolidating similar features. This is where Joel’s rule of threes can be usefully applied. If there are three or more features of a system that display significant similarity it is worth considering consolidating them into a single, more generalized, feature. However a reduction in complexity that leads to a corresponding reduction in fidelity could be a [misapplication of Occam’s razor](/2002/12/the-misapplication-of-occams-razor-or-the-principle-of-inappropriate-parsimony/) and should be avoided.

There is of course a counter balance to generalization, namely specificity.

> 3.2 A conceptual model is sufficiently specific when it is possible to demonstrate how a system design based on the model will achieve measurable targets for required system attributes

A clear understanding of the difference between functional requirements and system attributes is required to appreciate this statement. A functional requirement can only be present or absent – a system is capable of performing a function or it is not. Functional requirements can be derived from use cases they describe the behaviors the system is capable of displaying.

By contrast system attributes, or qualities as they are sometimes called, define the way in which the system performs its functions. Attributes commonly include qualities like reliability, recoverability and availability , but can include more exotic qualities if needed, such as traceability, augmentability, and autonomy. In his book Principles of Software Engineering Management by Tom Gilb does a good job of describing how to define measurable systems attributes as part of a requirements specification process. The relevant point here is that a sound conceptual, model will reflect the system attributes it is required to deliver and it will also make allowance for measuring target values for these attributes.

I have seen many designs containing valid abstractions that failed to support required system attributes. The abstractions were not grounded, they lacked specificity, they were too abstract. The following examples illustrate the point:

- A system for running an energy trading market, with very strict performance requirements, had a highly generic design that reduced efficiency. There was no clear demonstration of how the generic design, which had limited benefits, could support the required performance. (processing efficiency)
- A system with no intrinsic support for testing was to be implemented in a life critical environment. The system lacked any details around how it would support such an obvious requirement as the ability to prove correct operation before it was implemented in a hospital. (verifiability)
- A massively complex pipeline management system that required multiple levels of abstraction had no internal diagnostics mechanism. As a result it would not be possible to isolate defects and remove them. (diagnosability)
- The user interface for a scientific data warehouse exposed all the advanced configuration features to novice users without setting reasonable defaults. Most users were administrative staff with little to no understanding of these features and no reason to learn them. The conceptual model emphasized flexibility and did little to support usability even though the limited knowledge of the target audience as well understood. (usability)

Some might say these are all missed requirements. They are, but they are not missed functional requirements. They each represent a failure of the designers to imbue the conceptual model (the Architecture) with support for the required system attributes. They represent a lack of specificity in how conceptual model supports the system requirements.

> 4 A good conceptual model is easy to communicate

A sound conceptual model that accounts for all the system requirements at a reasonable level of abstraction is only half the battle. It must also be understandable. All too often a great architecture leads to a mediocre design, a poor implementation and an unsatisfactory solution. At each stage something gets lost. Extreme programming techniques can help but even then solutions don’t always live up to the original concept. The most commonly required system attribute is also one of the least often considered – Ease of communication of the conceptual model on which the design is based is essential for successful solutions.

CORBA failed to gain wide acceptance because it was too complicated and led to more problems than it solved when placed in the hands of the average programmer. And that is the key point – Even the best architectures in the world are usually implemented by practitioners with average skills. We can’t all be James Gosling. Which is why he did not put multiple inheritances and operator overloading into Java.

I believe there are at least three ways to improve the ease with which a conceptual model can be communicated.

> 4.1 A conceptual model is easier to understand and communicate if it is; coherent, Logical in the relationship of its parts, Aesthetically consistent.

> 4.2 A conceptual model is easier to understand and communicate if it is analogous to a commonly experienced, tangible, real world system.

> 4.3 A conceptual model is easier to understand and communicate if it is anthropomorphized: Made to mimic human behavior, characteristics and modes of interaction.

The last point draws directly from modern studies in evolutionary psychology. In his excellent book, The Origins of Virtue, Matt Ridley describes an experiment in which two groups of students where presented with the same problem. For one group the problem was described mathematically as a set of simultaneous equations. For the other group it was presented as a problem in social dynamics in which the group had to identify who was lying in a complex situation by analyzing individual motivations. The problems were computationally identical all that differed was the presentation. The experiment clearly showed that people are far better at evaluating social situations than they are at solving mathematical problems. This is interesting and not surprising, as people have evolved over millions of years to be good at analyzing and solving social problems.

If the conceptual model for a system is deliberately made analogous to a real world, commonly experienced, system and that system is one that involves social interaction (ie it is anthropomorphized), then communicating the design becomes a great deal easier. Another interesting feature of such conceptual models is that the analogy itself often suggests possible enhancements and steers the designer or implementer away from problem areas. In defining use cases it is common practice to identify actors. I have found it useful to assign motives and personalities to these actors. This may seem bizarre but it helps directly with clearly identifying appropriate separation of concerns between system components. When faced with design decisions it is often helpful to ask “what would this actor want to do in this situation?” or “Is this responsibility in keeping with the personality of this actor”. This line of reasoning would have prevented many of the poor design decisions I have made in the past.

## Summary

1. Everything in moderation and nothing to excess
2. A good system design is based on a sound conceptual model (Architecture)
3. A sound conceptual model accounts for all system requirements at a reasonable level of abstraction
	
	3.1 A conceptual model is sufficiently generalized when it can account for all significant use cases in a concise way that reduces complexity by consolidating similar features
	
	3.2 A conceptual model is sufficiently specific when it is possible to demonstrate how a system design based on the model will achieve measurable targets for required system attributes
4. A good conceptual model is easy to communicate
	
	4.1 A conceptual model is easier to understand and communicate if it is coherent – Logical in the relationship of it’s parts – Aesthetically consistent.
	
	4.2 A conceptual model is easier to understand and communicate if it is analogous to a commonly experienced, tangible, real world system
	
	4.3  A conceptual model is easier to understand and communicate if it is anthropomorphized – Made to mimic human behavior, characteristics and modes of interaction