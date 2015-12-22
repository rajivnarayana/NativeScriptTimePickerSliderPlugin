# NativeScript date picker slider plugin

A plugin that enables you to use the cocoapod at https://github.com/rajivnarayana/TimePickerSlider in your native script app.

## Installation

Run the following command from the root of your project

```
$ tns plugin add https://github.com/rajivnarayana/NativeScriptTimePickerSliderPlugin.git
```

This command automatically install the necessary ios files from the cocoapod github repository and adds as a dependency in your package.json file

## Examples

There is an sample application at the folder "Example". To run it (assuming you have nativescript plugin installed globally) 

```
$ sudo npm install typescript -g
$ tsc
$ cd Example
$ tns plugin add ../
```

Run the application from your mac onto your iOS simulator by typing
```
$ tns emulate ios --device=iPhone\ 5s
```

The following code from Example/app/main.xml show you a way to add Time picker to your layout
```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded" xmlns:tools="nativescript-timepicker-slider">
  <DockLayout stretchLastChild="false" style="background-color: gray">
    <tools:TimeIntervalSlider 
        hour="8" 
        minute="30" 
        dock="bottom" 
        fillColor="#e00000"
        strokeColor="#0000e0"
        loaded="onSliderLoaded"
        />
  </DockLayout>
</Page>
```
Following code from Exaple/app/main.js shows a way to listen to value changes

```js
function onSliderLoaded(args) {
    var slider = args.object;
    slider.on(observableModule.Observable.propertyChangeEvent, (args) => {
        if (args.propertyName == sliderModule.Slider.valueProperty.name) {
            console.log('Do something with the data '+slider.value);
        }
    }, this);
}

exports.onSliderLoaded = onSliderLoaded;
``` 
