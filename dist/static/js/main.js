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
});