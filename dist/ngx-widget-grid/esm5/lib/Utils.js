/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * @param {?} val
     * @return {?}
     */
    Utils.isNumber = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return typeof val === 'number';
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Utils.isDefined = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return val !== undefined;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Utils.isObject = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return typeof val === 'object';
    };
    return Utils;
}());
export { Utils };
/** @enum {string} */
var RESIZE_DIRECTIONS = {
    topLeft: 'NW',
    top: 'N',
    topRight: 'NE',
    right: 'E',
    bottomRight: 'SE',
    bottom: 'S',
    bottomLeft: 'SW',
    left: 'W',
};
export { RESIZE_DIRECTIONS };
/** @type {?} */
export var ALL_DIRECTIONS = [
    RESIZE_DIRECTIONS.bottom,
    RESIZE_DIRECTIONS.left,
    RESIZE_DIRECTIONS.right,
    RESIZE_DIRECTIONS.top,
    RESIZE_DIRECTIONS.bottomLeft,
    RESIZE_DIRECTIONS.bottomRight,
    RESIZE_DIRECTIONS.topLeft,
    RESIZE_DIRECTIONS.topRight
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2lkZ2V0LWdyaWQvIiwic291cmNlcyI6WyJsaWIvVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUE7Ozs7Ozs7SUFDUyxjQUFROzs7O0lBQWYsVUFBZ0IsR0FBUTtRQUN0QixPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQztLQUNoQzs7Ozs7SUFFTSxlQUFTOzs7O0lBQWhCLFVBQWlCLEdBQVE7UUFDdkIsT0FBTyxHQUFHLEtBQUssU0FBUyxDQUFDO0tBQzFCOzs7OztJQUVNLGNBQVE7Ozs7SUFBZixVQUFnQixHQUFRO1FBQ3RCLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDO0tBQ2hDO2dCQVhIO0lBYUMsQ0FBQTtBQWJELGlCQWFDOzs7SUFHQyxTQUFVLElBQUk7SUFDZCxLQUFNLEdBQUc7SUFDVCxVQUFXLElBQUk7SUFDZixPQUFRLEdBQUc7SUFDWCxhQUFjLElBQUk7SUFDbEIsUUFBUyxHQUFHO0lBQ1osWUFBYSxJQUFJO0lBQ2pCLE1BQU8sR0FBRzs7OztBQUdaLFdBQWEsY0FBYyxHQUF3QjtJQUNqRCxpQkFBaUIsQ0FBQyxNQUFNO0lBQ3hCLGlCQUFpQixDQUFDLElBQUk7SUFDdEIsaUJBQWlCLENBQUMsS0FBSztJQUN2QixpQkFBaUIsQ0FBQyxHQUFHO0lBQ3JCLGlCQUFpQixDQUFDLFVBQVU7SUFDNUIsaUJBQWlCLENBQUMsV0FBVztJQUM3QixpQkFBaUIsQ0FBQyxPQUFPO0lBQ3pCLGlCQUFpQixDQUFDLFFBQVE7Q0FDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcbiAgc3RhdGljIGlzTnVtYmVyKHZhbDogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNEZWZpbmVkKHZhbDogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdmFsICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNPYmplY3QodmFsOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JztcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBSRVNJWkVfRElSRUNUSU9OUyB7XHJcbiAgdG9wTGVmdCA9ICdOVycsXHJcbiAgdG9wID0gJ04nLFxyXG4gIHRvcFJpZ2h0ID0gJ05FJyxcclxuICByaWdodCA9ICdFJyxcclxuICBib3R0b21SaWdodCA9ICdTRScsXHJcbiAgYm90dG9tID0gJ1MnLFxyXG4gIGJvdHRvbUxlZnQgPSAnU1cnLFxyXG4gIGxlZnQgPSAnVydcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEFMTF9ESVJFQ1RJT05TOiBSRVNJWkVfRElSRUNUSU9OU1tdID0gW1xyXG4gIFJFU0laRV9ESVJFQ1RJT05TLmJvdHRvbSxcclxuICBSRVNJWkVfRElSRUNUSU9OUy5sZWZ0LFxyXG4gIFJFU0laRV9ESVJFQ1RJT05TLnJpZ2h0LFxyXG4gIFJFU0laRV9ESVJFQ1RJT05TLnRvcCxcclxuICBSRVNJWkVfRElSRUNUSU9OUy5ib3R0b21MZWZ0LFxyXG4gIFJFU0laRV9ESVJFQ1RJT05TLmJvdHRvbVJpZ2h0LFxyXG4gIFJFU0laRV9ESVJFQ1RJT05TLnRvcExlZnQsXHJcbiAgUkVTSVpFX0RJUkVDVElPTlMudG9wUmlnaHRcclxuXTtcclxuIl19