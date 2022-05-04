---
layout:     post
title:      "Add More Details to Material"
image:      AddMoreDetailsToMaterial
tag:        DEV
---

I'd like to add more brush strokes to the graphical presentation of the game to give it a more hand-drawn look and lean more towards the wasteland style. The original textures looked too smooth, which made the objects look all new, so it needed a makeover. But if I were to manually overlay a brush layer on all the textures, the workload would be enormous and the quality would be hard to guarantee. So I've been looking for a way to generate strokes automatically.<!--more-->

![]({{site.url}}/{{site.post_images}}/AddMoreDetailsToMaterialA.jpg)

After numerous attempts, I got a method that I am still satisfied with. Here is the current result, which can be compared with the above version.

![]({{site.url}}/{{site.post_images}}/AddMoreDetailsToMaterialB.jpg)

As you can see, after overlaying this layer of brushes, the effect of the wasteland is increased a lot, and the hand-painted feeling is stronger.

You'll notice that the new brush layers aren't generated completely randomly, and that the direction of the brushes roughly follows the light and dark relationships of the lighting. How is this done? I'll document the method of implementation here.

First find a software that can generate brush effects. There are many stylized photo processing software that can do this. The type of brush depends on the type of stylization chosen, whether it is oil painting style or watercolor style. This kind of software usually has pre-set parameters for a certain style, so I just need to fine-tune the parameters and save them as custom parameters. Of course, Photoshop also has this kind of filter, you can try it.

Then you just need to import the images into the software and apply the preset parameters. The key is which image to import. Here I chose to use the Green channel of the normal mapping.

![]({{site.url}}/{{site.post_images}}/AddMoreDetailsToMaterialC.jpg)

As you can see from the figure, the Green channel gives the visual impression that there is a light shining from above, with the upper part of the fold being illuminated and the lower part of the fold in the shadow. This way, when the software generates strokes, it does not generate bright strokes in the dark areas and ruin the lighting effect. The final result is the image below.

![]({{site.url}}/{{site.post_images}}/AddMoreDetailsToMaterialD.jpg)

Perhaps a thicker stroke would have been better, and I will continue to tweak this, but overall I have achieved the effect I wanted and can see the correct relationship between light and dark.

The last thing is how to overlay this image on top of the original layer. I used something like Photoshop's SoftLight layer blending mode. Of course, instead of blending the two layers directly in Photoshop, the process is written into the material so that there are more parameters to control the effect. If you look closely, you will see that the highlight area in the generated brush layer is too bright, so I added a color scale adjustment to the material to darken the highlights of the brush layer.

The above is the complete process which is documented here.

<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>
