$(document).ready(function(){

// burger
$('.burger').on("click", function() {
  $(this).toggleClass('_active');
  $('.menu').toggleClass('_active');
  $('body').toggleClass('body-fixed');

});

$('.menu__list').on("click", function() {
    $('.menu').removeClass('_active');
      $('body').removeClass('body-fixed');
        $('.burger').removeClass('_active');


})


//  slick-sliders

  $('.reviews__slider').slick({
    infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
  dots: true,
  dotsClass: 'slick__dots',
   responsive: [
    {
      breakpoint: 768, 
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  
  });


  $('.techniques__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  responsive: [
    {
      breakpoint: 1000, 
      settings: {
        dots: true,
        dotsClass: 'slick__dots',
        
      }
    }
  ]
});
$('.techniques__thumbnail-slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.techniques__slider',
  dots: false,
  focusOnSelect: true,
  variableWidth: true
});
  

// scroll to anchors
$("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });



// scroll-up

$(window).scroll(function() {
 
if($(this).scrollTop() != 0) {
 
$('.btn--up').fadeIn();
 
} else {
 
$('.btn--up').fadeOut();
 
}
 });


 $('.btn--up').on("click", function() {  
    $('body,html').animate({scrollTop:0}, 500);  
    return false;  
  });






	$('.tabs-wrapper').each(function() {
	let ths = $(this);
	ths.find('.tab-item').not(':first').hide();
	ths.find('.tab').click(function() {
		ths.find('.tab').removeClass('_active').eq($(this).index()).addClass('_active');
		ths.find('.tab-item').hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass('_active');
});
});