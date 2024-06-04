chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({"dark_mode": false})
    chrome.storage.sync.set({"max_meanings": 2})
    chrome.storage.sync.set({"click_to_blur": false})
})
