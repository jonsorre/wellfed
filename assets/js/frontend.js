/* global Tasmanl10n */
( function( $ ) {

	var tasman = tasman || {};

	tasman.init = function() {

		tasman.$body 	= $( document.body );
		tasman.$window = $( window );
		tasman.$html 	= $( 'html' );
		tasman.$footerWidgets = $( '.footer-widgets' );

		this.inlineSVG();
		this.fitVids();
		this.responsiveTable();
		this.smoothScroll();
		this.parallax();
		this.stickit();
		this.subMenuToggle();
		this.gallery();
		this.masonry();
		this.returnToTop();
		this.bind();

	};

	tasman.supportsInlineSVG = function() {

		var div = document.createElement( 'div' );
		div.innerHTML = '<svg/>';
		return 'http://www.w3.org/2000/svg' === ( 'undefined' !== typeof SVGRect && div.firstChild && div.firstChild.namespaceURI );

	};

	tasman.inlineSVG = function() {

		if ( true === tasman.supportsInlineSVG() ) {
			document.documentElement.className = document.documentElement.className.replace( /(\s*)no-svg(\s*)/, '$1svg$2' );
		}

	};

	tasman.fitVids = function() {

		$( '#page' ).fitVids({
			customSelector: 'iframe[src^="https://videopress.com"]'
		});

	};

	tasman.responsiveTable = function() {
		$( 'table' ).wrap( '<div class="table-responsive"></div>' );
	};

	tasman.smoothScroll = function() {

		var $smoothScroll = $( 'a[href*="#content"], a[href*="#site-navigation"], a[href*="#secondary"], a[href*="#page"]' );

		$smoothScroll.on( 'click', function(event) {
	        // On-page links
	        if (
	            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
	            location.hostname === this.hostname
	        ) {
	            // Figure out element to scroll to
	            var target = $(this.hash);
	            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	            // Does a scroll target exist?
	            if (target.length) {
	                // Only prevent default if animation is actually gonna happen
	                event.preventDefault();
	                $('html, body').animate({
	                    scrollTop: target.offset().top
	                }, 500, function() {
	                    // Callback after animation
	                    // Must change focus!
	                    var $target = $(target);
	                    $target.focus();
	                    if ($target.is(':focus')) { // Checking if the target was focused
	                        return false;
	                    } else {
	                        $target.attr( 'tabindex', '-1' ); // Adding tabindex for elements not focusable
	                        $target.focus(); // Set focus again
	                    }
	                });
	            }
	        }
		});

	};

	tasman.parallax = function() {

		var $parallax = $( '.wp-custom-header' );

		$parallax.parallax();

	};

	tasman.stickit = function() {

		var $mainNav = $( '.main-navigation' );

		$mainNav.stickit({
			screenMinWidth: 782,
			zIndex: 5
		});

	};

	tasman.subMenuToggle = function() {

		var $subMenu = $( '.main-navigation .sub-menu' );

		$subMenu.before( '<button class="sub-menu-toggle" role="button" aria-expanded="false">' + Tasmanl10n.expandMenu + Tasmanl10n.collapseMenu + Tasmanl10n.subNav + '</button>' );
		$( '.sub-menu-toggle' ).on( 'click', function( e ) {

			e.preventDefault();

			var $this = $( this );
			$this.attr( 'aria-expanded', function( index, value ) {
				return 'false' === value ? 'true' : 'false';
			});

			// Add class to toggled menu
			$this.toggleClass( 'toggled' );
			$this.next( '.sub-menu' ).slideToggle( 0 );

		});

	};

	tasman.gallery = function() {

		var $entryGallery = $( '.entry-gallery' );

		$entryGallery.each( function() {

			var galleryID = $(this).attr('id');

			$( '#'+ galleryID ).justifiedGallery({
				rowHeight : 150,
				margins : 5,
				lastRow: 'justify'
			});

			$( '#'+ galleryID ).magnificPopup({
				delegate: 'a',
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				image: {
					verticalFit: true,
					titleSrc: function(item) {
						return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">'+ Tasmanl10n.imageSrc +'</a>';
					}
				},
				gallery: {
					enabled: true
				},
				zoom: {
					enabled: true,
					duration: 300, // don't foget to change the duration also in CSS
					opener: function(element) {
						return element.find('img');
					}
				}

			});
		});

	};

	tasman.masonry = function() {

		tasman.$footerWidgets.masonry({
			itemSelector: '.widget',
			columnWidth: '.widget'
		});

		$( window ).load(function(){
	        tasman.$footerWidgets.masonry( 'reloadItems' );
	        tasman.$footerWidgets.masonry( 'layout' );
		});

	};

	tasman.returnToTop = function() {

		var $returnTop = $( '.return-to-top' );

		$(window).scroll(function () {
		    if ($(this).scrollTop() > 720) {
		        $returnTop.removeClass('off').addClass('on');
		    }
		    else {
		        $returnTop.removeClass('on').addClass('off');
		    }
		});

	};

	tasman.bind = function() {

		tasman.$body.on( 'post-load', function () {
			tasman.fitVids();
			tasman.gallery();
		});

		tasman.$window.load(function(){
	        tasman.$footerWidgets.masonry( 'reloadItems' );
	        tasman.$footerWidgets.masonry( 'layout' );
		});

		tasman.$body.on( 'wp-custom-header-video-loaded', function() {
			tasman.$body.addClass( 'has-header-video' );
		});

	};

	/** Initialize tasman.init() */
	$( function() {

		tasman.init();

	    if ( 'undefined' === typeof wp || ! wp.customize || ! wp.customize.selectiveRefresh ) {
	        return;
	    }

		wp.customize.selectiveRefresh.bind( 'sidebar-updated', function( sidebarPartial ) {
			if ( 'sidebar-1' === sidebarPartial.sidebarId ) {
	        	tasman.$footerWidgets.masonry( 'reloadItems' );
	        	tasman.$footerWidgets.masonry( 'layout' );
			}
		});

	});


} )( jQuery );

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	var container, button, menu, links, i, len;

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 */
	( function( container ) {
		var touchStartFn, i,
			parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			touchStartFn = function( e ) {
				var menuItem = this.parentNode, i;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for ( i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem === menuItem.parentNode.children[i] ) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove( 'focus' );
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( i = 0; i < parentLink.length; ++i ) {
				parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
			}
		}
	}( container ) );
} )();

