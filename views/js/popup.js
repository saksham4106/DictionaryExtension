window.onload = function () {
    chrome.storage.sync.get(["dark_mode"], (res1) => {
        chrome.storage.sync.get(["max_meanings"], (res2) => {
                chrome.storage.sync.get(["click_to_blur"], (res3) => {
                    chrome.storage.sync.get(["activation_with_click"], (res4) => {
                        chrome.storage.sync.get(["meaning_key"], (res5) => {
                            document.getElementById("dark_mode").checked = res1.dark_mode
                            document.getElementById("max_meanings").value = res2.max_meanings
                            document.getElementById("blur").checked = res3.click_to_blur
                            document.getElementById("activation_with_click").checked = res4.activation_with_click
                            document.getElementById("meaning_key").value = res5.meaning_key

                        })
                    })
                    
            })
        })
    })

    document.getElementById("submit").addEventListener('click', () => {
        chrome.storage.sync.set({"dark_mode": document.getElementById("dark_mode").checked})
        chrome.storage.sync.set({"max_meanings": Number(document.getElementById("max_meanings").value)})
        chrome.storage.sync.set({"blur": document.getElementById("blur").checked})
        chrome.storage.sync.set({"activation_with_click": document.getElementById('activation_with_click').checked})
        chrome.storage.sync.set({"meaning_key": document.getElementById("meaning_key").value})
    })
}


    