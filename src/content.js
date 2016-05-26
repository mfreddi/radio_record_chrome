/*chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'report_back') {
		var item_url,
			trackname,
			tracklist = [];

		$('[item_url]').each(function(i, v){
			item_url = $(v).attr('item_url');
			trackname = $(v).parent().find('.trackname').html();
			tracklist.push({item_url: item_url.trim(), trackname: trackname.trim()});	
		});
		console.log(tracklist);
        sendResponse(tracklist);
    }
});
*/
var findMp3 = function(){
	var item_url,
		trackname,
		tracklist = [];

	if(!$('.gudok-wrapper').length){
		$('[item_url]').each(function(i, v){
			item_url = $(v).attr('item_url');
			if($(v).parent().find('.play_info').length){
				trackname = ('<span>'+$(v).parent().find('.play_info').children().eq(0).html()+'</span><span>'+$(v).parent().find('.play_info').children().eq(1).html()+'</span>')
			}
			if($(v).parent().find('.trackname').length){
				trackname = '<span>'+$(v).parent().find('.trackname').children().eq(0).html()+'</span><span>' + $(v).parent().find('.trackname').children().eq(1).html()+'</span>'
			}
			item_url = item_url.trim().indexOf('/')===0? 'http://www.radiorecord.ru'+item_url.trim(): '';
			tracklist.push({item_url: item_url, trackname: trackname.trim()});	
		});		
	}else{
		$('.play_pause').each(function(i, v){
			item_url = $(v).attr('url');
			if($(v).parent().find('.info').length){
				trackname = ('<span>'+$(v).parent().find('.info').children().eq(0).html()+'</span><span>'+$(v).parent().find('.info').children().eq(1).html()+'</span>')
			}
			if($(v).parent().find('.trackname').length){
				trackname = '<span>'+$(v).parent().find('.trackname').children().eq(0).html()+'</span><span>' + $(v).parent().find('.trackname').children().eq(1).html()+'</span>'
			}
			item_url = item_url.trim().indexOf('/')===0? 'http://www.radiorecord.ru'+item_url.trim(): '';
			tracklist.push({item_url: item_url, trackname: trackname.trim()});	
		});
	}

	chrome.runtime.sendMessage(tracklist);	
}
findMp3();
$(document).on('click', 'a', function() {
   setTimeout(function(){findMp3();}, 2000);
});