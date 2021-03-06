import { ElementRef, Renderer2 } from '@angular/core';
import { NgxWidgetGridComponent } from '../components/grid/grid.component';
import { Rectangle } from '../models/Rectangle.model';
import { NgxWidgetComponent } from '../components/widget/widget.component';
export interface RectanglePixels {
    top: number;
    left: number;
    height: number;
    width: number;
}
export declare class NgxWidgetMoverDirective {
    private el;
    private renderer;
    private gridCmp;
    private widgetCmp;
    cellHeight: number;
    cellWidth: number;
    startRender: RectanglePixels;
    gridPositions: Rectangle;
    moverOffset: Rectangle;
    desiredPosition: any;
    startPosition: Rectangle;
    enableDrag: string;
    private _onMoveListener;
    private _onUpListener;
    ngxWidgetMover: boolean;
    constructor(el: ElementRef, renderer: Renderer2, gridCmp: NgxWidgetGridComponent, widgetCmp: NgxWidgetComponent);
    onDown(event: MouseEvent): void;
    onMove(event: MouseEvent): void;
    onUp(event: MouseEvent): void;
    getAnchor(val: number, cellWOrH: number, marginFactor?: number): number;
    determineFinalPos(startPos: Rectangle, desiredPos: Rectangle, startRender: RectanglePixels, cellHt: number, cellWd: number): Rectangle;
}
