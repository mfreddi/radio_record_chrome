function doStuffWithDom(result) {
    chrome.browserAction.setBadgeText({text: result.length+''});        
    var $ul = $('<ul></ul>');
    $(result).each(function(i, v){
    	$ul.append('<li><a class="download" target="_blank" href="' + v.item_url + '" download="' + v.trackname.replace(/[<span>|</span>]/g, '') + '.mp3" title="Скачать">MP3<a/><div>'+ v.trackname +'</div></li>');	   
    });
    $('#result').html($ul);
}
/*

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo && changeInfo.status === 'complete') {
  	chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function(){
  		chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
			file: 'content.js'
		}, function(){
			chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
		});  
  	})
		
    
    //chrome.browserAction.setBadgeText({text: "10+"});
    //console.log(chrome.tabs);
  }
});
*/

window.addEventListener('load', function (evt) {
	chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function(){
		chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
			file: 'content.js'
		});
	})	
});

chrome.runtime.onMessage.addListener(function (message) {
	doStuffWithDom(message);
});