/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Grid } from './Grid.model';
import { Cell } from './Cell.model';
import { Utils } from '../Utils';
import { Rectangle } from './Rectangle.model';
var GridRenderer = /** @class */ (function () {
    function GridRenderer(grid) {
        this.positions = {};
        this.obstructions = [];
        this.grid = grid || new Grid();
    }
    Object.defineProperty(GridRenderer.prototype, "grid", {
        get: /**
         * @return {?}
         */
        function () {
            return this._grid;
        },
        set: /**
         * @param {?} grid
         * @return {?}
         */
        function (grid) {
            this._grid = grid;
            this.positions = {};
            this.cachedNextPosition = undefined;
            this.obstructions = [];
            for (var i = 0; i < grid.rows * grid.columns; i++) {
                this.obstructions[i] = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} left
     * @param {?} top
     * @param {?} gridWidth
     * @param {?} gridHeight
     * @return {?}
     */
    GridRenderer.prototype.rasterizeCoords = /**
     * @param {?} left
     * @param {?} top
     * @param {?} gridWidth
     * @param {?} gridHeight
     * @return {?}
     */
    function (left, top, gridWidth, gridHeight) {
        left = Math.min(Math.max(left, 0), gridWidth - 1);
        top = Math.min(Math.max(top, 0), gridHeight - 1);
        /** @type {?} */
        var x = Math.floor(top / gridHeight * this.grid.rows) + 1;
        /** @type {?} */
        var y = Math.floor(left / gridWidth * this.grid.columns) + 1;
        return new Cell(x, y);
    };
    /**
     * @param {?} i
     * @param {?} j
     * @return {?}
     */
    GridRenderer.prototype.getWidgetIdAt = /**
     * @param {?} i
     * @param {?} j
     * @return {?}
     */
    function (i, j) {
        for (var widgetId in this.positions) {
            if (this.positions.hasOwnProperty(widgetId)) {
                /** @type {?} */
                var position = this.positions[widgetId];
                if (position.top <= i && i <= (position.top + position.height - 1) &&
                    position.left <= j && j <= (position.left + position.width - 1)) {
                    return widgetId;
                }
            }
        }
        return null;
    };
    /**
     * @param {?} widgetId
     * @return {?}
     */
    GridRenderer.prototype.getWidgetPosition = /**
     * @param {?} widgetId
     * @return {?}
     */
    function (widgetId) {
        return this.positions[widgetId];
    };
    /**
     * @param {?} widgetId
     * @param {?} newPosition
     * @param {?} swappingPositions
     * @return {?}
     */
    GridRenderer.prototype.setWidgetPosition = /**
     * @param {?} widgetId
     * @param {?} newPosition
     * @param {?} swappingPositions
     * @return {?}
     */
    function (widgetId, newPosition, swappingPositions) {
        /** @type {?} */
        var currPosition = this.positions[widgetId];
        if (currPosition && !swappingPositions) {
            this.setObstructionValues(currPosition, null);
        }
        newPosition = new Rectangle({
            top: Utils.isNumber(newPosition.top) ? newPosition.top : currPosition.top,
            left: Utils.isNumber(newPosition.left) ? newPosition.left : currPosition.left,
            width: Utils.isNumber(newPosition.width) ? newPosition.width : currPosition.width,
            height: Utils.isNumber(newPosition.height) ? newPosition.height : currPosition.height
        });
        this.positions[widgetId] = newPosition;
        this.setObstructionValues(this.positions[widgetId], widgetId);
        this.cachedNextPosition = undefined;
    };
    /**
     * @return {?}
     */
    GridRenderer.prototype.hasSpaceLeft = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.obstructions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var obstruction = _c.value;
                if (obstruction === null) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    /**
     * @return {?}
     */
    GridRenderer.prototype.getNextPosition = /**
     * @return {?}
     */
    function () {
        if (this.cachedNextPosition !== undefined) {
            return this.cachedNextPosition;
        }
        if (!this.hasSpaceLeft()) {
            return null;
        }
        /** @type {?} */
        var maxPosition = this.findLargestEmptyArea();
        this.cachedNextPosition = maxPosition;
        return maxPosition;
    };
    /**
     * @param {?} i
     * @param {?} j
     * @param {?=} excludedArea
     * @return {?}
     */
    GridRenderer.prototype.isObstructed = /**
     * @param {?} i
     * @param {?} j
     * @param {?=} excludedArea
     * @return {?}
     */
    function (i, j, excludedArea) {
        // obstructed if (i, j) exceeds the grid's regular non-expanding boundaries
        if (i < 1 || j < 1 || j > this.grid.columns || i > this.grid.rows) {
            return true;
        }
        /** @type {?} */
        var bottom = excludedArea && excludedArea.top + excludedArea.height - 1;
        /** @type {?} */
        var right = excludedArea && excludedArea.left + excludedArea.width - 1;
        // pass if (i, j) is within the excluded area, if any
        if (excludedArea &&
            excludedArea.top <= i &&
            i <= bottom &&
            excludedArea.left <= j &&
            j <= right) {
            return false;
        }
        return this._isObstructed(i, j);
    };
    /**
     * @param {?} i
     * @param {?} j
     * @return {?}
     */
    GridRenderer.prototype._isObstructed = /**
     * @param {?} i
     * @param {?} j
     * @return {?}
     */
    function (i, j) {
        return this.obstructions[(i - 1) * this.grid.columns + (j - 1)] !== null;
    };
    /**
     * @param {?} area
     * @param {?=} options
     * @return {?}
     */
    GridRenderer.prototype.isAreaObstructed = /**
     * @param {?} area
     * @param {?=} options
     * @return {?}
     */
    function (area, options) {
        if (!area) {
            return false;
        }
        options = Utils.isObject(options) ? options : {};
        /** @type {?} */
        var top = area.top;
        /** @type {?} */
        var left = area.left;
        /** @type {?} */
        var bottom = area.bottom || area.top + area.height - 1;
        /** @type {?} */
        var right = area.right || area.left + area.width - 1;
        if (!Utils.isNumber(top) || !Utils.isNumber(left) || !Utils.isNumber(bottom) || !Utils.isNumber(right)) {
            return false;
        }
        /** @type {?} */
        var verticalStart = options.fromBottom ? bottom : top;
        /** @type {?} */
        var verticalStep = options.fromBottom ? -1 : 1;
        /** @type {?} */
        var verticalEnd = (options.fromBottom ? top : bottom) + verticalStep;
        /** @type {?} */
        var horizontalStart = options.fromRight ? right : left;
        /** @type {?} */
        var horizontalStep = options.fromRight ? -1 : 1;
        /** @type {?} */
        var horizontalEnd = (options.fromRight ? left : right) + horizontalStep;
        for (var i = verticalStart; i !== verticalEnd; i += verticalStep) {
            for (var j = horizontalStart; j !== horizontalEnd; j += horizontalStep) {
                if (this.isObstructed(i, j, options.excludedArea)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * @param {?} widgetId
     * @return {?}
     */
    GridRenderer.prototype.getStyle = /**
     * @param {?} widgetId
     * @return {?}
     */
    function (widgetId) {
        /** @type {?} */
        var render = this.positions[widgetId];
        if (!render) {
            return { display: 'none' };
        }
        return {
            top: ((render.top - 1) * this.grid.cellSize.height).toString() + '%',
            height: (render.height * this.grid.cellSize.height).toString() + '%',
            left: ((render.left - 1) * this.grid.cellSize.width).toString() + '%',
            width: (render.width * this.grid.cellSize.width).toString() + '%'
        };
    };
    /**
     * @param {?} area
     * @param {?} value
     * @return {?}
     */
    GridRenderer.prototype.setObstructionValues = /**
     * @param {?} area
     * @param {?} value
     * @return {?}
     */
    function (area, value) {
        for (var i = area.top - 1; i < area.top + area.height - 1; i++) {
            for (var j = area.left - 1; j < area.left + area.width - 1; j++) {
                this.obstructions[i * this.grid.columns + j] = value;
            }
        }
    };
    /**
     * @return {?}
     */
    GridRenderer.prototype.findLargestEmptyArea = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var maxArea = null;
        /** @type {?} */
        var currMaxArea = null;
        /** @type {?} */
        var maxSurfaceArea = 0;
        /** @type {?} */
        var currMaxSurfaceArea = 0;
        for (var i = 1; i <= this.grid.rows; i++) {
            for (var j = 1; j <= this.grid.columns; j++) {
                if (this._isObstructed(i, j)) {
                    continue;
                }
                /** @type {?} */
                var currAreaLimit = (this.grid.rows - i + 1) * (this.grid.columns - j + 1);
                if (currAreaLimit < maxSurfaceArea) {
                    break;
                }
                currMaxArea = this._findLargestEmptyAreaFrom(new Cell(i, j));
                currMaxSurfaceArea = currMaxArea.getSurfaceArea();
                if (currMaxSurfaceArea > maxSurfaceArea) {
                    maxSurfaceArea = currMaxSurfaceArea;
                    maxArea = currMaxArea;
                }
            }
        }
        return maxArea;
    };
    /**
     * @param {?} start
     * @return {?}
     */
    GridRenderer.prototype._findLargestEmptyAreaFrom = /**
     * @param {?} start
     * @return {?}
     */
    function (start) {
        if (!Utils.isDefined(this.grid) || !Utils.isNumber(this.grid.columns) || !Utils.isNumber(this.grid.rows)) {
            return null;
        }
        /** @type {?} */
        var maxArea = null;
        /** @type {?} */
        var maxSurfaceArea = 0;
        /** @type {?} */
        var endColumn = this.grid.columns;
        for (var i = start.top; i <= this.grid.rows; i++) {
            for (var j = start.left; j <= endColumn; j++) {
                if (this._isObstructed(i, j)) {
                    endColumn = j - 1;
                    continue;
                }
                /** @type {?} */
                var currHeight = (i - start.top + 1);
                /** @type {?} */
                var currWidth = (j - start.left + 1);
                /** @type {?} */
                var currSurfaceArea = currHeight * currWidth;
                if (currSurfaceArea > maxSurfaceArea) {
                    maxSurfaceArea = currSurfaceArea;
                    maxArea = new Rectangle({
                        top: start.top,
                        left: start.left,
                        width: currWidth,
                        height: currHeight
                    });
                }
            }
        }
        return maxArea;
    };
    /**
     * @param {?} grid
     * @param {?=} emitWidgetPositionUpdated
     * @return {?}
     */
    GridRenderer.prototype.render = /**
     * @param {?} grid
     * @param {?=} emitWidgetPositionUpdated
     * @return {?}
     */
    function (grid, emitWidgetPositionUpdated) {
        var _this = this;
        this.grid = grid;
        /** @type {?} */
        var widgets = this.grid && this.grid.widgets ? this.grid.widgets : [];
        /** @type {?} */
        var unpositionedWidgets = [];
        widgets.forEach(function (widget) {
            /** @type {?} */
            var position = widget.position;
            if (position.width * position.height === 0 ||
                _this.isAreaObstructed(position)) {
                unpositionedWidgets.push(widget);
            }
            else {
                _this.setWidgetPosition(widget.id, position, false);
            }
        });
        unpositionedWidgets.forEach(function (widget) {
            /** @type {?} */
            var nextPosition = _this.getNextPosition();
            if (nextPosition !== null) {
                widget.position = nextPosition;
                _this.setWidgetPosition(widget.id, nextPosition, false);
            }
            else {
                widget.position = new Rectangle();
                _this.setWidgetPosition(widget.id, new Rectangle(), false);
            }
            if (emitWidgetPositionUpdated) {
                emitWidgetPositionUpdated(widget);
            }
        });
    };
    return GridRenderer;
}());
export { GridRenderer };
if (false) {
    /** @type {?} */
    GridRenderer.prototype.positions;
    /** @type {?} */
    GridRenderer.prototype.cachedNextPosition;
    /** @type {?} */
    GridRenderer.prototype.obstructions;
    /** @type {?} */
    GridRenderer.prototype._grid;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZFJlbmRlcmVyLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9HcmlkUmVuZGVyZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNqQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHOUMsSUFBQTtJQU1FLHNCQUFZLElBQVU7eUJBTDJCLEVBQUU7NEJBRW5CLEVBQUU7UUFJaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztLQUVoQztJQUVELHNCQUFJLDhCQUFJOzs7O1FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7Ozs7O1FBRUQsVUFBUyxJQUFVO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7WUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDN0I7U0FDRjs7O09BVkE7Ozs7Ozs7O0lBWUQsc0NBQWU7Ozs7Ozs7SUFBZixVQUFnQixJQUFZLEVBQUUsR0FBVyxFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFDOUUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQzs7UUFFakQsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUM1RCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0QsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDdkI7Ozs7OztJQUVELG9DQUFhOzs7OztJQUFiLFVBQWMsQ0FBUyxFQUFFLENBQVM7UUFDaEMsS0FBSyxJQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7O2dCQUMzQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUxQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ2hFLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDakUsT0FBTyxRQUFRLENBQUM7aUJBQ2pCO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O0lBRUQsd0NBQWlCOzs7O0lBQWpCLFVBQWtCLFFBQWdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqQzs7Ozs7OztJQUVELHdDQUFpQjs7Ozs7O0lBQWpCLFVBQWtCLFFBQWdCLEVBQUUsV0FBc0IsRUFBRSxpQkFBMEI7O1FBQ3BGLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxZQUFZLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9DO1FBRUQsV0FBVyxHQUFHLElBQUksU0FBUyxDQUFDO1lBQ0UsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRztZQUN6RSxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJO1lBQzdFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDakYsTUFBTSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTTtTQUN0RixDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLENBQUM7UUFFdkMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztLQUNyQzs7OztJQUVELG1DQUFZOzs7SUFBWjs7O1lBQ0UsS0FBMEIsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxZQUFZLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQXhDLElBQU0sV0FBVyxXQUFBO2dCQUNwQixJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7b0JBQ3hCLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2FBQ0Y7Ozs7Ozs7OztRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7Ozs7SUFFRCxzQ0FBZTs7O0lBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7U0FDaEM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O1FBRUQsSUFBTSxXQUFXLEdBQWMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQztRQUN0QyxPQUFPLFdBQVcsQ0FBQztLQUNwQjs7Ozs7OztJQUVELG1DQUFZOzs7Ozs7SUFBWixVQUFhLENBQVMsRUFBRSxDQUFTLEVBQUUsWUFBd0I7O1FBRXpELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakUsT0FBTyxJQUFJLENBQUM7U0FDYjs7UUFDRCxJQUFNLE1BQU0sR0FBRyxZQUFZLElBQUksWUFBWSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7UUFDMUUsSUFBTSxLQUFLLEdBQUcsWUFBWSxJQUFJLFlBQVksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7O1FBRXpFLElBQUksWUFBWTtZQUNkLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNyQixDQUFDLElBQUksTUFBTTtZQUNYLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQztZQUN0QixDQUFDLElBQUksS0FBSyxFQUFFO1lBQ1osT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDakM7Ozs7OztJQUVNLG9DQUFhOzs7OztjQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQzs7Ozs7OztJQUczRSx1Q0FBZ0I7Ozs7O0lBQWhCLFVBQWlCLElBQWUsRUFDZixPQUlDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztRQUVqRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDOztRQUNyQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOztRQUN2QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O1FBQ3pELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0RyxPQUFPLEtBQUssQ0FBQztTQUNkOztRQUVELElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDOztRQUN4RCxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUNqRCxJQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDOztRQUN2RSxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7UUFDekQsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFDbEQsSUFBTSxhQUFhLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLGNBQWMsQ0FBQztRQUUxRSxLQUFLLElBQUksQ0FBQyxHQUFHLGFBQWEsRUFBRSxDQUFDLEtBQUssV0FBVyxFQUFFLENBQUMsSUFBSSxZQUFZLEVBQUU7WUFDaEUsS0FBSyxJQUFJLENBQUMsR0FBRyxlQUFlLEVBQUUsQ0FBQyxLQUFLLGFBQWEsRUFBRSxDQUFDLElBQUksY0FBYyxFQUFFO2dCQUN0RSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQ2pELE9BQU8sSUFBSSxDQUFDO2lCQUNiO2FBQ0Y7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7Ozs7O0lBRUQsK0JBQVE7Ozs7SUFBUixVQUFTLFFBQWdCOztRQVF2QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTztZQUNMLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHO1lBQ3BFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRztZQUNwRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRztZQUNyRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUc7U0FDbEUsQ0FBQztLQUNIOzs7Ozs7SUFFRCwyQ0FBb0I7Ozs7O0lBQXBCLFVBQXFCLElBQWUsRUFBRSxLQUFhO1FBQ2pELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUQsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ3REO1NBQ0Y7S0FDRjs7OztJQUVELDJDQUFvQjs7O0lBQXBCOztRQUNFLElBQUksT0FBTyxHQUFjLElBQUksQ0FBQzs7UUFDOUIsSUFBSSxXQUFXLEdBQWMsSUFBSSxDQUFDOztRQUNsQyxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7O1FBQ3ZCLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7b0JBQzVCLFNBQVM7aUJBQ1Y7O2dCQUVELElBQU0sYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLGFBQWEsR0FBRyxjQUFjLEVBQUU7b0JBQ2xDLE1BQU07aUJBQ1A7Z0JBRUQsV0FBVyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0Qsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUVsRCxJQUFJLGtCQUFrQixHQUFHLGNBQWMsRUFBRTtvQkFDdkMsY0FBYyxHQUFHLGtCQUFrQixDQUFDO29CQUNwQyxPQUFPLEdBQUcsV0FBVyxDQUFDO2lCQUN2QjthQUNGO1NBQ0Y7UUFDRCxPQUFPLE9BQU8sQ0FBQztLQUNoQjs7Ozs7SUFFTSxnREFBeUI7Ozs7Y0FBQyxLQUFXO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4RyxPQUFPLElBQUksQ0FBQztTQUNiOztRQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FFYzs7UUFGaEMsSUFDRSxjQUFjLEdBQUcsQ0FBQyxDQUNZOztRQUZoQyxJQUVFLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hELEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUM1QixTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEIsU0FBUztpQkFDVjs7Z0JBRUQsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3ZDLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7O2dCQUN2QyxJQUFNLGVBQWUsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDO2dCQUUvQyxJQUFJLGVBQWUsR0FBRyxjQUFjLEVBQUU7b0JBQ3BDLGNBQWMsR0FBRyxlQUFlLENBQUM7b0JBQ2pDLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQzt3QkFDRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7d0JBQ2QsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO3dCQUNoQixLQUFLLEVBQUUsU0FBUzt3QkFDaEIsTUFBTSxFQUFFLFVBQVU7cUJBQ25CLENBQUMsQ0FBQztpQkFDNUI7YUFDRjtTQUNGO1FBQ0QsT0FBTyxPQUFPLENBQUM7Ozs7Ozs7SUFHakIsNkJBQU07Ozs7O0lBQU4sVUFBTyxJQUFVLEVBQUUseUJBQW9DO1FBQXZELGlCQTJCQztRQTFCQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7UUFDakIsSUFBTSxPQUFPLEdBQW1CLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7O1FBQ3hGLElBQU0sbUJBQW1CLEdBQW1CLEVBQUUsQ0FBQztRQUMvQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBb0I7O1lBQ25DLElBQU0sUUFBUSxHQUFjLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDNUMsSUFBSSxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFDeEMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3BEO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBb0I7O1lBQy9DLElBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QyxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7Z0JBQ3pCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO2dCQUMvQixLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDeEQ7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNsQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLFNBQVMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsSUFBSSx5QkFBeUIsRUFBRTtnQkFDN0IseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkM7U0FDRixDQUFDLENBQUM7S0FDSjt1QkFyUkg7SUFzUkMsQ0FBQTtBQWhSRCx3QkFnUkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmlkIH0gZnJvbSAnLi9HcmlkLm1vZGVsJztcclxuaW1wb3J0IHsgQ2VsbCB9IGZyb20gJy4vQ2VsbC5tb2RlbCc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vVXRpbHMnO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuL1JlY3RhbmdsZS5tb2RlbCc7XHJcbmltcG9ydCB7IFdpZGdldENvbmZpZyB9IGZyb20gJy4vV2lkZ2V0Q29uZmlnLm1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmlkUmVuZGVyZXIge1xyXG4gIHB1YmxpYyBwb3NpdGlvbnM6IHsgW2tleTogc3RyaW5nXTogUmVjdGFuZ2xlIH0gPSB7fTtcclxuICBwdWJsaWMgY2FjaGVkTmV4dFBvc2l0aW9uOiBSZWN0YW5nbGU7XHJcbiAgcHVibGljIG9ic3RydWN0aW9uczogc3RyaW5nW10gPSBbXTtcclxuICBwdWJsaWMgX2dyaWQ6IEdyaWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGdyaWQ6IEdyaWQpIHtcclxuICAgIHRoaXMuZ3JpZCA9IGdyaWQgfHwgbmV3IEdyaWQoKTtcclxuXHJcbiAgfVxyXG5cclxuICBnZXQgZ3JpZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9ncmlkO1xyXG4gIH1cclxuXHJcbiAgc2V0IGdyaWQoZ3JpZDogR3JpZCkge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICB0aGlzLnBvc2l0aW9ucyA9IHt9O1xyXG4gICAgdGhpcy5jYWNoZWROZXh0UG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLm9ic3RydWN0aW9ucyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkLnJvd3MgKiBncmlkLmNvbHVtbnM7IGkrKykge1xyXG4gICAgICB0aGlzLm9ic3RydWN0aW9uc1tpXSA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByYXN0ZXJpemVDb29yZHMobGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciwgZ3JpZFdpZHRoOiBudW1iZXIsIGdyaWRIZWlnaHQ6IG51bWJlcik6IENlbGwge1xyXG4gICAgbGVmdCA9IE1hdGgubWluKE1hdGgubWF4KGxlZnQsIDApLCBncmlkV2lkdGggLSAxKTtcclxuICAgIHRvcCA9IE1hdGgubWluKE1hdGgubWF4KHRvcCwgMCksIGdyaWRIZWlnaHQgLSAxKTtcclxuXHJcbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcih0b3AgLyBncmlkSGVpZ2h0ICogdGhpcy5ncmlkLnJvd3MpICsgMTtcclxuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKGxlZnQgLyBncmlkV2lkdGggKiB0aGlzLmdyaWQuY29sdW1ucykgKyAxO1xyXG4gICAgcmV0dXJuIG5ldyBDZWxsKHgsIHkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2lkZ2V0SWRBdChpOiBudW1iZXIsIGo6IG51bWJlcikge1xyXG4gICAgZm9yIChjb25zdCB3aWRnZXRJZCBpbiB0aGlzLnBvc2l0aW9ucykge1xyXG4gICAgICBpZiAodGhpcy5wb3NpdGlvbnMuaGFzT3duUHJvcGVydHkod2lkZ2V0SWQpKSB7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uc1t3aWRnZXRJZF07XHJcblxyXG4gICAgICAgIGlmIChwb3NpdGlvbi50b3AgPD0gaSAmJiBpIDw9IChwb3NpdGlvbi50b3AgKyBwb3NpdGlvbi5oZWlnaHQgLSAxKSAmJlxyXG4gICAgICAgICAgcG9zaXRpb24ubGVmdCA8PSBqICYmIGogPD0gKHBvc2l0aW9uLmxlZnQgKyBwb3NpdGlvbi53aWR0aCAtIDEpKSB7XHJcbiAgICAgICAgICByZXR1cm4gd2lkZ2V0SWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFdpZGdldFBvc2l0aW9uKHdpZGdldElkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1t3aWRnZXRJZF07XHJcbiAgfVxyXG5cclxuICBzZXRXaWRnZXRQb3NpdGlvbih3aWRnZXRJZDogc3RyaW5nLCBuZXdQb3NpdGlvbjogUmVjdGFuZ2xlLCBzd2FwcGluZ1Bvc2l0aW9uczogYm9vbGVhbikge1xyXG4gICAgY29uc3QgY3VyclBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbnNbd2lkZ2V0SWRdO1xyXG4gICAgaWYgKGN1cnJQb3NpdGlvbiAmJiAhc3dhcHBpbmdQb3NpdGlvbnMpIHtcclxuICAgICAgdGhpcy5zZXRPYnN0cnVjdGlvblZhbHVlcyhjdXJyUG9zaXRpb24sIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1Bvc2l0aW9uID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IFV0aWxzLmlzTnVtYmVyKG5ld1Bvc2l0aW9uLnRvcCkgPyBuZXdQb3NpdGlvbi50b3AgOiBjdXJyUG9zaXRpb24udG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogVXRpbHMuaXNOdW1iZXIobmV3UG9zaXRpb24ubGVmdCkgPyBuZXdQb3NpdGlvbi5sZWZ0IDogY3VyclBvc2l0aW9uLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogVXRpbHMuaXNOdW1iZXIobmV3UG9zaXRpb24ud2lkdGgpID8gbmV3UG9zaXRpb24ud2lkdGggOiBjdXJyUG9zaXRpb24ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFV0aWxzLmlzTnVtYmVyKG5ld1Bvc2l0aW9uLmhlaWdodCkgPyBuZXdQb3NpdGlvbi5oZWlnaHQgOiBjdXJyUG9zaXRpb24uaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICB0aGlzLnBvc2l0aW9uc1t3aWRnZXRJZF0gPSBuZXdQb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLnNldE9ic3RydWN0aW9uVmFsdWVzKHRoaXMucG9zaXRpb25zW3dpZGdldElkXSwgd2lkZ2V0SWQpO1xyXG4gICAgdGhpcy5jYWNoZWROZXh0UG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBoYXNTcGFjZUxlZnQoKSB7XHJcbiAgICBmb3IgKGNvbnN0IG9ic3RydWN0aW9uIG9mIHRoaXMub2JzdHJ1Y3Rpb25zKSB7XHJcbiAgICAgIGlmIChvYnN0cnVjdGlvbiA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXROZXh0UG9zaXRpb24oKTogUmVjdGFuZ2xlIHtcclxuICAgIGlmICh0aGlzLmNhY2hlZE5leHRQb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlZE5leHRQb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuaGFzU3BhY2VMZWZ0KCkpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWF4UG9zaXRpb246IFJlY3RhbmdsZSA9IHRoaXMuZmluZExhcmdlc3RFbXB0eUFyZWEoKTtcclxuICAgIHRoaXMuY2FjaGVkTmV4dFBvc2l0aW9uID0gbWF4UG9zaXRpb247XHJcbiAgICByZXR1cm4gbWF4UG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBpc09ic3RydWN0ZWQoaTogbnVtYmVyLCBqOiBudW1iZXIsIGV4Y2x1ZGVkQXJlYT86IFJlY3RhbmdsZSkge1xyXG4gICAgLy8gb2JzdHJ1Y3RlZCBpZiAoaSwgaikgZXhjZWVkcyB0aGUgZ3JpZCdzIHJlZ3VsYXIgbm9uLWV4cGFuZGluZyBib3VuZGFyaWVzXHJcbiAgICBpZiAoaSA8IDEgfHwgaiA8IDEgfHwgaiA+IHRoaXMuZ3JpZC5jb2x1bW5zIHx8IGkgPiB0aGlzLmdyaWQucm93cykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGJvdHRvbSA9IGV4Y2x1ZGVkQXJlYSAmJiBleGNsdWRlZEFyZWEudG9wICsgZXhjbHVkZWRBcmVhLmhlaWdodCAtIDE7XHJcbiAgICBjb25zdCByaWdodCA9IGV4Y2x1ZGVkQXJlYSAmJiBleGNsdWRlZEFyZWEubGVmdCArIGV4Y2x1ZGVkQXJlYS53aWR0aCAtIDE7XHJcbiAgICAvLyBwYXNzIGlmIChpLCBqKSBpcyB3aXRoaW4gdGhlIGV4Y2x1ZGVkIGFyZWEsIGlmIGFueVxyXG4gICAgaWYgKGV4Y2x1ZGVkQXJlYSAmJlxyXG4gICAgICBleGNsdWRlZEFyZWEudG9wIDw9IGkgJiZcclxuICAgICAgaSA8PSBib3R0b20gJiZcclxuICAgICAgZXhjbHVkZWRBcmVhLmxlZnQgPD0gaiAmJlxyXG4gICAgICBqIDw9IHJpZ2h0KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5faXNPYnN0cnVjdGVkKGksIGopO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIF9pc09ic3RydWN0ZWQoaTogbnVtYmVyLCBqOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLm9ic3RydWN0aW9uc1soaSAtIDEpICogdGhpcy5ncmlkLmNvbHVtbnMgKyAoaiAtIDEpXSAhPT0gbnVsbDtcclxuICB9XHJcblxyXG4gIGlzQXJlYU9ic3RydWN0ZWQoYXJlYTogUmVjdGFuZ2xlLFxyXG4gICAgICAgICAgICAgICAgICAgb3B0aW9ucz86IHtcclxuICAgICAgICAgICAgICAgICAgICAgZXhjbHVkZWRBcmVhPzogUmVjdGFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgICAgICBmcm9tQm90dG9tPzogYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgICAgZnJvbVJpZ2h0PzogYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgIH0pIHtcclxuICAgIGlmICghYXJlYSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBvcHRpb25zID0gVXRpbHMuaXNPYmplY3Qob3B0aW9ucykgPyBvcHRpb25zIDoge307XHJcblxyXG4gICAgY29uc3QgdG9wID0gYXJlYS50b3A7XHJcbiAgICBjb25zdCBsZWZ0ID0gYXJlYS5sZWZ0O1xyXG4gICAgY29uc3QgYm90dG9tID0gYXJlYS5ib3R0b20gfHwgYXJlYS50b3AgKyBhcmVhLmhlaWdodCAtIDE7XHJcbiAgICBjb25zdCByaWdodCA9IGFyZWEucmlnaHQgfHwgYXJlYS5sZWZ0ICsgYXJlYS53aWR0aCAtIDE7XHJcblxyXG4gICAgaWYgKCFVdGlscy5pc051bWJlcih0b3ApIHx8ICFVdGlscy5pc051bWJlcihsZWZ0KSB8fCAhVXRpbHMuaXNOdW1iZXIoYm90dG9tKSB8fCAhVXRpbHMuaXNOdW1iZXIocmlnaHQpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2ZXJ0aWNhbFN0YXJ0ID0gb3B0aW9ucy5mcm9tQm90dG9tID8gYm90dG9tIDogdG9wO1xyXG4gICAgY29uc3QgdmVydGljYWxTdGVwID0gb3B0aW9ucy5mcm9tQm90dG9tID8gLTEgOiAxO1xyXG4gICAgY29uc3QgdmVydGljYWxFbmQgPSAob3B0aW9ucy5mcm9tQm90dG9tID8gdG9wIDogYm90dG9tKSArIHZlcnRpY2FsU3RlcDtcclxuICAgIGNvbnN0IGhvcml6b250YWxTdGFydCA9IG9wdGlvbnMuZnJvbVJpZ2h0ID8gcmlnaHQgOiBsZWZ0O1xyXG4gICAgY29uc3QgaG9yaXpvbnRhbFN0ZXAgPSBvcHRpb25zLmZyb21SaWdodCA/IC0xIDogMTtcclxuICAgIGNvbnN0IGhvcml6b250YWxFbmQgPSAob3B0aW9ucy5mcm9tUmlnaHQgPyBsZWZ0IDogcmlnaHQpICsgaG9yaXpvbnRhbFN0ZXA7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IHZlcnRpY2FsU3RhcnQ7IGkgIT09IHZlcnRpY2FsRW5kOyBpICs9IHZlcnRpY2FsU3RlcCkge1xyXG4gICAgICBmb3IgKGxldCBqID0gaG9yaXpvbnRhbFN0YXJ0OyBqICE9PSBob3Jpem9udGFsRW5kOyBqICs9IGhvcml6b250YWxTdGVwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPYnN0cnVjdGVkKGksIGosIG9wdGlvbnMuZXhjbHVkZWRBcmVhKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXRTdHlsZSh3aWRnZXRJZDogc3RyaW5nKToge1xyXG4gICAgZGlzcGxheTogc3RyaW5nO1xyXG4gIH0gfCB7XHJcbiAgICB0b3A6IHN0cmluZztcclxuICAgIGhlaWdodDogc3RyaW5nO1xyXG4gICAgbGVmdDogc3RyaW5nO1xyXG4gICAgd2lkdGg6IHN0cmluZztcclxuICB9IHtcclxuICAgIGNvbnN0IHJlbmRlciA9IHRoaXMucG9zaXRpb25zW3dpZGdldElkXTtcclxuXHJcbiAgICBpZiAoIXJlbmRlcikge1xyXG4gICAgICByZXR1cm4ge2Rpc3BsYXk6ICdub25lJ307XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdG9wOiAoKHJlbmRlci50b3AgLSAxKSAqIHRoaXMuZ3JpZC5jZWxsU2l6ZS5oZWlnaHQpLnRvU3RyaW5nKCkgKyAnJScsXHJcbiAgICAgIGhlaWdodDogKHJlbmRlci5oZWlnaHQgKiB0aGlzLmdyaWQuY2VsbFNpemUuaGVpZ2h0KS50b1N0cmluZygpICsgJyUnLFxyXG4gICAgICBsZWZ0OiAoKHJlbmRlci5sZWZ0IC0gMSkgKiB0aGlzLmdyaWQuY2VsbFNpemUud2lkdGgpLnRvU3RyaW5nKCkgKyAnJScsXHJcbiAgICAgIHdpZHRoOiAocmVuZGVyLndpZHRoICogdGhpcy5ncmlkLmNlbGxTaXplLndpZHRoKS50b1N0cmluZygpICsgJyUnXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0T2JzdHJ1Y3Rpb25WYWx1ZXMoYXJlYTogUmVjdGFuZ2xlLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBmb3IgKGxldCBpID0gYXJlYS50b3AgLSAxOyBpIDwgYXJlYS50b3AgKyBhcmVhLmhlaWdodCAtIDE7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gYXJlYS5sZWZ0IC0gMTsgaiA8IGFyZWEubGVmdCArIGFyZWEud2lkdGggLSAxOyBqKyspIHtcclxuICAgICAgICB0aGlzLm9ic3RydWN0aW9uc1tpICogdGhpcy5ncmlkLmNvbHVtbnMgKyBqXSA9IHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaW5kTGFyZ2VzdEVtcHR5QXJlYSgpOiBSZWN0YW5nbGUge1xyXG4gICAgbGV0IG1heEFyZWE6IFJlY3RhbmdsZSA9IG51bGw7XHJcbiAgICBsZXQgY3Vyck1heEFyZWE6IFJlY3RhbmdsZSA9IG51bGw7XHJcbiAgICBsZXQgbWF4U3VyZmFjZUFyZWEgPSAwO1xyXG4gICAgbGV0IGN1cnJNYXhTdXJmYWNlQXJlYSA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLmdyaWQucm93czsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IHRoaXMuZ3JpZC5jb2x1bW5zOyBqKyspIHtcclxuICAgICAgICBpZiAodGhpcy5faXNPYnN0cnVjdGVkKGksIGopKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJBcmVhTGltaXQgPSAodGhpcy5ncmlkLnJvd3MgLSBpICsgMSkgKiAodGhpcy5ncmlkLmNvbHVtbnMgLSBqICsgMSk7XHJcbiAgICAgICAgaWYgKGN1cnJBcmVhTGltaXQgPCBtYXhTdXJmYWNlQXJlYSkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyTWF4QXJlYSA9IHRoaXMuX2ZpbmRMYXJnZXN0RW1wdHlBcmVhRnJvbShuZXcgQ2VsbChpLCBqKSk7XHJcbiAgICAgICAgY3Vyck1heFN1cmZhY2VBcmVhID0gY3Vyck1heEFyZWEuZ2V0U3VyZmFjZUFyZWEoKTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJNYXhTdXJmYWNlQXJlYSA+IG1heFN1cmZhY2VBcmVhKSB7XHJcbiAgICAgICAgICBtYXhTdXJmYWNlQXJlYSA9IGN1cnJNYXhTdXJmYWNlQXJlYTtcclxuICAgICAgICAgIG1heEFyZWEgPSBjdXJyTWF4QXJlYTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBtYXhBcmVhO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIF9maW5kTGFyZ2VzdEVtcHR5QXJlYUZyb20oc3RhcnQ6IENlbGwpIHtcclxuICAgIGlmICghVXRpbHMuaXNEZWZpbmVkKHRoaXMuZ3JpZCkgfHwgIVV0aWxzLmlzTnVtYmVyKHRoaXMuZ3JpZC5jb2x1bW5zKSB8fCAhVXRpbHMuaXNOdW1iZXIodGhpcy5ncmlkLnJvd3MpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBtYXhBcmVhID0gbnVsbCxcclxuICAgICAgbWF4U3VyZmFjZUFyZWEgPSAwLFxyXG4gICAgICBlbmRDb2x1bW4gPSB0aGlzLmdyaWQuY29sdW1ucztcclxuICAgIGZvciAobGV0IGkgPSBzdGFydC50b3A7IGkgPD0gdGhpcy5ncmlkLnJvd3M7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gc3RhcnQubGVmdDsgaiA8PSBlbmRDb2x1bW47IGorKykge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc09ic3RydWN0ZWQoaSwgaikpIHtcclxuICAgICAgICAgIGVuZENvbHVtbiA9IGogLSAxO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjdXJySGVpZ2h0ID0gKGkgLSBzdGFydC50b3AgKyAxKTtcclxuICAgICAgICBjb25zdCBjdXJyV2lkdGggPSAoaiAtIHN0YXJ0LmxlZnQgKyAxKTtcclxuICAgICAgICBjb25zdCBjdXJyU3VyZmFjZUFyZWEgPSBjdXJySGVpZ2h0ICogY3VycldpZHRoO1xyXG5cclxuICAgICAgICBpZiAoY3VyclN1cmZhY2VBcmVhID4gbWF4U3VyZmFjZUFyZWEpIHtcclxuICAgICAgICAgIG1heFN1cmZhY2VBcmVhID0gY3VyclN1cmZhY2VBcmVhO1xyXG4gICAgICAgICAgbWF4QXJlYSA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHN0YXJ0LnRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogc3RhcnQubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGN1cnJXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBjdXJySGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBtYXhBcmVhO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGdyaWQ6IEdyaWQsIGVtaXRXaWRnZXRQb3NpdGlvblVwZGF0ZWQ/OiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcclxuICAgIGNvbnN0IHdpZGdldHM6IFdpZGdldENvbmZpZ1tdID0gdGhpcy5ncmlkICYmIHRoaXMuZ3JpZC53aWRnZXRzID8gdGhpcy5ncmlkLndpZGdldHMgOiBbXTtcclxuICAgIGNvbnN0IHVucG9zaXRpb25lZFdpZGdldHM6IFdpZGdldENvbmZpZ1tdID0gW107XHJcbiAgICB3aWRnZXRzLmZvckVhY2goKHdpZGdldDogV2lkZ2V0Q29uZmlnKSA9PiB7XHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uOiBSZWN0YW5nbGUgPSB3aWRnZXQucG9zaXRpb247XHJcbiAgICAgIGlmIChwb3NpdGlvbi53aWR0aCAqIHBvc2l0aW9uLmhlaWdodCA9PT0gMCB8fFxyXG4gICAgICAgIHRoaXMuaXNBcmVhT2JzdHJ1Y3RlZChwb3NpdGlvbikpIHtcclxuICAgICAgICB1bnBvc2l0aW9uZWRXaWRnZXRzLnB1c2god2lkZ2V0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNldFdpZGdldFBvc2l0aW9uKHdpZGdldC5pZCwgcG9zaXRpb24sIGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdW5wb3NpdGlvbmVkV2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQ6IFdpZGdldENvbmZpZykgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0UG9zaXRpb24gPSB0aGlzLmdldE5leHRQb3NpdGlvbigpO1xyXG4gICAgICBpZiAobmV4dFBvc2l0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgd2lkZ2V0LnBvc2l0aW9uID0gbmV4dFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuc2V0V2lkZ2V0UG9zaXRpb24od2lkZ2V0LmlkLCBuZXh0UG9zaXRpb24sIGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3aWRnZXQucG9zaXRpb24gPSBuZXcgUmVjdGFuZ2xlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRXaWRnZXRQb3NpdGlvbih3aWRnZXQuaWQsIG5ldyBSZWN0YW5nbGUoKSwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbWl0V2lkZ2V0UG9zaXRpb25VcGRhdGVkKSB7XHJcbiAgICAgICAgZW1pdFdpZGdldFBvc2l0aW9uVXBkYXRlZCh3aWRnZXQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19