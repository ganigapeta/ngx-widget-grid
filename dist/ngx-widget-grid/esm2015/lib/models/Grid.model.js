/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CellSize } from './CellSize.model';
export class Grid {
    /**
     * @param {?=} rows
     * @param {?=} columns
     */
    constructor(rows, columns) {
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
    /**
     * @return {?}
     */
    get widgets() {
        return this._widgets;
    }
    /**
     * @return {?}
     */
    get rows() {
        return this._rows;
    }
    /**
     * @return {?}
     */
    get columns() {
        return this._columns;
    }
    /**
     * @return {?}
     */
    get cellSize() {
        return this._cellSize;
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    add(widget) {
        this._widgets.push(widget);
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    remove(widget) {
        /** @type {?} */
        const widgetIndex = this._widgets.indexOf(widget);
        if (widgetIndex > -1) {
            this._widgets.splice(widgetIndex, 1);
        }
    }
    /**
     * @return {?}
     */
    removeAll() {
        this._widgets.splice(0);
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    hasWidget(widget) {
        /** @type {?} */
        const widgetIndex = this._widgets.indexOf(widget);
        return widgetIndex > -1;
    }
    /**
     * @param {?} rows
     * @param {?} columns
     * @return {?}
     */
    resize(rows, columns) {
        columns = +columns || 0;
        rows = +rows || 0;
        if (columns > 0 && rows > 0 && columns !== this._columns || rows !== this._rows) {
            this._columns = columns;
            this._rows = rows;
            this._cellSize = new CellSize(this._rows, this._columns);
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13aWRnZXQtZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvR3JpZC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRzVDLE1BQU07Ozs7O0lBTUosWUFBWSxJQUFhLEVBQUUsT0FBZ0I7d0JBTFIsRUFBRTtxQkFDckIsQ0FBQzt3QkFDRSxDQUFDO1FBSWxCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzFEOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7O0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7OztJQUVELEdBQUcsQ0FBQyxNQUFvQjtRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM1Qjs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBb0I7O1FBQ3pCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0QztLQUNGOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pCOzs7OztJQUVELFNBQVMsQ0FBQyxNQUFvQjs7UUFDNUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsT0FBTyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDekI7Ozs7OztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsT0FBZTtRQUNsQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFFbEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMxRDtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZWxsU2l6ZSB9IGZyb20gJy4vQ2VsbFNpemUubW9kZWwnO1xyXG5pbXBvcnQgeyBXaWRnZXRDb25maWcgfSBmcm9tICcuL1dpZGdldENvbmZpZy5tb2RlbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JpZCB7XHJcbiAgcHJpdmF0ZSBfd2lkZ2V0czogV2lkZ2V0Q29uZmlnW10gPSBbXTtcclxuICBwcml2YXRlIF9yb3dzID0gMztcclxuICBwcml2YXRlIF9jb2x1bW5zID0gMztcclxuICBwcml2YXRlIF9jZWxsU2l6ZTogQ2VsbFNpemU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJvd3M/OiBudW1iZXIsIGNvbHVtbnM/OiBudW1iZXIpIHtcclxuICAgIGlmICgrcm93cykge1xyXG4gICAgICB0aGlzLl9yb3dzID0gK3Jvd3M7XHJcbiAgICB9XHJcbiAgICBpZiAoK2NvbHVtbnMpIHtcclxuICAgICAgdGhpcy5fY29sdW1ucyA9ICtjb2x1bW5zO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY2VsbFNpemUgPSBuZXcgQ2VsbFNpemUodGhpcy5fcm93cywgdGhpcy5fY29sdW1ucyk7XHJcbiAgfVxyXG5cclxuICBnZXQgd2lkZ2V0cygpIHtcclxuICAgIHJldHVybiB0aGlzLl93aWRnZXRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJvd3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcm93cztcclxuICB9XHJcblxyXG4gIGdldCBjb2x1bW5zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XHJcbiAgfVxyXG5cclxuICBnZXQgY2VsbFNpemUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2VsbFNpemU7XHJcbiAgfVxyXG5cclxuICBhZGQod2lkZ2V0OiBXaWRnZXRDb25maWcpIHtcclxuICAgIHRoaXMuX3dpZGdldHMucHVzaCh3aWRnZXQpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKHdpZGdldDogV2lkZ2V0Q29uZmlnKSB7XHJcbiAgICBjb25zdCB3aWRnZXRJbmRleCA9IHRoaXMuX3dpZGdldHMuaW5kZXhPZih3aWRnZXQpO1xyXG4gICAgaWYgKHdpZGdldEluZGV4ID4gLTEpIHtcclxuICAgICAgdGhpcy5fd2lkZ2V0cy5zcGxpY2Uod2lkZ2V0SW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQWxsKCkge1xyXG4gICAgdGhpcy5fd2lkZ2V0cy5zcGxpY2UoMCk7XHJcbiAgfVxyXG5cclxuICBoYXNXaWRnZXQod2lkZ2V0OiBXaWRnZXRDb25maWcpIHtcclxuICAgIGNvbnN0IHdpZGdldEluZGV4ID0gdGhpcy5fd2lkZ2V0cy5pbmRleE9mKHdpZGdldCk7XHJcbiAgICByZXR1cm4gd2lkZ2V0SW5kZXggPiAtMTtcclxuICB9XHJcblxyXG4gIHJlc2l6ZShyb3dzOiBudW1iZXIsIGNvbHVtbnM6IG51bWJlcikge1xyXG4gICAgY29sdW1ucyA9ICtjb2x1bW5zIHx8IDA7XHJcbiAgICByb3dzID0gK3Jvd3MgfHwgMDtcclxuXHJcbiAgICBpZiAoY29sdW1ucyA+IDAgJiYgcm93cyA+IDAgJiYgY29sdW1ucyAhPT0gdGhpcy5fY29sdW1ucyB8fCByb3dzICE9PSB0aGlzLl9yb3dzKSB7XHJcbiAgICAgIHRoaXMuX2NvbHVtbnMgPSBjb2x1bW5zO1xyXG4gICAgICB0aGlzLl9yb3dzID0gcm93cztcclxuICAgICAgdGhpcy5fY2VsbFNpemUgPSBuZXcgQ2VsbFNpemUodGhpcy5fcm93cywgdGhpcy5fY29sdW1ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==