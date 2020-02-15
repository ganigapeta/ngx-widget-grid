import { Cell } from './Cell.model';
import { Rectangle } from './Rectangle.model';
export declare class PathIterator {
    private _start;
    private _heightDelta;
    private _widthDelta;
    private _steps;
    private _currStep;
    private _currPos;
    private _nextPos;
    constructor(start: Rectangle, end: Rectangle);
    next(): Cell;
    hasNext(): boolean;
}
