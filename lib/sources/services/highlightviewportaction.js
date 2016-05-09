/**
 * @fileoverview Provide zz.ui.services.HighlightViewportAction class.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.services.HighlightViewportAction' );
goog.require( 'goog.dom' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.style' );
goog.require( 'goog.events' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.Timer' );
goog.require( 'zz.ui.enums.HighlightCss' );
goog.require( 'zz.ui.enums.HighlightConst' );
goog.require( 'zz.ui.services.ViewportAction' );

/**
 * Service for ripple effect.
 * @constructor
 */
zz.ui.services.HighlightViewportAction = function( ){

	/**
	 * Viewport action service.
	 * @type {zz.ui.services.ViewportAction}
	 * @private
	 */
	this.viewportActionSvc_ = zz.ui.services.ViewportAction.getInstance( );

	/**
	 * Show is highlight process in progress.
	 * @type {boolean}
	 * @private
	 */
	this.highlightInProgress_ = false;

	/**
	 * Emergency highlighting reset Timeout identifier.
	 * @type {number}
	 * @private
	 */
	this.highlightTimerId_ = undefined;

	/**
	 * Element to highlight while current viewport action.
	 * @type {Element|HTMLElement|Node}
	 * @private
	 */
	this.highlightedElement_ = undefined;

	/**
	 * Element which will be used for highlighting process.
	 * @type {Element|HTMLElement|Node}
	 * @private
	 */
	this.highlightElement_ = undefined;

	/**
	 * Highlight centering flag.
	 * @type {boolean}
	 * @private
	 */
	this.centeringFlag_ = false;

	/**
	 * Highlighting start X-coordinate.
	 * @type {number}
	 * @private
	 */
	this.x_ = 0;

	/**
	 * Highlighting start Y-coordinate.
	 * @type {number}
	 * @private
	 */
	this.y_ = 0;

	/**
	 * Bounded rect for highlighting.
	 * @type {goog.math.Rect}
	 * @private
	 */
	this.boundedRect_ = undefined;

	/**
	 * Highlight element offset.
	 * @type {string}
	 * @private
	 */
	this.highlightOffset_ = undefined;

	// Viewport action start event handling.
	goog.events.listen(

		this.viewportActionSvc_,
		zz.ui.enums.EventType.VIEWPORT_ACTION_START,
		this.viewportActionStartListener_,
		false,
		this );

	// Viewport action end event handling.
	goog.events.listen(

		this.viewportActionSvc_,
		zz.ui.enums.EventType.VIEWPORT_ACTION_END,
		this.viewportActionEndListener_,
		false,
		this )
};
goog.addSingletonGetter( zz.ui.services.HighlightViewportAction );

/**
 * Return true if current HTML branch must be highlighted, false otherwise.
 * @param {Element|HTMLElement|Node} element
 * @returns {boolean}
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.isHighlightedBranch_ = function( element ){

	var result = false;
	do{

		result = goog.dom.classlist.contains(

			element,
			zz.ui.enums.HighlightCss.HIGHLIGHTED_ELEMENT );

		if( result ){

			this.highlightedElement_ = element;

		}else{

			element = goog.dom.getParentElement( element );
		}
	}while( element && !result );
	return result;
};

/**
 * Add necessary DOM to highlighted element if it not patched yet.
 * TODO (buntarb): Async patch all highlighted elements across current view.
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.patchHighlightedElement_ = function( ){

	if( !goog.dom.classlist.contains(

		this.highlightedElement_,
		zz.ui.enums.HighlightCss.HIGHLIGHTED_ELEMENT_PATCHED ) ){

		goog.dom.appendChild(

			this.highlightedElement_,
			goog.dom.createDom(

				goog.dom.TagName.SPAN, {

					'class': zz.ui.enums.HighlightCss.HIGHLIGHTED_ELEMENT_CONTAINER },

				goog.dom.createDom(

					goog.dom.TagName.SPAN, {

						'class': zz.ui.enums.HighlightCss.HIGHLIGHT } ) ) );

		goog.dom.classlist.add(

			this.highlightedElement_,
			zz.ui.enums.HighlightCss.HIGHLIGHTED_ELEMENT_PATCHED );
	}
};

/**
 * Restore service properties to start state.
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.resetState_ = function( ){

	this.highlightElement_ = goog.dom.getElementByClass(

		zz.ui.enums.HighlightCss.HIGHLIGHT,
		this.highlightedElement_ );

	this.centeringFlag_ = goog.dom.classlist.contains(

		this.highlightedElement_,
		zz.ui.enums.HighlightCss.HIGHLIGHT_CENTER );

	this.x_ = 0;
	this.y_ = 0;
	this.boundedRect_ = goog.style.getBounds( this.highlightedElement_ );
};

/**
 * Listener for animation start event.
 * @param {zz.ui.events.ViewportActionStart} evt
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.viewportActionStartListener_ = function( evt ){

	if( !this.highlightInProgress_ && this.isHighlightedBranch_( evt.original.target ) ){

		this.highlightInProgress_ = true;
		this.patchHighlightedElement_( );
		this.resetState_( );
		this.startHighlighting_( evt );
	}
};

/**
 * Start highlight process.
 * @param {zz.ui.events.ViewportActionStart} evt
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.startHighlighting_ = function( evt ){

	var highlightSize = Math.sqrt(

		this.boundedRect_.width * this.boundedRect_.width +
			this.boundedRect_.height * this.boundedRect_.height

	) * 2 + 2;
	goog.style.setStyle( this.highlightElement_, {

		'width': highlightSize + 'px',
		'height': highlightSize + 'px'
	} );
	if( ( evt.original.clientX === 0 && evt.original.clientY === 0 ) || this.centeringFlag_ ){

		// Calc highlighting start point for keyboard
		// click and centered highlighting.
		this.x_ = Math.round( this.boundedRect_.width / 2 );
		this.y_ = Math.round( this.boundedRect_.height / 2 );

	}else{

		this.x_ = Math.round( evt.clientX - this.boundedRect_.left );
		this.y_ = Math.round( evt.clientY - this.boundedRect_.top );
	}
	this.setHighlightStyles( );
};

/**
 * Sets the ripple styles.
 */
