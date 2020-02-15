import { Grid } from './Grid.model';
import { Cell } from './Cell.model';
import { Rectangle } from './Rectangle.model';
export declare class GridRenderer {
    positions: {
        [key: string]: Rectangle;
    };
    cachedNextPosition: Rectangle;
    obstructions: string[];
    _grid: Grid;
    constructor(grid: Grid);
    grid: Grid;
    rasterizeCoords(left: number, top: number, gridWidth: number, gridHeight: number): Cell;
    getWidgetIdAt(i: number, j: number): string;
    getWidgetPosition(widgetId: string): Rectangle;
    setWidgetPosition(widgetId: string, newPosition: Rectangle, swappingPositions: boolean): void;
    hasSpaceLeft(): boolean;
    getNextPosition(): Rectangle;
    isObstructed(i: number, j: number, excludedArea?: Rectangle): boolean;
    _isObstructed(i: number, j: number): boolean;
    isAreaObstructed(area: Rectangle, options?: {
        excludedArea?: Rectangle;
        fromBottom?: boolean;
        fromRight?: boolean;
    }): boolean;
    getStyle(widgetId: string): {
        display: string;
    } | {
        top: string;
        height: string;
        left: string;
        width: string;
    };
    setObstructionValues(area: Rectangle, value: string): void;
    findLargestEmptyArea(): Rectangle;
    _findLargestEmptyAreaFrom(start: Cell): any;
    render(grid: Grid, emitWidgetPositionUpdated?: Function): void;
}
