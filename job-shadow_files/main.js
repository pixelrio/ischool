/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _accordion = __webpack_require__(1);
	
	var _accordion2 = _interopRequireDefault(_accordion);
	
	var _nav = __webpack_require__(2);
	
	var _nav2 = _interopRequireDefault(_nav);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function ($) {
	  $(document).ready(function () {
	    setTimeout(function () {
	      var $slides = $('.flexslider .slides li');
	      var $minheight = 0;
	      $slides.each(function () {
	        var $slide = $('.caption', this);
	        var $height = $slide[0].offsetHeight;
	        if ($height > $minheight) {
	          $minheight = $height;
	        }
	      });
	      $slides.each(function () {
	        var $slide = $('.caption', this);
	        $slide.css({ height: $minheight });
	      });
	    }, 500);
	  });
	  $(document).ready(function () {
	    var duration = 300;
	
	    // Dirty little hack to the search icon onto the top search bar
	    $("#searchsubmit").attr('value', '\uF002').attr('style', 'font-family: \'FontAwesome\'');
	
	    // pass it the ID or Class of the link
	    var pullDownSearch = function pullDownSearch() {
	      if ($('.top-search').hasClass('open')) {
	        $('.top-search').stop().slideUp(duration, function () {
	          $('.overlay').stop().fadeOut(duration);
	        });
	
	        if ($("#searchbuttoncaret").hasClass('fa-angle-up')) {
	          $("#searchbuttoncaret").removeClass('fa-angle-up').addClass('fa-angle-down');
	        }
	      } else {
	        $('.overlay').stop().fadeIn(duration);
	        $('.top-search').stop().slideDown(duration, function () {
	          $('.subnav-container').removeClass('active').hide();
	        });
	
	        if ($("#searchbuttoncaret").hasClass('fa-angle-down')) {
	          $("#searchbuttoncaret").removeClass('fa-angle-down').addClass('fa-angle-up');
	        }
	      }
	
	      $('.top-search').toggleClass('open');
	    };
	
	    // Opens the top search bar
	    $('#opensearch').on('click', function () {
	      pullDownSearch();
	      $("#s").focus();
	      return false;
	    });
	    $('#closesearch').on('click', function () {
	      pullDownSearch();
	      return false;
	    });
	
	    // Closes the top search if the overlay is clicked
	    $('.overlay').mousedown(function () {
	      if ($('.top-search').hasClass('open')) {
	        pullDownSearch();
	        return false;
	      }
	    });
	
	    // Navigation Dropdown links
	    $('.sidebar-nav .toggle').on('click', function (event) {
	      // Element is a span class or is part of the sub-nav so we ignore the dropdown click
	      if (event.target.tagName.toLowerCase() === 'span' || $(event.target).closest('a').siblings('.sub-nav').length == 0) {
	        return true;
	      }
	
	      if ($(this).hasClass('open')) {
	        $(this).children('.sub-nav').stop().slideUp(duration);
	      } else {
	        $(this).children('.sub-nav').stop().slideDown(duration);
	
	        var other = $(this).parent('ul').children('.open').not(this).not('.mobile-menu');
	        other.children('a').find('i').toggleClass('fa-plus').toggleClass('fa-minus');
	        other.children('.sub-nav').stop().slideUp(duration);
	        other.find('.open .sub-nav').stop().slideUp(duration);
	        other.find('.open').children('a').find('i').toggleClass('fa-plus').toggleClass('fa-minus');
	        other.find('.open').removeClass('open');
	        other.removeClass('open');
	      }
	
	      $(this).children('a').find('i').toggleClass('fa-plus').toggleClass('fa-minus');
	      $(this).toggleClass('open');
	      return false;
	    });
	
	    // Mobile Menu
	    $('.mobile-nav-toggle').on('click', function () {
	      if ($('.mobile-nav-menu').hasClass('active')) {
	        $('.mobile-nav-menu').removeClass('active').hide();
	
	        $('.open-subnav').removeClass('active');
	        $('.open-subnav i').removeClass('fa-times').addClass('fa-plus');
	        $('.subnav').hide();
	
	        $('i', this).removeClass('fa-times').addClass('fa-bars');
	        $('body').attr('style', '');
	      } else {
	        $('.mobile-nav-menu').addClass('active').show();
	        $('i', this).removeClass('fa-bars').addClass('fa-times');
	        $('body').attr('style', 'overflow: hidden');
	
	        if ($('.top-search').hasClass('open')) {
	          pullDownSearch();
	        }
	      }
	
	      return false;
	    });
	
	    // Opens the search bar on mobile
	    $('.search-toggle').on('click', function () {
	      if ($('.mobile-nav-menu').hasClass('active')) {
	        $('.mobile-nav-menu').removeClass('active').hide();
	        $('.open-subnav').removeClass('active');
	        $('.open-subnav i').removeClass('fa-times').addClass('fa-plus');
	        $('.mobile-nav-toggle > i').removeClass('fa-times').addClass('fa-bars');
	        $('.subnav').hide();
	      }
	
	      pullDownSearch();
	      return false;
	    });
	
	    // opens a sub nav, closes others that are open
	    $('.mobile-nav .toggle').on('click', function (event) {
	      if ((event.target.tagName.toLowerCase() === 'span' || $(event.target).siblings('.sub-nav').length == 0) && event.target.tagName.toLowerCase() !== 'i') {
	        return true;
	      }
	
	      if ($(this).hasClass('open')) {
	        $(this).children('.sub-nav').stop().slideUp(duration);
	      } else {
	        $(this).children('.sub-nav').stop().slideDown(duration);
	
	        var other = $(this).parent('ul').children('.open').not(this);
	        other.children('a').find('i').toggleClass('fa-plus').toggleClass('fa-minus');
	        other.children('.sub-nav').stop().slideUp(duration);
	        other.find('.open .sub-nav').stop().slideUp(duration);
	        other.find('.open').children('a').find('i').toggleClass('fa-plus').toggleClass('fa-minus');
	        other.find('.open').removeClass('open');
	        other.removeClass('open');
	      }
	
	      $(this).children('a').find('i').toggleClass('fa-plus').toggleClass('fa-minus');
	      $(this).toggleClass('open');
	      return false;
	    });
	  });
	
	  $('select[name=filters]').on('change', function () {
	    $(this).closest('.search_form').submit();
	  });
	  $('.search_form').on('submit', function (e) {
	    var filters = $(this).find('select[name=filters]');
	    if (filters.length) {
	      filters = $(filters[0]);
	      e.preventDefault();
	      $('#filters').attr('name', filters.val().split('=')[0]);
	      $('#filters').val(filters.val().split('=')[1]);
	      $(filters).val('');
	      this.submit();
	    }
	  });
	  (0, _nav2.default)();
	  (0, _accordion2.default)();
	})(jQuery);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = enableAccordions;
	var $ = window.jQuery;
	
	function enableAccordions() {
	  var duration = { duration: 300 };
	  $('.ui-accordion-header').on('click', function (event) {
	    var $target = $(event.target);
	    var $wrapper = $target.closest('ul');
	    var $content = $target.siblings('.ui-accordion-content');
	    if (!$target.hasClass('ui-state-active')) {
	      $content.stop().slideDown(duration);
	    } else {
	      $content.stop().slideUp(duration);
	    }
	    if ($wrapper) {
	      $('.ui-accordion-content', $wrapper).not($content).slideUp(duration).siblings('.ui-accordion-header').removeClass('ui-state-active');
	    }
	    $target.toggleClass('ui-state-active');
	  });
	  $(document).on('click', '.resource-header', function (event) {
	    var $target = $(event.target).closest('.resource-header');
	    var $wrapper = $target.closest('.posts');
	    var $content = $target.siblings('.content');
	
	    if (!$content) {
	      return;
	    }
	
	    if (!$target.hasClass('active')) {
	      $content.stop().slideDown(duration);
	    } else {
	      $content.stop().slideUp(duration);
	    }
	    if ($wrapper) {
	      $('.content', $wrapper).not($content).slideUp(duration).siblings('.resource-header').removeClass('active');
	    }
	    $target.toggleClass('active');
	  });
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = enableNav;
	var $ = window.jQuery;
	function enableNav() {
	  var duration = 250;
	
	  // Change icon
	  $(".dropdown[data-dropdownchild]").hover(function () {
	    $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up').css('color', '#7ba4d9');
	  }, function () {
	    $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down').css('color', '');
	  });
	
	  var closeSubNav = function closeSubNav() {
	    $('.inner-container > .inner').each(function () {
	      if ($(this).hasClass('active')) {
	        $(this).stop().slideUp(duration);
	        $(this).removeClass('active');
	      }
	    });
	    $('.third-container > .inner').each(function () {
	      if ($(this).hasClass('active')) {
	        $(this).stop().slideUp(duration);
	        $(this).removeClass('active');
	      }
	    });
	  };
	  // open container if it need to be
	  var openDropDown = function openDropDown() {
	    var itemId = $(this).attr('data-dropdownchild'),
	        subnav = $('.subnav-container'),
	        target = $(".subnav-wrapper[data-dropdownparent=" + itemId + "]", subnav),
	        wrapper = $(this).closest('ul.main-nav'),
	        indicator = wrapper.find('.indicator'),
	        quicklinks = $('.outside[data-quicklinksparent=' + itemId + ']');
	
	    var newX = $(this).offset().left - wrapper.offset().left + $(this).width() / 2;
	    indicator.css({ 'left': newX });
	    subnav.css({ 'top': $('nav').outerHeight() });
	    if (!subnav.hasClass('active')) {
	      target.show();
	      quicklinks.show();
	      subnav.addClass('active');
	      subnav.stop().slideDown(duration, function () {});
	    } else {
	      target.stop().fadeIn(duration);
	      quicklinks.stop().fadeIn(duration);
	
	      $(".subnav-wrapper").not(target).hide();
	      $('.outside').not(quicklinks).hide();
	    }
	    $(this).closest('ul.main-nav').addClass('active');
	    closeSubNav();
	  };
	
	  $('.dropdown[data-dropdownchild]').mouseenter(openDropDown);
	  $('.dropdown[data-dropdownchild] > a').focus(function () {
	    $(this).parent().mouseenter();
	  });
	
	  var closeDropDown = function closeDropDown() {
	    var subnav = $('.subnav-container'),
	        parentId = $('.subnav-wrapper', subnav).attr('data-dropdownparent');
	
	    subnav.slideUp(duration, function () {
	      $(this).removeClass('active');
	      $(".subnav-wrapper", subnav).hide();
	      $('.outside').hide();
	    });
	    $(this).find('ul.main-nav').removeClass('active');
	  };
	
	  // close the submenu when you leave the nav all together
	  $('nav').mouseleave(closeDropDown);
	  $('nav').mouseleave(closeSubNav);
	
	  // Sub navs for the mega menu
	  var openSubNav = function openSubNav() {
	    if ($(this).hasClass('has-child')) {
	      var itemId = $(this).attr('data-dropdownchild'),
	          selector = '.inner-container > .inner[data-dropdownparent=' + itemId + ']',
	          $subnav = $(selector);
	      $('i', this).removeClass('fa-plus').addClass('fa-times');
	      $('.inner-container > .inner').each(function () {
	        if ($(this).hasClass('active')) {
	          $(this).stop().slideUp(duration);
	          $(this).removeClass('active');
	        }
	      });
	      $('.third-container > .inner').each(function () {
	        if ($(this).hasClass('active')) {
	          $(this).stop().slideUp(duration);
	          $(this).removeClass('active');
	        }
	      });
	      $subnav.addClass('active');
	      $subnav.stop().slideDown(duration);
	    } else {
	      $('.inner-container > .inner').each(function () {
	        if ($(this).hasClass('active')) {
	          $(this).stop().slideUp(duration);
	          $(this).removeClass('active');
	        }
	      });
	      $('.third-container > .inner').each(function () {
	        if ($(this).hasClass('active')) {
	          $(this).stop().slideUp(duration);
	          $(this).removeClass('active');
	        }
	      });
	    }
	  };
	
	  $('.sub-nav > li').mouseenter(openSubNav);
	  $('.sub-nav > .has-child > a').focus(function () {
	    $(this).parent().mouseenter();
	  });
	
	  $('.sub-nav > .has-child').mouseleave(function () {
	    var itemId = $(this).attr('data-dropdownchild'),
	        selector = '.inner-container > .inner[data-dropdownparent=' + itemId + ']',
	        $subnav = $(selector);
	    $('i', this).addClass('fa-plus').removeClass('fa-times');
	    if ($subnav.hasClass('active')) {
	      return false;
	    }
	    $subnav.stop().slideUp(duration);
	  });
	
	  // Sub-sub navigation
	  var openSubSubNav = function openSubSubNav() {
	    var itemId = $(this).attr('data-dropdownchild'),
	        selector = '.third-container > .inner[data-dropdownparent=' + itemId + ']',
	        $subnav = $(selector);
	    $('i', this).removeClass('fa-plus').addClass('fa-times');
	    if ($('.third-container > .inner').hasClass('active')) {
	      $('.third-container > .inner').stop().slideUp(duration);
	      $('.third-container > .inner').removeClass('active');
	    }
	    $subnav.addClass('active');
	    $subnav.stop().slideDown(duration);
	  };
	
	  $('.inner-container > .inner > .has-child').mouseenter(openSubSubNav);
	  $('.inner-container > .inner > .has-child > a').focus(function () {
	    $(this).parent().mouseenter();
	  });
	
	  $('.inner-container > .inner > .has-child').mouseleave(function () {
	    var itemId = $(this).attr('data-dropdownchild'),
	        selector = '.third-container > .inner[data-dropdownparent=' + itemId + ']',
	        $subnav = $(selector);
	    $('i', this).removeClass('fa-times').addClass('fa-plus');
	    if ($subnav.hasClass('active')) {
	      return false;
	    }
	    $subnav.removeClass('active');
	    $subnav.stop().slideUp(duration);
	  });
	
	  // Set the tabindex for the navigation, starting at 2, so it is after the
	  // toolbar menu
	  var i = 2;
	  $('.dropdown').each(function () {
	    var id = $(this).attr('data-dropdownchild');
	    $('a', this).attr('tabindex', i++);
	
	    $('.subnav-wrapper[data-dropdownparent=' + id + '] > .sub-nav > li').each(function () {
	      $('a', this).attr('tabindex', i++);
	      var subId = $(this).attr('data-dropdownchild');
	
	      $('.inner[data-dropdownparent=' + subId + ']').each(function () {
	        $('a', this).attr('tabindex', i++);
	        var subSubId = $(this).attr('data-dropdownchild');
	
	        $('.inner[data-dropdownparent=' + subSubId + ']').each(function () {
	          $('a', this).attr('tabindex', i++);
	        });
	      });
	    });
	
	    $('.outside[data-quicklinksparent=' + id + '] > div').each(function () {
	      $('a', this).attr('tabindex', i++);
	    });
	
	    i++;
	  });
	}

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map