/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Rectangle } from './Rectangle.model';
export class WidgetConfig {
    /**
     * @param {?=} rect
     */
    constructor(rect) {
        this._position = new Rectangle();
        this.id = this.generateUID();
        if (rect) {
            this.position = rect;
        }
    }
    /**
     * @return {?}
     */
    get position() {
        return this._position;
    }
    /**
     * @param {?} gridArea
     * @return {?}
     */
    set position(gridArea) {
        this._position.top = +gridArea.top ? +gridArea.top : 0;
        this._position.left = +gridArea.left ? +gridArea.left : 0;
        this._position.width = +gridArea.width ? +gridArea.width : 0;
        this._position.height = +gridArea.height ? +gridArea.height : 0;
    }
    /**
     * @return {?}
     */
    generateUID() {
        return 'ngxDashboardWidget-' + ++WidgetConfig.widgetCount;
    }
}
WidgetConfig.widgetCount = 0;
if (false) {
    /** @type {?} */
    WidgetConfig.widgetCount;
    /** @type {?} */
    WidgetConfig.prototype.id;
    /** @type {?} */
    WidgetConfig.prototype._position;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lkZ2V0Q29uZmlnLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdpZGdldC1ncmlkLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9XaWRnZXRDb25maWcubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU5QyxNQUFNOzs7O0lBS0osWUFBWSxJQUFnQjt5QkFGRyxJQUFJLFNBQVMsRUFBRTtRQUc1QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO0tBQ0Y7Ozs7UUFFVSxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7O1FBR2IsUUFBUSxDQUFDLFFBQW1CO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRzNELFdBQVc7UUFDaEIsT0FBTyxxQkFBcUIsR0FBRyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUM7OzsyQkF2QnZDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuL1JlY3RhbmdsZS5tb2RlbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgV2lkZ2V0Q29uZmlnIHtcclxuICBzdGF0aWMgd2lkZ2V0Q291bnQgPSAwO1xyXG4gIHB1YmxpYyBpZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlY3Q/OiBSZWN0YW5nbGUpIHtcclxuICAgIHRoaXMuaWQgPSB0aGlzLmdlbmVyYXRlVUlEKCk7XHJcbiAgICBpZiAocmVjdCkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gcmVjdDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgcG9zaXRpb24oKTogUmVjdGFuZ2xlIHtcclxuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgcG9zaXRpb24oZ3JpZEFyZWE6IFJlY3RhbmdsZSkge1xyXG4gICAgdGhpcy5fcG9zaXRpb24udG9wID0gK2dyaWRBcmVhLnRvcCA/ICtncmlkQXJlYS50b3AgOiAwO1xyXG4gICAgdGhpcy5fcG9zaXRpb24ubGVmdCA9ICtncmlkQXJlYS5sZWZ0ID8gK2dyaWRBcmVhLmxlZnQgOiAwO1xyXG4gICAgdGhpcy5fcG9zaXRpb24ud2lkdGggPSArZ3JpZEFyZWEud2lkdGggPyArZ3JpZEFyZWEud2lkdGggOiAwO1xyXG4gICAgdGhpcy5fcG9zaXRpb24uaGVpZ2h0ID0gK2dyaWRBcmVhLmhlaWdodCA/ICtncmlkQXJlYS5oZWlnaHQgOiAwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdlbmVyYXRlVUlEKCkge1xyXG4gICAgcmV0dXJuICduZ3hEYXNoYm9hcmRXaWRnZXQtJyArICsrV2lkZ2V0Q29uZmlnLndpZGdldENvdW50O1xyXG4gIH1cclxufVxyXG4iXX0=