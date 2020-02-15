import { ElementRef, EventEmitter } from '@angular/core';
import { WidgetConfig } from '../../models/WidgetConfig.model';
import { Rectangle } from '../../models/Rectangle.model';
import { RESIZE_DIRECTIONS } from '../../Utils';
export declare class NgxWidgetComponent {
    private elRef;
    swapOnMove: boolean;
    positionChange: EventEmitter<Rectangle>;
    movable: boolean;
    allDirections: typeof RESIZE_DIRECTIONS;
    isTopResizable: boolean;
    isRightResizable: boolean;
    isBottomResizable: boolean;
    isLeftResizable: boolean;
    isTopRightResizable: boolean;
    isTopLeftResizable: boolean;
    isBottomRightResizable: boolean;
    isBottomLeftResizable: boolean;
    widgetConfig: WidgetConfig;
    _position: Rectangle;
    _resizable: boolean;
    _resizeDirections: RESIZE_DIRECTIONS[];
    constructor(elRef: ElementRef);
    position: Rectangle;
    resizable: boolean;
    resizeDirections: RESIZE_DIRECTIONS[];
    setResizeDirections(): void;
    getConfig(): WidgetConfig;
    getEl(): ElementRef;
}
