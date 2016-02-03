import { TimeIntervalSlider as TimeIntervalSliderCommon } from "./time-picker-slider-common";
import { PropertyChangeData } from "ui/core/dependency-observable";
import { PropertyMetadata } from "ui/core/proxy";
import { Color } from "color";
import { Slider } from "ui/slider";

function onWidthPropertyChanged(data: PropertyChangeData) {
    var slider = <TimeIntervalSliderCommon>data.object;
    slider.ios.lineWidth = data.newValue;
}

function onCornerRadiusPropertyChanged(data: PropertyChangeData) {
    var slider = <TimeIntervalSliderCommon>data.object;
    slider.ios.cornerRadius = data.newValue;
}

function onFillColorPropertyChanged(data: PropertyChangeData) {
    var slider = <TimeIntervalSliderCommon>data.object;
    slider.ios.fillColor = (<Color>data.newValue).ios;
}

function onStrokeColorPropertyChanged(data: PropertyChangeData) {
    var slider = <TimeIntervalSliderCommon>data.object;
    slider.ios.strokeColor = (<Color>data.newValue).ios;
}

// register the setNativeValue callbacks
(<PropertyMetadata>TimeIntervalSliderCommon.lineWidthProperty.metadata).onSetNativeValue = onWidthPropertyChanged;
(<PropertyMetadata>TimeIntervalSliderCommon.cornerRadiusProperty.metadata).onSetNativeValue = onCornerRadiusPropertyChanged;
(<PropertyMetadata>TimeIntervalSliderCommon.fillColorProperty.metadata).onSetNativeValue = onFillColorPropertyChanged;
(<PropertyMetadata>TimeIntervalSliderCommon.strokeColorProperty.metadata).onSetNativeValue = onStrokeColorPropertyChanged;

class TimeSliderChangeHandlerImpl extends NSObject {

    private _owner: WeakRef<TimeIntervalSlider>;

    public static initWithOwner(owner: WeakRef<TimeIntervalSlider>): TimeSliderChangeHandlerImpl {
        let handler = <TimeSliderChangeHandlerImpl>TimeSliderChangeHandlerImpl.new();
        handler._owner = owner;
        return handler;
    }

    public sliderValueChanged(sender: UIControl) {
        let owner = this._owner.get();
        if (owner) {
            let oldValue = owner.value;
            owner._onPropertyChangedFromNative(Slider.valueProperty, sender.value);
            owner._nativePropertyChangePropogating = true;
            owner._onPropertyChangedFromNative(TimeIntervalSliderCommon.hourProperty, Math.floor(sender.value / 2));
            owner._onPropertyChangedFromNative(TimeIntervalSliderCommon.minuteProperty, 30 * (Math.floor(sender.value) % 2));
            owner._nativePropertyChangePropogating = false;
            if (!sender.tracking) {
                owner._onPropertyChanged(Slider.valueProperty, sender.value, oldValue);
                if (sender.value < 2 * owner.minHour + (owner.minMinute < 30 ? 0 : 1)) {
                    sender.value = 2 * owner.minHour + (owner.minMinute < 30 ? 0 : 1);
                    this.sliderValueChanged(sender);
                } else if (sender.value > 2 * owner.maxHour + (owner.maxMinute < 30 ? 0 : 1)) {
                    sender.value = 2 * owner.maxHour + (owner.maxMinute < 30 ? 0 : 1);
                    this.sliderValueChanged(sender);
                }
            }
        }
    }

    public static ObjCExposedMethods = {
        'sliderValueChanged': { returns: interop.types.void, params: [HZTimeIntervalSlider] }
    };
}

export class TimeIntervalSlider extends TimeIntervalSliderCommon {
    private _ios: any /*HZTimeIntervalSlider*/;
    private _changeHandler: TimeSliderChangeHandlerImpl;
    
    constructor() {
        super();
        this._ios = new HZTimeIntervalSlider();

        // default values

        this._changeHandler = TimeSliderChangeHandlerImpl.initWithOwner(new WeakRef(this));
        this._ios.addTargetActionForControlEvents(this._changeHandler, "sliderValueChanged", UIControlEvents.UIControlEventValueChanged);
    }

    get ios(): HZTimeIntervalSlider {
        return this._ios;
    }
}
