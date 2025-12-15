const { describe, it } = require('node:test');
const assert = require('node:assert');
const T = require('../code/public/assets/js/transformations.js');

// ===================
// Oodle Tests
// ===================

describe('oodleText', () => {
    it('should replace lowercase vowels with "oodle"', () => {
        assert.strictEqual(T.oodleText('a'), 'oodle');
        assert.strictEqual(T.oodleText('e'), 'oodle');
        assert.strictEqual(T.oodleText('i'), 'oodle');
        assert.strictEqual(T.oodleText('o'), 'oodle');
        assert.strictEqual(T.oodleText('u'), 'oodle');
        assert.strictEqual(T.oodleText('y'), 'oodle');
    });

    it('should replace uppercase vowels with "oodle"', () => {
        assert.strictEqual(T.oodleText('A'), 'oodle');
        assert.strictEqual(T.oodleText('E'), 'oodle');
        assert.strictEqual(T.oodleText('I'), 'oodle');
        assert.strictEqual(T.oodleText('O'), 'oodle');
        assert.strictEqual(T.oodleText('U'), 'oodle');
        assert.strictEqual(T.oodleText('Y'), 'oodle');
    });

    it('should transform names correctly', () => {
        assert.strictEqual(T.oodleText('Nathan'), 'Noodlethoodlen');
        assert.strictEqual(T.oodleText('Bob'), 'Boodleb');
        assert.strictEqual(T.oodleText('Alice'), 'oodleloodlecoodle');
    });

    it('should handle empty string', () => {
        assert.strictEqual(T.oodleText(''), '');
    });

    it('should handle non-string input', () => {
        assert.strictEqual(T.oodleText(null), '');
        assert.strictEqual(T.oodleText(undefined), '');
        assert.strictEqual(T.oodleText(123), '');
    });
});

// ===================
// Wibble Tests
// ===================

describe('wibbleText', () => {
    it('should add "ib" after lowercase consonants', () => {
        assert.strictEqual(T.wibbleText('b'), 'bib');
        assert.strictEqual(T.wibbleText('c'), 'cib');
        assert.strictEqual(T.wibbleText('d'), 'dib');
    });

    it('should add "ib" after uppercase consonants', () => {
        assert.strictEqual(T.wibbleText('B'), 'Bib');
        assert.strictEqual(T.wibbleText('C'), 'Cib');
        assert.strictEqual(T.wibbleText('D'), 'Dib');
    });

    it('should not modify vowels', () => {
        assert.strictEqual(T.wibbleText('a'), 'a');
        assert.strictEqual(T.wibbleText('e'), 'e');
        assert.strictEqual(T.wibbleText('aeiou'), 'aeiou');
    });

    it('should transform names correctly', () => {
        assert.strictEqual(T.wibbleText('Bob'), 'Bibobib');
        assert.strictEqual(T.wibbleText('Hello'), 'Hibeliblibo');
    });

    it('should handle empty string', () => {
        assert.strictEqual(T.wibbleText(''), '');
    });

    it('should handle non-string input', () => {
        assert.strictEqual(T.wibbleText(null), '');
        assert.strictEqual(T.wibbleText(undefined), '');
    });
});

// ===================
// Snorfle Tests
// ===================

describe('snorfleText', () => {
    it('should add "snorf" to single words', () => {
        assert.strictEqual(T.snorfleText('Hello'), 'Hellosnorf');
        assert.strictEqual(T.snorfleText('Bob'), 'Bobsnorf');
    });

    it('should add "snorf" to each word in a sentence', () => {
        assert.strictEqual(T.snorfleText('Hello World'), 'Hellosnorf Worldsnorf');
        assert.strictEqual(T.snorfleText('I am here'), 'Isnorf amsnorf heresnorf');
    });

    it('should preserve punctuation', () => {
        assert.strictEqual(T.snorfleText('Hello!'), 'Hellosnorf!');
        assert.strictEqual(T.snorfleText('Hi, there.'), 'Hisnorf, theresnorf.');
    });

    it('should handle empty string', () => {
        assert.strictEqual(T.snorfleText(''), '');
    });

    it('should handle non-string input', () => {
        assert.strictEqual(T.snorfleText(null), '');
        assert.strictEqual(T.snorfleText(undefined), '');
    });
});

