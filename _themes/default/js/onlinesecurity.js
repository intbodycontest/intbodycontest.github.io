(function($) {
	/* ===================================================================================
		Global vars here
	=================================================================================== */
	var slideshowData = [{
		title: 'Secure your mobile',
		desc: 'If you use your mobile phone to bank with us, find out what you can do to protect your information.'
	}, {
		title: 'Protect your world',
		desc: 'Scammers move fast. Read the latest online threats to stay one step ahead.'
	}, {
		title: 'Online Banking',
		desc: 'Get complete control of your accounts and safely manage your finances anytime, anywhere.'
	}];

	/* ===================================================================================
		Custom components here
	=================================================================================== */
	
	// Slideshow component for main page
	$.fn.slideshow = function(callback, options) {

		if (callback !== undefined && (typeof callback != 'object' && typeof callback != 'array')) 
			return $.fn.slideshow[callback](this, options);

		// Main initialization
		return this.each(function() {

			var $this = $(this);
			
			var $ul = $this.find('ul');
			$ul.find('li').each(function(idx, ele) {
				
				$(ele).find('a').click(function(e) {
					e.preventDefault();
					$.fn.slideshow.goto($this, $ul.find('li').index($(e.currentTarget).parent()));
				});
			});

			$this.find('.left-arrow-btn').click(function(e) {
				e.preventDefault();
				$.fn.slideshow.prev($this);
			});

			$this.find('.right-arrow-btn').click(function(e) {
				e.preventDefault();
				$.fn.slideshow.next($this);
			});

			$.fn.slideshow.reset($this);
		});
	};

	$.fn.slideshow.reset = function($this) {

		$.data($this[0], 'prevIdx', 0);
		$.data($this[0], 'currentIdx', 0);
		$.data($this[0], 'maxIdx', 3);

		var currentIdx = $.data($this[0], 'currentIdx');
		
		$this.find('.cont').find('img:eq(' + currentIdx + ')').show();
		$this.find('.buttons').find('a:eq(' + currentIdx + ')').show();
		$this.find('ul').find('li:eq(' + currentIdx + ')').find('a').addClass('selected');

		$this.find('p.title').text(slideshowData[0].title);
		$this.find('p.desc').text(slideshowData[0].desc);
	};

	$.fn.slideshow.prev = function($this) {

		var currentIdx = Number($.data($this[0], 'currentIdx'));
		var maxIdx = Number($.data($this[0], 'maxIdx'));

		currentIdx--;
		if (currentIdx < 0) currentIdx = maxIdx - 1;

		$.data($this[0], 'prevIdx', $.data($this[0], 'currentIdx'));
		$.data($this[0], 'currentIdx', currentIdx);
		
		return $.fn.slideshow.goto($this);
	};

	$.fn.slideshow.next = function($this) {

		var currentIdx = Number($.data($this[0], 'currentIdx'));
		var maxIdx = Number($.data($this[0], 'maxIdx'));

		currentIdx++;
		if (currentIdx >= maxIdx) currentIdx = 0;

		$.data($this[0], 'prevIdx', $.data($this[0], 'currentIdx'));
		$.data($this[0], 'currentIdx', currentIdx);

		return $.fn.slideshow.goto($this);
	};

	$.fn.slideshow.goto = function($this, idx) {

		if (idx != undefined) {
			$.data($this[0], 'prevIdx', $.data($this[0], 'currentIdx'));
			$.data($this[0], 'currentIdx', idx);
		}

		var prevIdx = $.data($this[0], 'prevIdx'); 
		var currentIdx = $.data($this[0], 'currentIdx');

		$this.find('.cont').find('img:eq(' + prevIdx + ')').fadeOut();
		$this.find('.cont').find('img:eq(' + currentIdx + ')').fadeIn();
		$this.find('.buttons').find('a:eq(' + prevIdx + ')').fadeOut();
		$this.find('.buttons').find('a:eq(' + currentIdx + ')').fadeIn();
		$this.find('ul').find('li:eq(' + prevIdx + ')').find('a').removeClass('selected');
		$this.find('ul').find('li:eq(' + currentIdx + ')').find('a').addClass('selected');

		/*
		$this.find('p.title').fadeOut('slow', function() {
			$(this).text(slideshowData[currentIdx].title).fadeIn();
		});
		$this.find('p.desc').fadeOut('slow', function() {
			$(this).text(slideshowData[currentIdx].desc).fadeIn();
		});
		*/

		//$this.find('p.title').clearQueue().hide().text(slideshowData[currentIdx].title).fadeIn();
		//$this.find('p.desc').clearQueue().hide().text(slideshowData[currentIdx].desc).fadeIn();

		$this.find('p.title').hide().text(slideshowData[currentIdx].title).fadeIn();
		$this.find('p.desc').hide().text(slideshowData[currentIdx].desc).fadeIn();

		return $this;
	};

	// Tabbed contents component
	$.fn.tabbedContents = function(callback, options) {

		if (callback !== undefined && (typeof callback != 'object' && typeof callback != 'array')) 
			return $.fn.tabbedContents[callback](this, options);

		// Main initialization
		return this.each(function() {

			var $this = $(this);
			$.data($this[0], 'options', callback);

			var $ul = $this.find('ul.tabs');

			var tWidth = 0;

			// Format tabs
			$ul.find('li').each(function(idx, ele) {

				var $a = $(ele).find('a');
				$a.before('<div class="left"></div>');
				$a.after('<div class="right"></div>');

				// Assign click listeners
				$a.click(function(e) {
					e.preventDefault();

					if (!$(e.currentTarget).parent().hasClass('selected')) {

						//$ul.find('li').removeClass('selected');
						//$(e.currentTarget).parent().addClass('selected');

						$.fn.tabbedContents.show($this, $(e.currentTarget).attr('href'));
					}

				});

				tWidth += $(ele).width();
			});

			var tabSpacing = Math.floor(($ul.width() - tWidth) / ($ul.find('li').size() + 1));
			$ul.find('li').each(function(idx, ele) {
				$(ele).css('margin-left', tabSpacing + 'px');
			});

			$.fn.tabbedContents.show($this, callback.defaultTab);
		});
	};

	$.fn.tabbedContents.show = function($this, tab) {

		$this.find('.tab-content').hide();
		$(tab).show();
		
		//var h = $(tab).height();
		//$(tab).clearQueue().css('overflow', 'hidden').css('height', '100px').fadeIn().animate({ height: h });

		var $ul = $this.find('ul.tabs');
		$ul.find('li').removeClass('selected');
		$ul.find('a[href="' + tab + '"]').parent().addClass('selected');

		return $this;
	};

	/* ===================================================================================
		Document initialization here
	=================================================================================== */
	$(document).ready(function() {

		$('#img-slideshow').slideshow();
		$('#tabbed-contents-1').tabbedContents({ defaultTab: '#firewalls' });
		$('#tabbed-contents-2').tabbedContents({ defaultTab: '#advanced-monitoring' });
		$('#tabbed-contents-3').tabbedContents({ defaultTab: '#secure-tech' });
	});

})(jQuery);