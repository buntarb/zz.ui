// Copyright 2016 Artem Lytvynov <buntarb@gmail.com>. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @license Apache-2.0
 * @copyright Artem Lytvynov <buntarb@gmail.com>
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