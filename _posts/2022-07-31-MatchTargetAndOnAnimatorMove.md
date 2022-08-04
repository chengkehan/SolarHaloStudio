---
layout:     post
title:      "MatchTarget And OnAnimatorMove"
image:      MatchTargetAndOnAnimatorMove
tag:        DEV
---

We can control root motion in a callback function named OnAnimatorMove, and adjust Humaniod position and rotation with MatchTarget. If we use both the two functions, there maybe some problems.<!--more-->

I cann't get any effect with MatchTarget when OnAnimatorMove is enabled. But when I disable OnAnimatorMove, everything seems well. So maybe there is a conflict between them.

After test many times, I get a stable way to do this.

```
private void OnAnimatorMove()
{
    animator.ApplyBuiltinRootMotion();
    
    // Do MatchTarget here. 
}
```

MatchTarget must be placed in OnAnimatorMove and after ApplyBuiltinRootMotion. By this way I will get a correct animation. I don't know if there is any other way, but it's good so far. 

<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>
