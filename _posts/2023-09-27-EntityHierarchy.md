---
layout:     post
title:      "Entity Hierarchy"
image:      FuzzyLogicSystemPreview
tag:        DEV
---

The hierarchy of two objects can be established by using two defined IComponentData, Parent and Child. When establishing hierarchy, we should follow the principle of bottom to top, that is to say, we only need to use Parent to establish hierarchy from bottom to top, we don't need to care about the establishment of Child relationship, because Parent and Child are correspondent, so TransformSystem will automatically establish the relationship of Child according to Parent.<!--more-->

Entity that needs to establish hierarchical relationship must have LocalToWorld and LocalTransform components, otherwise the hierarchical relationship cannot be established.

The above mentioned concepts, Parent and Child, belong to Transform, that is, they exist for controlling the coordinates, rotation and scaling of the object. The parent-child relationship is established so that the child object will inherit the transformations of the parent object.

However, when we delete the parent Entity, we realize that the child Entity is not deleted, but still exists in the World. This is different from what we originally thought. We need to use LinkedEntityGroup to associate the parent Entity with the child Entity, so that when we delete the parent Entity, the child Entity is automatically deleted from the World.

So Transform is just a parent-child hierarchical inheritance of affine transformations, there is no linkage beyond that.

In practice, this operation is very easy to make mistakes, so we can encapsulate the Parent, Child and LinkedEntityGroup when establishing the parent-child hierarchy. When SetParent is set, the LinkedEntityGroup is automatically used to associate or disconnect the parent-child relationship, so as to achieve the purpose of normal human cognition.

[https://docs.unity3d.com/Packages/com.unity.entities@1.1/manual/transforms-concepts.html]()
[https://docs.unity3d.com/Packages/com.unity.entities@1.0/api/Unity.Entities.LinkedEntityGroup.html]() 

<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>

