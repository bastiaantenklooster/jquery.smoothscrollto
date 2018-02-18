/*
 *  jquery-smoothScrollTo
 *
 *  Created by Bastiaan ten Klooster
 *  http://www.bastiaan.io
 *
 *  Under MIT License
 */
;(function ($, window, document) {

    // Create the defaults once
    const pluginName = "smoothScrollTo",
        defaults = {
            offset: 0, // Scroll in addition to the elements top offset
            duration: (distance) => 0,
            highlight: false,
            highlightClass: 'scroll-to-highlight',
            highlightStopEvent: 'transitionend',
            offsetFunction: 'offset', // [offset|position]
            limitScroll: false, // Requires html and body to have height 100%
            done: $.noop,
            fail: $.noop,
            always: $.noop
        };

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            const plugin = this;

            const duration = this.duration();

            const scrollAnimation = this.scroll(duration);

            // Only fire promise callbacks, not animation callbacks to prevent duplicate events (html, body)
            scrollAnimation.promise()
                .done(plugin.settings.done)
                .fail(plugin.settings.fail)
                .always(plugin.settings.always)
                .done(() => {
                    plugin.highlight.call(plugin);
                });
        },

        // Start scroll animation
        scroll: function (duration) {
            return $('html, body').animate({
                    scrollTop: this.limitScroll(this.offset())
                },
                $.extend({}, this.settings, {
                    duration: this.duration(),
                    // Do not fire default callbacks
                    done: $.noop, fail: $.noop, always: $.noop
                })
            );
        },

        highlight: function () {
            const $element = $(this.element);

            $element.addClass(this.settings.highlightClass);

            $element.one(this.settings.highlightStopEvent, (event) => {
                $(event.currentTarget).removeClass(this.settings.highlightClass);
            });
        },

        // Allow duration to be function or number
        duration: function () {
            if (typeof(this.settings.duration) === 'function') {
                return this.settings.duration.call(
                    this,
                    this.distance()
                );
            }

            return this.settings.duration;
        },

        // Calculate absolute distance to scroll
        distance: function () {
            return Math.abs(
                this.limitScroll(this.offset()) - $('html, body').scrollTop()
            );
        },

        limitScroll: function (distance) {
            return this.settings.limitScroll ? Math.min(distance, $(document).height() - $(window).height()) : distance;
        },

        offset: function () {
            return $(this.element)[this.settings.offsetFunction]().top + this.settings.offset;
        }
    });

    $.fn[pluginName] = function (options) {
        return this.first().each(function () {
            $.data(
                this,
                "plugin_" + pluginName,
                new Plugin(this, options)
            );
        });
    };

})(jQuery, window, document);
