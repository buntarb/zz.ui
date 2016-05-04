/**
 * @fileoverview Provide zz.ui.services.ViewportAction class.
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.services.ViewportAction' );

goog.require( 'goog.events' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.events.EventTarget' );

goog.require( 'zz.ui.events.ViewportActionEnd' );
goog.require( 'zz.ui.events.ViewportActionStart' );


/**
 * Service for clicking on window document.
 * @constructor
 */
zz.ui.services.ViewportAction = function( ){

    goog.base( this );
    goog.events.listen(

        document,
        goog.events.EventType.MOUSEUP,
        this.endListener_,
        false,
        this );

    goog.events.listen(

        document,
        goog.events.EventType.MOUSEDOWN,
        this.startListener_,
        false,
        this );
};
goog.inherits( zz.ui.services.ViewportAction, goog.events.EventTarget );
goog.addSingletonGetter( zz.ui.services.ViewportAction );

/**
 * Listener for goog.events.EventType.MOUSEUP event.
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
zz.ui.services.ViewportAction.prototype.endListener_ = function( evt ){

    this.dispatchEvent( new zz.ui.events.ViewportActionEnd( evt ) );
};

/**
 * Listener for goog.events.EventType.MOUSEDOWN event.
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
zz.ui.services.ViewportAction.prototype.startListener_ = function( evt ){

    this.dispatchEvent( new zz.ui.events.ViewportActionStart( evt ) );
};