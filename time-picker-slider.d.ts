declare module "time-picker-slider" {
    import { Slider } from "ui/slider";
    import { View } from "ui/core/view";
    import { Color } from "color";
    
    export class TimeIntervalSlider extends Slider {
        ios : any; /* HZTimeIntervalSlider */
        public static lineWidthProperty;
        public static cornerRadiusProperty;
        public static strokeColorProperty;
        public static fillColorProperty;
        
        lineWidth: number;
        cornerRadius: number;
        strokeColor: Color;
        fillColor: Color;
        
        hour: number;
        minute: number;
        
        /**
         * Protected.
         */
        public _setNativeTime(): void
        /**
         * End protected.
         */
    }
    
    export class IndicatorPopupView extends View {
        titleLabel : any; /* UILabel */
        subTitleLabel : any; /* UILabel */
        pointAtViewInsideParentView(view : View, parentView: View) : void;
        dismissAfter(timeInterval : number /* milliseconds */) : void;
    }
}