import { ElementRef, Renderer2 } from '@angular/core';
import { NgxWidgetGridComponent } from '../components/grid/grid.component';
import { NgxWidgetComponent } from '../components/widget/widget.component';
import { Rectangle } from '../models/Rectangle.model';
export declare class NgxWidgetResizerDirective {
    private el;
    private renderer;
    private gridCmp;
    private widgetCmp;
    moveUpAllowed: boolean;
    moveDownAllowed: boolean;
    moveLeftAllowed: boolean;
    moveRightAllowed: boolean;
    parentContainer: any;
    startRender: any;
    gridPositions: Rectangle;
    delta: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    draggerOffset: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    startPosition: Rectangle;
    enableDrag: string;
    _resizeDirection: string;
    private _onMoveListener;
    private _onUpListener;
    constructor(el: ElementRef, renderer: Renderer2, gridCmp: NgxWidgetGridComponent, widgetCmp: NgxWidgetComponent);
    readonly resizeDirection: string;
    ngxWidgetResizer: string;
    onDown(event: MouseEvent): void;
    onMove(event: MouseEvent): void;
    onUp(event: MouseEvent): void;
    findCollision(start: number, end: number, val: number, reverse?: boolean): boolean;
    determineFinalPos(): any;
}
