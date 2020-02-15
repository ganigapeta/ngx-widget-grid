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
const MIN_HEIGHT = 42;
/** @type {?} */
const MIN_WIDTH = 42;
export class NgxWidgetResizerDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} gridCmp
     * @param {?} widgetCmp
     */
    constructor(el, renderer, gridCmp, widgetCmp) {
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
    /**
     * @return {?}
     */
    get resizeDirection() {
        return this._resizeDirection;
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    set ngxWidgetResizer(dir) {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDown(event) {
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
        const eventOffsetX = event.offsetX || event.layerX;
        /** @type {?} */
        const eventOffsetY = event.offsetY || event.layerY;
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMove(event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            /** @type {?} */
            const eventClientX = event.clientX;
            /** @type {?} */
            const eventClientY = event.clientY;
            /** @type {?} */
            const gridDims = this.gridPositions;
            /** @type {?} */
            const startRender = this.startRender;
            /** @type {?} */
            const dragPositionX = Math.round(eventClientX) - gridDims.left;
            /** @type {?} */
            const dragPositionY = Math.round(eventClientY) - gridDims.top;
            /** @type {?} */
            const delta = this.delta;
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
            const currentFinalPos = this.determineFinalPos();
            this.gridCmp.highlightArea(currentFinalPos);
            this.renderer.setStyle(this.parentContainer, 'top', this.delta.top + 'px');
            this.renderer.setStyle(this.parentContainer, 'left', this.delta.left + 'px');
            this.renderer.setStyle(this.parentContainer, 'bottom', this.delta.bottom + 'px');
            this.renderer.setStyle(this.parentContainer, 'right', this.delta.right + 'px');
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onUp(event) {
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
    }
    /**
     * @param {?} start
     * @param {?} end
     * @param {?} val
     * @param {?=} reverse
     * @return {?}
     */
    findCollision(start, end, val, reverse = false) {
        /** @type {?} */
        let foundCollision = false;
        for (let i = start; i <= end; i++) {
            /** @type {?} */
            const checker = reverse ? this.gridCmp.isPointObstructed(i, val) : this.gridCmp.isPointObstructed(val, i);
            if (checker) {
                foundCollision = true;
                break;
            }
        }
        return foundCollision;
    }
    /**
     * @return {?}
     */
    determineFinalPos() {
        /** @type {?} */
        const finalPos = new Rectangle();
        /** @type {?} */
        const startRender = this.startRender;
        /** @type {?} */
        const delta = this.delta;
        /** @type {?} */
        const requestedStartPoint = this.gridCmp.rasterizeCoords(startRender.left + delta.left + 1, startRender.top + delta.top + 1);
        /** @type {?} */
        const requestedEndPoint = this.gridCmp.rasterizeCoords(startRender.right - delta.right - 1, startRender.bottom - delta.bottom - 1);
        /** @type {?} */
        const requestedPos = {
            top: requestedStartPoint.top,
            left: requestedStartPoint.left,
            right: requestedEndPoint.left,
            bottom: requestedEndPoint.top
        };
        /** @type {?} */
        let foundCollision;
        /** @type {?} */
        const start = Math.max(this.startPosition.left, requestedPos.left);
        /** @type {?} */
        const end = Math.min(this.startPosition.right, requestedPos.right);
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
    }
}
NgxWidgetResizerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxWidgetResizer]'
            },] }
];
/** @nocollapse */
NgxWidgetResizerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgxWidgetGridComponent, decorators: [{ type: Inject, args: [forwardRef(() => NgxWidgetGridComponent),] }] },
    { type: NgxWidgetComponent, decorators: [{ type: Inject, args: [forwardRef(() => NgxWidgetComponent),] }] }
];
NgxWidgetResizerDirective.propDecorators = {
    ngxWidgetResizer: [{ type: Input }],
    onDown: [{ type: HostListener, args: ['pointerdown', ['$event'],] }, { type: HostListener, args: ['mousedown', ['$event'],] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0UmVzaXplci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2lkZ2V0LWdyaWQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy93aWRnZXRSZXNpemVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUU3QyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBQ3RCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUtyQixNQUFNOzs7Ozs7O0lBaUJKLFlBQW9CLEVBQWMsRUFDZCxVQUVBLE9BQStCLEVBRS9CLFNBQTZCO1FBTDdCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUTtRQUVSLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBRS9CLGNBQVMsR0FBVCxTQUFTLENBQW9COzZCQXBCMUIsS0FBSzsrQkFDSCxLQUFLOytCQUNMLEtBQUs7Z0NBQ0osS0FBSzswQkFPSCxJQUFJOytCQUVOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs2QkFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBUTFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0tBQzVEOzs7O1FBRVUs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QkFBc0IsdUJBOEJoQixNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBN0JyRCxrQkFBa0IsdUJBK0JaLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7OzsrQkFTdkQsS0FBSztxQkF3Q0wsWUFBWSxTQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUN0QyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hXaWRnZXRHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9ncmlkL2dyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4V2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy93aWRnZXQvd2lkZ2V0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4uL21vZGVscy9SZWN0YW5nbGUubW9kZWwnO1xyXG5pbXBvcnQgeyBSRVNJWkVfRElSRUNUSU9OUyB9IGZyb20gJy4uL1V0aWxzJztcclxuXHJcbmNvbnN0IE1JTl9IRUlHSFQgPSA0MjtcclxuY29uc3QgTUlOX1dJRFRIID0gNDI7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgICAgICAgICAgIHNlbGVjdG9yOiAnW25neFdpZGdldFJlc2l6ZXJdJ1xyXG4gICAgICAgICAgIH0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hXaWRnZXRSZXNpemVyRGlyZWN0aXZlIHtcclxuXHJcbiAgcHVibGljIG1vdmVVcEFsbG93ZWQgPSBmYWxzZTtcclxuICBwdWJsaWMgbW92ZURvd25BbGxvd2VkID0gZmFsc2U7XHJcbiAgcHVibGljIG1vdmVMZWZ0QWxsb3dlZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBtb3ZlUmlnaHRBbGxvd2VkID0gZmFsc2U7XHJcbiAgcHVibGljIHBhcmVudENvbnRhaW5lcjogYW55O1xyXG4gIHB1YmxpYyBzdGFydFJlbmRlcjogYW55O1xyXG4gIHB1YmxpYyBncmlkUG9zaXRpb25zOiBSZWN0YW5nbGU7XHJcbiAgcHVibGljIGRlbHRhOiB7IHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgbGVmdDogbnVtYmVyIH07XHJcbiAgcHVibGljIGRyYWdnZXJPZmZzZXQ6IHsgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXIgfTtcclxuICBwdWJsaWMgc3RhcnRQb3NpdGlvbjogUmVjdGFuZ2xlO1xyXG4gIHB1YmxpYyBlbmFibGVEcmFnOiBzdHJpbmcgPSBudWxsO1xyXG4gIHB1YmxpYyBfcmVzaXplRGlyZWN0aW9uOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfb25Nb3ZlTGlzdGVuZXIgPSB0aGlzLm9uTW92ZS5iaW5kKHRoaXMpO1xyXG4gIHByaXZhdGUgX29uVXBMaXN0ZW5lciA9IHRoaXMub25VcC5iaW5kKHRoaXMpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmd4V2lkZ2V0R3JpZENvbXBvbmVudCkpXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBncmlkQ21wOiBOZ3hXaWRnZXRHcmlkQ29tcG9uZW50LFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ3hXaWRnZXRDb21wb25lbnQpKVxyXG4gICAgICAgICAgICAgIHByaXZhdGUgd2lkZ2V0Q21wOiBOZ3hXaWRnZXRDb21wb25lbnQpIHtcclxuICAgIHRoaXMucGFyZW50Q29udGFpbmVyID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHJlc2l6ZURpcmVjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9yZXNpemVEaXJlY3Rpb247XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBzZXQgbmd4V2lkZ2V0UmVzaXplcihkaXI6IHN0cmluZykge1xyXG4gICAgdGhpcy5fcmVzaXplRGlyZWN0aW9uID0gZGlyO1xyXG4gICAgdGhpcy5tb3ZlVXBBbGxvd2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLm1vdmVEb3duQWxsb3dlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5tb3ZlTGVmdEFsbG93ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMubW92ZVJpZ2h0QWxsb3dlZCA9IGZhbHNlO1xyXG4gICAgc3dpdGNoIChkaXIpIHtcclxuICAgICAgY2FzZSBSRVNJWkVfRElSRUNUSU9OUy50b3A6XHJcbiAgICAgICAgdGhpcy5tb3ZlVXBBbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBSRVNJWkVfRElSRUNUSU9OUy5sZWZ0OlxyXG4gICAgICAgIHRoaXMubW92ZUxlZnRBbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBSRVNJWkVfRElSRUNUSU9OUy5ib3R0b206XHJcbiAgICAgICAgdGhpcy5tb3ZlRG93bkFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFJFU0laRV9ESVJFQ1RJT05TLnJpZ2h0OlxyXG4gICAgICAgIHRoaXMubW92ZVJpZ2h0QWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMudG9wTGVmdDpcclxuICAgICAgICB0aGlzLm1vdmVVcEFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubW92ZUxlZnRBbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBSRVNJWkVfRElSRUNUSU9OUy50b3BSaWdodDpcclxuICAgICAgICB0aGlzLm1vdmVVcEFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubW92ZVJpZ2h0QWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMuYm90dG9tTGVmdDpcclxuICAgICAgICB0aGlzLm1vdmVEb3duQWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tb3ZlTGVmdEFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFJFU0laRV9ESVJFQ1RJT05TLmJvdHRvbVJpZ2h0OlxyXG4gICAgICAgIHRoaXMubW92ZURvd25BbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1vdmVSaWdodEFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBbJyRldmVudCddKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXHJcbiAgb25Eb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5lbmFibGVEcmFnID0gdGhpcy53aWRnZXRDbXAuZ2V0Q29uZmlnKCkuaWQ7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMud2lkZ2V0Q21wLmdldEVsKCkubmF0aXZlRWxlbWVudCwgJ3dnLXJlc2l6aW5nJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RyYWdnaW5nJyk7XHJcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSB0aGlzLmdyaWRDbXAuZ2V0V2lkZ2V0UG9zaXRpb24odGhpcy53aWRnZXRDbXApO1xyXG5cclxuICAgIHRoaXMuc3RhcnRSZW5kZXIgPSB7XHJcbiAgICAgIHRvcDogTWF0aC5jZWlsKHRoaXMud2lkZ2V0Q21wLmdldEVsKCkubmF0aXZlRWxlbWVudC5vZmZzZXRUb3ApLFxyXG4gICAgICBsZWZ0OiBNYXRoLmNlaWwodGhpcy53aWRnZXRDbXAuZ2V0RWwoKS5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQpLFxyXG4gICAgICBoZWlnaHQ6IE1hdGguZmxvb3IodGhpcy5wYXJlbnRDb250YWluZXIub2Zmc2V0SGVpZ2h0KSxcclxuICAgICAgd2lkdGg6IE1hdGguZmxvb3IodGhpcy5wYXJlbnRDb250YWluZXIub2Zmc2V0V2lkdGgpXHJcbiAgICB9OyAvLyBwaXhlbCB2YWx1ZXNcclxuICAgIHRoaXMuc3RhcnRSZW5kZXIuYm90dG9tID0gdGhpcy5zdGFydFJlbmRlci50b3AgKyB0aGlzLnN0YXJ0UmVuZGVyLmhlaWdodDtcclxuICAgIHRoaXMuc3RhcnRSZW5kZXIucmlnaHQgPSB0aGlzLnN0YXJ0UmVuZGVyLmxlZnQgKyB0aGlzLnN0YXJ0UmVuZGVyLndpZHRoO1xyXG5cclxuICAgIGNvbnN0IGV2ZW50T2Zmc2V0WCA9IGV2ZW50Lm9mZnNldFggfHwgZXZlbnQubGF5ZXJYO1xyXG4gICAgY29uc3QgZXZlbnRPZmZzZXRZID0gZXZlbnQub2Zmc2V0WSB8fCBldmVudC5sYXllclk7XHJcblxyXG4gICAgdGhpcy5kZWx0YSA9IHt0b3A6IDAsIHJpZ2h0OiAwLCBib3R0b206IDAsIGxlZnQ6IDB9O1xyXG4gICAgdGhpcy5kcmFnZ2VyT2Zmc2V0ID0ge1xyXG4gICAgICB0b3A6IGV2ZW50T2Zmc2V0WSxcclxuICAgICAgbGVmdDogZXZlbnRPZmZzZXRYLFxyXG4gICAgICBib3R0b206IGV2ZW50T2Zmc2V0WSAtIHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQsXHJcbiAgICAgIHJpZ2h0OiBldmVudE9mZnNldFggLSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGhcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5ncmlkUG9zaXRpb25zID0gdGhpcy5ncmlkQ21wLmdldEdyaWRSZWN0YW5nbGUoKTtcclxuICAgIGlmICh0eXBlb2YgUG9pbnRlckV2ZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLl9vbk1vdmVMaXN0ZW5lcik7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCB0aGlzLl9vblVwTGlzdGVuZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW92ZUxpc3RlbmVyKTtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vblVwTGlzdGVuZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Nb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5lbmFibGVEcmFnID09PSB0aGlzLndpZGdldENtcC5nZXRDb25maWcoKS5pZCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBldmVudENsaWVudFggPSBldmVudC5jbGllbnRYO1xyXG4gICAgICBjb25zdCBldmVudENsaWVudFkgPSBldmVudC5jbGllbnRZO1xyXG4gICAgICBjb25zdCBncmlkRGltcyA9IHRoaXMuZ3JpZFBvc2l0aW9ucztcclxuICAgICAgY29uc3Qgc3RhcnRSZW5kZXIgPSB0aGlzLnN0YXJ0UmVuZGVyO1xyXG4gICAgICAvLyBub3JtYWxpemUgdGhlIGRyYWcgcG9zaXRpb25cclxuICAgICAgY29uc3QgZHJhZ1Bvc2l0aW9uWCA9IE1hdGgucm91bmQoZXZlbnRDbGllbnRYKSAtIGdyaWREaW1zLmxlZnQ7XHJcbiAgICAgIGNvbnN0IGRyYWdQb3NpdGlvblkgPSBNYXRoLnJvdW5kKGV2ZW50Q2xpZW50WSkgLSBncmlkRGltcy50b3A7XHJcbiAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5kZWx0YTtcclxuICAgICAgaWYgKHRoaXMubW92ZVVwQWxsb3dlZCkge1xyXG4gICAgICAgIGRlbHRhLnRvcCA9IE1hdGgubWluKE1hdGgubWF4KGRyYWdQb3NpdGlvblkgLSB0aGlzLmRyYWdnZXJPZmZzZXQudG9wLCAwKSwgZ3JpZERpbXMuaGVpZ2h0KSAtIHN0YXJ0UmVuZGVyLnRvcDtcclxuICAgICAgICBkZWx0YS50b3AgPSBNYXRoLm1pbihkZWx0YS50b3AsIHN0YXJ0UmVuZGVyLmhlaWdodCAtIE1JTl9IRUlHSFQpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMubW92ZURvd25BbGxvd2VkKSB7XHJcbiAgICAgICAgZGVsdGEuYm90dG9tID0gc3RhcnRSZW5kZXIuYm90dG9tIC0gTWF0aC5taW4oTWF0aC5tYXgoZHJhZ1Bvc2l0aW9uWSAtIHRoaXMuZHJhZ2dlck9mZnNldC5ib3R0b20sIDApLCBncmlkRGltcy5oZWlnaHQpO1xyXG4gICAgICAgIGRlbHRhLmJvdHRvbSA9IE1hdGgubWluKGRlbHRhLmJvdHRvbSwgc3RhcnRSZW5kZXIuaGVpZ2h0IC0gTUlOX0hFSUdIVCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm1vdmVMZWZ0QWxsb3dlZCkge1xyXG4gICAgICAgIGRlbHRhLmxlZnQgPSBNYXRoLm1pbihNYXRoLm1heChkcmFnUG9zaXRpb25YIC0gdGhpcy5kcmFnZ2VyT2Zmc2V0LmxlZnQsIDApLCBncmlkRGltcy53aWR0aCkgLSBzdGFydFJlbmRlci5sZWZ0O1xyXG4gICAgICAgIGRlbHRhLmxlZnQgPSBNYXRoLm1pbihkZWx0YS5sZWZ0LCBzdGFydFJlbmRlci53aWR0aCAtIE1JTl9XSURUSCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tb3ZlUmlnaHRBbGxvd2VkKSB7XHJcbiAgICAgICAgZGVsdGEucmlnaHQgPSBzdGFydFJlbmRlci5yaWdodCAtIE1hdGgubWluKE1hdGgubWF4KGRyYWdQb3NpdGlvblggLSB0aGlzLmRyYWdnZXJPZmZzZXQucmlnaHQsIDApLCBncmlkRGltcy53aWR0aCk7XHJcbiAgICAgICAgZGVsdGEucmlnaHQgPSBNYXRoLm1pbihkZWx0YS5yaWdodCwgc3RhcnRSZW5kZXIud2lkdGggLSBNSU5fV0lEVEgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjdXJyZW50RmluYWxQb3MgPSB0aGlzLmRldGVybWluZUZpbmFsUG9zKCk7XHJcbiAgICAgIHRoaXMuZ3JpZENtcC5oaWdobGlnaHRBcmVhKGN1cnJlbnRGaW5hbFBvcyk7XHJcblxyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyZW50Q29udGFpbmVyLCAndG9wJywgdGhpcy5kZWx0YS50b3AgKyAncHgnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudENvbnRhaW5lciwgJ2xlZnQnLCB0aGlzLmRlbHRhLmxlZnQgKyAncHgnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudENvbnRhaW5lciwgJ2JvdHRvbScsIHRoaXMuZGVsdGEuYm90dG9tICsgJ3B4Jyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRDb250YWluZXIsICdyaWdodCcsIHRoaXMuZGVsdGEucmlnaHQgKyAncHgnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uVXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmVuYWJsZURyYWcgPT09IHRoaXMud2lkZ2V0Q21wLmdldENvbmZpZygpLmlkKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsIGZhbHNlKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnZ2luZycpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMud2lkZ2V0Q21wLmdldEVsKCkubmF0aXZlRWxlbWVudCwgJ3dnLXJlc2l6aW5nJyk7XHJcbiAgICAgIHRoaXMuZW5hYmxlRHJhZyA9IG51bGw7XHJcbiAgICAgIHRoaXMud2lkZ2V0Q21wLnBvc2l0aW9uID0gdGhpcy5kZXRlcm1pbmVGaW5hbFBvcygpO1xyXG4gICAgICB0aGlzLmdyaWRDbXAudXBkYXRlV2lkZ2V0KHRoaXMud2lkZ2V0Q21wLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuZ3JpZENtcC5yZXNldEhpZ2hsaWdodHMoKTtcclxuXHJcbiAgICAgIC8vIHJlc2V0IHN0eWxlXHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy53aWRnZXRDbXAuZ2V0RWwoKS5uYXRpdmVFbGVtZW50LCAnd2ctcmVzaXppbmcnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnZ2luZycpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyZW50Q29udGFpbmVyLCAndG9wJywgJycpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyZW50Q29udGFpbmVyLCAnbGVmdCcsICcnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudENvbnRhaW5lciwgJ2JvdHRvbScsICcnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudENvbnRhaW5lciwgJ3JpZ2h0JywgJycpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBQb2ludGVyRXZlbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMuX29uTW92ZUxpc3RlbmVyKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIHRoaXMuX29uVXBMaXN0ZW5lcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3ZlTGlzdGVuZXIpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uVXBMaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaW5kQ29sbGlzaW9uKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCB2YWw6IG51bWJlciwgcmV2ZXJzZSA9IGZhbHNlKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgZm91bmRDb2xsaXNpb24gPSBmYWxzZTtcclxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xyXG4gICAgICBjb25zdCBjaGVja2VyID0gcmV2ZXJzZSA/IHRoaXMuZ3JpZENtcC5pc1BvaW50T2JzdHJ1Y3RlZChpLCB2YWwpIDogdGhpcy5ncmlkQ21wLmlzUG9pbnRPYnN0cnVjdGVkKHZhbCwgaSk7XHJcbiAgICAgIGlmIChjaGVja2VyKSB7XHJcbiAgICAgICAgZm91bmRDb2xsaXNpb24gPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm91bmRDb2xsaXNpb247XHJcbiAgfVxyXG5cclxuICBkZXRlcm1pbmVGaW5hbFBvcygpOiBhbnkge1xyXG4gICAgY29uc3QgZmluYWxQb3M6IFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgIGNvbnN0IHN0YXJ0UmVuZGVyID0gdGhpcy5zdGFydFJlbmRlcjtcclxuICAgIGNvbnN0IGRlbHRhID0gdGhpcy5kZWx0YTtcclxuICAgIGNvbnN0IHJlcXVlc3RlZFN0YXJ0UG9pbnQgPSB0aGlzLmdyaWRDbXAucmFzdGVyaXplQ29vcmRzKHN0YXJ0UmVuZGVyLmxlZnQgKyBkZWx0YS5sZWZ0ICsgMSwgc3RhcnRSZW5kZXIudG9wICsgZGVsdGEudG9wICsgMSk7XHJcbiAgICBjb25zdCByZXF1ZXN0ZWRFbmRQb2ludCA9IHRoaXMuZ3JpZENtcC5yYXN0ZXJpemVDb29yZHMoc3RhcnRSZW5kZXIucmlnaHQgLSBkZWx0YS5yaWdodCAtIDEsIHN0YXJ0UmVuZGVyLmJvdHRvbSAtIGRlbHRhLmJvdHRvbSAtIDEpO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3RlZFBvcyA9IHtcclxuICAgICAgdG9wOiByZXF1ZXN0ZWRTdGFydFBvaW50LnRvcCxcclxuICAgICAgbGVmdDogcmVxdWVzdGVkU3RhcnRQb2ludC5sZWZ0LFxyXG4gICAgICByaWdodDogcmVxdWVzdGVkRW5kUG9pbnQubGVmdCxcclxuICAgICAgYm90dG9tOiByZXF1ZXN0ZWRFbmRQb2ludC50b3BcclxuICAgIH07XHJcbiAgICAvLyBkZXRlcm1pbmUgYSBzdWl0YWJsZSBmaW5hbCBwb3NpdGlvbiAob25lIHRoYXQgaXMgbm90IG9ic3RydWN0ZWQpXHJcbiAgICBsZXQgZm91bmRDb2xsaXNpb247XHJcbiAgICBjb25zdCBzdGFydCA9IE1hdGgubWF4KHRoaXMuc3RhcnRQb3NpdGlvbi5sZWZ0LCByZXF1ZXN0ZWRQb3MubGVmdCk7XHJcbiAgICBjb25zdCBlbmQgPSBNYXRoLm1pbih0aGlzLnN0YXJ0UG9zaXRpb24ucmlnaHQsIHJlcXVlc3RlZFBvcy5yaWdodCk7XHJcbiAgICBpZiAodGhpcy5tb3ZlVXBBbGxvd2VkICYmIHJlcXVlc3RlZFBvcy50b3AgPCB0aGlzLnN0YXJ0UG9zaXRpb24udG9wKSB7XHJcbiAgICAgIGZpbmFsUG9zLnRvcCA9IHRoaXMuc3RhcnRQb3NpdGlvbi50b3A7XHJcblxyXG4gICAgICB3aGlsZSAoZmluYWxQb3MudG9wID4gcmVxdWVzdGVkUG9zLnRvcCkge1xyXG4gICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgYWRkaW5nIGFub3RoZXIgcm93IGFib3ZlIHdvdWxkIGNhdXNlIGFueSBjb25mbGljdFxyXG4gICAgICAgIGZvdW5kQ29sbGlzaW9uID0gdGhpcy5maW5kQ29sbGlzaW9uKHN0YXJ0LCBlbmQsIGZpbmFsUG9zLnRvcCAtIDEpO1xyXG4gICAgICAgIGlmIChmb3VuZENvbGxpc2lvbikge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsUG9zLnRvcC0tOyAvLyBhZGQgcm93IGFib3ZlXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5tb3ZlRG93bkFsbG93ZWQgJiYgcmVxdWVzdGVkUG9zLmJvdHRvbSA+IHRoaXMuc3RhcnRQb3NpdGlvbi5ib3R0b20pIHtcclxuICAgICAgZmluYWxQb3MudG9wID0gZmluYWxQb3MudG9wIHx8IHJlcXVlc3RlZFBvcy50b3A7XHJcbiAgICAgIGZpbmFsUG9zLmhlaWdodCA9IHRoaXMuc3RhcnRQb3NpdGlvbi5ib3R0b20gKyAxIC0gdGhpcy5zdGFydFBvc2l0aW9uLnRvcDtcclxuICAgICAgd2hpbGUgKGZpbmFsUG9zLmJvdHRvbSA8IHJlcXVlc3RlZFBvcy5ib3R0b20pIHtcclxuICAgICAgICAvLyBjaGVjayB3aGV0aGVyIGFkZGluZyBhbm90aGVyIHJvdyBiZWxvdyB3b3VsZCBjYXVzZSBhbnkgY29uZmxpY3RcclxuICAgICAgICBmb3VuZENvbGxpc2lvbiA9IHRoaXMuZmluZENvbGxpc2lvbihzdGFydCwgZW5kLCBmaW5hbFBvcy5ib3R0b20gKyAxKTtcclxuICAgICAgICBpZiAoZm91bmRDb2xsaXNpb24pIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbFBvcy5oZWlnaHQrKzsgLy8gYWRkIHJvdyBiZWxvd1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluYWxQb3MudG9wID0gZmluYWxQb3MudG9wIHx8IHJlcXVlc3RlZFBvcy50b3A7XHJcbiAgICBmaW5hbFBvcy5oZWlnaHQgPSBmaW5hbFBvcy5oZWlnaHQgfHwgcmVxdWVzdGVkUG9zLmJvdHRvbSArIDEgLSBmaW5hbFBvcy50b3A7XHJcblxyXG4gICAgaWYgKHRoaXMubW92ZUxlZnRBbGxvd2VkICYmIHJlcXVlc3RlZFBvcy5sZWZ0IDwgdGhpcy5zdGFydFBvc2l0aW9uLmxlZnQpIHtcclxuICAgICAgZmluYWxQb3MubGVmdCA9IHRoaXMuc3RhcnRQb3NpdGlvbi5sZWZ0O1xyXG5cclxuICAgICAgd2hpbGUgKGZpbmFsUG9zLmxlZnQgPiByZXF1ZXN0ZWRQb3MubGVmdCkge1xyXG4gICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgYWRkaW5nIGFub3RoZXIgY29sdW1uIHdvdWxkIGNhdXNlIGFueSBjb25mbGljdFxyXG4gICAgICAgIGZvdW5kQ29sbGlzaW9uID0gdGhpcy5maW5kQ29sbGlzaW9uKGZpbmFsUG9zLnRvcCwgZmluYWxQb3MuYm90dG9tLCBmaW5hbFBvcy5sZWZ0IC0gMSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKGZvdW5kQ29sbGlzaW9uKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpbmFsUG9zLmxlZnQtLTsgLy8gYWRkIGNvbHVtblxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubW92ZVJpZ2h0QWxsb3dlZCAmJiByZXF1ZXN0ZWRQb3MucmlnaHQgPiB0aGlzLnN0YXJ0UG9zaXRpb24ucmlnaHQpIHtcclxuICAgICAgZmluYWxQb3MubGVmdCA9IGZpbmFsUG9zLmxlZnQgfHwgcmVxdWVzdGVkUG9zLmxlZnQ7XHJcbiAgICAgIGZpbmFsUG9zLndpZHRoID0gdGhpcy5zdGFydFBvc2l0aW9uLnJpZ2h0ICsgMSAtIHRoaXMuc3RhcnRQb3NpdGlvbi5sZWZ0O1xyXG4gICAgICB3aGlsZSAoZmluYWxQb3MucmlnaHQgPCByZXF1ZXN0ZWRQb3MucmlnaHQpIHtcclxuICAgICAgICBmb3VuZENvbGxpc2lvbiA9IHRoaXMuZmluZENvbGxpc2lvbihmaW5hbFBvcy50b3AsIGZpbmFsUG9zLmJvdHRvbSwgZmluYWxQb3MucmlnaHQgKyAxLCB0cnVlKTtcclxuICAgICAgICBpZiAoZm91bmRDb2xsaXNpb24pIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmluYWxQb3Mud2lkdGgrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmFsUG9zLmxlZnQgPSBmaW5hbFBvcy5sZWZ0IHx8IHJlcXVlc3RlZFBvcy5sZWZ0O1xyXG4gICAgZmluYWxQb3Mud2lkdGggPSBmaW5hbFBvcy53aWR0aCB8fCByZXF1ZXN0ZWRQb3MucmlnaHQgKyAxIC0gZmluYWxQb3MubGVmdDtcclxuICAgIHJldHVybiBmaW5hbFBvcztcclxuICB9XHJcbn1cclxuIl19