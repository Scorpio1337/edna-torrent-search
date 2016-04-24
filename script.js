var icon_url = chrome.extension.getURL("torrent_icon.png");

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
		$icon.attr('data-src', icon_url);

		var $a = $('<a>');
		$a.addClass('torrent_icon');
		$a.append($icon);
		$a.attr('href', 'https://1337x.to/search/' + name.replace(' ', '+') + '/1/');
		$a.attr('target', '_blank');

		var $name = $img_td.next().find('h3');
		$name.prepend($a);
	});
})