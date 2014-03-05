TiArabicFonts
=============

Titanium Converter to Arabic characters from and to Arabic Presentation Forms B 


Thanks For @dbankier because i'm using hid module for dynamically loading custom fonts without put fonts in info.plist


--------
Installation

1- Download application source

2- unzip yy.tidynamicfont.zip and move it to your iphone modules folder

3- run & enjoy :D




Follow Me on
[Twitter](http://www.twitter.com/mahmkamal)

Example Usage
-------------

```
var TiDynamicFont = require('yy.tidynamicfont');
Ti.include('fonts.js');

var font_1 = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'fonts', "ge_ss_two_light.ttf");
TiDynamicFont.registerFont(font_1);

var win = Ti.UI.createWindow({
	backgroundColor : '#fff',
	layout :'vertical'
});

var label_1 = Ti.UI.createLabel({
	color : '#333',
	top:30,
	text : convert('السلام عليكم ورحمة الله وبركاته'),
	font : {
		fontSize : 20,
		fontFamily : 'GE SS Two'// Font Name
	}
});
win.add(label_1);

win.open();
```





