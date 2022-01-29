
function el(id) {
	return document.getElementById(id)
}

function show(id) {
    $('#'+id).slideDown();
}    

function hide(id) {
   $('#'+id).fadeOut();
}    

function show_hide(id) {
	if ($('#'+id).css('display') == 'none') {
		$('#'+id).slideDown();
	} else {
		$('#'+id).fadeOut();
	}
}	

function redirect(url) {
	window.location = url;
	return false;
}

function if_confirm(url) {
	if(confirm("Вы уверены?"))
		redirect(url);
}

function Submit(form) {
	f = document.forms[form];
	f.submit();
}

function bookmark(url, title) {
	if (!url) url = location.href;
	url = "https://bigboss.video/new/";

	if (window.sidebar) { // Mozilla Firefox Bookmark
		window.sidebar.addPanel(title, url, "");
	} else if (window.external) { // IE Favorite
		window.external.AddFavorite(url, title);
	} else if (window.opera && window.print) { // Opera Hotlist
		return true;
	}
}	

function ThumbsRotator() {
	$('.thumb').bind('mouseover', function(e){
  	  	src = $(this).attr('src').split('/');
		path = "//" + src[2] + "/";
		ext = "";
	
		p = $(this).parent().parent();
		p.prepend('<div class="rotator-loading"><div><img src="./img/loading.gif" id="ajax-loader-bar" width="13px" /></div></div>');
	
		// video
		if (src.length > 6 && src[src.length-1].indexOf("-360x240.jpg") > 0) ext = '-360x240.jpg';
		if (src.length > 6 && src[src.length-1].indexOf("-540x360.jpg") > 0) ext = '-360x240.jpg';
		// photo gallery
		if (src.length > 6 && src[src.length-1].indexOf("_360x240.jpg") > 0) ext = '_360x240.jpg';
		if (src.length > 6 && src[src.length-1].indexOf("_540x360.jpg") > 0) ext = '_360x240.jpg';
		
		if (src.length > 6 && src[src.length-1].indexOf("_th.jpg") > 0) ext = '_th.jpg';
		for(i = 3; i < src.length-1; i++) path = path + src[i] + "/";
		KT_rotationStart(this, path, 25, ext);
	
	});
	$('.thumb').bind('mouseout', function(e){
		KT_rotationStop(this);
		$('#ajax-loader-bar').remove();
	});
}

function SetNewCookie(key, value, time) { 
   var expires = new Date();  
   expires.setTime(expires.getTime() + time); 
   document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();  
}  
  
function getCookie(key) {  
	var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');  
	return keyValue ? keyValue[2] : null;  
}  

function SearchInit() {
	squery = $('#search-query').val(); 
	
	if (squery) {
		squery = squery.replace(/ /g, '-');
		squery = squery.replace(/[&\/\\#,+()$~%.'":*!^?<>{}]/g, '');
		squery.trim();
		//~ alert(squery);
		//~ redirect('/adult/bigboss.video/search/' + squery + '/');
		redirect('/search/' + squery + '/');
	}	
}

function CommentReply(id, value) {
	$('#' + id).val(value); 
	$('#' + id).focusEnd();
}

// Set focus at end of field. 
$.fn.setCursorPosition = function(position){
    if(this.length == 0) return this;
    return $(this).setSelection(position, position);
}
$.fn.setSelection = function(selectionStart, selectionEnd) {
    if(this.length == 0) return this;
    input = this[0];

    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}
$.fn.focusEnd = function(){
    this.setCursorPosition(this.val().length);
            return this;
}


function EncodeURL(flvUrl) {
	flvUrl = flvUrl.replace(/\&/g, '%26');
	flvUrl = flvUrl.replace(/\?/g, '%3F');
	flvUrl = encodeURIComponent(flvUrl);
	return flvUrl;
}

function getvideourl(str) {
	return decode64(str);
}

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com
 
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
function encode64(input) {
	var output = new StringMaker();
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
 
	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
 
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
 
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
 
		output.append(keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4));
   }
   
   return output.toString();
}
 
function decode64(input) {
	var output = new StringMaker();
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
 
	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
	while (i < input.length) {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
 
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
 
		output.append(String.fromCharCode(chr1));
 
		if (enc3 != 64) {
			output.append(String.fromCharCode(chr2));
		}
		if (enc4 != 64) {
			output.append(String.fromCharCode(chr3));
		}
	}
 
	return output.toString();
}

var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf(" chrome/") >= 0 || ua.indexOf(" firefox/") >= 0 || ua.indexOf(' gecko/') >= 0) {
	var StringMaker = function () {
		this.str = "";
		this.length = 0;
		this.append = function (s) {
			this.str += s;
			this.length += s.length;
		}
		this.prepend = function (s) {
			this.str = s + this.str;
			this.length += s.length;
		}
		this.toString = function () {
			return this.str;
		}
	}
} else {
	var StringMaker = function () {
		this.parts = [];
		this.length = 0;
		this.append = function (s) {
			this.parts.push(s);
			this.length += s.length;
		}
		this.prepend = function (s) {
			this.parts.unshift(s);
			this.length += s.length;
		}
		this.toString = function () {
			return this.parts.join('');
		}
	}
}
