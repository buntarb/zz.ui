/**
 * @fileoverview Provide zz.ui.services.PopupRegister class.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.services.PopupRegister' );

goog.require( 'goog.events' );
goog.require( 'goog.object' );

goog.require( 'zz.ui.enums.EventType' );
goog.require( 'zz.ui.services.ViewportAction' );

/**
 * Service for modal windows and popups.
 * @constructor
 */
zz.ui.services.PopupRegister = function( ){

    /**
     * Stack of popups which must be closed by clicking on window document.
     * @type {Object}
     * @private
     */
    this.closable_ = { };

    /**
     * Viewport action service.
     * @type {zz.ui.services.ViewportAction}
     */
    this.viewportActionSvc = zz.ui.services.ViewportAction.getInstance( );

    goog.events.listen(

        this.viewportActionSvc,
        zz.ui.enums.EventType.VIEWPORT_ACTION_END,
        this.viewportActionListener_,
        false,
        this );
};
goog.addSingletonGetter( zz.ui.services.PopupRegister );

/**
 * Listener for animation end event.
 * @this {zz.ui.services.PopupRegister}
 * @private
 */
zz.ui.services.PopupRegister.prototype.viewportActionListener_ = function( ){

    goog.object.forEach( this.closable_, function( popup ){

        if( popup.isVisible( ) ){

            popup.setVisible( false );
        }
    }, this );
};

/**
 * Add closable popup to storage.
 * @param {goog.ui.Control} popup
 */
zz.ui.services.PopupRegister.prototype.addClosable = function( popup ){

    // TODO: Add assertion.
    this.closable_[ goog.getUid( popup ) ] = popup;

};

/**
 * Remove closable popup to storage.
 * @param {goog.ui.Control} popup
 */
zz.ui.services.PopupRegister.prototype.removeClosable = function( popup ){

    delete this.closable_[ goog.getUid( popup ) ];
};