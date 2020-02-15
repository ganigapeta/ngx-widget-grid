/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Cell } from './Cell.model';
var PathIterator = /** @class */ (function () {
    function PathIterator(start, end) {
        this._currPos = null;
        this._nextPos = null;
        if (!start) {
            console.error('Start not present for Path Iterator');
            return;
        }
        if (!end) {
            console.error('End not present for Path Iterator');
            return;
        }
        this._start = start;
        this._heightDelta = end.top - start.top;
        this._widthDelta = end.left - start.left;
        this._steps = Math.max(Math.abs(this._heightDelta), Math.abs(this._widthDelta));
        this._currStep = 0;
        this._currPos = null;
        this._nextPos = new Cell(start.top, start.left);
    }
    /**
     * @return {?}
     */
    PathIterator.prototype.next = /**
     * @return {?}
     */
    function () {
        this._currPos = this._nextPos;
        if (this._currStep < this._steps) {
            this._currStep++;
            /** @type {?} */
            var currTopDelta = Math.round((this._currStep / this._steps) * this._heightDelta);
            /** @type {?} */
            var currLeftDelta = Math.round((this._currStep / this._steps) * this._widthDelta);
            this._nextPos = new Cell(this._start.top + currTopDelta, this._start.left + currLeftDelta);
        }
        else {
            this._nextPos = null;
        }
        return this._currPos;
    };
    /**
     * @return {?}
     */
    PathIterator.prototype.hasNext = /**
     * @return {?}
     */
    function () {
        return this._nextPos !== null;
    };
    return PathIterator;
}());
export { PathIterator };
if (false) {
    /** @type {?} */
    PathIterator.prototype._start;
    /** @type {?} */
    PathIterator.prototype._heightDelta;
    /** @type {?} */
    PathIterator.prototype._widthDelta;
    /** @type {?} */
    PathIterator.prototype._steps;
    /** @type {?} */
    PathIterator.prototype._currStep;
    /** @type {?} */
    PathIterator.prototype._currPos;
    /** @type {?} */
    PathIterator.prototype._nextPos;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF0aEl0ZXJhdG9yLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9QYXRoSXRlcmF0b3IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHcEMsSUFBQTtJQVNFLHNCQUFZLEtBQWdCLEVBQUUsR0FBYzt3QkFIbkIsSUFBSTt3QkFDSixJQUFJO1FBRzNCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFDckQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNuRCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pEOzs7O0lBRU0sMkJBQUk7Ozs7UUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFOUIsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztZQUNqQixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztZQUNwRixJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDO1NBQzVGO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN0QjtRQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7SUFHaEIsOEJBQU87Ozs7UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDOzt1QkE5Q2xDO0lBZ0RDLENBQUE7QUE3Q0Qsd0JBNkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2VsbCB9IGZyb20gJy4vQ2VsbC5tb2RlbCc7XHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vUmVjdGFuZ2xlLm1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXRoSXRlcmF0b3Ige1xyXG4gIHByaXZhdGUgX3N0YXJ0OiBSZWN0YW5nbGU7XHJcbiAgcHJpdmF0ZSBfaGVpZ2h0RGVsdGE6IG51bWJlcjtcclxuICBwcml2YXRlIF93aWR0aERlbHRhOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfc3RlcHM6IG51bWJlcjtcclxuICBwcml2YXRlIF9jdXJyU3RlcDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2N1cnJQb3M6IENlbGwgPSBudWxsO1xyXG4gIHByaXZhdGUgX25leHRQb3M6IENlbGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihzdGFydDogUmVjdGFuZ2xlLCBlbmQ6IFJlY3RhbmdsZSkge1xyXG4gICAgaWYgKCFzdGFydCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdTdGFydCBub3QgcHJlc2VudCBmb3IgUGF0aCBJdGVyYXRvcicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIWVuZCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFbmQgbm90IHByZXNlbnQgZm9yIFBhdGggSXRlcmF0b3InKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc3RhcnQgPSBzdGFydDtcclxuICAgIHRoaXMuX2hlaWdodERlbHRhID0gZW5kLnRvcCAtIHN0YXJ0LnRvcDtcclxuICAgIHRoaXMuX3dpZHRoRGVsdGEgPSBlbmQubGVmdCAtIHN0YXJ0LmxlZnQ7XHJcbiAgICB0aGlzLl9zdGVwcyA9IE1hdGgubWF4KE1hdGguYWJzKHRoaXMuX2hlaWdodERlbHRhKSwgTWF0aC5hYnModGhpcy5fd2lkdGhEZWx0YSkpO1xyXG4gICAgdGhpcy5fY3VyclN0ZXAgPSAwO1xyXG4gICAgdGhpcy5fY3VyclBvcyA9IG51bGw7XHJcbiAgICB0aGlzLl9uZXh0UG9zID0gbmV3IENlbGwoc3RhcnQudG9wLCBzdGFydC5sZWZ0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZXh0KCk6IENlbGwge1xyXG4gICAgdGhpcy5fY3VyclBvcyA9IHRoaXMuX25leHRQb3M7XHJcblxyXG4gICAgaWYgKHRoaXMuX2N1cnJTdGVwIDwgdGhpcy5fc3RlcHMpIHtcclxuICAgICAgdGhpcy5fY3VyclN0ZXArKztcclxuICAgICAgY29uc3QgY3VyclRvcERlbHRhID0gTWF0aC5yb3VuZCgodGhpcy5fY3VyclN0ZXAgLyB0aGlzLl9zdGVwcykgKiB0aGlzLl9oZWlnaHREZWx0YSk7XHJcbiAgICAgIGNvbnN0IGN1cnJMZWZ0RGVsdGEgPSBNYXRoLnJvdW5kKCh0aGlzLl9jdXJyU3RlcCAvIHRoaXMuX3N0ZXBzKSAqIHRoaXMuX3dpZHRoRGVsdGEpO1xyXG4gICAgICB0aGlzLl9uZXh0UG9zID0gbmV3IENlbGwodGhpcy5fc3RhcnQudG9wICsgY3VyclRvcERlbHRhLCB0aGlzLl9zdGFydC5sZWZ0ICsgY3VyckxlZnREZWx0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9uZXh0UG9zID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY3VyclBvcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNOZXh0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX25leHRQb3MgIT09IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==