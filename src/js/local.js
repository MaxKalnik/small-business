$(document).ready(function () {
    var body = $('body');

    function topMenu() {
        if ($(window).width() < 959) {

            body.on('click', '.top-menu__link.active', function () {
                $(this).parents('.top-menu__wrap').toggleClass('open');
                return false
            });
        }
    };

    topMenu();
    $(window).on('resize', function () {
        topMenu();
    });

    body.on('click', '.ranking-table__hint', function () {
        $(this).css('display', 'none');
    });

    body.on('click', '.table-sort', function () {
        var $rows = $('.ranking-table--data tr').splice(1);
        var $index = $(this).data('index');

        var descend = true;

        if ($(this).hasClass('table-sort--down')) {
            $('.table-sort').removeClass('table-sort--down table-sort--top');
            descend = false;
            $(this).addClass('table-sort--top')
        } else {
            $('.table-sort').removeClass('table-sort--down table-sort--top');
            $(this).addClass('table-sort--down');
        }

        var parseFloatText = function (item) {
            return parseFloat(item);
        };

        var sortFunc = function (a, b) {
            var left = $(a).find('td')[$index];
            left = $(left).text();
            if (parseFloatText(left)) {
                left = parseFloatText(left);
            } else if (left.includes('$')) {
                left = parseFloatText(left.split('$')[1]);
            }
            var right = $(b).find('td')[$index];
            right = $(right).text();
            if (parseFloatText(right)) {
                right = parseFloatText(right);
            } else if (right.includes('$')) {
                right = parseFloatText(right.split('$')[1]);
            }
            if (descend) {
                if (left > right) {
                    return 1
                } else {
                    return -1;
                }

            } else {
                if (left < right) {
                    return 1
                } else {
                    return -1;
                }
            }
        }

        $rows.sort(sortFunc);

        var $mobileRows = $('.ranking-table--fixed tr').splice(1);
        for (var i = 0; i < $mobileRows.length; i++) {
            $($mobileRows[i]).find('td').first().text($($rows[i]).find('td').first().text());
        }
        $('.ranking-table--data tbody').html($rows);
    });

    body.on('click', '.map__btn', function (event) {
        event.preventDefault();
        if ($(this).siblings('.map__btn-container').hasClass('visible')) {
            $(this).siblings('.map__btn-container').removeClass('visible');
        }
        else {
            $('.map__btn-container').removeClass('visible');
            $(this).siblings('.map__btn-container').addClass('visible');
        }
    });

    body.mouseup(function(event) {
        if ($('.map__btn-wrapper').has(event.target).length === 0) {
            $('.map__btn-container').removeClass('visible');
        }
    });

    body.on('focus', '#copyTarget', function(event){
        $(this).select();
    });

    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    };

    body.on('click', '#copyButton', function() {
        copyToClipboard($('#copyTarget'));
    });
    body.on('click', '.btn-go-back', function() {
        $('.ranking-table__container').css('height', 'auto');
        $('.btn-container--show-full').hide();
    });
});
