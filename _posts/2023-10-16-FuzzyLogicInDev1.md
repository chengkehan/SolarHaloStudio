---
layout:     post
title:      "Fuzzy Logic In Game Development Part 1"
image:      FuzzyLogicSystemPreview
tag:        DEV
---

Some time ago, an editor tool was developed in order to use fuzzy logic to edit the numerical calculations of NPCs in the game. According to my personal understanding, fuzzy logic can't really be considered as artificial intelligence, but only to make the characters look intelligent, or to make the values avoid too many traces of artificial settings. Here I would like to give a simple definition of this tool, which has been used in game development, as a visual and perceptual numerical (formula) design tool. What exactly I mean, I hope the following explanation will clarify the issue.<!--more-->

Here is a simple example to illustrate. In the game, we need to calculate the favorability of NPCs for the protagonist, and here's how to design it, using fuzzy logic thinking.

First of all, the final favorability value is influenced by two factors, positively increasing favorability and negatively decreasing favorability. Then the final output in fuzzy logic will look like the figure below.

![]({{site.url}}/{{site.post_images}}/FuzzyLogicInDev/FuzzyLogicInDev1.png)

The area of the red area indicates negative minus favorability and the area of the green area indicates positive plus favorability. The white dot in the center is the center of gravity of the red and green areas, which is the final favorability output value. Let's just look at the value of the white dot on the x-axis, in the above figure the final favorability output value is 50, as to what the unit (or meaning) of this output value is, it depends on the definition of the requirement, in our game, 0 is no favorability at all, 100 is full favorability.

By looking at the graph above, you may have noticed the problem. No matter how much the size of the red area is compressed, even if the red area disappears completely, the favorability will never reach full favorability.

![]({{site.url}}/{{site.post_images}}/FuzzyLogicInDev/FuzzyLogicInDev2.gif)

This means that the x-coordinate of the white center of gravity cannot reach 100, which might be used as a feature in the design of some systems, but obviously cannot be done in our goodness-of-fit system. Of course we can't simply remap the maximum and minimum values of the final output back to the 0 to 100 range, because the maximum and minimum values change as the top and bottom sides of the red and green trapezoids change. So after the redesign, the final output image of the fuzzy logic would look something like the following.

![]({{site.url}}/{{site.post_images}}/FuzzyLogicInDev/FuzzyLogicInDev3.png)

After adjustment, when the area of the red trapezoid is compressed to 0, the white center of gravity will fall exactly at the x-coordinate of 100. Similarly, when the area of the green trapezoid is compressed to 0, the white center of gravity will fall exactly at the x-coordinate 0. In this way, the effect of no favorability and full favorability can be achieved.

![]({{site.url}}/{{site.post_images}}/FuzzyLogicInDev/FuzzyLogicInDev4.gif)

Next, let's analyze what factors affect the positive increase in favorability. In the game, conversations and gifts are the most basic settings that will affect positive favorability, as well as reaching the quests entrusted by NPCs, etc. Here is an example of how to use fuzzy logic to design this. Here's an example of how to use fuzzy logic to design them.

First is dialog. A common setting is the frequency of conversation, NPCs will have their own personality, different personalities can accept the frequency of conversation will be different, so the player needs to understand the NPC, choose the appropriate frequency of conversation, in order to maximize the increase in goodwill. Of course, if there is a sociopathic NPC in the game, excessive conversations will reduce goodwill, then this setting should be placed in the negative direction to reduce goodwill, not here.

Before designing the conversation frequency of NPCs with different personalities, let's first design a balanced type, which means that the personality of this NPC will not be too extreme, not social cow, not social terrorism, and not too aggressive in terms of value. From the performance point of view, the player can get a stable positive favorability increase with a normal conversation rhythm. If the player has more conversations with this NPC, then there will be more positive favor increases. If the player has fewer conversations with this NPC, then there will be less positive favor increases. The relationship is linear.

![]({{site.url}}/{{site.post_images}}/FuzzyLogicInDev/FuzzyLogicInDev5.gif)

From the figure, we can see that with the increase of dialog frequency, the low frequency value of red is getting smaller and smaller, and finally tends to zero, while the high frequency value of green tends to one. With the two values of red and green, it is necessary to correlate them with the current fuzzy logic output to form an output called "Dialogue Frequency - Favorability - Positive Effect".

![]({{site.url}}/{{site.post_images}}/FuzzyLogicInDev/FuzzyLogicInDev6.png)

Here, we connect the outputs of the two frequencies, red and green, directly to the two connectors on the current total fuzzy logic output. Finally we get the effect shown below.

![]({{site.url}}/{{site.post_images}}/FuzzyLogicInDev/FuzzyLogicInDev7.gif)

When the conversation frequency is very low, the positive effect on favorability is also very small, and the area of the yellow trapezoid is much larger than the area of the blue trapezoid, so the output value of the white center of gravity point is close to zero. When the drawing review rate becomes gradually higher, the positive effect on favorability becomes gradually larger, and the change in the area of the yellow trapezoid and the area of the blue trapezoid results in a change in the center of gravity of the entire graph. In this way, a basic fuzzy logic of "conversation frequency - favorability - positive effect" is obtained.

We'll use this as a base to design a few NPCs with their own personalities, whose values won't be as linear as the above.

Coming Soon ...

[https://github.com/chengkehan/FuzzyLogic](https://github.com/chengkehan/FuzzyLogic)

<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>

