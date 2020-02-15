/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CellSize } from './CellSize.model';
var Grid = /** @class */ (function () {
    function Grid(rows, columns) {
        this._widgets = [];
        this._rows = 3;
        this._columns = 3;
        if (+rows) {
            this._rows = +rows;
        }
        if (+columns) {
            this._columns = +columns;
        }
        this._cellSize = new CellSize(this._rows, this._columns);
    }
    Object.defineProperty(Grid.prototype, "widgets", {
        get: /**
         * @return {?}
         */
        function () {
            return this._widgets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "rows", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "columns", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "cellSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._cellSize;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} widget
     * @return {?}
     */
    Grid.prototype.add = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        this._widgets.push(widget);
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    Grid.prototype.remove = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        /** @type {?} */
        var widgetIndex = this._widgets.indexOf(widget);
        if (widgetIndex > -1) {
            this._widgets.splice(widgetIndex, 1);
        }
    };
    /**
     * @return {?}
     */
    Grid.prototype.removeAll = /**
     * @return {?}
     */
    function () {
        this._widgets.splice(0);
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    Grid.prototype.hasWidget = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        /** @type {?} */
        var widgetIndex = this._widgets.indexOf(widget);
        return widgetIndex > -1;
    };
    /**
     * @param {?} rows
     * @param {?} columns
     * @return {?}
     */
    Grid.prototype.resize = /**
     * @param {?} rows
     * @param {?} columns
     * @return {?}
     */
    function (rows, columns) {
        columns = +columns || 0;
        rows = +rows || 0;
        if (columns > 0 && rows > 0 && columns !== this._columns || rows !== this._rows) {
            this._columns = columns;
            this._rows = rows;
            this._cellSize = new CellSize(this._rows, this._columns);
        }
    };
    return Grid;
}());
export { Grid };
if (false) {
    /** @type {?} */
    Grid.prototype._widgets;
    /** @type {?} */
    Grid.prototype._rows;
    /** @type {?} */
    Grid.prototype._columns;
    /** @type {?} */
    Grid.prototype._cellSize;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13aWRnZXQtZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvR3JpZC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRzVDLElBQUE7SUFNRSxjQUFZLElBQWEsRUFBRSxPQUFnQjt3QkFMUixFQUFFO3FCQUNyQixDQUFDO3dCQUNFLENBQUM7UUFJbEIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDMUQ7SUFFRCxzQkFBSSx5QkFBTzs7OztRQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3RCOzs7T0FBQTtJQUVELHNCQUFJLHNCQUFJOzs7O1FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7OztPQUFBO0lBRUQsc0JBQUkseUJBQU87Ozs7UUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0Qjs7O09BQUE7SUFFRCxzQkFBSSwwQkFBUTs7OztRQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCOzs7T0FBQTs7Ozs7SUFFRCxrQkFBRzs7OztJQUFILFVBQUksTUFBb0I7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDNUI7Ozs7O0lBRUQscUJBQU07Ozs7SUFBTixVQUFPLE1BQW9COztRQUN6QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdEM7S0FDRjs7OztJQUVELHdCQUFTOzs7SUFBVDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pCOzs7OztJQUVELHdCQUFTOzs7O0lBQVQsVUFBVSxNQUFvQjs7UUFDNUIsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsT0FBTyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDekI7Ozs7OztJQUVELHFCQUFNOzs7OztJQUFOLFVBQU8sSUFBWSxFQUFFLE9BQWU7UUFDbEMsT0FBTyxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBRWxCLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQy9FLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUQ7S0FDRjtlQWhFSDtJQWlFQyxDQUFBO0FBOURELGdCQThEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENlbGxTaXplIH0gZnJvbSAnLi9DZWxsU2l6ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFdpZGdldENvbmZpZyB9IGZyb20gJy4vV2lkZ2V0Q29uZmlnLm1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmlkIHtcclxuICBwcml2YXRlIF93aWRnZXRzOiBXaWRnZXRDb25maWdbXSA9IFtdO1xyXG4gIHByaXZhdGUgX3Jvd3MgPSAzO1xyXG4gIHByaXZhdGUgX2NvbHVtbnMgPSAzO1xyXG4gIHByaXZhdGUgX2NlbGxTaXplOiBDZWxsU2l6ZTtcclxuXHJcbiAgY29uc3RydWN0b3Iocm93cz86IG51bWJlciwgY29sdW1ucz86IG51bWJlcikge1xyXG4gICAgaWYgKCtyb3dzKSB7XHJcbiAgICAgIHRoaXMuX3Jvd3MgPSArcm93cztcclxuICAgIH1cclxuICAgIGlmICgrY29sdW1ucykge1xyXG4gICAgICB0aGlzLl9jb2x1bW5zID0gK2NvbHVtbnM7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jZWxsU2l6ZSA9IG5ldyBDZWxsU2l6ZSh0aGlzLl9yb3dzLCB0aGlzLl9jb2x1bW5zKTtcclxuICB9XHJcblxyXG4gIGdldCB3aWRnZXRzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dpZGdldHM7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93cygpIHtcclxuICAgIHJldHVybiB0aGlzLl9yb3dzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbHVtbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcclxuICB9XHJcblxyXG4gIGdldCBjZWxsU2l6ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jZWxsU2l6ZTtcclxuICB9XHJcblxyXG4gIGFkZCh3aWRnZXQ6IFdpZGdldENvbmZpZykge1xyXG4gICAgdGhpcy5fd2lkZ2V0cy5wdXNoKHdpZGdldCk7XHJcbiAgfVxyXG5cclxuICByZW1vdmUod2lkZ2V0OiBXaWRnZXRDb25maWcpIHtcclxuICAgIGNvbnN0IHdpZGdldEluZGV4ID0gdGhpcy5fd2lkZ2V0cy5pbmRleE9mKHdpZGdldCk7XHJcbiAgICBpZiAod2lkZ2V0SW5kZXggPiAtMSkge1xyXG4gICAgICB0aGlzLl93aWRnZXRzLnNwbGljZSh3aWRnZXRJbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVBbGwoKSB7XHJcbiAgICB0aGlzLl93aWRnZXRzLnNwbGljZSgwKTtcclxuICB9XHJcblxyXG4gIGhhc1dpZGdldCh3aWRnZXQ6IFdpZGdldENvbmZpZykge1xyXG4gICAgY29uc3Qgd2lkZ2V0SW5kZXggPSB0aGlzLl93aWRnZXRzLmluZGV4T2Yod2lkZ2V0KTtcclxuICAgIHJldHVybiB3aWRnZXRJbmRleCA+IC0xO1xyXG4gIH1cclxuXHJcbiAgcmVzaXplKHJvd3M6IG51bWJlciwgY29sdW1uczogbnVtYmVyKSB7XHJcbiAgICBjb2x1bW5zID0gK2NvbHVtbnMgfHwgMDtcclxuICAgIHJvd3MgPSArcm93cyB8fCAwO1xyXG5cclxuICAgIGlmIChjb2x1bW5zID4gMCAmJiByb3dzID4gMCAmJiBjb2x1bW5zICE9PSB0aGlzLl9jb2x1bW5zIHx8IHJvd3MgIT09IHRoaXMuX3Jvd3MpIHtcclxuICAgICAgdGhpcy5fY29sdW1ucyA9IGNvbHVtbnM7XHJcbiAgICAgIHRoaXMuX3Jvd3MgPSByb3dzO1xyXG4gICAgICB0aGlzLl9jZWxsU2l6ZSA9IG5ldyBDZWxsU2l6ZSh0aGlzLl9yb3dzLCB0aGlzLl9jb2x1bW5zKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19