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