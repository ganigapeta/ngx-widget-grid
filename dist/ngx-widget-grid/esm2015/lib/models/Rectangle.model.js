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
export class Rectangle {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
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
    /**
     * @return {?}
     */
    get bottom() {
        return this.top + this.height - 1;
    }
    /**
     * @return {?}
     */
    get right() {
        return this.left + this.width - 1;
    }
    /**
     * @return {?}
     */
    getSurfaceArea() {
        return this.height * this.width;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdGFuZ2xlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9SZWN0YW5nbGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLE1BQU07Ozs7SUFPSixZQUFZLEdBQWdCO21CQU5mLENBQUM7b0JBQ0EsQ0FBQztxQkFDQSxDQUFDO3NCQUNBLENBQUM7UUFJZixJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztTQUNoQztLQUNGOzs7O1FBRVUsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7Ozs7UUFHekIsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzs7Ozs7SUFHcEMsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ2pDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIElSZWN0YW5nbGUge1xyXG4gIHRvcD86IG51bWJlcjtcclxuICBsZWZ0PzogbnVtYmVyO1xyXG4gIHdpZHRoPzogbnVtYmVyO1xyXG4gIGhlaWdodD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBpbXBsZW1lbnRzIElSZWN0YW5nbGUge1xyXG4gIHB1YmxpYyB0b3AgPSAwO1xyXG4gIHB1YmxpYyBsZWZ0ID0gMDtcclxuICBwdWJsaWMgd2lkdGggPSAwO1xyXG4gIHB1YmxpYyBoZWlnaHQgPSAwO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3Iob2JqPzogSVJlY3RhbmdsZSkge1xyXG4gICAgaWYgKG9iaikge1xyXG4gICAgICB0aGlzLnRvcCA9ICtvYmoudG9wIHx8IDA7XHJcbiAgICAgIHRoaXMubGVmdCA9ICtvYmoubGVmdCB8fCAwO1xyXG4gICAgICB0aGlzLndpZHRoID0gK29iai53aWR0aCB8fCAwO1xyXG4gICAgICB0aGlzLmhlaWdodCA9ICtvYmouaGVpZ2h0IHx8IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGJvdHRvbSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudG9wICsgdGhpcy5oZWlnaHQgLSAxO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCByaWdodCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubGVmdCArIHRoaXMud2lkdGggLSAxO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3VyZmFjZUFyZWEoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmhlaWdodCAqIHRoaXMud2lkdGg7XHJcbiAgfVxyXG59XHJcbiJdfQ==