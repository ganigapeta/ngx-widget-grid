/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { WidgetConfig } from '../../models/WidgetConfig.model';
import { Rectangle } from '../../models/Rectangle.model';
import { ALL_DIRECTIONS, RESIZE_DIRECTIONS } from '../../Utils';
var NgxWidgetComponent = /** @class */ (function () {
    function NgxWidgetComponent(elRef) {
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
    Object.defineProperty(NgxWidgetComponent.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            return this._position;
        },
        set: /**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            this._position = position;
            this.widgetConfig.position = position;
            this.positionChange.emit(position);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxWidgetComponent.prototype, "resizable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._resizable;
        },
        set: /**
         * @param {?} resizable
         * @return {?}
         */
        function (resizable) {
            this._resizable = resizable;
            if (resizable) {
                this.setResizeDirections();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxWidgetComponent.prototype, "resizeDirections", {
        get: /**
         * @return {?}
         */
        function () {
            return this._resizeDirections;
        },
        set: /**
         * @param {?} dirs
         * @return {?}
         */
        function (dirs) {
            this._resizeDirections = /** @type {?} */ (dirs.filter(function (dir) {
                return ALL_DIRECTIONS.indexOf(/** @type {?} */ ((/** @type {?} */ (dir)).toUpperCase())) !== -1;
            }));
            this.setResizeDirections();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxWidgetComponent.prototype.setResizeDirections = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isTopResizable = false;
        this.isRightResizable = false;
        this.isBottomResizable = false;
        this.isLeftResizable = false;
        this.isTopRightResizable = false;
        this.isTopLeftResizable = false;
        this.isBottomRightResizable = false;
        this.isBottomLeftResizable = false;
        this._resizeDirections.forEach(function (dir) {
            switch (dir) {
                case RESIZE_DIRECTIONS.top:
                    _this.isTopResizable = true;
                    break;
                case RESIZE_DIRECTIONS.left:
                    _this.isLeftResizable = true;
                    break;
                case RESIZE_DIRECTIONS.bottom:
                    _this.isBottomResizable = true;
                    break;
                case RESIZE_DIRECTIONS.right:
                    _this.isRightResizable = true;
                    break;
                case RESIZE_DIRECTIONS.topLeft:
                    _this.isTopLeftResizable = true;
                    break;
                case RESIZE_DIRECTIONS.topRight:
                    _this.isTopRightResizable = true;
                    break;
                case RESIZE_DIRECTIONS.bottomLeft:
                    _this.isBottomLeftResizable = true;
                    break;
                case RESIZE_DIRECTIONS.bottomRight:
                    _this.isBottomRightResizable = true;
                    break;
                default:
            }
        });
    };
    /**
     * @return {?}
     */
    NgxWidgetComponent.prototype.getConfig = /**
     * @return {?}
     */
    function () {
        return this.widgetConfig;
    };
    /**
     * @return {?}
     */
    NgxWidgetComponent.prototype.getEl = /**
     * @return {?}
     */
    function () {
        return this.elRef;
    };
    NgxWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-widget',
                    template: "<div class=\"wg-widget-content\">\r\n  <ng-content></ng-content>\r\n</div>\r\n<div [ngxWidgetMover]=\"swapOnMove\"\r\n     *ngIf=\"movable\"\r\n     class=\"wg-widget-edit-move\">\r\n</div>\r\n<div *ngIf=\"resizable\"\r\n     class=\"wg-widget-edit-resize\">\r\n  <div class=\"wg-resize wg-resize-axis wg-resize-n\"\r\n       [ngxWidgetResizer]=\"allDirections.top\"\r\n       [hidden]=\"!isTopResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-axis wg-resize-e\"\r\n       [ngxWidgetResizer]=\"allDirections.right\"\r\n       [hidden]=\"!isRightResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-axis wg-resize-s\"\r\n       [ngxWidgetResizer]=\"allDirections.bottom\"\r\n       [hidden]=\"!isBottomResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-axis wg-resize-w\"\r\n       [ngxWidgetResizer]=\"allDirections.left\"\r\n       [hidden]=\"!isLeftResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-diag wg-resize-nw\"\r\n       [ngxWidgetResizer]=\"allDirections.topLeft\"\r\n       [hidden]=\"!isTopLeftResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-diag wg-resize-ne\"\r\n       [ngxWidgetResizer]=\"allDirections.topRight\"\r\n       [hidden]=\"!isTopRightResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-diag wg-resize-se\"\r\n       [ngxWidgetResizer]=\"allDirections.bottomRight\"\r\n       [hidden]=\"!isBottomRightResizable\"></div>\r\n  <div class=\"wg-resize wg-resize-diag wg-resize-sw\"\r\n       [ngxWidgetResizer]=\"allDirections.bottomLeft\"\r\n       [hidden]=\"!isBottomLeftResizable\"></div>\r\n</div>\r\n\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{position:absolute}:host .wg-widget-content{position:absolute;overflow:hidden;height:100%;width:100%}:host.wg-moving .wg-widget-content,:host.wg-resizing .wg-widget-content{opacity:.2;z-index:18}:host.wg-moving .wg-widget-edit-move{cursor:move;cursor:-webkit-grabbing}.wg-widget-edit-move{position:absolute;top:6px;right:6px;bottom:6px;left:6px;z-index:20;touch-action:none;cursor:move;cursor:-webkit-grab}.wg-widget-edit-resize{position:absolute;touch-action:none;top:0;right:0;bottom:0;left:0;z-index:15}.wg-resize{position:absolute}.wg-resize-diag{border-color:rgba(0,113,188,.75);border-style:solid;width:0;height:0;z-index:1}.wg-resize-diag:hover{border-color:rgba(0,138,229,.75)}.wg-resize-diag.dragging{border-color:rgba(0,174,239,.75)}.wg-resize-axis{background-color:rgba(0,113,188,.12)}.wg-resize-axis.dragging{background-color:rgba(0,174,239,.24)}.wg-resize-nw{top:0;left:0;cursor:nw-resize;border-width:.5rem .5rem 0 0;border-right-color:transparent!important}.wg-resize-ne{top:0;right:0;cursor:ne-resize;border-width:.5rem 0 0 .5rem;border-left-color:transparent!important}.wg-resize-se{bottom:0;right:0;cursor:se-resize;border-width:0 0 .5rem .5rem;border-left-color:transparent!important}.wg-resize-sw{bottom:0;left:0;cursor:sw-resize;border-width:0 .5rem .5rem 0;border-right-color:transparent!important}.wg-resize-n{top:0;right:0;left:0;height:.25rem;cursor:n-resize}.wg-resize-e{top:0;right:0;bottom:0;width:.25rem;cursor:e-resize}.wg-resize-s{right:0;bottom:0;left:0;height:.25rem;cursor:s-resize}.wg-resize-w{top:0;bottom:0;left:0;width:.25rem;cursor:w-resize}[hidden]{display:none}"]
                }] }
    ];
    /** @nocollapse */
    NgxWidgetComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NgxWidgetComponent.propDecorators = {
        swapOnMove: [{ type: Input }],
        positionChange: [{ type: Output }],
        movable: [{ type: Input }],
        position: [{ type: Input }],
        resizable: [{ type: Input }],
        resizeDirections: [{ type: Input }]
    };
    return NgxWidgetComponent;
}());
export { NgxWidgetComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13aWRnZXQtZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3dpZGdldC93aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7O0lBNEI5RCw0QkFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTswQkFsQmYsS0FBSzs4QkFFZSxJQUFJLFlBQVksRUFBRTt1QkFDekMsS0FBSzs2QkFDRCxpQkFBaUI7OEJBQ2hCLEtBQUs7Z0NBQ0gsS0FBSztpQ0FDSixLQUFLOytCQUNQLEtBQUs7bUNBQ0QsS0FBSztrQ0FDTixLQUFLO3NDQUNELEtBQUs7cUNBQ04sS0FBSzswQkFHaEIsS0FBSztpQ0FDdUIsY0FBYztRQUc1RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNyRDtJQUVELHNCQUFJLHdDQUFROzs7O1FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7Ozs7O1FBRUQsVUFDYSxRQUFtQjtZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FD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YXBELEtBQUs7aUNBQ0wsTUFBTTswQkFFTixLQUFLOzJCQXVCTCxLQUFLOzRCQVdMLEtBQUs7bUNBWUwsS0FBSzs7NkJBOURSOztTQVdhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBXaWRnZXRDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbHMvV2lkZ2V0Q29uZmlnLm1vZGVsJztcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1JlY3RhbmdsZS5tb2RlbCc7XHJcbmltcG9ydCB7IEFMTF9ESVJFQ1RJT05TLCBSRVNJWkVfRElSRUNUSU9OUyB9IGZyb20gJy4uLy4uL1V0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgICAgICAgICAgc2VsZWN0b3I6ICduZ3gtd2lkZ2V0JyxcclxuICAgICAgICAgICAgIHN0eWxlVXJsczogWycuL3dpZGdldC5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL3dpZGdldC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICAgICAgICAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG4gICAgICAgICAgIH0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hXaWRnZXRDb21wb25lbnQge1xyXG5cclxuICBASW5wdXQoKSBzd2FwT25Nb3ZlID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpXHJcbiAgcG9zaXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxSZWN0YW5nbGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBJbnB1dCgpIG1vdmFibGUgPSBmYWxzZTtcclxuICBwdWJsaWMgYWxsRGlyZWN0aW9ucyA9IFJFU0laRV9ESVJFQ1RJT05TO1xyXG4gIHB1YmxpYyBpc1RvcFJlc2l6YWJsZSA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpc1JpZ2h0UmVzaXphYmxlID0gZmFsc2U7XHJcbiAgcHVibGljIGlzQm90dG9tUmVzaXphYmxlID0gZmFsc2U7XHJcbiAgcHVibGljIGlzTGVmdFJlc2l6YWJsZSA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpc1RvcFJpZ2h0UmVzaXphYmxlID0gZmFsc2U7XHJcbiAgcHVibGljIGlzVG9wTGVmdFJlc2l6YWJsZSA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpc0JvdHRvbVJpZ2h0UmVzaXphYmxlID0gZmFsc2U7XHJcbiAgcHVibGljIGlzQm90dG9tTGVmdFJlc2l6YWJsZSA9IGZhbHNlO1xyXG4gIHB1YmxpYyB3aWRnZXRDb25maWc6IFdpZGdldENvbmZpZztcclxuICBwdWJsaWMgX3Bvc2l0aW9uOiBSZWN0YW5nbGU7XHJcbiAgcHVibGljIF9yZXNpemFibGUgPSBmYWxzZTtcclxuICBwdWJsaWMgX3Jlc2l6ZURpcmVjdGlvbnM6IFJFU0laRV9ESVJFQ1RJT05TW10gPSBBTExfRElSRUNUSU9OUztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy53aWRnZXRDb25maWcgPSBuZXcgV2lkZ2V0Q29uZmlnKHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBvc2l0aW9uKCk6IFJlY3RhbmdsZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBwb3NpdGlvbihwb3NpdGlvbjogUmVjdGFuZ2xlKSB7XHJcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgdGhpcy53aWRnZXRDb25maWcucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIHRoaXMucG9zaXRpb25DaGFuZ2UuZW1pdChwb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICBnZXQgcmVzaXphYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jlc2l6YWJsZTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHJlc2l6YWJsZShyZXNpemFibGU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Jlc2l6YWJsZSA9IHJlc2l6YWJsZTtcclxuICAgIGlmIChyZXNpemFibGUpIHtcclxuICAgICAgdGhpcy5zZXRSZXNpemVEaXJlY3Rpb25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgcmVzaXplRGlyZWN0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLl9yZXNpemVEaXJlY3Rpb25zO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgcmVzaXplRGlyZWN0aW9ucyhkaXJzOiBSRVNJWkVfRElSRUNUSU9OU1tdKSB7XHJcbiAgICB0aGlzLl9yZXNpemVEaXJlY3Rpb25zID0gPFJFU0laRV9ESVJFQ1RJT05TW10+ZGlycy5maWx0ZXIoKGRpcjogUkVTSVpFX0RJUkVDVElPTlMpID0+IHtcclxuICAgICAgcmV0dXJuIEFMTF9ESVJFQ1RJT05TLmluZGV4T2YoPFJFU0laRV9ESVJFQ1RJT05TPig8c3RyaW5nPmRpcikudG9VcHBlckNhc2UoKSkgIT09IC0xO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNldFJlc2l6ZURpcmVjdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIHNldFJlc2l6ZURpcmVjdGlvbnMoKSB7XHJcbiAgICB0aGlzLmlzVG9wUmVzaXphYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzUmlnaHRSZXNpemFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNCb3R0b21SZXNpemFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNMZWZ0UmVzaXphYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzVG9wUmlnaHRSZXNpemFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNUb3BMZWZ0UmVzaXphYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzQm90dG9tUmlnaHRSZXNpemFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNCb3R0b21MZWZ0UmVzaXphYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9yZXNpemVEaXJlY3Rpb25zLmZvckVhY2goKGRpcikgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGRpcikge1xyXG4gICAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMudG9wOlxyXG4gICAgICAgICAgdGhpcy5pc1RvcFJlc2l6YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFJFU0laRV9ESVJFQ1RJT05TLmxlZnQ6XHJcbiAgICAgICAgICB0aGlzLmlzTGVmdFJlc2l6YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFJFU0laRV9ESVJFQ1RJT05TLmJvdHRvbTpcclxuICAgICAgICAgIHRoaXMuaXNCb3R0b21SZXNpemFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBSRVNJWkVfRElSRUNUSU9OUy5yaWdodDpcclxuICAgICAgICAgIHRoaXMuaXNSaWdodFJlc2l6YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFJFU0laRV9ESVJFQ1RJT05TLnRvcExlZnQ6XHJcbiAgICAgICAgICB0aGlzLmlzVG9wTGVmdFJlc2l6YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFJFU0laRV9ESVJFQ1RJT05TLnRvcFJpZ2h0OlxyXG4gICAgICAgICAgdGhpcy5pc1RvcFJpZ2h0UmVzaXphYmxlID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMuYm90dG9tTGVmdDpcclxuICAgICAgICAgIHRoaXMuaXNCb3R0b21MZWZ0UmVzaXphYmxlID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgUkVTSVpFX0RJUkVDVElPTlMuYm90dG9tUmlnaHQ6XHJcbiAgICAgICAgICB0aGlzLmlzQm90dG9tUmlnaHRSZXNpemFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb25maWcoKTogV2lkZ2V0Q29uZmlnIHtcclxuICAgIHJldHVybiB0aGlzLndpZGdldENvbmZpZztcclxuICB9XHJcblxyXG4gIGdldEVsKCk6IEVsZW1lbnRSZWYge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxSZWY7XHJcbiAgfVxyXG59XHJcbiJdfQ==