// ===================
// Bloop Tests
// ===================

describe('bloopText', () => {
    it('should add "oop" after lowercase vowels', () => {
        assert.strictEqual(T.bloopText('a'), 'aoop');
        assert.strictEqual(T.bloopText('e'), 'eoop');
        assert.strictEqual(T.bloopText('i'), 'ioop');
        assert.strictEqual(T.bloopText('o'), 'ooop');
        assert.strictEqual(T.bloopText('u'), 'uoop');
    });

    it('should add "oop" after uppercase vowels', () => {
        assert.strictEqual(T.bloopText('A'), 'Aoop');
        assert.strictEqual(T.bloopText('E'), 'Eoop');
    });

    it('should not include Y as a vowel', () => {
        assert.strictEqual(T.bloopText('y'), 'y');
        assert.strictEqual(T.bloopText('Y'), 'Y');
    });

    it('should transform words correctly', () => {
        assert.strictEqual(T.bloopText('Hello'), 'Heoopllooop');
        assert.strictEqual(T.bloopText('Cat'), 'Caoopt');
    });

    it('should handle empty string', () => {
        assert.strictEqual(T.bloopText(''), '');
    });

    it('should handle non-string input', () => {
        assert.strictEqual(T.bloopText(null), '');
        assert.strictEqual(T.bloopText(undefined), '');
    });
});

// ===================
// Zazzle Tests
// ===================

describe('zazzleText', () => {
    it('should replace lowercase s with "zazzle"', () => {
        assert.strictEqual(T.zazzleText('s'), 'zazzle');
        assert.strictEqual(T.zazzleText('ss'), 'zazzlezazzle');
    });

    it('should replace lowercase z with "zazzle"', () => {
        assert.strictEqual(T.zazzleText('z'), 'zazzle');
        assert.strictEqual(T.zazzleText('zz'), 'zazzlezazzle');
    });

    it('should replace uppercase S and Z', () => {
        assert.strictEqual(T.zazzleText('S'), 'zazzle');
        assert.strictEqual(T.zazzleText('Z'), 'zazzle');
    });

    it('should transform words correctly', () => {
        assert.strictEqual(T.zazzleText('Susan'), 'zazzleuzazzlean');
        assert.strictEqual(T.zazzleText('Fizzy'), 'Fizazzlezazzley');
        assert.strictEqual(T.zazzleText('sizzle'), 'zazzleizazzlezazzlele');
    });

    it('should not modify words without s or z', () => {
        assert.strictEqual(T.zazzleText('Hello'), 'Hello');
        assert.strictEqual(T.zazzleText('Bob'), 'Bob');
    });

    it('should handle empty string', () => {
        assert.strictEqual(T.zazzleText(''), '');
    });

    it('should handle non-string input', () => {
        assert.strictEqual(T.zazzleText(null), '');
        assert.strictEqual(T.zazzleText(undefined), '');
    });
});

// ===================
// Flumph Tests
// ===================

