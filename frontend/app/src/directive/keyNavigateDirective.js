/**
 * Created by apium on 9/16/16.
 */
define(function(require) {
	'use strict';

	function KeyNavigateDirective() {
		return function(scope, element, attrs) {
			element.bind('keydown keypress', function(event) {
				if (event.which === 38) {
					var target = $(event.target).prev();
					$(target).trigger('focus');
				}
				if (event.which === 40) {
					var target = $(event.target).next();
					$(target).trigger('focus');
				}
			});
		};
	}

	KeyNavigateDirective.$inject = [];

	return KeyNavigateDirective;
});
