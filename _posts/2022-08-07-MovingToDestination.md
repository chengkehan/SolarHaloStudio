---
layout:     post
title:      "Moving To Destination"
image:      MatchTargetAndOnAnimatorMove
tag:        DEV
---

Moving a object from one point to another is the simpliest and the most fundamental feature in game develop. We can refer to implementation of Vector3.Towards. The things we should note is how to make sure arrived a point exactly. Everything seems so simple. But when we use RootMotion, this method is not so good.<!--more-->

```
public static Vector3 MoveTowards (Vector3 current, Vector3 target, float maxDistanceDelta)
{
    float num = target.x - current.x;
    float num2 = target.y - current.y;
    float num3 = target.z - current.z;
    float num4 = num * num + num2 * num2 + num3 * num3;
    if (num4 == 0f || (maxDistanceDelta >= 0f && num4 <= maxDistanceDelta * maxDistanceDelta)) {
        return target;
    }
    float num5 = (float)Math.Sqrt (num4);
    return new Vector3 (current.x + num / num5 * maxDistanceDelta, current.y + num2 / num5 * maxDistanceDelta, current.z + num3 / num5 * maxDistanceDelta);
}
```

The most difficult thing is we can't predict position of root node in RootMotion. Because of it's controlled by 3D authoring tools and implement by Unity engine. The different blend settings will cause a more inexactly rotation value and translation value.

Let's imaging a case. 3D artist made a animation that a role move forward straightly. When we import it into Unity and play, we find a problem. The role used this animation can't move forward completely straightly. After several frames, role will deviate from forward direction. Even if 3D artist do some adjustments in authoring tool, the problem cann't be solved completely. The accumulation of floating number will make a bigger deviation. Role always can't reach destination by this animation.  

![]({{site.url}}/{{site.post_images}}/MovingToDestinationA.gif)

And in another case. 3D artist made a turning animation of 180 degree. We import it into Unity and play. Everything seems good so far until blending with other animations. For example, a role walks forward and then turns 180 degree, walks toward the other side. Because of the blending of turning animation and walking animation, turning degree will be less than 180 degree. If we don't do any adjustment and play walking animation directly after turning animation, the role's face direction will be unexpected. 

![]({{site.url}}/{{site.post_images}}/MovingToDestinationB.gif)

Fortunately, we can use Animator.MatchTarget to adjust role's rotation to keep role face to destination as much as possible. But we still can't check whether role has already arrived at destination. 

![]({{site.url}}/{{site.post_images}}/MovingToDestinationC.jpg)

As you can see the image above, role move from red point to green point. The blue way is the perfect path. When role stand on red point, he is not facing to green point, but to the red dashed direction. If we don't do any adjustment and play walk animation directly, role will walk along the red dashed arrow. It's clearly not what we want to see. 

When role is playing walking animation, we adjust he's rotation with Animator.MatchTarget to keep role face to destination as much as possible. Finally, role's track is the yellow curve. Role will not walk through green point in a high probability, even far away from green point. 

It's a difficult problem to check whether role has already arrived at green point, and then do other things. So I use a trick way to do this.

![]({{site.url}}/{{site.post_images}}/MovingToDestinationD.jpg)

When role is walking along the yellow curve, the angle between green vector and red vector(forward direction of role) will be changed. We counld assume that role arrived at green point when angle is greater than 90 degree. It not must be 90 degree, we can try and test many times to get a good threshold value.

By this way, we will get a smoothness track, rather than a stiffest turning.

<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>