(function ($) {

	$.fn.parallax = function () {
		var window_width = $(window).width();
		// Parallax Scripts
		return this.each(function() {
			var $this = $(this);
			$this.addClass('parallax');

			function updateParallax(initial) {
				var container_height;
				if (window_width < 601) {
					container_height = ($this.height() > 0) ? $this.height() : $this.children('img').height();
				}
				else {
					container_height = ($this.height() > 0) ? $this.height() : 500;
				}
				var $img = $this.children('img').first();
				var img_height = $img.height();
				var parallax_dist = img_height - container_height;
				var bottom = $this.offset().top + container_height;
				var top = $this.offset().top;
				var scrollTop = $(window).scrollTop();
				var windowHeight = window.innerHeight;
				var windowBottom = scrollTop + windowHeight;
				var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
				var parallax = Math.round((parallax_dist * percentScrolled));

				if (initial) {
					$img.css('display', 'block');
				}
				if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
					$img.css('transform', 'translate3D(-50%,' + parallax + 'px, 0)');
				}

			}

			// Wait for image load
			$this.children('img').one('load', function() {
				updateParallax(true);
			}).each(function() {
				if (this.complete) {
					$(this).trigger('load');
				}
			});

			$(window).scroll(function() {
				window_width = $(window).width();
				updateParallax(false);
			});

			$(window).resize(function() {
				window_width = $(window).width();
				updateParallax(false);
			});

		});

	};
}( jQuery ));

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
( function() {
	var isIe = /(trident|msie)/i.test( navigator.userAgent );

	if ( isIe && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
} )();
