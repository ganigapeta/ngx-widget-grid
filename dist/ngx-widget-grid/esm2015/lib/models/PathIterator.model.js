/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Cell } from './Cell.model';
export class PathIterator {
    /**
     * @param {?} start
     * @param {?} end
     */
    constructor(start, end) {
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
    next() {
        this._currPos = this._nextPos;
        if (this._currStep < this._steps) {
            this._currStep++;
            /** @type {?} */
            const currTopDelta = Math.round((this._currStep / this._steps) * this._heightDelta);
            /** @type {?} */
            const currLeftDelta = Math.round((this._currStep / this._steps) * this._widthDelta);
            this._nextPos = new Cell(this._start.top + currTopDelta, this._start.left + currLeftDelta);
        }
        else {
            this._nextPos = null;
        }
        return this._currPos;
    }
    /**
     * @return {?}
     */
    hasNext() {
        return this._nextPos !== null;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF0aEl0ZXJhdG9yLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9QYXRoSXRlcmF0b3IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHcEMsTUFBTTs7Ozs7SUFTSixZQUFZLEtBQWdCLEVBQUUsR0FBYzt3QkFIbkIsSUFBSTt3QkFDSixJQUFJO1FBRzNCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFDckQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNuRCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pEOzs7O0lBRU0sSUFBSTtRQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUU5QixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O1lBQ2pCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O1lBQ3BGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUM7U0FDNUY7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7OztJQUdoQixPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQzs7Q0FFakMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZWxsIH0gZnJvbSAnLi9DZWxsLm1vZGVsJztcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9SZWN0YW5nbGUubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhdGhJdGVyYXRvciB7XHJcbiAgcHJpdmF0ZSBfc3RhcnQ6IFJlY3RhbmdsZTtcclxuICBwcml2YXRlIF9oZWlnaHREZWx0YTogbnVtYmVyO1xyXG4gIHByaXZhdGUgX3dpZHRoRGVsdGE6IG51bWJlcjtcclxuICBwcml2YXRlIF9zdGVwczogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2N1cnJTdGVwOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfY3VyclBvczogQ2VsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfbmV4dFBvczogQ2VsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHN0YXJ0OiBSZWN0YW5nbGUsIGVuZDogUmVjdGFuZ2xlKSB7XHJcbiAgICBpZiAoIXN0YXJ0KSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1N0YXJ0IG5vdCBwcmVzZW50IGZvciBQYXRoIEl0ZXJhdG9yJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghZW5kKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0VuZCBub3QgcHJlc2VudCBmb3IgUGF0aCBJdGVyYXRvcicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zdGFydCA9IHN0YXJ0O1xyXG4gICAgdGhpcy5faGVpZ2h0RGVsdGEgPSBlbmQudG9wIC0gc3RhcnQudG9wO1xyXG4gICAgdGhpcy5fd2lkdGhEZWx0YSA9IGVuZC5sZWZ0IC0gc3RhcnQubGVmdDtcclxuICAgIHRoaXMuX3N0ZXBzID0gTWF0aC5tYXgoTWF0aC5hYnModGhpcy5faGVpZ2h0RGVsdGEpLCBNYXRoLmFicyh0aGlzLl93aWR0aERlbHRhKSk7XHJcbiAgICB0aGlzLl9jdXJyU3RlcCA9IDA7XHJcbiAgICB0aGlzLl9jdXJyUG9zID0gbnVsbDtcclxuICAgIHRoaXMuX25leHRQb3MgPSBuZXcgQ2VsbChzdGFydC50b3AsIHN0YXJ0LmxlZnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5leHQoKTogQ2VsbCB7XHJcbiAgICB0aGlzLl9jdXJyUG9zID0gdGhpcy5fbmV4dFBvcztcclxuXHJcbiAgICBpZiAodGhpcy5fY3VyclN0ZXAgPCB0aGlzLl9zdGVwcykge1xyXG4gICAgICB0aGlzLl9jdXJyU3RlcCsrO1xyXG4gICAgICBjb25zdCBjdXJyVG9wRGVsdGEgPSBNYXRoLnJvdW5kKCh0aGlzLl9jdXJyU3RlcCAvIHRoaXMuX3N0ZXBzKSAqIHRoaXMuX2hlaWdodERlbHRhKTtcclxuICAgICAgY29uc3QgY3VyckxlZnREZWx0YSA9IE1hdGgucm91bmQoKHRoaXMuX2N1cnJTdGVwIC8gdGhpcy5fc3RlcHMpICogdGhpcy5fd2lkdGhEZWx0YSk7XHJcbiAgICAgIHRoaXMuX25leHRQb3MgPSBuZXcgQ2VsbCh0aGlzLl9zdGFydC50b3AgKyBjdXJyVG9wRGVsdGEsIHRoaXMuX3N0YXJ0LmxlZnQgKyBjdXJyTGVmdERlbHRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX25leHRQb3MgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9jdXJyUG9zO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhc05leHQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fbmV4dFBvcyAhPT0gbnVsbDtcclxuICB9XHJcbn1cclxuIl19