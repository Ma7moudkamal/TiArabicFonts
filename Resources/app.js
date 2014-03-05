var TiDynamicFont = require('yy.tidynamicfont');
Ti.include('fonts.js');

var font_1 = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'fonts', "ge_ss_two_light.ttf");
var font_2 = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'fonts', "mobily.ttf");
var font_3 = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'fonts', "Tachkili Font TTF.otf");
var font_4 = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'fonts', "almwaheb by A4d.TTF");

TiDynamicFont.registerFont(font_1);
TiDynamicFont.registerFont(font_2);
TiDynamicFont.registerFont(font_3);
TiDynamicFont.registerFont(font_4);

var win = Ti.UI.createWindow({
	backgroundColor : '#fff',
	tabBarHidden : true,
	layout :'vertical'
});
var winTitle = Ti.UI.createLabel({
	color : '#D13D29',
	top:30,
	text : convert('خطوط عربية'),
	font : {
		fontSize : 15,
		fontFamily : 'almwaheb by A4D'
	}
});
win.setTitleControl(winTitle);

var label_1 = Ti.UI.createLabel({
	color : '#333',
	top:30,
	text : convert('السلام عليكم ورحمة الله وبركاته'),
	font : {
		fontSize : 20,
		fontFamily : 'MO_Nawel' // Font Name
	}
});
win.add(label_1);

var label_2 = Ti.UI.createLabel({
	color : '#3D82F0',
	text : convert('السلام عليكم ورحمة الله وبركاته'),
	font : {
		fontSize : 20,
		fontFamily : 'GE SS Two'// Font Name
	}
});
win.add(label_2);

var label_3 = Ti.UI.createLabel({
	color : '#8EB076',
	text : convert('السلام عليكم ورحمة الله وبركاته'),
	font : {
		fontSize : 20,
		fontFamily : 'djadli_Tachkili'// Font Name
	}
});
win.add(label_3);

// create tab group
var tabGroup = Ti.UI.createTabGroup();
//
//  add tabs
//
var tab1 = Ti.UI.createTab({
	window : win
});

tabGroup.addTab(tab1);

// open tab group
tabGroup.open();
