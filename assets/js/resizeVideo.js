function findSize(el, size) {
    /* size must be 'width' or ' height' */
    return window.getComputedStyle
        ? getComputedStyle(el,null).getPropertyValue(size)
        : el['client'+size.substr(0,1).toUpperCase() + size.substr(1)] + "px";
}
function resizeVideoFrame(frameName){
	var iframe = document.getElementById(frameName);
	if (iframe) {
		try{
			var widthStr = findSize(iframe, "width")
			var widthValue = Number(widthStr.substr(0, widthStr.indexOf("px")))
			iframe.height = widthValue / 1.777 + "px";
		}catch (ex){}
	}
}
function resizeVideoFrames()
{
	resizeVideoFrame("videoFrame");
	resizeVideoFrame("videoFrame0");
	resizeVideoFrame("videoFrame1");
	resizeVideoFrame("videoFrame2");
	resizeVideoFrame("videoFrame3");
	resizeVideoFrame("videoFrame4");
	resizeVideoFrame("videoFrame5");
	resizeVideoFrame("videoFrame6");
	resizeVideoFrame("videoFrame7");
	resizeVideoFrame("videoFrame8");
	resizeVideoFrame("videoFrame9");
}
window.setInterval("resizeVideoFrames()", 500);