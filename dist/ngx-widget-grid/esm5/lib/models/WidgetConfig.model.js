/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Rectangle } from './Rectangle.model';
var WidgetConfig = /** @class */ (function () {
    function WidgetConfig(rect) {
        this._position = new Rectangle();
        this.id = this.generateUID();
        if (rect) {
            this.position = rect;
        }
    }
    Object.defineProperty(WidgetConfig.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            return this._position;
        },
        set: /**
         * @param {?} gridArea
         * @return {?}
         */
        function (gridArea) {
            this._position.top = +gridArea.top ? +gridArea.top : 0;
            this._position.left = +gridArea.left ? +gridArea.left : 0;
            this._position.width = +gridArea.width ? +gridArea.width : 0;
            this._position.height = +gridArea.height ? +gridArea.height : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WidgetConfig.prototype.generateUID = /**
     * @return {?}
     */
    function () {
        return 'ngxDashboardWidget-' + ++WidgetConfig.widgetCount;
    };
    WidgetConfig.widgetCount = 0;
    return WidgetConfig;
}());
export { WidgetConfig };
if (false) {
    /** @type {?} */
    WidgetConfig.widgetCount;
    /** @type {?} */
    WidgetConfig.prototype.id;
    /** @type {?} */
    WidgetConfig.prototype._position;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lkZ2V0Q29uZmlnLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9XaWRnZXRDb25maWcubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7SUFPNUMsc0JBQVksSUFBZ0I7eUJBRkcsSUFBSSxTQUFTLEVBQUU7UUFHNUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN0QjtLQUNGOzBCQUVVLGtDQUFROzs7OztZQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7OztrQkFHSixRQUFtQjtZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQUczRCxrQ0FBVzs7OztRQUNoQixPQUFPLHFCQUFxQixHQUFHLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQzs7K0JBdkJ2QyxDQUFDO3VCQUh4Qjs7U0FFYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9SZWN0YW5nbGUubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdpZGdldENvbmZpZyB7XHJcbiAgc3RhdGljIHdpZGdldENvdW50ID0gMDtcclxuICBwdWJsaWMgaWQ6IHN0cmluZztcclxuICBwcml2YXRlIF9wb3NpdGlvbjogUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZWN0PzogUmVjdGFuZ2xlKSB7XHJcbiAgICB0aGlzLmlkID0gdGhpcy5nZW5lcmF0ZVVJRCgpO1xyXG4gICAgaWYgKHJlY3QpIHtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHJlY3Q7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHBvc2l0aW9uKCk6IFJlY3RhbmdsZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHBvc2l0aW9uKGdyaWRBcmVhOiBSZWN0YW5nbGUpIHtcclxuICAgIHRoaXMuX3Bvc2l0aW9uLnRvcCA9ICtncmlkQXJlYS50b3AgPyArZ3JpZEFyZWEudG9wIDogMDtcclxuICAgIHRoaXMuX3Bvc2l0aW9uLmxlZnQgPSArZ3JpZEFyZWEubGVmdCA/ICtncmlkQXJlYS5sZWZ0IDogMDtcclxuICAgIHRoaXMuX3Bvc2l0aW9uLndpZHRoID0gK2dyaWRBcmVhLndpZHRoID8gK2dyaWRBcmVhLndpZHRoIDogMDtcclxuICAgIHRoaXMuX3Bvc2l0aW9uLmhlaWdodCA9ICtncmlkQXJlYS5oZWlnaHQgPyArZ3JpZEFyZWEuaGVpZ2h0IDogMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZW5lcmF0ZVVJRCgpIHtcclxuICAgIHJldHVybiAnbmd4RGFzaGJvYXJkV2lkZ2V0LScgKyArK1dpZGdldENvbmZpZy53aWRnZXRDb3VudDtcclxuICB9XHJcbn1cclxuIl19