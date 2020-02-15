/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Utils } from '../../Utils';
import { DomSanitizer } from '@angular/platform-browser';
import { GridRenderer } from '../../models/GridRenderer.model';
var NgxGridOverlayComponent = /** @class */ (function () {
    function NgxGridOverlayComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.activeHighlight = null;
        this.gridRows = [];
        this.gridCols = [];
        this._showGrid = false;
    }
    Object.defineProperty(NgxGridOverlayComponent.prototype, "renderer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._renderer;
        },
        set: /**
         * @param {?} renderer
         * @return {?}
         */
        function (renderer) {
            this._renderer = renderer;
            if (Utils.isDefined(renderer)) {
                this.updateGridLines(renderer, this.showGrid);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxGridOverlayComponent.prototype, "rows", {
        set: /**
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            this.updateGridLines(this.renderer, this.showGrid);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxGridOverlayComponent.prototype, "cols", {
        set: /**
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            this.updateGridLines(this.renderer, this.showGrid);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxGridOverlayComponent.prototype, "highlight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._highlight;
        },
        set: /**
         * @param {?} highlight
         * @return {?}
         */
        function (highlight) {
            this._highlight = highlight;
            this.clearHighlight();
            if (highlight) {
                this.highlightArea(highlight, this.renderer);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxGridOverlayComponent.prototype, "showGrid", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showGrid;
        },
        set: /**
         * @param {?} showGrid
         * @return {?}
         */
        function (showGrid) {
            this._showGrid = showGrid;
            this.updateGridLines(this.renderer, showGrid);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} renderer
     * @param {?} showGrid
     * @return {?}
     */
    NgxGridOverlayComponent.prototype.updateGridLines = /**
     * @param {?} renderer
     * @param {?} showGrid
     * @return {?}
     */
    function (renderer, showGrid) {
        this.clearGridLines();
        if (showGrid) {
            this.showGridLines(renderer);
        }
    };
    /**
     * @return {?}
     */
    NgxGridOverlayComponent.prototype.clearHighlight = /**
     * @return {?}
     */
    function () {
        this.activeHighlight = null;
    };
    /**
     * @return {?}
     */
    NgxGridOverlayComponent.prototype.clearGridLines = /**
     * @return {?}
     */
    function () {
        this.gridRows.splice(0);
        this.gridCols.splice(0);
    };
    /**
     * @param {?} area
     * @param {?} renderer
     * @return {?}
     */
    NgxGridOverlayComponent.prototype.highlightArea = /**
     * @param {?} area
     * @param {?} renderer
     * @return {?}
     */
    function (area, renderer) {
        /** @type {?} */
        var cellSize = renderer.grid.cellSize;
        /** @type {?} */
        var cellHeight = cellSize.height;
        /** @type {?} */
        var cellWidth = cellSize.width;
        this.activeHighlight = {
            x: (area.left - 1) * cellWidth + '%',
            y: (area.top - 1) * cellHeight + '%',
            height: area.height * cellHeight + '%',
            width: area.width * cellWidth + '%'
        };
        this.sanitizer.bypassSecurityTrustStyle(this.activeHighlight);
    };
    /**
     * @param {?} renderer
     * @return {?}
     */
    NgxGridOverlayComponent.prototype.showGridLines = /**
     * @param {?} renderer
     * @return {?}
     */
    function (renderer) {
        /** @type {?} */
        var cellHeight = renderer.grid.cellSize.height;
        /** @type {?} */
        var cellWidth = renderer.grid.cellSize.width;
        /** @type {?} */
        var height = cellHeight + '%';
        /** @type {?} */
        var width = cellWidth + '%';
        /** @type {?} */
        var rows = renderer.grid.rows;
        /** @type {?} */
        var cols = renderer.grid.columns;
        for (var i = 1; i < rows; i += 2) {
            /** @type {?} */
            var y = void 0;
            /** @type {?} */
            var h = void 0;
            /** @type {?} */
            var row = void 0;
            y = (i * cellHeight) + '%';
            h = 'calc(' + height + ' - 1px)';
            row = {
                y: this.sanitizer.bypassSecurityTrustStyle(y),
                height: this.sanitizer.bypassSecurityTrustStyle(h)
            };
            this.gridRows.push(row);
        }
        for (var i = 1; i < cols; i += 2) {
            /** @type {?} */
            var x = void 0;
            /** @type {?} */
            var w = void 0;
            /** @type {?} */
            var col = void 0;
            x = (i * cellWidth) + '%';
            w = 'calc(' + width + ' - 1px)';
            col = {
                x: this.sanitizer.bypassSecurityTrustStyle(x),
                width: this.sanitizer.bypassSecurityTrustStyle(w)
            };
            this.gridCols.push(col);
        }
    };
    NgxGridOverlayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-grid-overlay',
                    template: "<div class=\"wg-grid-overlay\">\r\n  <div *ngFor=\"let row of gridRows\"\r\n       class=\"wg-preview-item wg-preview-row\"\r\n       [style.height]=\"row.height\"\r\n       [style.top]=\"row.y\"></div>\r\n  <div *ngFor=\"let column of gridCols\"\r\n       class=\"wg-preview-item wg-preview-column\"\r\n       [style.width]=\"column.width\"\r\n       [style.left]=\"column.x\"></div>\r\n  <div *ngIf=\"activeHighlight\"\r\n       class=\"wg-preview-item wg-preview-highlight\"\r\n       [style.top]=\"activeHighlight.y\"\r\n       [style.height]=\"activeHighlight.height\"\r\n       [style.left]=\"activeHighlight.x\"\r\n       [style.width]=\"activeHighlight.width\"></div>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".wg-grid-overlay{overflow:hidden}.wg-grid-overlay *{position:absolute;height:100%;width:100%}.wg-grid-overlay .wg-preview-item{position:absolute;display:inline-block}.wg-grid-overlay .wg-preview-item.wg-preview-row{width:100%;border-top:1px dotted #d7d7d7;border-bottom:1px solid #f0f0f0}.wg-grid-overlay .wg-preview-item.wg-preview-column{height:100%;border-left:1px dotted #d7d7d7;border-right:1px solid #f0f0f0}.wg-grid-overlay .wg-preview-item.wg-preview-highlight{background-color:rgba(0,113,188,.2);z-index:1}"]
                }] }
    ];
    /** @nocollapse */
    NgxGridOverlayComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    NgxGridOverlayComponent.propDecorators = {
        renderer: [{ type: Input }],
        rows: [{ type: Input }],
        cols: [{ type: Input }],
        highlight: [{ type: Input }],
        showGrid: [{ type: Input }]
    };
    return NgxGridOverlayComponent;
}());
export { NgxGridOverlayComponent };
if (false) {
    /** @type {?} */
    NgxGridOverlayComponent.prototype.activeHighlight;
    /** @type {?} */
    NgxGridOverlayComponent.prototype.gridRows;
    /** @type {?} */
    NgxGridOverlayComponent.prototype.gridCols;
    /** @type {?} */
    NgxGridOverlayComponent.prototype._renderer;
    /** @type {?} */
    NgxGridOverlayComponent.prototype._highlight;
    /** @type {?} */
    NgxGridOverlayComponent.prototype._showGrid;
    /** @type {?} */
    NgxGridOverlayComponent.prototype.sanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE92ZXJsYXkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZ3JpZE92ZXJsYXkvZ3JpZE92ZXJsYXkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxZQUFZLEVBQWEsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0lBa0I3RCxpQ0FBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYzsrQkFQYixJQUFJO3dCQUN3QixFQUFFO3dCQUNILEVBQUU7eUJBR3hDLEtBQUs7S0FHdkI7SUFHRCxzQkFBSSw2Q0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCOzs7OztRQUVELFVBQ2EsUUFBc0I7WUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDL0M7U0FDRjs7O09BUkE7SUFVRCxzQkFDSSx5Q0FBSTs7Ozs7UUFEUixVQUNTLElBQVk7WUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRDs7O09BQUE7SUFFRCxzQkFDSSx5Q0FBSTs7Ozs7UUFEUixVQUNTLElBQVk7WUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRDs7O09BQUE7SUFHRCxzQkFBSSw4Q0FBUzs7OztRQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCOzs7OztRQUVELFVBQ2MsU0FBUztZQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlDO1NBQ0Y7OztPQVRBO0lBWUQsc0JBQUksNkNBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2Qjs7Ozs7UUFFRCxVQUNhLFFBQWlCO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMvQzs7O09BTkE7Ozs7OztJQVFELGlEQUFlOzs7OztJQUFmLFVBQWdCLFFBQXNCLEVBQUUsUUFBaUI7UUFDdkQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QjtLQUNGOzs7O0lBRUQsZ0RBQWM7OztJQUFkO1FBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7S0FDN0I7Ozs7SUFFRCxnREFBYzs7O0lBQWQ7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6Qjs7Ozs7O0lBRUQsK0NBQWE7Ozs7O0lBQWIsVUFBYyxJQUFlLEVBQUUsUUFBc0I7O1FBQ25ELElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOztRQUN4QyxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDOztRQUNuQyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBRWpDLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDckIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLEdBQUcsR0FBRztZQUNwQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxHQUFHO1lBQ3BDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsR0FBRyxHQUFHO1lBQ3RDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxHQUFHO1NBQ3BDLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUMvRDs7Ozs7SUFFRCwrQ0FBYTs7OztJQUFiLFVBQWMsUUFBc0I7O1FBQ2xDLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzs7UUFDakQsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDOztRQUMvQyxJQUFNLE1BQU0sR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDOztRQUNoQyxJQUFNLEtBQUssR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDOztRQUM5QixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7UUFDaEMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFOztZQUNoQyxJQUFJLENBQUMsVUFBOEQ7O1lBQW5FLElBQWUsQ0FBQyxVQUFtRDs7WUFBbkUsSUFBMEIsR0FBRyxVQUFzQztZQUNuRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNCLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUNqQyxHQUFHLEdBQUc7Z0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7YUFDbkQsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFOztZQUNoQyxJQUFJLENBQUMsVUFBNkQ7O1lBQWxFLElBQWUsQ0FBQyxVQUFrRDs7WUFBbEUsSUFBMEIsR0FBRyxVQUFxQztZQUNsRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzFCLENBQUMsR0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNoQyxHQUFHLEdBQUc7Z0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7YUFDbEQsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO0tBQ0Y7O2dCQTVIRixTQUFTLFNBQUM7b0JBQ0UsUUFBUSxFQUFFLGtCQUFrQjtvQkFFNUIsNnJCQUEyQztvQkFDM0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFUSCxZQUFZOzs7MkJBMkJsQixLQUFLO3VCQVFMLEtBQUs7dUJBS0wsS0FBSzs0QkFVTCxLQUFLOzJCQWNMLEtBQUs7O2tDQWxFUjs7U0FZYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL1V0aWxzJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgR3JpZFJlbmRlcmVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0dyaWRSZW5kZXJlci5tb2RlbCc7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4uLy4uL21vZGVscy9SZWN0YW5nbGUubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICAgICAgICAgICBzZWxlY3RvcjogJ25neC1ncmlkLW92ZXJsYXknLFxyXG4gICAgICAgICAgICAgc3R5bGVVcmxzOiBbJy4vZ3JpZE92ZXJsYXkuY29tcG9uZW50LnNjc3MnXSxcclxuICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9ncmlkT3ZlcmxheS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICAgICAgICAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG4gICAgICAgICAgIH0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hHcmlkT3ZlcmxheUNvbXBvbmVudCB7XHJcblxyXG4gIHB1YmxpYyBhY3RpdmVIaWdobGlnaHQ6IGFueSA9IG51bGw7XHJcbiAgcHVibGljIGdyaWRSb3dzOiB7IHk6IFNhZmVTdHlsZTsgaGVpZ2h0OiBTYWZlU3R5bGU7IH1bXSA9IFtdO1xyXG4gIHB1YmxpYyBncmlkQ29sczogeyB4OiBTYWZlU3R5bGU7IHdpZHRoOiBTYWZlU3R5bGU7IH1bXSA9IFtdO1xyXG4gIHB1YmxpYyBfcmVuZGVyZXI6IEdyaWRSZW5kZXJlcjtcclxuICBwdWJsaWMgX2hpZ2hsaWdodD86IFJlY3RhbmdsZTtcclxuICBwdWJsaWMgX3Nob3dHcmlkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuICB9XHJcblxyXG5cclxuICBnZXQgcmVuZGVyZXIoKTogR3JpZFJlbmRlcmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHJlbmRlcmVyKHJlbmRlcmVyOiBHcmlkUmVuZGVyZXIpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICBpZiAoVXRpbHMuaXNEZWZpbmVkKHJlbmRlcmVyKSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZUdyaWRMaW5lcyhyZW5kZXJlciwgdGhpcy5zaG93R3JpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCByb3dzKHJvd3M6IG51bWJlcikge1xyXG4gICAgdGhpcy51cGRhdGVHcmlkTGluZXModGhpcy5yZW5kZXJlciwgdGhpcy5zaG93R3JpZCk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBjb2xzKHJvd3M6IG51bWJlcikge1xyXG4gICAgdGhpcy51cGRhdGVHcmlkTGluZXModGhpcy5yZW5kZXJlciwgdGhpcy5zaG93R3JpZCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0IGhpZ2hsaWdodCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9oaWdobGlnaHQ7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBoaWdobGlnaHQoaGlnaGxpZ2h0KSB7XHJcbiAgICB0aGlzLl9oaWdobGlnaHQgPSBoaWdobGlnaHQ7XHJcbiAgICB0aGlzLmNsZWFySGlnaGxpZ2h0KCk7XHJcbiAgICBpZiAoaGlnaGxpZ2h0KSB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0QXJlYShoaWdobGlnaHQsIHRoaXMucmVuZGVyZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGdldCBzaG93R3JpZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zaG93R3JpZDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHNob3dHcmlkKHNob3dHcmlkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zaG93R3JpZCA9IHNob3dHcmlkO1xyXG4gICAgdGhpcy51cGRhdGVHcmlkTGluZXModGhpcy5yZW5kZXJlciwgc2hvd0dyaWQpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlR3JpZExpbmVzKHJlbmRlcmVyOiBHcmlkUmVuZGVyZXIsIHNob3dHcmlkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsZWFyR3JpZExpbmVzKCk7XHJcbiAgICBpZiAoc2hvd0dyaWQpIHtcclxuICAgICAgdGhpcy5zaG93R3JpZExpbmVzKHJlbmRlcmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsZWFySGlnaGxpZ2h0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5hY3RpdmVIaWdobGlnaHQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJHcmlkTGluZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRSb3dzLnNwbGljZSgwKTtcclxuICAgIHRoaXMuZ3JpZENvbHMuc3BsaWNlKDApO1xyXG4gIH1cclxuXHJcbiAgaGlnaGxpZ2h0QXJlYShhcmVhOiBSZWN0YW5nbGUsIHJlbmRlcmVyOiBHcmlkUmVuZGVyZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNlbGxTaXplID0gcmVuZGVyZXIuZ3JpZC5jZWxsU2l6ZTtcclxuICAgIGNvbnN0IGNlbGxIZWlnaHQgPSBjZWxsU2l6ZS5oZWlnaHQ7XHJcbiAgICBjb25zdCBjZWxsV2lkdGggPSBjZWxsU2l6ZS53aWR0aDtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZUhpZ2hsaWdodCA9IHtcclxuICAgICAgeDogKGFyZWEubGVmdCAtIDEpICogY2VsbFdpZHRoICsgJyUnLFxyXG4gICAgICB5OiAoYXJlYS50b3AgLSAxKSAqIGNlbGxIZWlnaHQgKyAnJScsXHJcbiAgICAgIGhlaWdodDogYXJlYS5oZWlnaHQgKiBjZWxsSGVpZ2h0ICsgJyUnLFxyXG4gICAgICB3aWR0aDogYXJlYS53aWR0aCAqIGNlbGxXaWR0aCArICclJ1xyXG4gICAgfTtcclxuICAgIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh0aGlzLmFjdGl2ZUhpZ2hsaWdodCk7XHJcbiAgfVxyXG5cclxuICBzaG93R3JpZExpbmVzKHJlbmRlcmVyOiBHcmlkUmVuZGVyZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNlbGxIZWlnaHQgPSByZW5kZXJlci5ncmlkLmNlbGxTaXplLmhlaWdodDtcclxuICAgIGNvbnN0IGNlbGxXaWR0aCA9IHJlbmRlcmVyLmdyaWQuY2VsbFNpemUud2lkdGg7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBjZWxsSGVpZ2h0ICsgJyUnO1xyXG4gICAgY29uc3Qgd2lkdGggPSBjZWxsV2lkdGggKyAnJSc7XHJcbiAgICBjb25zdCByb3dzID0gcmVuZGVyZXIuZ3JpZC5yb3dzO1xyXG4gICAgY29uc3QgY29scyA9IHJlbmRlcmVyLmdyaWQuY29sdW1ucztcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcm93czsgaSArPSAyKSB7XHJcbiAgICAgIGxldCB5OiBzdHJpbmcsIGg6IHN0cmluZywgcm93OiB7IHk6IFNhZmVTdHlsZSwgaGVpZ2h0OiBTYWZlU3R5bGUgfTtcclxuICAgICAgeSA9IChpICogY2VsbEhlaWdodCkgKyAnJSc7XHJcbiAgICAgIGggPSAnY2FsYygnICsgaGVpZ2h0ICsgJyAtIDFweCknO1xyXG4gICAgICByb3cgPSB7XHJcbiAgICAgICAgeTogdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHkpLFxyXG4gICAgICAgIGhlaWdodDogdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGgpXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuZ3JpZFJvd3MucHVzaChyb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY29sczsgaSArPSAyKSB7XHJcbiAgICAgIGxldCB4OiBzdHJpbmcsIHc6IHN0cmluZywgY29sOiB7IHg6IFNhZmVTdHlsZSwgd2lkdGg6IFNhZmVTdHlsZSB9O1xyXG4gICAgICB4ID0gKGkgKiBjZWxsV2lkdGgpICsgJyUnO1xyXG4gICAgICB3ID0gJ2NhbGMoJyArIHdpZHRoICsgJyAtIDFweCknO1xyXG4gICAgICBjb2wgPSB7XHJcbiAgICAgICAgeDogdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHgpLFxyXG4gICAgICAgIHdpZHRoOiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodylcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5ncmlkQ29scy5wdXNoKGNvbCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==