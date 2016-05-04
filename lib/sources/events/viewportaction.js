/**
 * @fileoverview Provide zz.ui.events.ViewportAction class.
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.events.ViewportAction' );
goog.require( 'zz.ui.enums.EventType' );
goog.require( 'zz.events.BaseEvent' );

/**
 * @param  {goog.events.BrowserEvent} evt
 * @constructor
 * @extends {zz.events.BaseEvent}
 */
zz.ui.events.ViewportAction = function( evt ){

    /**
     * Google closure library original event
     * @type {goog.events.BrowserEvent}
     */
    this.original = evt;

    goog.base( this, zz.ui.enums.EventType.VIEWPORT_ACTION );
};
goog.inherits( zz.ui.events.ViewportAction, zz.events.BaseEvent );