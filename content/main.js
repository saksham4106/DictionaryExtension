const api_url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
var max_meanings
var dark_mode
var click_to_blur


window.addEventListener('dblclick', () => {

    chrome.storage.sync.get(["dark_mode"], (result) => {
        dark_mode = result.dark_mode
    })
    
    chrome.storage.sync.get(["max_meanings"], (result) => {
        max_meanings = result.max_meanings
    })

    chrome.storage.sync.get(["click_to_blur"], (result) => {
        click_to_blur = result.click_to_blur
    })


    var word = window.getSelection().toString()
    if(word.length <= 1 || word.length > 45 || word.indexOf(' ') >= 0 || /\d/.test(word)){
        return;
    }

    var popupdiv = document.createElement("div")
    var p1 = document.createElement("p")
    var p2 = document.createElement("ul")
    var close = document.createElement('button')
    setCss(popupdiv, p1, p2, close)

    close.addEventListener('click', () => {
        popupdiv.style.display = 'None'
    })
    
    popupdiv.appendChild(p1)
    popupdiv.appendChild(p2)
    popupdiv.appendChild(close)
    document.body.appendChild(popupdiv)

    if(dark_mode){
        popupdiv.style.backgroundColor = "#121212"
        close.style.backgroundColor = "#121212"
        p1.style.color = "#fff"
        p2.style.color = "#fff"
        close.style.color = "#fff"
    }

    if(click_to_blur){
        window.onclick = function(event){
            if(popupdiv){
                if (!popupdiv.contains(event.target)){
                    opupdiv.style.display = "None"
                }
            }
        }
    }

    fetch(api_url + word).then(res => {
        if (res.ok){
            return res.json()

        }else {
            p1.innerText = "Try again later.."
        }

    }).then((data) => {
        var pos = data[0]["meanings"][0]["partOfSpeech"]
        var meanings = []
        let i = 0

        data[0]["meanings"][0]["definitions"].forEach(element => {
            if(i < max_meanings){
                meanings.push(element["definition"])
            }
            i++
        });
        
        p1.innerText = word + ":   " + pos

        for (let i = 0; i < meanings.length; i++) {
            const element = meanings[i];
            let li = document.createElement('li')
            li.innerText = element
            p2.appendChild(li)
        }

    }).catch(() => p1.innerText = "Word not found")

})

function setCss(popupdiv, p1, p2, close){
    popupdiv.setAttribute('id', 'popup')
    popupdiv.style.position = "fixed"
    popupdiv.style.top = "50%"
    popupdiv.style.left = "50%"
    popupdiv.style.transform = "translate(-50%, -50%)"
    popupdiv.style.padding = "10px"
    popupdiv.style.backgroundColor = "#fff"
    popupdiv.style.border = "2px solid #ccc"
    popupdiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
    popupdiv.style.zIndex = "1000"
    popupdiv.style.borderRadius = "25px"
    popupdiv.style.boxShadow = "0px 0px 20px 2px black"

    p1.innerText = "Waiting for results...."
    p1.style.fontSize = "18px"
    p1.style.fontWeight = 'bold'
    p1.style.color = "black"
    p1.style.fontFamily = "Georgia"


    p2.style.fontSize = "14px"
    p2.style.color = "black"
    p2.style.fontFamily = "Georgia"

    close.textContent = "X"
    close.style.position = "absolute"
    close.style.top = "10px"
    close.style.right = "10px"
    close.style.borderRadius = "25px"
}
