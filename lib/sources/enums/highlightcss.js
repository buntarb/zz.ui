/**
 * @fileoverview Provide zz.ui.enums.HighlightCss
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.enums.HighlightCss' );


/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.enums.HighlightCss = {

    HIGHLIGHTED_ELEMENT: goog.getCssName('highlighted-element'),
    HIGHLIGHTED_ELEMENT_PATCHED: goog.getCssName('highlighted-element-patched'),
    HIGHLIGHTED_ELEMENT_CONTAINER: goog.getCssName( 'highlighted-element-container' ),

	HIGHLIGHT: goog.getCssName('highlight'),
    HIGHLIGHT_CENTER: goog.getCssName('highlight--center'),

    IS_ANIMATING: goog.getCssName('is-animating'),
    IS_VISIBLE: goog.getCssName('is-visible')
};