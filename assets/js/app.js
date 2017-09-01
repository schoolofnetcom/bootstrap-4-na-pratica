(function($) {

	const funFactsCounter = function($this) {
		var currentElement = parseInt($this.html(), 10)
		currentElement = currentElement + 1

		$this.html(currentElement++)

		if (currentElement > $this.data('count')) {
			$this.html($this.data('count'))
		} else {
			setTimeout(function() {
				funFactsCounter($this)
			}, 45)
		}
	}

	var waypoint = new Waypoint({
		element: document.getElementById('counter'),
		handler: function() {
			$('.funfacts-counter').each(function() {
				$(this).data('count', parseInt($(this).html(), 10))
				$(this).html('0')
				funFactsCounter($(this))
			})
		}
	})
})(jQuery)