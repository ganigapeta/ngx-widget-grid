export declare class Utils {
    static isNumber(val: any): boolean;
    static isDefined(val: any): boolean;
    static isObject(val: any): boolean;
}
export declare enum RESIZE_DIRECTIONS {
    topLeft = "NW",
    top = "N",
    topRight = "NE",
    right = "E",
    bottomRight = "SE",
    bottom = "S",
    bottomLeft = "SW",
    left = "W"
}
export declare const ALL_DIRECTIONS: RESIZE_DIRECTIONS[];
