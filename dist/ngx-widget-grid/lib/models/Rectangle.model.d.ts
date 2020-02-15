export interface IRectangle {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
}
export declare class Rectangle implements IRectangle {
    top: number;
    left: number;
    width: number;
    height: number;
    constructor(obj?: IRectangle);
    readonly bottom: number;
    readonly right: number;
    getSurfaceArea(): number;
}
