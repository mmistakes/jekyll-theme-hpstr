---
layout: post
title: The Classic Theme in Windows 10 and 8.1 (ClassicTheme.exe)*
description: "The Windows Classic Theme in Windows 10 & 8.1 with a series of text explaining the method I simply use to get the native Classic Theme working to some reasonable extent with its consequences."
modified: 2016-12-31T04:35:48+00:00
tags: [Windows, Classic Theme, ClassicTheme.exe, Windows 8.1, Windows 10]

image:
  feature: /WinClassicTheme/BackgroundImage.png
  credit: "Note: 'This PC' and 'File History' (Click for full)"
  creditlink: /images/WinClassicTheme/BackgroundImage.png
---

I decided to write this to reduce the tediousness it took for myself to browse through multiple forums and desperately lurk through search results for new answers and pointlessly watching newly encountered videos that provide pretty much **zero critical explanation** of any **consequences** that are incurred and not providing a **huge disclaimer that the ClassicTheme.exe utility has the potential to bug out**. The method I use for **manually removing this** is also in this post.

The following is a series of text, explaning the tools I encountered upon to be able to run the Classic Theme in latest versions of Windows (8.1/10) despite Microsoft removing the Windows Classic Theme that took place in Windows 8. It was featured in Windows XP and is no longer an available feature after Windows 7. Anything performed here is done for experimental purposes and I do not recommend this for the typical user. 

Nobody has seemed to write up a guide of how to fix this in the event it actually does blank out your screen (most likely due to the antivirus software deleting the ClassicTheme executable while it configured itself to run upon user login). This is for those who desperately want to try this out or those who want to fix this without reinstalling, this is the same way I've figured it out and I thought others would've as well but that doesn't seem to be the case here. Try it in a virtual machine if you want and see for yourself if you're really suspicious of how this behaves. Read everything here first before doing any of the things mentioned. **Scroll near the bottom to find the fix that may work** or use ``CTRL/COMMAND + F`` and search for ``I got a black screen after installing ClassicTheme.exe``.

The Classic Theme, as we know it, seems to be an ａｅｓｔｈｅｔｉｃａｌｌｙ iconic user interface considering you can make a modern system running Windows look like it's back from 1995! It just looks so simple, right? Simple shapes and buttons that have a 3D block-like effect placed on a plain gray background which happened to be seen in a lot of places, like online videos, actual use in workplaces and industries, public displays exposing the UI and it still is partially featured in today's versions of Windows. 

Unfortunately, for some people who prefer having blocky 3D buttons and menus, this has officially been gone since Windows 8 as the Desktop Window Manager is no longer a service that can be disabled and the modern UI programs are dependant upon it. The DWM basically utilitises the graphics card to 'draw' windows on to your display, and in anything past Windows 7, disabling graphics card drivers won't revert your system to a Windows Basic theme (although it technically still exists) and whatever windows you'll have open will be rendered by software, or your processor. But since Windows 8, it is a dependancy for a lot modern-related apps.

<figure>
	<a href="images/WinClassicTheme/ClassicThemeExplorer.PNG"><img src="images/WinClassicTheme/ClassicThemeExplorer.PNG" alt=""></a>
	<figcaption><a href="/images/WinClassicTheme/ClassicThemeExplorer.PNG" title="It's the actual Classic Theme, but there's no switch to switch it on or off like in Windows 7!">Look, that arrow pointing up! The Classic Theme still exists in Windows 8.1 and 10! No high contrast coverups here. This is on Windows Server 2016 or Windows 10 with a few modifications. Also, clicking those back/forward buttons don't have that 'pressed' effect like in Windows 7</a>.</figcaption>
</figure>

/images/WinClassicTheme/BetterContextCompare/WinXPContextMenu.png


