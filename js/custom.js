$(document).ready(function(){

    var lastId,
        topMenu = $("header"),
        topMenuHeight = 71,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

/*===================
 //FIXED MENU
 ===================*/

    $(window).on("scroll touchmove", function () {
        $('header').toggleClass('tiny', $(document).scrollTop() > 50);
    });

    /*===================
     //SCROLL AND TARGET
     ===================*/

    $('.menu a[href*=#]').bind('touchstart click', function(e) {
        var target = $(this).attr("href");

        var targetTopOffset = $(target).offset().top;
        if(Math.round(targetTopOffset) ==  $(document).scrollTop()) {return false;}

        var x = targetTopOffset - topMenuHeight;
        $('html, body').stop().animate({ scrollTop: x}, 400);
        $('.navbar-toggle:visible').click();

        e.preventDefault();
        return false;
    });

    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 2;

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }
    });


/*===================
//CAROUSEL
===================*/

    $('.carousel').carousel({
        interval: false
    });

    $(window).resize(function(){
        background();
    });
    background();

    function background(){
        $("*[data-bg-width]").each(function(){
            var w = $(this).data('bg-width');
            var wts = $(this).data('bg-width-to-show');
            var contain = $(this).find('.container').innerWidth();
            var size = w * (contain / wts);
            $(this).css('background-size',   size + 'px auto');
        });
    }

        $("#myCarousel").swiperight(function() {
            $(this).carousel('prev');
        });
        $("#myCarousel").swipeleft(function() {
            $(this).carousel('next');
        });

        $("#myCarousel1").swiperight(function() {
            $(this).carousel('prev');
        });
        $("#myCarousel1").swipeleft(function() {
            $(this).carousel('next');
        });

/*===================
//COUNTER
===================*/
    var time = 2;
    var cc = 1;
    $(window).scroll(function(){
        $('#counter').each(function(){
            var
                cPos = $(this).offset().top,
                topWindow = $(window).scrollTop();
            if(cPos < topWindow + 400) {
                if (cc < 2) {
                    $(".number").addClass("viz");
                    $('span.number').each(function () {
                        var
                            i = 1,
                            num = $(this).data('num'),
                            step = 1000 * time / num,
                            that = $(this),
                            int = setInterval(function () {
                                if (i <= num) {
                                    that.html(i);
                                }
                                else {
                                    cc = cc + 2;
                                    clearInterval(int);
                                }
                                i++;
                            }, step);
                    });
                }
            }
        });
    });
    /*================================
     8 - Google Maps
     ================================*/

    $('.triangle').click(
        function () {
            var state = $(this).data('toggleState');
            if (state) {
                $(this).children('i').removeClass('icon-remove').addClass('icon-map-marker');
                $('.mapHandler').css('height', '0px');

            } else {
                $(this).children('i').addClass('icon-remove').removeClass('icon-map-marker');
                $('.mapHandler').css('height', '550px');
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top
                }, 500);
                contactemaps(contact_map, mapAddress, mapType, zoomLvl);
            }
            $(this).data('toggleState', !state);
        });

    var contact_map = 'contact-map',
        mapAddress = $('#contact-map').data('address'),
        mapType = $('#contact-map').data('maptype'),
        zoomLvl = $('#contact-map').data('zoomlvl');

    function contactemaps(selector, address, type, zoom_lvl) {
        var map = new google.maps.Map(document.getElementById(selector), {
            mapTypeId: google.maps.MapTypeId.type,
            scrollwheel: false,
            draggable: false,
            zoom: zoom_lvl
        });

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
                'address': address
            },
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map
                    });
                    map.setCenter(results[0].geometry.location);
                }
            });
    }

});