/**
 * @fileoverview Provide zz.ui.services.HighlightViewportAction class.
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.services.HighlightViewportAction' );

goog.require( 'goog.events' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.dom' );
goog.require( 'goog.style' );
goog.require( 'goog.Timer' );

goog.require( 'zz.ui.services.ViewportAction' );
goog.require( 'zz.ui.enums.HighlightCss' );
goog.require( 'zz.ui.enums.HighlightConst' );

/**
 * Service for ripple effect.
 * @constructor
 */
zz.ui.services.HighlightViewportAction = function( ){

    /**
     * Determine is service in progress.
     * @type {boolean}
     * @private
     */
    this.highlightInProgress_ = false;

    /**
     * Viewport action service.
     * @type {zz.ui.services.ViewportAction}
     * @private
     */
    this.viewportActionSvc_ = zz.ui.services.ViewportAction.getInstance( );

    goog.events.listen(

        this.viewportActionSvc_,
        zz.ui.enums.EventType.VIEWPORT_ACTION_START,
        this.viewportActionStartListener_,
        false,
        this );

    goog.events.listen(

        this.viewportActionSvc_,
        zz.ui.enums.EventType.VIEWPORT_ACTION_END,
        this.viewportActionEndListener_,
        false,
        this )
};

goog.addSingletonGetter( zz.ui.services.HighlightViewportAction );
/**
 * Listener for animation start event.
 * @param {zz.ui.events.ViewportActionStart} evt
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.viewportActionStartListener_ = function( evt ){

    if( !this.highlightInProgress_ && this.isHighlighted_( evt.original.target ) ){

        this.highlightInProgress_ = true;
        this.patchHighlightedElement_( evt );
        this.restoreState_( evt );
        this.startAnimation_( evt );
    }
};

/**
 * Listener for animation end event.
 * @param {zz.ui.events.ViewportActionEnd} evt
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.viewportActionEndListener_ = function( evt ){

    if( this.highlightInProgress_ &&
        this.isHighlighted_( evt.original.target ) &&
        this.highlightElement_ === goog.dom.getElementByClass( zz.ui.enums.HighlightCss.HIGHLIGHT, evt.original.target ) ){

        this.endAnimation_( evt );
    }
};

/**
 * Patch highlighted element.
 * @param {zz.ui.events.ViewportActionStart} evt
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.patchHighlightedElement_ = function( evt ){

    if( !goog.dom.classlist.contains( evt.original.target, zz.ui.enums.HighlightCss.HIGHLIGHTED_ELEMENT_PATCHED ) ){

        goog.dom.appendChild( evt.original.target, goog.dom.createDom( goog.dom.TagName.SPAN, {

            'class': zz.ui.enums.HighlightCss.HIGHLIGHTED_ELEMENT_CONTAINER

        }, goog.dom.createDom( goog.dom.TagName.SPAN, {

            'class': zz.ui.enums.HighlightCss.HIGHLIGHT
        } ) ) );
        goog.dom.classlist.add( evt.original.target, zz.ui.enums.HighlightCss.HIGHLIGHTED_ELEMENT_PATCHED );
    }
};

/**
 * Patch highlighted element.
 * @param {zz.ui.events.ViewportActionStart} evt
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.restoreState_ = function( evt ){

    /**
     * Centering flag.
     * @type {boolean}
     * @private
     */
    this.centeringFlag_ = goog.dom.classlist.contains(

        this.highlightedElement_,
        zz.ui.enums.HighlightCss.HIGHLIGHT_CENTER );

    /**
     * Ripple element.
     * @type {Element}
     * @private
     */
    this.highlightElement_ = goog.dom.getElementByClass(

        zz.ui.enums.HighlightCss.HIGHLIGHT,
        this.highlightedElement_ );

    /**
     * Frame count.
     * @type {number}
     * @private
     */
    this.frameCount_ = 0;

    /**
     * Ripple size.
     * @type {number}
     * @private
     */
    this.highlightSize_ = 0;

    /**
     * X-coordinate.
     * @type {number}
     * @private
     */
    this.x_ = 0;

    /**
     * Y-coordinate.
     * @type {number}
     * @private
     */
    this.y_ = 0;
};

/**
 * Handles an animation frame.
 */
zz.ui.services.HighlightViewportAction.prototype.animationFrameHandler = function( ){

    if( this.frameCount_-- > 0 ){

        window.requestAnimationFrame( goog.bind( this.animationFrameHandler, this ) );

    }else{

        this.setHighlightStyles( false );
    }
};

