/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2 } from '@angular/core';
import { Grid } from '../../models/Grid.model';
import { NgxWidgetComponent } from '../widget/widget.component';
import { GridRenderer } from '../../models/GridRenderer.model';
import { Rectangle } from '../../models/Rectangle.model';
var NgxWidgetGridComponent = /** @class */ (function () {
    function NgxWidgetGridComponent(el, _changeDetector, _renderer) {
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
    Object.defineProperty(NgxWidgetGridComponent.prototype, "rows", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rows;
        },
        set: /**
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            this._rows = rows;
            this.updateGridSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxWidgetGridComponent.prototype, "columns", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columns;
        },
        set: /**
         * @param {?} cols
         * @return {?}
         */
        function (cols) {
            this._columns = cols;
            this.updateGridSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxWidgetGridComponent.prototype, "highlightNextPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this._highlightNextPosition;
        },
        set: /**
         * @param {?} highlightNext
         * @return {?}
         */
        function (highlightNext) {
            this._highlightNextPosition = highlightNext;
            if (highlightNext) {
                this.updateNextPositionHighlight();
            }
            else {
                this.resetHighlights();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.refreshWidgets();
        this.widgetComponents.changes.subscribe(function () {
            _this.clearGrid();
            _this.refreshWidgets();
        });
    };
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.refreshWidgets = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.widgetComponents.forEach(function (widget) {
            if (!_this.hasWidget(widget)) {
                _this.addWidget(widget, true);
            }
            else {
            }
        });
        this.updateRendering();
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.hasWidget = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        return this.grid.hasWidget(widget.getConfig());
    };
    /**
     * @param {?} widget
     * @param {?=} deferredRender
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.addWidget = /**
     * @param {?} widget
     * @param {?=} deferredRender
     * @return {?}
     */
    function (widget, deferredRender) {
        this.grid.add(widget.getConfig());
        if (!deferredRender) {
            this.updateRendering();
        }
    };
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.clearGrid = /**
     * @return {?}
     */
    function () {
        this.grid.removeAll();
    };
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.updateGridSize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var columns = this.columns;
        /** @type {?} */
        var rows = this.rows;
        if (this.grid.columns !== columns || this.grid.rows !== rows) {
            this.grid.resize(rows, columns);
            this.updateRendering();
        }
    };
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.updateRendering = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.gridRenderer.render(this.grid, this.emitUpdatePosition.bind(this));
        this.updateNextPositionHighlight();
        // TODO: retrieve all widgets and call their updateRendering
        if (this.widgetComponents) {
            this.widgetComponents.forEach(function (widget) {
                _this.updateWidget(widget, false);
            });
        }
    };
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.getGridRectangle = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var gridContainer = this.el.nativeElement;
        /** @type {?} */
        var rect = gridContainer.getBoundingClientRect();
        if (rect.width || rect.height || gridContainer.getClientRects().length) {
            /** @type {?} */
            var doc = gridContainer.ownerDocument;
            /** @type {?} */
            var docElem = doc.documentElement;
            return new Rectangle({
                top: rect.top + window.pageYOffset - docElem.clientTop,
                left: rect.left + window.pageXOffset - docElem.clientLeft,
                height: rect.height,
                width: rect.width
            });
        }
        return new Rectangle({ top: 0, left: 0, height: 0, width: 0 });
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.rasterizeCoords = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        return this.gridRenderer.rasterizeCoords(x, y, this.el.nativeElement.clientWidth, this.el.nativeElement.clientHeight);
    };
    /**
     * @param {?} widget
     * @param {?} swappingWidgets
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.updateWidget = /**
     * @param {?} widget
     * @param {?} swappingWidgets
     * @return {?}
     */
    function (widget, swappingWidgets) {
        /** @type {?} */
        var config = widget.getConfig();
        /** @type {?} */
        var newPosition = config.position;
        /** @type {?} */
        var el = widget.getEl();
        this.gridRenderer.setWidgetPosition(config.id, newPosition, swappingWidgets);
        /** @type {?} */
        var widgetStyles = this.getWidgetStyle(widget);
        for (var style in widgetStyles) {
            if (widgetStyles.hasOwnProperty(style)) {
                this._renderer.setStyle(el.nativeElement, style, widgetStyles[style]);
            }
        }
        this.emitUpdatePosition(config);
        this.assessAvailableGridSpace();
    };
    /**
     * @param {?} widgetId
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.getWidgetPositionByWidgetId = /**
     * @param {?} widgetId
     * @return {?}
     */
    function (widgetId) {
        return this.gridRenderer.getWidgetPosition(widgetId);
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.getWidgetPosition = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        return this.getWidgetPositionByWidgetId(widget.getConfig().id);
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.getWidgetStyle = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        return this.gridRenderer.getStyle(widget.getConfig().id);
    };
    /**
     * @param {?} i
     * @param {?} j
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.isPointObstructed = /**
     * @param {?} i
     * @param {?} j
     * @return {?}
     */
    function (i, j) {
        return this.gridRenderer ? this.gridRenderer.isObstructed(i, j) : true;
    };
    /**
     * @param {?} area
     * @param {?} options
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.isAreaObstructed = /**
     * @param {?} area
     * @param {?} options
     * @return {?}
     */
    function (area, options) {
        return this.gridRenderer ? this.gridRenderer.isAreaObstructed(area, options) : true;
    };
    /**
     * @param {?} area
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.areaObstructor = /**
     * @param {?} area
     * @return {?}
     */
    function (area) {
        return this.gridRenderer.obstructions[(area.top - 1) * this.grid.columns + (area.left - 1)];
    };
    /**
     * @param {?} area
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.highlightArea = /**
     * @param {?} area
     * @return {?}
     */
    function (area) {
        var _this = this;
        if (area.top && area.left && area.height && area.width) {
            setTimeout(function () {
                _this.highlightedArea = area;
                _this._changeDetector.markForCheck();
            });
        }
    };
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.updateNextPositionHighlight = /**
     * @return {?}
     */
    function () {
        if (this.highlightNextPosition) {
            this.highlightedArea = this.gridRenderer.getNextPosition();
        }
    };
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.getNextPosition = /**
     * @return {?}
     */
    function () {
        return this.gridRenderer.getNextPosition();
    };
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.getPositions = /**
     * @return {?}
     */
    function () {
        return this.grid.widgets;
    };
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.resetHighlights = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.highlightedArea = null;
            _this._changeDetector.markForCheck();
        });
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.emitUpdatePosition = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        this.widgetPositionChange.emit({
            index: this.getWidgetIndex(widget),
            newPosition: new Rectangle(widget.position)
        });
    };
    /**
     * @param {?} widgetConfig
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.getWidgetIndex = /**
     * @param {?} widgetConfig
     * @return {?}
     */
    function (widgetConfig) {
        for (var i = this.grid.widgets.length - 1; i >= 0; i--) {
            if (this.grid.widgets[i].id === widgetConfig.id) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @param {?} widgetId
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.getWidgetById = /**
     * @param {?} widgetId
     * @return {?}
     */
    function (widgetId) {
        return this.widgetComponents.find(function (widgetCmp) {
            return widgetCmp.getConfig().id === widgetId;
        }) || null;
    };
    /**
     * @return {?}
     */
    NgxWidgetGridComponent.prototype.assessAvailableGridSpace = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var gridHasSpaceLeft = this.gridRenderer.hasSpaceLeft();
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
    };
    NgxWidgetGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-widget-grid',
                    template: "<ngx-grid-overlay [showGrid]=\"showGrid\"\r\n                  [renderer]=\"gridRenderer\"\r\n                  [highlight]=\"highlightedArea\"\r\n                  [cols]=\"columns\"\r\n                  [rows]=\"rows\">\r\n</ngx-grid-overlay>\r\n<div class=\"wg-grid-widgets\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{height:100%;width:100%;position:absolute;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    NgxWidgetGridComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    NgxWidgetGridComponent.propDecorators = {
        showGrid: [{ type: Input }],
        widgetPositionChange: [{ type: Output }],
        gridFull: [{ type: Output }],
        widgetComponents: [{ type: ContentChildren, args: [NgxWidgetComponent,] }],
        rows: [{ type: Input }],
        columns: [{ type: Input }],
        highlightNextPosition: [{ type: Input }]
    };
    return NgxWidgetGridComponent;
}());
export { NgxWidgetGridComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2lkZ2V0LWdyaWQvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ncmlkL2dyaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztJQXVCdkQsZ0NBQW9CLEVBQWMsRUFDZCxpQkFDQTtRQUZBLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxvQkFBZSxHQUFmLGVBQWU7UUFDZixjQUFTLEdBQVQsU0FBUzt3QkFkVCxLQUFLO29DQUNtRCxJQUFJLFlBQVksRUFBd0I7d0JBQ2pFLElBQUksWUFBWSxFQUFXOytCQUtyRCxLQUFLO3NDQUdFLEtBQUs7UUFLbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqRDtJQUVELHNCQUFJLHdDQUFJOzs7O1FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7Ozs7O1FBRUQsVUFDUyxJQUFJO1lBQ1gsSUFBSSxDQUFDLEtBQUss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OztJQUFiLFVBQWMsUUFBZ0I7UUFDNUIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztZQUN6QyxPQUFPLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDO1NBQzlDLENBQUMsSUFBSSxJQUFJLENBQUM7S0FDWjs7OztJQUVELHlEQUF3Qjs7O0lBQXhCOztRQUNFLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2FBQzlCO2lCQUFNOzthQUVOO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2FBQzdCO2lCQUFNOzthQUVOO1NBQ0Y7S0FDRjs7Z0JBelBGLFNBQVMsU0FBQztvQkFDRSxRQUFRLEVBQUUsaUJBQWlCO29CQUUzQixnVkFBb0M7b0JBQ3BDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBcEJWLFVBQVU7Z0JBSFYsaUJBQWlCO2dCQVFqQixTQUFTOzs7MkJBa0JSLEtBQUs7dUNBQ0wsTUFBTTsyQkFDTixNQUFNO21DQUNOLGVBQWUsU0FBQyxrQkFBa0I7dUJBb0JsQyxLQUFLOzBCQVVMLEtBQUs7d0NBVUwsS0FBSzs7aUNBeEVSOztTQTJCYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFJlbmRlcmVyMlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHcmlkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0dyaWQubW9kZWwnO1xyXG5pbXBvcnQgeyBOZ3hXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi93aWRnZXQvd2lkZ2V0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdyaWRSZW5kZXJlciB9IGZyb20gJy4uLy4uL21vZGVscy9HcmlkUmVuZGVyZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0NlbGwubW9kZWwnO1xyXG5pbXBvcnQgeyBXaWRnZXRDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbHMvV2lkZ2V0Q29uZmlnLm1vZGVsJztcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1JlY3RhbmdsZS5tb2RlbCc7XHJcbmltcG9ydCB7IFdpZGdldFBvc2l0aW9uQ2hhbmdlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3dpZGdldFBvc2l0aW9uQ2hhbmdlLmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgICAgICAgICAgIHNlbGVjdG9yOiAnbmd4LXdpZGdldC1ncmlkJyxcclxuICAgICAgICAgICAgIHN0eWxlVXJsczogWycuL2dyaWQuY29tcG9uZW50LnNjc3MnXSxcclxuICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9ncmlkLmNvbXBvbmVudC5odG1sJyxcclxuICAgICAgICAgICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgICAgICAgICAgfSlcclxuZXhwb3J0IGNsYXNzIE5neFdpZGdldEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgQElucHV0KCkgc2hvd0dyaWQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgcHVibGljIHdpZGdldFBvc2l0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8V2lkZ2V0UG9zaXRpb25DaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxXaWRnZXRQb3NpdGlvbkNoYW5nZT4oKTtcclxuICBAT3V0cHV0KCkgcHVibGljIGdyaWRGdWxsOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihOZ3hXaWRnZXRDb21wb25lbnQpIHB1YmxpYyB3aWRnZXRDb21wb25lbnRzOiBRdWVyeUxpc3Q8Tmd4V2lkZ2V0Q29tcG9uZW50PjtcclxuICBwdWJsaWMgZ3JpZDogR3JpZDtcclxuICBwdWJsaWMgZ3JpZFJlbmRlcmVyOiBHcmlkUmVuZGVyZXI7XHJcbiAgcHVibGljIGhpZ2hsaWdodGVkQXJlYTogUmVjdGFuZ2xlO1xyXG4gIHB1YmxpYyBncmlkQWxyZWFkeUZ1bGwgPSBmYWxzZTtcclxuICBwdWJsaWMgX3Jvd3M6IG51bWJlcjtcclxuICBwdWJsaWMgX2NvbHVtbnM6IG51bWJlcjtcclxuICBwdWJsaWMgX2hpZ2hsaWdodE5leHRQb3NpdGlvbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XHJcbiAgICB0aGlzLmdyaWQgPSBuZXcgR3JpZCh0aGlzLnJvd3MsIHRoaXMuY29sdW1ucyk7XHJcbiAgICB0aGlzLmdyaWRSZW5kZXJlciA9IG5ldyBHcmlkUmVuZGVyZXIodGhpcy5ncmlkKTtcclxuICB9XHJcblxyXG4gIGdldCByb3dzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCByb3dzKHJvd3MpIHtcclxuICAgIHRoaXMuX3Jvd3MgPSByb3dzO1xyXG4gICAgdGhpcy51cGRhdGVHcmlkU2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbHVtbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGNvbHVtbnMoY29scykge1xyXG4gICAgdGhpcy5fY29sdW1ucyA9IGNvbHM7XHJcbiAgICB0aGlzLnVwZGF0ZUdyaWRTaXplKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgaGlnaGxpZ2h0TmV4dFBvc2l0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodE5leHRQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGhpZ2hsaWdodE5leHRQb3NpdGlvbihoaWdobGlnaHROZXh0OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oaWdobGlnaHROZXh0UG9zaXRpb24gPSBoaWdobGlnaHROZXh0O1xyXG4gICAgaWYgKGhpZ2hsaWdodE5leHQpIHtcclxuICAgICAgdGhpcy51cGRhdGVOZXh0UG9zaXRpb25IaWdobGlnaHQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVzZXRIaWdobGlnaHRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlZnJlc2hXaWRnZXRzKCk7XHJcbiAgICB0aGlzLndpZGdldENvbXBvbmVudHMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNsZWFyR3JpZCgpO1xyXG4gICAgICB0aGlzLnJlZnJlc2hXaWRnZXRzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hXaWRnZXRzKCkge1xyXG4gICAgdGhpcy53aWRnZXRDb21wb25lbnRzLmZvckVhY2goKHdpZGdldDogTmd4V2lkZ2V0Q29tcG9uZW50KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5oYXNXaWRnZXQod2lkZ2V0KSkge1xyXG4gICAgICAgIHRoaXMuYWRkV2lkZ2V0KHdpZGdldCwgdHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy51cGRhdGVSZW5kZXJpbmcoKTtcclxuICB9XHJcblxyXG4gIGhhc1dpZGdldCh3aWRnZXQ6IE5neFdpZGdldENvbXBvbmVudCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JpZC5oYXNXaWRnZXQod2lkZ2V0LmdldENvbmZpZygpKTtcclxuICB9XHJcblxyXG4gIGFkZFdpZGdldCh3aWRnZXQ6IE5neFdpZGdldENvbXBvbmVudCwgZGVmZXJyZWRSZW5kZXI/OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmdyaWQuYWRkKHdpZGdldC5nZXRDb25maWcoKSk7XHJcbiAgICBpZiAoIWRlZmVycmVkUmVuZGVyKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVuZGVyaW5nKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGVhckdyaWQoKSB7XHJcbiAgICB0aGlzLmdyaWQucmVtb3ZlQWxsKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHcmlkU2l6ZSgpIHtcclxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmNvbHVtbnM7XHJcbiAgICBjb25zdCByb3dzID0gdGhpcy5yb3dzO1xyXG4gICAgaWYgKHRoaXMuZ3JpZC5jb2x1bW5zICE9PSBjb2x1bW5zIHx8IHRoaXMuZ3JpZC5yb3dzICE9PSByb3dzKSB7XHJcbiAgICAgIHRoaXMuZ3JpZC5yZXNpemUocm93cywgY29sdW1ucyk7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVuZGVyaW5nKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVSZW5kZXJpbmcoKSB7XHJcbiAgICB0aGlzLmdyaWRSZW5kZXJlci5yZW5kZXIodGhpcy5ncmlkLCB0aGlzLmVtaXRVcGRhdGVQb3NpdGlvbi5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMudXBkYXRlTmV4dFBvc2l0aW9uSGlnaGxpZ2h0KCk7XHJcbiAgICAvLyBUT0RPOiByZXRyaWV2ZSBhbGwgd2lkZ2V0cyBhbmQgY2FsbCB0aGVpciB1cGRhdGVSZW5kZXJpbmdcclxuICAgIGlmICh0aGlzLndpZGdldENvbXBvbmVudHMpIHtcclxuICAgICAgdGhpcy53aWRnZXRDb21wb25lbnRzLmZvckVhY2goKHdpZGdldDogTmd4V2lkZ2V0Q29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVXaWRnZXQod2lkZ2V0LCBmYWxzZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0R3JpZFJlY3RhbmdsZSgpOiBSZWN0YW5nbGUge1xyXG4gICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAvLyBjLmYuIGpRdWVyeSNvZmZzZXQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvMmQ3MTU5NDBiOWI2ZmRlZWQwMDVjZDAwNmM4YmY2Mzk1MWNmN2ZiMi9zcmMvb2Zmc2V0LmpzI0w5My0xMDVcclxuICAgIGNvbnN0IHJlY3QgPSBncmlkQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgaWYgKHJlY3Qud2lkdGggfHwgcmVjdC5oZWlnaHQgfHwgZ3JpZENvbnRhaW5lci5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBkb2MgPSBncmlkQ29udGFpbmVyLm93bmVyRG9jdW1lbnQ7XHJcbiAgICAgIGNvbnN0IGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCAtIGRvY0VsZW0uY2xpZW50TGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUoe3RvcDogMCwgbGVmdDogMCwgaGVpZ2h0OiAwLCB3aWR0aDogMH0pO1xyXG4gIH1cclxuXHJcbiAgcmFzdGVyaXplQ29vcmRzKHg6IG51bWJlciwgeTogbnVtYmVyKTogQ2VsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmlkUmVuZGVyZXIucmFzdGVyaXplQ29vcmRzKHgsIHksIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVXaWRnZXQod2lkZ2V0OiBOZ3hXaWRnZXRDb21wb25lbnQsIHN3YXBwaW5nV2lkZ2V0czogYm9vbGVhbikge1xyXG4gICAgY29uc3QgY29uZmlnID0gd2lkZ2V0LmdldENvbmZpZygpO1xyXG4gICAgY29uc3QgbmV3UG9zaXRpb24gPSBjb25maWcucG9zaXRpb247XHJcbiAgICBjb25zdCBlbDogRWxlbWVudFJlZiA9IHdpZGdldC5nZXRFbCgpO1xyXG4gICAgdGhpcy5ncmlkUmVuZGVyZXIuc2V0V2lkZ2V0UG9zaXRpb24oY29uZmlnLmlkLCBuZXdQb3NpdGlvbiwgc3dhcHBpbmdXaWRnZXRzKTtcclxuICAgIGNvbnN0IHdpZGdldFN0eWxlcyA9IHRoaXMuZ2V0V2lkZ2V0U3R5bGUod2lkZ2V0KTtcclxuICAgIGZvciAoY29uc3Qgc3R5bGUgaW4gd2lkZ2V0U3R5bGVzKSB7XHJcbiAgICAgIGlmICh3aWRnZXRTdHlsZXMuaGFzT3duUHJvcGVydHkoc3R5bGUpKSB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWwubmF0aXZlRWxlbWVudCwgc3R5bGUsIHdpZGdldFN0eWxlc1tzdHlsZV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmVtaXRVcGRhdGVQb3NpdGlvbihjb25maWcpO1xyXG4gICAgdGhpcy5hc3Nlc3NBdmFpbGFibGVHcmlkU3BhY2UoKTtcclxuICB9XHJcblxyXG4gIGdldFdpZGdldFBvc2l0aW9uQnlXaWRnZXRJZCh3aWRnZXRJZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmlkUmVuZGVyZXIuZ2V0V2lkZ2V0UG9zaXRpb24od2lkZ2V0SWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2lkZ2V0UG9zaXRpb24od2lkZ2V0OiBOZ3hXaWRnZXRDb21wb25lbnQpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFdpZGdldFBvc2l0aW9uQnlXaWRnZXRJZCh3aWRnZXQuZ2V0Q29uZmlnKCkuaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2lkZ2V0U3R5bGUod2lkZ2V0OiBOZ3hXaWRnZXRDb21wb25lbnQpIHtcclxuICAgIHJldHVybiB0aGlzLmdyaWRSZW5kZXJlci5nZXRTdHlsZSh3aWRnZXQuZ2V0Q29uZmlnKCkuaWQpO1xyXG4gIH1cclxuXHJcbiAgaXNQb2ludE9ic3RydWN0ZWQoaTogbnVtYmVyLCBqOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmdyaWRSZW5kZXJlciA/IHRoaXMuZ3JpZFJlbmRlcmVyLmlzT2JzdHJ1Y3RlZChpLCBqKSA6IHRydWU7XHJcbiAgfVxyXG5cclxuICBpc0FyZWFPYnN0cnVjdGVkKGFyZWE6IFJlY3RhbmdsZSxcclxuICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgZXhjbHVkZWRBcmVhPzogUmVjdGFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgICAgICBmcm9tQm90dG9tPzogYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgICAgZnJvbVJpZ2h0PzogYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgIH0pOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmdyaWRSZW5kZXJlciA/IHRoaXMuZ3JpZFJlbmRlcmVyLmlzQXJlYU9ic3RydWN0ZWQoYXJlYSwgb3B0aW9ucykgOiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgYXJlYU9ic3RydWN0b3IoYXJlYTogUmVjdGFuZ2xlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmlkUmVuZGVyZXIub2JzdHJ1Y3Rpb25zWyhhcmVhLnRvcCAtIDEpICogdGhpcy5ncmlkLmNvbHVtbnMgKyAoYXJlYS5sZWZ0IC0gMSldO1xyXG4gIH1cclxuXHJcbiAgaGlnaGxpZ2h0QXJlYShhcmVhOiBSZWN0YW5nbGUpIHtcclxuICAgIGlmIChhcmVhLnRvcCAmJiBhcmVhLmxlZnQgJiYgYXJlYS5oZWlnaHQgJiYgYXJlYS53aWR0aCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkQXJlYSA9IGFyZWE7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlTmV4dFBvc2l0aW9uSGlnaGxpZ2h0KCkge1xyXG4gICAgaWYgKHRoaXMuaGlnaGxpZ2h0TmV4dFBvc2l0aW9uKSB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRBcmVhID0gdGhpcy5ncmlkUmVuZGVyZXIuZ2V0TmV4dFBvc2l0aW9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXROZXh0UG9zaXRpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmlkUmVuZGVyZXIuZ2V0TmV4dFBvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBnZXRQb3NpdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmlkLndpZGdldHM7XHJcbiAgfVxyXG5cclxuICByZXNldEhpZ2hsaWdodHMoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRlZEFyZWEgPSBudWxsO1xyXG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZW1pdFVwZGF0ZVBvc2l0aW9uKHdpZGdldDogV2lkZ2V0Q29uZmlnKSB7XHJcbiAgICB0aGlzLndpZGdldFBvc2l0aW9uQ2hhbmdlLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZ2V0V2lkZ2V0SW5kZXgod2lkZ2V0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uOiBuZXcgUmVjdGFuZ2xlKHdpZGdldC5wb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFdpZGdldEluZGV4KHdpZGdldENvbmZpZzogV2lkZ2V0Q29uZmlnKSB7XHJcbiAgICBmb3IgKGxldCBpID0gdGhpcy5ncmlkLndpZGdldHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgaWYgKHRoaXMuZ3JpZC53aWRnZXRzW2ldLmlkID09PSB3aWRnZXRDb25maWcuaWQpIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2lkZ2V0QnlJZCh3aWRnZXRJZDogc3RyaW5nKTogTmd4V2lkZ2V0Q29tcG9uZW50IHtcclxuICAgIHJldHVybiB0aGlzLndpZGdldENvbXBvbmVudHMuZmluZCh3aWRnZXRDbXAgPT4ge1xyXG4gICAgICByZXR1cm4gd2lkZ2V0Q21wLmdldENvbmZpZygpLmlkID09PSB3aWRnZXRJZDtcclxuICAgIH0pIHx8IG51bGw7XHJcbiAgfVxyXG5cclxuICBhc3Nlc3NBdmFpbGFibGVHcmlkU3BhY2UoKSB7XHJcbiAgICBjb25zdCBncmlkSGFzU3BhY2VMZWZ0ID0gdGhpcy5ncmlkUmVuZGVyZXIuaGFzU3BhY2VMZWZ0KCk7XHJcbiAgICBpZiAodGhpcy5ncmlkQWxyZWFkeUZ1bGwpIHtcclxuICAgICAgaWYgKGdyaWRIYXNTcGFjZUxlZnQpIHtcclxuICAgICAgICB0aGlzLmdyaWRGdWxsLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZ3JpZEFscmVhZHlGdWxsID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLypObyBjaGFuZ2UgdG8gZ3JpZCBzdGF0dXMuIHdhcyBhbmQgc3RpbGwgaXMgZnVsbCovXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghZ3JpZEhhc1NwYWNlTGVmdCkge1xyXG4gICAgICAgIHRoaXMuZ3JpZEZ1bGwuZW1pdCh0cnVlKTtcclxuICAgICAgICB0aGlzLmdyaWRBbHJlYWR5RnVsbCA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLypObyBjaGFuZ2UgdG8gZ3JpZCBzdGF0dXMuIGhhZCBhbmQgc3RpbGwgaGFzIGF2YWlsYWJsZSBzcGFjZSovXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19