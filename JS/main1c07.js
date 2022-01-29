
$(document).ready(function() {
	
	// Player
	if ($("#flashcontent").length) {
		//~ $("footer").append('<script async src="./common/playerjs/playerjs-bigbossvideo-14.5.js?v=1"></script>');
		$('#flashcontent').html('');
		LoadPlayer(); 
	}
		
	// view-video |  view-model
	ajax_mode = $("#ajax_mode").val();
	if (ajax_mode == 'view-video' || ajax_mode == 'view-model') {
		entity_id = $("#entity_id").val();
		if (entity_id) {
			$.ajax({
				type: 'POST',
				url: 'ajax/',
				data: 'mode=' + ajax_mode + '&id=' + entity_id,
				dataType : "html", 
			});
		}
	}
	
	// Close adv btn
	if ($("#close-promo").length) {  
		$("#close-promo").on('click', function(e) {
			$("#uvpromo").fadeOut();
		});
	}
	
	/*----------  back-top  ----------*/
	 if ($('#back-to-top').length) {
	 	$("footer").append('<script src="./js/wload/js/jquery.Wload.js" defer></script>');
	    var scrollTrigger = 500, // px
	        backToTop = function () {
	            var scrollTop = $(window).scrollTop();
	            if (scrollTop > scrollTrigger) {
	                $('#back-to-top').addClass('show');
	            } else {
	                $('#back-to-top').removeClass('show');
	            }
	        };
	    backToTop();
	    $(window).on('scroll', function () {
	        backToTop();
	    });
	    $('#back-to-top').on('click', function (e) {
	        e.preventDefault();
	        $('html,body').animate({
	            scrollTop: 0
	        }, 1600, "swing");
	    });
	}
	
	// thumbs rotator
	if ($('.thumb').length && window.innerWidth > 800) {
		ThumbsRotator();
		KT_rotationEngineStartup(0.4, 0.4);
	}
	
	if ($("#like-btn").length) { 
		$("#like-btn").on('click', function(e) {
			Voting('video', 1);
		});
	}
	if ($("#dislike-btn").length) {  
		$("#dislike-btn").on('click', function(e) {
			Voting('video', -1);
		});
	}
	
	$('#form-comment').submit(function() {
		$('body').Wload({
			el: '#form-textarea'
		});
		
	 	$('#submit').prop('disabled', true);
	 	video_id = $("#entity_id").val();
		var form_data = $(this).serialize();
		$.ajax({
            type: "POST",
            url: "ajax/",
            data: 'mode=post-comment&id=' + video_id + '&' + form_data,
            success: function(data) {
				//~ alert(data);
				$("#form-textarea").append('<p class="comment-sent">Спасибо, Ваше сообщение отправлено!</p>');
           		$('body').Wload('hide',{
					time: 1000 // auto close after 2 seconds
				});
				$("#form-text").val('');
				var item = $(data).hide();
				$("#comments-list").prepend(item);
				item.fadeIn(2000);
				setTimeout(function(){
					$(".comment-sent").hide(2000);
					$('#submit').prop('disabled', false);
				}, 5000);
			}
		});
		//~ $.cookie('name', 'value');
		
		return false;
	});
	
	if ($('#btn-view-more-comments').length) {
		$('#btn-view-more-comments').click(function() {
			LoadMore('load-more-comments', 'btn-view-more-comments', 'comments-list');
		});
	}
	if ($('#btn-load-more-video-by-tags').length) {
		$('#btn-load-more-video-by-tags').click(function() {
			LoadMore('load-more-video-by-tags', 'btn-load-more-video-by-tags', 'videos-list');
		});
	}
	if ($('#btn-load-more-related-videos').length) {
		$('#btn-load-more-related-videos').click(function() {
			LoadMore('load-more-videos', 'btn-load-more-related-videos', 'related-videos-list');
		});
	}
	
	var bLazy = new Blazy({ 
		selector: 'img' // all images
	});
	
	//~ $("head").append('<link rel="stylesheet" href="fonts/fa/css/font-awesome.min.css" />'); // mobile menu buttons
	
	
	/*===============================
	=            resizer            =
	===============================*/
	var breakPoint = false,
		bp_XS      = 768,
		bp_SM      = 990,
		bp_MD      = 1320,
		body       = $('body'),
		html       = $('html'),
		windowWidth =  window.innerWidth;

	function resizer(){
		windowWidth =  window.innerWidth;
		var ww = window.innerWidth;
		if (ww < bp_XS) {windowXS();};
		if (ww >= bp_XS && ww < bp_SM) {windowSM();};
		if (ww >= bp_SM && ww < bp_MD) {windowMD();};
		if (ww >= bp_MD) {windowLG();};
	};

	function windowXS(){
		if (breakPoint != 'xs') {
			breakPoint = 'xs';
			body.trigger('resize_xs_once');
		};
		body.trigger('resize_xs');
	};

	function windowSM(){
		if (breakPoint != 'sm') {
			breakPoint = 'sm';
			body.trigger('resize_sm_once');
		};
		body.trigger('resize_sm');
	};

	function windowMD(){
		if (breakPoint != 'md') {
			breakPoint = 'md';
			body.trigger('resize_md_once');
		};
		body.trigger('resize_md');
	};

	function windowLG(){
		if (breakPoint != 'lg') {
			breakPoint = 'lg';
			body.trigger('resize_lg_once');
		};
		body.trigger('resize_lg');
	};
	
	$('#search-query').on('keypress',function(e) {
		if(e.which == 13) {
			SearchInit();
		}
	});
	
	$('#search-submit').on('click', function(){
		SearchInit();
	});
	
	$('.header__tc-search-toggle button').on('click', function(){
		body.addClass('stop-scroll __header_search__');
	});

	$('.header__search-tc-toggle button').on('click', function(){
		body.removeClass('stop-scroll __header_search__');
	});

	$('.header__tc-menu-open button').on('click', function(){
		body.addClass('stop-scroll __header_nav__');
	});

	$(document).on('click', function(e){
		if( $(e.target).closest('.header__tc-menu-open button, .header__nav').length === 0 ){
			body.removeClass('stop-scroll __header_nav__');
		}
	});

	$('.video__content-ds-ct button').on('click', function(){
		$(this).closest('.video__content-ds').addClass('active');
	});


	// Ads section
	//~ $("footer").append('<script defer type="text/javascript">if(typeof bc_blocks=="undefined"&&window.bc_blocks===undefined){var bc_blocks=document.getElementsByClassName("bigClickTeasersBlock");if(bc_blocks.length){var bc_blocks_ids=[];for(var i=0;i<bc_blocks.length;i++){var bc_el_id_str=bc_blocks[i].id;var bc_el_id=parseInt(bc_el_id_str.substring(bc_el_id_str.lastIndexOf("_")+1));if(bc_el_id>0){bc_blocks_ids.push(bc_el_id)}}if(bc_blocks_ids.length&&bc_blocks_ids.length<5){var bc_scr=document.createElement("script");bc_scr.src="https://xtransferme.com/lhzbsrfkjf/js/"+bc_blocks_ids.join("/")+"?r="+encodeURIComponent(document.referrer)+"&"+Math.round(Math.random()*99999);bc_scr.setAttribute("async","");document.body.appendChild(bc_scr)}}}</script>');
	
	//~ $("footer").append('<script defer data-url="https://messiupal.com/master/1431" id="bmscriptp" src="//messiupal.com/sweetie/hello.min.js?id=1605640813"></script>');
	
});




/*=====  End of resizer  ======*/

/*==================================
=            object-fit            =
==================================*/

	//~ if ($('.objectfit').length > 0 && !Modernizr.objectfit) {
		//~ $('.objectfit').each(function () {
			//~ var src = $(this).find('> img').attr('src');
			//~ $(this).css('background-image','url(' + src + ')');
		//~ })
	//~ }

/*=====  End of object-fit  ======*/
/*=====  End of slick slider for tutors  ======*/

/*=================================
=            PRELOADER            =
=================================*/

//~ function loadPageFunction(){
	//~ var loader = $('.page-preloader');
	//~ setTimeout(function() {
		//~ loader.addClass('__is-load');
	//~ }, 500);
//~ }

/*=====  End of PRELOADER  ======*/



//~ $(window).on('load', function () {
	//~ resizer();
	//~ loadPageFunction();
//~ });

//~ $(document).on('ready', function(){});

//~ $(window).on('scroll', function(){});

//~ $(window).on('resize', function(){});
