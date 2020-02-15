/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2 } from '@angular/core';
import { Grid } from '../../models/Grid.model';
import { NgxWidgetComponent } from '../widget/widget.component';
import { GridRenderer } from '../../models/GridRenderer.model';
import { Rectangle } from '../../models/Rectangle.model';
export class NgxWidgetGridComponent {
    /**
     * @param {?} el
     * @param {?} _changeDetector
     * @param {?} _renderer
     */
    constructor(el, _changeDetector, _renderer) {
        this.el = el;
        this._changeDetector = _changeDetector;
        this._renderer = _renderer;
        this.showGrid = false;
        this.widgetPositionChange = new EventEmitter();
        this.gridFull = new EventEmitter();
        this.gridAlreadyFull = false;
        this._highlightNextPosition = false;
        this.grid = new Grid(this.rows, this.columns);
        this.gridRenderer = new GridRenderer(this.grid);
    }
    /**
     * @return {?}
     */
    get rows() {
        return this._rows;
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    set rows(rows) {
        this._rows = rows;
        this.updateGridSize();
    }
    /**
     * @return {?}
     */
    get columns() {
        return this._columns;
    }
    /**
     * @param {?} cols
     * @return {?}
     */
    set columns(cols) {
        this._columns = cols;
        this.updateGridSize();
    }
    /**
     * @return {?}
     */
    get highlightNextPosition() {
        return this._highlightNextPosition;
    }
    /**
     * @param {?} highlightNext
     * @return {?}
     */
    set highlightNextPosition(highlightNext) {
        this._highlightNextPosition = highlightNext;
        if (highlightNext) {
            this.updateNextPositionHighlight();
        }
        else {
            this.resetHighlights();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.refreshWidgets();
        this.widgetComponents.changes.subscribe(() => {
            this.clearGrid();
            this.refreshWidgets();
        });
    }
    /**
     * @return {?}
     */
    refreshWidgets() {
        this.widgetComponents.forEach((widget) => {
            if (!this.hasWidget(widget)) {
                this.addWidget(widget, true);
            }
            else {
            }
        });
        this.updateRendering();
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    hasWidget(widget) {
        return this.grid.hasWidget(widget.getConfig());
    }
    /**
     * @param {?} widget
     * @param {?=} deferredRender
     * @return {?}
     */
    addWidget(widget, deferredRender) {
        this.grid.add(widget.getConfig());
        if (!deferredRender) {
            this.updateRendering();
        }
    }
    /**
     * @return {?}
     */
    clearGrid() {
        this.grid.removeAll();
    }
    /**
     * @return {?}
     */
    updateGridSize() {
        /** @type {?} */
        const columns = this.columns;
        /** @type {?} */
        const rows = this.rows;
        if (this.grid.columns !== columns || this.grid.rows !== rows) {
            this.grid.resize(rows, columns);
            this.updateRendering();
        }
    }
    /**
     * @return {?}
     */
    updateRendering() {
        this.gridRenderer.render(this.grid, this.emitUpdatePosition.bind(this));
        this.updateNextPositionHighlight();
        // TODO: retrieve all widgets and call their updateRendering
        if (this.widgetComponents) {
            this.widgetComponents.forEach((widget) => {
                this.updateWidget(widget, false);
            });
        }
    }
    /**
     * @return {?}
     */
    getGridRectangle() {
        /** @type {?} */
        const gridContainer = this.el.nativeElement;
        /** @type {?} */
        const rect = gridContainer.getBoundingClientRect();
        if (rect.width || rect.height || gridContainer.getClientRects().length) {
            /** @type {?} */
            const doc = gridContainer.ownerDocument;
            /** @type {?} */
            const docElem = doc.documentElement;
            return new Rectangle({
                top: rect.top + window.pageYOffset - docElem.clientTop,
                left: rect.left + window.pageXOffset - docElem.clientLeft,
                height: rect.height,
                width: rect.width
            });
        }
        return new Rectangle({ top: 0, left: 0, height: 0, width: 0 });
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    rasterizeCoords(x, y) {
        return this.gridRenderer.rasterizeCoords(x, y, this.el.nativeElement.clientWidth, this.el.nativeElement.clientHeight);
    }
    /**
     * @param {?} widget
     * @param {?} swappingWidgets
     * @return {?}
     */
    updateWidget(widget, swappingWidgets) {
        /** @type {?} */
        const config = widget.getConfig();
        /** @type {?} */
        const newPosition = config.position;
        /** @type {?} */
        const el = widget.getEl();
        this.gridRenderer.setWidgetPosition(config.id, newPosition, swappingWidgets);
        /** @type {?} */
        const widgetStyles = this.getWidgetStyle(widget);
        for (const style in widgetStyles) {
            if (widgetStyles.hasOwnProperty(style)) {
                this._renderer.setStyle(el.nativeElement, style, widgetStyles[style]);
            }
        }
        this.emitUpdatePosition(config);
        this.assessAvailableGridSpace();
    }
    /**
     * @param {?} widgetId
     * @return {?}
     */
    getWidgetPositionByWidgetId(widgetId) {
        return this.gridRenderer.getWidgetPosition(widgetId);
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    getWidgetPosition(widget) {
        return this.getWidgetPositionByWidgetId(widget.getConfig().id);
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    getWidgetStyle(widget) {
        return this.gridRenderer.getStyle(widget.getConfig().id);
    }
    /**
     * @param {?} i
     * @param {?} j
     * @return {?}
     */
    isPointObstructed(i, j) {
        return this.gridRenderer ? this.gridRenderer.isObstructed(i, j) : true;
    }
    /**
     * @param {?} area
     * @param {?} options
     * @return {?}
     */
    isAreaObstructed(area, options) {
        return this.gridRenderer ? this.gridRenderer.isAreaObstructed(area, options) : true;
    }
    /**
     * @param {?} area
     * @return {?}
     */
    areaObstructor(area) {
        return this.gridRenderer.obstructions[(area.top - 1) * this.grid.columns + (area.left - 1)];
    }
    /**
     * @param {?} area
     * @return {?}
     */
    highlightArea(area) {
        if (area.top && area.left && area.height && area.width) {
            setTimeout(() => {
                this.highlightedArea = area;
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * @return {?}
     */
    updateNextPositionHighlight() {
        if (this.highlightNextPosition) {
            this.highlightedArea = this.gridRenderer.getNextPosition();
        }
    }
    /**
     * @return {?}
     */
    getNextPosition() {
        return this.gridRenderer.getNextPosition();
    }
    /**
     * @return {?}
     */
    getPositions() {
        return this.grid.widgets;
    }
    /**
     * @return {?}
     */
    resetHighlights() {
        setTimeout(() => {
            this.highlightedArea = null;
            this._changeDetector.markForCheck();
        });
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    emitUpdatePosition(widget) {
        this.widgetPositionChange.emit({
            index: this.getWidgetIndex(widget),
            newPosition: new Rectangle(widget.position)
        });
    }
    /**
     * @param {?} widgetConfig
     * @return {?}
     */
    getWidgetIndex(widgetConfig) {
        for (let i = this.grid.widgets.length - 1; i >= 0; i--) {
            if (this.grid.widgets[i].id === widgetConfig.id) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @param {?} widgetId
     * @return {?}
     */
    getWidgetById(widgetId) {
        return this.widgetComponents.find(widgetCmp => {
            return widgetCmp.getConfig().id === widgetId;
        }) || null;
    }
    /**
     * @return {?}
     */
    assessAvailableGridSpace() {
        /** @type {?} */
        const gridHasSpaceLeft = this.gridRenderer.hasSpaceLeft();
        if (this.gridAlreadyFull) {
            if (gridHasSpaceLeft) {
                this.gridFull.emit(false);
                this.gridAlreadyFull = false;
            }
            else {
                /*No change to grid status. was and still is full*/
            }
        }
        else {
            if (!gridHasSpaceLeft) {
                this.gridFull.emit(true);
                this.gridAlreadyFull = true;
            }
            else {
                /*No change to grid status. had and still has available space*/
            }
        }
    }
}
NgxWidgetGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-widget-grid',
                template: "<ngx-grid-overlay [showGrid]=\"showGrid\"\r\n                  [renderer]=\"gridRenderer\"\r\n                  [highlight]=\"highlightedArea\"\r\n                  [cols]=\"columns\"\r\n                  [rows]=\"rows\">\r\n</ngx-grid-overlay>\r\n<div class=\"wg-grid-widgets\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;width:100%;position:absolute;overflow:hidden}"]
            }] }
];
/** @nocollapse */
NgxWidgetGridComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
NgxWidgetGridComponent.propDecorators = {
    showGrid: [{ type: Input }],
    widgetPositionChange: [{ type: Output }],
    gridFull: [{ type: Output }],
    widgetComponents: [{ type: ContentChildren, args: [NgxWidgetComponent,] }],
    rows: [{ type: Input }],
    columns: [{ type: Input }],
    highlightNextPosition: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgxWidgetGridComponent.prototype.showGrid;
    /** @type {?} */
    NgxWidgetGridComponent.prototype.widgetPositionChange;
    /** @type {?} */
    NgxWidgetGridComponent.prototype.gridFull;
    /** @type {?} */
    NgxWidgetGridComponent.prototype.widgetComponents;
    /** @type {?} */
    NgxWidgetGridComponent.prototype.grid;
    /** @type {?} */
    NgxWidgetGridComponent.prototype.gridRenderer;
    /** @type {?} */
    NgxWidgetGridComponent.prototype.highlightedArea;
    /** @type {?} */
    NgxWidgetGridComponent.prototype.gridAlreadyFull;
    /** @type {?} */
    NgxWidgetGridComponent.prototype._rows;
    /** @type {?} */
    NgxWidgetGridComponent.prototype._columns;
    /** @type {?} */
    NgxWidgetGridComponent.prototype._highlightNextPosition;
    /** @type {?} */
    NgxWidgetGridComponent.prototype.el;
    /** @type {?} */
    NgxWidgetGridComponent.prototype._changeDetector;
    /** @type {?} */
    NgxWidgetGridComponent.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2lkZ2V0LWdyaWQvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ncmlkL2dyaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBU3pELE1BQU07Ozs7OztJQWNKLFlBQW9CLEVBQWMsRUFDZCxpQkFDQTtRQUZBLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxvQkFBZSxHQUFmLGVBQWU7UUFDZixjQUFTLEdBQVQsU0FBUzt3QkFkVCxLQUFLO29DQUNtRCxJQUFJLFlBQVksRUFBd0I7d0JBQ2pFLElBQUksWUFBWSxFQUFXOytCQUtyRCxLQUFLO3NDQUdFLEtBQUs7UUFLbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqRDs7OztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjs7Ozs7SUFFRCxJQUNJLElBQUksQ0FBQyxJQUFJO1FBQ1gs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WUFBWSxFQUFFLENBQUM7UUFDMUQsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQzthQUM5QjtpQkFBTTs7YUFFTjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzthQUM3QjtpQkFBTTs7YUFFTjtTQUNGO0tBQ0Y7OztZQXpQRixTQUFTLFNBQUM7Z0JBQ0UsUUFBUSxFQUFFLGlCQUFpQjtnQkFFM0IsZ1ZBQW9DO2dCQUNwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFwQlYsVUFBVTtZQUhWLGlCQUFpQjtZQVFqQixTQUFTOzs7dUJBa0JSLEtBQUs7bUNBQ0wsTUFBTTt1QkFDTixNQUFNOytCQUNOLGVBQWUsU0FBQyxrQkFBa0I7bUJBb0JsQyxLQUFLO3NCQVVMLEtBQUs7b0NBVUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBRdWVyeUxpc3QsXHJcbiAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdyaWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvR3JpZC5tb2RlbCc7XHJcbmltcG9ydCB7IE5neFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uL3dpZGdldC93aWRnZXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR3JpZFJlbmRlcmVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0dyaWRSZW5kZXJlci5tb2RlbCc7XHJcbmltcG9ydCB7IENlbGwgfSBmcm9tICcuLi8uLi9tb2RlbHMvQ2VsbC5tb2RlbCc7XHJcbmltcG9ydCB7IFdpZGdldENvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVscy9XaWRnZXRDb25maWcubW9kZWwnO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuLi8uLi9tb2RlbHMvUmVjdGFuZ2xlLm1vZGVsJztcclxuaW1wb3J0IHsgV2lkZ2V0UG9zaXRpb25DaGFuZ2UgfSBmcm9tICcuLi8uLi9tb2RlbHMvd2lkZ2V0UG9zaXRpb25DaGFuZ2UuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgICAgICAgICAgc2VsZWN0b3I6ICduZ3gtd2lkZ2V0LWdyaWQnLFxyXG4gICAgICAgICAgICAgc3R5bGVVcmxzOiBbJy4vZ3JpZC5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2dyaWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgICAgICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxuICAgICAgICAgICB9KVxyXG5leHBvcnQgY2xhc3MgTmd4V2lkZ2V0R3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG5cclxuICBASW5wdXQoKSBzaG93R3JpZCA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgd2lkZ2V0UG9zaXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxXaWRnZXRQb3NpdGlvbkNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFdpZGdldFBvc2l0aW9uQ2hhbmdlPigpO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgZ3JpZEZ1bGw6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAQ29udGVudENoaWxkcmVuKE5neFdpZGdldENvbXBvbmVudCkgcHVibGljIHdpZGdldENvbXBvbmVudHM6IFF1ZXJ5TGlzdDxOZ3hXaWRnZXRDb21wb25lbnQ+O1xyXG4gIHB1YmxpYyBncmlkOiBHcmlkO1xyXG4gIHB1YmxpYyBncmlkUmVuZGVyZXI6IEdyaWRSZW5kZXJlcjtcclxuICBwdWJsaWMgaGlnaGxpZ2h0ZWRBcmVhOiBSZWN0YW5nbGU7XHJcbiAgcHVibGljIGdyaWRBbHJlYWR5RnVsbCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBfcm93czogbnVtYmVyO1xyXG4gIHB1YmxpYyBfY29sdW1uczogbnVtYmVyO1xyXG4gIHB1YmxpYyBfaGlnaGxpZ2h0TmV4dFBvc2l0aW9uID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcclxuICAgIHRoaXMuZ3JpZCA9IG5ldyBHcmlkKHRoaXMucm93cywgdGhpcy5jb2x1bW5zKTtcclxuICAgIHRoaXMuZ3JpZFJlbmRlcmVyID0gbmV3IEdyaWRSZW5kZXJlcih0aGlzLmdyaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJvd3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcm93cztcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHJvd3Mocm93cykge1xyXG4gICAgdGhpcy5fcm93cyA9IHJvd3M7XHJcbiAgICB0aGlzLnVwZGF0ZUdyaWRTaXplKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY29sdW1ucygpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY29sdW1ucyhjb2xzKSB7XHJcbiAgICB0aGlzLl9jb2x1bW5zID0gY29scztcclxuICAgIHRoaXMudXBkYXRlR3JpZFNpemUoKTtcclxuICB9XHJcblxyXG4gIGdldCBoaWdobGlnaHROZXh0UG9zaXRpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlnaGxpZ2h0TmV4dFBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgaGlnaGxpZ2h0TmV4dFBvc2l0aW9uKGhpZ2hsaWdodE5leHQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2hpZ2hsaWdodE5leHRQb3NpdGlvbiA9IGhpZ2hsaWdodE5leHQ7XHJcbiAgICBpZiAoaGlnaGxpZ2h0TmV4dCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZU5leHRQb3NpdGlvbkhpZ2hsaWdodCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZXNldEhpZ2hsaWdodHMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVmcmVzaFdpZGdldHMoKTtcclxuICAgIHRoaXMud2lkZ2V0Q29tcG9uZW50cy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2xlYXJHcmlkKCk7XHJcbiAgICAgIHRoaXMucmVmcmVzaFdpZGdldHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaFdpZGdldHMoKSB7XHJcbiAgICB0aGlzLndpZGdldENvbXBvbmVudHMuZm9yRWFjaCgod2lkZ2V0OiBOZ3hXaWRnZXRDb21wb25lbnQpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmhhc1dpZGdldCh3aWRnZXQpKSB7XHJcbiAgICAgICAgdGhpcy5hZGRXaWRnZXQod2lkZ2V0LCB0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnVwZGF0ZVJlbmRlcmluZygpO1xyXG4gIH1cclxuXHJcbiAgaGFzV2lkZ2V0KHdpZGdldDogTmd4V2lkZ2V0Q29tcG9uZW50KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmlkLmhhc1dpZGdldCh3aWRnZXQuZ2V0Q29uZmlnKCkpO1xyXG4gIH1cclxuXHJcbiAgYWRkV2lkZ2V0KHdpZGdldDogTmd4V2lkZ2V0Q29tcG9uZW50LCBkZWZlcnJlZFJlbmRlcj86IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZ3JpZC5hZGQod2lkZ2V0LmdldENvbmZpZygpKTtcclxuICAgIGlmICghZGVmZXJyZWRSZW5kZXIpIHtcclxuICAgICAgdGhpcy51cGRhdGVSZW5kZXJpbmcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsZWFyR3JpZCgpIHtcclxuICAgIHRoaXMuZ3JpZC5yZW1vdmVBbGwoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUdyaWRTaXplKCkge1xyXG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuY29sdW1ucztcclxuICAgIGNvbnN0IHJvd3MgPSB0aGlzLnJvd3M7XHJcbiAgICBpZiAodGhpcy5ncmlkLmNvbHVtbnMgIT09IGNvbHVtbnMgfHwgdGhpcy5ncmlkLnJvd3MgIT09IHJvd3MpIHtcclxuICAgICAgdGhpcy5ncmlkLnJlc2l6ZShyb3dzLCBjb2x1bW5zKTtcclxuICAgICAgdGhpcy51cGRhdGVSZW5kZXJpbmcoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVJlbmRlcmluZygpIHtcclxuICAgIHRoaXMuZ3JpZFJlbmRlcmVyLnJlbmRlcih0aGlzLmdyaWQsIHRoaXMuZW1pdFVwZGF0ZVBvc2l0aW9uLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy51cGRhdGVOZXh0UG9zaXRpb25IaWdobGlnaHQoKTtcclxuICAgIC8vIFRPRE86IHJldHJpZXZlIGFsbCB3aWRnZXRzIGFuZCBjYWxsIHRoZWlyIHVwZGF0ZVJlbmRlcmluZ1xyXG4gICAgaWYgKHRoaXMud2lkZ2V0Q29tcG9uZW50cykge1xyXG4gICAgICB0aGlzLndpZGdldENvbXBvbmVudHMuZm9yRWFjaCgod2lkZ2V0OiBOZ3hXaWRnZXRDb21wb25lbnQpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVdpZGdldCh3aWRnZXQsIGZhbHNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRHcmlkUmVjdGFuZ2xlKCk6IFJlY3RhbmdsZSB7XHJcbiAgICBjb25zdCBncmlkQ29udGFpbmVyID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIC8vIGMuZi4galF1ZXJ5I29mZnNldDogaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi8yZDcxNTk0MGI5YjZmZGVlZDAwNWNkMDA2YzhiZjYzOTUxY2Y3ZmIyL3NyYy9vZmZzZXQuanMjTDkzLTEwNVxyXG4gICAgY29uc3QgcmVjdCA9IGdyaWRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBpZiAocmVjdC53aWR0aCB8fCByZWN0LmhlaWdodCB8fCBncmlkQ29udGFpbmVyLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGRvYyA9IGdyaWRDb250YWluZXIub3duZXJEb2N1bWVudDtcclxuICAgICAgY29uc3QgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRUb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSh7dG9wOiAwLCBsZWZ0OiAwLCBoZWlnaHQ6IDAsIHdpZHRoOiAwfSk7XHJcbiAgfVxyXG5cclxuICByYXN0ZXJpemVDb29yZHMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBDZWxsIHtcclxuICAgIHJldHVybiB0aGlzLmdyaWRSZW5kZXJlci5yYXN0ZXJpemVDb29yZHMoeCwgeSwgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoLCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVdpZGdldCh3aWRnZXQ6IE5neFdpZGdldENvbXBvbmVudCwgc3dhcHBpbmdXaWRnZXRzOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBjb25maWcgPSB3aWRnZXQuZ2V0Q29uZmlnKCk7XHJcbiAgICBjb25zdCBuZXdQb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbjtcclxuICAgIGNvbnN0IGVsOiBFbGVtZW50UmVmID0gd2lkZ2V0LmdldEVsKCk7XHJcbiAgICB0aGlzLmdyaWRSZW5kZXJlci5zZXRXaWRnZXRQb3NpdGlvbihjb25maWcuaWQsIG5ld1Bvc2l0aW9uLCBzd2FwcGluZ1dpZGdldHMpO1xyXG4gICAgY29uc3Qgd2lkZ2V0U3R5bGVzID0gdGhpcy5nZXRXaWRnZXRTdHlsZSh3aWRnZXQpO1xyXG4gICAgZm9yIChjb25zdCBzdHlsZSBpbiB3aWRnZXRTdHlsZXMpIHtcclxuICAgICAgaWYgKHdpZGdldFN0eWxlcy5oYXNPd25Qcm9wZXJ0eShzdHlsZSkpIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbC5uYXRpdmVFbGVtZW50LCBzdHlsZSwgd2lkZ2V0U3R5bGVzW3N0eWxlXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZW1pdFVwZGF0ZVBvc2l0aW9uKGNvbmZpZyk7XHJcbiAgICB0aGlzLmFzc2Vzc0F2YWlsYWJsZUdyaWRTcGFjZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2lkZ2V0UG9zaXRpb25CeVdpZGdldElkKHdpZGdldElkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmdyaWRSZW5kZXJlci5nZXRXaWRnZXRQb3NpdGlvbih3aWRnZXRJZCk7XHJcbiAgfVxyXG5cclxuICBnZXRXaWRnZXRQb3NpdGlvbih3aWRnZXQ6IE5neFdpZGdldENvbXBvbmVudCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0V2lkZ2V0UG9zaXRpb25CeVdpZGdldElkKHdpZGdldC5nZXRDb25maWcoKS5pZCk7XHJcbiAgfVxyXG5cclxuICBnZXRXaWRnZXRTdHlsZSh3aWRnZXQ6IE5neFdpZGdldENvbXBvbmVudCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JpZFJlbmRlcmVyLmdldFN0eWxlKHdpZGdldC5nZXRDb25maWcoKS5pZCk7XHJcbiAgfVxyXG5cclxuICBpc1BvaW50T2JzdHJ1Y3RlZChpOiBudW1iZXIsIGo6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JpZFJlbmRlcmVyID8gdGhpcy5ncmlkUmVuZGVyZXIuaXNPYnN0cnVjdGVkKGksIGopIDogdHJ1ZTtcclxuICB9XHJcblxyXG4gIGlzQXJlYU9ic3RydWN0ZWQoYXJlYTogUmVjdGFuZ2xlLFxyXG4gICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICBleGNsdWRlZEFyZWE/OiBSZWN0YW5nbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgIGZyb21Cb3R0b20/OiBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgICAgICBmcm9tUmlnaHQ/OiBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgICAgfSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JpZFJlbmRlcmVyID8gdGhpcy5ncmlkUmVuZGVyZXIuaXNBcmVhT2JzdHJ1Y3RlZChhcmVhLCBvcHRpb25zKSA6IHRydWU7XHJcbiAgfVxyXG5cclxuICBhcmVhT2JzdHJ1Y3RvcihhcmVhOiBSZWN0YW5nbGUpIHtcclxuICAgIHJldHVybiB0aGlzLmdyaWRSZW5kZXJlci5vYnN0cnVjdGlvbnNbKGFyZWEudG9wIC0gMSkgKiB0aGlzLmdyaWQuY29sdW1ucyArIChhcmVhLmxlZnQgLSAxKV07XHJcbiAgfVxyXG5cclxuICBoaWdobGlnaHRBcmVhKGFyZWE6IFJlY3RhbmdsZSkge1xyXG4gICAgaWYgKGFyZWEudG9wICYmIGFyZWEubGVmdCAmJiBhcmVhLmhlaWdodCAmJiBhcmVhLndpZHRoKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRBcmVhID0gYXJlYTtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVOZXh0UG9zaXRpb25IaWdobGlnaHQoKSB7XHJcbiAgICBpZiAodGhpcy5oaWdobGlnaHROZXh0UG9zaXRpb24pIHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRlZEFyZWEgPSB0aGlzLmdyaWRSZW5kZXJlci5nZXROZXh0UG9zaXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldE5leHRQb3NpdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmdyaWRSZW5kZXJlci5nZXROZXh0UG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIGdldFBvc2l0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLmdyaWQud2lkZ2V0cztcclxuICB9XHJcblxyXG4gIHJlc2V0SGlnaGxpZ2h0cygpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodGVkQXJlYSA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBlbWl0VXBkYXRlUG9zaXRpb24od2lkZ2V0OiBXaWRnZXRDb25maWcpIHtcclxuICAgIHRoaXMud2lkZ2V0UG9zaXRpb25DaGFuZ2UuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5nZXRXaWRnZXRJbmRleCh3aWRnZXQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zaXRpb246IG5ldyBSZWN0YW5nbGUod2lkZ2V0LnBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2lkZ2V0SW5kZXgod2lkZ2V0Q29uZmlnOiBXaWRnZXRDb25maWcpIHtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLmdyaWQud2lkZ2V0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBpZiAodGhpcy5ncmlkLndpZGdldHNbaV0uaWQgPT09IHdpZGdldENvbmZpZy5pZCkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfVxyXG5cclxuICBnZXRXaWRnZXRCeUlkKHdpZGdldElkOiBzdHJpbmcpOiBOZ3hXaWRnZXRDb21wb25lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0Q29tcG9uZW50cy5maW5kKHdpZGdldENtcCA9PiB7XHJcbiAgICAgIHJldHVybiB3aWRnZXRDbXAuZ2V0Q29uZmlnKCkuaWQgPT09IHdpZGdldElkO1xyXG4gICAgfSkgfHwgbnVsbDtcclxuICB9XHJcblxyXG4gIGFzc2Vzc0F2YWlsYWJsZUdyaWRTcGFjZSgpIHtcclxuICAgIGNvbnN0IGdyaWRIYXNTcGFjZUxlZnQgPSB0aGlzLmdyaWRSZW5kZXJlci5oYXNTcGFjZUxlZnQoKTtcclxuICAgIGlmICh0aGlzLmdyaWRBbHJlYWR5RnVsbCkge1xyXG4gICAgICBpZiAoZ3JpZEhhc1NwYWNlTGVmdCkge1xyXG4gICAgICAgIHRoaXMuZ3JpZEZ1bGwuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ncmlkQWxyZWFkeUZ1bGwgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvKk5vIGNoYW5nZSB0byBncmlkIHN0YXR1cy4gd2FzIGFuZCBzdGlsbCBpcyBmdWxsKi9cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCFncmlkSGFzU3BhY2VMZWZ0KSB7XHJcbiAgICAgICAgdGhpcy5ncmlkRnVsbC5lbWl0KHRydWUpO1xyXG4gICAgICAgIHRoaXMuZ3JpZEFscmVhZHlGdWxsID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvKk5vIGNoYW5nZSB0byBncmlkIHN0YXR1cy4gaGFkIGFuZCBzdGlsbCBoYXMgYXZhaWxhYmxlIHNwYWNlKi9cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=