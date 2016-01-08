var vmModule = require("./main-view-model");
var sliderModule = require("ui/slider");
var observableModule = require("data/observable");

var toolTipView = HZIndicatorPopupView.alloc().initWithFrame(CGRectZero);

var viewModel = new observableModule.Observable();
function pageLoaded(args) {
    var page = args.object;
    viewModel.set("pickupTime", {hour:10, minute:30});
    viewModel.set("text", "something");
    page.bindingContext = viewModel;
    if (page.ios) {
        toolTipView.titleLabel.text = "Hello World";
        toolTipView.maximumContentSize = CGSizeMake(200,200);
        toolTipView.backgroundColor = UIColor.greenColor();
    }

}

function onSliderLoaded(args) {
    var slider = args.object;
    slider.on(observableModule.Observable.propertyChangeEvent, (args) => {
        if (args.propertyName == sliderModule.Slider.valueProperty.name) {
              var slider = args.object;
              toolTipView.titleLabel.text = slider.ios.textForIntervalValue(slider.value);
              viewModel.set('text', toolTipView.titleLabel.text);
              toolTipView.showAtViewInsideParentViewDismissAfter(slider.ios, slider.ios.superview, slider.ios.tracking ? 0.0 : 0.1);
        }
    }, this);
}

exports.pageLoaded = pageLoaded;
exports.onSliderLoaded = onSliderLoaded;
