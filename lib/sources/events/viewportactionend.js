/**
 * @fileoverview Provide zz.ui.events.ViewportActionEnd class.
 * @license Apache-2.0
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

    goog.base( this, zz.ui.enums.EventType.VIEWPORT_ACTION_END );
};
goog.inherits( zz.ui.events.ViewportActionEnd, zz.events.BaseEvent );