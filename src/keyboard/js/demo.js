jQuery(function($) {

	$('#num').keyboard({
		layout: 'custom',
		display: {
			'bksp'   : '\u2190',
			'enter'  : 'return',
			'normal' : 'ABC',
			'meta1'  : '.?123',
			'meta2'  : '#+=',
			'accept' : '✔',
			'cancel' : '✖'
		},
		customLayout: {
			'normal': [
			  '1 2 3 4',
			  '5 6 7 8',
			  '9 0 . {bksp}',			  
			  '{accept} {cancel}'
			]
		},
		restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
		preventPaste : true,  // prevent ctrl-v and right click
		autoAccept : true
	});


	$('#alphaNumeric').keyboard({
		layout: 'custom',
		display: {
			'bksp'   : '\u2190',
			'enter'  : 'return',
			'normal' : 'ABC',
			'meta1'  : '.?123',
			'meta2'  : '#+=',
			'accept' : '✔',
			'cancel' : '✖'
		},
	
		layout: 'custom',
		customLayout: {
			'normal': [
				'q w e r t y u i o p {bksp}',
				'{s} a s d f g h j k l -',
				'z x c v b n m @ . {cancel} {accept}',
				'{space}'
			],
			'shift': [
				'Q W E R T Y U I O P {bksp}',
				'{s} A S D F G H J K L -',
				'Z X C V B N M @ . {cancel} {accept}',
				'{space}'
			]
		},
		restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
		preventPaste : true,  // prevent ctrl-v and right click
		autoAccept : true
	});

});
