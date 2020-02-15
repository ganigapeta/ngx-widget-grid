/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Grid } from './Grid.model';
import { Cell } from './Cell.model';
import { Utils } from '../Utils';
import { Rectangle } from './Rectangle.model';
export class GridRenderer {
    /**
     * @param {?} grid
     */
    constructor(grid) {
        this.positions = {};
        this.obstructions = [];
        this.grid = grid || new Grid();
    }
    /**
     * @return {?}
     */
    get grid() {
        return this._grid;
    }
    /**
     * @param {?} grid
     * @return {?}
     */
    set grid(grid) {
        this._grid = grid;
        this.positions = {};
        this.cachedNextPosition = undefined;
        this.obstructions = [];
        for (let i = 0; i < grid.rows * grid.columns; i++) {
            this.obstructions[i] = null;
        }
    }
    /**
     * @param {?} left
     * @param {?} top
     * @param {?} gridWidth
     * @param {?} gridHeight
     * @return {?}
     */
    rasterizeCoords(left, top, gridWidth, gridHeight) {
        left = Math.min(Math.max(left, 0), gridWidth - 1);
        top = Math.min(Math.max(top, 0), gridHeight - 1);
        /** @type {?} */
        const x = Math.floor(top / gridHeight * this.grid.rows) + 1;
        /** @type {?} */
        const y = Math.floor(left / gridWidth * this.grid.columns) + 1;
        return new Cell(x, y);
    }
    /**
     * @param {?} i
     * @param {?} j
     * @return {?}
     */
    getWidgetIdAt(i, j) {
        for (const widgetId in this.positions) {
            if (this.positions.hasOwnProperty(widgetId)) {
                /** @type {?} */
                const position = this.positions[widgetId];
                if (position.top <= i && i <= (position.top + position.height - 1) &&
                    position.left <= j && j <= (position.left + position.width - 1)) {
                    return widgetId;
                }
            }
        }
        return null;
    }
    /**
     * @param {?} widgetId
     * @return {?}
     */
    getWidgetPosition(widgetId) {
        return this.positions[widgetId];
    }
    /**
     * @param {?} widgetId
     * @param {?} newPosition
     * @param {?} swappingPositions
     * @return {?}
     */
    setWidgetPosition(widgetId, newPosition, swappingPositions) {
        /** @type {?} */
        const currPosition = this.positions[widgetId];
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
    }
    /**
     * @return {?}
     */
    hasSpaceLeft() {
        for (const obstruction of this.obstructions) {
            if (obstruction === null) {
                return true;
            }
        }
        return false;
    }
    /**
     * @return {?}
     */
    getNextPosition() {
        if (this.cachedNextPosition !== undefined) {
            return this.cachedNextPosition;
        }
        if (!this.hasSpaceLeft()) {
            return null;
        }
        /** @type {?} */
        const maxPosition = this.findLargestEmptyArea();
        this.cachedNextPosition = maxPosition;
        return maxPosition;
    }
    /**
     * @param {?} i
     * @param {?} j
     * @param {?=} excludedArea
     * @return {?}
     */
    isObstructed(i, j, excludedArea) {
        // obstructed if (i, j) exceeds the grid's regular non-expanding boundaries
        if (i < 1 || j < 1 || j > this.grid.columns || i > this.grid.rows) {
            return true;
        }
        /** @type {?} */
        const bottom = excludedArea && excludedArea.top + excludedArea.height - 1;
        /** @type {?} */
        const right = excludedArea && excludedArea.left + excludedArea.width - 1;
        // pass if (i, j) is within the excluded area, if any
        if (excludedArea &&
            excludedArea.top <= i &&
            i <= bottom &&
            excludedArea.left <= j &&
            j <= right) {
            return false;
        }
        return this._isObstructed(i, j);
    }
    /**
     * @param {?} i
     * @param {?} j
     * @return {?}
     */
    _isObstructed(i, j) {
        return this.obstructions[(i - 1) * this.grid.columns + (j - 1)] !== null;
    }
    /**
     * @param {?} area
     * @param {?=} options
     * @return {?}
     */
    isAreaObstructed(area, options) {
        if (!area) {
            return false;
        }
        options = Utils.isObject(options) ? options : {};
        /** @type {?} */
        const top = area.top;
        /** @type {?} */
        const left = area.left;
        /** @type {?} */
        const bottom = area.bottom || area.top + area.height - 1;
        /** @type {?} */
        const right = area.right || area.left + area.width - 1;
        if (!Utils.isNumber(top) || !Utils.isNumber(left) || !Utils.isNumber(bottom) || !Utils.isNumber(right)) {
            return false;
        }
        /** @type {?} */
        const verticalStart = options.fromBottom ? bottom : top;
        /** @type {?} */
        const verticalStep = options.fromBottom ? -1 : 1;
        /** @type {?} */
        const verticalEnd = (options.fromBottom ? top : bottom) + verticalStep;
        /** @type {?} */
        const horizontalStart = options.fromRight ? right : left;
        /** @type {?} */
        const horizontalStep = options.fromRight ? -1 : 1;
        /** @type {?} */
        const horizontalEnd = (options.fromRight ? left : right) + horizontalStep;
        for (let i = verticalStart; i !== verticalEnd; i += verticalStep) {
            for (let j = horizontalStart; j !== horizontalEnd; j += horizontalStep) {
                if (this.isObstructed(i, j, options.excludedArea)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * @param {?} widgetId
     * @return {?}
     */
    getStyle(widgetId) {
        /** @type {?} */
        const render = this.positions[widgetId];
        if (!render) {
            return { display: 'none' };
        }
        return {
            top: ((render.top - 1) * this.grid.cellSize.height).toString() + '%',
            height: (render.height * this.grid.cellSize.height).toString() + '%',
            left: ((render.left - 1) * this.grid.cellSize.width).toString() + '%',
            width: (render.width * this.grid.cellSize.width).toString() + '%'
        };
    }
    /**
     * @param {?} area
     * @param {?} value
     * @return {?}
     */
    setObstructionValues(area, value) {
        for (let i = area.top - 1; i < area.top + area.height - 1; i++) {
            for (let j = area.left - 1; j < area.left + area.width - 1; j++) {
                this.obstructions[i * this.grid.columns + j] = value;
            }
        }
    }
    /**
     * @return {?}
     */
    findLargestEmptyArea() {
        /** @type {?} */
        let maxArea = null;
        /** @type {?} */
        let currMaxArea = null;
        /** @type {?} */
        let maxSurfaceArea = 0;
        /** @type {?} */
        let currMaxSurfaceArea = 0;
        for (let i = 1; i <= this.grid.rows; i++) {
            for (let j = 1; j <= this.grid.columns; j++) {
                if (this._isObstructed(i, j)) {
                    continue;
                }
                /** @type {?} */
                const currAreaLimit = (this.grid.rows - i + 1) * (this.grid.columns - j + 1);
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
    }
    /**
     * @param {?} start
     * @return {?}
     */
    _findLargestEmptyAreaFrom(start) {
        if (!Utils.isDefined(this.grid) || !Utils.isNumber(this.grid.columns) || !Utils.isNumber(this.grid.rows)) {
            return null;
        }
        /** @type {?} */
        let maxArea = null;
        /** @type {?} */
        let maxSurfaceArea = 0;
        /** @type {?} */
        let endColumn = this.grid.columns;
        for (let i = start.top; i <= this.grid.rows; i++) {
            for (let j = start.left; j <= endColumn; j++) {
                if (this._isObstructed(i, j)) {
                    endColumn = j - 1;
                    continue;
                }
                /** @type {?} */
                const currHeight = (i - start.top + 1);
                /** @type {?} */
                const currWidth = (j - start.left + 1);
                /** @type {?} */
                const currSurfaceArea = currHeight * currWidth;
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
    }
    /**
     * @param {?} grid
     * @param {?=} emitWidgetPositionUpdated
     * @return {?}
     */
    render(grid, emitWidgetPositionUpdated) {
        this.grid = grid;
        /** @type {?} */
        const widgets = this.grid && this.grid.widgets ? this.grid.widgets : [];
        /** @type {?} */
        const unpositionedWidgets = [];
        widgets.forEach((widget) => {
            /** @type {?} */
            const position = widget.position;
            if (position.width * position.height === 0 ||
                this.isAreaObstructed(position)) {
                unpositionedWidgets.push(widget);
            }
            else {
                this.setWidgetPosition(widget.id, position, false);
            }
        });
        unpositionedWidgets.forEach((widget) => {
            /** @type {?} */
            const nextPosition = this.getNextPosition();
            if (nextPosition !== null) {
                widget.position = nextPosition;
                this.setWidgetPosition(widget.id, nextPosition, false);
            }
            else {
                widget.position = new Rectangle();
                this.setWidgetPosition(widget.id, new Rectangle(), false);
            }
            if (emitWidgetPositionUpdated) {
                emitWidgetPositionUpdated(widget);
            }
        });
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZFJlbmRlcmVyLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9HcmlkUmVuZGVyZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUc5QyxNQUFNOzs7O0lBTUosWUFBWSxJQUFVO3lCQUwyQixFQUFFOzRCQUVuQixFQUFFO1FBSWhDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7S0FFaEM7Ozs7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDbkI7Ozs7O0lBRUQsSUFBSSxJQUFJLENBQUMsSUFBVTtRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDN0I7S0FDRjs7Ozs7Ozs7SUFFRCxlQUFlLENBQUMsSUFBWSxFQUFFLEdBQVcsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQzlFLElBQUksR0FB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O2FBQ3BEO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBb0IsRUFBRSxFQUFFOztZQUNuRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDNUMsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFO2dCQUN6QixNQUFNLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3hEO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxTQUFTLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUMzRDtZQUNELElBQUkseUJBQXlCLEVBQUU7Z0JBQzdCLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ25DO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyaWQgfSBmcm9tICcuL0dyaWQubW9kZWwnO1xyXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSAnLi9DZWxsLm1vZGVsJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi9VdGlscyc7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vUmVjdGFuZ2xlLm1vZGVsJztcclxuaW1wb3J0IHsgV2lkZ2V0Q29uZmlnIH0gZnJvbSAnLi9XaWRnZXRDb25maWcubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdyaWRSZW5kZXJlciB7XHJcbiAgcHVibGljIHBvc2l0aW9uczogeyBba2V5OiBzdHJpbmddOiBSZWN0YW5nbGUgfSA9IHt9O1xyXG4gIHB1YmxpYyBjYWNoZWROZXh0UG9zaXRpb246IFJlY3RhbmdsZTtcclxuICBwdWJsaWMgb2JzdHJ1Y3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xyXG4gIHB1YmxpYyBfZ3JpZDogR3JpZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZ3JpZDogR3JpZCkge1xyXG4gICAgdGhpcy5ncmlkID0gZ3JpZCB8fCBuZXcgR3JpZCgpO1xyXG5cclxuICB9XHJcblxyXG4gIGdldCBncmlkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dyaWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgZ3JpZChncmlkOiBHcmlkKSB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIHRoaXMucG9zaXRpb25zID0ge307XHJcbiAgICB0aGlzLmNhY2hlZE5leHRQb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMub2JzdHJ1Y3Rpb25zID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWQucm93cyAqIGdyaWQuY29sdW1uczsgaSsrKSB7XHJcbiAgICAgIHRoaXMub2JzdHJ1Y3Rpb25zW2ldID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJhc3Rlcml6ZUNvb3JkcyhsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBncmlkV2lkdGg6IG51bWJlciwgZ3JpZEhlaWdodDogbnVtYmVyKTogQ2VsbCB7XHJcbiAgICBsZWZ0ID0gTWF0aC5taW4oTWF0aC5tYXgobGVmdCwgMCksIGdyaWRXaWR0aCAtIDEpO1xyXG4gICAgdG9wID0gTWF0aC5taW4oTWF0aC5tYXgodG9wLCAwKSwgZ3JpZEhlaWdodCAtIDEpO1xyXG5cclxuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKHRvcCAvIGdyaWRIZWlnaHQgKiB0aGlzLmdyaWQucm93cykgKyAxO1xyXG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IobGVmdCAvIGdyaWRXaWR0aCAqIHRoaXMuZ3JpZC5jb2x1bW5zKSArIDE7XHJcbiAgICByZXR1cm4gbmV3IENlbGwoeCwgeSk7XHJcbiAgfVxyXG5cclxuICBnZXRXaWRnZXRJZEF0KGk6IG51bWJlciwgajogbnVtYmVyKSB7XHJcbiAgICBmb3IgKGNvbnN0IHdpZGdldElkIGluIHRoaXMucG9zaXRpb25zKSB7XHJcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9ucy5oYXNPd25Qcm9wZXJ0eSh3aWRnZXRJZCkpIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb25zW3dpZGdldElkXTtcclxuXHJcbiAgICAgICAgaWYgKHBvc2l0aW9uLnRvcCA8PSBpICYmIGkgPD0gKHBvc2l0aW9uLnRvcCArIHBvc2l0aW9uLmhlaWdodCAtIDEpICYmXHJcbiAgICAgICAgICBwb3NpdGlvbi5sZWZ0IDw9IGogJiYgaiA8PSAocG9zaXRpb24ubGVmdCArIHBvc2l0aW9uLndpZHRoIC0gMSkpIHtcclxuICAgICAgICAgIHJldHVybiB3aWRnZXRJZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2lkZ2V0UG9zaXRpb24od2lkZ2V0SWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zW3dpZGdldElkXTtcclxuICB9XHJcblxyXG4gIHNldFdpZGdldFBvc2l0aW9uKHdpZGdldElkOiBzdHJpbmcsIG5ld1Bvc2l0aW9uOiBSZWN0YW5nbGUsIHN3YXBwaW5nUG9zaXRpb25zOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBjdXJyUG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uc1t3aWRnZXRJZF07XHJcbiAgICBpZiAoY3VyclBvc2l0aW9uICYmICFzd2FwcGluZ1Bvc2l0aW9ucykge1xyXG4gICAgICB0aGlzLnNldE9ic3RydWN0aW9uVmFsdWVzKGN1cnJQb3NpdGlvbiwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3UG9zaXRpb24gPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogVXRpbHMuaXNOdW1iZXIobmV3UG9zaXRpb24udG9wKSA/IG5ld1Bvc2l0aW9uLnRvcCA6IGN1cnJQb3NpdGlvbi50b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBVdGlscy5pc051bWJlcihuZXdQb3NpdGlvbi5sZWZ0KSA/IG5ld1Bvc2l0aW9uLmxlZnQgOiBjdXJyUG9zaXRpb24ubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBVdGlscy5pc051bWJlcihuZXdQb3NpdGlvbi53aWR0aCkgPyBuZXdQb3NpdGlvbi53aWR0aCA6IGN1cnJQb3NpdGlvbi53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogVXRpbHMuaXNOdW1iZXIobmV3UG9zaXRpb24uaGVpZ2h0KSA/IG5ld1Bvc2l0aW9uLmhlaWdodCA6IGN1cnJQb3NpdGlvbi5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgIHRoaXMucG9zaXRpb25zW3dpZGdldElkXSA9IG5ld1Bvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMuc2V0T2JzdHJ1Y3Rpb25WYWx1ZXModGhpcy5wb3NpdGlvbnNbd2lkZ2V0SWRdLCB3aWRnZXRJZCk7XHJcbiAgICB0aGlzLmNhY2hlZE5leHRQb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGhhc1NwYWNlTGVmdCgpIHtcclxuICAgIGZvciAoY29uc3Qgb2JzdHJ1Y3Rpb24gb2YgdGhpcy5vYnN0cnVjdGlvbnMpIHtcclxuICAgICAgaWYgKG9ic3RydWN0aW9uID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldE5leHRQb3NpdGlvbigpOiBSZWN0YW5nbGUge1xyXG4gICAgaWYgKHRoaXMuY2FjaGVkTmV4dFBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkTmV4dFBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5oYXNTcGFjZUxlZnQoKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXhQb3NpdGlvbjogUmVjdGFuZ2xlID0gdGhpcy5maW5kTGFyZ2VzdEVtcHR5QXJlYSgpO1xyXG4gICAgdGhpcy5jYWNoZWROZXh0UG9zaXRpb24gPSBtYXhQb3NpdGlvbjtcclxuICAgIHJldHVybiBtYXhQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIGlzT2JzdHJ1Y3RlZChpOiBudW1iZXIsIGo6IG51bWJlciwgZXhjbHVkZWRBcmVhPzogUmVjdGFuZ2xlKSB7XHJcbiAgICAvLyBvYnN0cnVjdGVkIGlmIChpLCBqKSBleGNlZWRzIHRoZSBncmlkJ3MgcmVndWxhciBub24tZXhwYW5kaW5nIGJvdW5kYXJpZXNcclxuICAgIGlmIChpIDwgMSB8fCBqIDwgMSB8fCBqID4gdGhpcy5ncmlkLmNvbHVtbnMgfHwgaSA+IHRoaXMuZ3JpZC5yb3dzKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYm90dG9tID0gZXhjbHVkZWRBcmVhICYmIGV4Y2x1ZGVkQXJlYS50b3AgKyBleGNsdWRlZEFyZWEuaGVpZ2h0IC0gMTtcclxuICAgIGNvbnN0IHJpZ2h0ID0gZXhjbHVkZWRBcmVhICYmIGV4Y2x1ZGVkQXJlYS5sZWZ0ICsgZXhjbHVkZWRBcmVhLndpZHRoIC0gMTtcclxuICAgIC8vIHBhc3MgaWYgKGksIGopIGlzIHdpdGhpbiB0aGUgZXhjbHVkZWQgYXJlYSwgaWYgYW55XHJcbiAgICBpZiAoZXhjbHVkZWRBcmVhICYmXHJcbiAgICAgIGV4Y2x1ZGVkQXJlYS50b3AgPD0gaSAmJlxyXG4gICAgICBpIDw9IGJvdHRvbSAmJlxyXG4gICAgICBleGNsdWRlZEFyZWEubGVmdCA8PSBqICYmXHJcbiAgICAgIGogPD0gcmlnaHQpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9pc09ic3RydWN0ZWQoaSwgaik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgX2lzT2JzdHJ1Y3RlZChpOiBudW1iZXIsIGo6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMub2JzdHJ1Y3Rpb25zWyhpIC0gMSkgKiB0aGlzLmdyaWQuY29sdW1ucyArIChqIC0gMSldICE9PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgaXNBcmVhT2JzdHJ1Y3RlZChhcmVhOiBSZWN0YW5nbGUsXHJcbiAgICAgICAgICAgICAgICAgICBvcHRpb25zPzoge1xyXG4gICAgICAgICAgICAgICAgICAgICBleGNsdWRlZEFyZWE/OiBSZWN0YW5nbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgIGZyb21Cb3R0b20/OiBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgICAgICBmcm9tUmlnaHQ/OiBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgICAgfSkge1xyXG4gICAgaWYgKCFhcmVhKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIG9wdGlvbnMgPSBVdGlscy5pc09iamVjdChvcHRpb25zKSA/IG9wdGlvbnMgOiB7fTtcclxuXHJcbiAgICBjb25zdCB0b3AgPSBhcmVhLnRvcDtcclxuICAgIGNvbnN0IGxlZnQgPSBhcmVhLmxlZnQ7XHJcbiAgICBjb25zdCBib3R0b20gPSBhcmVhLmJvdHRvbSB8fCBhcmVhLnRvcCArIGFyZWEuaGVpZ2h0IC0gMTtcclxuICAgIGNvbnN0IHJpZ2h0ID0gYXJlYS5yaWdodCB8fCBhcmVhLmxlZnQgKyBhcmVhLndpZHRoIC0gMTtcclxuXHJcbiAgICBpZiAoIVV0aWxzLmlzTnVtYmVyKHRvcCkgfHwgIVV0aWxzLmlzTnVtYmVyKGxlZnQpIHx8ICFVdGlscy5pc051bWJlcihib3R0b20pIHx8ICFVdGlscy5pc051bWJlcihyaWdodCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZlcnRpY2FsU3RhcnQgPSBvcHRpb25zLmZyb21Cb3R0b20gPyBib3R0b20gOiB0b3A7XHJcbiAgICBjb25zdCB2ZXJ0aWNhbFN0ZXAgPSBvcHRpb25zLmZyb21Cb3R0b20gPyAtMSA6IDE7XHJcbiAgICBjb25zdCB2ZXJ0aWNhbEVuZCA9IChvcHRpb25zLmZyb21Cb3R0b20gPyB0b3AgOiBib3R0b20pICsgdmVydGljYWxTdGVwO1xyXG4gICAgY29uc3QgaG9yaXpvbnRhbFN0YXJ0ID0gb3B0aW9ucy5mcm9tUmlnaHQgPyByaWdodCA6IGxlZnQ7XHJcbiAgICBjb25zdCBob3Jpem9udGFsU3RlcCA9IG9wdGlvbnMuZnJvbVJpZ2h0ID8gLTEgOiAxO1xyXG4gICAgY29uc3QgaG9yaXpvbnRhbEVuZCA9IChvcHRpb25zLmZyb21SaWdodCA/IGxlZnQgOiByaWdodCkgKyBob3Jpem9udGFsU3RlcDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gdmVydGljYWxTdGFydDsgaSAhPT0gdmVydGljYWxFbmQ7IGkgKz0gdmVydGljYWxTdGVwKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSBob3Jpem9udGFsU3RhcnQ7IGogIT09IGhvcml6b250YWxFbmQ7IGogKz0gaG9yaXpvbnRhbFN0ZXApIHtcclxuICAgICAgICBpZiAodGhpcy5pc09ic3RydWN0ZWQoaSwgaiwgb3B0aW9ucy5leGNsdWRlZEFyZWEpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldFN0eWxlKHdpZGdldElkOiBzdHJpbmcpOiB7XHJcbiAgICBkaXNwbGF5OiBzdHJpbmc7XHJcbiAgfSB8IHtcclxuICAgIHRvcDogc3RyaW5nO1xyXG4gICAgaGVpZ2h0OiBzdHJpbmc7XHJcbiAgICBsZWZ0OiBzdHJpbmc7XHJcbiAgICB3aWR0aDogc3RyaW5nO1xyXG4gIH0ge1xyXG4gICAgY29uc3QgcmVuZGVyID0gdGhpcy5wb3NpdGlvbnNbd2lkZ2V0SWRdO1xyXG5cclxuICAgIGlmICghcmVuZGVyKSB7XHJcbiAgICAgIHJldHVybiB7ZGlzcGxheTogJ25vbmUnfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0b3A6ICgocmVuZGVyLnRvcCAtIDEpICogdGhpcy5ncmlkLmNlbGxTaXplLmhlaWdodCkudG9TdHJpbmcoKSArICclJyxcclxuICAgICAgaGVpZ2h0OiAocmVuZGVyLmhlaWdodCAqIHRoaXMuZ3JpZC5jZWxsU2l6ZS5oZWlnaHQpLnRvU3RyaW5nKCkgKyAnJScsXHJcbiAgICAgIGxlZnQ6ICgocmVuZGVyLmxlZnQgLSAxKSAqIHRoaXMuZ3JpZC5jZWxsU2l6ZS53aWR0aCkudG9TdHJpbmcoKSArICclJyxcclxuICAgICAgd2lkdGg6IChyZW5kZXIud2lkdGggKiB0aGlzLmdyaWQuY2VsbFNpemUud2lkdGgpLnRvU3RyaW5nKCkgKyAnJSdcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzZXRPYnN0cnVjdGlvblZhbHVlcyhhcmVhOiBSZWN0YW5nbGUsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGZvciAobGV0IGkgPSBhcmVhLnRvcCAtIDE7IGkgPCBhcmVhLnRvcCArIGFyZWEuaGVpZ2h0IC0gMTsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSBhcmVhLmxlZnQgLSAxOyBqIDwgYXJlYS5sZWZ0ICsgYXJlYS53aWR0aCAtIDE7IGorKykge1xyXG4gICAgICAgIHRoaXMub2JzdHJ1Y3Rpb25zW2kgKiB0aGlzLmdyaWQuY29sdW1ucyArIGpdID0gdmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRMYXJnZXN0RW1wdHlBcmVhKCk6IFJlY3RhbmdsZSB7XHJcbiAgICBsZXQgbWF4QXJlYTogUmVjdGFuZ2xlID0gbnVsbDtcclxuICAgIGxldCBjdXJyTWF4QXJlYTogUmVjdGFuZ2xlID0gbnVsbDtcclxuICAgIGxldCBtYXhTdXJmYWNlQXJlYSA9IDA7XHJcbiAgICBsZXQgY3Vyck1heFN1cmZhY2VBcmVhID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRoaXMuZ3JpZC5yb3dzOyBpKyspIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gdGhpcy5ncmlkLmNvbHVtbnM7IGorKykge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc09ic3RydWN0ZWQoaSwgaikpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3VyckFyZWFMaW1pdCA9ICh0aGlzLmdyaWQucm93cyAtIGkgKyAxKSAqICh0aGlzLmdyaWQuY29sdW1ucyAtIGogKyAxKTtcclxuICAgICAgICBpZiAoY3VyckFyZWFMaW1pdCA8IG1heFN1cmZhY2VBcmVhKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1cnJNYXhBcmVhID0gdGhpcy5fZmluZExhcmdlc3RFbXB0eUFyZWFGcm9tKG5ldyBDZWxsKGksIGopKTtcclxuICAgICAgICBjdXJyTWF4U3VyZmFjZUFyZWEgPSBjdXJyTWF4QXJlYS5nZXRTdXJmYWNlQXJlYSgpO1xyXG5cclxuICAgICAgICBpZiAoY3Vyck1heFN1cmZhY2VBcmVhID4gbWF4U3VyZmFjZUFyZWEpIHtcclxuICAgICAgICAgIG1heFN1cmZhY2VBcmVhID0gY3Vyck1heFN1cmZhY2VBcmVhO1xyXG4gICAgICAgICAgbWF4QXJlYSA9IGN1cnJNYXhBcmVhO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1heEFyZWE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgX2ZpbmRMYXJnZXN0RW1wdHlBcmVhRnJvbShzdGFydDogQ2VsbCkge1xyXG4gICAgaWYgKCFVdGlscy5pc0RlZmluZWQodGhpcy5ncmlkKSB8fCAhVXRpbHMuaXNOdW1iZXIodGhpcy5ncmlkLmNvbHVtbnMpIHx8ICFVdGlscy5pc051bWJlcih0aGlzLmdyaWQucm93cykpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1heEFyZWEgPSBudWxsLFxyXG4gICAgICBtYXhTdXJmYWNlQXJlYSA9IDAsXHJcbiAgICAgIGVuZENvbHVtbiA9IHRoaXMuZ3JpZC5jb2x1bW5zO1xyXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0LnRvcDsgaSA8PSB0aGlzLmdyaWQucm93czsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSBzdGFydC5sZWZ0OyBqIDw9IGVuZENvbHVtbjsgaisrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzT2JzdHJ1Y3RlZChpLCBqKSkge1xyXG4gICAgICAgICAgZW5kQ29sdW1uID0gaiAtIDE7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJIZWlnaHQgPSAoaSAtIHN0YXJ0LnRvcCArIDEpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJXaWR0aCA9IChqIC0gc3RhcnQubGVmdCArIDEpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJTdXJmYWNlQXJlYSA9IGN1cnJIZWlnaHQgKiBjdXJyV2lkdGg7XHJcblxyXG4gICAgICAgIGlmIChjdXJyU3VyZmFjZUFyZWEgPiBtYXhTdXJmYWNlQXJlYSkge1xyXG4gICAgICAgICAgbWF4U3VyZmFjZUFyZWEgPSBjdXJyU3VyZmFjZUFyZWE7XHJcbiAgICAgICAgICBtYXhBcmVhID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogc3RhcnQudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBzdGFydC5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogY3VycldpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGN1cnJIZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1heEFyZWE7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoZ3JpZDogR3JpZCwgZW1pdFdpZGdldFBvc2l0aW9uVXBkYXRlZD86IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLmdyaWQgPSBncmlkO1xyXG4gICAgY29uc3Qgd2lkZ2V0czogV2lkZ2V0Q29uZmlnW10gPSB0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLndpZGdldHMgPyB0aGlzLmdyaWQud2lkZ2V0cyA6IFtdO1xyXG4gICAgY29uc3QgdW5wb3NpdGlvbmVkV2lkZ2V0czogV2lkZ2V0Q29uZmlnW10gPSBbXTtcclxuICAgIHdpZGdldHMuZm9yRWFjaCgod2lkZ2V0OiBXaWRnZXRDb25maWcpID0+IHtcclxuICAgICAgY29uc3QgcG9zaXRpb246IFJlY3RhbmdsZSA9IHdpZGdldC5wb3NpdGlvbjtcclxuICAgICAgaWYgKHBvc2l0aW9uLndpZHRoICogcG9zaXRpb24uaGVpZ2h0ID09PSAwIHx8XHJcbiAgICAgICAgdGhpcy5pc0FyZWFPYnN0cnVjdGVkKHBvc2l0aW9uKSkge1xyXG4gICAgICAgIHVucG9zaXRpb25lZFdpZGdldHMucHVzaCh3aWRnZXQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2V0V2lkZ2V0UG9zaXRpb24od2lkZ2V0LmlkLCBwb3NpdGlvbiwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB1bnBvc2l0aW9uZWRXaWRnZXRzLmZvckVhY2goKHdpZGdldDogV2lkZ2V0Q29uZmlnKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHRQb3NpdGlvbiA9IHRoaXMuZ2V0TmV4dFBvc2l0aW9uKCk7XHJcbiAgICAgIGlmIChuZXh0UG9zaXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICB3aWRnZXQucG9zaXRpb24gPSBuZXh0UG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5zZXRXaWRnZXRQb3NpdGlvbih3aWRnZXQuaWQsIG5leHRQb3NpdGlvbiwgZmFsc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdpZGdldC5wb3NpdGlvbiA9IG5ldyBSZWN0YW5nbGUoKTtcclxuICAgICAgICB0aGlzLnNldFdpZGdldFBvc2l0aW9uKHdpZGdldC5pZCwgbmV3IFJlY3RhbmdsZSgpLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVtaXRXaWRnZXRQb3NpdGlvblVwZGF0ZWQpIHtcclxuICAgICAgICBlbWl0V2lkZ2V0UG9zaXRpb25VcGRhdGVkKHdpZGdldCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=