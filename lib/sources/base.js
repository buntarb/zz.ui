/**
 * @fileoverview Provide zz.ui base object.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.ui' );
goog.require( 'zz.ui.templates.highlight' );
goog.require( 'zz.ui.services.HighlightViewportAction' );

/**
 * Bootstrap module method.
 */
zz.ui.bootstrap = function( ){

    var highlightSvc = zz.ui.services.HighlightViewportAction.getInstance( );
    soy.renderElement( goog.dom.getElement( 'root' ), zz.ui.templates.highlight.default );
};
goog.exportSymbol( 'zz.ui.bootstrap', zz.ui.bootstrap );