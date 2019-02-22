/*------------------------------------*\
    #PRIMARY NAVIGATION
\*------------------------------------*/
/**
 * Toggles active class on the primary nav item
 * 1) Select all nav dropdown triggers and cycle through them
 * 2) On click, find the nav dropdown trigger parent
 * 3) If the nav dropdown trigger parent already has active class, remove it.
 * 4) If the nav dropdown trigger parent does not have an active class, add it.
 */
(function(){

	/**
	 * Toggles active class on the primary nav panel
	 * 1) Select all nav triggers and cycle through them
	 * 2) On click, find the nav panel within the header
	 * 3) If the navTarget already has active class, remove it on click.
	 * 4) If the navTarget does not have an active class, add it on click.
	 */
	if (document.querySelector('.js-nav-target')) {
		var navToggle = document.querySelector('.js-nav-trigger');/* 1 */
		var navTarget = document.querySelector('.js-nav-target'); /* 2 */
		var navHeader = navTarget.parentNode.parentNode.parentNode;

		navToggle.addEventListener('click',function(event){ /* 2 */
			event.preventDefault();

			if (navTarget.classList.contains('is-active')) { /* 3 */
				navTarget.classList.remove('is-active');
				navHeader.classList.remove('is-active');
			}
			else { /* 4 */
				navTarget.classList.add('is-active');
				navHeader.classList.add('is-active');
			}
		});
	}

})();
