/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Utils } from '../../Utils';
import { DomSanitizer } from '@angular/platform-browser';
import { GridRenderer } from '../../models/GridRenderer.model';
export class NgxGridOverlayComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.activeHighlight = null;
        this.gridRows = [];
        this.gridCols = [];
        this._showGrid = false;
    }
    /**
     * @return {?}
     */
    get renderer() {
        return this._renderer;
    }
    /**
     * @param {?} renderer
     * @return {?}
     */
    set renderer(renderer) {
        this._renderer = renderer;
        if (Utils.isDefined(renderer)) {
            this.updateGridLines(renderer, this.showGrid);
        }
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    set rows(rows) {
        this.updateGridLines(this.renderer, this.showGrid);
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    set cols(rows) {
        this.updateGridLines(this.renderer, this.showGrid);
    }
    /**
     * @return {?}
     */
    get highlight() {
        return this._highlight;
    }
    /**
     * @param {?} highlight
     * @return {?}
     */
    set highlight(highlight) {
        this._highlight = highlight;
        this.clearHighlight();
        if (highlight) {
            this.highlightArea(highlight, this.renderer);
        }
    }
    /**
     * @return {?}
     */
    get showGrid() {
        return this._showGrid;
    }
    /**
     * @param {?} showGrid
     * @return {?}
     */
    set showGrid(showGrid) {
        this._showGrid = showGrid;
        this.updateGridLines(this.renderer, showGrid);
    }
    /**
     * @param {?} renderer
     * @param {?} showGrid
     * @return {?}
     */
    updateGridLines(renderer, showGrid) {
        this.clearGridLines();
        if (showGrid) {
            this.showGridLines(renderer);
        }
    }
    /**
     * @return {?}
     */
    clearHighlight() {
        this.activeHighlight = null;
    }
    /**
     * @return {?}
     */
    clearGridLines() {
        this.gridRows.splice(0);
        this.gridCols.splice(0);
    }
    /**
     * @param {?} area
     * @param {?} renderer
     * @return {?}
     */
    highlightArea(area, renderer) {
        /** @type {?} */
        const cellSize = renderer.grid.cellSize;
        /** @type {?} */
        const cellHeight = cellSize.height;
        /** @type {?} */
        const cellWidth = cellSize.width;
        this.activeHighlight = {
            x: (area.left - 1) * cellWidth + '%',
            y: (area.top - 1) * cellHeight + '%',
            height: area.height * cellHeight + '%',
            width: area.width * cellWidth + '%'
        };
        this.sanitizer.bypassSecurityTrustStyle(this.activeHighlight);
    }
    /**
     * @param {?} renderer
     * @return {?}
     */
    showGridLines(renderer) {
        /** @type {?} */
        const cellHeight = renderer.grid.cellSize.height;
        /** @type {?} */
        const cellWidth = renderer.grid.cellSize.width;
        /** @type {?} */
        const height = cellHeight + '%';
        /** @type {?} */
        const width = cellWidth + '%';
        /** @type {?} */
        const rows = renderer.grid.rows;
        /** @type {?} */
        const cols = renderer.grid.columns;
        for (let i = 1; i < rows; i += 2) {
            /** @type {?} */
            let y;
            /** @type {?} */
            let h;
            /** @type {?} */
            let row;
            y = (i * cellHeight) + '%';
            h = 'calc(' + height + ' - 1px)';
            row = {
                y: this.sanitizer.bypassSecurityTrustStyle(y),
                height: this.sanitizer.bypassSecurityTrustStyle(h)
            };
            this.gridRows.push(row);
        }
        for (let i = 1; i < cols; i += 2) {
            /** @type {?} */
            let x;
            /** @type {?} */
            let w;
            /** @type {?} */
            let col;
            x = (i * cellWidth) + '%';
            w = 'calc(' + width + ' - 1px)';
            col = {
                x: this.sanitizer.bypassSecurityTrustStyle(x),
                width: this.sanitizer.bypassSecurityTrustStyle(w)
            };
            this.gridCols.push(col);
        }
    }
}
NgxGridOverlayComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-grid-overlay',
                template: "<div class=\"wg-grid-overlay\">\r\n  <div *ngFor=\"let row of gridRows\"\r\n       class=\"wg-preview-item wg-preview-row\"\r\n       [style.height]=\"row.height\"\r\n       [style.top]=\"row.y\"></div>\r\n  <div *ngFor=\"let column of gridCols\"\r\n       class=\"wg-preview-item wg-preview-column\"\r\n       [style.width]=\"column.width\"\r\n       [style.left]=\"column.x\"></div>\r\n  <div *ngIf=\"activeHighlight\"\r\n       class=\"wg-preview-item wg-preview-highlight\"\r\n       [style.top]=\"activeHighlight.y\"\r\n       [style.height]=\"activeHighlight.height\"\r\n       [style.left]=\"activeHighlight.x\"\r\n       [style.width]=\"activeHighlight.width\"></div>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".wg-grid-overlay{overflow:hidden}.wg-grid-overlay *{position:absolute;height:100%;width:100%}.wg-grid-overlay .wg-preview-item{position:absolute;display:inline-block}.wg-grid-overlay .wg-preview-item.wg-preview-row{width:100%;border-top:1px dotted #d7d7d7;border-bottom:1px solid #f0f0f0}.wg-grid-overlay .wg-preview-item.wg-preview-column{height:100%;border-left:1px dotted #d7d7d7;border-right:1px solid #f0f0f0}.wg-grid-overlay .wg-preview-item.wg-preview-highlight{background-color:rgba(0,113,188,.2);z-index:1}"]
            }] }
];
/** @nocollapse */
NgxGridOverlayComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
NgxGridOverlayComponent.propDecorators = {
    renderer: [{ type: Input }],
    rows: [{ type: Input }],
    cols: [{ type: Input }],
    highlight: [{ type: Input }],
    showGrid: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE92ZXJsYXkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZ3JpZE92ZXJsYXkvZ3JpZE92ZXJsYXkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxZQUFZLEVBQWEsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFTL0QsTUFBTTs7OztJQVNKLFlBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7K0JBUGIsSUFBSTt3QkFDd0IsRUFBRTt3QkFDSCxFQUFFO3lCQUd4QyxLQUFLO0tBR3ZCOzs7O0lBR0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7OztJQUVELElBQ0ksUUFBUSxDQUFDLFFBQXNCO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0M7S0FDRjs7Ozs7SUFFRCxJQUNJLElBQUksQ0FBQyxJQUFZO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDcEQ7Ozs7O0lBRUQsSUFDSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3BEOzs7O0lBR0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCOzs7OztJQUVELElBQ0ksU0FBUyxDQUFDLFNBQVM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDO0tBQ0Y7Ozs7SUFHRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7Ozs7O0lBRUQsSUFDSSxRQUFRLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQy9DOzs7Ozs7SUFFRCxlQUFlLENBQUMsUUFBc0IsRUFBRSxRQUFpQjtRQUN2RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlCO0tBQ0Y7Ozs7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7S0FDN0I7Ozs7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekI7Ozs7OztJQUVELGFBQWEsQ0FBQyxJQUFlLEVBQUUsUUFBc0I7O1FBQ25ELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOztRQUN4QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDOztRQUNuQyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBRWpDLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDckIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLEdBQUcsR0FBRztZQUNwQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxHQUFHO1lBQ3BDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsR0FBRyxHQUFHO1lBQ3RDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxHQUFHO1NBQ3BDLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUMvRDs7Ozs7SUFFRCxhQUFhLENBQUMsUUFBc0I7O1FBQ2xDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzs7UUFDakQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDOztRQUMvQyxNQUFNLE1BQU0sR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDOztRQUNoQyxNQUFNLEtBQUssR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDOztRQUM5QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7UUFDaEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFOztZQUNoQyxJQUFJLENBQUMsQ0FBOEQ7O1lBQW5FLElBQWUsQ0FBQyxDQUFtRDs7WUFBbkUsSUFBMEIsR0FBRyxDQUFzQztZQUNuRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNCLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUNqQyxHQUFHLEdBQUc7Z0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7YUFDbkQsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFOztZQUNoQyxJQUFJLENBQUMsQ0FBNkQ7O1lBQWxFLElBQWUsQ0FBQyxDQUFrRDs7WUFBbEUsSUFBMEIsR0FBRyxDQUFxQztZQUNsRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzFCLENBQUMsR0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNoQyxHQUFHLEdBQUc7Z0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7YUFDbEQsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO0tBQ0Y7OztZQTVIRixTQUFTLFNBQUM7Z0JBQ0UsUUFBUSxFQUFFLGtCQUFrQjtnQkFFNUIsNnJCQUEyQztnQkFDM0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBVEgsWUFBWTs7O3VCQTJCbEIsS0FBSzttQkFRTCxLQUFLO21CQUtMLEtBQUs7d0JBVUwsS0FBSzt1QkFjTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9VdGlscyc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVN0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEdyaWRSZW5kZXJlciB9IGZyb20gJy4uLy4uL21vZGVscy9HcmlkUmVuZGVyZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuLi8uLi9tb2RlbHMvUmVjdGFuZ2xlLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgICAgICAgICAgc2VsZWN0b3I6ICduZ3gtZ3JpZC1vdmVybGF5JyxcclxuICAgICAgICAgICAgIHN0eWxlVXJsczogWycuL2dyaWRPdmVybGF5LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vZ3JpZE92ZXJsYXkuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgICAgICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxuICAgICAgICAgICB9KVxyXG5leHBvcnQgY2xhc3MgTmd4R3JpZE92ZXJsYXlDb21wb25lbnQge1xyXG5cclxuICBwdWJsaWMgYWN0aXZlSGlnaGxpZ2h0OiBhbnkgPSBudWxsO1xyXG4gIHB1YmxpYyBncmlkUm93czogeyB5OiBTYWZlU3R5bGU7IGhlaWdodDogU2FmZVN0eWxlOyB9W10gPSBbXTtcclxuICBwdWJsaWMgZ3JpZENvbHM6IHsgeDogU2FmZVN0eWxlOyB3aWR0aDogU2FmZVN0eWxlOyB9W10gPSBbXTtcclxuICBwdWJsaWMgX3JlbmRlcmVyOiBHcmlkUmVuZGVyZXI7XHJcbiAgcHVibGljIF9oaWdobGlnaHQ/OiBSZWN0YW5nbGU7XHJcbiAgcHVibGljIF9zaG93R3JpZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0IHJlbmRlcmVyKCk6IEdyaWRSZW5kZXJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXI7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCByZW5kZXJlcihyZW5kZXJlcjogR3JpZFJlbmRlcmVyKSB7XHJcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgaWYgKFV0aWxzLmlzRGVmaW5lZChyZW5kZXJlcikpIHtcclxuICAgICAgdGhpcy51cGRhdGVHcmlkTGluZXMocmVuZGVyZXIsIHRoaXMuc2hvd0dyaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgcm93cyhyb3dzOiBudW1iZXIpIHtcclxuICAgIHRoaXMudXBkYXRlR3JpZExpbmVzKHRoaXMucmVuZGVyZXIsIHRoaXMuc2hvd0dyaWQpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY29scyhyb3dzOiBudW1iZXIpIHtcclxuICAgIHRoaXMudXBkYXRlR3JpZExpbmVzKHRoaXMucmVuZGVyZXIsIHRoaXMuc2hvd0dyaWQpO1xyXG4gIH1cclxuXHJcblxyXG4gIGdldCBoaWdobGlnaHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlnaGxpZ2h0O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgaGlnaGxpZ2h0KGhpZ2hsaWdodCkge1xyXG4gICAgdGhpcy5faGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xyXG4gICAgdGhpcy5jbGVhckhpZ2hsaWdodCgpO1xyXG4gICAgaWYgKGhpZ2hsaWdodCkge1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodEFyZWEoaGlnaGxpZ2h0LCB0aGlzLnJlbmRlcmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBnZXQgc2hvd0dyaWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd0dyaWQ7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBzaG93R3JpZChzaG93R3JpZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2hvd0dyaWQgPSBzaG93R3JpZDtcclxuICAgIHRoaXMudXBkYXRlR3JpZExpbmVzKHRoaXMucmVuZGVyZXIsIHNob3dHcmlkKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUdyaWRMaW5lcyhyZW5kZXJlcjogR3JpZFJlbmRlcmVyLCBzaG93R3JpZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5jbGVhckdyaWRMaW5lcygpO1xyXG4gICAgaWYgKHNob3dHcmlkKSB7XHJcbiAgICAgIHRoaXMuc2hvd0dyaWRMaW5lcyhyZW5kZXJlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGVhckhpZ2hsaWdodCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aXZlSGlnaGxpZ2h0ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGNsZWFyR3JpZExpbmVzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ncmlkUm93cy5zcGxpY2UoMCk7XHJcbiAgICB0aGlzLmdyaWRDb2xzLnNwbGljZSgwKTtcclxuICB9XHJcblxyXG4gIGhpZ2hsaWdodEFyZWEoYXJlYTogUmVjdGFuZ2xlLCByZW5kZXJlcjogR3JpZFJlbmRlcmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBjZWxsU2l6ZSA9IHJlbmRlcmVyLmdyaWQuY2VsbFNpemU7XHJcbiAgICBjb25zdCBjZWxsSGVpZ2h0ID0gY2VsbFNpemUuaGVpZ2h0O1xyXG4gICAgY29uc3QgY2VsbFdpZHRoID0gY2VsbFNpemUud2lkdGg7XHJcblxyXG4gICAgdGhpcy5hY3RpdmVIaWdobGlnaHQgPSB7XHJcbiAgICAgIHg6IChhcmVhLmxlZnQgLSAxKSAqIGNlbGxXaWR0aCArICclJyxcclxuICAgICAgeTogKGFyZWEudG9wIC0gMSkgKiBjZWxsSGVpZ2h0ICsgJyUnLFxyXG4gICAgICBoZWlnaHQ6IGFyZWEuaGVpZ2h0ICogY2VsbEhlaWdodCArICclJyxcclxuICAgICAgd2lkdGg6IGFyZWEud2lkdGggKiBjZWxsV2lkdGggKyAnJSdcclxuICAgIH07XHJcbiAgICB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5hY3RpdmVIaWdobGlnaHQpO1xyXG4gIH1cclxuXHJcbiAgc2hvd0dyaWRMaW5lcyhyZW5kZXJlcjogR3JpZFJlbmRlcmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBjZWxsSGVpZ2h0ID0gcmVuZGVyZXIuZ3JpZC5jZWxsU2l6ZS5oZWlnaHQ7XHJcbiAgICBjb25zdCBjZWxsV2lkdGggPSByZW5kZXJlci5ncmlkLmNlbGxTaXplLndpZHRoO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gY2VsbEhlaWdodCArICclJztcclxuICAgIGNvbnN0IHdpZHRoID0gY2VsbFdpZHRoICsgJyUnO1xyXG4gICAgY29uc3Qgcm93cyA9IHJlbmRlcmVyLmdyaWQucm93cztcclxuICAgIGNvbnN0IGNvbHMgPSByZW5kZXJlci5ncmlkLmNvbHVtbnM7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJvd3M7IGkgKz0gMikge1xyXG4gICAgICBsZXQgeTogc3RyaW5nLCBoOiBzdHJpbmcsIHJvdzogeyB5OiBTYWZlU3R5bGUsIGhlaWdodDogU2FmZVN0eWxlIH07XHJcbiAgICAgIHkgPSAoaSAqIGNlbGxIZWlnaHQpICsgJyUnO1xyXG4gICAgICBoID0gJ2NhbGMoJyArIGhlaWdodCArICcgLSAxcHgpJztcclxuICAgICAgcm93ID0ge1xyXG4gICAgICAgIHk6IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh5KSxcclxuICAgICAgICBoZWlnaHQ6IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShoKVxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmdyaWRSb3dzLnB1c2gocm93KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNvbHM7IGkgKz0gMikge1xyXG4gICAgICBsZXQgeDogc3RyaW5nLCB3OiBzdHJpbmcsIGNvbDogeyB4OiBTYWZlU3R5bGUsIHdpZHRoOiBTYWZlU3R5bGUgfTtcclxuICAgICAgeCA9IChpICogY2VsbFdpZHRoKSArICclJztcclxuICAgICAgdyA9ICdjYWxjKCcgKyB3aWR0aCArICcgLSAxcHgpJztcclxuICAgICAgY29sID0ge1xyXG4gICAgICAgIHg6IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh4KSxcclxuICAgICAgICB3aWR0aDogdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHcpXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuZ3JpZENvbHMucHVzaChjb2wpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=