$('document').ready(function() {

    var string = "oodle";

    $('textarea').typed({
        strings: ["Welcome to Oodle!", "Enter your name here.", ""],
        typeSpeed: 0,
        callback: function() {
            init();
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
            $('#name').val('');
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

        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();

        console.log(voices);
        msg.voice = voices[4];
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = .6; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = oodled;
        msg.lang = 'en-US';

        window.speechSynthesis.speak(msg);
    }

});