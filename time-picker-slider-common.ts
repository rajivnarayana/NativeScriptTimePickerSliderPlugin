import { TimeIntervalSlider as TimePickerSliderDefinition, IndicatorPopupView as IIndicatorPopupView } from "time-picker-slider";
import { Slider } from "ui/slider";
import { Property, PropertyMetadataSettings, PropertyChangeData } from "ui/core/dependency-observable";
import { PropertyMetadata } from "ui/core/proxy";
import { Color } from "color";
import { converters } from "ui/styling";
import { isNumber } from "utils/types";
import { View } from "ui/core/view";

//TODO: Add support for min and max times.
function isValidTime(slider: TimePickerSliderDefinition) : boolean {
    return true;
}

function isHourValid(value: number): boolean {
    return isNumber(value) && value >= 0 && value <= 23;
}

function isMinuteValid(value: number): boolean {
    return isNumber(value) && value >= 0 && value <= 59;
}

function onHourPropertyChanged(data: PropertyChangeData) {
    var picker = <TimePickerSliderDefinition>data.object;

    if (isValidTime(picker)) {
        picker._setNativeTime();
    } else {
        throw new Error(getErrorMessage(picker, "Hour", data.newValue));
    }
}

function onMinutePropertyChanged(data: PropertyChangeData) {
    var picker = <TimePickerSliderDefinition>data.object;

    if (isValidTime(picker)) {
        picker._setNativeTime();
    } else {
        throw new Error(getErrorMessage(picker, "Minute", data.newValue));
    }
}

function getErrorMessage(picker: TimePickerSliderDefinition, propertyName: string, newValue: number): string {
    return `${propertyName} property value (${toString(newValue) }:${toString(picker.minute) }) is not valid.`;
}

function toString(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
}

export class TimeIntervalSlider extends Slider implements TimePickerSliderDefinition {
    
    public _nativePropertyChangePropogating : boolean = false;
    public static lineWidthProperty = new Property("lineWidth", "TimeIntervalSlider", new PropertyMetadata(2));
    public static cornerRadiusProperty = new Property("cornerRadius", "TimeIntervalSlider", new PropertyMetadata(5));
    public static fillColorProperty = new Property("fillColor", "TimeIntervalSlider", 
        new PropertyMetadata(new Color("gray"), 
            PropertyMetadataSettings.None, 
            undefined, 
            Color.isValid), 
            converters.colorConverter);
    public static strokeColorProperty = new Property("strokeColor", "TimeIntervalSlider",        
         new PropertyMetadata(new Color("white"), 
            PropertyMetadataSettings.None,
            undefined,
            Color.isValid), 
            converters.colorConverter);
            
    public static hourProperty = new Property("hour", "TimeIntervalSlider",
        new PropertyMetadata(0, PropertyMetadataSettings.None, onHourPropertyChanged, isHourValid));

    public static minuteProperty = new Property("minute", "TimeIntervalSlider",
        new PropertyMetadata(0, PropertyMetadataSettings.None, onMinutePropertyChanged, isMinuteValid));
        
    public static minHourProperty = new Property("minHour", "TimeIntervalSlider",
        new PropertyMetadata(0, PropertyMetadataSettings.None, onHourPropertyChanged, isHourValid));
    
    public static maxHourProperty = new Property("maxHour", "TimeIntervalSlider",
        new PropertyMetadata(2 * 23, PropertyMetadataSettings.None, onHourPropertyChanged, isHourValid));
        
    public static minMinuteProperty = new Property("minMinute", "TimeIntervalSlider",
        new PropertyMetadata(0, PropertyMetadataSettings.None, onMinutePropertyChanged, isMinuteValid));
    
    public static maxMinuteProperty = new Property("maxMinute", "TimeIntervalSlider",
        new PropertyMetadata(30, PropertyMetadataSettings.None, onMinutePropertyChanged, isMinuteValid));
        
    get lineWidth() : number {
        return this._getValue(TimeIntervalSlider.lineWidthProperty);
    }
    
    set lineWidth(lineWidth : number) {
        this._setValue(TimeIntervalSlider.lineWidthProperty, lineWidth);
    }
    
    get cornerRadius() : number {
        return this._getValue(TimeIntervalSlider.cornerRadiusProperty);
    }
    
    set cornerRadius(cornerRadius:number) {
        this._setValue(TimeIntervalSlider.cornerRadiusProperty, cornerRadius);
    }
    
    get strokeColor(): Color {
        return this._getValue(TimeIntervalSlider.strokeColorProperty);
    }
    
    set strokeColor(strokeColor: Color) {
        this._setValue(TimeIntervalSlider.strokeColorProperty, strokeColor);
    }
    
    get fillColor(): Color {
        return this._getValue(TimeIntervalSlider.fillColorProperty);
    }
    
    set fillColor(fillColor: Color) {
        this._setValue(TimeIntervalSlider.fillColorProperty, fillColor);
    }
    
    get hour(): number {
        return this._getValue(TimeIntervalSlider.hourProperty);
    }
    set hour(value: number) {
        this._setValue(TimeIntervalSlider.hourProperty, value);
    }

    get minute(): number {
        return this._getValue(TimeIntervalSlider.minuteProperty);
    }
    set minute(value: number) {
        this._setValue(TimeIntervalSlider.minuteProperty, value);
    }
    
    get minHour(): number {
        return this._getValue(TimeIntervalSlider.minHourProperty);
    }
    
    get maxHour(): number {
        return this._getValue(TimeIntervalSlider.maxHourProperty);
    }
    
    get minMinute(): number {
        return this._getValue(TimeIntervalSlider.minMinuteProperty);
    }
    
    get maxMinute(): number {
        return this._getValue(TimeIntervalSlider.maxMinuteProperty);
    }
    
    set minHour(value : number) {
        this._setValue(TimeIntervalSlider.minHourProperty, value);    
    }
    
    set minMinute(value : number) {
        this._setValue(TimeIntervalSlider.minMinuteProperty, value);    
    }
        
    set maxHour(value : number) {
        this._setValue(TimeIntervalSlider.maxHourProperty, value);    
    }
    
    set maxMinute(value : number) {
        this._setValue(TimeIntervalSlider.maxMinuteProperty, value);    
    }
    
    public _setNativeTime(): void {
        if (this._nativePropertyChangePropogating ) {
            return;
        }
        this.value = (this.hour * 2) + (this.minute < 30 ? 0 : 1);   
    }
}
/*
export class IndicatorPopupView extends View implements IIndicatorPopupView {
    
}
*/