describe('flumphText', () => {
    it('should add "lumph" after lowercase labials', () => {
        assert.strictEqual(T.flumphText('b'), 'blumph');
        assert.strictEqual(T.flumphText('p'), 'plumph');
        assert.strictEqual(T.flumphText('m'), 'mlumph');
        assert.strictEqual(T.flumphText('f'), 'flumph');
        assert.strictEqual(T.flumphText('v'), 'vlumph');
        assert.strictEqual(T.flumphText('w'), 'wlumph');
    });

    it('should add "lumph" after uppercase labials', () => {
        assert.strictEqual(T.flumphText('B'), 'Blumph');
        assert.strictEqual(T.flumphText('P'), 'Plumph');
        assert.strictEqual(T.flumphText('M'), 'Mlumph');
    });

    it('should transform words correctly', () => {
        assert.strictEqual(T.flumphText('Bob'), 'Blumphoblumph');
        assert.strictEqual(T.flumphText('Mom'), 'Mlumphomlumph');
        assert.strictEqual(T.flumphText('Waffles'), 'Wlumphaflumphflumphles');
    });

    it('should not modify words without labials', () => {
        assert.strictEqual(T.flumphText('Hello'), 'Hello');
        assert.strictEqual(T.flumphText('Cat'), 'Cat');
    });

    it('should handle empty string', () => {
        assert.strictEqual(T.flumphText(''), '');
    });

    it('should handle non-string input', () => {
        assert.strictEqual(T.flumphText(null), '');
        assert.strictEqual(T.flumphText(undefined), '');
    });
});

// ===================
// Utility Function Tests
// ===================

describe('getQueryParam', () => {
    it('should extract parameter from URL', () => {
        assert.strictEqual(
            T.getQueryParam('name', 'http://example.com?name=test'),
            'test'
        );
    });

    it('should return null for missing parameter', () => {
        assert.strictEqual(
            T.getQueryParam('name', 'http://example.com?other=value'),
            null
        );
    });

    it('should return null for empty URL', () => {
        assert.strictEqual(T.getQueryParam('name', ''), null);
        assert.strictEqual(T.getQueryParam('name', null), null);
    });
});

describe('decodeURLEncoding', () => {
    it('should decode URL-encoded strings', () => {
        assert.strictEqual(T.decodeURLEncoding('hello%20world'), 'hello world');
    });

    it('should handle plain strings', () => {
        assert.strictEqual(T.decodeURLEncoding('hello'), 'hello');
    });

    it('should handle non-string input', () => {
        assert.strictEqual(T.decodeURLEncoding(null), '');
        assert.strictEqual(T.decodeURLEncoding(undefined), '');
    });
});

describe('buildShareURL', () => {
    it('should build correct share URL', () => {
        assert.strictEqual(
            T.buildShareURL('https:', 'oodle.online', '/', 'Nathan'),
            'https://oodle.online/?name=Nathan'
        );
    });

    it('should encode special characters in name', () => {
        assert.strictEqual(
            T.buildShareURL('https:', 'oodle.online', '/', 'Hello World'),
            'https://oodle.online/?name=Hello%20World'
        );
    });
});

describe('needsTransforming', () => {
    it('should return true when values differ and current is non-empty', () => {
        assert.strictEqual(T.needsTransforming('', 'Nathan'), true);
        assert.strictEqual(T.needsTransforming('old', 'new'), true);
    });

    it('should return false when values are the same', () => {
        assert.strictEqual(T.needsTransforming('Nathan', 'Nathan'), false);
    });

    it('should return false when current value is empty', () => {
        assert.strictEqual(T.needsTransforming('Nathan', ''), false);
    });
});

// ===================
// Transformation Registry Tests
// ===================

describe('transformations registry', () => {
    it('should contain all 6 transformations', () => {
        assert.ok(T.transformations.oodle);
        assert.ok(T.transformations.wibble);
        assert.ok(T.transformations.snorfle);
        assert.ok(T.transformations.bloop);
        assert.ok(T.transformations.zazzle);
        assert.ok(T.transformations.flumph);
    });

    it('should have name, fn, description, and color for each', () => {
        Object.keys(T.transformations).forEach(key => {
            const t = T.transformations[key];
            assert.ok(t.name, `${key} should have name`);
            assert.ok(typeof t.fn === 'function', `${key} should have fn`);
            assert.ok(t.description, `${key} should have description`);
            assert.ok(t.color, `${key} should have color`);
        });
    });
});
