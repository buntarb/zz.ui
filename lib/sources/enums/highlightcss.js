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

goog.provide( 'zz.ui.enums.HighlightCss' );


/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.enums.HighlightCss = {

    HIGHLIGHTED_ELEMENT: goog.getCssName('highlighted-element'),
    HIGHLIGHTED_ELEMENT_PATCHED: goog.getCssName('highlighted-element-patched'),
    HIGHLIGHTED_ELEMENT_CONTAINER: goog.getCssName( 'highlighted-element-container' ),

	HIGHLIGHT: goog.getCssName('highlight'),
    HIGHLIGHT_CENTER: goog.getCssName('highlight--center'),

    IS_ANIMATING: goog.getCssName('is-animating'),
    IS_VISIBLE: goog.getCssName('is-visible')
};