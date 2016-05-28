$('document').ready(function() {

    var string = "oodle";

    $('textarea').typed({
        strings: ["Welcome to Oodle!", "Enter your name here.", ""],
        typeSpeed: 0,
        callback: function() {
            init();
            setTimeout(function(){document.getElementById('name').focus()
        }
    });

    var currentYear = new Date().getFullYear();
    $('.date').html(currentYear);

    function init() {
        $(window).keydown(function(event){
            if(event.keyCode == 13) {
                event.preventDefault();
                oodle();
            }
        });

        $('#submit').click(function() {
            oodle();
        });

        $('#reset').click(function() {
            $('#controls').css({display: "none"});
            $('#name').val('');
        });

        $('.play').click(function() {
            textToSpeak($('#name').val());
        });

        $('.pause').click(function() {
            window.speechSynthesis.cancel();
        });

        $('#help').click(function() {
            swal({
                title: "Oodle",
                text: "<p>Just enter your name directly into the page, and click to <i>Oodlize</i>!</p><br><br><small>Using&nbsp;the&nbsp;latest&nbsp;research&nbsp;and&nbsp;technology&nbsp;in&nbsp;oodle, this&nbsp;applicationvwill&nbsp;replace&nbsp;every&nbsp;vowel&nbsp;with&nbsp;'oodle'.</small>",
                html: true,
                showCancelButton: false,
                confirmButtonText: "Let's Oodle!",
                type: "info"
            })
        });
    }

    function oodle() {
        var nameField = $('#name');
        var name = nameField.val();
        var oodled = name.replace(/[aAeEoOuU]/ig,string);
        nameField.val(oodled);

        $('#controls').css({display: "inline"});

        textToSpeak(oodled);
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