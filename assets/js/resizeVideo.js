function findSize(el, size) {
    /* size must be 'width' or ' height' */
    return window.getComputedStyle
        ? getComputedStyle(el,null).getPropertyValue(size)
        : el['client'+size.substr(0,1).toUpperCase() + size.substr(1)] + "px";
}
function resizeVideoFrame(){
	var iframe = document.getElementById("videoFrame");
	if (iframe) {
		try{
			var widthStr = findSize(iframe, "width")
			var widthValue = Number(widthStr.substr(0, widthStr.indexOf("px")))
			iframe.height = widthValue / 1.777 + "px";
		}catch (ex){}
	}
}
window.setInterval("resizeVideoFrame()", 500);