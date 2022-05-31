---
layout:     post
title:      "Per Renderer Data Tricks in URP"
image:      CustomPerRendererDataTricksURP
tag:        DEV
---

How to send data to per renderer to make each renderer get different color(or other properties)? It's not obvious in Universal Rendering Pipeline. 

In Standard Rendering Pipeline, we can set data to MaterialPropertyBlock and send it Renderers, then read all these data in material. But it will cause a problem if we to do so. I will break SRPBatching. We will get a message in FrameDebug.

```
SRP: Node is not compatible with SRP Batcher
```

It means we cann't send PropertyBlock to material. Fortunately, there is a workaround to do this. Let's take a look at these images.

![]({{site.url}}/{{site.post_images}}/CustomPerRendererDataTricksURPA.png)

The key in this image is Per Object Large Buffer. Unity Engine will maintain and update it as fast as possible. It's updated every frame. Interesting thing is not all fields in Per Object Larger Buffer is used depending on your use case.

![]({{site.url}}/{{site.post_images}}/CustomPerRendererDataTricksURPB.png)

unity_DynamicLightmapST is a good choise for me. I can turn on real-time lightmap and assign my custom data to it, then read data in material.

```
// C#
meshRenderer.realtimeLightmapIndex = 0; // turn on real-time lightmap
meshRenderer.realtimeLightmapScaleOffset = new Vector(myData, myData, myData, myData)

// HLSL
#define MyData1 unity_DynamicLightmapST.x
#define MyData2 unity_DynamicLightmapST.y
#define MyData3 unity_DynamicLightmapST.z
#define MyData4 unity_DynamicLightmapST.w
```

It is worth mentioning that if I'd like to send huge data to material while a field is unable to do this. Now I can create a big constant buffer and using a field as index to fetch from this constant buffer.

<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>
