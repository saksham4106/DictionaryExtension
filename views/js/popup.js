window.onload = function () {
    chrome.storage.sync.get(["dark_mode"], (result) => {
        document.getElementById("flexSwitchCheckDefault").checked = result.dark_mode
    })

    document.getElementById("flexSwitchCheckDefault").addEventListener('click', () => {
        var check = document.getElementById("flexSwitchCheckDefault")
        chrome.storage.sync.set({"dark_mode": check.checked})
    })
}


    