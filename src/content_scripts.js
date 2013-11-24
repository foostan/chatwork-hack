(function () {
    var jqui = document.createElement('script');
    jqui.src = chrome.extension.getURL('web_accessible_resources/jquery-ui.min.js');
    document.body.appendChild(jqui);

    var scp = document.createElement('script');
    scp.src = chrome.extension.getURL('web_accessible_resources/index.js');
    document.body.appendChild(scp);
})();
