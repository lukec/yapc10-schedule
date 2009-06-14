
var show_description = function(e)
{
	var src = e.target;	
}

var show_talks = function(e)
{
	var src = e.target;
	var code = e.target.id.split('_')[1];
	var target = '#talks_' + code;
	var style = x$(target).getStyle('display');
	if (style == 'none')
	{
		x$(target).css({ display: 'block' });
		x$(target).tween({height: '0%'}, {height: '100%'});
	}
	else
	{

		x$(target).tween({height: '100%'}, {height: '0%'});
		x$(target).css({ display: 'none' });	
	}
}

var switch_to_monday = function(e) {
    var style = x$("#monday").getStyle('display');
    if (style == 'none') {
        resetAll();
        x$('#monday').css({ display: 'block'});	
        x$('.montab').addClass('selected');	
    }
}

var switch_to_tuesday = function(e) {
    var style = x$("#tuesday").getStyle('display');
    if (style == 'none') {
        resetAll();
        x$('#tuesday').css({ display: 'block'});	
        x$('.tuestab').addClass('selected');	
    }
}

var switch_to_wednesday = function(e) {
    var style = x$("#wednesday").getStyle('display');
    if (style == 'none') {
        resetAll();
        x$('#wednesday').css({ display: 'block'});	
        x$('.wedstab').addClass('selected');
    }
}

var switch_to_twitter = function(e) {
    var style = x$("#twitter").getStyle('display');
    if (style == 'none') {
        resetAll();
        get_twitter();
        x$('#twitter').css({ display: 'block'});	
        x$('.twittertab').addClass('selected');
    }
}

var switch_to_info = function(e) {
    var style = x$("#info").getStyle('display');
    if (style == 'none') {
        resetAll();
        x$('#info').css({ display: 'block'});	
        x$('.infotab').addClass('selected');
    }
}

var get_twitter = function() {
    var req    = new XMLHttpRequest();
    req.open('get', 'http://search.twitter.com/search.json?q=yapc', null);
    req.onload = function() { process_twitter(this.responseText); };
    req.send(null);	
}

var process_twitter = function(text) {
    eval('var result_set = ' + text);
    var results = result_set.results;
    var contents = "";
    for(var i = 0; i < results.length; ++i) {
        var tweet = '<div class="tweet example">';
        tweet += '<div class="author">@' + results[i].from_user + '</div>';
        tweet += '<div class="content"><a href="http://twitter.com/' + results[i].from_user + '/">' + results[i].from_user + '</a>:' + results[i].text + '</div>';
        tweet += '</div>';
        contents += tweet;
    }
    x$('#twitterfeed').html(contents);
}


function resetAll() {
    x$('#monday').css({display: 'none'});
    x$('#tuesday').css({display: 'none'});
    x$('#wednesday').css({display: 'none'});
    x$('#twitter').css({display: 'none'});
    x$('#info').css({display: 'none'});
    
    x$('.montab').removeClass('selected');
    x$('.tuestab').removeClass('selected');
    x$('.wedstab').removeClass('selected');
    x$('.twittertab').removeClass('selected');
    x$('.infotab').removeClass('selected');
}

x$(window).load(function(e){ 		
    x$('div.datetime').click(function(evt){show_talks(evt);});
    x$('div.title').click(function(evt){show_description(evt);});
    x$('div.montab').click(function(evt){switch_to_monday(evt);});;
    x$('div.tuestab').click(function(evt){switch_to_tuesday(evt);});;
    x$('div.wedstab').click(function(evt){switch_to_wednesday(evt);});
    x$('div.twittertab').click(function(evt){switch_to_twitter(evt);});
    x$('div.infotab').click(function(evt){switch_to_info(evt);});
});
