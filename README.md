# jQuery.smoothScrollTo

Animated scrolling to any element on the page, 
with highlighting to indicate the element that was scrolled to.

Notice: By default scrolling is instant, as the default `duration` option value is `0`.

## Usage

The most basic usage of this plugin only requires the element to scroll to:

`$(element).smoothScrollTo([options])`

### *element*

This defines the element to scroll to. Scrolling always happens on the root scrolling element, which can be either `html` or `body`.

### *options*

An object containing options for the plugin:

-   offset: Scroll offset in addition to the element's top offset
-   duration: Animation duration in ms. A value of type `Number` or `function`. When using a function, a number must be returned. Default is `0`
-   highlight: When set to `true`, a class will be added to the element on completion. Default is `false`
-   highlightClass: Use this class to add an animation or transition to highlight the *element*. Default is `scroll-to-highlight`
-   highlightStopEvent: When this event gets triggered, the highlighting will end. Default is `transitionend`
-   offsetFunction: jQuery function to use to calculate the top offset of the element. Default is `offset`, `position` may be useful to include top margins and borders
-   limitScroll: Limit the scroll amount to the document height. Requires html and body to have height 100%. Default is `false`

Any options applicable to `jQuery.animate()`. The `duration` option of the animate function is replaced by the `duration` option of this plugin.

## Advanced usage

A function can be used to calculate the scroll duration based on the distance to scroll:

```
$(element).smoothScrollTo({
    duration: (distance) => distance
});
```

This plugin can be used to animate internal references (#id):

```
$("a").on('click', function (event) {
    const href = $(this).attr('href');

    if (href.match(/^[#]/)) {
        event.preventDefault();
        
        // Change the url
        history.replaceState({}, null, href);
        
        $(href).smoothScrollTo({
            duration: 'slow'
        });
        
        return false;
    }
});
```

## License

Copyright 2017 Bastiaan ten Klooster

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