zz.ui.services.HighlightViewportAction.prototype.setHighlightStyles = function( ){

	if( this.highlightElement_ !== null ){

		// add visibility
		goog.dom.classlist.add(

			this.highlightElement_,
			zz.ui.enums.HighlightCss.IS_VISIBLE );

		// remove transition
		goog.dom.classlist.remove(

			this.highlightElement_,
			zz.ui.enums.HighlightCss.IS_ANIMATING );

		this.highlightOffset_ = 'translate3d(' + this.x_ + 'px, ' + this.y_ + 'px, 0)';
		this.setHighlightPosition_( );
		goog.Timer.callOnce( this.startHighlightAnimation_, 0, this );
	}
};

/**
 * Set highlight element start position styles.
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.setHighlightPosition_ = function( ){

	goog.style.setStyle( this.highlightElement_, {

		'webkitTransform': zz.ui.enums.HighlightConst.DEFAULT_TRANSLATE + ' ' +

			this.highlightOffset_ + ' ' +
			zz.ui.enums.HighlightConst.INITIAL_SCALE,

		'msTransform': zz.ui.enums.HighlightConst.DEFAULT_TRANSLATE + ' ' +

			this.highlightOffset_ + ' ' +
			zz.ui.enums.HighlightConst.INITIAL_SCALE,

		'transform': zz.ui.enums.HighlightConst.DEFAULT_TRANSLATE + ' ' +

			this.highlightOffset_ + ' ' +
			zz.ui.enums.HighlightConst.INITIAL_SCALE } );
};

/**
 * Start highlight animation.
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.startHighlightAnimation_ = function( ){

	goog.dom.classlist.add(

		this.highlightElement_,
		zz.ui.enums.HighlightCss.IS_ANIMATING );

	goog.style.setStyle( this.highlightElement_, {

		'webkitTransform': zz.ui.enums.HighlightConst.DEFAULT_TRANSLATE + ' ' +

			this.highlightOffset_ + ' ' +
			zz.ui.enums.HighlightConst.FINAL_SCALE,

		'msTransform': zz.ui.enums.HighlightConst.DEFAULT_TRANSLATE + ' ' +

			this.highlightOffset_ + ' ' +
			zz.ui.enums.HighlightConst.FINAL_SCALE,

		'transform': zz.ui.enums.HighlightConst.DEFAULT_TRANSLATE + ' ' +

			this.highlightOffset_ + ' ' +
			zz.ui.enums.HighlightConst.FINAL_SCALE } );
};

/**
 * Listener for animation end event.
 * @param {zz.ui.events.ViewportActionEnd} evt
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.viewportActionEndListener_ = function( evt ){

	if( this.highlightInProgress_ &&
		this.isHighlightedBranch_( evt.original.target ) ){

		// If everything OK this timer must fired in the
		// end of events queue.
		goog.Timer.callOnce( this.endHighlight_, 0, this );
	}
	// If something goes wrong this timer will fired after 300ms after
	// viewport action was end.
	this.highlightTimerId_ = goog.Timer.callOnce( this.endHighlight_, 300, this );
};

/**
 * End highlight process. Allow a repaint to occur before removing this class,
 * so the animation shows for tap events, which seem to trigger a mouseup too
 * soon after mousedown.
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.endHighlight_ = function( ){

	if( ~this.highlightTimerId_ ){

		goog.Timer.clear( this.highlightTimerId_ );
	}
	if( this.highlightElement_ ){

		goog.dom.classlist.remove(

			this.highlightElement_,
			zz.ui.enums.HighlightCss.IS_VISIBLE );
	}
	this.highlightInProgress_ = false;
	this.highlightElement_ = undefined;
	this.highlightTimerId_ = undefined;
};