/**
 * Handle mouse/finger down on element.
 * @param {zz.ui.events.ViewportActionStart} evt
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.startAnimation_ = function( evt ) {

    if ( !goog.style.getStyle( this.highlightElement_, 'width' ) && !goog.style.getStyle( this.highlightElement_, 'height' ) ) {

        var rect = goog.style.getBounds( evt.original.target );
        this.boundHeight = rect.height;
        this.boundWidth = rect.width;
        this.highlightSize_ = Math.sqrt( rect.width * rect.width + rect.height * rect.height ) * 2 + 2;
        goog.style.setStyle( this.highlightElement_, {

            'width': this.highlightSize_ + 'px',
            'height': this.highlightSize_ + 'px'
        });
    }
    //noinspection JSValidateTypes
    goog.dom.classlist.add( this.highlightElement_, zz.ui.enums.HighlightCss.IS_VISIBLE );
    var frameCount = this.getFrameCount( );
    if ( frameCount > 0 ) {

        return;
    }
    this.setFrameCount( 1 );
    var bound = goog.style.getBounds( evt.original.target );
    var x;
    var y;
    // Check if we are handling a keyboard click.
    if ( event.clientX === 0 && event.clientY === 0 ){

        x = Math.round( bound.width / 2 );
        y = Math.round( bound.height / 2 );

    } else {

        // TODO (buntarb): Test this code.
        var clientX = event.clientX ? event.clientX : event.getBrowserEvent( ).touches[0].clientX;
        var clientY = event.clientY ? event.clientY : event.getBrowserEvent( ).touches[0].clientY;
        x = Math.round( clientX - bound.left );
        y = Math.round( clientY - bound.top );
    }
    this.setHighlightXY( x, y );
    this.setHighlightStyles( true );
    window.requestAnimationFrame( goog.bind( this.animationFrameHandler, this ) );
};

/**
 * Handle mouse / finger up on element.
 * @param {zz.ui.events.ViewportActionStart} evt
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.endAnimation_ = function( evt ){

    // Don't fire for the artificial "mouseup" generated by a double-click.
    if( evt && evt.original.getBrowserEvent( ).detail !== 2 ){

        //noinspection JSValidateTypes
        goog.dom.classlist.remove( this.highlightElement_, zz.ui.enums.HighlightCss.IS_VISIBLE );
    }
    // Allow a repaint to occur before removing this class, so the animation
    // shows for tap events, which seem to trigger a mouseup too soon after
    // mousedown.
    goog.Timer.callOnce( function( ){

        //noinspection JSPotentiallyInvalidUsageOfThis,JSValidateTypes
        goog.dom.classlist.remove( this.highlightElement_, zz.ui.enums.HighlightCss.IS_VISIBLE );
        this.highlightInProgress_ = false;
        this.highlightElement_ = null;

    }, 0, this );
};

/**
 * Sets the ripple styles.
 * @param  {boolean} start whether or not this is the start frame.
 */
zz.ui.services.HighlightViewportAction.prototype.setHighlightStyles = function( start ){

    if( this.highlightElement_ !== null ){

        var transformString;
        var scale;
        var offset = 'translate(' + this.x_ + 'px, ' + this.y_ + 'px)';
        if( start ){

            scale = zz.ui.enums.HighlightConst.INITIAL_SCALE;

        }else{

            scale = zz.ui.enums.HighlightConst.FINAL_SCALE;
            if( this.centeringFlag_ ){

                offset = 'translate(' + this.boundWidth / 2 + 'px, ' + this.boundHeight / 2 + 'px)';
            }
        }
        transformString = 'translate(-50%, -50%) ' + offset + scale;
        goog.style.setStyle( this.highlightElement_, {

            'webkitTransform': transformString,
            'msTransform': transformString,
            'transform': transformString
        } );
        if( start ){

            goog.dom.classlist.remove(

                /** @type {Element} */( this.highlightElement_ ),
                zz.ui.enums.HighlightCss.IS_ANIMATING );

        }else{

            this.highlightElement_.classList.add( zz.ui.enums.HighlightCss.IS_ANIMATING );
        }
    }
};


/**
 * Getter for frame count.
 * @return {number}.
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.getFrameCount = function( ){

    return this.frameCount_;
};

/**
 * Setter for frame count.
 * @param {number} fc
 */
zz.ui.services.HighlightViewportAction.prototype.setFrameCount = function( fc ){

    this.frameCount_ = fc;
};

/**
 * Sets the ripple X and Y coordinates.
 * @param  {number} newX
 * @param  {number} newY
 */
zz.ui.services.HighlightViewportAction.prototype.setHighlightXY = function( newX, newY ){

    this.x_ = newX;
    this.y_ = newY;
};

/**
 * Determine is current action must be highlighted.
 * @param {Element} element
 * @returns {boolean}
 * @private
 */
zz.ui.services.HighlightViewportAction.prototype.isHighlighted_ = function( element ) {

    var result = false;
    do{

        result = goog.dom.classlist.contains(element, zz.ui.enums.HighlightCss.HIGHLIGHTED_ELEMENT);

        if( result ){

            /**
             * Highlighted element.
             * @type {Element}
             * @private
             */
            this.highlightedElement_ = element;

        }else{

            element = element.parentElement;
        }
    }while( element && !result );
    return result;
};

