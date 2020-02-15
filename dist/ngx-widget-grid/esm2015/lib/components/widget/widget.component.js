/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { WidgetConfig } from '../../models/WidgetConfig.model';
import { Rectangle } from '../../models/Rectangle.model';
import { ALL_DIRECTIONS, RESIZE_DIRECTIONS } from '../../Utils';
export class NgxWidgetComponent {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
        this.elRef = elRef;
        this.swapOnMove = false;
        this.positionChange = new EventEmitter();
        this.movable = false;
        this.allDirections = RESIZE_DIRECTIONS;
        this.isTopResizable = false;
        this.isRightResizable = false;
        this.isBottomResizable = false;
        this.isLeftResizable = false;
        this.isTopRightResizable = false;
        this.isTopLeftResizable = false;
        this.isBottomRightResizable = false;
        this.isBottomLeftResizable = false;
        this._resizable = false;
        this._resizeDirections = ALL_DIRECTIONS;
        this.widgetConfig = new WidgetConfig(this.position);
    }
    /**
     * @return {?}
     */
    get position() {
        return this._position;
    }
    /**
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        this._position = position;
        this.widgetConfig.position = position;
        this.positionChange.emit(position);
    }
    /**
     * @return {?}
     */
    get resizable() {
        return this._resizable;
    }
    /**
     * @param {?} resizable
     * @return {?}
     */
    set resizable(resizable) {
        this._resizable = resizable;
        if (resizable) {
            this.setResizeDirections();
        }
    }
    /**
     * @return {?}
     */
    get resizeDirections() {
        return this._resizeDirections;
    }
    /**
     * @param {?} dirs
     * @return {?}
     */
    set resizeDirections(dirs) {
        this._resizeDirections = /** @type {?} */ (dirs.filter((dir) => {
            return ALL_DIRECTIONS.indexOf(/** @type {?} */ ((/** @type {?} */ (dir)).toUpperCase())) !== -1;
        }));
        this.setResizeDirections();
    }
    /**
     * @return {?}
     */
    setResizeDirections() {
        this.isTopResizable = false;
        this.isRightResizable = false;
        this.isBottomResizable = false;
        this.isLeftResizable = false;
        this.isTopRightResizable = false;
        this.isTopLeftResizable = false;
        this.isBottomRightResizable = false;
        this.isBottomLeftResizable = false;
        this._resizeDirections.forEach((dir) => {
            switch (dir) {
                case RESIZE_DIRECTIONS.top:
                    this.isTopResizable = true;
                    break;
                case RESIZE_DIRECTIONS.left:
                    this.isLeftResizable = true;
                    break;
                case RESIZE_DIRECTIONS.bottom:
                    this.isBottomResizable = true;
                    break;
                case RESIZE_DIRECTIONS.right:
                    this.isRightResizable = true;
                    break;
                case RESIZE_DIRECTIONS.topLeft:
                    this.isTopLeftResizable = true;
                    break;
                case RESIZE_DIRECTIONS.topRight:
                    this.isTopRightResizable = true;
                    break;
                case RESIZE_DIRECTIONS.bottomLeft:
                    this.isBottomLeftResizable = true;
                    break;
                case RESIZE_DIRECTIONS.bottomRight:
                    this.isBottomRightResizable = true;
                    break;
                default:
            }
        });
    }
    /**
     * @return {?}
     */
    getConfig() {
        return this.widgetConfig;
    }
    /**
     * @return {?}
     */
    getEl() {
        return this.elRef;
    }
}
NgxWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-widget',
                template: "<div class=\"wg-widget-content\">\r\n  <ng-content></ng-content>\r\n</div>\r\n<div [ngxWidgetMover]=\"swapOnMove\"\r\n     *ngIf=\"movable\"\r\n     class=\"wg-widget-edit-move\">\r\n</div>\r\n<div *ngIf=\"resizable\"\r\n     class=\"wg-widget-edit-resize\">\r\n  <div class=\"wg-resize wg-resize-axis wg-resize-n\"\r\n       [ngxWidgetResizer]=\"allDirections.top\"\r\n       [hidden]=\"!isTopResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-axis wg-resize-e\"\r\n       [ngxWidgetResizer]=\"allDirections.right\"\r\n       [hidden]=\"!isRightResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-axis wg-resize-s\"\r\n       [ngxWidgetResizer]=\"allDirections.bottom\"\r\n       [hidden]=\"!isBottomResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-axis wg-resize-w\"\r\n       [ngxWidgetResizer]=\"allDirections.left\"\r\n       [hidden]=\"!isLeftResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-diag wg-resize-nw\"\r\n       [ngxWidgetResizer]=\"allDirections.topLeft\"\r\n       [hidden]=\"!isTopLeftResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-diag wg-resize-ne\"\r\n       [ngxWidgetResizer]=\"allDirections.topRight\"\r\n       [hidden]=\"!isTopRightResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-diag wg-resize-se\"\r\n       [ngxWidgetResizer]=\"allDirections.bottomRight\"\r\n       [hidden]=\"!isBottomRightResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-diag wg-resize-sw\"\r\n       [ngxWidgetResizer]=\"allDirections.bottomLeft\"\r\n       [hidden]=\"!isBottomLeftResizable\"></div>\r\n</div>\r\n\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:absolute}:host .wg-widget-content{position:absolute;overflow:hidden;height:100%;width:100%}:host.wg-moving .wg-widget-content,:host.wg-resizing .wg-widget-content{opacity:.2;z-index:18}:host.wg-moving .wg-widget-edit-move{cursor:move;cursor:-webkit-grabbing}.wg-widget-edit-move{position:absolute;top:6px;right:6px;bottom:6px;left:6px;z-index:20;touch-action:none;cursor:move;cursor:-webkit-grab}.wg-widget-edit-resize{position:absolute;touch-action:none;top:0;right:0;bottom:0;left:0;z-index:15}.wg-resize{position:absolute}.wg-resize-diag{border-color:rgba(0,113,188,.75);border-style:solid;width:0;height:0;z-index:1}.wg-resize-diag:hover{border-color:rgba(0,138,229,.75)}.wg-resize-diag.dragging{border-color:rgba(0,174,239,.75)}.wg-resize-axis{background-color:rgba(0,113,188,.12)}.wg-resize-axis.dragging{background-color:rgba(0,174,239,.24)}.wg-resize-nw{top:0;left:0;cursor:nw-resize;border-width:.5rem .5rem 0 0;border-right-color:transparent!important}.wg-resize-ne{top:0;right:0;cursor:ne-resize;border-width:.5rem 0 0 .5rem;border-left-color:transparent!important}.wg-resize-se{bottom:0;right:0;cursor:se-resize;border-width:0 0 .5rem .5rem;border-left-color:transparent!important}.wg-resize-sw{bottom:0;left:0;cursor:sw-resize;border-width:0 .5rem .5rem 0;border-right-color:transparent!important}.wg-resize-n{top:0;right:0;left:0;height:.25rem;cursor:n-resize}.wg-resize-e{top:0;right:0;bottom:0;width:.25rem;cursor:e-resize}.wg-resize-s{right:0;bottom:0;left:0;height:.25rem;cursor:s-resize}.wg-resize-w{top:0;bottom:0;left:0;width:.25rem;cursor:w-resize}[hidden]{display:none}"]
            }] }
];
/** @nocollapse */
NgxWidgetComponent.ctorParameters = () => [
    { type: ElementRef }
];
NgxWidgetComponent.propDecorators = {
    swapOnMove: [{ type: Input }],
    positionChange: [{ type: Output }],
    movable: [{ type: Input }],
    position: [{ type: Input }],
    resizable: [{ type: Input }],
    resizeDirections: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgxWidgetComponent.prototype.swapOnMove;
    /** @type {?} */
    NgxWidgetComponent.prototype.positionChange;
    /** @type {?} */
    NgxWidgetComponent.prototype.movable;
    /** @type {?} */
    NgxWidgetComponent.prototype.allDirections;
    /** @type {?} */
    NgxWidgetComponent.prototype.isTopResizable;
    /** @type {?} */
    NgxWidgetComponent.prototype.isRightResizable;
    /** @type {?} */
    NgxWidgetComponent.prototype.isBottomResizable;
    /** @type {?} */
    NgxWidgetComponent.prototype.isLeftResizable;
    /** @type {?} */
    NgxWidgetComponent.prototype.isTopRightResizable;
    /** @type {?} */
    NgxWidgetComponent.prototype.isTopLeftResizable;
    /** @type {?} */
    NgxWidgetComponent.prototype.isBottomRightResizable;
    /** @type {?} */
    NgxWidgetComponent.prototype.isBottomLeftResizable;
    /** @type {?} */
    NgxWidgetComponent.prototype.widgetConfig;
    /** @type {?} */
    NgxWidgetComponent.prototype._position;
    /** @type {?} */
    NgxWidgetComponent.prototype._resizable;
    /** @type {?} */
    NgxWidgetComponent.prototype._resizeDirections;
    /** @type {?} */
    NgxWidgetComponent.prototype.elRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13aWRnZXQtZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3dpZGdldC93aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFRaEUsTUFBTTs7OztJQW9CSixZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzBCQWxCZixLQUFLOzhCQUVlLElBQUksWUFBWSxFQUFFO3VCQUN6QyxLQUFLOzZCQUNELGlCQUFpQjs4QkFDaEIsS0FBSztnQ0FDSCxLQUFLO2lDQUNKLEtBQUs7K0JBQ1AsS0FBSzttQ0FDRCxLQUFLO2tDQUNOLEtBQUs7c0NBQ0QsS0FBSztxQ0FDTixLQUFLOzBCQUdoQixLQUFLO2lDQUN1QixjQUFjO1FBRzVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3JEOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7OztJQUVELElBQ0ksUUFBUSxDQUFDLFFBQW1CO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFR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O3NCQUVOLEtBQUs7dUJBdUJMLEtBQUs7d0JBV0wsS0FBSzsrQkFZTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFdpZGdldENvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVscy9XaWRnZXRDb25maWcubW9kZWwnO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuLi8uLi9tb2RlbHMvUmVjdGFuZ2xlLm1vZGVsJztcclxuaW1wb3J0IHsgQUxMX0RJUkVDVElPTlMsIFJFU0laRV9ESVJFQ1RJT05TIH0gZnJvbSAnLi4vLi4vVXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICAgICAgICAgICBzZWxlY3RvcjogJ25neC13aWRnZXQnLFxyXG4gICAgICAgICAgICAgc3R5bGVVcmxzOiBbJy4vd2lkZ2V0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vd2lkZ2V0LmNvbXBvbmVudC5odG1sJyxcclxuICAgICAgICAgICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbiAgICAgICAgICAgfSlcclxuZXhwb3J0IGNsYXNzIE5neFdpZGdldENvbXBvbmVudCB7XHJcblxyXG4gIEBJbnB1dCgpIHN3YXBPbk1vdmUgPSBmYWxzZTtcclxuICBAT3V0cHV0KClcclxuICBwb3NpdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPFJlY3RhbmdsZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQElucHV0KCkgbW92YWJsZSA9IGZhbHNlO1xyXG4gIHB1YmxpYyBhbGxEaXJlY3Rpb25zID0gUkVTSVpFX0RJUkVDVElPTlM7XHJcbiAgcHVibGljIGlzVG9wUmVzaXphYmxlID0gZmFsc2U7XHJcbiAgcHVibGljIGlzUmlnaHRSZXNpemFibGUgPSBmYWxzZTtcclxuICBwdWJsaWMgaXNCb3R0b21SZXNpemFibGUgPSBmYWxzZTtcclxuICBwdWJsaWMgaXNMZWZ0UmVzaXphYmxlID0gZmFsc2U7XHJcbiAgcHVibGljIGlzVG9wUmlnaHRSZXNpemFibGUgPSBmYWxzZTtcclxuICBwdWJsaWMgaXNUb3BMZWZ0UmVzaXphYmxlID0gZmFsc2U7XHJcbiAgcHVibGljIGlzQm90dG9tUmlnaHRSZXNpemFibGUgPSBmYWxzZTtcclxuICBwdWJsaWMgaXNCb3R0b21MZWZ0UmVzaXphYmxlID0gZmFsc2U7XHJcbiAgcHVibGljIHdpZGdldENvbmZpZzogV2lkZ2V0Q29uZmlnO1xyXG4gIHB1YmxpYyBfcG9zaXRpb246IFJlY3RhbmdsZTtcclxuICBwdWJsaWMgX3Jlc2l6YWJsZSA9IGZhbHNlO1xyXG4gIHB1YmxpYyBfcmVzaXplRGlyZWN0aW9uczogUkVTSVpFX0RJUkVDVElPTlNbXSA9IEFMTF9ESVJFQ1RJT05TO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICB0aGlzLndpZGdldENvbmZpZyA9IG5ldyBXaWRnZXRDb25maWcodGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICBnZXQgcG9zaXRpb24oKTogUmVjdGFuZ2xlIHtcclxuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHBvc2l0aW9uKHBvc2l0aW9uOiBSZWN0YW5nbGUpIHtcclxuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICB0aGlzLndpZGdldENvbmZpZy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgdGhpcy5wb3NpdGlvbkNoYW5nZS5lbWl0KHBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIGdldCByZXNpemFibGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzaXphYmxlO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgcmVzaXphYmxlKHJlc2l6YWJsZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fcmVzaXphYmxlID0gcmVzaXphYmxlO1xyXG4gICAgaWYgKHJlc2l6YWJsZSkge1xyXG4gICAgICB0aGlzLnNldFJlc2l6ZURpcmVjdGlvbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCByZXNpemVEaXJlY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZURpcmVjdGlvbnM7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCByZXNpemVEaXJlY3Rpb25zKGRpcnM6IFJFU0laRV9ESVJFQ1RJT05TW10pIHtcclxuICAgIHRoaXMuX3Jlc2l6ZURpcmVjdGlvbnMgPSA8UkVTSVpFX0RJUkVDVElPTlNbXT5kaXJzLmZpbHRlcigoZGlyOiBSRVNJWkVfRElSRUNUSU9OUykgPT4ge1xyXG4gICAgICByZXR1cm4gQUxMX0RJUkVDVElPTlMuaW5kZXhPZig8UkVTSVpFX0RJUkVDVElPTlM+KDxzdHJpbmc+ZGlyKS50b1VwcGVyQ2FzZSgpKSAhPT0gLTE7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2V0UmVzaXplRGlyZWN0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVzaXplRGlyZWN0aW9ucygpIHtcclxuICAgIHRoaXMuaXNUb3BSZXNpemFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNSaWdodFJlc2l6YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0JvdHRvbVJlc2l6YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0xlZnRSZXNpemFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNUb3BSaWdodFJlc2l6YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1RvcExlZnRSZXNpemFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNCb3R0b21SaWdodFJlc2l6YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0JvdHRvbUxlZnRSZXNpemFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX3Jlc2l6ZURpcmVjdGlvbnMuZm9yRWFjaCgoZGlyKSA9PiB7XHJcbiAgICAgIHN3aXRjaCAoZGlyKSB7XHJcbiAgICAgICAgY2FzZSBSRVNJWkVfRElSRUNUSU9OUy50b3A6XHJcbiAgICAgICAgICB0aGlzLmlzVG9wUmVzaXphYmxlID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMubGVmdDpcclxuICAgICAgICAgIHRoaXMuaXNMZWZ0UmVzaXphYmxlID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMuYm90dG9tOlxyXG4gICAgICAgICAgdGhpcy5pc0JvdHRvbVJlc2l6YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFJFU0laRV9ESVJFQ1RJT05TLnJpZ2h0OlxyXG4gICAgICAgICAgdGhpcy5pc1JpZ2h0UmVzaXphYmxlID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMudG9wTGVmdDpcclxuICAgICAgICAgIHRoaXMuaXNUb3BMZWZ0UmVzaXphYmxlID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMudG9wUmlnaHQ6XHJcbiAgICAgICAgICB0aGlzLmlzVG9wUmlnaHRSZXNpemFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBSRVNJWkVfRElSRUNUSU9OUy5ib3R0b21MZWZ0OlxyXG4gICAgICAgICAgdGhpcy5pc0JvdHRvbUxlZnRSZXNpemFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBSRVNJWkVfRElSRUNUSU9OUy5ib3R0b21SaWdodDpcclxuICAgICAgICAgIHRoaXMuaXNCb3R0b21SaWdodFJlc2l6YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENvbmZpZygpOiBXaWRnZXRDb25maWcge1xyXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0Q29uZmlnO1xyXG4gIH1cclxuXHJcbiAgZ2V0RWwoKTogRWxlbWVudFJlZiB7XHJcbiAgICByZXR1cm4gdGhpcy5lbFJlZjtcclxuICB9XHJcbn1cclxuIl19