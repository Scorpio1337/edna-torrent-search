var icon_url = chrome.extension.getURL("torrent_icon.png");
var icon_url_visited = chrome.extension.getURL("torrent_icon_visited.png");

$(function () {
	$('.episodes tr').each(function () {
		var $img_td = $(this).find('.img');
		var $img = $(this).find('.img img');
		var name = $img.attr('alt');

		// Delete episode name after episode number
		name = name.replace(/(S[0-9]{2,}E[0-9]{2,}):.*/, '$1');

		// If episode number is missing (it's propably on main page), get episode number
		var num_pos = name.search(/(S[0-9]{2,}E[0-9]{2,})/);
		if (name.search(/(S[0-9]{2,}E[0-9]{2,})/) == -1) {
			var html = $(this).html();
			var num = html.match(/(S[0-9]{2,}E[0-9]{2,})/);
			if (num && num.length > 0) {
				name += ' ' + num[1];
			}
		}

		// If serial name is missing
		if (num_pos == 0) {
			var title = $('title').html().split(' | ')[1];
			name = title + ' ' + name;
		}

		// Remove czech name
		name = name.replace(/ \(.*\)/, '');
		

		var $icon = $('<img>');
		$icon.attr('src', icon_url);

		var $a = $('<a>');
		$a.addClass('torrent_icon');
		$a.append($icon);
		$a.attr('href', 'https://1337x.to/search/' + name.replace(' ', '+') + '/1/');
		$a.attr('target', '_blank');

		var hashName = hashCode(name).toString();

		chrome.storage.local.get(hashName, function(items) {
		    if (hashName in items == true) {
		    	$icon.attr('src', icon_url_visited);
		    }
		});

		// Add event to link click
		$a.click(function () {
			var obj = {};
			obj[hashName] = true;
			chrome.storage.local.set(obj);
			return true;
		});

		var $name = $img_td.next().find('h3');
		$name.prepend($a);
	});
});

hashCode = function(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return hash;
}