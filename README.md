# Random-Code
Just a lot of stuff with no place exactly.


# Plasma context menu
The `.destkop` files should be put in `.local/share/kservices5/ServiceMenus/`. Some scripts are needed for them to work that I put in `/bin/`

# Scripts
The capslock script has to be run at every startup to actually work.

The waifu scripts require the .bashrc file stuff. So have those.

If you want to use the opacity script make sure you have something like this in your `~/.config/kwinrulesrc`

```
[2]
Description=Making all window transparent
clientmachine=localhost
clientmachinematch=0
opacityactive=100
opacityactiverule=2
opacityinactive=100
opacityinactiverule=2
title=Workspace  — System Settings
titlematch=0
types=289
windowrole=mainwindow#1
windowrolematch=0
wmclass=systemsettings5 systemsettings
wmclasscomplete=true
wmclassmatch=0
```
When you want to use the script you do `opacity nr nr`, but make sure that you always keep this as group 2, that is the second from the bottom, in your kwin rules. I also have custom keybindings that change my windows from transparent to non-transparent (just do `opacity 100 100`).

Other things are not actually working scripts but rather examples such as getopt which you can implement in any other script you would like.
