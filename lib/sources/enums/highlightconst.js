/**
 * @fileoverview Provide zz.ui.enums.HighlightConst
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.enums.HighlightConst' );


/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.enums.HighlightConst = {

	DEFAULT_TRANSLATE: 'translate3d(-50%, -50%, 0)',
	INITIAL_SCALE: 'scale(0.0001, 0.0001)',
	INITIAL_SIZE: '1px',
	INITIAL_OPACITY: '0.4',
	FINAL_OPACITY: '0',
	FINAL_SCALE: ''
};