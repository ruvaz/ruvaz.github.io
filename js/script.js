function soloNumeros(e) {
    var t = window.Event ? e.which : e.keyCode;
    return t >= 48 && 57 >= t || 8 == t
}

function soloLetras(e) {
    key = e.keyCode || e.which, tecla = String.fromCharCode(key).toLowerCase(), letras = " Ã¡Ã©Ã­Ã³ÃºabcdefghijklmnÃ±opqrstuvwxyz", especiales = "8-37-39-46", tecla_especial = !1;
    for (var t in especiales)
        if (key == especiales[t]) {
            tecla_especial = !0;
            break
        }
    return -1 != letras.indexOf(tecla) || tecla_especial ? void 0 : !1
}

$(window).load(function() {
    $(".loader").fadeOut(), $("#preloader").delay(350).fadeOut("slow"), $("body").delay(350)
}), jQuery(document).ready(function(e) {
    function t() {
        var t = e(window).scrollTop();
        e(".banner").css("margin-top", 0 - .8 * t + "px")
    }
    e("html").niceScroll({
        cursorcolor: "#0080FF",
        cursorwidth: "8",
        cursorborder: ""
    }), setTimeout(function() {
        e("h1.responsive-headline").fitText(1, {
            minFontSize: "28px",
            maxFontSize: "72px"
        })
    }, 100), e(".smoothscroll").on("click", function(t) {
        t.preventDefault();
        var a = this.hash,
            o = e(a);
        e("html, body").stop().animate({
            scrollTop: o.offset().top
        }, 800, "swing", function() {
            window.location.hash = a
        })
    }), (new WOW).init(), e(window).scroll(function() {
        t()
    });
    var a = e("section"),
        o = e("#m-nav a");
    a.waypoint({
            handler: function(t, a) {
                var n;
                n = e(this), "up" === a && (n = n.prev());
                var c = e('#m-nav a[href="#' + n.attr("id") + '"]');
                o.parent().removeClass("current"), c.parent().addClass("current")
            },
            offset: "35%"
        }), e("header").css({
            height: e(window).height()
        }), e(window).on("resize", function() {
            e("header").css({
                height: e(window).height()
            }), e("body").css({
                width: e(window).width()
            })
        }),
        function() {
            e(window).scroll(function() {
                var t;
                return t = e(window).scrollTop() / 100, e(".header-overlay").css("opacity", t)
            })
        }.call(this), e(window).on("scroll", function() {
            var t = e("header").height(),
                a = e(window).scrollTop(),
                o = e("#m-nav");
            a > .2 * t && t > a && e(window).outerWidth() > 768 ? o.fadeOut("fast") : .2 * t > a ? o.removeClass("opaque").fadeIn("fast") : o.addClass("opaque").fadeIn("fast")
        }), e(".item-wrap a").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            removalDelay: 200,
            showCloseBtn: !1,
            mainClass: "mfp-fade"
        }), e(document).on("click", ".popup-modal-dismiss", function(t) {
            t.preventDefault(), e.magnificPopup.close()
        }), e(document).ready(function() {
            e("#testimonial-slides").owlCarousel({
                navigation: !1,
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: !0
            })
        }), map = new GMaps({
            el: "#map",
            lat: 120.6121334,
            lng: -100.4453224,
            zoom: 13,
            zoomControl: !0,
            zoomControlOpt: {
                style: "SMALL",
                position: "TOP_LEFT"
            },
            panControl: !1,
            scrollwheel: !1
        }), map.addMarker({
            lat: 120.6121334,
            lng: -100.4453224,
            title: "BD InfoSys",
            infoWindow: {
                content: "<p>Building # 2, Plot # 111, Road # 35, Gulshan - 2, Dhaka</p>"
            }
        }), e("form#contactForm button.submit").click(function() {
            e("#image-loader").fadeIn();
            var t = e("#contactForm #contactName").val();
            if (null == t || 0 == t || /^\s+$/.test(t)) return alert("Por favor, ingrese el nombre del contacto"), e("#image-loader").fadeOut(), e("#message-warning").html("Error en el nombre del contacto"), e("#message-warning").fadeIn(), setTimeout(function() {
                document.getElementById("contactName").focus()
            }, 10), document.getElementById("contactName").focus(), !1;
            var a = e("#contactForm #contactEmail").val();
            if (null == a || 0 == a || /^\s+$/.test(a)) return alert("Por favor, ingrese el correo del contacto"), e("#image-loader").fadeOut(), e("#message-warning").html("Error en el correo del contacto"), e("#message-warning").fadeIn(), setTimeout(function() {
                document.getElementById("contactEmail").focus()
            }, 10), document.getElementById("contactEmail").focus(), !1;
            var a = e("#contactForm #contactEmail").val(),
                o = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
            if (!o.test(a)) return alert("Por favor, ingrese un correo válido"), e("#image-loader").fadeOut(), e("#message-warning").html("Error correo no valido"), e("#message-warning").fadeIn(), setTimeout(function() {
                document.getElementById("contactEmail").focus()
            }, 10), document.getElementById("contactEmail").focus(), !1;
            var n = e("#contactForm #contactSubject").val();
            if (null == n || 0 == n || /^\s+$/.test(n)) return alert("Por favor, ingrese el asunto"), e("#image-loader").fadeOut(), e("#message-warning").html("Error en el asunto"), e("#message-warning").fadeIn(), setTimeout(function() {
                document.getElementById("contactSubject").focus()
            }, 10), document.getElementById("contactSubject").focus(), !1;
            var c = e("#contactForm #contactMessage").val();
            if (null == c || 0 == c || /^\s+$/.test(c)) return alert("Por favor, ingrese el Mensaje"), e("#image-loader").fadeOut(), e("#message-warning").html("Error en el Mensaje"), e("#message-warning").fadeIn(), setTimeout(function() {
                document.getElementById("contactMessage").focus()
            }, 10), document.getElementById("contactMessage").focus(), !1;
            var r = e("#contactForm #captcha").val();
            if (null == r || 0 == r || /^\s+$/.test(r)) return alert("Por favor, ingrese el captcha"), e("#image-loader").fadeOut(), e("#message-warning").html("Por favor, ingrese el captcha"), e("#message-warning").fadeIn(), setTimeout(function() {
                document.getElementById("captcha").focus()
            }, 10), document.getElementById("captcha").focus(), !1;
            var t = e("#contactForm #contactName").val(),
                a = e("#contactForm #contactEmail").val(),
                n = e("#contactForm #contactSubject").val(),
                c = e("#contactForm #contactMessage").val(),
                r = e("#contactForm #captcha").val(),
                s = "contactName=" + t + "&contactEmail=" + a + "&contactSubject=" + n + "&contactMessage=" + c + "&captcha=" + r;
            return e.ajax({
                type: "POST",
                url: "http://www.dev.miweb.mx/static/github/sendEmail.php",
                data: s,
                success: function(t) {
                    "OK" == t ? (e("#image-loader").fadeOut(), e("#message-warning").hide(), e("#contactForm").fadeOut(), e("#message-success").fadeIn()) : (e("#image-loader").fadeOut(), e("#message-warning").html(t), e("#message-warning").fadeIn())
                }
            }), !1
        })
});