/**
 * @fileoverview Provide zz.ui.events.ViewportActionEnd class.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.events.ViewportActionEnd' );
goog.require( 'zz.ui.enums.EventType' );
goog.require( 'zz.events.BaseEvent' );

/**
 * @param  {goog.events.BrowserEvent} evt
 * @constructor
 * @extends {zz.events.BaseEvent}
 */
zz.ui.events.ViewportActionEnd = function( evt ){

	/**
	 * Google closure library original event
	 * @type {goog.events.BrowserEvent}
	 */
	this.original = evt;

	/**
	 * Action X-coordinate.
	 * @type {number}
	 * @const
	 */
	this.clientX = evt.clientX ?

		evt.clientX :
		evt.getBrowserEvent( ).touches[ 0 ].clientX;

	/**
	 * Action Y-coordinate.
	 * @type {number}
	 * @const
	 */
	this.clientY = evt.clientY ?

		evt.clientY :
		evt.getBrowserEvent( ).touches[ 0 ].clientY;

	goog.base( this, zz.ui.enums.EventType.VIEWPORT_ACTION_END );
};
goog.inherits( zz.ui.events.ViewportActionEnd, zz.events.BaseEvent );