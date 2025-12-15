/**
 * Shared App Logic for Whimsical Text Transformations
 * Handles UI, text-to-speech, sharing, and events.
 */

(function(window) {
    'use strict';

    var $ = window.jQuery;
    var Transformations = window.Transformations;

    /**
     * Initialize the transformation app
     * @param {Object} config - Configuration object
     * @param {string} config.transformationType - Key from Transformations.transformations
     */
    function initApp(config) {
        var transformationType = config.transformationType;
        var transformation = Transformations.transformations[transformationType];

        if (!transformation) {
            console.error('Unknown transformation:', transformationType);
            return;
        }

        var transformFn = transformation.fn;
        var transformName = transformation.name;
        var transformColor = transformation.color;

        // Set theme color
        document.documentElement.style.setProperty('--theme-color', transformColor);

        // Initialize state
        $('html').attr('name', '');

        // Determine view based on URL
        determineIntroduction('name', window.location.search, transformName);

        // Set copyright year
        var currentYear = new Date().getFullYear();
        $('.date').html(currentYear);

        // Track input changes
        $(window).keyup(function() {
            hasThisBeenTransformed();
        });

        function determineIntroduction(name, url, transformName) {
            var param = Transformations.getQueryParam(name, url);
            if (param === null) {
                firstView(transformName);
            } else {
                sharedView(Transformations.decodeURLEncoding(param));
            }
        }

        function firstView(transformName) {
            hasThisBeenTransformed();
            $('textarea').typed({
                strings: ['Welcome to ' + transformName + '!', 'Enter your name here.', ''],
                typeSpeed: 0,
                callback: function() {
                    init();
                    setTimeout(function() {
                        document.getElementById('name').focus();
                    });
                }
            });
        }

        function sharedView(name) {
            $('#share').show();
            $('textarea').typed({
                strings: [name],
                typeSpeed: 0,
                callback: function() {
                    init();
                    setTimeout(function() {
                        document.getElementById('name').focus();
                    });
                }
            });
        }

        function hasThisBeenTransformed() {
            if ($('html').attr('name') === $('#name').val() || $('#name').val() === '') {
                $('#submit').addClass('disabled');
            } else {
                $('#submit').removeClass('disabled');
            }
        }

        function setCurrentName(name) {
            $('html').attr('name', name);
        }

        function init() {
            // Enter key triggers transform
            $(window).keydown(function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    transform();
                }
            });

            // Submit button
            $('#submit').click(function() {
                if ($('#submit').hasClass('disabled')) {
                    $('#name').focus();
                    return;
                }
                transform();
            });

            // Share button
            $('#share').click(function() {
                swal({
                    title: 'Share Your ' + transformName + '!',
                    text: 'Create a link for: <strong>' + $('html').attr('name') + '</strong>',
                    type: 'input',
                    html: true,
                    inputValue: $(location).attr('href'),
                    showConfirmButton: true,
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: 'Copy',
                    cancelButtonText: 'Close',
                    confirmButtonColor: transformColor,
                    cancelButtonColor: '#4C4C4C',
                    allowOutsideClick: true
                }, function(isConfirm) {
                    if (document.queryCommandSupported('copy')) {
                        if (isConfirm) {
                            $('.sweet-alert input').select();
                            var copySuccess = true;
                            try {
                                document.execCommand('copy');
                            } catch (e) {
                                copySuccess = false;
                            }
                            swal({
                                title: copySuccess ? 'Successfully Copied!' : 'Unsupported Feature',
                                text: copySuccess ? 'Thank you for using ' + transformName + '!' : 'Not supported by your current browser',
                                type: copySuccess ? 'success' : 'error',
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

            // Reset button
            $('#reset').click(function() {
                $('#controls').css({ display: 'none' });
                $('html').attr('name', '');
                $('#share').hide();
                resetURL();
                $('#name').val('');
                $('#name').focus();
            });

            // Play button
            $('.play').click(function() {
                textToSpeak($('#name').val());
            });

            // Pause button
            $('.pause').click(function() {
                $('.play').show();
                $('.pause').hide();
                window.speechSynthesis.cancel();
            });

            // Home button
            $('#home').click(function() {
                window.location.href = '/';
            });
        }

        function transform() {
            var nameField = $('#name');
            var name = nameField.val();
            var transformed = transformFn(name);
            nameField.val(transformed);

            $('#controls').css({ display: 'inline' });

            createShareLink(name);
            setCurrentName(transformed);
            $('#share').show();

            textToSpeak(transformed);
        }

        function createShareLink(name) {
            if (history.pushState) {
                var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?name=' + encodeURIComponent(name);
                window.history.pushState({ path: newurl }, '', newurl);
            }
        }

        function resetURL() {
            if (history.pushState) {
                var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
                window.history.pushState({ path: newurl }, '', newurl);
            }
        }

        function textToSpeak(text) {
            var play = $('.play');
            var pause = $('.pause');

            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();

            msg.voice = voices[4];
            msg.voiceURI = 'native';
            msg.volume = 1;
            msg.rate = 0.6;
            msg.pitch = 1;
            msg.text = text;
            msg.lang = 'en-US';

            msg.addEventListener('start', function() {
                play.hide();
                pause.show();
            });

            msg.addEventListener('end', function() {
                pause.hide();
                play.show();
            });

            window.speechSynthesis.speak(msg);
        }
    }

    // Export
    window.WhimsicalApp = {
        init: initApp
    };

})(window);
