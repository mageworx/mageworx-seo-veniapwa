import urls_config from "../../../urls.congif";

export const getCurrentHostname = (isNeedSlash) => {
    let currentHostname = window.location.protocol + "//" + window.location.hostname;
    if (window.location.port.length > 0) currentHostname += ":" + window.location.port;
    if (isNeedSlash) currentHostname += "/";
    return currentHostname;
}

export const findCodeFromConfig = (code, type, isNeedSlash) => {
    const elem = urls_config.find((element) => {
        if (element.type === type) {
            if (element.code === code) {
                return true;
            }
        }
    })
    if (elem) {
        let url = elem.url;
        if (isNeedSlash) {
            // "http://demo.com" => "http://demo.com/"
            if (url[url.length - 1] !== "/") url += "/";
        }
        else {
            // "http://demo.com/" => "http://demo.com"
            if (url[url.length - 1] === "/") url = url.substring(0, url.length - 1);
        }
        return url
    }
    else return null;
}
