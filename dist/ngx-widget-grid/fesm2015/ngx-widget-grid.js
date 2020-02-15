import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ChangeDetectorRef, ContentChildren, Renderer2, Directive, forwardRef, HostListener, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CellSize {
    /**
     * @param {?} rowCount
     * @param {?} columnCount
     */
    constructor(rowCount, columnCount) {
        this._height = 0;
        this._width = 0;
        this._height = rowCount ? 100 / rowCount : 0;
        this._width = columnCount ? 100 / columnCount : 0;
    }
    ;
    /**
     * @return {?}
     */
    get height() {
        return this._height;
    }
    /**
     * @return {?}
     */
    get width() {
        return this._width;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Grid {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Rectangle {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        this.top = 0;
        this.left = 0;
        this.width = 0;
        this.height = 0;
        if (obj) {
            this.top = +obj.top || 0;
            this.left = +obj.left || 0;
            this.width = +obj.width || 0;
            this.height = +obj.height || 0;
        }
    }
    /**
     * @return {?}
     */
    get bottom() {
        return this.top + this.height - 1;
    }
    /**
     * @return {?}
     */
    get right() {
        return this.left + this.width - 1;
    }
    /**
     * @return {?}
     */
    getSurfaceArea() {
        return this.height * this.width;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WidgetConfig {
    /**
     * @param {?=} rect
     */
    constructor(rect) {
        this._position = new Rectangle();
        this.id = this.generateUID();
        if (rect) {
            this.position = rect;
        }
    }
    /**
     * @return {?}
     */
    get position() {
        return this._position;
    }
    /**
     * @param {?} gridArea
     * @return {?}
     */
    set position(gridArea) {
        this._position.top = +gridArea.top ? +gridArea.top : 0;
        this._position.left = +gridArea.left ? +gridArea.left : 0;
        this._position.width = +gridArea.width ? +gridArea.width : 0;
        this._position.height = +gridArea.height ? +gridArea.height : 0;
    }
    /**
     * @return {?}
     */
    generateUID() {
        return 'ngxDashboardWidget-' + ++WidgetConfig.widgetCount;
    }
}
WidgetConfig.widgetCount = 0;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Utils {
    /**
     * @param {?} val
     * @return {?}
     */
    static isNumber(val) {
        return typeof val === 'number';
    }
    /**
     * @param {?} val
     * @return {?}
     */
    static isDefined(val) {
        return val !== undefined;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    static isObject(val) {
        return typeof val === 'object';
    }
}
/** @enum {string} */
const RESIZE_DIRECTIONS = {
    topLeft: 'NW',
    top: 'N',
    topRight: 'NE',
    right: 'E',
    bottomRight: 'SE',
    bottom: 'S',
    bottomLeft: 'SW',
    left: 'W',
};
/** @type {?} */
const ALL_DIRECTIONS = [
    RESIZE_DIRECTIONS.bottom,
    RESIZE_DIRECTIONS.left,
    RESIZE_DIRECTIONS.right,
    RESIZE_DIRECTIONS.top,
    RESIZE_DIRECTIONS.bottomLeft,
    RESIZE_DIRECTIONS.bottomRight,
    RESIZE_DIRECTIONS.topLeft,
    RESIZE_DIRECTIONS.topRight
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxWidgetComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Cell {
    /**
     * @param {?} top
     * @param {?} left
     */
    constructor(top, left) {
        this._top = top;
        this._left = left;
    }
    /**
     * @return {?}
     */
    get top() {
        return this._top;
    }
    /**
     * @return {?}
     */
    get left() {
        return this._left;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GridRenderer {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxWidgetGridComponent {
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
        }
        else {
            if (!gridHasSpaceLeft) {
                this.gridFull.emit(true);
                this.gridAlreadyFull = true;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxGridOverlayComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PathIterator {
    /**
     * @param {?} start
     * @param {?} end
     */
    constructor(start, end) {
        this._currPos = null;
        this._nextPos = null;
        if (!start) {
            console.error('Start not present for Path Iterator');
            return;
        }
        if (!end) {
            console.error('End not present for Path Iterator');
            return;
        }
        this._start = start;
        this._heightDelta = end.top - start.top;
        this._widthDelta = end.left - start.left;
        this._steps = Math.max(Math.abs(this._heightDelta), Math.abs(this._widthDelta));
        this._currStep = 0;
        this._currPos = null;
        this._nextPos = new Cell(start.top, start.left);
    }
    /**
     * @return {?}
     */
    next() {
        this._currPos = this._nextPos;
        if (this._currStep < this._steps) {
            this._currStep++;
            /** @type {?} */
            const currTopDelta = Math.round((this._currStep / this._steps) * this._heightDelta);
            /** @type {?} */
            const currLeftDelta = Math.round((this._currStep / this._steps) * this._widthDelta);
            this._nextPos = new Cell(this._start.top + currTopDelta, this._start.left + currLeftDelta);
        }
        else {
            this._nextPos = null;
        }
        return this._currPos;
    }
    /**
     * @return {?}
     */
    hasNext() {
        return this._nextPos !== null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxWidgetMoverDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} gridCmp
     * @param {?} widgetCmp
     */
    constructor(el, renderer, gridCmp, widgetCmp) {
        this.el = el;
        this.renderer = renderer;
        this.gridCmp = gridCmp;
        this.widgetCmp = widgetCmp;
        this.enableDrag = null;
        this._onMoveListener = this.onMove.bind(this);
        this._onUpListener = this.onUp.bind(this);
        this.ngxWidgetMover = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDown(event) {
        event.preventDefault();
        this.renderer.addClass(this.widgetCmp.getEl().nativeElement, 'wg-moving');
        /** @type {?} */
        const widgetContainer = this.widgetCmp.getEl().nativeElement;
        this.startPosition = this.gridCmp.getWidgetPosition(this.widgetCmp);
        this.startRender = {
            top: widgetContainer.offsetTop,
            left: widgetContainer.offsetLeft,
            height: widgetContainer.clientHeight,
            width: widgetContainer.clientWidth
        };
        /** @type {?} */
        const eventOffsetX = event.offsetX || event.layerX;
        /** @type {?} */
        const eventOffsetY = event.offsetY || event.layerY;
        this.desiredPosition = { top: this.startRender.top, left: this.startRender.left };
        this.moverOffset = new Rectangle({
            top: eventOffsetY + this.el.nativeElement.offsetTop || 0,
            left: eventOffsetX + this.el.nativeElement.offsetLeft || 0
        });
        this.gridPositions = this.gridCmp.getGridRectangle();
        this.cellHeight = (this.gridCmp.grid.cellSize.height / 100) * this.gridPositions.height;
        this.cellWidth = (this.gridCmp.grid.cellSize.width / 100) * this.gridPositions.width;
        this.enableDrag = this.widgetCmp.getConfig().id;
        this.renderer.setStyle(this.widgetCmp.getEl().nativeElement, 'z-index', this.ngxWidgetMover ? 0 : 100);
        if (typeof PointerEvent !== 'undefined') {
            window.addEventListener('pointermove', this._onMoveListener);
            window.addEventListener('pointerup', this._onUpListener);
        }
        else {
            window.addEventListener('mousemove', this._onMoveListener);
            window.addEventListener('mouseup', this._onUpListener);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMove(event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            /** @type {?} */
            const eventClientX = event.clientX;
            /** @type {?} */
            const eventClientY = event.clientY;
            /** @type {?} */
            const startRender = this.startRender;
            /** @type {?} */
            const gridDimensions = this.gridPositions;
            /** @type {?} */
            const desiredPosition = this.desiredPosition;
            /** @type {?} */
            const dragPositionX = Math.round(eventClientX) - gridDimensions.left;
            /** @type {?} */
            const dragPositionY = Math.round(eventClientY) - gridDimensions.top;
            desiredPosition.top = Math.min(Math.max(dragPositionY - this.moverOffset.top, 0), gridDimensions.height - startRender.height - 1);
            desiredPosition.left = Math.min(Math.max(dragPositionX - this.moverOffset.left, 0), gridDimensions.width - startRender.width - 1);
            /** @type {?} */
            const currentFinalPos = this.determineFinalPos(this.startPosition, desiredPosition, this.startRender, this.cellHeight, this.cellWidth);
            this.gridCmp.highlightArea(currentFinalPos);
            this.renderer.setStyle(this.widgetCmp.getEl().nativeElement, 'top', desiredPosition.top + 'px');
            this.renderer.setStyle(this.widgetCmp.getEl().nativeElement, 'left', desiredPosition.left + 'px');
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onUp(event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            /** @type {?} */
            const eventClientX = event.clientX;
            /** @type {?} */
            const eventClientY = event.clientY;
            /** @type {?} */
            const startRender = this.startRender;
            /** @type {?} */
            const gridDimensions = this.gridPositions;
            /** @type {?} */
            const desiredPosition = this.desiredPosition;
            /** @type {?} */
            const dragPositionX = Math.round(eventClientX) - gridDimensions.left;
            /** @type {?} */
            const dragPositionY = Math.round(eventClientY) - gridDimensions.top;
            desiredPosition.top = Math.min(Math.max(dragPositionY - this.moverOffset.top, 0), gridDimensions.height - startRender.height - 1);
            desiredPosition.left = Math.min(Math.max(dragPositionX - this.moverOffset.left, 0), gridDimensions.width - startRender.width - 1);
            /** @type {?} */
            const anchorTop = this.getAnchor(Math.max(dragPositionY, 0), this.cellHeight, 1);
            /** @type {?} */
            const anchorLeft = this.getAnchor(Math.max(dragPositionX, 0), this.cellWidth, 1);
            /** @type {?} */
            const dropPosition = this.gridCmp.rasterizeCoords(anchorLeft, anchorTop);
            /** @type {?} */
            const obstructingWidgetId = this.gridCmp.areaObstructor(dropPosition);
            /** @type {?} */
            let finalPos;
            if (obstructingWidgetId && this.ngxWidgetMover) {
                /** @type {?} */
                const obstructingWidgetCmp = this.gridCmp.getWidgetById(obstructingWidgetId);
                /** @type {?} */
                const obstructingWidgetPosition = this.gridCmp.getWidgetPositionByWidgetId(obstructingWidgetId);
                /** @type {?} */
                const draggedWidgetPosition = this.widgetCmp.position;
                this.widgetCmp.position = obstructingWidgetPosition;
                this.gridCmp.updateWidget(this.widgetCmp, true);
                obstructingWidgetCmp.position = draggedWidgetPosition;
                this.gridCmp.updateWidget(obstructingWidgetCmp, true);
            }
            else {
                finalPos = this.determineFinalPos(this.startPosition, desiredPosition, this.startRender, this.cellHeight, this.cellWidth);
                this.widgetCmp.position = finalPos;
                this.gridCmp.updateWidget(this.widgetCmp, false);
            }
            this.gridCmp.resetHighlights();
            this.renderer.removeClass(this.widgetCmp.getEl().nativeElement, 'wg-moving');
            this.renderer.removeStyle(this.widgetCmp.getEl().nativeElement, 'z-index');
            this.enableDrag = null;
        }
        if (typeof PointerEvent !== 'undefined') {
            window.removeEventListener('pointermove', this._onMoveListener);
            window.removeEventListener('pointerup', this._onUpListener);
        }
        else {
            window.removeEventListener('mousemove', this._onMoveListener);
            window.removeEventListener('mouseup', this._onUpListener);
        }
    }
    /**
     * @param {?} val
     * @param {?} cellWOrH
     * @param {?=} marginFactor
     * @return {?}
     */
    getAnchor(val, cellWOrH, marginFactor = 2) {
        return (val % cellWOrH) > (cellWOrH / marginFactor) ? val + Math.floor(cellWOrH) : val;
    }
    /**
     * @param {?} startPos
     * @param {?} desiredPos
     * @param {?} startRender
     * @param {?} cellHt
     * @param {?} cellWd
     * @return {?}
     */
    determineFinalPos(startPos, desiredPos, startRender, cellHt, cellWd) {
        if (startRender.top === desiredPos.top && startRender.left === desiredPos.left) {
            return startPos;
        }
        /** @type {?} */
        const anchorTop = this.getAnchor(desiredPos.top, cellHt);
        /** @type {?} */
        const anchorLeft = this.getAnchor(desiredPos.left, cellWd);
        /** @type {?} */
        const movedDown = anchorTop >= startRender.top;
        /** @type {?} */
        const movedRight = anchorLeft >= startRender.left;
        /** @type {?} */
        const desiredFinalPosition = this.gridCmp.rasterizeCoords(anchorLeft, anchorTop);
        /** @type {?} */
        const path = new PathIterator(desiredFinalPosition, startPos);
        while (path && path.hasNext()) {
            /** @type {?} */
            const currPos = path.next();
            /** @type {?} */
            const targetArea = new Rectangle({
                top: currPos.top,
                left: currPos.left,
                height: startPos.height,
                width: startPos.width
            });
            /** @type {?} */
            const options = {
                excludedArea: startPos,
                fromBottom: movedDown,
                fromRight: movedRight
            };
            // If widget swap is enabled and area is obstructed, show original position
            if (this.ngxWidgetMover && this.gridCmp.isAreaObstructed(targetArea, options)) {
                return new Rectangle(startPos);
            }
            if (!this.gridCmp.isAreaObstructed(targetArea, options)) {
                /** @type {?} */
                const height = targetArea.height;
                /** @type {?} */
                const width = targetArea.width;
                if (desiredFinalPosition.top < targetArea.top) {
                    while (desiredFinalPosition.top <= (targetArea.top - 1)) {
                        /** @type {?} */
                        const checkRect = new Rectangle({ top: targetArea.top - 1, left: targetArea.left, height, width });
                        /** @type {?} */
                        const isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
                        if (isRectVacant) {
                            targetArea.top--;
                        }
                        else {
                            break;
                        }
                    }
                }
                else if (desiredFinalPosition.top > targetArea.top) {
                    while (desiredFinalPosition.top >= (targetArea.top + 1)) {
                        /** @type {?} */
                        const checkRect = new Rectangle({ top: targetArea.top + 1, left: targetArea.left, height, width });
                        /** @type {?} */
                        const isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
                        if (isRectVacant) {
                            targetArea.top++;
                        }
                        else {
                            break;
                        }
                    }
                }
                if (desiredFinalPosition.left < targetArea.left) {
                    while (desiredFinalPosition.left <= (targetArea.left - 1)) {
                        /** @type {?} */
                        const checkRect = new Rectangle({ top: targetArea.top, left: targetArea.left - 1, height, width });
                        /** @type {?} */
                        const isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
                        if (isRectVacant) {
                            targetArea.left--;
                        }
                        else {
                            break;
                        }
                    }
                }
                else if (desiredFinalPosition.left > targetArea.left) {
                    while (desiredFinalPosition.left >= (targetArea.left + 1)) {
                        /** @type {?} */
                        const checkRect = new Rectangle({ top: targetArea.top, left: targetArea.left + 1, height, width });
                        /** @type {?} */
                        const isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
                        if (isRectVacant) {
                            targetArea.left++;
                        }
                        else {
                            break;
                        }
                    }
                }
                return new Rectangle(targetArea);
            }
        }
        return new Rectangle(startPos);
    }
}
NgxWidgetMoverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxWidgetMover]'
            },] }
];
/** @nocollapse */
NgxWidgetMoverDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgxWidgetGridComponent, decorators: [{ type: Inject, args: [forwardRef(() => NgxWidgetGridComponent),] }] },
    { type: NgxWidgetComponent, decorators: [{ type: Inject, args: [forwardRef(() => NgxWidgetComponent),] }] }
];
NgxWidgetMoverDirective.propDecorators = {
    ngxWidgetMover: [{ type: Input }],
    onDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }, { type: HostListener, args: ['pointerdown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const MIN_HEIGHT = 42;
/** @type {?} */
const MIN_WIDTH = 42;
class NgxWidgetResizerDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} gridCmp
     * @param {?} widgetCmp
     */
    constructor(el, renderer, gridCmp, widgetCmp) {
        this.el = el;
        this.renderer = renderer;
        this.gridCmp = gridCmp;
        this.widgetCmp = widgetCmp;
        this.moveUpAllowed = false;
        this.moveDownAllowed = false;
        this.moveLeftAllowed = false;
        this.moveRightAllowed = false;
        this.enableDrag = null;
        this._onMoveListener = this.onMove.bind(this);
        this._onUpListener = this.onUp.bind(this);
        this.parentContainer = this.el.nativeElement.parentElement;
    }
    /**
     * @return {?}
     */
    get resizeDirection() {
        return this._resizeDirection;
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    set ngxWidgetResizer(dir) {
        this._resizeDirection = dir;
        this.moveUpAllowed = false;
        this.moveDownAllowed = false;
        this.moveLeftAllowed = false;
        this.moveRightAllowed = false;
        switch (dir) {
            case RESIZE_DIRECTIONS.top:
                this.moveUpAllowed = true;
                break;
            case RESIZE_DIRECTIONS.left:
                this.moveLeftAllowed = true;
                break;
            case RESIZE_DIRECTIONS.bottom:
                this.moveDownAllowed = true;
                break;
            case RESIZE_DIRECTIONS.right:
                this.moveRightAllowed = true;
                break;
            case RESIZE_DIRECTIONS.topLeft:
                this.moveUpAllowed = true;
                this.moveLeftAllowed = true;
                break;
            case RESIZE_DIRECTIONS.topRight:
                this.moveUpAllowed = true;
                this.moveRightAllowed = true;
                break;
            case RESIZE_DIRECTIONS.bottomLeft:
                this.moveDownAllowed = true;
                this.moveLeftAllowed = true;
                break;
            case RESIZE_DIRECTIONS.bottomRight:
                this.moveDownAllowed = true;
                this.moveRightAllowed = true;
                break;
            default:
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDown(event) {
        event.preventDefault();
        this.enableDrag = this.widgetCmp.getConfig().id;
        this.renderer.addClass(this.widgetCmp.getEl().nativeElement, 'wg-resizing');
        this.renderer.addClass(this.el.nativeElement, 'dragging');
        this.startPosition = this.gridCmp.getWidgetPosition(this.widgetCmp);
        this.startRender = {
            top: Math.ceil(this.widgetCmp.getEl().nativeElement.offsetTop),
            left: Math.ceil(this.widgetCmp.getEl().nativeElement.offsetLeft),
            height: Math.floor(this.parentContainer.offsetHeight),
            width: Math.floor(this.parentContainer.offsetWidth)
        }; // pixel values
        this.startRender.bottom = this.startRender.top + this.startRender.height;
        this.startRender.right = this.startRender.left + this.startRender.width;
        /** @type {?} */
        const eventOffsetX = event.offsetX || event.layerX;
        /** @type {?} */
        const eventOffsetY = event.offsetY || event.layerY;
        this.delta = { top: 0, right: 0, bottom: 0, left: 0 };
        this.draggerOffset = {
            top: eventOffsetY,
            left: eventOffsetX,
            bottom: eventOffsetY - this.el.nativeElement.offsetHeight,
            right: eventOffsetX - this.el.nativeElement.offsetWidth
        };
        this.gridPositions = this.gridCmp.getGridRectangle();
        if (typeof PointerEvent !== 'undefined') {
            window.addEventListener('pointermove', this._onMoveListener);
            window.addEventListener('pointerup', this._onUpListener);
        }
        else {
            window.addEventListener('mousemove', this._onMoveListener);
            window.addEventListener('mouseup', this._onUpListener);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMove(event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            /** @type {?} */
            const eventClientX = event.clientX;
            /** @type {?} */
            const eventClientY = event.clientY;
            /** @type {?} */
            const gridDims = this.gridPositions;
            /** @type {?} */
            const startRender = this.startRender;
            /** @type {?} */
            const dragPositionX = Math.round(eventClientX) - gridDims.left;
            /** @type {?} */
            const dragPositionY = Math.round(eventClientY) - gridDims.top;
            /** @type {?} */
            const delta = this.delta;
            if (this.moveUpAllowed) {
                delta.top = Math.min(Math.max(dragPositionY - this.draggerOffset.top, 0), gridDims.height) - startRender.top;
                delta.top = Math.min(delta.top, startRender.height - MIN_HEIGHT);
            }
            else if (this.moveDownAllowed) {
                delta.bottom = startRender.bottom - Math.min(Math.max(dragPositionY - this.draggerOffset.bottom, 0), gridDims.height);
                delta.bottom = Math.min(delta.bottom, startRender.height - MIN_HEIGHT);
            }
            if (this.moveLeftAllowed) {
                delta.left = Math.min(Math.max(dragPositionX - this.draggerOffset.left, 0), gridDims.width) - startRender.left;
                delta.left = Math.min(delta.left, startRender.width - MIN_WIDTH);
            }
            else if (this.moveRightAllowed) {
                delta.right = startRender.right - Math.min(Math.max(dragPositionX - this.draggerOffset.right, 0), gridDims.width);
                delta.right = Math.min(delta.right, startRender.width - MIN_WIDTH);
            }
            /** @type {?} */
            const currentFinalPos = this.determineFinalPos();
            this.gridCmp.highlightArea(currentFinalPos);
            this.renderer.setStyle(this.parentContainer, 'top', this.delta.top + 'px');
            this.renderer.setStyle(this.parentContainer, 'left', this.delta.left + 'px');
            this.renderer.setStyle(this.parentContainer, 'bottom', this.delta.bottom + 'px');
            this.renderer.setStyle(this.parentContainer, 'right', this.delta.right + 'px');
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onUp(event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            this.el.nativeElement.setAttribute('draggable', false);
            this.renderer.removeClass(this.el.nativeElement, 'dragging');
            this.renderer.removeClass(this.widgetCmp.getEl().nativeElement, 'wg-resizing');
            this.enableDrag = null;
            this.widgetCmp.position = this.determineFinalPos();
            this.gridCmp.updateWidget(this.widgetCmp, false);
            this.gridCmp.resetHighlights();
            // reset style
            this.renderer.removeClass(this.widgetCmp.getEl().nativeElement, 'wg-resizing');
            this.renderer.removeClass(this.el.nativeElement, 'dragging');
            this.renderer.setStyle(this.parentContainer, 'top', '');
            this.renderer.setStyle(this.parentContainer, 'left', '');
            this.renderer.setStyle(this.parentContainer, 'bottom', '');
            this.renderer.setStyle(this.parentContainer, 'right', '');
        }
        if (typeof PointerEvent !== 'undefined') {
            window.removeEventListener('pointermove', this._onMoveListener);
            window.removeEventListener('pointerup', this._onUpListener);
        }
        else {
            window.removeEventListener('mousemove', this._onMoveListener);
            window.removeEventListener('mouseup', this._onUpListener);
        }
    }
    /**
     * @param {?} start
     * @param {?} end
     * @param {?} val
     * @param {?=} reverse
     * @return {?}
     */
    findCollision(start, end, val, reverse = false) {
        /** @type {?} */
        let foundCollision = false;
        for (let i = start; i <= end; i++) {
            /** @type {?} */
            const checker = reverse ? this.gridCmp.isPointObstructed(i, val) : this.gridCmp.isPointObstructed(val, i);
            if (checker) {
                foundCollision = true;
                break;
            }
        }
        return foundCollision;
    }
    /**
     * @return {?}
     */
    determineFinalPos() {
        /** @type {?} */
        const finalPos = new Rectangle();
        /** @type {?} */
        const startRender = this.startRender;
        /** @type {?} */
        const delta = this.delta;
        /** @type {?} */
        const requestedStartPoint = this.gridCmp.rasterizeCoords(startRender.left + delta.left + 1, startRender.top + delta.top + 1);
        /** @type {?} */
        const requestedEndPoint = this.gridCmp.rasterizeCoords(startRender.right - delta.right - 1, startRender.bottom - delta.bottom - 1);
        /** @type {?} */
        const requestedPos = {
            top: requestedStartPoint.top,
            left: requestedStartPoint.left,
            right: requestedEndPoint.left,
            bottom: requestedEndPoint.top
        };
        /** @type {?} */
        let foundCollision;
        /** @type {?} */
        const start = Math.max(this.startPosition.left, requestedPos.left);
        /** @type {?} */
        const end = Math.min(this.startPosition.right, requestedPos.right);
        if (this.moveUpAllowed && requestedPos.top < this.startPosition.top) {
            finalPos.top = this.startPosition.top;
            while (finalPos.top > requestedPos.top) {
                // check whether adding another row above would cause any conflict
                foundCollision = this.findCollision(start, end, finalPos.top - 1);
                if (foundCollision) {
                    break;
                }
                finalPos.top--; // add row above
            }
        }
        else if (this.moveDownAllowed && requestedPos.bottom > this.startPosition.bottom) {
            finalPos.top = finalPos.top || requestedPos.top;
            finalPos.height = this.startPosition.bottom + 1 - this.startPosition.top;
            while (finalPos.bottom < requestedPos.bottom) {
                // check whether adding another row below would cause any conflict
                foundCollision = this.findCollision(start, end, finalPos.bottom + 1);
                if (foundCollision) {
                    break;
                }
                finalPos.height++; // add row below
            }
        }
        finalPos.top = finalPos.top || requestedPos.top;
        finalPos.height = finalPos.height || requestedPos.bottom + 1 - finalPos.top;
        if (this.moveLeftAllowed && requestedPos.left < this.startPosition.left) {
            finalPos.left = this.startPosition.left;
            while (finalPos.left > requestedPos.left) {
                // check whether adding another column would cause any conflict
                foundCollision = this.findCollision(finalPos.top, finalPos.bottom, finalPos.left - 1, true);
                if (foundCollision) {
                    break;
                }
                finalPos.left--; // add column
            }
        }
        else if (this.moveRightAllowed && requestedPos.right > this.startPosition.right) {
            finalPos.left = finalPos.left || requestedPos.left;
            finalPos.width = this.startPosition.right + 1 - this.startPosition.left;
            while (finalPos.right < requestedPos.right) {
                foundCollision = this.findCollision(finalPos.top, finalPos.bottom, finalPos.right + 1, true);
                if (foundCollision) {
                    break;
                }
                finalPos.width++;
            }
        }
        finalPos.left = finalPos.left || requestedPos.left;
        finalPos.width = finalPos.width || requestedPos.right + 1 - finalPos.left;
        return finalPos;
    }
}
NgxWidgetResizerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxWidgetResizer]'
            },] }
];
/** @nocollapse */
NgxWidgetResizerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgxWidgetGridComponent, decorators: [{ type: Inject, args: [forwardRef(() => NgxWidgetGridComponent),] }] },
    { type: NgxWidgetComponent, decorators: [{ type: Inject, args: [forwardRef(() => NgxWidgetComponent),] }] }
];
NgxWidgetResizerDirective.propDecorators = {
    ngxWidgetResizer: [{ type: Input }],
    onDown: [{ type: HostListener, args: ['pointerdown', ['$event'],] }, { type: HostListener, args: ['mousedown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxWidgetGridModule {
}
NgxWidgetGridModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    NgxGridOverlayComponent,
                    NgxWidgetComponent,
                    NgxWidgetGridComponent,
                    NgxWidgetMoverDirective,
                    NgxWidgetResizerDirective
                ],
                exports: [
                    NgxWidgetComponent,
                    NgxWidgetGridComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxWidgetGridComponent, NgxGridOverlayComponent, NgxWidgetComponent, Cell, CellSize, Grid, GridRenderer, PathIterator, Rectangle, WidgetConfig, NgxWidgetGridModule, NgxWidgetMoverDirective as ɵa, NgxWidgetResizerDirective as ɵb };

//# sourceMappingURL=ngx-widget-grid.js.map