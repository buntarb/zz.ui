/**
 * @fileoverview Provide zz.ui.enums.EventType
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.enums.EventType' );

goog.require( 'goog.events' );

/**
 * Constants for model events types.
 * @enum {string}
 */
zz.ui.enums.EventType = {

    VIEWPORT_ACTION:  goog.events.getUniqueId( 'viewport_action' )
};