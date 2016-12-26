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