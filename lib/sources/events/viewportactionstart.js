/**
 * @fileoverview Provide zz.ui.events.ViewportActionStart class.
 * @license Apache-2.0
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

    goog.base( this, zz.ui.enums.EventType.VIEWPORT_ACTION_START );
};
goog.inherits( zz.ui.events.ViewportActionStart, zz.events.BaseEvent );