There's a lot of places saying how it's been 'removed' and that apparently having a flat [high contrast](http://www.howtogeek.com/133405/how-to-get-classic-style-themes-back-on-windows-8/) is the only solution (well, it's the ONLY stable solution, not a bad alternative to be fair, you don't risk messing up your system and you don't need anything else for it), although it actually hasn't been completely removed. 

The Classic Theme is technically still there in some cases, like when using the SAM Lock Tool, ``syskey`` during startup. You can see this become applied partially for some programs by going to your Envirionment Variables, adding a new entry with a variable called ``__COMPAT_FLAGS`` and changing its value to ``DISABLETHEMES`` (for either your user or the system) and open a program like VLC. You'll notice you'll have the 3D classic buttons and context menus, but with the themed titlebar. The ``DISABLETHEMES`` flag is no longer an existing checkbox in the compatibility tab of programs. But you can enable individually set the ``CLASSICTHEMES`` flag under ``HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers\`` for any program. You can also use ``HKEY_LOCAL_MACHINE`` instead of ``HKEY_CURRENT_USER`` to apply the same flags you set to all other users.

A while back, I actually encountered this program on [this forum - no direct link here since you should read what's it about.](http://forum.thinkpads.com/viewtopic.php?f=67&t=113024&sid=a9931bb404e7001f92ffdad7e547ff4b), provided by a user called IbmPad. There's another forum that's a bit more recent called the [WinClassic Boards](http://winclassic.boards.net/) by other users dedicated to this ClassicTheme.exe. I've encountered videos that demonstrate this, but they don't really demonstrate it that great and never acknowledge that it may *temporarily* break things and forgetting to mention the original source of the program, which may have scared a lot of people into thinking someone has essentially broken their OS, due to the fact the antiviruses automatically remove it.

Now, this program is just called ``ClassicTheme.exe``, or just referred as the 'theme disabler' and that's what it essentially does. It achieves the effect of having the native Classic Theme working on 8.1 or 10 to some extent. I use this myself since I dislike seeing obnoxiously gigantic minimize, maximize and close titlebar buttons and I don't use Windows on a touch screen and the fact that I don't like the plain flat and solid color appearance that the modern UI has to offer. In this article, I'm simply going to refer it as the 'unofficial Classic Theme' or 'Classic Theme' in some instances.

**An important thing to note here is this Classic Theme utility triggers a lot various antiviruses, so it's not recommended if you believe running this will somehow cause damage to your system which is probably why a lot of people who were uninformed and didn't look at [the original forum where this originated](http://forum.thinkpads.com/viewtopic.php?f=67&t=113024) are outraged (looking at those online video tutorials that didn't link to the original source or didn't mention the original forum where this was hosted). Source code is included in the original download, just don't go get it from other sources that's not on the forum that was described earlier. Create a folder for the Classic Theme executable and exclude it in your antivirus software if you wish to continue (not excluding it seems to cause it to break on the next login whenever an antivirus detects it and quarantines it, causing an empty blank desktop to appear).**

If you've got the ClassicTheme program ready, I suggest you place it in a easy to access folder at the root of your system drive, such as ``C:\ClassicTheme\``. Along with the other tools that will be mentioned. We'll be using [Process Explorer](https://technet.microsoft.com/en-us/sysinternals/processexplorer.aspx) as a substitute for the Task Manager, as it'll make it easier incase something goes wrong since the fancy new(ish) Task Manager closes itself whenever the ClassicTheme.exe is active. I recommend placing Process Explorer with the same location as your ClassicTheme.exe.

We're going to set the Process Explorer as the default Task Manager:
* Right click Process Explorer then choose 'Run as Administrator'
* Confirm the UAC dialog if necessary (you should always have this on)
* Go to the menu ``Options > Replace Task Manager``
* Anything that would normally launch the Task Manager should now open Process Explorer instead

We can now run the ClassicTheme.exe. Here's a description of what these options do:

* Install - Places the files: dwmapi.dll, dwmapi32.dll and dwm_rdr.dll under ``%SYSTEMROOT%`` and applies the Classic Theme upon the next login. We may need these later on.

* Uninstall - Uninstalls the Classic Theme and you'll be running the typical Windows Aero theme.

* Configure themes - Runs a legacy Control Panel applet from a Windows NT beta version. This is the equivalent of running DESKN.cpl from the src directory of the ClassicTheme folder and allows you to configure attributes of windows when you're running with the Classic Theme. Not all windows and metric changes take effect of you're using the default Aero themes. It also has a tendency to freeze up, so you must Alt-Tab out of it then run your Task Manager and kill the 'rundll32' process to exit out of it.

* Patch Internet Explorer - Essentially forces the Internet Explorer to run without DWM features, so no transparency effects will take place and won't run with an Aero Theme even if you're not running the ClassicTheme. Unfortunately, I'm not sure why IbmPad doesn't make this available when it's not installed.
	1. **To undo this**, open up a Run dialog and place ``%SYSTEMDRIVE%\Program Files\Internet Explorer`` into the field.
	2. If a file ``iexplore.bak0`` exists, delete ``iexplore.exe``, ``dwm_rdr.dll`` and ``dwmapi.dll``
	3. Rename ``iexplore.bak0`` to iexplore.exe

* Enable Classic Theme now - *This is basically the way I highly recommend to use this tool. It lets you apply the Classic Theme to only newly spawned processes, so you can use this to run the taskbar without the Classic Theme applied as long as you do not restart Explorer. Otherwise, you'll have to logoff and logon again*

I don't recommend using the 'Install' button to apply thism as it has a chance of breaking, essentially leaving you with a blank screen which might scare some people if they blantantly just try this stuff out and expect it to work flawlessly. This can be a problem especially if you don't have an alternative Task Manager like [Process Explorer](https://technet.microsoft.com/en-us/sysinternals/processexplorer.aspx)  Instead, just rename it to ``ClassicThemeA.exe`` (this essentially applies the fourth option without any further prompts), set up a scheduled task through the Task Scheduler - ``taskschd.msc``. Set it up so it only runs for YOUR user upon login and allow it to run with the highest priviledges. ``Task Scheduler > Action > Create Task... > Select 'Run only when the user on logged on' > Check the 'Run with highest priviledges' box > Go to the 'Triggers' > New... > Begin the task: At logon > Specific user > OK``. It'll be applied for new processes. Note that this will keep the taskbar in its themed state which is suitable for Windows 10 users, until you restart Explorer.

### A lot of things will break
Many things are broken or have buggy visual artifacts if you ever want to actually to try this for yourself **(Well, you shouldn't. Unless you're willing to waste a lot of time like myself and understand what you'll lose out on doing this.)** which is why you wouldn't want to turn off the DWM or have Classic Themes of some sorts running in the first place. This being:

#### If you want to keep the Classic Theme with DWM running as is..

* If you restart Explorer while having the Classic Theme enabled (or have DWM off), you may need an alternative start menu to make things easier. You can use something like [Classic Shell](http://www.classicshell.net/). Pin Classic Shell to the taskbar. If you have a 64-bit operating system, navigate to ``C:\Program Files\Classic Shell\`` then drag ``ClassicStartMenu.exe`` to your taskbar so you can run it at any time as it doesn't seem to take effect whenever I try to run it from Explorer or launch it from the command line. If you want to have the ability to configure your network adapters on Windows 8.1, take a look at [PE Network Manager](https://sourceforge.net/projects/penetwork/). It's intended for Preinstallation-Envirionment operating systems but it also works on typical Windows installations.

* Stop using the [Immersive Context Menu (Windows 10)](http://www.askvg.com/windows-10-tip-restore-classic-context-menu-in-explorer-and-desktop/) or you'll be playing blind with context menus as items show a blank vertical shape instead of text where it's supposed to be.

* No modern tile apps will work in Windows 10 (they partially work in Windows 8.1, although with broken animations), so if you need to change some settings don't run the Classic Theme executable yet. You can always have a modern tile app running and it'll work, as long as you launched it before running the unofficial Classic Theme. Modern apps will not work at all, not even partially with DWM off.

{% capture images %}
	/images/WinClassicTheme/BetterContextCompare/Win10ContextMenuImmersive.png
	/images/WinClassicTheme/BetterContextCompare/Win10ContextMenuNoImmersive.png
	/images/WinClassicTheme/BetterContextCompare/Win8ContextMenuDefault.png
	/images/WinClassicTheme/BetterContextCompare/DefaultNo3DClassicContextMenu.png
	/images/WinClassicTheme/BetterContextCompare/3DClassicContextMenu.png
	/images/WinClassicTheme/BetterContextCompare/WinXPContextMenu.png
{% endcapture %}
{% include gallery images=images caption="Here's the various context menus with theming and without. No shadows are enabled. The first two images are with the Immersive context menus (left) and without (second image from left to right) on Windows 10, note that it disregards any font settings that are performed through changing in a Windows & Metrics applet. The third image is the context menu in Windows 8 while the fourth and fifth images are Windows 10 context menus with no theming with and without the 3D effect. The size difference in the images with the Windows 8.1 and Windows 10 non-Immersive menus happen to be 1px, possibly due to the 'Display settings' and 'Screen resolution' text affecting the width. Finally, there is an irrelevant Windows XP context menu as there doesn't seem to be anything else that remains exactly consistent in terms of wording and context menu options." cols=5 %}

* If you want to get the full 3D effect back without those plain solid blue context menu highlights, use [User Preferences Mask Calculator](http://www.softpedia.com/get/Tweak/Registry-Tweak/UPMCalc.shtml). Ignore the Windows 7 warning and uncheck the box for bit 17 (Use visual styles on windows and buttons). If you like seeing the dotted rectangle upon clicking a button, you can uncheck the box for bit 31 (Enable UI effects). This will also remove that titlebar gradient and any visual animations.

* Blank grey space in apps such as Microsoft Paint and WordPad where Save and Undo options are integrated within titlebar. The Explorer also has a huge blank transparent space. You can use something like [WinAero's Ribbon Disabler](http://winaero.com/comment.php?comment.news.20) to essentially hide it. This also applies with DWM off.

* Troubleshooting dialogs and some programs such as Microsoft Word 2010 have portions with transparency annoyances, essentially making the area where a transparent effect  is supposed to have some sort of color fill taking place see through completely. Killing the DWM negates this issue. However, it is not suitable for Windows 10 as it's even more broken than it is in Windows 8.1. In Windows 8.1, the Windows Photo Viewer controls' background are fully transparent.

* The Task Manager will will NOT work with this unofficial Classic Theme. I recommend a copy of [Process Explorer](https://technet.microsoft.com/en-us/sysinternals/processexplorer.aspx), place it in a fixed location and set it to replace Task Manager. If you want instead, you can snag an installation of the [legacy Task Manager](http://winaero.com/blog/get-classic-old-task-manager-in-windows-10/) which is also a part of the Windows Pre-Installation Envirionment.

* For 64-bit Firefox, you'll need a copy of the ClassicTheme.exe's .dll files that is copied into the ``C:\Windows\`` directory when using its regular 'Install' option (**Make sure you set Process Explorer as your default Task Manager, so you can easily revert**, you can uninstall it later to revert the changes, as it has a chance of messing up when logging in). 

	1. Secondary (right) click the start menu and choose 'Run', then enter in ``%SystemRoot%`` 
	
	2. Copy the files ``dwm_rdr.dll`` and ``dwmapi.dll`` and paste it into the same directory where your Firefox executable is located. The titlebar transparency visual bug can be worked around by using [Resource Hacker](http://www.angusj.com/resourcehacker/#download). 
	
	3. Load up Firefox.exe into Resource Hacker (by dragging it into Resource Hacker's window or through the *File > Open...* menu). 
	
	4. In the left pane of items, click the 'Manifest' folder and choose the item with the star icon. Scroll down until you see something that looks like,
	
	   ```
	   </assembly>
	   </compatibility>
	   ```
	
	5. Between the ``</compatibility>`` and the ``</assembly>`` line, create a new line between those two pieces of text and type in ``<file name="dwmapi.dll" />``. Compile and save the modified executable. The manifest should now look like:
	   
	   ```
	   </assembly>
	      <file name="dwmapi.dll">
	   </compatibility>
	   ```


	
* On Windows 10, restarting the Explorer.exe with the unofficial Classic Theme will cause your taskbar to have icons on the taskbar to be 'stuck together'. You can still click on icons though. It's better to run it as ClassicThemeA.exe so you'll still remain with decent taskbar functionality.

* If you want to, you can use the legacy-style Alt-Tab App Switcher (which is used in the actual Classic Theme) by tweaking [some values in your registry](http://www.askvg.com/how-to-get-windows-xp-styled-classic-alttab-screen-in-windows-vista-and-7/). This is only useful for those who run it as ClassicThemeA.exe without restarting Explorer.

#### If you want to prevent the DWM from running...
With DWM off, you will simply achieve that Windows 7 Basic-like feel, with themes reverting to its 'Basic' variant instead of Aero and also removing those see-through portions of certain programs, but this breaks a lot more functionality, especially in Windows 10 where more of the UI is more dependant on the DWM than it was in 8.1.

For Windows 8.1 users, there's a batch script provided by [R.O.B on the WinClassic Boards with a better explaination on this script than the simple one here](http://winclassic.boards.net/thread/129/alternate-method-disabling-dwm-windows) that renames the dwm.exe to a different name to prevent it from being able to run again for 3 seconds, then it renames it back so it'll be able to be run again when needed. It also renames the files responsible for bringing up the search UI (adds a .BAK extension to them, preventing the search UI from creating the huge blank space that covers right side of the screen).

```
@echo off
title Disable DWM
cd %SystemRoot%\System32
echo.
echo WARNING: 
echo Desktop Window Manager will be disabled until the next system restart.
echo.
pause
taskkill /f /im explorer.exe

takeown /a /f "%SystemRoot%\System32\DWM.exe" 
icacls "%SystemRoot%\System32\DWM.exe" /grant Administrators:F

takeown /a /f "%SystemRoot%\System32\Windows.UI.Search.dll" 
icacls "%SystemRoot%\System32\Windows.UI.Search.dll" /grant Administrators:F

rename %SystemRoot%\System32\dwm.exe dwm.exe.1
rename Windows.UI.Search.dll Windows.UI.Search.dll.BAK
taskkill /f /im dwm.exe
timeout /t 3
rename dwm.exe.1 dwm.exe
start explorer.exe
exit
```

#### To rename the search bar back to its defaults [(again, provided by 'R.O.B',login needed)](http://winclassic.boards.net/thread/129/alternate-method-disabling-dwm-windows):
```
@echo off
taskkill /f /im explorer.exe
rename %SystemRoot%\System32\Windows.UI.Search.dll.BAK Windows.UI.Search.dll
start explorer.exe
```

This works fine in Windows 8.1. You can still access the security options through ``CTRL + ALT + DELETE`` and you can still lock your screen and have other login related timeouts still function. 

**Do NOT use in Windows 10**: It'll eventually force you to log out with an error message or leave you at a blank screen if you try this multiple times. Also, I tried modifying this script to remove the timeout and the commands to rename the search UI to test it in Windows 10 and all it does it spawn itself back up again or leave me staring at a blank screen.

<figure>
	<a href="/images/WinClassicTheme/Win10DWMRename.PNG"><img src="/images/WinClassicTheme/Win10DWMRename.PNG" alt=""></a>
	<figcaption><a href="/images/WinClassicTheme/Win10DWMRename.PNG" title="It's the actual Classic Theme, but there's no switch to switch it on or off like in Windows 7!">At least you get a brief glance at a dialog box with a classic theme briefly before returning you to the Windows 10 lock screen or having a chance at blanking out your system if you don't see this dialog</a>.</figcaption>
</figure>

In Windows 10, the only way to accomplish preventing the Desktop Window Manager from being able to run is to suspend the winlogon process. I would not recommend this since it messes up with things like display sleeping and the inability for logoff/shutdown/restart actions to take place and this isn't really a good method just for the sake of switching off the DWM. 

If you want to try this out yourself, you need [PsTools](https://technet.microsoft.com/en-us/sysinternals/pstools.aspx) to allow the suspending and resumption of processes through the command line. This batch script simply: kills the Explorer process, suspends the winlogon process, kills the DWM process and starts Explorer. Note that things like Run prompts will let you run processes as an administrator regardless of UAC settings unless you kill Explorer and rerun it as a limited user. You can allow the DWM to run again by using the ``pssuspend -r winlogon.exe`` command.

```
@echo off
taskkill /IM explorer.exe /f
pssuspend winlogon.exe
taskkill /IM dwm.exe /f
explorer.exe
```

* Unlike having DWM forcibly killed in Windows 10, Windows 8.1 works just fine with jumplists and the taskbar. You still won't get thumbnails or Aero Peek, though.

* With DWM forced off, you'll exhibit screen tearing and it doesn't look too good. For some reason I've only noticed this when I've been trying DWM with it being forced off on Windows 10. It'll occasionally somehow disable my video driver up killing it for the integrated graphics card, so I would have to go to Device Manager or ``devmgmt.msc`` and disable and enable it.

* If you like running Windows 10 with DWM forced off, go and [tweak your registry](http://www.askvg.com/collection-of-windows-10-hidden-secret-registry-tweaks/) to enable the legacy battery and volume taskbar fly-outs. The legacy clock is not a thing anymore since the anniversary update.

* In Windows 10, thumbnail previews look ugly with DWM off, with excessive padding around. Secondary (right) click options are unavailable in the taskbar. If you use it with DWM forced off, you can use the [Aero Lite](http://www.askvg.com/how-to-enable-hidden-aero-lite-theme-in-windows-8-rtm/) theme (or a high contrast theme to take away the extra preview space) and use [7+ Taskbar Tweaker](http://rammichael.com/7-taskbar-tweaker) to display previews as a list and have its right click options set to 'Standard window menu'. It's the equivalent of secondary clicking a window titlebar and displays it much faster. 

* In some apps such as Google Chrome or any other Chromium-based browser, the title bar may also flicker when it updates. If you are somehow running without DWM, those programs with just have black windows displayed. You can use the ``-disble-gpu`` argument to get them to work (you won't get GPU acceleration though) if you happen to be running without DWM. Also, the ``--disable-dwm-composition`` argument will treat it as if you have Desktop Window Manager switched off for those apps. You must apply these arguments of an application's shortcut path.

# Security
There's nothing really secure about this if you don't take the right precautions. Forcing the DWM to not run is actually way insecure than just running the Classic Theme executable. I use this unofficial Classic Theme myself (with DWM on and as a scheduled task to run ClassicThemeA.exe), but please realise that there's still a few things you should actually consider:

* Suspending the winlogon.exe process will cause your system to unable to restart, shutdown, log out or have the auto lock triggered. It also reruns the Explorer process with the ability to execute commands via the Run dialog as an administrator (without any prompts or UAC taking place). Huge security flaw. You'll also be unable to log out, and if your display sleeps - you're still logged in with an 'invisible' display and you pretty much have to do things blind. Assuming you have Explorer.exe running as administrator, you can just enter the hotkey ``Windows + R`` and enter in ``pssuspend -r winlogon.exe`` to allow your display to be back right up. DWM will be running again.

* When winlogon.exe is suspended, tasks associated with this process such as the ``CTRL + ALT + DELETE`` security options, logging off and sleeping do not take place at all and takes place immediately after winlogon.exe is resumed. (If for instance, a logoff command has been issued while winlogon is suspended, however they can 'stack' causing winlogon related actions to happen all at once.)

* If you still like having DWM off in Windows 10, [disable the modern-style Windows 10 UAC prompt](http://www.askvg.com/tip-disable-modern-uac-prompt-and-credential-ui-in-windows-10/). Forgetting to disable this will cause the UAC prompt to appear as a blank rectangle (although you can still invisibly navigate through it). 

* UAC with the secure desktop seems to be broken with DWM off. If you've got access to the Local Security Policy or ``secpol.msc``, change your User Account Control settings to the maximum, then head to ``Local Security Policy > Local Policies > Security Options``, scroll to the bottom where it says 'User Account Control' for each entry, then configure these security settings.
	* *User Account Control: Behavior of the elevation prompt for administrators in Admin Approval Mode* - Change its Security Setting to 'Prompt for credentials'
	* *User Account Control: Behavior of the elevation prompt for standard users* - Change its Security Setting to 'Prompt for credentials'
	* However, these may not be as useful or have zero effect if you're running Explorer with Administrator Priviledges as someone can just open a Run prompt and run anything they wish to (like ``netplwiz`` with no UAC consent). Again, I wouldn't recommend bothering to try and run Windows 10 with DWM off, unless you really are desperately wanting to see those basic themes. It also tends to disable the graphics driver.
	* You should actually use UAC with prompts with credentials anyway for the best security (especially if there's other people physically nearby), preferably on the secure desktop since other software shouldn't be able to easily track your keystrokes. It's macOS-esque and gives you less opportunity to rush in and blatantly click 'Yes' without carefully reading what program is requesitng elevation.

* Ensure you have placed your Classic Theme files in a easy to access folder (you can place it somewhere such as ``C:\ClassicTheme\`` and restrict permissions on the folder. ``Secondary click your Classic Theme folder > Properties > Security tab > Users > Tick the 'Deny' checkbox for the 'Write' permission``. If you feel the need, you can restrict it for other users as well. This just stops the Classic Theme folder from being changed by standard users.
	
## DWM and (Unofficial) Classic Theme Performance
I got inspired by this [video](https://www.youtube.com/watch?v=LfROOvOaHXM) and did a cmd.exe session spam myself on the actual machine I use, with no login items other than typical background and updater services running. Instead of one-hundred cmd.exe sessions I performed three-hundred. The first command does a ``time`` command, I take a screenshot to paste in mspaint later as I set a timeout of 5 seconds using ``timeout 5`` for it to spam the windows, then I get the finishing time displayed by the last window. I then take the difference of the times then take away 5 seconds from the final result. The user interface lag is only noticable if you have an obnoxious amount of windows open - In this case it's 300. Clicking the 'Show desktop' button will take a good few seconds to hide those Command Prompt windows.


<figure>
	<!-- <a href="/images/WinClassicTheme/CMDPrompt300Spam.gif"> --><img src="/images/WinClassicTheme/CMDPrompt300Spam.gif" alt=""><!--</a>-->
	<figcaption>
	<a href="/images/WinClassicTheme/CMDPrompt300Spam.gif" title="A lot of prompts. Note that recording to create this gif prolonged the time it takes to draw those windows and the effect looks different as it's downscaled from 60 to 25 FPS in this image. Near the end, the 'Show desktop' button is triggered (after the last time command). Only a brief portion of the window spam is shown here">A lot of prompts. Note that recording to create this gif prolonged the time it takes to draw those windows and the effect looks different as it's downscaled from 60 to 25 FPS in this image. Near the end, the 'Show desktop' button is triggered (after the last time command). Only a brief portion of the window spam is shown here</a>.
	</figcaption>
</figure>

| Opening 300 cmd sessions        | Time (s) | Initial RAM | RAM After | GPU Mem | GPU After |
|:--------------------------------|:--------:|------------:|:----------|:-------:|----------:|
| DWM/Aero Lite Theme             | 8.85     | 1,697,324   | 4,668,116 | 29,548  | 575,288   |
| DWM/GPU Driver Disabled         | 12.32    | 1,679,596   | 4,542,828 | 16      | 16        |
| DWM/Unofficial Classic Theme    | 6.06     | 1,707,896   | 4,530,260 | 29,464  | 540,028   |
| No DWM/Aero Lite Theme          | 11.79    | 1,597,128   | 3,927,440 | 8,680   | 8,680     |
| No DWM/Unofficial Classic Theme | 15.23    | 1,621,888   | 3,934,148 | 8,616   | 8,616     |
|=====

*NOTICE: All RAM is measured in Kilobytes (K). Tested on Microsoft Windows Server 2016 Build 14393.576 64-bit with a reported total physical memory of 8,291,456 K and all animations off with an Intel Core i5-3360M CPU @ 2.8 GHz with no dedicated GPU (so no DGPU stats here). Note that I'm basically using this operating system as a regular desktop operating system, not for an actual server. The display driver is disabled and then enabled (to clear out VRAM) after each test and a log off and login is performed before opening up the 300 cmd.exe sessions.*

*The ``time`` command is used for the first window and is used again for the final window. The GPU Memory reflects the amount of GPU System Memory in Process Explorer being consumed while RAM reflects the amount of Physical Memory being consumed. During the use of this unofficial Classic Theme, the Explorer is restarted to ensure it is applied to everything for the current user. The DWM is forced to not be able to run by suspending the winlogon process. You can view the exact [batch script used for this test here.](https://ghostbin.com/paste/knu58)*

The test was performed with and without the unofficial Classic Theme from IbmPad. Times may vary as I didn't keep multiple records for better accuracy. I got 8.94 seconds after performing the test again with the typical programs I have open with DWM running and the unofficial Classic Theme on. Opening programs to take notes and Process Explorer could have varied the RAM usage by a bit between its initial and after state and also caching. GPU Memory is essentially the same with the graphics driver disabled or with the DWM prevented from being able to run since windows are forced to be rendered by software. 

The memory usage difference should be negligible for most people, with a 32,260 K difference in memory when compared with running with the default Aero Lite theme (with the 300 windows). For most people, this should only matter if you're doing something like this on a system with a low amount of memory, which is probably unlikely. Keep in mind the GPU System memory shown here is shared and that this amount of usage is essentially because there's 300 command prompt windows being displayed at once. Interestingly, having the unofficial Classic Theme running with DWM on takes the least amount of time to spawn 300 cmd.exe sessions and uses less GPU with 300 cmd windows open when compared to having the Aero Lite theme running.

## Removal/Manual Uninstallation of ClassicTheme.exe
<blockquote>
"I got a black screen after installing ClassicTheme.exe. You damaged my computer with an evil virus! *******! I want refund back! What now?" 
</blockquote>
*—Various user comments of those not understanding that this can easily bug out, temporarily leaving them with a broken login shell.*


This usually happens if...

 * You delete your Classic Theme executable or if an antivirus automatically moves it into its quarantine which ends up leaving you with a blank screen. Most antiviruses will prevent ClassicTheme.exe from being able to run which seems to be the common scenario here.

 * If ClassicTheme.exe doesn't manage to completely remove the files it has created upon trying to uninstall from its window.
 
 * You move the location of ClassicTheme.exe or rename it.
 
 It also has a chance of suddenly going blank upon login even if you don't do anything else, which is why manually running it as ClassicThemeA.exe is far more safer as it doesn't make any other configuration changes. 

This is also where it's extremely important to have something like Process Explorer set as the alternate Task Manager. I've had cases where Classic Theme may still be applied, preventing the launch of the normal Task Manager, even though it'll appear to be blank while sometimes it'll be logged in to a blank desktop with the default Aero themes enabled (allowing you to launch the regular Task Manager).

Since using the 'Install' option for this program sets itself as the shell (that's why I don't recommend it), replacing the Explorer (with a path pointing to itself) and does a few broken things to the taskbar to make this work upon a user login, we're going to need to make some changes to the registry and Windows directory to correct this and it may be a pain considering most antiviruses will interfere with this program if you haven't whitelisted whatever directory ClassicTheme.exe is in. You'll also need some way to run the ClassicTheme.exe without any other software preventing it from being able to run, such as logging in through Safe Mode instead.

1. Go use the combination ``CTRL + ALT + DELETE`` to bring up the security options
2. Choose 'Task Manager'
3. Now go to ``File > Run new task... (or 'Run') > In the field, type in 'regedit.exe' > OK`` 
4. In the Registry editor, navigate to ``HKEY_LOCAL_MACHINE \SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon``
5. With the 'Winlogon' key selected, find an item called 'Shell' in the right pane of items.
6. Double click 'Shell', you'll see that it contains the path to where it's trying to run ClassicTheme.exe. 
7. Secondary click the 'Shell' item and choose 'Delete'. This will automatically use the defaults upon login. (Do not replace the value with anything else, just delete the item.)

8. Navigate to ``HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\``
9. Delete the keys (folders) that are called 'ClassicTheme' and 'ClassicTheme2'
10. Navigate to the Registry location ``HKEY_CURRENT_USER\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Compatibility Assistant\Store``
11. Delete the items with the paths that point to copies of ClassicTheme.exe
12. Close the Registry Editor and proceed to the next steps.

### Now we're going to delete the files ClassicTheme.exe created
**NOTE:** If Windows Explorer is running (i.e. you have the flickering black taskbar), you have to end the ``explorer.exe`` process before you can delete the files we're about to delete.

1. Go use the combination ``CTRL + ALT + DELETE`` to bring up the security options
2. Choose 'Task Manager'
3. Now go to ``File > Run new task... (or Run...) > Browse...`` 
4. Navigate to your system's drive Windows directory (typically C:\Windows). **Ensure you have 'All Files' selected in the dropdown menu instead of 'Programs'.**
5. Find the files dwm_rdr.dll, dwmapi.dll and dwmapi32.dll and delete them from the Windows directory (you can quickly type 'dwm' to jump to these while browsing the folder)

	<figure>
		<!-- <a href="#"> --><img src="/images/WinClassicTheme/BrokenExplorerTaskbar.gif" alt=""><!--</a>--><figcaption><a href="/images/WinClassicTheme/BrokenExplorerTaskbar.gif" title="If you FORGET to delete the 'Shell' item in the Registry, your taskbar is going to have its own party of preventing any Explorer window from opening.">If you FORGET to delete the 'Shell' item in the Registry, your taskbar is going to have its own party of preventing any Explorer window from opening as seen by the taskbar having its color black with its borders sticking out. This also happens if you do not delete the .dlls that were mentioned previously.</a></figcaption>
	<figure>

At this point ClassicTheme.exe is still be marked as 'installed' and we'll need the original ClassicTheme.exe. However, logging out and back in should work normally up to this point. Alternatively, you can run ``userinit`` instead of having to relogin. 

### You need access to another copy of ClassicTheme.exe
For this final part, you need to be able to run the ClassicTheme.exe in order to stop the taskbar from breaking and Explorer windows refusing to open. I can't seem to find another way to fix this without having to use ClassicTheme.exe yet. So it may be problematic for a lot of antiviruses as **it'll remove it** before you even get to do anything. You will have to either whitelist a folder dedicated to ClassicTheme.exe or temporarily disable your anti-malware software which usually detects it if you're extracting it from the compressed archive, or you can use Safe Mode. 

You still have to use the Run box or Task Manager new task dialog's 'Browse...' option to navigate through the file system with a GUI.

### To run with Safe Mode (so you won't get AVs in the way)
1. Go use the combination ``CTRL + ALT + DELETE`` to bring up the security options
2. Choose 'Task Manager'
3. Now go to ``File > Run new task... (or Run...) > Type 'msconfig' in the field > OK`` 
4. Choose the 'Boot' tab, then choose 'Safe boot' with the 'Network' radio button selected, this is so you can download the ClassicTheme files again in the event that your antivirus software already deleted your copies of the ClassicTheme files. Click 'OK' to save changes. Restart by using the ``CTRL + ALT + DELETE`` options if it doesn't prompt you.

#### Once you're in safe mode:
1. Go use the combination ``CTRL + ALT + DELETE`` to bring up the security options
2. Choose 'Task Manager'
3. Now go to ``File > Run new task... (or Run...) > Browse...`` 
4. Navigate using the 'Browse...' option in the Run dialog, then navigate to your ClassicTheme.exe and run the file. **Ensure you have 'All files' selected in the dropdown menu instead of 'Programs'.**
5. Click 'Uninstall'. It'll fix up the remaining broken dark taskbar upon the next login. It's better off to run it as ClassicThemeA.exe as it does not create any additional modifications to your system and logging out and logging back in will bring you back with the default themes.
6. If you need to access the [Classic Theme files from the internet](http://forum.thinkpads.com/viewtopic.php?f=67&t=113024), you can do so by running a new task, ``iexplore.exe``. This will open the Internet Explorer, the default browser incase you do not have any other browser installed on the machine. 			
	* Alternatives include ``chrome.exe`` and ``firefox.exe`` which may also work, assuming you have them installed.

7. Review the settings of msconfig once again and uncheck 'Safe boot' from the 'Boot' tab so you can boot normally. Click 'OK' to save your changes. Reboot through the prompt or the ``CTRL + ALT + DELETE`` options. You should now be able to login with Explorer behaving normally.

# Extras and Other Interesting Shenanigans
I messed with this program for a bit some time back and there's some interesting stuff that nobody that I've seen yet to point it out.

<figure>
	<a href="/images/WinClassicTheme/ColorAppletDWMDisabled.PNG"><img src="/images/WinClassicTheme/ColorAppletDWMDisabled.PNG" alt=""></a>
	<figcaption><a href="/images/WinClassicTheme/ColorAppletDWMDisabled.PNG" title="Was this supposed to be a toggle?">"{Desktop composition is disabled}"? Did Microsoft originally intend there to be a switch to do this, or does this message exist in other versions of Windows? I don't know since there's no *native* way to switch off the DWM in anything later than Windows 7. This is the result when trying to change the colors where it would open up the Immersive version of Settings.</a></figcaption>
</figure>

<figure>
	<a href="/images/WinClassicTheme/ServerCore2016Login.PNG"><img src="/images/WinClassicTheme/ServerCore2016Login.PNG" alt=""></a>
	<figcaption><a href="/images/WinClassicTheme/ServerCore2016Login.PNG" title="It's only just text. Nothing more.">This is the login screen for Windows Server Core 2016, which runs the non-DWM version of the Aero Lite theme (the 'Basic' version of it, if you think about it). It would be cool if we could actually have a logon UI like this in regular installations of Windows. It also doesn't rely on the DWM as it doesn't exist in Server Core. Its CTRL + ALT + DELETE options are also displayed in a list.</a></figcaption>
</figure>


<figure>
	<!-- <a href="#"> --><img src="/images/WinClassicTheme/AeroLiteNoDWMServerCore.png" alt=""><!--</a>--><figcaption><a href="/images/WinClassicTheme/AeroLiteNoDWMServerCore.png" title="This is a screenshot of Server Core 2016. Here's a bunch of windows in all of its non-DWM AeroLite glory. Notice the square titlebar buttons.">
	This is a screenshot of Server Core 2016. Here's a bunch of windows in all of its non-DWM AeroLite glory. Notice the square titlebar buttons which isn't typical in a regular 8.1/10 installation.</a></figcaption>
</figure>

<figure>
	<!-- <a href="#"> --><img src="/images/WinClassicTheme/ServerCore2016Classic.png" alt=""><!--</a>--><figcaption><a href="/images/WinClassicTheme/ServerCore2016Classic.png" title="Here's Server Core 2016 with the unofficial Classic Theme program applied, it appears to work well - pretty much flawlessly although there are weird properties with the button icons being folders and obscure looking symbols">Here's Server Core 2016 with the unofficial Classic Theme program applied, it appears to work well - pretty much flawlessly although there are weird properties with the button icons being folders and obscure looking symbols. Some fonts won't be changed even if you change it through the Desktop Windows & Metrics applet as there's no Desktop Experience enabled in Server Core.</a></figcaption>
</figure>

<figure>
	<!-- <a href="#"> --><img src="/images/WinClassicTheme/Server2016CoreVMStretched.png" alt=""><!--</a>--><figcaption><a href="/images/WinClassicTheme/Server2016CoreVMStretched.png" title="Here it is again while having its width resized in a virtual machine.">Here it is again while having its width resized in a virtual machine.</a></figcaption>
</figure>

{% capture images %}
	/images/WinClassicTheme/BetterContextCompare/WinJumplists.png
{% endcapture %}


{% include gallery images=images caption="Here's another comparison, Windows 10's jump list got more optimised for touch screen displays, which also takes a lot more pixels for smaller displays. The unofficial Classic Theme in Windows 8.1 also puts a nice 3D effect, like in context menus unlike in Windows 7." cols=5 %}

# That's it. 

Hopefully you've been able to figure out the consequences of running this unofficial Classic Theme just as much as I have before looking at some video sources that provide no good explanation of the potential damages you may face when using this.  

Again, I've been using this since I've encountered it from the [originating forum](http://forum.thinkpads.com/viewtopic.php?f=67&t=113024) and the Classic Theme just seems to be one of those things that have been are neglected and that I pretty much mess with stuff a lot and I like the blocky 3D appearance of the Classic Theme and I haven't bothered using modern UI apps, but if you're not willing to risk anything then it's best to not even bother. You'd be rather better off with sticking to something like [high contrast themes](http://kizo2703.deviantart.com/art/Windows-classic-theme-for-Windows-8-RTM-8-1-10-325642288) although it's not the exact same.

You may wish to check out the [WinClassic Boards](http://winclassic.boards.net/) as it seems to be the most recent forum that's actually dedicated to discussing about this Classic Theme utility.

***Have a good 2017.***