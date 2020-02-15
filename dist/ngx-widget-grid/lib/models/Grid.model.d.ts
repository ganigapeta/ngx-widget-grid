import { CellSize } from './CellSize.model';
import { WidgetConfig } from './WidgetConfig.model';
export declare class Grid {
    private _widgets;
    private _rows;
    private _columns;
    private _cellSize;
    constructor(rows?: number, columns?: number);
    readonly widgets: WidgetConfig[];
    readonly rows: number;
    readonly columns: number;
    readonly cellSize: CellSize;
    add(widget: WidgetConfig): void;
    remove(widget: WidgetConfig): void;
    removeAll(): void;
    hasWidget(widget: WidgetConfig): boolean;
    resize(rows: number, columns: number): void;
}
