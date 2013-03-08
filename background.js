chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('main.html', {
        width: 800,
        height: 220,
//        minWidth: 800,
//        minHeight: 600,
        left: 100,
        top: 100,
        type: 'shell'
    });
    console.log("Application is launched!");
});
