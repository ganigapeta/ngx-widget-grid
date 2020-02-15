import { __values } from 'tslib';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ChangeDetectorRef, ContentChildren, Renderer2, Directive, forwardRef, HostListener, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CellSize = /** @class */ (function () {
    function CellSize(rowCount, columnCount) {
        this._height = 0;
        this._width = 0;
        this._height = rowCount ? 100 / rowCount : 0;
        this._width = columnCount ? 100 / columnCount : 0;
    }
    Object.defineProperty(CellSize.prototype, "height", {
        get: /**
         * @return {?}
         */
        function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellSize.prototype, "width", {
        get: /**
         * @return {?}
         */
        function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    return CellSize;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Rectangle = /** @class */ (function () {
    function Rectangle(obj) {
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
    Object.defineProperty(Rectangle.prototype, "bottom", {
        get: /**
         * @return {?}
         */
        function () {
            return this.top + this.height - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "right", {
        get: /**
         * @return {?}
         */
        function () {
            return this.left + this.width - 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Rectangle.prototype.getSurfaceArea = /**
     * @return {?}
     */
    function () {
        return this.height * this.width;
    };
    return Rectangle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WidgetConfig = /** @class */ (function () {
    function WidgetConfig(rect) {
        this._position = new Rectangle();
        this.id = this.generateUID();
        if (rect) {
            this.position = rect;
        }
    }
    Object.defineProperty(WidgetConfig.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            return this._position;
        },
        set: /**
         * @param {?} gridArea
         * @return {?}
         */
        function (gridArea) {
            this._position.top = +gridArea.top ? +gridArea.top : 0;
            this._position.left = +gridArea.left ? +gridArea.left : 0;
            this._position.width = +gridArea.width ? +gridArea.width : 0;
            this._position.height = +gridArea.height ? +gridArea.height : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WidgetConfig.prototype.generateUID = /**
     * @return {?}
     */
    function () {
        return 'ngxDashboardWidget-' + ++WidgetConfig.widgetCount;
    };
    WidgetConfig.widgetCount = 0;
    return WidgetConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * @param {?} val
     * @return {?}
     */
    Utils.isNumber = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return typeof val === 'number';
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Utils.isDefined = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return val !== undefined;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Utils.isObject = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return typeof val === 'object';
    };
    return Utils;
}());
/** @enum {string} */
var RESIZE_DIRECTIONS = {
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
var ALL_DIRECTIONS = [
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Cell = /** @class */ (function () {
    function Cell(top, left) {
        this._top = top;
        this._left = left;
    }
    Object.defineProperty(Cell.prototype, "top", {
        get: /**
         * @return {?}
         */
        function () {
            return this._top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "left", {
        get: /**
         * @return {?}
         */
        function () {
            return this._left;
        },
        enumerable: true,
        configurable: true
    });
    return Cell;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
            for (var _b = __values(this.obstructions), _c = _b.next(); !_c.done; _c = _b.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        }
        else {
            if (!gridHasSpaceLeft) {
                this.gridFull.emit(true);
                this.gridAlreadyFull = true;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PathIterator = /** @class */ (function () {
    function PathIterator(start, end) {
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
    PathIterator.prototype.next = /**
     * @return {?}
     */
    function () {
        this._currPos = this._nextPos;
        if (this._currStep < this._steps) {
            this._currStep++;
            /** @type {?} */
            var currTopDelta = Math.round((this._currStep / this._steps) * this._heightDelta);
            /** @type {?} */
            var currLeftDelta = Math.round((this._currStep / this._steps) * this._widthDelta);
            this._nextPos = new Cell(this._start.top + currTopDelta, this._start.left + currLeftDelta);
        }
        else {
            this._nextPos = null;
        }
        return this._currPos;
    };
    /**
     * @return {?}
     */
    PathIterator.prototype.hasNext = /**
     * @return {?}
     */
    function () {
        return this._nextPos !== null;
    };
    return PathIterator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxWidgetMoverDirective = /** @class */ (function () {
    function NgxWidgetMoverDirective(el, renderer, gridCmp, widgetCmp) {
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
    NgxWidgetMoverDirective.prototype.onDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.renderer.addClass(this.widgetCmp.getEl().nativeElement, 'wg-moving');
        /** @type {?} */
        var widgetContainer = this.widgetCmp.getEl().nativeElement;
        this.startPosition = this.gridCmp.getWidgetPosition(this.widgetCmp);
        this.startRender = {
            top: widgetContainer.offsetTop,
            left: widgetContainer.offsetLeft,
            height: widgetContainer.clientHeight,
            width: widgetContainer.clientWidth
        };
        /** @type {?} */
        var eventOffsetX = event.offsetX || event.layerX;
        /** @type {?} */
        var eventOffsetY = event.offsetY || event.layerY;
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxWidgetMoverDirective.prototype.onMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            /** @type {?} */
            var eventClientX = event.clientX;
            /** @type {?} */
            var eventClientY = event.clientY;
            /** @type {?} */
            var startRender = this.startRender;
            /** @type {?} */
            var gridDimensions = this.gridPositions;
            /** @type {?} */
            var desiredPosition = this.desiredPosition;
            /** @type {?} */
            var dragPositionX = Math.round(eventClientX) - gridDimensions.left;
            /** @type {?} */
            var dragPositionY = Math.round(eventClientY) - gridDimensions.top;
            desiredPosition.top = Math.min(Math.max(dragPositionY - this.moverOffset.top, 0), gridDimensions.height - startRender.height - 1);
            desiredPosition.left = Math.min(Math.max(dragPositionX - this.moverOffset.left, 0), gridDimensions.width - startRender.width - 1);
            /** @type {?} */
            var currentFinalPos = this.determineFinalPos(this.startPosition, desiredPosition, this.startRender, this.cellHeight, this.cellWidth);
            this.gridCmp.highlightArea(currentFinalPos);
            this.renderer.setStyle(this.widgetCmp.getEl().nativeElement, 'top', desiredPosition.top + 'px');
            this.renderer.setStyle(this.widgetCmp.getEl().nativeElement, 'left', desiredPosition.left + 'px');
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxWidgetMoverDirective.prototype.onUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            /** @type {?} */
            var eventClientX = event.clientX;
            /** @type {?} */
            var eventClientY = event.clientY;
            /** @type {?} */
            var startRender = this.startRender;
            /** @type {?} */
            var gridDimensions = this.gridPositions;
            /** @type {?} */
            var desiredPosition = this.desiredPosition;
            /** @type {?} */
            var dragPositionX = Math.round(eventClientX) - gridDimensions.left;
            /** @type {?} */
            var dragPositionY = Math.round(eventClientY) - gridDimensions.top;
            desiredPosition.top = Math.min(Math.max(dragPositionY - this.moverOffset.top, 0), gridDimensions.height - startRender.height - 1);
            desiredPosition.left = Math.min(Math.max(dragPositionX - this.moverOffset.left, 0), gridDimensions.width - startRender.width - 1);
            /** @type {?} */
            var anchorTop = this.getAnchor(Math.max(dragPositionY, 0), this.cellHeight, 1);
            /** @type {?} */
            var anchorLeft = this.getAnchor(Math.max(dragPositionX, 0), this.cellWidth, 1);
            /** @type {?} */
            var dropPosition = this.gridCmp.rasterizeCoords(anchorLeft, anchorTop);
            /** @type {?} */
            var obstructingWidgetId = this.gridCmp.areaObstructor(dropPosition);
            /** @type {?} */
            var finalPos = void 0;
            if (obstructingWidgetId && this.ngxWidgetMover) {
                /** @type {?} */
                var obstructingWidgetCmp = this.gridCmp.getWidgetById(obstructingWidgetId);
                /** @type {?} */
                var obstructingWidgetPosition = this.gridCmp.getWidgetPositionByWidgetId(obstructingWidgetId);
                /** @type {?} */
                var draggedWidgetPosition = this.widgetCmp.position;
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
    };
    /**
     * @param {?} val
     * @param {?} cellWOrH
     * @param {?=} marginFactor
     * @return {?}
     */
    NgxWidgetMoverDirective.prototype.getAnchor = /**
     * @param {?} val
     * @param {?} cellWOrH
     * @param {?=} marginFactor
     * @return {?}
     */
    function (val, cellWOrH, marginFactor) {
        if (marginFactor === void 0) { marginFactor = 2; }
        return (val % cellWOrH) > (cellWOrH / marginFactor) ? val + Math.floor(cellWOrH) : val;
    };
    /**
     * @param {?} startPos
     * @param {?} desiredPos
     * @param {?} startRender
     * @param {?} cellHt
     * @param {?} cellWd
     * @return {?}
     */
    NgxWidgetMoverDirective.prototype.determineFinalPos = /**
     * @param {?} startPos
     * @param {?} desiredPos
     * @param {?} startRender
     * @param {?} cellHt
     * @param {?} cellWd
     * @return {?}
     */
    function (startPos, desiredPos, startRender, cellHt, cellWd) {
        if (startRender.top === desiredPos.top && startRender.left === desiredPos.left) {
            return startPos;
        }
        /** @type {?} */
        var anchorTop = this.getAnchor(desiredPos.top, cellHt);
        /** @type {?} */
        var anchorLeft = this.getAnchor(desiredPos.left, cellWd);
        /** @type {?} */
        var movedDown = anchorTop >= startRender.top;
        /** @type {?} */
        var movedRight = anchorLeft >= startRender.left;
        /** @type {?} */
        var desiredFinalPosition = this.gridCmp.rasterizeCoords(anchorLeft, anchorTop);
        /** @type {?} */
        var path = new PathIterator(desiredFinalPosition, startPos);
        while (path && path.hasNext()) {
            /** @type {?} */
            var currPos = path.next();
            /** @type {?} */
            var targetArea = new Rectangle({
                top: currPos.top,
                left: currPos.left,
                height: startPos.height,
                width: startPos.width
            });
            /** @type {?} */
            var options = {
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
                var height = targetArea.height;
                /** @type {?} */
                var width = targetArea.width;
                if (desiredFinalPosition.top < targetArea.top) {
                    while (desiredFinalPosition.top <= (targetArea.top - 1)) {
                        /** @type {?} */
                        var checkRect = new Rectangle({ top: targetArea.top - 1, left: targetArea.left, height: height, width: width });
                        /** @type {?} */
                        var isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
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
                        var checkRect = new Rectangle({ top: targetArea.top + 1, left: targetArea.left, height: height, width: width });
                        /** @type {?} */
                        var isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
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
                        var checkRect = new Rectangle({ top: targetArea.top, left: targetArea.left - 1, height: height, width: width });
                        /** @type {?} */
                        var isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
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
                        var checkRect = new Rectangle({ top: targetArea.top, left: targetArea.left + 1, height: height, width: width });
                        /** @type {?} */
                        var isRectVacant = !this.gridCmp.isAreaObstructed(checkRect, options);
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
    };
    NgxWidgetMoverDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngxWidgetMover]'
                },] }
    ];
    /** @nocollapse */
    NgxWidgetMoverDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgxWidgetGridComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return NgxWidgetGridComponent; }),] }] },
        { type: NgxWidgetComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return NgxWidgetComponent; }),] }] }
    ]; };
    NgxWidgetMoverDirective.propDecorators = {
        ngxWidgetMover: [{ type: Input }],
        onDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }, { type: HostListener, args: ['pointerdown', ['$event'],] }]
    };
    return NgxWidgetMoverDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var MIN_HEIGHT = 42;
/** @type {?} */
var MIN_WIDTH = 42;
var NgxWidgetResizerDirective = /** @class */ (function () {
    function NgxWidgetResizerDirective(el, renderer, gridCmp, widgetCmp) {
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
    Object.defineProperty(NgxWidgetResizerDirective.prototype, "resizeDirection", {
        get: /**
         * @return {?}
         */
        function () {
            return this._resizeDirection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxWidgetResizerDirective.prototype, "ngxWidgetResizer", {
        set: /**
         * @param {?} dir
         * @return {?}
         */
        function (dir) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NgxWidgetResizerDirective.prototype.onDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
        var eventOffsetX = event.offsetX || event.layerX;
        /** @type {?} */
        var eventOffsetY = event.offsetY || event.layerY;
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxWidgetResizerDirective.prototype.onMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.enableDrag === this.widgetCmp.getConfig().id) {
            event.preventDefault();
            /** @type {?} */
            var eventClientX = event.clientX;
            /** @type {?} */
            var eventClientY = event.clientY;
            /** @type {?} */
            var gridDims = this.gridPositions;
            /** @type {?} */
            var startRender = this.startRender;
            /** @type {?} */
            var dragPositionX = Math.round(eventClientX) - gridDims.left;
            /** @type {?} */
            var dragPositionY = Math.round(eventClientY) - gridDims.top;
            /** @type {?} */
            var delta = this.delta;
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
            var currentFinalPos = this.determineFinalPos();
            this.gridCmp.highlightArea(currentFinalPos);
            this.renderer.setStyle(this.parentContainer, 'top', this.delta.top + 'px');
            this.renderer.setStyle(this.parentContainer, 'left', this.delta.left + 'px');
            this.renderer.setStyle(this.parentContainer, 'bottom', this.delta.bottom + 'px');
            this.renderer.setStyle(this.parentContainer, 'right', this.delta.right + 'px');
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxWidgetResizerDirective.prototype.onUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @param {?} start
     * @param {?} end
     * @param {?} val
     * @param {?=} reverse
     * @return {?}
     */
    NgxWidgetResizerDirective.prototype.findCollision = /**
     * @param {?} start
     * @param {?} end
     * @param {?} val
     * @param {?=} reverse
     * @return {?}
     */
    function (start, end, val, reverse) {
        if (reverse === void 0) { reverse = false; }
        /** @type {?} */
        var foundCollision = false;
        for (var i = start; i <= end; i++) {
            /** @type {?} */
            var checker = reverse ? this.gridCmp.isPointObstructed(i, val) : this.gridCmp.isPointObstructed(val, i);
            if (checker) {
                foundCollision = true;
                break;
            }
        }
        return foundCollision;
    };
    /**
     * @return {?}
     */
    NgxWidgetResizerDirective.prototype.determineFinalPos = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var finalPos = new Rectangle();
        /** @type {?} */
        var startRender = this.startRender;
        /** @type {?} */
        var delta = this.delta;
        /** @type {?} */
        var requestedStartPoint = this.gridCmp.rasterizeCoords(startRender.left + delta.left + 1, startRender.top + delta.top + 1);
        /** @type {?} */
        var requestedEndPoint = this.gridCmp.rasterizeCoords(startRender.right - delta.right - 1, startRender.bottom - delta.bottom - 1);
        /** @type {?} */
        var requestedPos = {
            top: requestedStartPoint.top,
            left: requestedStartPoint.left,
            right: requestedEndPoint.left,
            bottom: requestedEndPoint.top
        };
        /** @type {?} */
        var foundCollision;
        /** @type {?} */
        var start = Math.max(this.startPosition.left, requestedPos.left);
        /** @type {?} */
        var end = Math.min(this.startPosition.right, requestedPos.right);
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
    };
    NgxWidgetResizerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngxWidgetResizer]'
                },] }
    ];
    /** @nocollapse */
    NgxWidgetResizerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgxWidgetGridComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return NgxWidgetGridComponent; }),] }] },
        { type: NgxWidgetComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return NgxWidgetComponent; }),] }] }
    ]; };
    NgxWidgetResizerDirective.propDecorators = {
        ngxWidgetResizer: [{ type: Input }],
        onDown: [{ type: HostListener, args: ['pointerdown', ['$event'],] }, { type: HostListener, args: ['mousedown', ['$event'],] }]
    };
    return NgxWidgetResizerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxWidgetGridModule = /** @class */ (function () {
    function NgxWidgetGridModule() {
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
    return NgxWidgetGridModule;
}());

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