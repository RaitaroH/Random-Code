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


# Kwin custom rules
```
$ cat ~/.config/kwinrulesrc
[1]
Description=100% opacity
opacityactive=100
opacityactiverule=2
opacityinactive=100
opacityinactiverule=2
wmclass=conky|gwenview|vmplayer
wmclasscomplete=false
wmclassmatch=3

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

[3]
Description=Force new dialogue to appear
clientmachine=localhost
clientmachinematch=0
fullscreen=false
fullscreenrule=2
minimize=false
minimizerule=2
title=Plasma
titlematch=2
types=32
wmclass=plasmashell
wmclasscomplete=false
wmclassmatch=1

[4]
Description=Window settings for kcmshell5
clientmachine=localhost
clientmachinematch=0
size=660,700
sizerule=3
title=System Settings Module
titlematch=2
types=33
wmclass=kcmshell5
wmclasscomplete=false
wmclassmatch=1

[5]
Description=NoBorders
clientmachine=localhost
clientmachinematch=0
noborder=true
noborderrule=2
title=New Tab - Waterfox
titlematch=0
types=1
wmclass=navigator waterfox|navigator firefox|discord
wmclasscomplete=true
wmclassmatch=3

[General]
count=5
```

# Bind meta to krunner
```
# Make meta invoke krunner
# Add    Meta=org.kde.krunner,/App,,display   to [ModifierOnlyShortcuts]
killall kwin_x11
nano ~/.config/kwinrc
kwin_x11 --replace
```

# Installing shit
```
sudo apt-add-repository ppa:graphics-drivers/ppa -y #for nvidia drivers
sudo add-apt-repository ppa:nilarimogard/webupd8 -y #for latest audacious
sudo add-apt-repository ppa:teejee2008/ppa -y #for conky

sudo apt-get install conky-manager -y
sudo apt-get install audacious -y

# Installing more stuff
sudo apt-get install -y synaptic ffmpeg libreoffice libreoffice-l10n-en-gb ubuntu-drivers-common ubuntu-restricted-extras keepassx gufw brightside imagemagick htop gimp gpick pavucontrol gnome-disk-utility screenkey libnotify-bin rar

sudo apt-get install -y krename kronometer qalculate yakuake kdesudo filelight ktorrent inkscape

# Change splash screen in gimp
sudo ln -fs /home/raitaro/.gimp-2.8/splashes/Blueprint.png /usr/share/gimp/2.0/images/gimp-splash.png

sudo apt-get install -y redshift geoclue-2.0 geoclue-hostip #redshift-gtk

# Dolphin thumbnails
sudo apt-get install -y kdegraphics-thumbnailers ffmpegthumbs -y

# To use play
sudo apt install sox libsox-fmt-mp3 -y

# Japanese input
sudo apt-get install -y ibus ibus-qt4 ibus-anthy ibus-gtk ibus-gtk3

# Removing flash from the system
sudo apt-get remove adobe-flashplugin flashplugin-installer -y

# Git stuff
sudo apt-get install -y git


# Yakuake theme
if [ -d ~/.local/share/yakuake/kns_skins ]; then
	echo "Yakuake theme folder exists. Skipping."
else
	mkdir ~/.local/share/yakuake/kns_skins
	git clone https://github.com/noahadvs/yakuake-breeze_perfect_dark.git ~/.local/share/yakuake/kns_skins/
fi


# youtube dl
sudo wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl


# libinput gestures
sudo gpasswd -a $USER input
sudo apt-get install xdotool wmctrl
sudo apt-get install libinput-tools
git clone https://github.com/bulletmark/libinput-gestures.git
cd libinput-gestures
sudo make install (or sudo ./libinput-gestures-setup install)
libinput-gestures-setup autostart
cd ..
sudo rm -R libinput-gestures


# Enable firewall
sudo ufw enable
# KDE Connect:
sudo ufw allow 1714:1764/udp
sudo ufw allow 1714:1764/tcp
sudo ufw reload


# Samba mounting
sudo apt-get install cifs-utils


# Swappiness
sudo bash -c "echo 'vm.swappiness = 10' >> /etc/sysctl.conf"


# Disable webcam
sudo bash -c "echo 'blacklist uvcvideo' >> /etc/modprobe.d/blacklist.conf"


# Dark theme as root in plasma
sudo bash -c "echo 'XDG_CURRENT_DESKTOP=\"KDE\"' >> /etc/environment"
kdesudo systemsettings5
```
