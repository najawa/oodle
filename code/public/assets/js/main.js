$('document').ready(function() {

    $('html').attr("name","");

    var string = "oodle";

    var share = $('#share');
    determineIntroduction('name', window.location.search);

    function determineIntroduction( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? firstView() : sharedView( decodeURLEncoding(results[1]) );
    }

    function decodeURLEncoding(query) {
        return decodeURIComponent(query.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"'));
    }

    function setCurrentName(name) {
        $('html').attr("name", name);
    }

    function firstView() {
        hasThisBeenOodled();
        $('textarea').typed({
            strings: ["Welcome to Oodle!", "Enter your name here.", ""],
            typeSpeed: 0,
            callback: function() {
                init();
                setTimeout(function() {
                    document.getElementById('name').focus()
                });
            }
        });
    }

    function sharedView(name) {
        share.show();
        $('textarea').typed({
            strings: [name],
            typeSpeed: 0,
            callback: function() {
                init();
                setTimeout(function() {
                    document.getElementById('name').focus()
                });
            }
        });
    }

    function hasThisBeenOodled() {
        console.log($('html').attr("name") , $('#name').val());
        if($('html').attr("name") == $('#name').val() || $('#name').val() == '') {
            $('#submit').addClass('disabled');
        } else {
            $('#submit').removeClass('disabled');
        }
    }

    var currentYear = new Date().getFullYear();
    $('.date').html(currentYear);

    $(window).keyup(function(event) {
        hasThisBeenOodled();
    });

    function init() {
        $(window).keydown(function(event){
            if(event.keyCode == 13) {
                event.preventDefault();
                oodle();
            }
        });

        $('#submit').click(function() {
            if($('#submit').hasClass('disabled')) {
                $('#name').focus();
                return;
            }
            oodle();
        });

        $('#share').click(function() {

            var copyButton = "";
            var copyIsSupportedFeature = document.queryCommandSupported('copy');

            if(copyIsSupportedFeature) {
                copyButton = "<button id='copyShareLink'>copy</button>";
            }

           swal({
               title: "Share Your Oodle!",
               text: "Create a link for: <strong>" + $('html').attr("name") + "</strong>",
               type: "input",
               html: true,
               inputValue: $(location).attr('href'),
               showConfirmButton: true,
               showCancelButton: true,
               closeOnConfirm: false,
               confirmButtonText: "Copy",
               cancelButtonText: "Close",
               confirmButtonColor: "#974B91",
               cancelButtonColor: "#4C4C4C",
               allowOutsideClick: true
           }, function(isConfirm) {
               if(copyIsSupportedFeature) {
                   if(isConfirm) {
                       $('.sweet-alert input').select();
                       var copySuccess = true;
                       try {
                           document.execCommand('copy');
                       } catch (e) {
                            copySuccess = false;
                       }
                       swal({
                           title:  copySuccess ? "Successfully Copied!" : "Unsupported Feature",
                           text: copySuccess ? "Thank you for using Oodle!" : "Not supported by your current browser",
                           type: copySuccess ? "success" : "error",
                           timer: 2000,
                           showConfirmButton: false,
                           allowOutsideClick: true
                       });
                   } else {
                       swal.close();
                   }
               }
           });
        });

        $('#reset').click(function() {
            $('#controls').css({display: "none"});
            $('html').attr("name","");
            share.hide();
            resetURL();
            $('#name').val('');
            $('#name').focus();
        });

        $('.play').click(function() {
            textToSpeak($('#name').val());
        });

        $('.pause').click(function() {
            $('.play').show();
            $('.pause').hide();
            window.speechSynthesis.cancel();
        });

        $('#help').click(function() {
            swal({
                title: "Oodle",
                text: "<p>Just enter your name directly into the page, and click to <i>Oodlize</i>!</p><br><br><small>Using&nbsp;the&nbsp;latest&nbsp;research&nbsp;and&nbsp;technology&nbsp;in&nbsp;oodle, this&nbsp;applicationvwill&nbsp;replace&nbsp;every&nbsp;vowel&nbsp;with&nbsp;'oodle'.</small>",
                html: true,
                showCancelButton: false,
                confirmButtonText: "Let's Oodle!",
                type: "info",
                allowOutsideClick: true
            })
        });
    }

    function oodle() {
        var nameField = $('#name');
        var name = nameField.val();
        var oodled = name.replace(/[aAeEiIoOuUyY]/ig,string);
        nameField.val(oodled);

        $('#controls').css({display: "inline"});

        createShareLink(name);
        setCurrentName(oodled);
        share.show();

        textToSpeak(oodled);
    }

    function createShareLink(name) {
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?name=' + name;
            window.history.pushState({path:newurl},'',newurl);
        }
    }

    function resetURL(name) {
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({path:newurl},'',newurl);
        }
    }

    function textToSpeak(text) {
        var play = $('.play');
        var pause = $('.pause');

        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();

        msg.voice = voices[4];
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = .6; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = text;
        msg.lang = 'en-US';

        msg.addEventListener('start', function () {
            play.hide();
            pause.show();
        });

        msg.addEventListener('end', function () {
            pause.hide();
            play.show();
        });

        window.speechSynthesis.speak(msg);
    }

});