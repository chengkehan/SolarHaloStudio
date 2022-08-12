---
layout:     post
title:      "Single Precision Float Point Format"
image:      SinglePrecisionFloatPointFormat
tag:        DEV
---

This is an interesting passage about Single Precision Float Point. The results may seems incredible, but it's reasonable once we understand all things.<!--more-->

Let's take a look at some codes and what do you think of the output.

```
float a = 100000000;
float b = 99999996;
print(a == b);
```

If you can't confirm your judgment, please type with your familiar program language, then run it, C++, C, C#, java etc. 

Now you have already got a result. The two values are equal. I don't know whether you are so surprised as I am when you see the output. Now that we got the result, Let's try to anaylize this. I will start with the easy way out, instead of some complex concepts.

First let's take a look how big value is Float format can be stored? If the program languare you used is up to standard named IEEE 754 and there is not implicit format cast, the maximum value of Float format should be 3.402823E+38. What is E+38 means? We counld think it as 10 to the 38 power. It's a so large number so that we never think of it. 

Now a question in my mind. Both Integer format and Float format are stored in 4 bytes, why the maximum value of Float format is so large while the maximum value of Integer format is much smaller? 3.402823E+38 is stored in 4 bytes of Float format and 2147483647 is stored in 4 bytes of Integer format.  

If you look closely, you will found out the magic under handkerchief. Let's try to write down the normal format of  3.402823E+38, rather than scientific notation. It's 340282300000000000000000000000000000000. As you can see, precision of low end side is lost completely. It means, If we'd like to record a large number in it, precision of low end side will be lost, and If we'd like to preserve precision after decimal point, a relatively small number can be stored in it and we have to give up precision of high end side. That's why we call it Float Point Format.

Now Let's take a look the problem at the top of this post again. Do you understand why the two numbers are equal? 100000000 is a large number, to store it in float format, precision of low end side is lost, the same as  99999996.

| decimalism | binary | 
| ---- | ---- |
| 100000000 | 101111101011110000100000000 |
| 99999996 |  101111101011110000011111100 |

When we cut the low end side of binary, the two numbers are the same completely.

The above explanation may not be particularly accurately about this problem, hope that helps you undertand it preliminarily.

Read More : [https://en.wikipedia.org/wiki/Single-precision_floating-point_format](https://en.wikipedia.org/wiki/Single-precision_floating-point_format)

<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>
