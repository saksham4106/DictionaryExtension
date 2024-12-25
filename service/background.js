chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({"dark_mode": true})
    chrome.storage.sync.set({"max_meanings": 2})
    chrome.storage.sync.set({"click_to_blur": true})
    chrome.storage.sync.set({"activation_with_click": false})
    chrome.storage.sync.set({"meaning_key": "m"})
})
