$(document).ready(initialize)

function initialize() {
    //navbar-toggler
    $('.navbar-toggler').click(function() {
        $('.navbar-toggler').toggleClass('change');
    })
    //adding background and fixed
    $(window).scroll(function() {
        let position = $(this).scrollTop();
        if(position >= 149) {
            $('.navbar').addClass('navbar-background');
            $('.navbar').addClass('fixed-top');
        } else {
            $('.navbar').removeClass('navbar-background');
            $('.navbar').removeClass('fixed-top');
        }
    })
    //smooth scroll

    $('.nav-item a').click(function(event){
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
}

var bg = $(".item-1, .item-2, .item-3, .current-project-photo .height-80");

function resizeBackground() {
	console.log($(window).height() + 60);
	bg.height( $(window).height() + 60);
	console.log('it worked');
}

$(window).resize(resizeBackground);
resizeBackground();