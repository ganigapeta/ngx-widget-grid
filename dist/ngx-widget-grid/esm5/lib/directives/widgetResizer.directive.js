/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, forwardRef, HostListener, Inject, Input, Renderer2 } from '@angular/core';
import { NgxWidgetGridComponent } from '../components/grid/grid.component';
import { NgxWidgetComponent } from '../components/widget/widget.component';
import { Rectangle } from '../models/Rectangle.model';
import { RESIZE_DIRECTIONS } from '../Utils';
/** @type {?} */
var MIN_HEIGHT = 42;
/** @type {?} */
var MIN_WIDTH = 42;
var NgxWidgetResizerDirective = /** @class */ (function () {
    function NgxWidgetResizerDirective(el, renderer, gridCmp, widgetCmp) {
        this.el = el;
        this.renderer = renderer;
        this.gridCmp = gridCmp;
        this.widgetCmp = widgetCmp;
        this.moveUpAllowed = false;
        this.moveDownAllowed = false;
        this.moveLeftAllowed = false;
        this.moveRightAllowed = false;
        this.enableDrag = null;
        this._onMoveListener = this.onMove.bind(this);
        this._onUpListener = this.onUp.bind(this);
        this.parentContainer = this.el.nativeElement.parentElement;
    }
    Object.defineProperty(NgxWidgetResizerDirective.prototype, "resizeDirection", {
        get: /**
         * @return {?}
         */
        function () {
            return this._resizeDirection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxWidgetResizerDirective.prototype, "ngxWidgetResizer", {
        set: /**
         * @param {?} dir
         * @return {?}
         */
        function (dir) {
            this._resizeDirection = dir;
            this.moveUpAllowed = false;
            this.moveDownAllowed = false;
            this.moveLeftAllowed = false;
            this.moveRightAllowed = false;
            switch (dir) {
                case RESIZE_DIRECTIONS.top:
                    this.moveUpAllowed = true;
                    break;
                case RESIZE_DIRECTIONS.left:
                    this.moveLeftAllowed = true;
                    break;
                case RESIZE_DIRECTIONS.bottom:
                    this.moveDownAllowed = true;
                    break;
                case RESIZE_DIRECTIONS.right:
                    this.moveRightAllowed = true;
                    break;
                case RESIZE_DIRECTIONS.topLeft:
                    this.moveUpAllowed = true;
                    this.moveLeftAllowed = true;
                    break;
                case RESIZE_DIRECTIONS.topRight:
                    this.moveUpAllowed = true;
                    this.moveRightAllowed = true;
                    break;
                case RESIZE_DIRECTIONS.bottomLeft:
                    this.moveDownAllowed = true;
                    this.moveLeftAllowed = true;
                    break;
                case RESIZE_DIRECTIONS.bottomRight:
                    this.moveDownAllowed = true;
                    this.moveRightAllowed = true;
                    break;
                default:
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NgxWidgetResizerDirective.prototype.onDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.enableDrag = this.widgetCmp.getConfig().id;
        this.renderer.addClass(this.widgetCmp.getEl().nativeElement, 'wg-resizing');
        this.renderer.addClass(this.el.nativeElement, 'dragging');
        this.startPosition = this.gridCmp.getWidgetPosition(this.widgetCmp);
        this.startRender = {
            top: Math.ceil(this.widgetCmp.getEl().nativeElement.offsetTop),
            left: Math.ceil(this.widgetCmp.getEl().nativeElement.offsetLeft),
            height: Math.floor(this.parentContainer.offsetHeight),
            width: Math.floor(this.parentContainer.offsetWidth)
        }; // pixel values
        this.startRender.bottom = this.startRender.top + this.startRender.height;
        this.startRender.right = this.startRender.left + this.startRender.width;
        /** @type {?} */
        var eventOffsetX = event.offsetX || event.layerX;
        /** @type {?} */
        var eventOffsetY = event.offsetY || event.layerY;
        this.delta = { top: 0, right: 0, bottom: 0, left: 0 };
        this.draggerOffset = {
            top: eventOffsetY,
            left: eventOffsetX,
            bottom: eventOffsetY - this.el.nativeElement.offsetHeight,
            right: eventOffsetX - this.el.nativeElement.offsetWidth
        };
        this.gridPositions = this.gridCmp.getGridRectangle();
        if (typeof PointerEvent !== 'undefined') {
            window.addEventListener('pointermove', this._onMoveListener);
            window.addEventListener('pointerup', this._onUpListener);
        }
        else {
            window.addEventListener('mousemove', this._onMoveListener);
            window.addEventListener('mouseup', this._onUpListener);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxWidgetResizerDirective.prototype.onMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            /** @type {?} */
            var eventClientX = event.clientX;
            /** @type {?} */
            var eventClientY = event.clientY;
            /** @type {?} */
            var gridDims = this.gridPositions;
            /** @type {?} */
            var startRender = this.startRender;
            /** @type {?} */
            var dragPositionX = Math.round(eventClientX) - gridDims.left;
            /** @type {?} */
            var dragPositionY = Math.round(eventClientY) - gridDims.top;
            /** @type {?} */
            var delta = this.delta;
            if (this.moveUpAllowed) {
                delta.top = Math.min(Math.max(dragPositionY - this.draggerOffset.top, 0), gridDims.height) - startRender.top;
                delta.top = Math.min(delta.top, startRender.height - MIN_HEIGHT);
            }
            else if (this.moveDownAllowed) {
                delta.bottom = startRender.bottom - Math.min(Math.max(dragPositionY - this.draggerOffset.bottom, 0), gridDims.height);
                delta.bottom = Math.min(delta.bottom, startRender.height - MIN_HEIGHT);
            }
            if (this.moveLeftAllowed) {
                delta.left = Math.min(Math.max(dragPositionX - this.draggerOffset.left, 0), gridDims.width) - startRender.left;
                delta.left = Math.min(delta.left, startRender.width - MIN_WIDTH);
            }
            else if (this.moveRightAllowed) {
                delta.right = startRender.right - Math.min(Math.max(dragPositionX - this.draggerOffset.right, 0), gridDims.width);
                delta.right = Math.min(delta.right, startRender.width - MIN_WIDTH);
            }
            /** @type {?} */
            var currentFinalPos = this.determineFinalPos();
            this.gridCmp.highlightArea(currentFinalPos);
            this.renderer.setStyle(this.parentContainer, 'top', this.delta.top + 'px');
            this.renderer.setStyle(this.parentContainer, 'left', this.delta.left + 'px');
            this.renderer.setStyle(this.parentContainer, 'bottom', this.delta.bottom + 'px');
            this.renderer.setStyle(this.parentContainer, 'right', this.delta.right + 'px');
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxWidgetResizerDirective.prototype.onUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            this.el.nativeElement.setAttribute('draggable', false);
            this.renderer.removeClass(this.el.nativeElement, 'dragging');
            this.renderer.removeClass(this.widgetCmp.getEl().nativeElement, 'wg-resizing');
            this.enableDrag = null;
            this.widgetCmp.position = this.determineFinalPos();
            this.gridCmp.updateWidget(this.widgetCmp, false);
            this.gridCmp.resetHighlights();
            // reset style
            this.renderer.removeClass(this.widgetCmp.getEl().nativeElement, 'wg-resizing');
            this.renderer.removeClass(this.el.nativeElement, 'dragging');
            this.renderer.setStyle(this.parentContainer, 'top', '');
            this.renderer.setStyle(this.parentContainer, 'left', '');
            this.renderer.setStyle(this.parentContainer, 'bottom', '');
            this.renderer.setStyle(this.parentContainer, 'right', '');
        }
        if (typeof PointerEvent !== 'undefined') {
            window.removeEventListener('pointermove', this._onMoveListener);
            window.removeEventListener('pointerup', this._onUpListener);
        }
        else {
            window.removeEventListener('mousemove', this._onMoveListener);
            window.removeEventListener('mouseup', this._onUpListener);
        }
    };
    /**
     * @param {?} start
     * @param {?} end
     * @param {?} val
     * @param {?=} reverse
     * @return {?}
     */
    NgxWidgetResizerDirective.prototype.findCollision = /**
     * @param {?} start
     * @param {?} end
     * @param {?} val
     * @param {?=} reverse
     * @return {?}
     */
    function (start, end, val, reverse) {
        if (reverse === void 0) { reverse = false; }
        /** @type {?} */
        var foundCollision = false;
        for (var i = start; i <= end; i++) {
            /** @type {?} */
            var checker = reverse ? this.gridCmp.isPointObstructed(i, val) : this.gridCmp.isPointObstructed(val, i);
            if (checker) {
                foundCollision = true;
                break;
            }
        }
        return foundCollision;
    };
    /**
     * @return {?}
     */
    NgxWidgetResizerDirective.prototype.determineFinalPos = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var finalPos = new Rectangle();
        /** @type {?} */
        var startRender = this.startRender;
        /** @type {?} */
        var delta = this.delta;
        /** @type {?} */
        var requestedStartPoint = this.gridCmp.rasterizeCoords(startRender.left + delta.left + 1, startRender.top + delta.top + 1);
        /** @type {?} */
        var requestedEndPoint = this.gridCmp.rasterizeCoords(startRender.right - delta.right - 1, startRender.bottom - delta.bottom - 1);
        /** @type {?} */
        var requestedPos = {
            top: requestedStartPoint.top,
            left: requestedStartPoint.left,
            right: requestedEndPoint.left,
            bottom: requestedEndPoint.top
        };
        /** @type {?} */
        var foundCollision;
        /** @type {?} */
        var start = Math.max(this.startPosition.left, requestedPos.left);
        /** @type {?} */
        var end = Math.min(this.startPosition.right, requestedPos.right);
        if (this.moveUpAllowed && requestedPos.top < this.startPosition.top) {
            finalPos.top = this.startPosition.top;
            while (finalPos.top > requestedPos.top) {
                // check whether adding another row above would cause any conflict
                foundCollision = this.findCollision(start, end, finalPos.top - 1);
                if (foundCollision) {
                    break;
                }
                finalPos.top--; // add row above
            }
        }
        else if (this.moveDownAllowed && requestedPos.bottom > this.startPosition.bottom) {
            finalPos.top = finalPos.top || requestedPos.top;
            finalPos.height = this.startPosition.bottom + 1 - this.startPosition.top;
            while (finalPos.bottom < requestedPos.bottom) {
                // check whether adding another row below would cause any conflict
                foundCollision = this.findCollision(start, end, finalPos.bottom + 1);
                if (foundCollision) {
                    break;
                }
                finalPos.height++; // add row below
            }
        }
        finalPos.top = finalPos.top || requestedPos.top;
        finalPos.height = finalPos.height || requestedPos.bottom + 1 - finalPos.top;
        if (this.moveLeftAllowed && requestedPos.left < this.startPosition.left) {
            finalPos.left = this.startPosition.left;
            while (finalPos.left > requestedPos.left) {
                // check whether adding another column would cause any conflict
                foundCollision = this.findCollision(finalPos.top, finalPos.bottom, finalPos.left - 1, true);
                if (foundCollision) {
                    break;
                }
                finalPos.left--; // add column
            }
        }
        else if (this.moveRightAllowed && requestedPos.right > this.startPosition.right) {
            finalPos.left = finalPos.left || requestedPos.left;
            finalPos.width = this.startPosition.right + 1 - this.startPosition.left;
            while (finalPos.right < requestedPos.right) {
                foundCollision = this.findCollision(finalPos.top, finalPos.bottom, finalPos.right + 1, true);
                if (foundCollision) {
                    break;
                }
                finalPos.width++;
            }
        }
        finalPos.left = finalPos.left || requestedPos.left;
        finalPos.width = finalPos.width || requestedPos.right + 1 - finalPos.left;
        return finalPos;
    };
    NgxWidgetResizerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngxWidgetResizer]'
                },] }
    ];
    /** @nocollapse */
    NgxWidgetResizerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgxWidgetGridComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return NgxWidgetGridComponent; }),] }] },
        { type: NgxWidgetComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return NgxWidgetComponent; }),] }] }
    ]; };
    NgxWidgetResizerDirective.propDecorators = {
        ngxWidgetResizer: [{ type: Input }],
        onDown: [{ type: HostListener, args: ['pointerdown', ['$event'],] }, { type: HostListener, args: ['mousedown', ['$event'],] }]
    };
    return NgxWidgetResizerDirective;
}());
export { NgxWidgetResizerDirective };
if (false) {
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.moveUpAllowed;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.moveDownAllowed;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.moveLeftAllowed;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.moveRightAllowed;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.parentContainer;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.startRender;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.gridPositions;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.delta;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.draggerOffset;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.startPosition;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.enableDrag;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype._resizeDirection;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype._onMoveListener;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype._onUpListener;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.el;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.renderer;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.gridCmp;
    /** @type {?} */
    NgxWidgetResizerDirective.prototype.widgetCmp;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0UmVzaXplci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2lkZ2V0LWdyaWQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy93aWRnZXRSZXNpemVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUU3QyxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBQ3RCLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQzs7SUFzQm5CLG1DQUFvQixFQUFjLEVBQ2QsVUFFQSxPQUErQixFQUUvQixTQUE2QjtRQUw3QixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVE7UUFFUixZQUFPLEdBQVAsT0FBTyxDQUF3QjtRQUUvQixjQUFTLEdBQVQsU0FBUyxDQUFvQjs2QkFwQjFCLEtBQUs7K0JBQ0gsS0FBSzsrQkFDTCxLQUFLO2dDQUNKLEtBQUs7MEJBT0gsSUFBSTsrQkFFTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7NkJBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQVExQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztLQUM1RDswQkFFVSxzREFBZTs7Ozs7WUFDeEIs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clFGLFNBQVMsU0FBQztvQkFDRSxRQUFRLEVBQUUsb0JBQW9CO2lCQUMvQjs7OztnQkFYUSxVQUFVO2dCQUEyQyxTQUFTO2dCQUN6RSxzQkFBc0IsdUJBOEJoQixNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBdEIsQ0FBc0IsQ0FBQztnQkE3QnJELGtCQUFrQix1QkErQlosTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLENBQUM7OzttQ0FTdkQsS0FBSzt5QkF3Q0wsWUFBWSxTQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUN0QyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDOztvQ0FuRnZDOztTQVlhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4V2lkZ2V0R3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvZ3JpZC9ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvd2lkZ2V0L3dpZGdldC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuLi9tb2RlbHMvUmVjdGFuZ2xlLm1vZGVsJztcclxuaW1wb3J0IHsgUkVTSVpFX0RJUkVDVElPTlMgfSBmcm9tICcuLi9VdGlscyc7XHJcblxyXG5jb25zdCBNSU5fSEVJR0hUID0gNDI7XHJcbmNvbnN0IE1JTl9XSURUSCA9IDQyO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICAgICAgICAgICBzZWxlY3RvcjogJ1tuZ3hXaWRnZXRSZXNpemVyXSdcclxuICAgICAgICAgICB9KVxyXG5leHBvcnQgY2xhc3MgTmd4V2lkZ2V0UmVzaXplckRpcmVjdGl2ZSB7XHJcblxyXG4gIHB1YmxpYyBtb3ZlVXBBbGxvd2VkID0gZmFsc2U7XHJcbiAgcHVibGljIG1vdmVEb3duQWxsb3dlZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBtb3ZlTGVmdEFsbG93ZWQgPSBmYWxzZTtcclxuICBwdWJsaWMgbW92ZVJpZ2h0QWxsb3dlZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBwYXJlbnRDb250YWluZXI6IGFueTtcclxuICBwdWJsaWMgc3RhcnRSZW5kZXI6IGFueTtcclxuICBwdWJsaWMgZ3JpZFBvc2l0aW9uczogUmVjdGFuZ2xlO1xyXG4gIHB1YmxpYyBkZWx0YTogeyB0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIGxlZnQ6IG51bWJlciB9O1xyXG4gIHB1YmxpYyBkcmFnZ2VyT2Zmc2V0OiB7IHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgbGVmdDogbnVtYmVyIH07XHJcbiAgcHVibGljIHN0YXJ0UG9zaXRpb246IFJlY3RhbmdsZTtcclxuICBwdWJsaWMgZW5hYmxlRHJhZzogc3RyaW5nID0gbnVsbDtcclxuICBwdWJsaWMgX3Jlc2l6ZURpcmVjdGlvbjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX29uTW92ZUxpc3RlbmVyID0gdGhpcy5vbk1vdmUuYmluZCh0aGlzKTtcclxuICBwcml2YXRlIF9vblVwTGlzdGVuZXIgPSB0aGlzLm9uVXAuYmluZCh0aGlzKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5neFdpZGdldEdyaWRDb21wb25lbnQpKVxyXG4gICAgICAgICAgICAgIHByaXZhdGUgZ3JpZENtcDogTmd4V2lkZ2V0R3JpZENvbXBvbmVudCxcclxuICAgICAgICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmd4V2lkZ2V0Q29tcG9uZW50KSlcclxuICAgICAgICAgICAgICBwcml2YXRlIHdpZGdldENtcDogTmd4V2lkZ2V0Q29tcG9uZW50KSB7XHJcbiAgICB0aGlzLnBhcmVudENvbnRhaW5lciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCByZXNpemVEaXJlY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzaXplRGlyZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgc2V0IG5neFdpZGdldFJlc2l6ZXIoZGlyOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3Jlc2l6ZURpcmVjdGlvbiA9IGRpcjtcclxuICAgIHRoaXMubW92ZVVwQWxsb3dlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5tb3ZlRG93bkFsbG93ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMubW92ZUxlZnRBbGxvd2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLm1vdmVSaWdodEFsbG93ZWQgPSBmYWxzZTtcclxuICAgIHN3aXRjaCAoZGlyKSB7XHJcbiAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMudG9wOlxyXG4gICAgICAgIHRoaXMubW92ZVVwQWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMubGVmdDpcclxuICAgICAgICB0aGlzLm1vdmVMZWZ0QWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMuYm90dG9tOlxyXG4gICAgICAgIHRoaXMubW92ZURvd25BbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBSRVNJWkVfRElSRUNUSU9OUy5yaWdodDpcclxuICAgICAgICB0aGlzLm1vdmVSaWdodEFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFJFU0laRV9ESVJFQ1RJT05TLnRvcExlZnQ6XHJcbiAgICAgICAgdGhpcy5tb3ZlVXBBbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1vdmVMZWZ0QWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMudG9wUmlnaHQ6XHJcbiAgICAgICAgdGhpcy5tb3ZlVXBBbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1vdmVSaWdodEFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFJFU0laRV9ESVJFQ1RJT05TLmJvdHRvbUxlZnQ6XHJcbiAgICAgICAgdGhpcy5tb3ZlRG93bkFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubW92ZUxlZnRBbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBSRVNJWkVfRElSRUNUSU9OUy5ib3R0b21SaWdodDpcclxuICAgICAgICB0aGlzLm1vdmVEb3duQWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tb3ZlUmlnaHRBbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgWyckZXZlbnQnXSlcclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxyXG4gIG9uRG93bihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuZW5hYmxlRHJhZyA9IHRoaXMud2lkZ2V0Q21wLmdldENvbmZpZygpLmlkO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLndpZGdldENtcC5nZXRFbCgpLm5hdGl2ZUVsZW1lbnQsICd3Zy1yZXNpemluZycpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnZ2luZycpO1xyXG4gICAgdGhpcy5zdGFydFBvc2l0aW9uID0gdGhpcy5ncmlkQ21wLmdldFdpZGdldFBvc2l0aW9uKHRoaXMud2lkZ2V0Q21wKTtcclxuXHJcbiAgICB0aGlzLnN0YXJ0UmVuZGVyID0ge1xyXG4gICAgICB0b3A6IE1hdGguY2VpbCh0aGlzLndpZGdldENtcC5nZXRFbCgpLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wKSxcclxuICAgICAgbGVmdDogTWF0aC5jZWlsKHRoaXMud2lkZ2V0Q21wLmdldEVsKCkubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0KSxcclxuICAgICAgaGVpZ2h0OiBNYXRoLmZsb29yKHRoaXMucGFyZW50Q29udGFpbmVyLm9mZnNldEhlaWdodCksXHJcbiAgICAgIHdpZHRoOiBNYXRoLmZsb29yKHRoaXMucGFyZW50Q29udGFpbmVyLm9mZnNldFdpZHRoKVxyXG4gICAgfTsgLy8gcGl4ZWwgdmFsdWVzXHJcbiAgICB0aGlzLnN0YXJ0UmVuZGVyLmJvdHRvbSA9IHRoaXMuc3RhcnRSZW5kZXIudG9wICsgdGhpcy5zdGFydFJlbmRlci5oZWlnaHQ7XHJcbiAgICB0aGlzLnN0YXJ0UmVuZGVyLnJpZ2h0ID0gdGhpcy5zdGFydFJlbmRlci5sZWZ0ICsgdGhpcy5zdGFydFJlbmRlci53aWR0aDtcclxuXHJcbiAgICBjb25zdCBldmVudE9mZnNldFggPSBldmVudC5vZmZzZXRYIHx8IGV2ZW50LmxheWVyWDtcclxuICAgIGNvbnN0IGV2ZW50T2Zmc2V0WSA9IGV2ZW50Lm9mZnNldFkgfHwgZXZlbnQubGF5ZXJZO1xyXG5cclxuICAgIHRoaXMuZGVsdGEgPSB7dG9wOiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwfTtcclxuICAgIHRoaXMuZHJhZ2dlck9mZnNldCA9IHtcclxuICAgICAgdG9wOiBldmVudE9mZnNldFksXHJcbiAgICAgIGxlZnQ6IGV2ZW50T2Zmc2V0WCxcclxuICAgICAgYm90dG9tOiBldmVudE9mZnNldFkgLSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICByaWdodDogZXZlbnRPZmZzZXRYIC0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ3JpZFBvc2l0aW9ucyA9IHRoaXMuZ3JpZENtcC5nZXRHcmlkUmVjdGFuZ2xlKCk7XHJcbiAgICBpZiAodHlwZW9mIFBvaW50ZXJFdmVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5fb25Nb3ZlTGlzdGVuZXIpO1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgdGhpcy5fb25VcExpc3RlbmVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdmVMaXN0ZW5lcik7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25VcExpc3RlbmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTW92ZShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgaWYgKHRoaXMuZW5hYmxlRHJhZyA9PT0gdGhpcy53aWRnZXRDbXAuZ2V0Q29uZmlnKCkuaWQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgZXZlbnRDbGllbnRYID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgY29uc3QgZXZlbnRDbGllbnRZID0gZXZlbnQuY2xpZW50WTtcclxuICAgICAgY29uc3QgZ3JpZERpbXMgPSB0aGlzLmdyaWRQb3NpdGlvbnM7XHJcbiAgICAgIGNvbnN0IHN0YXJ0UmVuZGVyID0gdGhpcy5zdGFydFJlbmRlcjtcclxuICAgICAgLy8gbm9ybWFsaXplIHRoZSBkcmFnIHBvc2l0aW9uXHJcbiAgICAgIGNvbnN0IGRyYWdQb3NpdGlvblggPSBNYXRoLnJvdW5kKGV2ZW50Q2xpZW50WCkgLSBncmlkRGltcy5sZWZ0O1xyXG4gICAgICBjb25zdCBkcmFnUG9zaXRpb25ZID0gTWF0aC5yb3VuZChldmVudENsaWVudFkpIC0gZ3JpZERpbXMudG9wO1xyXG4gICAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGVsdGE7XHJcbiAgICAgIGlmICh0aGlzLm1vdmVVcEFsbG93ZWQpIHtcclxuICAgICAgICBkZWx0YS50b3AgPSBNYXRoLm1pbihNYXRoLm1heChkcmFnUG9zaXRpb25ZIC0gdGhpcy5kcmFnZ2VyT2Zmc2V0LnRvcCwgMCksIGdyaWREaW1zLmhlaWdodCkgLSBzdGFydFJlbmRlci50b3A7XHJcbiAgICAgICAgZGVsdGEudG9wID0gTWF0aC5taW4oZGVsdGEudG9wLCBzdGFydFJlbmRlci5oZWlnaHQgLSBNSU5fSEVJR0hUKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm1vdmVEb3duQWxsb3dlZCkge1xyXG4gICAgICAgIGRlbHRhLmJvdHRvbSA9IHN0YXJ0UmVuZGVyLmJvdHRvbSAtIE1hdGgubWluKE1hdGgubWF4KGRyYWdQb3NpdGlvblkgLSB0aGlzLmRyYWdnZXJPZmZzZXQuYm90dG9tLCAwKSwgZ3JpZERpbXMuaGVpZ2h0KTtcclxuICAgICAgICBkZWx0YS5ib3R0b20gPSBNYXRoLm1pbihkZWx0YS5ib3R0b20sIHN0YXJ0UmVuZGVyLmhlaWdodCAtIE1JTl9IRUlHSFQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5tb3ZlTGVmdEFsbG93ZWQpIHtcclxuICAgICAgICBkZWx0YS5sZWZ0ID0gTWF0aC5taW4oTWF0aC5tYXgoZHJhZ1Bvc2l0aW9uWCAtIHRoaXMuZHJhZ2dlck9mZnNldC5sZWZ0LCAwKSwgZ3JpZERpbXMud2lkdGgpIC0gc3RhcnRSZW5kZXIubGVmdDtcclxuICAgICAgICBkZWx0YS5sZWZ0ID0gTWF0aC5taW4oZGVsdGEubGVmdCwgc3RhcnRSZW5kZXIud2lkdGggLSBNSU5fV0lEVEgpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMubW92ZVJpZ2h0QWxsb3dlZCkge1xyXG4gICAgICAgIGRlbHRhLnJpZ2h0ID0gc3RhcnRSZW5kZXIucmlnaHQgLSBNYXRoLm1pbihNYXRoLm1heChkcmFnUG9zaXRpb25YIC0gdGhpcy5kcmFnZ2VyT2Zmc2V0LnJpZ2h0LCAwKSwgZ3JpZERpbXMud2lkdGgpO1xyXG4gICAgICAgIGRlbHRhLnJpZ2h0ID0gTWF0aC5taW4oZGVsdGEucmlnaHQsIHN0YXJ0UmVuZGVyLndpZHRoIC0gTUlOX1dJRFRIKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY3VycmVudEZpbmFsUG9zID0gdGhpcy5kZXRlcm1pbmVGaW5hbFBvcygpO1xyXG4gICAgICB0aGlzLmdyaWRDbXAuaGlnaGxpZ2h0QXJlYShjdXJyZW50RmluYWxQb3MpO1xyXG5cclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudENvbnRhaW5lciwgJ3RvcCcsIHRoaXMuZGVsdGEudG9wICsgJ3B4Jyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRDb250YWluZXIsICdsZWZ0JywgdGhpcy5kZWx0YS5sZWZ0ICsgJ3B4Jyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRDb250YWluZXIsICdib3R0b20nLCB0aGlzLmRlbHRhLmJvdHRvbSArICdweCcpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyZW50Q29udGFpbmVyLCAncmlnaHQnLCB0aGlzLmRlbHRhLnJpZ2h0ICsgJ3B4Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblVwKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5lbmFibGVEcmFnID09PSB0aGlzLndpZGdldENtcC5nZXRDb25maWcoKS5pZCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ2dpbmcnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLndpZGdldENtcC5nZXRFbCgpLm5hdGl2ZUVsZW1lbnQsICd3Zy1yZXNpemluZycpO1xyXG4gICAgICB0aGlzLmVuYWJsZURyYWcgPSBudWxsO1xyXG4gICAgICB0aGlzLndpZGdldENtcC5wb3NpdGlvbiA9IHRoaXMuZGV0ZXJtaW5lRmluYWxQb3MoKTtcclxuICAgICAgdGhpcy5ncmlkQ21wLnVwZGF0ZVdpZGdldCh0aGlzLndpZGdldENtcCwgZmFsc2UpO1xyXG4gICAgICB0aGlzLmdyaWRDbXAucmVzZXRIaWdobGlnaHRzKCk7XHJcblxyXG4gICAgICAvLyByZXNldCBzdHlsZVxyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMud2lkZ2V0Q21wLmdldEVsKCkubmF0aXZlRWxlbWVudCwgJ3dnLXJlc2l6aW5nJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ2dpbmcnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudENvbnRhaW5lciwgJ3RvcCcsICcnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudENvbnRhaW5lciwgJ2xlZnQnLCAnJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRDb250YWluZXIsICdib3R0b20nLCAnJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRDb250YWluZXIsICdyaWdodCcsICcnKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgUG9pbnRlckV2ZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLl9vbk1vdmVMaXN0ZW5lcik7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCB0aGlzLl9vblVwTGlzdGVuZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW92ZUxpc3RlbmVyKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vblVwTGlzdGVuZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmluZENvbGxpc2lvbihzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgdmFsOiBudW1iZXIsIHJldmVyc2UgPSBmYWxzZSk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGZvdW5kQ29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcclxuICAgICAgY29uc3QgY2hlY2tlciA9IHJldmVyc2UgPyB0aGlzLmdyaWRDbXAuaXNQb2ludE9ic3RydWN0ZWQoaSwgdmFsKSA6IHRoaXMuZ3JpZENtcC5pc1BvaW50T2JzdHJ1Y3RlZCh2YWwsIGkpO1xyXG4gICAgICBpZiAoY2hlY2tlcikge1xyXG4gICAgICAgIGZvdW5kQ29sbGlzaW9uID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvdW5kQ29sbGlzaW9uO1xyXG4gIH1cclxuXHJcbiAgZGV0ZXJtaW5lRmluYWxQb3MoKTogYW55IHtcclxuICAgIGNvbnN0IGZpbmFsUG9zOiBSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XHJcbiAgICBjb25zdCBzdGFydFJlbmRlciA9IHRoaXMuc3RhcnRSZW5kZXI7XHJcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGVsdGE7XHJcbiAgICBjb25zdCByZXF1ZXN0ZWRTdGFydFBvaW50ID0gdGhpcy5ncmlkQ21wLnJhc3Rlcml6ZUNvb3JkcyhzdGFydFJlbmRlci5sZWZ0ICsgZGVsdGEubGVmdCArIDEsIHN0YXJ0UmVuZGVyLnRvcCArIGRlbHRhLnRvcCArIDEpO1xyXG4gICAgY29uc3QgcmVxdWVzdGVkRW5kUG9pbnQgPSB0aGlzLmdyaWRDbXAucmFzdGVyaXplQ29vcmRzKHN0YXJ0UmVuZGVyLnJpZ2h0IC0gZGVsdGEucmlnaHQgLSAxLCBzdGFydFJlbmRlci5ib3R0b20gLSBkZWx0YS5ib3R0b20gLSAxKTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0ZWRQb3MgPSB7XHJcbiAgICAgIHRvcDogcmVxdWVzdGVkU3RhcnRQb2ludC50b3AsXHJcbiAgICAgIGxlZnQ6IHJlcXVlc3RlZFN0YXJ0UG9pbnQubGVmdCxcclxuICAgICAgcmlnaHQ6IHJlcXVlc3RlZEVuZFBvaW50LmxlZnQsXHJcbiAgICAgIGJvdHRvbTogcmVxdWVzdGVkRW5kUG9pbnQudG9wXHJcbiAgICB9O1xyXG4gICAgLy8gZGV0ZXJtaW5lIGEgc3VpdGFibGUgZmluYWwgcG9zaXRpb24gKG9uZSB0aGF0IGlzIG5vdCBvYnN0cnVjdGVkKVxyXG4gICAgbGV0IGZvdW5kQ29sbGlzaW9uO1xyXG4gICAgY29uc3Qgc3RhcnQgPSBNYXRoLm1heCh0aGlzLnN0YXJ0UG9zaXRpb24ubGVmdCwgcmVxdWVzdGVkUG9zLmxlZnQpO1xyXG4gICAgY29uc3QgZW5kID0gTWF0aC5taW4odGhpcy5zdGFydFBvc2l0aW9uLnJpZ2h0LCByZXF1ZXN0ZWRQb3MucmlnaHQpO1xyXG4gICAgaWYgKHRoaXMubW92ZVVwQWxsb3dlZCAmJiByZXF1ZXN0ZWRQb3MudG9wIDwgdGhpcy5zdGFydFBvc2l0aW9uLnRvcCkge1xyXG4gICAgICBmaW5hbFBvcy50b3AgPSB0aGlzLnN0YXJ0UG9zaXRpb24udG9wO1xyXG5cclxuICAgICAgd2hpbGUgKGZpbmFsUG9zLnRvcCA+IHJlcXVlc3RlZFBvcy50b3ApIHtcclxuICAgICAgICAvLyBjaGVjayB3aGV0aGVyIGFkZGluZyBhbm90aGVyIHJvdyBhYm92ZSB3b3VsZCBjYXVzZSBhbnkgY29uZmxpY3RcclxuICAgICAgICBmb3VuZENvbGxpc2lvbiA9IHRoaXMuZmluZENvbGxpc2lvbihzdGFydCwgZW5kLCBmaW5hbFBvcy50b3AgLSAxKTtcclxuICAgICAgICBpZiAoZm91bmRDb2xsaXNpb24pIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbFBvcy50b3AtLTsgLy8gYWRkIHJvdyBhYm92ZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubW92ZURvd25BbGxvd2VkICYmIHJlcXVlc3RlZFBvcy5ib3R0b20gPiB0aGlzLnN0YXJ0UG9zaXRpb24uYm90dG9tKSB7XHJcbiAgICAgIGZpbmFsUG9zLnRvcCA9IGZpbmFsUG9zLnRvcCB8fCByZXF1ZXN0ZWRQb3MudG9wO1xyXG4gICAgICBmaW5hbFBvcy5oZWlnaHQgPSB0aGlzLnN0YXJ0UG9zaXRpb24uYm90dG9tICsgMSAtIHRoaXMuc3RhcnRQb3NpdGlvbi50b3A7XHJcbiAgICAgIHdoaWxlIChmaW5hbFBvcy5ib3R0b20gPCByZXF1ZXN0ZWRQb3MuYm90dG9tKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgd2hldGhlciBhZGRpbmcgYW5vdGhlciByb3cgYmVsb3cgd291bGQgY2F1c2UgYW55IGNvbmZsaWN0XHJcbiAgICAgICAgZm91bmRDb2xsaXNpb24gPSB0aGlzLmZpbmRDb2xsaXNpb24oc3RhcnQsIGVuZCwgZmluYWxQb3MuYm90dG9tICsgMSk7XHJcbiAgICAgICAgaWYgKGZvdW5kQ29sbGlzaW9uKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxQb3MuaGVpZ2h0Kys7IC8vIGFkZCByb3cgYmVsb3dcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmFsUG9zLnRvcCA9IGZpbmFsUG9zLnRvcCB8fCByZXF1ZXN0ZWRQb3MudG9wO1xyXG4gICAgZmluYWxQb3MuaGVpZ2h0ID0gZmluYWxQb3MuaGVpZ2h0IHx8IHJlcXVlc3RlZFBvcy5ib3R0b20gKyAxIC0gZmluYWxQb3MudG9wO1xyXG5cclxuICAgIGlmICh0aGlzLm1vdmVMZWZ0QWxsb3dlZCAmJiByZXF1ZXN0ZWRQb3MubGVmdCA8IHRoaXMuc3RhcnRQb3NpdGlvbi5sZWZ0KSB7XHJcbiAgICAgIGZpbmFsUG9zLmxlZnQgPSB0aGlzLnN0YXJ0UG9zaXRpb24ubGVmdDtcclxuXHJcbiAgICAgIHdoaWxlIChmaW5hbFBvcy5sZWZ0ID4gcmVxdWVzdGVkUG9zLmxlZnQpIHtcclxuICAgICAgICAvLyBjaGVjayB3aGV0aGVyIGFkZGluZyBhbm90aGVyIGNvbHVtbiB3b3VsZCBjYXVzZSBhbnkgY29uZmxpY3RcclxuICAgICAgICBmb3VuZENvbGxpc2lvbiA9IHRoaXMuZmluZENvbGxpc2lvbihmaW5hbFBvcy50b3AsIGZpbmFsUG9zLmJvdHRvbSwgZmluYWxQb3MubGVmdCAtIDEsIHRydWUpO1xyXG4gICAgICAgIGlmIChmb3VuZENvbGxpc2lvbikge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaW5hbFBvcy5sZWZ0LS07IC8vIGFkZCBjb2x1bW5cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLm1vdmVSaWdodEFsbG93ZWQgJiYgcmVxdWVzdGVkUG9zLnJpZ2h0ID4gdGhpcy5zdGFydFBvc2l0aW9uLnJpZ2h0KSB7XHJcbiAgICAgIGZpbmFsUG9zLmxlZnQgPSBmaW5hbFBvcy5sZWZ0IHx8IHJlcXVlc3RlZFBvcy5sZWZ0O1xyXG4gICAgICBmaW5hbFBvcy53aWR0aCA9IHRoaXMuc3RhcnRQb3NpdGlvbi5yaWdodCArIDEgLSB0aGlzLnN0YXJ0UG9zaXRpb24ubGVmdDtcclxuICAgICAgd2hpbGUgKGZpbmFsUG9zLnJpZ2h0IDwgcmVxdWVzdGVkUG9zLnJpZ2h0KSB7XHJcbiAgICAgICAgZm91bmRDb2xsaXNpb24gPSB0aGlzLmZpbmRDb2xsaXNpb24oZmluYWxQb3MudG9wLCBmaW5hbFBvcy5ib3R0b20sIGZpbmFsUG9zLnJpZ2h0ICsgMSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKGZvdW5kQ29sbGlzaW9uKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpbmFsUG9zLndpZHRoKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5hbFBvcy5sZWZ0ID0gZmluYWxQb3MubGVmdCB8fCByZXF1ZXN0ZWRQb3MubGVmdDtcclxuICAgIGZpbmFsUG9zLndpZHRoID0gZmluYWxQb3Mud2lkdGggfHwgcmVxdWVzdGVkUG9zLnJpZ2h0ICsgMSAtIGZpbmFsUG9zLmxlZnQ7XHJcbiAgICByZXR1cm4gZmluYWxQb3M7XHJcbiAgfVxyXG59XHJcbiJdfQ==