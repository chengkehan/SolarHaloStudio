---
layout:     post
title:      "Fuzzy Probability"
image:      FuzzyLogicSystemPreview
tag:        DEV
---

Bayesian analysis + fuzzy logic

Classical probability calculations require the use of a large number of samples for analysis to obtain an exact value that approximates the optimum. Bayesian analysis, on the other hand, requires only a small number of samples because its purpose is not to compute the exact value, but to compute the distribution of probabilities.<!--more-->

This is very similar to the way our brain thinks. For example, when we want to go somewhere, there are three paths to choose from. We evaluate the combination of roads in our brain based on our experience to get an initial path plan to reach our destination on time. And there is no guarantee that this option of path planning will be better than the other options, nor will there be an exact value, only that it is relatively better in some way.

Using one's own life experience to predict and evaluate the road conditions, we can call this behavior the prior probability in Bayesian analysis.

This is the biggest divergence between Bayesian analysis and classical probability. In classical probability, there is absolutely no allowance for the existence of such seemingly subjective things, which are considered unscientific. And it is with this subjective prior probability that a small sample of Bayesian analysis is possible.

So does the subjective prior probability lead to completely wrong results. Compared with traditional probability calculation, Bayesian analysis does not directly calculate the specific result of probability in one step, but gradually optimizes the probability distribution. In fact, for many problems, there is also no way to directly use the classical probability calculation to get a specific probability value.

Due to this characteristic of Bayesian analysis, it leads to a relatively large tolerance of accuracy for each iteration. For example, it is possible to give up part of the accuracy to achieve improved computational efficiency, which led to the emergence of plain Bayes. That is, the conditions are opened independently and do not affect each other, which leads to a significant reduction in computational effort as the conditions are not dependent on each other.

Let's use an example similar to the one above to see how Bayesian analysis works in path planning. For example, in a game where we need to send instructions to a caravan to automatically deliver goods from city A to city B. Obviously there is not just one path from city A to city B, but suppose there are three alternative paths. Then we have to consider several points before delivering the goods. First, the path chosen by the caravan is to be smooth. By smooth, I mean that it is better to have a big road rather than a bumpy path or a mountain road, better to have no hostile forces on the path, better to have a post on the path, better to have a short path, and so on. Secondly, since the caravan is carrying food, it must arrive within the specified time, otherwise the food will spoil.

For this problem, our human brain basically already has its own ideas, and we can vaguely describe a scheme, but now we need to turn these ideas into something that can be data-driven so that the caravan can go through it automatically.

For example, a flat road would have a higher Rank than a rugged mountain road, and passing through an ally's city would have a higher Rank than passing through a dangerous area, and the path with the highest score would win.

The advantage of this method of using Rank values is that it is simple and straightforward, while the disadvantage is that it is too rigid and absolute. Because the algorithm is a constant accumulation of values, the total score calculated for a path is relatively fixed and lacks variables. When each new condition is added, the maximum value of the Rank value will be increased, and then the original set interval will need to be adjusted, which is very inconvenient. It is also too absolute to use the Rank value to determine whether the conditions can be reached on time.

Therefore, we use Bayesian analysis to build the framework and use fuzzy logic to fill it.

Since each path is calculated in the same way, we look at only one path.

We write the probability that the first path is clear as P(A1) and the probability that the path is clear and can reach the end point on time as P(B|A1), then the probability that this path can reach the end point on time is P(A1)P(B|A1).

P(A1) is calculated using fuzzy logic, where we represent each condition as a fuzzy logic input and finally inverse fuzzy output of all inputs to obtain P(A1). A great advantage here is that we can use fuzzy logic to limit the range of values between 0 and 1, which is very convenient for subsequent analysis and calculation.

Similarly, the probability that the caravan takes the second path and the third path reaches the end on time is P(A2)P(B|A2) and P(A3)P(B|A3).

The total probability of the caravan arriving on time at the end from the starting point is P(A1)P(B|A1) + P(A2)P(B|A2) + P(A3)P(B|A3). We can use fuzzy logic for each probability and decide which path is more feasible. Similarly, we can use fuzzy logic for the total probability, and when the fuzzy logic output is almost impossible to reach, then we as the commander have to carefully consider this platooning order.

The above analysis is from the point of view of the player giving the order for the caravan, so if we look at it from the point of view of the enemy force. When the enemy sees that the caravan has successfully completed this important resupply mission, resulting in a disadvantage to itself, the enemy needs to consider which road the caravan is most likely to come from, and in the subsequent AI processing, it will set up garrisons on this priority road to intercept the resupply.

This is where the Bayesian formula comes into play.

From the enemy's point of view, the probability of the caravan choosing the first path is, P(A1|B) = P(A1)P(B|A1) / (P(A1)P(B|A1) + P(A2)P(B|A2) + P(A3)P(B|A3))

Similarly, the probabilities of the caravan choosing the second and third paths can be introduced. These three probability values are fed into the fuzzy logic, and then the output of the fuzzy logic is used to determine the next AI's behavior.

<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>

