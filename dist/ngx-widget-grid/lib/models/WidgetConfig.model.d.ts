import { Rectangle } from './Rectangle.model';
export declare class WidgetConfig {
    static widgetCount: number;
    id: string;
    private _position;
    constructor(rect?: Rectangle);
    position: Rectangle;
    generateUID(): string;
}
