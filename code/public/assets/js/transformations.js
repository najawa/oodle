/**
 * Whimsical Text Transformations
 * A suite of fun text transformation functions.
 */

(function(exports) {
    'use strict';

    // ===================
    // Transformation Functions
    // ===================

    /**
     * Oodle - Replaces all vowels with "oodle"
     * Example: "Nathan" -> "Noodlethoodln"
     */
    var VOWEL_PATTERN = /[aAeEiIoOuUyY]/g;
    function oodleText(text) {
        if (typeof text !== 'string') return '';
        return text.replace(VOWEL_PATTERN, 'oodle');
    }

    /**
     * Wibble - Adds "ib" after each consonant
     * Example: "Bob" -> "Bibobib"
     */
    var CONSONANT_PATTERN = /[bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ]/g;
    function wibbleText(text) {
        if (typeof text !== 'string') return '';
        return text.replace(CONSONANT_PATTERN, function(match) {
            return match + 'ib';
        });
    }

    /**
     * Snorfle - Adds "snorf" to the end of each word
     * Example: "Hello World" -> "Hellosnorf Worldsnorf"
     */
    var WORD_PATTERN = /(\w+)/g;
    function snorfleText(text) {
        if (typeof text !== 'string') return '';
        return text.replace(WORD_PATTERN, '$1snorf');
    }

    /**
     * Bloop - Adds "oop" after each vowel (not including y)
     * Example: "Hello" -> "Heooplloooop"
     */
    var VOWEL_BLOOP_PATTERN = /[aeiouAEIOU]/g;
    function bloopText(text) {
        if (typeof text !== 'string') return '';
        return text.replace(VOWEL_BLOOP_PATTERN, function(match) {
            return match + 'oop';
        });
    }

    /**
     * Zazzle - Replaces all s and z with "zazzle"
     * Example: "Susan" -> "Zazzleuazazzlean"
     */
    var SIBILANT_PATTERN = /[szSZ]/g;
    function zazzleText(text) {
        if (typeof text !== 'string') return '';
        return text.replace(SIBILANT_PATTERN, 'zazzle');
    }

    /**
     * Flumph - Adds "lumph" after labial consonants (b, p, m, f, v, w)
     * Example: "Bob" -> "Blumphoblumph"
     */
    var LABIAL_PATTERN = /[bpmfvwBPMFVW]/g;
    function flumphText(text) {
        if (typeof text !== 'string') return '';
        return text.replace(LABIAL_PATTERN, function(match) {
            return match + 'lumph';
        });
    }

    // ===================
    // Utility Functions
    // ===================

    /**
     * Extracts a query parameter value from a URL.
     */
    function getQueryParam(name, url) {
        if (!url) return null;
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regexS = '[\\?&]' + name + '=([^&#]*)';
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results === null ? null : results[1];
    }

    /**
     * Decodes URL-encoded query string values.
     */
    function decodeURLEncoding(query) {
        if (typeof query !== 'string') return '';
        return decodeURIComponent(query.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"'));
    }

    /**
     * Builds a share URL with the given name parameter.
     */
    function buildShareURL(protocol, host, pathname, name) {
        return protocol + '//' + host + pathname + '?name=' + encodeURIComponent(name);
    }

    /**
     * Checks if text needs transforming (is different and non-empty).
     */
    function needsTransforming(originalName, currentValue) {
        return originalName !== currentValue && currentValue !== '';
    }

    // ===================
    // Transformation Registry
    // ===================

    var transformations = {
        oodle: {
            name: 'Oodle',
            fn: oodleText,
            description: 'Replaces vowels with "oodle"',
            color: '#974B91',
            example: { input: 'Hello', output: 'Hoodlelloodle' }
        },
        wibble: {
            name: 'Wibble',
            fn: wibbleText,
            description: 'Adds "ib" after consonants',
            color: '#E67E22',
            example: { input: 'Hello', output: 'Hibeliblibo' }
        },
        snorfle: {
            name: 'Snorfle',
            fn: snorfleText,
            description: 'Adds "snorf" to each word',
            color: '#3498DB',
            example: { input: 'Hello', output: 'Hellosnorf' }
        },
        bloop: {
            name: 'Bloop',
            fn: bloopText,
            description: 'Adds "oop" after vowels',
            color: '#1ABC9C',
            example: { input: 'Hello', output: 'Heoopllooop' }
        },
        zazzle: {
            name: 'Zazzle',
            fn: zazzleText,
            description: 'Replaces s and z with "zazzle"',
            color: '#F39C12',
            example: { input: 'Suzy', output: 'Zazzleuzazzley' }
        },
        flumph: {
            name: 'Flumph',
            fn: flumphText,
            description: 'Adds "lumph" after lip sounds',
            color: '#E91E63',
            example: { input: 'Bob', output: 'Blumphoblumph' }
        }
    };

    // ===================
    // Exports
    // ===================

    var publicAPI = {
        // Transformation functions
        oodleText: oodleText,
        wibbleText: wibbleText,
        snorfleText: snorfleText,
        bloopText: bloopText,
        zazzleText: zazzleText,
        flumphText: flumphText,
        // Utilities
        getQueryParam: getQueryParam,
        decodeURLEncoding: decodeURLEncoding,
        buildShareURL: buildShareURL,
        needsTransforming: needsTransforming,
        // Registry
        transformations: transformations
    };

    // Node.js/testing export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = publicAPI;
    }

    // Browser export
    if (typeof window !== 'undefined') {
        window.Transformations = publicAPI;
    }

})(typeof window !== 'undefined' ? window : this);
