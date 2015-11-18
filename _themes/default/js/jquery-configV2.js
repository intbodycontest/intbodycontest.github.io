/***
/	@StandardChartered
/	@descripton: Global site script
/	@author j.lau@SASDesign http://www.jonathanlau.co.uk
/	@build 12.07.11
=================*/

jQuery(function ($) {

	$.JL = {};

	$.JL.Page = Page = {

		_jsclass: "jsEnabled",
		_ieclass: "ie",
		_isIE6: ($.browser.msie && $.browser.version.substr(0, 1) < 7) ? true : false,
		_isIE6_7: ($.browser.msie && $.browser.version.substr(0, 1) < 8) ? true : false,
		_selectedclass: "selected",
		_activeclass: "active",
		_inactiveclass: "inactive",
		_lastclass: "last",
		_loaderClass: "loader",
		_loaderInterval: 1600,

		init: function () {
			$('body').addClass(Page._jsclass);
			if ($.browser.msie && $.browser.version.substr(0, 1) < 9) {
				$('body').addClass(Page._ieclass);
			}

			Plugins.launch();
			Sharesfeed.launch();
			Mapmodule.init();
			Dropdown.launch();
			Accordion.launch();
			Tabs.launch();
			Forms.launch();
			Aux.init();
			EqualHeight.launch();
		}
	};
	
	$.JL.Utils = Utils = {
		getSelector: function (str) {
			var rtn = '.' + str;
			return rtn;
		},

		activateElement: function (obj) {
			$(obj).removeClass(Page._inactiveclass);
			$(obj).addClass(Page._activeclass);
		},

		deactivateElement: function (obj) {
			$(obj).removeClass(Page._activeclass);
			$(obj).addClass(Page._inactiveclass);
		},

		activateAll: function (arr) {
			$(arr).each(function (index) {
				Utils.activateElement(this);
			});
		},

		deactivateAll: function (arr) {
			$(arr).each(function (index) {
				Utils.deactivateElement(this);
			});
		},

		openElement: function (obj) {
			$(obj).addClass(Page._activeclass);
		},

		closeElement: function (obj) {
			$(obj).removeClass(Page._activeclass);
		},

		openAll: function (arr) {
			$(arr).each(function (index) {
				Utils.openElement(this);
			});
		},

		closeAll: function (arr) {
			$(arr).each(function (index) {
				Utils.closeElement(this);
			});
		},

		toggleElement: function ($obj) {
			$obj.toggleClass(Page._activeclass);
		},

		pseudoHover: function (obj) {
			$obj.hover(function () {
				$(this).addClass("hover");
			}, function () {
				$(this).removeClass("hover");
			});
		},

		trim: function (str) {
			return str.replace(/^\s+|\s+$/g, "");
		},

		ltrim: function (str) {
			return str.replace(/^\s+/, "");
		},

		rtrim: function (str) {
			return str.replace(/\s+$/, "");
		},

		trimAll: function (str) {
			return str.replace(/\s+/g, "");
		},

		getQueryString: function (key, _default) {
			if (_default == null) _default = "";
			key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
			var qs = regex.exec(window.location.href);
			if (qs == null) return _default;
			else return qs[1];
		}
	};

	$.JL.Plugins = Plugins = {

		_homeCarouselSelector: '#home-rotator',
		_heroCarouselSelector: '#hero-rotator',
		_slidesId: 'rotator-slides',
		_colorboxSelector: '.colorbox',

		launch: function () {
			var $homecarousel = $(this._homeCarouselSelector);
			if ($homecarousel.length) this.cycleHome($homecarousel);

			var $herocarousel = $(this._heroCarouselSelector);
			if ($herocarousel.length) this.cycleHero($herocarousel);

			var $colorbox = $(this._colorboxSelector + "*");
			if ($colorbox.length) $colorbox.each(this.colorbox);

			var $dropdown = $('select').not('.multiple');
			if ($dropdown.length) {
				(Page._isIE6_7) ? $dropdown.each(this.badIESelect) : $dropdown.each(this.stylishSelect);
			}
		},
		
		cycleHero: function($this){
			var $slides = $this.find('ul > li'),
				noOfSlides = $slides.length;
				
			if (noOfSlides - 1) {
				$this.addClass(Page._loaderClass).children().css("opacity", 0);
				
				var html = '<div id="hero-controls" class="panel span2">';
				html += '<p id="' + Plugins._slidesId + '" />';
				html += '<div id="rotator-nav">';
				html += '<a href="#" class="prev">&lsaquo;</a>';
				html += '<a href="#" class="next">&rsaquo;</a>';
				html += '</div></div>';

				var rotatorControls = $(html).css("opacity", 0).insertBefore("#hero-rotator ul");
				
				$this.children("ul").cycle({
					fx: 'fade',
					speed: 600,
					timeout: 8000,
					next: '#hero-controls .next',
					prev: '#hero-controls .prev',
					pager: '#'+Plugins._slidesId,
					onInit: function(event){
						$(event).css("visibility", "visible").add("#hero-controls").animate({ "opacity": 1 }, Page._loaderInterval, function () {
							if ($this.hasClass(Page._loaderClass)) $this.removeClass(Page._loaderClass);
						});
					}
				});
			} else {$this.addClass("initialized")}
		},
		
		cycleHome: function ($this) {
			var $slides = $this.find('ul > li'),
				noOfSlides = $slides.length;

			if (noOfSlides - 1) {
				$this.addClass(Page._loaderClass).children().css("opacity", 0);

				var html = '<div id="rotator-controls" class="panel span2">';
				html += '<div id="' + Plugins._slidesId + '" />';
				html += '<div id="rotator-nav">';
				html += '<a href="#" class="prev">&lsaquo;</a>';
				html += '<a href="#" class="next">&rsaquo;</a>';
				html += '</div></div>';

				var rotatorControls = $(html).css("opacity", 0).insertAfter($this);
				
				$this.children("ul").cycle({
					fx: 'scrollHorz',
					easeIn: 'easeOutQuad',
					easeOut: 'easeOutQuad',
					speed: 600,
					timeout: 8000,
					next: '#rotator-controls .next',
					prev: '#rotator-controls .prev',
					pager: '#'+Plugins._slidesId,
					onInit: function(event){
						$(event).css("visibility", "visible").add("#rotator-controls").animate({ "opacity": 1 }, Page._loaderInterval, function () {
							if ($this.hasClass(Page._loaderClass)) $this.removeClass(Page._loaderClass);
						});
					}
				});
			} else {$this.addClass("initialized")}
		},
		
		colorbox: function (i) {
			var $this = $(this, i);

			var opts = { opacity: 0.6, overlayClose: false };

			//iFrame
			if ($this.hasClass("iframe")) {
				opts.iframe = true;
				opts.width = "80%"; //DEVNOTE : dev values
				opts.height = "80%"; //DEVNOTE : dev values
			}

			$this.colorbox(opts);
		},

		stylishSelect: function (i) {
			var $this = $(this, i);
			var isAjax = $this.parents("form").hasClass("ajax");
			
			(isAjax) ? $this.sSelect({ ddMaxHeight: "140px" }).change(Plugins.ajaxSubmitFormHandler) : $this.sSelect({ ddMaxHeight: "115px" });
		},

		badIESelect: function (i) {
			var $this = $(this, i);
			var isAjax = $this.parents("form").hasClass("ajax");

			if (isAjax) $this.change(Plugins.ajaxSubmitFormHandler);
		},

		ajaxSubmitFormHandler: function (event) {
			var $target = $(event.target);
			var $form = $target.closest("form");

			if ($form.hasClass("ajax")) {
				var $fields = $form.find("input:checked, select");

				var dataObj = new Object;

				$fields.each(function (i) {
					var $this = $(this, i);
					dataObj[$this.attr("name")] = $this.val();
				});

				$.ajax({
					type: "POST",
					url: "",
					data: dataObj,
					success: function (data) {
						//DO SOMETHING
					}
				});
			}
		}
	};
	
	$.JL.EqualHeight = EqualHeight = {
		
		_selector: ".panel-set",
		
		launch: function(){
			var $eq = $(this._selector);
			if(this._selector.length) $eq.each(this.init);
		},
		
		init: function(i){
			var $this = $(this, i),
				$target = $this.children(".panel"),
				h = 0;
			
			$target.each(function(i){
				var $this = $(this, i);
				
				if($this.height() > h) h = $this.height();
			});
			
			$target.css(Page._isIE6 ? "height" : "min-height", h);
		}
	};
	
	$.JL.Dropdown = Dropdown = {

		_selector: ".drop-down",

		launch: function () {
			var $dropdown = $(this._selector);
			if ($dropdown.length) $dropdown.each(Dropdown.init);
		},

		init: function (i) {
			var $this = $(this, i),
				timer;

			Dropdown.position($this);

			$this.children('li:not(:last)').hover(function (event) {
				var $this = $(this);
				clearTimeout(timer);

				$this.siblings().removeClass("hover").find(".wrapper").css("opacity", 0).hide();

				if ($this.parent().hasClass("focus")) {
					$this.addClass("hover").find(".wrapper").css("opacity", 1).show();
				} else {
					$this.parent().addClass("focus");
					$this.addClass("hover").find(".wrapper").stop().fadeTo(300, 1);
				}

			}, function (event) {
				var $this = $(this);

				timer = setTimeout(function () {
					$this.removeClass("hover").find(".wrapper").stop().fadeTo(200, 0).hide();
					$this.parent().removeClass("focus");
				}, 350)

			});

		},

		position: function ($target) {
			var $nav = $target.closest('.panel'),
				boundary = ($nav.position().top + $nav.height());

			var $subnav = $target.children('li').find(".wrapper");
			$subnav.each(function (i) {
				var $this = $(this, i),
					location = ($this.parent().offset().top + $this.height());

				if (location > boundary) {
					var offset = location - boundary;
					$this.css("top", offset * -1);
				}
			})
		}
	};

	$.JL.Accordion = Accordion = {

		_selector: ".accordion",
		_tabSelector: "dt",
		_contentSelector: "dd",
		_interval: 200,

		launch: function () {
			var $accordion = $(this._selector);
			if ($accordion.length) $accordion.each(function (i) { Accordion.init($accordion.eq(i)) });
		},

		init: function ($target) {
			var $tabs = $target.children(this._tabSelector),
				$contents = $target.children(this._contentSelector);

			$tabs.contents().filter(function () { return this.nodeType == 3; }).wrap('<a href="#" />');

			var $links = $tabs.children('a');

			$links.click(function (event) {
				var $this = $(this);

				$this.parent().toggleClass(Page._selectedclass).next().slideToggle(Accordion._interval);

				return false;
			});
		}
	};

	$.JL.Tabs = Tabs = {

		_selector: ".tabbed-content",
		_tabSelector: "dt",
		_contentSelector: "dd",
		_prevTabClass: "prev-tab",
		_isIE: null,

		launch: function () {
			var $tabs = $(this._selector);
			if ($tabs.length) $tabs.each(function (i) { Tabs.init($tabs.eq(i)) });
		},

		init: function ($target) {
			$target.bind("COMPLETE", this.onCompleteHandler);

			Tabs._isIE = function () { if ($.browser.msie && $.browser.version.substr(0, 1) < 9) { return true; } else { return false; } } ();

			var html = '<p class="' + Page._loaderClass + '">';
			if (!Tabs._isIE) $target.css("opacity", 0).wrap(html);
			else $target.wrap(html);

			var $tabs = $target.children(this._tabSelector),
				$contents = $target.children(this._contentSelector);

			for (var i = $tabs.length; i--; ) $tabs.eq(i).wrapInner('<a href="#"><span /></a>').prependTo($target);

			$target.children("dt:first, dd:first").addClass(Page._selectedclass);

			$tabs.click(function (event) {
				var $this = $(this);

				var index = $tabs.removeClass(Page._selectedclass + " " + Tabs._prevTabClass).index($this);
				$this.addClass(Page._selectedclass).prev().addClass(Tabs._prevTabClass);
				$contents.removeClass(Page._selectedclass).eq(index).addClass(Page._selectedclass);

				return false;
			});

			$target.trigger("COMPLETE");
		},

		onCompleteHandler: function (event) {
			if (!Tabs._isIE) $(event.target).unwrap().animate({ "opacity": 1 }, Page._loaderInterval).unbind("COMPLETE");
			else $(event.target).unwrap().unbind("COMPLETE");
		}
	};

	$.JL.Forms = Forms = {

		_selector: "",
		_prepopulatedInputSelector: ".isLabel",

		launch: function () {
			var $isLabel = $(this._prepopulatedInputSelector + ":text");
			if ($isLabel.length) $isLabel.each(Forms.initLabelInput);

			var $formCarousel = $("#form-carousel"); /*#form-carousel, */
			if ($formCarousel.length) this.initFormNav($formCarousel);

			var $ajaxInput = $('.ajax input');
			if ($ajaxInput.length) $('.ajax input:checkbox, .ajax input:radio').change(Plugins.ajaxSubmitFormHandler);

			Forms.init();
			Forms.formsValidate();

		},

		init: function () {
			$(".ajax:not('#form-carousel') input:radio:checked").each(function (i) { $(this, i)[i].checked = false; });

			$(".ajax:not('#form-carousel') input:radio").change(function () {
				var $this = $(this);
				var group = $this.attr("name");
				$this.closest("form").find("input:radio[name=" + group + "]").parent().removeClass(Page._selectedclass);
				$this.parent().addClass(Page._selectedclass)
			})
		},

		initLabelInput: function (i) {
			var $this = $(this, i);

			$this.data("_prompt", $this.val());

			$this.focus(Forms.labelInputFocusHandler).blur(Forms.labelInputBlurHandler);

			$this.change(function (event) {
				var $this = $(this);
				$this.unbind("focus", Forms.inputFocusHandler);
				$this.unbind("blur", Forms.inputBlurHandler);
			});
		},

		labelInputFocusHandler: function () {
			var $this = $(this);
			$this.attr("value", "");
		},

		labelInputBlurHandler: function () {
			var $this = $(this);
			var msg = $this.data('_prompt');
			if (!$this.val()) $this.attr("value", msg);
		},

		initFormNav: function ($target) {
			var $navbuttons = $target.find(".prev, .next"),
				$viewport = $target.find(".viewport"),
				$carousel = $viewport.children(),
				$items = $carousel.find("input:radio, a");
			
			var bounds = $carousel.outerWidth() - $viewport.outerWidth();

			var $selected = $carousel.find("input:checked, a.selected");
            if($selected.length == 0){
                //$selected = $carousel.find("input[id ='search-newsmedia-category-1'], a.selected");
				$selected = $carousel.find("input");
            }
            this.seekSelected($selected.parent(), bounds);
			
			$items.click(function(){Forms.seekSelected($(this).parent(), bounds);});
			$navbuttons.click(this.formNavHandler);
			/*$target.hover(function(){
				clearTimeout(fntimer)
			},function(){                                   
				if(!$(".viewport ."+Page._activeclass).hasClass(Page._selectedclass)) {
					fntimer = setTimeout(function () {
						Forms.seekSelected($(".viewport ."+Page._selectedclass), bounds);
					}, 1000);
				}
			});*/
		},

        initFormNavV2: function ($target) {
            fntimer = null;
            $viewport = $target.find(".viewport"),
		    $carousel = $viewport.children(),
            $items = $carousel.find("input:radio, a");
			var bounds = $carousel.outerWidth() - $viewport.outerWidth();
			var $selected = $carousel.find("input:checked, a.selected");
			this.seekSelected($selected.parent(), bounds);
			$items.click(function(){Forms.seekSelected($(this).parent(), bounds);});
            $target.hover(function(){
				clearTimeout(fntimer)
			},function(){
				if(!$(".viewport ."+Page._activeclass).hasClass(Page._selectedclass)) {
					fntimer = setTimeout(function () {
						Forms.seekSelected($(".viewport ."+Page._selectedclass), bounds);
					}, 1000);
				}
			});
        },

        seekSelected: function ($this, bounds) {
			var xpos = $this.position().left,
				_duration = 450;
				
			$this.siblings().removeClass(Page._selectedclass+" "+Page._activeclass).end().addClass(Page._selectedclass+" "+Page._activeclass);
			$this.parent().stop().animate({left: ((xpos >= bounds) ? bounds : xpos) * -1 }, _duration, "easeOutQuad");
		},

		formNavHandler: function (event) {
			var $this = $(this),
				_duration = 450,
				dir;

			(event.currentTarget.className == "prev") ? dir = 1 : dir = -1;

			var $currActive = $(".viewport ."+Page._activeclass);

			if (($currActive.index() == 0 && dir == 1) || ($currActive.index() == $currActive.siblings().length && dir == -1)) { }
			else {
				var $active = $currActive.removeClass(Page._activeclass)[dir == 1 ? "prev" : "next"]().addClass(Page._activeclass),
					$carousel = $active.parent();

				var viewport_width = $carousel.parent().outerWidth(),
					carousel_width = $carousel.outerWidth(),
					bounds = carousel_width - viewport_width;

				if ($active.position().left > bounds) {
					if (dir == -1) $carousel.stop().animate({ left: (carousel_width - viewport_width) * dir }, _duration, "easeOutQuad");
				} else {
					$carousel.stop().animate({ left: $active.position().left * -1 }, _duration, "easeOutQuad");
				}
			}
			
			return false;
		},

		formsValidate: function () {
			var $forms = $('.main form.validate');
			$forms.each(function (i) {
				var $this = $(this);
				$('#' + $this.attr("id")).validate();
			});
		}
	};

	$.JL.Sharesfeed = Sharesfeed = {

		_selector: "shares-ticker",
		_stockdata: null,
		_url: "https://apps.shareholder.com/irxml/irxml.aspx",
		_querystring: null,

		launch: function () {
			var $sharesticker = $("#" + this._selector);
			if ($sharesticker.length) this.init();
		},

		init: function () {
			$("#" + Sharesfeed._selector).addClass(Page._loaderClass).children().remove();

			var qs_lon = "?COMPANYID=STANCHAR&PIN=c79a0b4c856fbf1c0426e2093fd74994&FUNCTION=StockQuote&OUTPUT=js2&TICKER=STANCHAR";
			var qs_hk = "?COMPANYID=STANCHAR&PIN=3593e613e26eacbdbc5d71189918acbe&FUNCTION=StockQuote&OUTPUT=js2&TICKER=2888.HK";
			var qs_idr = "?COMPANYID=STANCHAR&PIN=1a4a608598efda417f4f7bd663bc1c8b&FUNCTION=StockQuote&OUTPUT=js2&TICKER=STANBOM";

			this._querystring = [qs_lon, qs_hk, qs_idr];
			Sharesfeed._stockdata = new Array;

			Sharesfeed.fetch(0);
		},

		fetch: function (i) {
			if (i <= (this._querystring.length - 1)) {
				$.getScript(this._url + this._querystring[i], function () {
					if (irxmlstockquote.length) {
						var data = irxmlstockquote[0];
						Sharesfeed._stockdata.push(data);
					}

					i++;
					Sharesfeed.fetch(i);
				});
			} else {
				try {
					if (this._stockdata.length) this.populate()
					else throw "Stock feed failed to load";
				} catch (err) {alert(err);}
			}
		},

		populate: function () {
			var $target = $("#" + this._selector);

			for (var i = (this._stockdata.length - 1); i >= 0; i--) {
				var exchange = function () {
					switch (Sharesfeed._stockdata[i].exchange.toLowerCase()) {
						case "lse": return "London";
						case "hkg": return "Hong Kong";
						case "bom": return "Mumbai";
						default: break;
					}
				} ();

				var html = '<li class="' + [(Sharesfeed._stockdata[i].change < 0) ? 'down' : 'up'] + '">';
				html += exchange;
				html += ' <span>' + Sharesfeed._stockdata[i].lastprice.toFixed(2) + '</span>';
				html += '</li>';

				$target.prepend($(html).css("opacity", 0));
			}

			$target.removeClass(Page._loaderClass).children().animate({ "opacity": 1 }, 250);

			setTimeout(Sharesfeed.init, 1500000) //refresh ever 15 minutes, as per stockholder guidelines
		}
	};

	$.JL.Mapmodule = Mapmodule = {

		_selector: "map-module",
		_regionalListSelector: "regional-list",
		_navArray: new Object,

		init: function () {
			var $mapmodule = $("#" + this._selector);
			if ($mapmodule.length) this.launch($mapmodule);
		},

		launch: function ($target) {
			$target.children().css({ "opacity": 0, "visibility": "visible" });

			this.initNav($target);
			this.initHotspots($target);

			var $countries = $target.find("#map").children(".country");
			var t = (Page._isIE6) ? null : "fast";

			$countries.each(function (i) {
				var $this = $(this, i);

				var $markers = $this.children(".marker").show();
				$markers.siblings().hide();

				var $tooltip = $markers.find("p");
				$tooltip.css("left", (($tooltip.width() / 2) - 5) * -1).parent().css("display", "");
				$markers.hover(function (event) {
					var $this = $(this);
					$this.parent().css("z-index", 99).end().children('p')[Page._isIE6 ? "show" : "fadeIn"](t);
				}, function (event) {
					var $this = $(this);
					$this.parent().css("z-index", Page._isIE6 ? 0 : "auto").end().children('p').hide();
				});

				$markers.find("a").click(Mapmodule.markerClickHandler);

				$this.find("a.back").click(function (event) {
					var $this = $(event.currentTarget);

					var $map = $this.parents("#map");
					$map.stop().animate({ "left": 0 }, 420, "easeOutQuad", function () {
						var $country = $this.parents(".country");
						$country.css("z-index", Page._isIE6 ? 0 : "auto").children(":not('.marker')").hide();
					});

					return false;
				});
			});

			$target.children().animate({ "opacity": 1 }, 800);
		},

		initHotspots: function ($target) {
			var $hotspots = $target.find("map area");

			$hotspots.click(this.hotspotClickHandler);
			$hotspots.hover(this.hotspotMouseHoverHandler, this.hotspotMouseHoverHandler)
		},

		hotspotClickHandler: function (event) {
			var $this = $(this);

			var region = $this.attr("href");
			region = region.toLowerCase().replace("#", "");

			$this.parent().siblings("#map").removeClass(region);
			region = region.replace("hs_", "");

			$(Mapmodule._navArray[region]).trigger("click");

			return false;
		},

		hotspotMouseHoverHandler: function (event) {
			var $this = $(this);

			var region = $this.attr("href");
			region = region.toLowerCase().replace("#", "");

			$this.parent().siblings("#map")[(event.type == "mouseenter") ? "addClass" : "removeClass"](region);
		},

		initNav: function ($target) {
			var $nav = $target.children("#map-nav");
			var $links = $nav.find("a");

			$links.each(function (i) {
				var $this = $(this, i);
				Mapmodule._navArray[Utils.trimAll($this.html().toLowerCase())] = $this;
			});

			$links.click(this.navClickHandler);
		},

		navClickHandler: function (event) {
			var $this = $(event.currentTarget);

			$("#" + Mapmodule._selector + " .country .info").hide();

			var $map = $this.parents("#map-nav").siblings("#map").animate({ "opacity": 0 }, 200, function () {
				$this.parent().addClass(Page._selectedclass).siblings().removeClass(Page._selectedclass);

				var region = Utils.trimAll($this.html().toLowerCase());
				if (region == "worldwide") region = null;
				$map.removeClass().addClass(region).css("left", 0);

				var $list = $("#" + Mapmodule._regionalListSelector);
				$list.children().remove();
				if (region != null) $list.prepend("<h3>" + $this.html() + "</h3><ul>");

				var $activeMarkers = $('.marker').filter(':visible');

				$activeMarkers.each(function (i) {
					var $this = $(this, i);

					var country = $this.next().children('h3').html();
					var listing = '<li><a href="#' + Utils.trimAll(country.toLowerCase()) + '">' + country + '</a></li>';
					var $item = $list.children('ul').append(listing).children(":last-child");
					$item.find("a").click(Mapmodule.markerClickHandler);
				});

				$map.animate({ "opacity": 1 }, 200).children().css("z-index", Page._isIE6 ? 0 : "auto").children(".country:not('.marker')").hide();
			});

			return false;
		},

		markerClickHandler: function (event) {
			var $this = $(event.currentTarget);
			var target = $this.attr("href");
			var indexId = target.indexOf("#");
			target = target.slice(indexId, target.length);

			var $country = $('#map ' + target);
			$country.css("z-index", 99).children(":not('.marker')").show();

			var $map = $this.parents("#map");
			$map.stop().animate({ "left": 550 }, 420, "easeOutQuad");

			return false;
		}
	};

	$.JL.Aux = Aux = {

		_pageUrl: document.URL,
		_pageTitle: document.title,

		init: function () {
			$("a.print").click(function () { window.print(); });
			$("a.bookmark").click(this.bookmarkPage);

			$('#footer .toggle').click(function () {
				$('#footer .panel dd').fadeToggle('1400');
				$('#footer .toggle').toggleClass(Page._selectedclass)
				return false;
			});

			var $quicklinks = $('#site-quicklinks .toggle');
			if ($quicklinks.length) $quicklinks.click(function () {
				$('#site-quicklinks .nav').slideToggle('1400');
				$('#site-quicklinks .toggle').toggleClass(Page._selectedclass)
				return false;
			});

			var $table = $('table:not(.sub table, #map table)');
			if ($table.length) {
				$('tbody tr').hover(function () {
					$(this).addClass(Page._selectedclass);
				}, function () {
					$(this).removeClass(Page._selectedclass);
				});
			}

			var $goback = $('a.back:not(#map-module a.back)');
			if ($goback.length) {
				$goback.click(function (event) {
					window.history.back();
					event.preventDefault();
				});
			}
		},

		checkUserAgent: function () {
			var ua = navigator.userAgent.toLowerCase();
			return { "browser": $.browser, "isMac": (ua.indexOf('mac') != -1) };
		},

		bookmarkPage: function (event) {
			event.preventDefault();

			var ua = Aux.checkUserAgent();

			//Firefox/Mozilla
			if (ua.browser.mozilla && window.sidebar) window.sidebar.addPanel(Aux._pageTitle, Aux._pageUrl, "")

			//ie
			if (ua.browser.msie && document.all) window.external.AddFavorite(Aux._pageUrl, Aux._pageTitle);

			//Opera
			if (ua.browser.opera && window.opera) {
				var el = document.createElement('a');
				el.setAttribute('href', Aux._pageUrl);
				el.setAttribute('title', Aux._pageTitle);
				el.setAttribute('rel', 'sidebar');
				el.click();
			};

			//Webkit - Note: Webkit will not permit this action(security restriction)
			if (ua.browser.webkit) alert('You need to press ' + [ua.isMac ? 'Command/Cmd' : 'CTRL'] + ' + D to bookmark our site.');
		},

		pseudoHover: function ($el) {
			$el.hover(function () {
				$(this).addClass("hover");
			}, function () {
				$(this).removeClass("hover");
			})
		}
	};

	Page.init();
});