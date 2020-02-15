import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { GridRenderer } from '../../models/GridRenderer.model';
import { Rectangle } from '../../models/Rectangle.model';
export declare class NgxGridOverlayComponent {
    private sanitizer;
    activeHighlight: any;
    gridRows: {
        y: SafeStyle;
        height: SafeStyle;
    }[];
    gridCols: {
        x: SafeStyle;
        width: SafeStyle;
    }[];
    _renderer: GridRenderer;
    _highlight?: Rectangle;
    _showGrid: boolean;
    constructor(sanitizer: DomSanitizer);
    renderer: GridRenderer;
    rows: number;
    cols: number;
    highlight: Rectangle;
    showGrid: boolean;
    updateGridLines(renderer: GridRenderer, showGrid: boolean): void;
    clearHighlight(): void;
    clearGridLines(): void;
    highlightArea(area: Rectangle, renderer: GridRenderer): void;
    showGridLines(renderer: GridRenderer): void;
}
