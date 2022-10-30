---
layout:     post
title:      "Overwrite Undo Redo of Unity"
image:      OverwriteUndoRedoOfUnity
tag:        DEV
---

I'd like to develop a customized undo/redo system for an editor tool. There are two major reasons to let me give up the implementation of undo/redo of Unity Built-in.<!--more-->

All my classes are not inherit from UnityObject. As we known, we can't pass SystemObject to UnityUndo System. Of course, add some texts like ": UnityEngine.Object" is not very difficult, but I don't like to make objects heavy. By the way, all my object are in multi-threading at runtime, althrough I can override some functions of UnityObject to make it working in multi-threading and keep in mind that don't invoke other function of UnityObject, but it seems not worth to do so just for an editor only feature. 

Another point, I will open several editor windows at the same time, and I'd like to keep history list of each editor window is individual and not be mixed in UnityUndo system. It's not supported by UnityUndo system. All operations are pushed into one stack whether they are from separated editor windows or not. 

We can use some ways like "Command Pattern" to implement customized undo/redo system. It's a technic of software engineering, we will not talk about it here. I'd like to say that I can't hook and override undo/redo shortcuts of Unity even if I google many times and search document.  

Fortunately, I found out an API that I can modify shortcuts of Unity Editor, so that we can shield undo/redo shortcuts of Unity built-in when my editor window get focus, and restore built-in undo/redo shortcuts when my editor window lose forcus.

![]({{site.url}}/{{site.post_images}}/OverwriteUndoRedoOfUnityA.png)

The code that overwrite built-in undo/redo is looks like this below.

```
private void OnFocus()
{
    RegisterTempShortcutsProfile();
}
private void OnLostFocus()
{
    DeleteTempShortcutsProfile();
}
private void RegisterTempShortcutsProfile()
{
    DeleteTempShortcutsProfile();

    ShortcutManager.instance.CreateProfile(TEMP_SHORTCUTS_PROFILE_NAME);
    ShortcutManager.instance.activeProfileId = TEMP_SHORTCUTS_PROFILE_NAME;

    // Set unoccupied shortcuts for my undo and redo
    {
        KeyCombination keyCombination = new KeyCombination(KeyCode.J, ShortcutModifiers.Action);
        ShortcutManager.instance.RebindShortcut("Main Menu/Edit/Undo", new ShortcutBinding(keyCombination));
    }
    {
        KeyCombination keyCombination = new KeyCombination(KeyCode.K, ShortcutModifiers.Action);
        ShortcutManager.instance.RebindShortcut("Main Menu/Edit/Redo", new ShortcutBinding(keyCombination));
    }

    // Register built-in undo/redo shortcuts to other actions that without side effect.
    // Otherwise, we will hear beep sound when press undo/redo shortcuts.
    {
        KeyCombination keyCombination = new KeyCombination(KeyCode.Z, ShortcutModifiers.Action);
        ShortcutManager.instance.RebindShortcut("Main Menu/Edit/Select Prefab Root", new ShortcutBinding(keyCombination));
    }
    {
        KeyCombination keyCombination = new KeyCombination(KeyCode.Z, ShortcutModifiers.Action | ShortcutModifiers.Shift);
        ShortcutManager.instance.RebindShortcut("Main Menu/Edit/Select Children", new ShortcutBinding(keyCombination));
    }
}
private void DeleteTempShortcutsProfile()
{
   ShortcutManager.instance.activeProfileId = ShortcutManager.defaultProfileId;
   foreach (var item in ShortcutManager.instance.GetAvailableProfileIds())
   {
       if (item == TEMP_SHORTCUTS_PROFILE_NAME)
       {
           ShortcutManager.instance.DeleteProfile(TEMP_SHORTCUTS_PROFILE_NAME);
           break;
       }
   }
}
```

<h3>{{ page.title }}</h3>
<h5>{{ page.date | date: "%B %-d, %Y" }}</h5>
