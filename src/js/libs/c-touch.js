/**
 * User: Q-PDI
 * Date: 14.08.13
 * v.0.0.1
 */
function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

if (isIE() !== 8) {
    var elementPrototype = typeof HTMLElement !== "undefined"
        ? HTMLElement.prototype : Element.prototype;

    elementPrototype.addClass = function (string) {
        if (!(string instanceof Array)) {
            string = string.split(' ');
        }
        for (var i = 0, len = string.length; i < len; ++i) {
            if (string[i] && !new RegExp('(\\s+|^)' + string[i] + '(\\s+|$)').test(this.className)) {
                this.className = this.className.trim() + ' ' + string[i];
            }
        }
    };

    elementPrototype.removeClass = function (string) {
        if (!(string instanceof Array)) {
            string = string.split(' ');
        }
        for (var i = 0, len = string.length; i < len; ++i) {
            this.className = this.className.replace(new RegExp('(\\s+|^)' + string[i] + '(\\s+|$)'), ' ').trim();
        }
    };

    elementPrototype.toggleClass = function (string) {
        if (string) {
            if (new RegExp('(\\s+|^)' + string + '(\\s+|$)').test(this.className)) {
                this.className = this.className.replace(new RegExp('(\\s+|^)' + string + '(\\s+|$)'), ' ').trim();
            } else {
                this.className = this.className.trim() + ' ' + string;
            }
        }
    };

    elementPrototype.hasClass = function (string) {
        return string && new RegExp('(\\s+|^)' + string + '(\\s+|$)').test(this.className);
    };

    /**
     * Start
     */
    (function (root) {
        root.QULIX = root.QULIX || {};
        var q = root.QULIX;
        q.htmlEl = document.getElementsByTagName('HTML')[0];


        /**
         * Touch support
         * @type {boolean}
         */
        q.touchEnabled = false;
        q.htmlEl.addClass('no-touch');
        if ('ontouchstart' in window) {// iOS & android
            q.touchEnabled = true;
        } else if (window.navigator.msPointerEnabled) {// Win8
            q.touchEnabled = true;
        }
        if (q.touchEnabled) {
            q.htmlEl.removeClass('no-touch');
            q.htmlEl.addClass('touch');
        }

    }(window));

}
