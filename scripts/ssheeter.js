var SongSheeter = {
		
	formatSheet: function (className) {
		
		$("." + className).each(function() {
			
    		var content = $(this).text();
    		
    		content = content.replace(/(Song:(.*))/, '<h1>$2</h1>');
    		content = content.replace(/(Artist:(.*))/, '<h2>$2</h2>');
    		content = content.replace(/\[(.*:......)\]/gm, '<span class="chartChord">$1</span>');
    		// content = content.replace(/(\[\s*)/gm, '<span class="charts">');
    		// content = content.replace(/(\s*\])/gm, '</span>');
    		
            $(this).empty();
            $(this).append(content);
            
		});
				
		var chordCounter = 0;
		
		$(".chartChord").each(function() {
    		try {
    		var content = $(this).text();
    		var props = content.split(":");
    		
    		$(this).parent().append('<canvas class="chordChart" id="chordChart' + chordCounter + '" width="100" height="105">Your browser does not support the canvas element.</canvas>');
			ChordCharter.drawChord('chordChart' + chordCounter, 30, 30, props[0], props[1]);
			
			chordCounter++;
			} catch (e) { alert(e); }
		});
		
		$(".chartChord").remove();
		
		$("." + className).each(function() {
		
		    var content = '';
		    
			$(this).contents().filter(function(){ return this.nodeType != 1; }).each(function() {
				content = content + $(this).text();
			});

			content = content.replace(/(\r\n(\s*\r\n)*|\n(\s*\n)*|\r(\s*\r))/gm, '\n');
            content = content.replace(/(\r\n|\n|\r)/gm,'<br />');
            content = content.replace(/({)/gm, '<span class="chordWrapper"><span class="chord">');
            content = content.replace(/(})/gm, '</span></span>');
            
            $(this).append('<div class="song">' + content + '</div>');
            
            $(this).contents().filter(function(){ return this.nodeType != 1; }).each(function() {
				$(this).remove();
			});
		});
	}
};