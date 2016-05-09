/**
 * @fileoverview Provide zz.ui.events.ViewportActionStart class.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.events.ViewportActionStart' );
goog.require( 'zz.ui.enums.EventType' );
goog.require( 'zz.events.BaseEvent' );

/**
 * @param  {goog.events.BrowserEvent} evt
 * @constructor
 * @extends {zz.events.BaseEvent}
 */
zz.ui.events.ViewportActionStart = function( evt ){

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

	goog.base( this, zz.ui.enums.EventType.VIEWPORT_ACTION_START );
};
goog.inherits( zz.ui.events.ViewportActionStart, zz.events.BaseEvent );