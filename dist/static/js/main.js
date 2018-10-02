$(function() {
  // SVG sprite polyfill
  svg4everybody();

  // Selects
  $('.js-select-dotted').select2({
    theme: 'dotted',
    minimumResultsForSearch: -1,
    width: '100%'
  });

  $('.js-select').select2({
    theme: 'default',
    minimumResultsForSearch: -1,
    width: '100%'
  });

  // Number input
  $('<button type="button" class="btn qnt-button qnt-button--down"><span class="sr-only">&minus;</span></button><button type="button" class="btn qnt-button qnt-button--up"><span class="sr-only">&plus;</span></button>').appendTo('.qnt-widget');

  $('.qnt-widget').each(function() {
    var $input = $(this).find('input[type="number"]'),
        $btn = $(this).find('.qnt-button'),
        $btnUp = $btn.filter('.qnt-button--up'),
        $btnDown = $btn.filter('.qnt-button--down'),
        min = $input.attr('min'),
        max = $input.attr('max'),
        oldVal = parseFloat($input.val()),
        newVal;

    $btnUp.attr('disabled', oldVal == max);
    $btnDown.attr('disabled', oldVal == min);

    $btn.click(function() {
      oldVal = parseFloat($input.val());
      if ($(this).hasClass('qnt-button--up')) {
        newVal = oldVal < max ? oldVal + 1 : oldVal;
      } else if ($(this).hasClass('qnt-button--down')) {
        newVal = oldVal > min ? oldVal - 1 : oldVal;
      }
      $btnUp.attr('disabled', newVal == max);
      $btnDown.attr('disabled', newVal == min);
      $input.val(newVal).trigger('change');
    });
  });
  
  // Categories list
  categoriesShow();

  $('.categories-links__trigger').click(function(e) {
    categoriesExpand(e, this);
  });

  // Filling select
  if ( $(window).width() >= 576 ) {
    startFillingCarousel();
  }

  // Product photos
  $('.product-photo-slider').owlCarousel({
    items: 1,
    nav: false,
    dots: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
  });

  // Product ingredients
  $('.js-ingredients-tooltip').click(function(e) {
    e.preventDefault();
  });

  $('.js-ingredients-tooltip').tooltip({
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'
  });
});

$(window).on('resize', function() {
  if ( $(window).width() >= 576 ) {
    startFillingCarousel();
  } else {
    stopFillingCarousel();
  }
});

function categoriesShow() {
  var $container = $('.categories-links'),
      $trigger = $container.children('.categories-links__trigger'),
      $links = $container.children('.categories-links__link'),
      linksWidth = 0,
      i = 0;

  while (i < $links.length) {
    linksWidth += parseInt($links.eq(i).width(), 10) + 30;
    $links.eq(i).removeClass('is-hidden');
    i++;

    if (linksWidth > $container.width() - $trigger.width() - 30) {
      console.log(linksWidth);
      return false;
    }
  }
}

function categoriesExpand(event, trigger) {
  var $trigger = $(trigger),
      $links = $trigger.siblings('.categories-links__link');

  event.preventDefault();
  $links.removeClass('is-hidden');
  $trigger.addClass('is-hidden');
}

function startFillingCarousel() {
  $('.filling-select').addClass('owl-carousel').owlCarousel({
    items: 3,
    nav: true,
    navText: ['<svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m5.53033.46967c.29289.292893.29289.76777 0 1.06066l-3.46967 3.46967 3.46967 3.46967c.29289.29289.29289.76777 0 1.06066s-.76777.29289-1.06066 0l-4-4c-.292893-.29289-.292893-.76777 0-1.06066l4-4c.29289-.292893.76777-.292893 1.06066 0z" fill="#ff8c76" fill-rule="evenodd"/></svg>', '<svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m.46967.46967c-.292893.292893-.292893.76777 0 1.06066l3.46967 3.46967-3.46967 3.46967c-.292893.29289-.292893.76777 0 1.06066.292894.29289.76777.29289 1.06066 0l4-4c.29289-.29289.29289-.76777 0-1.06066l-4-4c-.29289-.292893-.767767-.292893-1.06066 0z" fill="#ff8c76" fill-rule="evenodd"/></svg>'],
    dots: false,
    margin: 20,
    slideBy: 3,
    smartSpeed: 150,
    onInitialized: function(event) {
      var $target = $(event.target);
      $target.find('.owl-next').before('<span class="owl-count"><span class="owl-current"></span>/<span class="owl-total"></span></span>');
      $target.find('.owl-current').text(Math.floor((event.item.index + 1) / event.page.size) + 1);
      $target.find('.owl-total').text(Math.floor(event.item.count / event.page.size));
    },
    onChanged: function(event) {
      var $target = $(event.target);
      $target.find('.owl-current').text(Math.floor((event.item.index + 1) / event.page.size) + 1);
    },
  });
}

function stopFillingCarousel() {
  var owl = $('.filling-select');
  owl.trigger('destroy.owl.carousel');
  owl.removeClass('owl-carousel');
}