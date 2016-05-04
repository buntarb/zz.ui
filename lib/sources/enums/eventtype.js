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

    VIEWPORT_ACTION_START:  goog.events.getUniqueId( 'viewport_action_start' ),
    VIEWPORT_ACTION_END:  goog.events.getUniqueId( 'viewport_action_end' )
};