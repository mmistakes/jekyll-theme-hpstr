---
layout: post
title: "The Interaction of Business Policy, Strategy, and Architecture in System Design"
description: "The Interaction of Business Policy, Strategy, and Architecture in System Design"
tags: [strategy, system design]
modified: 2016-12-30
---
Most Software systems are developed by corporations to gain parity with, or advantage over, competitors. These systems are either intended for sale as products or to be used internally but in both cases they are supposed to produce positive business results for the corporation that uses them. As anyone who has ever been involved in the development of software systems will know they often fail to produce a return on investment and sometimes fail to produce any benefit at all. This failure to achieve business value stems partly from difficultly system designers have in tracking the changing relationships between Policy, Strategy, and the Architecture they are responsible for designing.


System Architecture, and the Standards and Procedures that system designers are responsible for defining are the technical equivalent to Business Strategy, and Business Processes respectively. While they are equivalent they are not equal. Policy has precedence over Strategy and Strategy has precedence over Architecture, finally, Standards, Processes, and Procedures should follow.

The following sections attempt to define these concepts and show the relationships between them. Much of this essay, such as the ranking of Policy, Strategy, and Tactics is based on Basil Liddell Hart’s theories of military Strategy explained in his book [Strategy](https://www.amazon.com/exec/obidos/ASIN/0452010713/virtualtravel-20). The purpose of these definitions is not to shed any new light on business strategy; the definitions of corporate and business strategy presented here are admittedly simplistic. Instead the purpose is to provide a framework for a discussion of the relationship between enterprise architecture, system architecture and corporate and business strategy and show how successful architecture must be derived from and driven by strategy.

### Corporate Policy

Policy is defined by the Shorter Oxford English Dictionary as:

> A course of action or principle adopted or proposed by a government, party, individual etc; any course of action adopted as advantageous or expedient.

Corporate Policy can be thought of as a promise to take a specific course of action or follow specific principles and thereby deliver defined business results. The executives of a company make promises of this sort to their investors over the short (3-6 months), medium (6-12 months), and long (12-18 months) term. Executives are usually held accountable by their investors for delivery of the short-term results that they claimed their policy would produce. Investors also want to see reasonable progress toward longer-term results. The results specified by a Corporate Policy are usually defined in terms of metrics that matter to investors, increased profitability, revenue, or sales etc. But investors care about more than just delivery of results. They care about the executive’s ability to deliver those results in the predicted way. Executives who cannot execute their stated Corporate Policy but somehow mange to deliver the results anyway are unpredictable and therefore a risky investment.

To summarize, a Corporate Policy commits a business to achieving tangible results in a specific timeframe by taking a specific approach.

To be convincing to investors the executives must not only publicly define their Corporate Policy they must also reveal some part of the Corporate Strategy that supports the policy. They must do this without giving away competitive advantage. Walking the line between convincing investors that the chosen policy is supported by a solid strategy while preserving competitive advantage and retaining as much room for maneuver as possible is the executive’s unenviable job.

### Strategy

Strategy is defined by the Oxford English Dictionary as

> The art or skill of careful planning towards an advantage or desired end; an instance of this, a stratagem.

In order to execute Corporate Policy and deliver the results executives have promised to investors companies must develop a Strategy. Strategy can be divided into two levels, Corporate Strategy, that encompasses the entire business, all its departments, lines of business and operations, and Business Strategy that deals with individual departments, initiatives, or lines of business. The names of these two levels are somewhat arbitrary, the important point is that there are two levels; one that encompasses the entire business or enterprise, and one that deals with individual initiatives and departments.

### Corporate Strategy

Corporate Strategy can be thought of as Business Policy. This is a direct Parallel to Basil Liddell Harts claim that Grand Strategy can be thought of as Military Policy. The difference between Corporate Policy and Corporate Strategy would not matter too much if they were communicated to the same audience. However, while Corporate Policy is communicated externally and is primarily targeted at investors. Corporate Strategy is guarded to protect competitive advantage and is primarily intended for an internal audience. Corporate Strategy determines the way in which business will be conducted and the relative importance of all the stakeholders expectations; investors, customers and employees. At the same time Corporate Strategy must strike a balance between the goals of different business units within the corporation. Profit centers must be balanced against cost centers and the goals of individual departments must be aligned with stated Corporate Policy. Multiple initiatives must be evaluated and some chosen for immediate execution while others may need to be delayed. Investors care about Corporate Strategy. In particular they want it to clearly support Corporate Policy and be executed as planned. However they also understand that for competitive reasons it cannot be revealed to them completely.

### Enterprise Architecture

Enterprise Architecture is a specialized form of corporate strategy. As has already been said, in today’s business world many organizations seek to gain competitive advantage by developing custom information technology solutions or installing and integrating packages. These solutions are built to achieve specific business results. When many such solutions exist within a single organization conflicts and incompatibilities inevitable occur and complexity increases which leads to increased maintenance costs. While good Enterprise Architecture can provide benefits such as clarity and reduced integration costs it is essential for the architect to accept that enterprise architecture is necessarily subservient to corporate strategy. The consequences of this can be frustrating. For example; if corporate strategy mandates rapid growth, there may never be a good time to replace that archaic database or the completely outdated middleware. Much of the frustration felt by architects stems from the fact that they must consider the longer term, 2 to 5 years, while corporate policy and strategy rarely consider anything beyond 18 months.

Enterprise Architecture can be thought of as technology policy. An Enterprise Architect must define the standard approaches, tools and procedures for the integration of multiple systems and various technologies across the organization. The factors that drive enterprise architecture decisions often have less to do with the relative merits of the available technology options and more to do with resource constraints and risk mitigation. For example DB2 may cost less to own and be slightly more efficient in operation than Oracle but the large number of developers in the job market with skills in Oracle may swing the decision in Oracle’s favor. These decisions can sometimes seem completely arbitrary to the technologists that have to live with them. I was recently asked which platform, J2EE or .net, supported the highest developer productivity. I explained that it was not uncommon to find a 25-fold difference in productivity between a “good” programmer and a “bad” programmer. The difference between a J2EE and .net platform is nowhere near that. So the real concern should be ensuring that the hiring process retains “good” programmers. The next consideration should be selecting a development platform that would be around for a reasonable length of time and provide an easy upgrade path when, and if, it comes time to move on. Finally the relative productivity levels supported by the two platforms could be considered but by this point it really doesn’t matter that much. They both work fairly well!

The main driving factor in many enterprise architecture decisions is the risk that a selected technology or approach may become obsolete. Enterprise architectures are, by their nature, intended to endure for a considerable length of time, 2 to 5 years, is common. This is easily long enough for technologies, companies, design patterns and methodologies, to become obsolete. As a result enterprise architectures tend to be conservative. Betting the entire enterprise on a technology or approach that becomes obsolete after 1 year does nothing to enhance the Architects future employment prospects. It is here that the goal of the Architect and the software infrastructure and package vendors differ the most. The vendor wants to lock-in the client forever. The architect wants to select a package or technology that does the required job and can be most easily retired if it becomes obsolete. Alternatively they may buy into the fallacy that they can avoid having to replace anything altogether by going with a large well respected, stable company. Millions of dollars are spent each year on marketing by major infrastructure vendors to obscure 2 basic facts; no company in this industry can guarantee it’s stability over 18 months let alone 5 years, and their products are designed to lock-in customers not to reduce the cost and difficulty of switching.

### Business Strategy

Business strategy is focused on the execution of specific initiatives and projects. The purpose of any strategy is not to overcome problems but to avoid them. The perfect strategy brings about the desired result with the minimum expended effort. A sound business strategy addresses both the means by which the objective will be achieved and the resources that will execute the plan and achieve the goal.

The psychological aspect of strategy must not be underestimated. Corporate and Business Strategies are executed by people, if these people believe in the strategies they are executing then they are more likely to succeed. Strategy is not a matter of mathematics it is more than geometry likewise enterprise and system architectures are much more than mere engineering artifacts. They are also manifestos, statements of principle, and often, common belief. There is nothing worse for moral than a hollow strategy that no one believes in! And nothing more inspiring than a well articulated strategy that aligns peoples desires.

### System Architecture

I have described elsewhere the [attributes of a good system architecture](/2003/01/software-design-reviews-lessons-learned-and-best-practices/). Here I want to discuss the relationship between System Architecture and the Business Strategy it supports. Unlike Enterprise Architecture, System Architecture is highly focused. A System Architecture is the blue print for a system that will achieve specific business objectives that will in-tern contribute to achieving a defined business goal. System Architecture is therefore subservient to Business Strategy, since strategy defines the goal. However System Architecture is the most significant factor in the medium to long-term success of any system. The appearance of short-term success can be achieved with weak architecture but the costs are high and the solution temporary at best. Implementing a working system may allow the designers to declare victory and move on but this does not mean the goal has been achieved or that it ever will be.

The following quotes (from chapter 20 – The concentrated essence of Strategy and Tactics, from Basil Liddell Hart’s book Strategy) cover the cross-over between Business Strategy and System Architecture.

> - **Adjusts your end to your means.**
> In determining your object [goal], clear sight and cool calculation should prevail. It is folly “to bite off more than you can chew”, and a beginning of [business/technology] wisdom is a sense of what is possible. So learn to face facts while still preserving faith: there will be ample need for faith- the faith that can achieve the apparently impossible- when the action begins. Confidence is like the current in a battery avoid exhausting it in a vain effort and remember that your own continued confidence will be of no avail if the cells of your battery, the [people] on which you depend, have been run down.
> - **Keep your object always in mind, while adapting the plan to circumstance.**
> Realize that there are more ways than one of gaining the objective, but take heed that every objective should bear on the object. And in considering possible objectives weigh their possibility of attainment with their service to the object if attained to wander down a side-track is bad, but to reach a dead end is worse.
> - **Take a line of operation which offers alternative objectives.**
> Liddell Hart sees this as a way to place your opponent on the horns of a dilemma. In the absence of an opponent it is a good risk mitigation tactic. If one option will not work the other is still open.
> - **Exploit the line of least resistance** - so long as it can lead you to any objective which would contribute to your underlying object.
> - **Ensure that both plan and resources are flexible and adaptable to change.**
> Your plan should foresee and provide for a next step in case of success or failure, or partial success which is the most common case. Your disposition should be such as to allow this exploitation or adaptation in the shortest possible time

Tactics are extremely important but are outside the scope of this essay. Briefly, the purpose of an Strategy is to minimize expended effort while the purpose of Tactics – Business processes, procedures and standards is to define the most efficient or appropriate method for expending effort when the need arises.

### Schematic diagram showing the relationship between Policy, Strategy, and Architecture

<div align="center">
{% capture images %}
    /images/2003-03-Strategy_and_Architecture.png
{% endcapture %}
{% include gallery images=images caption="The relationship between policy, strategy and architecture" cols=1 %}
</div>

Understanding how a System Architecture supports it’s Business Strategy within the framework of an Enterprise Architecture and how these in turn support Corporate Strategy and ultimately Corporate Policy is essential if systems are to deliver business value. This is not easy and is one reason why so many systems fail to deliver business value. The difficulty stems form the ever-changing business environment that forces continuous changes in goals and objectives. Making the goals and objectives explicit and then tracking them as they change is the only way to keep up with the game. But that is the topic for another time.