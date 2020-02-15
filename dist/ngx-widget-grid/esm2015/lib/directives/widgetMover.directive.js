/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, forwardRef, HostListener, Inject, Input, Renderer2 } from '@angular/core';
import { NgxWidgetGridComponent } from '../components/grid/grid.component';
import { Rectangle } from '../models/Rectangle.model';
import { NgxWidgetComponent } from '../components/widget/widget.component';
import { PathIterator } from '../models/PathIterator.model';
/**
 * @record
 */
export function RectanglePixels() { }
/** @type {?} */
RectanglePixels.prototype.top;
/** @type {?} */
RectanglePixels.prototype.left;
/** @type {?} */
RectanglePixels.prototype.height;
/** @type {?} */
RectanglePixels.prototype.width;
export class NgxWidgetMoverDirective {
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
        this.enableDrag = null;
        this._onMoveListener = this.onMove.bind(this);
        this._onUpListener = this.onUp.bind(this);
        this.ngxWidgetMover = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDown(event) {
        event.preventDefault();
        this.renderer.addClass(this.widgetCmp.getEl().nativeElement, 'wg-moving');
        /** @type {?} */
        const widgetContainer = this.widgetCmp.getEl().nativeElement;
        this.startPosition = this.gridCmp.getWidgetPosition(this.widgetCmp);
        this.startRender = {
            top: widgetContainer.offsetTop,
            left: widgetContainer.offsetLeft,
            height: widgetContainer.clientHeight,
            width: widgetContainer.clientWidth
        };
        /** @type {?} */
        const eventOffsetX = event.offsetX || event.layerX;
        /** @type {?} */
        const eventOffsetY = event.offsetY || event.layerY;
        this.desiredPosition = { top: this.startRender.top, left: this.startRender.left };
        this.moverOffset = new Rectangle({
            top: eventOffsetY + this.el.nativeElement.offsetTop || 0,
            left: eventOffsetX + this.el.nativeElement.offsetLeft || 0
        });
        this.gridPositions = this.gridCmp.getGridRectangle();
        this.cellHeight = (this.gridCmp.grid.cellSize.height / 100) * this.gridPositions.height;
        this.cellWidth = (this.gridCmp.grid.cellSize.width / 100) * this.gridPositions.width;
        this.enableDrag = this.widgetCmp.getConfig().id;
        this.renderer.setStyle(this.widgetCmp.getEl().nativeElement, 'z-index', this.ngxWidgetMover ? 0 : 100);
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
            const startRender = this.startRender;
            /** @type {?} */
            const gridDimensions = this.gridPositions;
            /** @type {?} */
            const desiredPosition = this.desiredPosition;
            /** @type {?} */
            const dragPositionX = Math.round(eventClientX) - gridDimensions.left;
            /** @type {?} */
            const dragPositionY = Math.round(eventClientY) - gridDimensions.top;
            desiredPosition.top = Math.min(Math.max(dragPositionY - this.moverOffset.top, 0), gridDimensions.height - startRender.height - 1);
            desiredPosition.left = Math.min(Math.max(dragPositionX - this.moverOffset.left, 0), gridDimensions.width - startRender.width - 1);
            /** @type {?} */
            const currentFinalPos = this.determineFinalPos(this.startPosition, desiredPosition, this.startRender, this.cellHeight, this.cellWidth);
            this.gridCmp.highlightArea(currentFinalPos);
            this.renderer.setStyle(this.widgetCmp.getEl().nativeElement, 'top', desiredPosition.top + 'px');
            this.renderer.setStyle(this.widgetCmp.getEl().nativeElement, 'left', desiredPosition.left + 'px');
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onUp(event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            /** @type {?} */
            const eventClientX = event.clientX;
            /** @type {?} */
            const eventClientY = event.clientY;
            /** @type {?} */
            const startRender = this.startRender;
            /** @type {?} */
            const gridDimensions = this.gridPositions;
            /** @type {?} */
            const desiredPosition = this.desiredPosition;
            /** @type {?} */
            const dragPositionX = Math.round(eventClientX) - gridDimensions.left;
            /** @type {?} */
            const dragPositionY = Math.round(eventClientY) - gridDimensions.top;
            desiredPosition.top = Math.min(Math.max(dragPositionY - this.moverOffset.top, 0), gridDimensions.height - startRender.height - 1);
            desiredPosition.left = Math.min(Math.max(dragPositionX - this.moverOffset.left, 0), gridDimensions.width - startRender.width - 1);
            /** @type {?} */
            const anchorTop = this.getAnchor(Math.max(dragPositionY, 0), this.cellHeight, 1);
            /** @type {?} */
            const anchorLeft = this.getAnchor(Math.max(dragPositionX, 0), this.cellWidth, 1);
            /** @type {?} */
            const dropPosition = this.gridCmp.rasterizeCoords(anchorLeft, anchorTop);
            /** @type {?} */
            const obstructingWidgetId = this.gridCmp.areaObstructor(dropPosition);
            /** @type {?} */
            let finalPos;
            if (obstructingWidgetId && this.ngxWidgetMover) {
                /** @type {?} */
                const obstructingWidgetCmp = this.gridCmp.getWidgetById(obstructingWidgetId);
                /** @type {?} */
                const obstructingWidgetPosition = this.gridCmp.getWidgetPositionByWidgetId(obstructingWidgetId);
                /** @type {?} */
                const draggedWidgetPosition = this.widgetCmp.position;
                this.widgetCmp.position = obstructingWidgetPosition;
                this.gridCmp.updateWidget(this.widgetCmp, true);
                obstructingWidgetCmp.position = draggedWidgetPosition;
                this.gridCmp.updateWidget(obstructingWidgetCmp, true);
            }
            else {
                finalPos = this.determineFinalPos(this.startPosition, desiredPosition, this.startRender, this.cellHeight, this.cellWidth);
                this.widgetCmp.position = finalPos;
                this.gridCmp.updateWidget(this.widgetCmp, false);
            }
            this.gridCmp.resetHighlights();
            this.renderer.removeClass(this.widgetCmp.getEl().nativeElement, 'wg-moving');
            this.renderer.removeStyle(this.widgetCmp.getEl().nativeElement, 'z-index');
            this.enableDrag = null;
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
     * @param {?} val
     * @param {?} cellWOrH
     * @param {?=} marginFactor
     * @return {?}
     */
    getAnchor(val, cellWOrH, marginFactor = 2) {
        return (val % cellWOrH) > (cellWOrH / marginFactor) ? val + Math.floor(cellWOrH) : val;
    }
    /**
     * @param {?} startPos
     * @param {?} desiredPos
     * @param {?} startRender
     * @param {?} cellHt
     * @param {?} cellWd
     * @return {?}
     */
    determineFinalPos(startPos, desiredPos, startRender, cellHt, cellWd) {
        if (startRender.top === desiredPos.top && startRender.left === desiredPos.left) {
            return startPos;
        }
        /** @type {?} */
        const anchorTop = this.getAnchor(desiredPos.top, cellHt);
        /** @type {?} */
        const anchorLeft = this.getAnchor(desiredPos.left, cellWd);
        /** @type {?} */
        const movedDown = anchorTop >= startRender.top;
        /** @type {?} */
        const movedRight = anchorLeft >= startRender.left;
        /** @type {?} */
        const desiredFinalPosition = this.gridCmp.rasterizeCoords(anchorLeft, anchorTop);
        /** @type {?} */
        const path = new PathIterator(desiredFinalPosition, startPos);
        while (path && path.hasNext()) {
            /** @type {?} */
            const currPos = path.next();
            /** @type {?} */
            const targetArea = new Rectangle({
                top: currPos.top,
                left: currPos.left,
                height: startPos.height,
                width: startPos.width
            });
            /** @type {?} */
            const options = {
                excludedArea: startPos,
                fromBottom: movedDown,
                fromRight: movedRight
            };
            // If widget swap is enabled and area is obstructed, show original position
            if (this.ngxWidgetMover && this.gridCmp.isAreaObstructed(targetArea, options)) {
                return new Rectangle(startPos);
            }
            if (!this.gridCmp.isAreaObstructed(targetArea, options)) {
                /** @type {?} */
                const height = targetArea.height;
                /** @type {?} */
                const width = targetArea.width;
                if (desiredFinalPosition.top < targetArea.top) {
                    while (desiredFinalPosition.top <= (targetArea.top - 1)) {
                        /** @type {?} */
                        const checkRect = new Rectangle({ top: targetArea.top - 1, left: targetArea.left, height, width });
                        /** @type {?} */
                        const isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
                        if (isRectVacant) {
                            targetArea.top--;
                        }
                        else {
                            break;
                        }
                    }
                }
                else if (desiredFinalPosition.top > targetArea.top) {
                    while (desiredFinalPosition.top >= (targetArea.top + 1)) {
                        /** @type {?} */
                        const checkRect = new Rectangle({ top: targetArea.top + 1, left: targetArea.left, height, width });
                        /** @type {?} */
                        const isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
                        if (isRectVacant) {
                            targetArea.top++;
                        }
                        else {
                            break;
                        }
                    }
                }
                if (desiredFinalPosition.left < targetArea.left) {
                    while (desiredFinalPosition.left <= (targetArea.left - 1)) {
                        /** @type {?} */
                        const checkRect = new Rectangle({ top: targetArea.top, left: targetArea.left - 1, height, width });
                        /** @type {?} */
                        const isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
                        if (isRectVacant) {
                            targetArea.left--;
                        }
                        else {
                            break;
                        }
                    }
                }
                else if (desiredFinalPosition.left > targetArea.left) {
                    while (desiredFinalPosition.left >= (targetArea.left + 1)) {
                        /** @type {?} */
                        const checkRect = new Rectangle({ top: targetArea.top, left: targetArea.left + 1, height, width });
                        /** @type {?} */
                        const isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
                        if (isRectVacant) {
                            targetArea.left++;
                        }
                        else {
                            break;
                        }
                    }
                }
                return new Rectangle(targetArea);
            }
        }
        return new Rectangle(startPos);
    }
}
NgxWidgetMoverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxWidgetMover]'
            },] }
];
/** @nocollapse */
NgxWidgetMoverDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgxWidgetGridComponent, decorators: [{ type: Inject, args: [forwardRef(() => NgxWidgetGridComponent),] }] },
    { type: NgxWidgetComponent, decorators: [{ type: Inject, args: [forwardRef(() => NgxWidgetComponent),] }] }
];
NgxWidgetMoverDirective.propDecorators = {
    ngxWidgetMover: [{ type: Input }],
    onDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }, { type: HostListener, args: ['pointerdown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.cellHeight;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.cellWidth;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.startRender;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.gridPositions;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.moverOffset;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.desiredPosition;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.startPosition;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.enableDrag;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype._onMoveListener;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype._onUpListener;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.ngxWidgetMover;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.el;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.renderer;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.gridCmp;
    /** @type {?} */
    NgxWidgetMoverDirective.prototype.widgetCmp;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0TW92ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvd2lkZ2V0TW92ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFZNUQsTUFBTTs7Ozs7OztJQWdCSixZQUFvQixFQUFjLEVBQ2QsVUFFQSxPQUErQixFQUUvQixTQUE2QjtRQUw3QixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVE7UUFFUixZQUFPLEdBQVAsT0FBTyxDQUF3QjtRQUUvQixjQUFTLEdBQVQsU0FBUyxDQUFvQjswQkFackIsSUFBSTsrQkFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7NkJBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs4QkFHcEIsS0FBSztLQVE1Qjs7Ozs7SUFJRCxNQUFNLENBQUMsS0FBaUI7UUFDdEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDOztRQUMxRSxNQUFN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QUFrQix1QkFpQ1osTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzs7OzZCQVB2RCxLQUFLO3FCQVdMLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FDcEMsWUFBWSxTQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4V2lkZ2V0R3JpZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvZ3JpZC9ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4uL21vZGVscy9SZWN0YW5nbGUubW9kZWwnO1xyXG5pbXBvcnQgeyBOZ3hXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3dpZGdldC93aWRnZXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGF0aEl0ZXJhdG9yIH0gZnJvbSAnLi4vbW9kZWxzL1BhdGhJdGVyYXRvci5tb2RlbCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlY3RhbmdsZVBpeGVscyB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmd4V2lkZ2V0TW92ZXJdJ1xyXG4gICAgICAgICAgIH0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hXaWRnZXRNb3ZlckRpcmVjdGl2ZSB7XHJcblxyXG4gIHB1YmxpYyBjZWxsSGVpZ2h0OiBudW1iZXI7XHJcbiAgcHVibGljIGNlbGxXaWR0aDogbnVtYmVyO1xyXG4gIHB1YmxpYyBzdGFydFJlbmRlcjogUmVjdGFuZ2xlUGl4ZWxzO1xyXG4gIHB1YmxpYyBncmlkUG9zaXRpb25zOiBSZWN0YW5nbGU7XHJcbiAgcHVibGljIG1vdmVyT2Zmc2V0OiBSZWN0YW5nbGU7XHJcbiAgcHVibGljIGRlc2lyZWRQb3NpdGlvbjogYW55O1xyXG4gIHB1YmxpYyBzdGFydFBvc2l0aW9uOiBSZWN0YW5nbGU7XHJcbiAgcHVibGljIGVuYWJsZURyYWc6IHN0cmluZyA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfb25Nb3ZlTGlzdGVuZXIgPSB0aGlzLm9uTW92ZS5iaW5kKHRoaXMpO1xyXG4gIHByaXZhdGUgX29uVXBMaXN0ZW5lciA9IHRoaXMub25VcC5iaW5kKHRoaXMpO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBuZ3hXaWRnZXRNb3ZlciA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmd4V2lkZ2V0R3JpZENvbXBvbmVudCkpXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBncmlkQ21wOiBOZ3hXaWRnZXRHcmlkQ29tcG9uZW50LFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ3hXaWRnZXRDb21wb25lbnQpKVxyXG4gICAgICAgICAgICAgIHByaXZhdGUgd2lkZ2V0Q21wOiBOZ3hXaWRnZXRDb21wb25lbnQpIHtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXHJcbiAgQEhvc3RMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBbJyRldmVudCddKVxyXG4gIG9uRG93bihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy53aWRnZXRDbXAuZ2V0RWwoKS5uYXRpdmVFbGVtZW50LCAnd2ctbW92aW5nJyk7XHJcbiAgICBjb25zdCB3aWRnZXRDb250YWluZXIgPSB0aGlzLndpZGdldENtcC5nZXRFbCgpLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5zdGFydFBvc2l0aW9uID0gdGhpcy5ncmlkQ21wLmdldFdpZGdldFBvc2l0aW9uKHRoaXMud2lkZ2V0Q21wKTtcclxuXHJcbiAgICB0aGlzLnN0YXJ0UmVuZGVyID0ge1xyXG4gICAgICB0b3A6IHdpZGdldENvbnRhaW5lci5vZmZzZXRUb3AsXHJcbiAgICAgIGxlZnQ6IHdpZGdldENvbnRhaW5lci5vZmZzZXRMZWZ0LFxyXG4gICAgICBoZWlnaHQ6IHdpZGdldENvbnRhaW5lci5jbGllbnRIZWlnaHQsXHJcbiAgICAgIHdpZHRoOiB3aWRnZXRDb250YWluZXIuY2xpZW50V2lkdGhcclxuICAgIH07IC8vIHBpeGVsIHZhbHVlc1xyXG5cclxuICAgIGNvbnN0IGV2ZW50T2Zmc2V0WCA9IGV2ZW50Lm9mZnNldFggfHwgZXZlbnQubGF5ZXJYO1xyXG4gICAgY29uc3QgZXZlbnRPZmZzZXRZID0gZXZlbnQub2Zmc2V0WSB8fCBldmVudC5sYXllclk7XHJcblxyXG4gICAgdGhpcy5kZXNpcmVkUG9zaXRpb24gPSB7dG9wOiB0aGlzLnN0YXJ0UmVuZGVyLnRvcCwgbGVmdDogdGhpcy5zdGFydFJlbmRlci5sZWZ0fTtcclxuXHJcbiAgICB0aGlzLm1vdmVyT2Zmc2V0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogZXZlbnRPZmZzZXRZICsgdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBldmVudE9mZnNldFggKyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmdyaWRQb3NpdGlvbnMgPSB0aGlzLmdyaWRDbXAuZ2V0R3JpZFJlY3RhbmdsZSgpO1xyXG4gICAgdGhpcy5jZWxsSGVpZ2h0ID0gKHRoaXMuZ3JpZENtcC5ncmlkLmNlbGxTaXplLmhlaWdodCAvIDEwMCkgKiB0aGlzLmdyaWRQb3NpdGlvbnMuaGVpZ2h0O1xyXG4gICAgdGhpcy5jZWxsV2lkdGggPSAodGhpcy5ncmlkQ21wLmdyaWQuY2VsbFNpemUud2lkdGggLyAxMDApICogdGhpcy5ncmlkUG9zaXRpb25zLndpZHRoO1xyXG4gICAgdGhpcy5lbmFibGVEcmFnID0gdGhpcy53aWRnZXRDbXAuZ2V0Q29uZmlnKCkuaWQ7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLndpZGdldENtcC5nZXRFbCgpLm5hdGl2ZUVsZW1lbnQsICd6LWluZGV4JywgdGhpcy5uZ3hXaWRnZXRNb3ZlciA/IDAgOiAxMDApO1xyXG5cclxuICAgIGlmICh0eXBlb2YgUG9pbnRlckV2ZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCB0aGlzLl9vbk1vdmVMaXN0ZW5lcik7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCB0aGlzLl9vblVwTGlzdGVuZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW92ZUxpc3RlbmVyKTtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vblVwTGlzdGVuZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Nb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5lbmFibGVEcmFnID09PSB0aGlzLndpZGdldENtcC5nZXRDb25maWcoKS5pZCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBldmVudENsaWVudFggPSBldmVudC5jbGllbnRYO1xyXG4gICAgICBjb25zdCBldmVudENsaWVudFkgPSBldmVudC5jbGllbnRZO1xyXG4gICAgICBjb25zdCBzdGFydFJlbmRlciA9IHRoaXMuc3RhcnRSZW5kZXI7XHJcbiAgICAgIGNvbnN0IGdyaWREaW1lbnNpb25zID0gdGhpcy5ncmlkUG9zaXRpb25zO1xyXG4gICAgICBjb25zdCBkZXNpcmVkUG9zaXRpb24gPSB0aGlzLmRlc2lyZWRQb3NpdGlvbjtcclxuICAgICAgLy8gbm9ybWFsaXplIHRoZSBkcmFnIHBvc2l0aW9uXHJcbiAgICAgIGNvbnN0IGRyYWdQb3NpdGlvblggPSBNYXRoLnJvdW5kKGV2ZW50Q2xpZW50WCkgLSBncmlkRGltZW5zaW9ucy5sZWZ0LFxyXG4gICAgICAgIGRyYWdQb3NpdGlvblkgPSBNYXRoLnJvdW5kKGV2ZW50Q2xpZW50WSkgLSBncmlkRGltZW5zaW9ucy50b3A7XHJcblxyXG4gICAgICBkZXNpcmVkUG9zaXRpb24udG9wID0gTWF0aC5taW4oXHJcbiAgICAgICAgTWF0aC5tYXgoZHJhZ1Bvc2l0aW9uWSAtIHRoaXMubW92ZXJPZmZzZXQudG9wLCAwKSxcclxuICAgICAgICBncmlkRGltZW5zaW9ucy5oZWlnaHQgLSBzdGFydFJlbmRlci5oZWlnaHQgLSAxXHJcbiAgICAgICk7XHJcbiAgICAgIGRlc2lyZWRQb3NpdGlvbi5sZWZ0ID0gTWF0aC5taW4oXHJcbiAgICAgICAgTWF0aC5tYXgoZHJhZ1Bvc2l0aW9uWCAtIHRoaXMubW92ZXJPZmZzZXQubGVmdCwgMCksXHJcbiAgICAgICAgZ3JpZERpbWVuc2lvbnMud2lkdGggLSBzdGFydFJlbmRlci53aWR0aCAtIDFcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgY3VycmVudEZpbmFsUG9zOiBSZWN0YW5nbGUgPSB0aGlzLmRldGVybWluZUZpbmFsUG9zKHRoaXMuc3RhcnRQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lyZWRQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRSZW5kZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxXaWR0aCk7XHJcbiAgICAgIHRoaXMuZ3JpZENtcC5oaWdobGlnaHRBcmVhKGN1cnJlbnRGaW5hbFBvcyk7XHJcblxyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMud2lkZ2V0Q21wLmdldEVsKCkubmF0aXZlRWxlbWVudCwgJ3RvcCcsIGRlc2lyZWRQb3NpdGlvbi50b3AgKyAncHgnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLndpZGdldENtcC5nZXRFbCgpLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgZGVzaXJlZFBvc2l0aW9uLmxlZnQgKyAncHgnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uVXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmVuYWJsZURyYWcgPT09IHRoaXMud2lkZ2V0Q21wLmdldENvbmZpZygpLmlkKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IGV2ZW50Q2xpZW50WCA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICAgIGNvbnN0IGV2ZW50Q2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgIGNvbnN0IHN0YXJ0UmVuZGVyID0gdGhpcy5zdGFydFJlbmRlcjtcclxuICAgICAgY29uc3QgZ3JpZERpbWVuc2lvbnMgPSB0aGlzLmdyaWRQb3NpdGlvbnM7XHJcbiAgICAgIGNvbnN0IGRlc2lyZWRQb3NpdGlvbiA9IHRoaXMuZGVzaXJlZFBvc2l0aW9uO1xyXG4gICAgICAvLyBub3JtYWxpemUgdGhlIGRyYWcgcG9zaXRpb25cclxuICAgICAgY29uc3QgZHJhZ1Bvc2l0aW9uWCA9IE1hdGgucm91bmQoZXZlbnRDbGllbnRYKSAtIGdyaWREaW1lbnNpb25zLmxlZnQsXHJcbiAgICAgICAgZHJhZ1Bvc2l0aW9uWSA9IE1hdGgucm91bmQoZXZlbnRDbGllbnRZKSAtIGdyaWREaW1lbnNpb25zLnRvcDtcclxuXHJcbiAgICAgIGRlc2lyZWRQb3NpdGlvbi50b3AgPSBNYXRoLm1pbihcclxuICAgICAgICBNYXRoLm1heChkcmFnUG9zaXRpb25ZIC0gdGhpcy5tb3Zlck9mZnNldC50b3AsIDApLFxyXG4gICAgICAgIGdyaWREaW1lbnNpb25zLmhlaWdodCAtIHN0YXJ0UmVuZGVyLmhlaWdodCAtIDFcclxuICAgICAgKTtcclxuICAgICAgZGVzaXJlZFBvc2l0aW9uLmxlZnQgPSBNYXRoLm1pbihcclxuICAgICAgICBNYXRoLm1heChkcmFnUG9zaXRpb25YIC0gdGhpcy5tb3Zlck9mZnNldC5sZWZ0LCAwKSxcclxuICAgICAgICBncmlkRGltZW5zaW9ucy53aWR0aCAtIHN0YXJ0UmVuZGVyLndpZHRoIC0gMVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBhbmNob3JUb3AgPSB0aGlzLmdldEFuY2hvcihNYXRoLm1heChkcmFnUG9zaXRpb25ZLCAwKSwgdGhpcy5jZWxsSGVpZ2h0LCAxKTtcclxuICAgICAgY29uc3QgYW5jaG9yTGVmdCA9IHRoaXMuZ2V0QW5jaG9yKE1hdGgubWF4KGRyYWdQb3NpdGlvblgsIDApLCB0aGlzLmNlbGxXaWR0aCwgMSk7XHJcbiAgICAgIGNvbnN0IGRyb3BQb3NpdGlvbjogYW55ID0gdGhpcy5ncmlkQ21wLnJhc3Rlcml6ZUNvb3JkcyhhbmNob3JMZWZ0LCBhbmNob3JUb3ApO1xyXG4gICAgICBjb25zdCBvYnN0cnVjdGluZ1dpZGdldElkID0gdGhpcy5ncmlkQ21wLmFyZWFPYnN0cnVjdG9yKGRyb3BQb3NpdGlvbik7XHJcbiAgICAgIGxldCBmaW5hbFBvcztcclxuICAgICAgaWYgKG9ic3RydWN0aW5nV2lkZ2V0SWQgJiYgdGhpcy5uZ3hXaWRnZXRNb3Zlcikge1xyXG4gICAgICAgIGNvbnN0IG9ic3RydWN0aW5nV2lkZ2V0Q21wOiBOZ3hXaWRnZXRDb21wb25lbnQgPSB0aGlzLmdyaWRDbXAuZ2V0V2lkZ2V0QnlJZChvYnN0cnVjdGluZ1dpZGdldElkKTtcclxuICAgICAgICBjb25zdCBvYnN0cnVjdGluZ1dpZGdldFBvc2l0aW9uID0gdGhpcy5ncmlkQ21wLmdldFdpZGdldFBvc2l0aW9uQnlXaWRnZXRJZChvYnN0cnVjdGluZ1dpZGdldElkKTtcclxuICAgICAgICBjb25zdCBkcmFnZ2VkV2lkZ2V0UG9zaXRpb24gPSB0aGlzLndpZGdldENtcC5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLndpZGdldENtcC5wb3NpdGlvbiA9IG9ic3RydWN0aW5nV2lkZ2V0UG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5ncmlkQ21wLnVwZGF0ZVdpZGdldCh0aGlzLndpZGdldENtcCwgdHJ1ZSk7XHJcbiAgICAgICAgb2JzdHJ1Y3RpbmdXaWRnZXRDbXAucG9zaXRpb24gPSBkcmFnZ2VkV2lkZ2V0UG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5ncmlkQ21wLnVwZGF0ZVdpZGdldChvYnN0cnVjdGluZ1dpZGdldENtcCwgdHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmluYWxQb3MgPSB0aGlzLmRldGVybWluZUZpbmFsUG9zKHRoaXMuc3RhcnRQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaXJlZFBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UmVuZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbFdpZHRoKTtcclxuICAgICAgICB0aGlzLndpZGdldENtcC5wb3NpdGlvbiA9IGZpbmFsUG9zO1xyXG4gICAgICAgIHRoaXMuZ3JpZENtcC51cGRhdGVXaWRnZXQodGhpcy53aWRnZXRDbXAsIGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmdyaWRDbXAucmVzZXRIaWdobGlnaHRzKCk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy53aWRnZXRDbXAuZ2V0RWwoKS5uYXRpdmVFbGVtZW50LCAnd2ctbW92aW5nJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy53aWRnZXRDbXAuZ2V0RWwoKS5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcpO1xyXG4gICAgICB0aGlzLmVuYWJsZURyYWcgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBQb2ludGVyRXZlbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMuX29uTW92ZUxpc3RlbmVyKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIHRoaXMuX29uVXBMaXN0ZW5lcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3ZlTGlzdGVuZXIpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uVXBMaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRBbmNob3IodmFsOiBudW1iZXIsIGNlbGxXT3JIOiBudW1iZXIsIG1hcmdpbkZhY3RvciA9IDIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuICh2YWwgJSBjZWxsV09ySCkgPiAoY2VsbFdPckggLyBtYXJnaW5GYWN0b3IpID8gdmFsICsgTWF0aC5mbG9vcihjZWxsV09ySCkgOiB2YWw7XHJcbiAgfVxyXG5cclxuICBkZXRlcm1pbmVGaW5hbFBvcyhzdGFydFBvczogUmVjdGFuZ2xlLCBkZXNpcmVkUG9zOiBSZWN0YW5nbGUsIHN0YXJ0UmVuZGVyOiBSZWN0YW5nbGVQaXhlbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEh0OiBudW1iZXIsIGNlbGxXZDogbnVtYmVyKTogUmVjdGFuZ2xlIHtcclxuICAgIGlmIChzdGFydFJlbmRlci50b3AgPT09IGRlc2lyZWRQb3MudG9wICYmIHN0YXJ0UmVuZGVyLmxlZnQgPT09IGRlc2lyZWRQb3MubGVmdCkge1xyXG4gICAgICByZXR1cm4gc3RhcnRQb3M7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYW5jaG9yVG9wID0gdGhpcy5nZXRBbmNob3IoZGVzaXJlZFBvcy50b3AsIGNlbGxIdCk7XHJcbiAgICBjb25zdCBhbmNob3JMZWZ0ID0gdGhpcy5nZXRBbmNob3IoZGVzaXJlZFBvcy5sZWZ0LCBjZWxsV2QpO1xyXG4gICAgY29uc3QgbW92ZWREb3duID0gYW5jaG9yVG9wID49IHN0YXJ0UmVuZGVyLnRvcDtcclxuICAgIGNvbnN0IG1vdmVkUmlnaHQgPSBhbmNob3JMZWZ0ID49IHN0YXJ0UmVuZGVyLmxlZnQ7XHJcbiAgICBjb25zdCBkZXNpcmVkRmluYWxQb3NpdGlvbjogYW55ID0gdGhpcy5ncmlkQ21wLnJhc3Rlcml6ZUNvb3JkcyhhbmNob3JMZWZ0LCBhbmNob3JUb3ApO1xyXG4gICAgY29uc3QgcGF0aCA9IG5ldyBQYXRoSXRlcmF0b3IoZGVzaXJlZEZpbmFsUG9zaXRpb24sIHN0YXJ0UG9zKTtcclxuICAgIHdoaWxlIChwYXRoICYmIHBhdGguaGFzTmV4dCgpKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJQb3MgPSBwYXRoLm5leHQoKTtcclxuXHJcbiAgICAgIGNvbnN0IHRhcmdldEFyZWEgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGN1cnJQb3MudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGN1cnJQb3MubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHN0YXJ0UG9zLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc3RhcnRQb3Mud2lkdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIGV4Y2x1ZGVkQXJlYTogc3RhcnRQb3MsXHJcbiAgICAgICAgZnJvbUJvdHRvbTogbW92ZWREb3duLFxyXG4gICAgICAgIGZyb21SaWdodDogbW92ZWRSaWdodFxyXG4gICAgICB9O1xyXG4gICAgICAvLyBJZiB3aWRnZXQgc3dhcCBpcyBlbmFibGVkIGFuZCBhcmVhIGlzIG9ic3RydWN0ZWQsIHNob3cgb3JpZ2luYWwgcG9zaXRpb25cclxuICAgICAgaWYgKHRoaXMubmd4V2lkZ2V0TW92ZXIgJiYgdGhpcy5ncmlkQ21wLmlzQXJlYU9ic3RydWN0ZWQodGFyZ2V0QXJlYSwgb3B0aW9ucykpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShzdGFydFBvcyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmdyaWRDbXAuaXNBcmVhT2JzdHJ1Y3RlZCh0YXJnZXRBcmVhLCBvcHRpb25zKSkge1xyXG4gICAgICAgIC8vIHRyeSB0byBnZXQgY2xvc2VyIHRvIHRoZSBkZXNpcmVkIHBvc2l0aW9uIGJ5IGxlYXZpbmcgdGhlIG9yaWdpbmFsIHBhdGhcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSB0YXJnZXRBcmVhLmhlaWdodDtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IHRhcmdldEFyZWEud2lkdGg7XHJcbiAgICAgICAgaWYgKGRlc2lyZWRGaW5hbFBvc2l0aW9uLnRvcCA8IHRhcmdldEFyZWEudG9wKSB7XHJcbiAgICAgICAgICB3aGlsZSAoZGVzaXJlZEZpbmFsUG9zaXRpb24udG9wIDw9ICh0YXJnZXRBcmVhLnRvcCAtIDEpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrUmVjdCA9IG5ldyBSZWN0YW5nbGUoe3RvcDogdGFyZ2V0QXJlYS50b3AgLSAxLCBsZWZ0OiB0YXJnZXRBcmVhLmxlZnQsIGhlaWdodCwgd2lkdGh9KTtcclxuICAgICAgICAgICAgY29uc3QgaXNSZWN0VmFjYW50ID0gIXRoaXMuZ3JpZENtcC5pc0FyZWFPYnN0cnVjdGVkKGNoZWNrUmVjdCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChpc1JlY3RWYWNhbnQpIHtcclxuICAgICAgICAgICAgICB0YXJnZXRBcmVhLnRvcC0tO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZXNpcmVkRmluYWxQb3NpdGlvbi50b3AgPiB0YXJnZXRBcmVhLnRvcCkge1xyXG4gICAgICAgICAgd2hpbGUgKGRlc2lyZWRGaW5hbFBvc2l0aW9uLnRvcCA+PSAodGFyZ2V0QXJlYS50b3AgKyAxKSkge1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHt0b3A6IHRhcmdldEFyZWEudG9wICsgMSwgbGVmdDogdGFyZ2V0QXJlYS5sZWZ0LCBoZWlnaHQsIHdpZHRofSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzUmVjdFZhY2FudCA9ICF0aGlzLmdyaWRDbXAuaXNBcmVhT2JzdHJ1Y3RlZChjaGVja1JlY3QsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAoaXNSZWN0VmFjYW50KSB7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0QXJlYS50b3ArKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGVzaXJlZEZpbmFsUG9zaXRpb24ubGVmdCA8IHRhcmdldEFyZWEubGVmdCkge1xyXG4gICAgICAgICAgd2hpbGUgKGRlc2lyZWRGaW5hbFBvc2l0aW9uLmxlZnQgPD0gKHRhcmdldEFyZWEubGVmdCAtIDEpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrUmVjdCA9IG5ldyBSZWN0YW5nbGUoe3RvcDogdGFyZ2V0QXJlYS50b3AsIGxlZnQ6IHRhcmdldEFyZWEubGVmdCAtIDEsIGhlaWdodCwgd2lkdGh9KTtcclxuICAgICAgICAgICAgY29uc3QgaXNSZWN0VmFjYW50ID0gIXRoaXMuZ3JpZENtcC5pc0FyZWFPYnN0cnVjdGVkKGNoZWNrUmVjdCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChpc1JlY3RWYWNhbnQpIHtcclxuICAgICAgICAgICAgICB0YXJnZXRBcmVhLmxlZnQtLTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGVzaXJlZEZpbmFsUG9zaXRpb24ubGVmdCA+IHRhcmdldEFyZWEubGVmdCkge1xyXG4gICAgICAgICAgd2hpbGUgKGRlc2lyZWRGaW5hbFBvc2l0aW9uLmxlZnQgPj0gKHRhcmdldEFyZWEubGVmdCArIDEpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrUmVjdCA9IG5ldyBSZWN0YW5nbGUoe3RvcDogdGFyZ2V0QXJlYS50b3AsIGxlZnQ6IHRhcmdldEFyZWEubGVmdCArIDEsIGhlaWdodCwgd2lkdGh9KTtcclxuICAgICAgICAgICAgY29uc3QgaXNSZWN0VmFjYW50ID0gIXRoaXMuZ3JpZENtcC5pc0FyZWFPYnN0cnVjdGVkKGNoZWNrUmVjdCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChpc1JlY3RWYWNhbnQpIHtcclxuICAgICAgICAgICAgICB0YXJnZXRBcmVhLmxlZnQrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSh0YXJnZXRBcmVhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUoc3RhcnRQb3MpO1xyXG4gIH1cclxufVxyXG4iXX0=