/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    
    describe('RSS Feeds', function() {
        
        // Test that allFeeds array is defined and it's not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Test that each feed have a URL
        it('have a URL', () => {
            allFeeds.forEach((obj) => {
                expect(obj.url).toBeDefined();
                expect(obj.url).toMatch(/^https*:\/\//);
            });
        });

        // Test that each feed have a name
        it('have a name', () => {
            allFeeds.forEach(obj => {
                expect(obj.name).toBeDefined();
                expect(typeof obj.name).toBe('string');
                expect(obj.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', () => {
        
        // Test that the .slide-menu is hidden by default
        it('hidden by default', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Test that the .slide-menu changes visibility when the 
        // hamburger button is clicked
        it('changes visibility when menu icon is clicked', () => {
            let menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', () => {
        beforeEach(done => {
            loadFeed(0, done);
        });

        // Test that ensures there's at least a single .entry element
        // within the .feed container when the loadFeed function is called. 
        it('at least a single entry element within the feed container', done => {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', () => {
        // feed container for all possible feeds in allFeeds
        let feed = {};
        let id = allFeeds.length - 1;

        beforeEach(done => {
            // Callback which will call loadFeed recursively
            // through all feeds in allFeeds array
            function cb() {
                feed[id] = $('.feed .entry');
                if (id > 0) {
                    loadFeed(--id, cb);
                } else done();
            };
            loadFeed(id, cb);
            console.log(feed);
        });

        // Test that the content of the .feed container changes 
        // when different feed is loaded
        it('content changes when a new feed is loaded', done => {
            // compare content of all possible feeds
            Object.values(feed).forEach((current, idx, arr) => {
                for (++idx; idx < arr.length; idx++) {
                    console.log(idx);
                    expect(current).not.toEqual(arr[idx]);
                }                
            });
            done();
        });
    });
}());
