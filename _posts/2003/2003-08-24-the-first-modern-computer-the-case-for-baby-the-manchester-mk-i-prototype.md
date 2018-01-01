---
layout: post
title: "The First Modern Computer – The Case for Baby, the Manchester Mk I Prototype"
description: "The First Modern Computer – The Case for Baby, the Manchester Mk I Prototype"
tags: [innovation, computer history, technology, system design]
modified: 2016-12-30
---
Finding an authoritative history of the Computer’s invention is almost impossible. There are several reasons for this problem: People disagree on the meaning of the word “invent”, they also disagree on the meaning of the word “computer”. Finally significant parts of the history were either lost or deliberately concealed and only came to light again in the 1960′s and 70′s. The United States Army was the first organization to stake a claim to the invention of the computer with the [1946 public announcement of the ENIAC (Electronic Numerical Integrator and Computer)](http://www.upenn.edu/computing/printout/archive/v12/4/crackpot.html). It has since become commonly accepted that ENIAC was the worlds first computer when in fact it was not a computer, in the modern sense, at all, and was not even the first of its class.

## What is Invention?

In the 1840′s after working on a mechanical calculating device called the difference engine Charles Babbage conceived of the [Analytical Engine](http://www.fourmilab.ch/babbage/). Its detailed plans describe, a brass and steel, steam powered, machine that comprised; a central processor called the mill, a memory called the store, an input device that read problem data and processing instructions from punched cards, a printer for data output, and a mechanism to pass information between these various elements. Had it ever been built the Analytical Engine would have been the first general purpose, externally programmed, computer.

Invention is the art of changing paradigms by successfully realizing new concepts. Babbage did not invent the computer just as Leonardo did not invent the flying machine, the tank, or the parachute. Inventors are held in high regard precisely because they make the concept real. The [Wright brothers](http://www.virtualtravelog.net/2003/08/the-meaning-of-invention/) are rightly recognized as the inventors of manned flight but they did not conceive of the idea nor were they the first to attempt the construction of a winged flying machine. They were not even the first to make a working heavier than air flying machine. But they were the first to solve all the major problems associated with manned flight in a single machine and thereby created a new paradigm. I believe this is the essence of invention.

Part of the problem with the History of the computer is that it took 100 years from concept to working prototype. There were several distinct development efforts and it is not clear which of these informed the work of later pioneers and which were dead ends. The leading actors in the invention saga were a mixture of academics, and engineers of various types. They often had different concepts of invention and placed different value on theoretical discovery vs. practical realization. When all this is considered in the light of; extreme military secrecy, rampant homophobia, chauvinistic patriotism, and entrenched legend it becomes very difficult to discern the truth.

## What is a Computer?

The word “computer” has a complex etymology , it’s meaning has evolved considerably. Originally (1646) the word computer referred to a person who performed mathematical calculations. Maintaining accuracy was obviously a problem for a person performing thousands of calculations by hand. To reduce the likelihood of error various devices were designed to assist, or automate, the job of the human computer. The word computer gradually changed its meaning and began to refer to the devices themselves. By 1892 the Second Edition of the Oxford English Dictionary (OED) records that one sense of the word was a mechanical calculating device. By 1946 various qualifiers had to be introduced, The OED of that year records electronic, digital and analogue as qualifiers needed to differentiate between the various types of computer. It is clear that the computer rapidly evolved through several forms that eventually resulted in the first modern computer – a device that, like the Wright brothers plane, had all the important features of its contemporary descendants.

To clearly identify the exact time and place where the first modern computer emerged it is worthwhile identifying the various types of machine that gave rise to computers. Simon H. Lavington, author of [Early British Computers. The Story of Vintage Computers and the People who built them](http://ed-thelen.org/comp-hist/EarlyBritish.html). classifies early calculating machines of the 1930′s into three types:

- Mechanical and electro-mechanical hand calculators
	These Machines could add, subtract, multiply and divide and were used by human computers to simplify their task.
- Electro mechanical Punched Card Tabulators
	These machines were used in commerce and government statistics to sort and count large quantities of data.
- Differential Analyzers
	These machines could solve differential equations considerably faster than other methods.

## What is Programming

Many early computing devices and advanced calculating devices were programmable to some degree. This increased their utility by changing them from single purpose devices into devices that could solve a variety of problems. There were two main methods of programming; Physical reconfiguration, and Symbolic Programming. Symbolic Programs can be further broken down into those which are stored externally (outside the machine) and internally (inside the machine’s memory) this distinction is important and will be covered in detail later.

Physically programmed devices required reconfiguration before they could solve a new problem. For mechanical and electro-mechanical devices this involved setting cogs and wheels in the correct starting positions and for electrical devices this was accomplished by reconfiguring some form of switchboard or even rebuilding or reconnecting parts of the machine. This process often took days and sometimes weeks to complete.

Symbolically programmed devices did not need to be physically reconfigured instead they were programmed by entering a sequence of instructions through an input device, usually some type of a punched card or tape reader. The holes in the cards or tape represented symbols that coded specific instructions that the machine could interpret and execute. The set of symbols was finite but it could be combined in many ways that allowed for great variety.

## What is a General-Purpose Computer

Just because a machine is programmable does not automatically make it General-Purpose. The term General-Purpose has a very specific meaning when applied to computers. In 1936 Alan Turing wrote a paper called On Computable Numbers with an Application to the Entscheidungs-problem. In this paper he described a simple computing machine and showed how this device could be programmed to calculate any computable number (given enough time and a large enough memory). This machine has since become known as a Turing Machine.

A Turing machine consists of:-

- A tape, divided into squares each of which contains one of two possible symbols (for example 1 and 0). The tape moves through the machine one square at a time in either direction.
- A device that can read and write symbols to the tape.
- A simple table of rules that governs the behavior of the machine. Each rule instructs the machine which symbol to write to the tape and the direction in which it should then move .
- A record of the current condition or “state” of the machine.

The machine reads the contents of the current square on the tape. It looks up the rule to execute in the rule table. The table is arranged by state and symbol. Each state and symbol combination has only one possible rule. There can be any number of states so the rule table can be very long, but it must be finite. The machine then overwrites the current square with the symbol indicated by the rule and moves the tape in the direction indicated by the rule. This cycle is repeated until the machine stops. A more formal definition is available from the [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/turing-machine/)

In his paper Turing defined a table of instructions that allowed a [Turing machine](http://www.turing.org.uk/book/update/tmjavar.html) to emulate any other Turning machine. This special class of Turing machine was called a Universal Machine.

It is possible to invent a single machine which can be used to compute any computable sequence. If this machine is supplied with a tape on the beginning of which is written the Standard Description [A Logical representation of a Turing Machine's table of instructions] of some computing machine M then It will compute the same sequence as M.

[On Computable Numbers with an Application to the Entscheidungs-problem](http://www.abelard.org/turpap2/tp2-ie.asp) 1934, Alan Turing.

Turing proved that a Universal Turing Machine can be used to calculate any computable number, in other words a Universal Turing Machine is a General-Purpose computer and is said to be Turing Complete. In this case General-Purpose is used in its mathematical sense, it means a Universal Turing Machine is capable of imitating any formally describable system (given enough memory). Furthermore, A Universal Turing Machine is symbolically programmable and stores its program in the same “memory” (the tape) it uses for its input data and intermediate data store. This, as we shall see later, is a crucial feature of the von Neumann Architecture. For the first time in 100 years the theory of machine computation had advanced beyond the vision of Charles Babbage.

Between 1936 and 1938, after he had written his paper on computability, Alan Turing became a graduate student at Princeton. He was invited to stay by John von Neumann who was in the Department of Mathematics there. Turing declined and returned to Cambridge. This event Is worthy of note because John von Neumann was to play a crucial role In later developments.

## Stored Program Computers and the von Neumann Architecture

In 1944 [John von Neumann](http://ei.cs.vt.edu/~history/VonNeumann.html) was head of computing on the Los Alamos Project. He visited the US Army Ballistics Research Laboratory at the University of Pennsylvania’s [Moore School of Electrical Engineering](http://www.seas.upenn.edu/about-seas/history.php) in search of computing devices. There he found the design for the [ENIAC](http://www.upenn.edu/almanac/v42/n18/eniac.html) complete and the design for the [EDVAC](http://ftp.arl.mil/~mike/comphist/61ordnance/chap3.html) just beginning. ENIAC had been designed to compute World War II ballistic firing tables. He spent the next year and a half as a consultant on the EDVAC project and he wrote the [First Draft of a Report on the EDVAC. 1945](//content/2003/2003-08-TheFirstDraft.pdf), In this document he defined the Conceptual Architecture of almost every computer built since then. Although von Neumann was the sole named author [J. Presper Eckert](https://en.wikipedia.org/wiki/J._Presper_Eckert) and [John W. Mauchly](http://www.library.upenn.edu/exhibits/rbm/mauchly/jwmintro.html) who designed ENIAC claim they devised the fundamentally revolutionary stored program aspect of EDVAC’s architecture.

The von Neumann Architecture describes roles, responsibilities and interactions of the following major components of a computer.

- Arithmetic-logic unit (ALU)
Implements elemental functional capabilities such as mathematical and logical functions (+ – / x AND OR)
- Control unit
Receives and interprets program instructions and either carries them out directly or causes another component (such as the ALU) to carry them out
- Memory
Retains data so they can be used at some later time. This data includes the program.
- Input/Output
A mechanism to input and output data
- Bus
Provides communication between all the components

[The First Draft](//content/2003/2003-08-TheFirstDraft.pdf) is remarkable in many respects.

- As an example of a well defined conceptual architecture it is worthy of study. It anticipates many modern design techniques such as practice of defining a system metaphor – von Neumann draws parallels with the brain throughout the paper. The clear description of the roles and responsibilities of the various architectural components without referencing implementation details shows von Neumann knew the dangers of getting into details too soon.
- The similarities between this paper and other works are remarkable. When read in parallel with the description of Charles Babbage’s Analytical Engine [Sketch of the Analytical Engine](https://www.fourmilab.ch/babbage/sketch.html) and Alan Turing’s 1936 paper [On Computable Numbers with an Application to the Entscheidungs-problem](http://www.abelard.org/turpap2/tp2-ie.asp#index) many parallels are immediately apparent.
- The Architecture itself demonstrates that it’s authors had a firm grasp of practical problem solving. The inclusion of the ALU discards the theoretical simplicity of a Turing Machine but reduces the complexity of the software needed to operate the machine – a brilliant compromise. And finally the most significant innovation was the ability to store the program in memory

In an externally programmed machine the tape or cards were read one symbol at a time and the machine immediately performed the action indicated by the symbol. If the machine needed to change the sequence of instruction execution the tape had to be reversed or advanced to the correct position. The process of advancing and reversing the tape was not implemented in many externally programmed machines. In those that did implement it the process was cumbersome at best and so slow that it’s use was kept to a minimum.

With an internally stored program the machine read the entire program into it’s own memory and then began to execute the program. Intermediate calculations could be stored in the same memory as the program. This approach gave the machine much greater flexibility Program instructions could be executed in various sequences as control could jump from one position to another at very little cost. Furthermore the program could even be re-written in memory as it was executing. As any programmer will tell you this is a double edge sword. Memory management has been the bane of programmers lives ever since. The problems associated with making an externally programmed machine with these same capabilities were such that while it was attempted to some degree it was never successfully realized.

If Turing’s paper and von Neumann’s First Draft are compared it is clear that the von Neumann Architecture is a conceptual model for the implementation of Turing’s theoretical Universal Machine. The similarities are striking. However, this does not mean von Neumann was influenced by Turing. The history of computing is replete with rediscovered concepts and ideas so I suppose it is possible that von Neumann was not aware of Turing’s work on computability, but not very likely given the fact that he had asked Turing to stay on at Princeton in the 1930′s. What is more possible is that J. Presper Eckert and John W. Mauchly had independently come up with the idea of stored memory program, but had not grasped its fundamental importance. Neither man was Turing’s equal when it came to Mathematics although von Neumann was in the same league and would definitely have understood the implications of the Universal Turing Machine.

## Classification of Computing Machines

It is clear that the calculating machines of the early 1930′s were not computers however, within 20 year innovations in the theory of computability, and advances in electronics, would lead to the modern computer. With hindsight it is possible to identify four different classes of machine that have all been called computers. These classes did not develop in strict chronological order but they do represent an evolutionary trend that resulted in the first modern computer. These classes are defined below.

- *Single purpose Computers* were able to solve simple mathematical problems such as addition, subtraction, and multiplication, of two numbers, or model a single complex system such as the solar system . Most of the [Mechanical and electro-mechanical hand calculators](http://www.vintagecalculators.com/html/mechanical_calculators.html) described by Lavington fall into this category as do Orrereys and even the [Antikythera Mechanism](http://www.math.stonybrook.edu/~tony/whatsnew/column/antikytheraI-0400/kyth1.html) of ancient Rhodes.
- *Special-Purpose Computers*. were able to solve a specific set of problems anticipated by their designers. These machines required physical reconfiguration before each calculating run. Charles Babbage’s Difference Engine I and II were early examples of this type of machine, Later examples were the differential analyzers of the 1930′s. The early code breaking machines of the Second World War (the [Bombes](http://www.ellsbury.com/enigmabombe.htm) and the [Colossus Mk I](http://www.connected-earth.com/Journeys/Digitaltechnologies/Intothedigitalera/Thecomputeragedawns/index.htm)) and the [ABC](http://jva.cs.iastate.edu/operation.php) were also in this class.
- *General-Purpose Externally Programmed Computers* were able to solve a large set of problems many of which may not have been anticipated by their designers. Charles Babbage’s [Analytical Engine](http://www.fourmilab.ch/babbage/), [ENIAC](http://www.library.upenn.edu/exhibits/rbm/mauchly/jwm8.html) , the [Collosus Mk II](http://www.connected-earth.com/Journeys/Digitaltechnologies/Intothedigitalera/Thecomputeragedawns/index.htm)
machines, and the Zuse Z3 where all examples of this type of machine. These machines relied on external programs or physical reconfiguration. Theoretically these machines were General-Purpose. However, from a practical point of view they were only ever operated as multi-purpose machines. They were just too slow and cumbersome to be used as real general-purpose machines.
- *General-Purpose Internal Stored Program Computers*. were able to solve any computable problem, given enough memory. These machines followed the von Neumann architecture and stored their program in their own memory along with the data it operated upon. This is the crucial differentiating feature the modern general-purpose machines. The machines included [Baby](http://curation.cs.manchester.ac.uk/computer50/www.computer50.org/index.html?man=true), [EDSAC](http://www.cl.cam.ac.uk/events/EDSAC99/reminiscences/), [BINAC](http://www.palosverdes.com/lasthurrah/binac-description.html) [EDVAC](http://www.library.upenn.edu/exhibits/rbm/mauchly/jwm9.html) and many others

Almost every computer built since 1950 has been a General-Purpose, Stored Program machine. Furthermore the term Computer now refers exclusively to this category. General-Purpose, Externally Programmed machines are extinct. Special Purpose machines exist only inside other devices; automobile ignition systems, cell phones, smart cards, scientific digital calculators etc. Single purpose machines rarely exist in physical form at all. Today they usually take the form of software applications that run inside general purpose computers. From these facts we can conclude that the first computer, in the modern sense of the word, was the first General-Purpose, Stored Program Machine.

A slightly more formal definition:-

A modern computer is a General-Purpose, Stored Program machine. It implements all the components of the von Neumann Architecture and is therefore able to efficiently take full advantage of the fact that it is Turing Complete, within the constraints of it’s finite memory.

It should be noted that there are people who will dispute this definition. I believe their dispute is based on the belief, or desire to believe, that ENIAC, the Colossus II, the Zuse Z3, or some other General-Purpose Externally Programmed computer was the first modern computer. I believe they are wrong. In theory these devices were General-Purpose computers (see the demonstration that the Zuse Z3 was a Universal Computer) but in practice they were multi-purpose at best. This is the crux of the debate. I believe a truly modern computer requires a memory to store a program internally as this is the only practical way of building a General-Purpose machine. While Externally Programmed computers may have been General-Purpose in theory they were a long way form General-Purpose in practice.

## The First General Purpose Stored Program Computer

In the Late 1940′s the challenge for those involved in the development of advanced computing devices became the construction of a reliable memory in which a program and data could be stored. In 1947 [F. C. Williams](http://curation.cs.manchester.ac.uk/computer50/www.computer50.org/mark1/williams.html) and [Tom Kilburn](http://curation.cs.manchester.ac.uk/computer50/www.computer50.org/mark1/kilburn.html) working at Manchester University in the UK developed a novel Cathode-Ray tube memory device called the Williams tube or more properly the [Williams-Kilburn Tube](http://curation.cs.manchester.ac.uk/computer50/www.computer50.org/kgill/williams/williams.html). Together with G.C. Tootill they built a small prototype stored memory computer to thoroughly test their invention. The first machine to successfully implement the von Neumann Architecture was, Baby, [The Small Scale Experimental Machine (SSEM)](http://curation.cs.manchester.ac.uk/computer50/www.computer50.org/mark1/new.baby.html), also known as the Manchester Mk I Prototype. This machine ran the first stored program in the morning of the 21st June 1948. It took 52 minutes to execute. This was the first operational computer in the modern sense of the word.

<div align="center">
{% capture images %}
    /images/2003-08-Williams-Kilburn-tube.jpg
{% endcapture %}
{% include gallery images=images caption="Williams-Kilburn Tube" cols=1 %}
</div>

The diagram below shows a reconstruction of the original program as best as Tom Kilburn and G.C. Tootill could remember it in 1996. It found the highest proper factor of a number by using repetitive subtraction simulate division.

<div align="center">
{% capture images %}
    /images/2003-08-FirstProgram.jpg
{% endcapture %}
{% include gallery images=images caption="The first program" cols=1 %}
</div>

## General-Purpose Externally Programmed Computers

General-Purpose Externally Programmed Computers began to appear in the late 1930′s and became extinct in the 1950′s. They were a short-lived stage in the evolution of computers – Not quite a computer and more than a calculating machine.

ENIAC is often described as the first General-Purpose ComputerI believe this is incorrect. It is not clear that ENIAC, was Turing Complete. In it’s original format ENIAC was programmed by physical reconfiguration and this was a complex time consuming task. There were definable computational tasks that ENIAC could not perform.

> In programming the ENIAC by plugging cables, its users were literally rewiring the machine each time, transforming it into a special-purpose computer that solved a particular problem. In a sense this is what happens whenever one programs a modern computer; only with the ENIAC, as with the Differential Analyzer from which the concept was derived, the changes were made by a person rather than automatically by the computer itself.
> 
> The important point is that however time-consuming the setup period was, it allowed the ENIAC to solve a wide range of mathematical problems, including many that its designers never anticipated. It was not fully a “general-purpose computer” – for example, it could not solve large systems of linear equations as Atanasoff’s machine was designed to do. But its ability to be reconfigured to perform an almost limitless sequence of steps, including iterative loops of operations, sets the ENIAC apart from the other electronic calculators described thus far, and places it astride the categories of “calculator” and “computer.”
> 
> [Computing Before Computers](http://ed-thelen.org/comp-hist/CBC.html). Edited by William Aspray
with contributions by W. Aspray, A. G. Bromley, M. Campbell-Kelly, P.E. Ceruzzi, M. R. Williams. copyrighted 1990 Iowa State University Press, Ames, Iowa ISBN 0-8138-0047-1

ENIAC’s status as the first computer is largely due to two factors. The, American claim was made in 1946 before the revolutionary significance of stored program computing was widely understood and before knowledge of other earlier devices was widely available.

Only America, was [prepared to admit it had developed a General-Purpose computer](http://ftp.arl.mil/~mike/comphist/eniac-story.html) in the immediate post war years. For 30 years after the War’s end the United Kingdom did not mention the crucial role Bletchley Park played in winning the battle of the North Atlantic and significantly shortening the war. They did not mention [Alan Turing](http://www.turing.org.uk/index.html)‘s vital contributions and therefore, conveniently, did not have to mention how they had [driven him to suicide by mercilessly persecuting him for his homosexuality](http://www.turing.org.uk/publications/oration.html). In particular they did not mention the [ten Colossus Mk II machines](http://www.codesandciphers.org.uk/virtualbp/fish/colossus.htm) and the people who built and operated them. These machines were developed to break the German code named Fish produced by the Lorenz cipher machine. Like ENIAC, the Colossus MK II machines were General-Purpose, Externally Programmable machines that supported conditional branching. The first Colossus Mk II was operational on June 1st 1944 in time for the D-day invasion. By contrast ENIAC became operational in the fall of 1945 after the war ended.

Another claim made by the pro-ENIAC lobby is that only ENIAC had any direct decedents. In effect they claim that the secrecy surrounding Colossus Mk II and the obscurity of other machines prevented any of the knowledge gained from being reused. This of course is nonsense. Both Max Neumann and Alan Turing had direct knowledge of Colossus Mk II machines and both were involved in the development of the [Manchester Mk I Prototype](http://curation.cs.manchester.ac.uk/computer50/www.computer50.org/mark1/MM1.html). Many others from Bletchley Park went on to work on in the fledgling UK computer industry were they were free to use their skills and knowledge of electronic computing even though they remained bound never to speak of Bletchley Park.

An even earlier machine that also lacked publicity but not influence was the one constructed by John Vincent Atanasoff and Clifford Berry at Iowa State University. Together they built a prototype machine in 1939 and a full-scale model in 1942. The Atanasoff-Berry Computer, or ABC as it was also known did not operate for long and was much slower and simpler than ENIAC. It was dismantled during the second world war but not before [John W. Mauchly had seen it and quizzed Atanasoff about Its operation](http://www.library.upenn.edu/exhibits/rbm/mauchly/jwm7.html). The inventors of ENIAC certainly had knowledge of the ABC and even lost a patent infringement court case over patents filed in relation to the ABC.

But the ABC and Colossus Mk II machines were not the first operational General-Purpose, Externally Programmed machines either. Konrad Zuse was almost completely ignored in his native Germany. During the Second World War he struggled with inadequate funding but still managed to build the Zuse Z3. This was the third in a series of machines that he started in 1934. The Z3 was operational in 1941 and was program controlled by an external program coded on punched movie film, it had a memory and was constructed of relays. In a recent paper Ra