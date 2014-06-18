'use strict';

describe('Navigation Test', function() {
    it('should display the correct title', function () {
        browser.get('/');
        expect(browser.getTitle()).toBe('Title Here');
    });
});
