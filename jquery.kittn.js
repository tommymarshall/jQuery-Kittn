/**
 * @name jQuery Kittn
 * @author Tommy Marshall
 * @version 1.0
 *	$('[data-kittn="true"]').kittn({
 *		clipboardPath: "ZeroClipboard.swf",
 *		language: "html",
 *		showClipboard: true,
 *		style: "outline: 3px dotted rgba(0,0,0,0.4)",
 *		theme: "emacs"
 *	});
 */

;(function($, window, document, undefined){

	var Kittn = function(elem, options, selector) {
		this.selector = selector;
		this.options = options;
		this.$elem = $(elem);
		this.$doc = $(document);
		this.$body = $('body');
		this.init();
	};

	Kittn.prototype = {
		defaults: {
			clipboardPath: "ZeroClipboard.swf",
			language: "html",
			showClipboard: true,
			style: "outline: 3px dotted rgba(0,0,0,0.4)",
			theme: "emacs"
		},

		init: function() {
			this.setVars();
			this.setBinds();
		},

		setVars: function() {
			this.config = $.extend({}, this.defaults, this.options);
			this.setCodeSnippet();
			this.codeSnippetCoords = this.$elem.offset();
		},

		setBinds: function() {
			this.$body.on('keyup keydown', this.toggleSnippet.bind(this));
		},

		toggleSnippet: function(e) {
			var toggleKit = e.altKey;

			if (toggleKit) {
				this.$elem.attr('style', this.config.style);
				this.$elem.on('click', this.displaySnippet.bind(this));
			} else {
				this.$elem.removeAttr('style');
				this.$elem.off('click');
			}
		},

		setCodeSnippet: function() {
			this.codeSnippet = this.$elem.context.outerHTML;
			this.convertTags();
			this.removeSelectorText();
			this.removeCustomCSS();
		},

		positionCodeWrapper: function($wrapper) {
			$wrapper.css({
				'position': 'absolute',
				'top': this.codeSnippetCoords.top
			}).css({ // Chained to get width after assigning the above css
				'left': this.codeSnippetCoords.left + (this.$elem.width() / 2) - ($wrapper.width() / 2)
			});

			var widerThanPage = this.codeSnippetCoords.left + $wrapper.width() > this.$doc.width();
			if (widerThanPage) {
				$wrapper.css({
					'left': 'auto',
					'right': this.$elem.width() / 2
				});
			}

		},

		displaySnippet: function(e) {
			e.preventDefault();
			e.stopPropagation();

			var $code = $('<pre class="language-' + this.config.language + '">' + this.codeSnippet + '</pre>');
			var $wrapper = $('<div class="kittn-code-overlay" />').wrapInner($code);

			this.$body.append($wrapper);
			this.positionCodeWrapper($wrapper);

			if (this.config.showClipboard) {
				$code.snippet(
					this.config.language,
					{
						style: this.config.theme,
						clipboard: this.config.clipboardPath
					}
				);
			}

			$('*:not(' + this.selector + ')').on('click', this.hideSnippet.bind(this));
		},

		hideSnippet: function(e){
			e.preventDefault();
			e.stopPropagation();

			var $this = $(this);
			var snippetIsToggled = $this.parents('.kittn-code-overlay').length < 1 && !$this.hasClass('kittn-code-overlay');

			snippetIsToggled && $('.kittn-code-overlay').remove();

			$('*:not(' + this.selector + ')').off('click');
		},

		removeSelectorText: function() {
			this.codeSnippet = this.replaceStringInCodeSnippet(' ' + this.selector.replace(/[\[\]']+/g,''), '');
		},

		removeCustomCSS: function(){
			this.codeSnippet = this.replaceStringInCodeSnippet(' style="' + this.config.style + '"', '');
		},

		replaceStringInCodeSnippet: function(find, sub) {
			return this.codeSnippet.split(find).join(sub);
		},

		convertTags: function() {
			this.codeSnippet = this.codeSnippet.replace(/<|>/ig,function(m){return '&'+(m=='>'?'g':'l')+'t;';});
		}
	};

	Kittn.defaults = Kittn.prototype.defaults;

	$.fn.kittn = function(options) {
		var selector = this.selector;
		return this.each(function() {
			new Kittn(this, options, selector);
		});
	};

})(jQuery, window , document);
