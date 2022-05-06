$(document).ready(function() {
    $('.nav').click(function(e) {
        e.preventDefault();
        $('.nav').removeClass('nav--active');
        $('.hero').removeClass('hero--active');

        $(this).addClass('nav--active');
        $($(this).attr('href')).addClass('hero--active');
    });

    $('.nav:first').click();

});