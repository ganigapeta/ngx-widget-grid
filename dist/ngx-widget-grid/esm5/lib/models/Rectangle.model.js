/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function IRectangle() { }
/** @type {?|undefined} */
IRectangle.prototype.top;
/** @type {?|undefined} */
IRectangle.prototype.left;
/** @type {?|undefined} */
IRectangle.prototype.width;
/** @type {?|undefined} */
IRectangle.prototype.height;
var Rectangle = /** @class */ (function () {
    function Rectangle(obj) {
        this.top = 0;
        this.left = 0;
        this.width = 0;
        this.height = 0;
        if (obj) {
            this.top = +obj.top || 0;
            this.left = +obj.left || 0;
            this.width = +obj.width || 0;
            this.height = +obj.height || 0;
        }
    }
    Object.defineProperty(Rectangle.prototype, "bottom", {
        get: /**
         * @return {?}
         */
        function () {
            return this.top + this.height - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "right", {
        get: /**
         * @return {?}
         */
        function () {
            return this.left + this.width - 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Rectangle.prototype.getSurfaceArea = /**
     * @return {?}
     */
    function () {
        return this.height * this.width;
    };
    return Rectangle;
}());
export { Rectangle };
if (false) {
    /** @type {?} */
    Rectangle.prototype.top;
    /** @type {?} */
    Rectangle.prototype.left;
    /** @type {?} */
    Rectangle.prototype.width;
    /** @type {?} */
    Rectangle.prototype.height;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdGFuZ2xlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9SZWN0YW5nbGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLElBQUE7SUFPRSxtQkFBWSxHQUFnQjttQkFOZixDQUFDO29CQUNBLENBQUM7cUJBQ0EsQ0FBQztzQkFDQSxDQUFDO1FBSWYsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7U0FDaEM7S0FDRjswQkFFVSw2QkFBTTs7Ozs7WUFDZixPQUFPLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Ozs7OzBCQUd6Qiw0QkFBSzs7Ozs7WUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Ozs7Ozs7O0lBR3BDLGtDQUFjOzs7SUFBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ2pDO29CQWpDSDtJQWtDQyxDQUFBO0FBM0JELHFCQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSVJlY3RhbmdsZSB7XHJcbiAgdG9wPzogbnVtYmVyO1xyXG4gIGxlZnQ/OiBudW1iZXI7XHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcbiAgaGVpZ2h0PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVjdGFuZ2xlIGltcGxlbWVudHMgSVJlY3RhbmdsZSB7XHJcbiAgcHVibGljIHRvcCA9IDA7XHJcbiAgcHVibGljIGxlZnQgPSAwO1xyXG4gIHB1YmxpYyB3aWR0aCA9IDA7XHJcbiAgcHVibGljIGhlaWdodCA9IDA7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcihvYmo/OiBJUmVjdGFuZ2xlKSB7XHJcbiAgICBpZiAob2JqKSB7XHJcbiAgICAgIHRoaXMudG9wID0gK29iai50b3AgfHwgMDtcclxuICAgICAgdGhpcy5sZWZ0ID0gK29iai5sZWZ0IHx8IDA7XHJcbiAgICAgIHRoaXMud2lkdGggPSArb2JqLndpZHRoIHx8IDA7XHJcbiAgICAgIHRoaXMuaGVpZ2h0ID0gK29iai5oZWlnaHQgfHwgMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgYm90dG9tKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy50b3AgKyB0aGlzLmhlaWdodCAtIDE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHJpZ2h0KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5sZWZ0ICsgdGhpcy53aWR0aCAtIDE7XHJcbiAgfVxyXG5cclxuICBnZXRTdXJmYWNlQXJlYSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aDtcclxuICB9XHJcbn1cclxuIl19