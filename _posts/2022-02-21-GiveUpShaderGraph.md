---
layout:     post
title:      "Give up ShaderGraph"
image:      GiveUpShaderGraph
tag:        DEV
---

I used to write shader code directly in text editor. It's a powerful way because of everything is under the control. Lighting, animation, FX effect etc., I can access all data of these things and modify them.<!--more-->

ShaderGraph is a good tool that I can make shader without any code. There are many utilized nodes, with these nodes I can get a good effect more quickly and more easier.  Another good thing is I don't need to care about many details but more attentions on game develop. And Even if I update the version of engine and rendering pipeline, there are not many changes. 

![]({{site.url}}/{{site.post_images}}/GiveUpShaderGraphA.jpg)

It seems perfect until I realize ShaderGraph is still mutilated. Some important features are not implemented, and there are not any workarounds. This affected my development.

Stencil: Not supported. It very terrible if you have many features rely on Stencil.

LightMode: I'd like render specified pass with custom LightMode. I can't customize LightMode with ShaderGraph. 

Multi-pass: The same with LightMode.

RenderState: This means there is no way to modify ZWrite, ZTest, ColorMask etc. Sadly. 

These problems have beed mentioned many times in Unity Forum, there is still not any improvement. We cann't see any plan in Roadmap. Finally, I decide to give up ShaderGraph and convert all these nodes to code style ,although I have already made many shaders with ShaderGraph in my Indie game. 

<br>
<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>
