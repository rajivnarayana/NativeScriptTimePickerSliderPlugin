declare module "time-picker-slider" {
    import { Slider } from "ui/slider";
    import { View } from "ui/core/view";
    import { Color } from "color";
    import { Property } from "ui/core/dependency-observable";
    
    export class TimeIntervalSlider extends Slider {
        ios : any; /* HZTimeIntervalSlider */
        public static lineWidthProperty : Property;
        public static cornerRadiusProperty : Property;
        public static strokeColorProperty : Property;
        public static fillColorProperty : Property;
        public static hourProperty : Property;
        public static minuteProperty : Property;
        
        lineWidth: number;
        cornerRadius: number;
        strokeColor: Color;
        fillColor: Color;
        
        hour: number;
        minute: number;
        
        private _nativePropertyChangePropogating : boolean;
        
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