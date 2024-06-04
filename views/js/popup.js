window.onload = function () {
    chrome.storage.sync.get(["dark_mode"], (res1) => {
        chrome.storage.sync.get(["max_meanings"], (res2) => {
                chrome.storage.sync.get(["click_to_blur"], (res3) => {
                    document.getElementById("dark_mode").checked = res1.dark_mode
                    document.getElementById("max_meanings").value = res2.max_meanings
                    document.getElementById("blur").checked = res3.click_to_blur
            })
        })
    })

    document.getElementById("submit").addEventListener('click', () => {
        chrome.storage.sync.set({"dark_mode": document.getElementById("dark_mode").checked})
        chrome.storage.sync.set({"max_meanings": Number(document.getElementById("max_meanings").value)})
        chrome.storage.sync.set({"blur": document.getElementById("blur").checked})
    })
}


    