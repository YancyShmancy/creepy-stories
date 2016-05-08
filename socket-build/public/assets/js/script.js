$(function() {

	var blurredElements = $('.slide.current').addClass('blur');

	var socket = io();

	// Variable initialization

	var form = $('form.login'),
		secretTextBox = form.find('input[type=text]');

	var key = "", animationTimeout;


	// When the page is loaded it asks you for a key and sends it to the server

	form.submit(function(e){

		e.preventDefault();

		key = secretTextBox.val().trim();

		// If there is a key, send it to the server-side
		// through the socket.io channel with a 'load' event.

		if(key.length) {
			socket.emit('load', {
				key: key
			});
		}

	});

	// The server will either grant or deny access, depending on the secret key

	socket.on('access', function(data){

		// Check if we have "granted" access.
		// If we do, we can continue with the presentation.

		if(data.access === "granted") {

			// Unblur everything
			blurredElements.removeClass('blurred');

			form.hide();

			var ignore = false;

			$('a.next-slide').on('click', function(){

				// Notify other clients that we have navigated to a new slide
				// by sending the "slide-changed" message to socket.io

				if(ignore){
					return;
				}

				newSlide = $('.current').next();

				socket.emit('slide-changed', {
					newSlide: newSlide,
					key: key
				});
			});
            
            $('a.previous-slide').on('click', function(){

				// Notify other clients that we have navigated to a new slide
				// by sending the "slide-changed" message to socket.io

				if(ignore){
					return;
				}

				newSlide = $('.current').prev();

				socket.emit('slide-changed', {
					newSlide: newSlide,
					key: key
				});
			});

			socket.on('navigate', function(data){
	
				// Another device has changed its slide. Change it in this browser, too:

				nextSlide = data.newSlide;
                fadeOut();

				ignore = true;

				setInterval(function () {
					ignore = false;
				},100);

			});

		}
		else {

			// Wrong secret key

			clearTimeout(animationTimeout);

			// Addding the "animation" class triggers the CSS keyframe
			// animation that shakes the text input.

			secretTextBox.addClass('denied animation');
			
			animationTimeout = setTimeout(function(){
				secretTextBox.removeClass('animation');
			}, 1000);

			form.show();
		}

	});

});