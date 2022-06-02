export const onIframeLoad = (iframe, timeout) => {
  return new Promise((resolve, reject) => {
    // Set on load events
    if (iframe.attachEvent) {
      iframe.attachEvent("onload", resolve);
    } else {
      console.log('setting on load')
      iframe.onload = resolve
    }

    setTimeout(reject, timeout);
  })
}