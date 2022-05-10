---
layout:     post
title:      "Templated Shader"
image:      TemplatedShader
tag:        DEV
---

When there are many Properties in a Shader, how to reuse these Properties, we can't use “Include” because Unity doesn't provide this feature. There are many other cases like this, except for hlsl code, many other things cannot be reused by multiple shaders at all. So we have to copy and paste it over and over again in each shader, and always remember where it is used when maintaining it. For example, if the following code is used in other shaders, we have to copy and paste it manually.<!--more-->

```
Properties
{
    _Property1 ("", Float) = 0
    _Property2 ("", Float) = 0
    _Property3 ("", Float) = 0
    _Property4 ("", Float) = 0
    _Property5 ("", Float) = 0
    // ... other properties
}
```

Have you ever been in a situation where this is a really painful experience?

Of course there is another case. Let's say I need to maintain an Uber Shader, which is a Shader with a lot of Variants, which results in a long compilation time and a lot of memory usage. We know that the overhead increases a lot with each additional Variant, and not all combination will be used, so what we need to do is to separate the common Variants from it, so that the overhead can be reduced significantly. If you use SRPBatching at the same time, then you run into a headache. Gosh, the maintenance cost increases again. Note that we can't reorganize the Constant Buffer by using macro definitions, so it's not feasible to do the following.

```
CBUFFER_START(UnityPerMaterial)
    float _Property1;
    float _Property2;
    #ifdef _VARIANT1
        float _Property3;
    #endif
    float _Property4;
    float _Property5;
    // ... other properties
CBUFFER_END
```

This will cause the Shader to be incompatible with SRPBatching and we will get the following warning message.

![SRP Batcher not compatible]({{site.url}}/{{site.post_images}}/TemplatedShaderB.jpg)

![UnityPerMaterial CBuffer inconsistent size inside a SubShader]({{site.url}}/{{site.post_images}}/TemplatedShaderA.jpg)

The reason for this is that SRPBatching must ensure that the length of the ConstantBuffer for each Shader is constant, so that a ConstantBuffer can be shared between different Variant.

And what I'm going to do here is to templatize the Shader, which can be a good solution to the above mentioned problem. Let's take a look at what the final result looks like.

```
Shader "Custom/Brick"
{ 
    Properties
    {
        INCLUDE SHADER PropertiesCommon.txt
        INCLUDE SHADER PropertiesBrick.txt
    }
    SubShader {
        INCLUDE SHADER TagOpaque.txt

        HLSLINCLUDE
            INCLUDE SHADER CommonInclude.txt
            INCLUDE SHADER CBuffer_Brick.txt
        ENDHLSL

        INCLUDE SHADER ShadingPasses.txt
    }
}
```

You can see that I have included everything that can be reused by "Include", instead of copy-pasting manually. The advantage of this is that the structure of the Shader becomes very clear, and the code can all be reused and the maintenance cost is greatly reduced.

The key point to implement this feature is how to make Unity aware of our newly added rules and parse the above code into something that the compiler recognizes. There is a very useful API provided by Unity, ScriptedImporter, where any custom resource in Unity can be imported in its own way, similar to the code below.

```
[ScriptedImporter(1, "myshader")]
public class MyShaderImporter : ScriptedImporter
{
    public override void OnImportAsset(AssetImportContext ctx)
    {
        string content = GenerateCode(ctx.assetPath);
        Shader shader = ShaderUtil.CreateShaderAsset(content);
        ctx.AddObjectToAsset("MainObject", shader);
        ctx.SetMainObject(shader);
    }
    // ......
```

The above code means that any file with myshader as a suffix will be parsed and imported by it's way. This allows us to implement our own Shader import process to achieve the functionality mentioned above.

<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>
