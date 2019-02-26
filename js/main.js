(function($){
  'use strict';
    $(window).on('load', function () {

            $(".pre-loader").fadeOut("slow");
        })
    })
(jQuery)

$(document).ready(initialize)

function initialize() {

	//download resume
	$('#get-resume').click(function() {
		window.location.href= "documents/james_park_resume.docx";
	})

	//write message to send message modal
	$('#send-msg-button').click(function() {
		let name = '';
		let phone_number = '';
		let email_address = '';
		let message = '';

		const send_msg_errors = [];
		if($('#send-msg-name').val() === '') {
			send_msg_errors.push('Please enter your name');
		} else {
			name = $('#send-msg-name').val();
		}

		if($('#send-msg-email').val() ==='') {
			send_msg_errors.push('Please enter your email address');
		} else {
			email_address = $('#send-msg-email').val();
			const regexp = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/;
			if(!regexp.test(email_address)) {
				send_msg_errors.push('Please enter a valid Email Address');
			}
		}

		if($('#send-msg-message').val() === '') {
			send_msg_errors.push('Please enter a message');
		}

		$('.sendMsg_body').empty();
		if(send_msg_errors.length === 0) {
			sendEmail();
		} else {
			const error_list = $('<ul>').addClass('mb-0');
			send_msg_errors.forEach(function(error) {
				const error_item = $('<li>').text(error);
				error_list.append(error_item);
			});
			$('.sendMsg_body').append(error_list);
			$('#sendMsgModal').modal('show');
		}
	})

	//write message to review modal
	$('.review-btn').click(function(){
		const id = $(this).data('id');
		let name = '';
		let text = '';

		switch(id) {
			case 'esmali':
				name = 'Kuroash Esmali';
				text = `A great source for help early on at LearningFuze was James Park. Whether it was just a second set of eyes on a problem or trying to devise a way to randomize contents of an array, he was eager to offer his experience from working in the industry. He has a child-like curiosity and enthusiasm for coding which allowed him to devise some unique approaches to UX/UI that blew a lot of us away. I had the chance to work alongside James on a hackathon and he's someone I'd want on my team in crunch-time.`;
				break;
			case 'capobianco':
				name = 'Michael Capobianco';
				text =`I had the privilege to work with James at Learning Fuze for our second Hackathon. James showed great determination to provide both visually pleasing applications coupled with great functionality that will surely please any user. While working with James, he demonstrated great leadership by his communication with the rest of the team to meet a common goal all while showing he is not afraid to take a challenge head on and make it his own. Overall James is a great team player and a joy to work with.`;
				break;
			case 'bae':
				name = 'Cy Bae';
				text = `James is an eager student when it comes to technology. He has a genuine passion for learning and the motivation to try those things on his own. It motivates the people around him to try harder and he is very helpful in creating that passionate environment. I'm confident that James will produce great results with his unique mind.`;
				break;
			case 'quirante':
				name = 'Justin Quirante';
				text = `I had the honor of working with James throughout the four months I spent at LearningFuze. James is an extremely intelligent and talented developer. His drive and work ethic combined with his technical abilities allow him to effective on any project he's on. James has always shown an openness and curiosity for learning, and I am excited to see what he'll be able to accomplish in his career.`;
				break;
			case 'brownfield':
				name = 'Erick Brownfield';
				text = `I met James during our time together at LearningFuze. Throughout the program, he consistently demonstrated incredible focus and work ethic. Combined with his creativity and attention to detail, he created some truly special projects that amazed fellow students. Contrasting his work, James was always smiling, quick to laugh, and open to talk. I know he will be a great asset wherever he goes.`;
				break;
			default:
				name = '';
				text = '';
		}

		$('.review_header h5').text(name);
		$('.review_body p').text(text);

	})

    //navbar-toggler
    $('.navbar-toggler').click(function() {
        $('.navbar-toggler').toggleClass('change');
    })
    // //adding background and fixed
    // $(window).scroll(function() {
    //     let position = $(this).scrollTop();
    //     if(position >= 149) {
    //         $('.navbar').addClass('navbar-background');
    //         $('.navbar').addClass('fixed-top');
    //     } else {
    //         $('.navbar').removeClass('navbar-background');
    //         $('.navbar').removeClass('fixed-top');
    //     }
		// })
		

    // //smooth scroll
    $('.nav-item a, .home-btn, #section-icon').click(function(event){
        event.preventDefault()
        let target = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop:$(target).offset().top
        },1500)
    })

    //init Isotope
    let $grid = $('.grid').isotope({
        //options
    });
    //filter items on button click
    $('.filter-button-group').on('click', 'button', function() {
        let filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
    });

    //load images first to begin isotope filtering
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
			});
			
		//filter items on button click
			// var bg = $(".item-1, .item-2, .item-3, .current-project-photo .height-80");

			// function resizeBackground() {
			// 	bg.height(window.outerHeight);
			// 	// bg.css('display', 'none');
			// }
			
			// $(window).resize(resizeBackground);
			// resizeBackground();

			// var orientationChange = function () {
			// 	var $element = $('.item-1, .item-2, .item-3');
			// 	$element.css('height', '90vh'); // Change this to your own original vh value.
			// 	$element.css('height', $element.height() + 'px');
			// };
			
			// var s = screen;
			// var o = s.orientation || s.msOrientation || s.mozOrientation;
			// o.addEventListener('change', function () {
			// 	setTimeout(function () {
			// 		orientationChange();
			// 	}, 250);
			// }, false);
			// orientationChange();

}

function sendEmail() {

	//send email
	$('#send-msg-button').hide();
	$('#waiting').show();


	$.ajax({
		url: 'http://localhost:4444/sendemail',
		data: {
			contactname: $('input[name=contact_name]').val(),
			contactemail: $('input[name=contact_email]').val(),
			contactmessage: $('textarea[name=contact_message]').val()
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.readyState == 4) {
					console.log('HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)');
			}
			else if (XMLHttpRequest.readyState == 0) {
					console.log('Network error (i.e. connection refused, access denied due to CORS, etc.)');
			}
			else {
					console.log('Unidentified error');
			}
	}
	}).then(function(response) {
		if(response==='success') {
			const success_message = $('<p>').addClass('mb-0').text(`Your message has been submitted`);
			$('.sendMsg_body').append(success_message);
			$('#send-msg-name').val('');
			$('#send-msg-phone-number').val('');
			$('#send-msg-email').val('');
			$('#send-msg-message').val('');

			$('#sendMsgModal').modal('show');
			$('#send-msg-button').show();
			$('#waiting').hide();
		} else {
			const error_message = $('<p>').addClass('mb-0').text(`Something went wrong. Please email me at jpark1219dev@gmail.com`);
			$('.sendMsg_body').append(error_message);
			$('#sendMsgModal').modal('show');
			$('#send-msg-button').show();
			$('#waiting').hide();
		}
	})
}