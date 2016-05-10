/**
 * @fileoverview Provide zz.ui.services.ViewportAction class.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
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

		document, [

			goog.events.EventType.MOUSEDOWN,
			goog.events.EventType.TOUCHSTART ],

		this.startListener_,
		false,
		this );

    goog.events.listen(

        document, [

			goog.events.EventType.MOUSEUP,
			goog.events.EventType.MOUSELEAVE,
			goog.events.EventType.TOUCHEND,
			goog.events.EventType.BLUR ],

        this.endListener_,
        false,
        this );

	/**
	 * Ignoring mouse event for touch devices.
	 * @type {boolean}
	 * @private
	 */
	this.ignorMouseDown_ = false;
};
goog.inherits( zz.ui.services.ViewportAction, goog.events.EventTarget );
goog.addSingletonGetter( zz.ui.services.ViewportAction );

/**
 * Listener for goog.events.EventType.MOUSEDOWN event.
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
zz.ui.services.ViewportAction.prototype.startListener_ = function( evt ){

	if( evt.type === goog.events.EventType.MOUSEDOWN && this.ignorMouseDown_ ){

		this.ignorMouseDown_ = false;

	}else{

		if( evt.type === goog.events.EventType.TOUCHSTART ){

			this.ignorMouseDown_ = true;
		}
		this.dispatchEvent( new zz.ui.events.ViewportActionStart( evt ) );
	}
};

/**
 * Listener for goog.events.EventType.MOUSEUP event.
 * @param {goog.events.BrowserEvent} evt
 * @private
 */
zz.ui.services.ViewportAction.prototype.endListener_ = function( evt ){

    this.dispatchEvent( new zz.ui.events.ViewportActionEnd( evt ) );
};