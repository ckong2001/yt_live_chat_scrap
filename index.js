let puppeteer = require('puppeteer')
let url = "youtube_link"

let openBroswer = async (url) => {
    var baseurl =  url;
    const browser = await puppeteer.launch({headless: true});
    var page = await browser.newPage();
    await page.goto(baseurl);
    return page
}

let scrap = async (url) => {
    let page = await openBroswer(url)
    page.on('response',async response => {
        try{
            if (response.url().includes("get_live_chat")){
                const dataObj = await response.json()
                actions = dataObj["continuationContents"]["liveChatContinuation"]["actions"]
                actions.map((action) =>{
                    action["addChatItemAction"]["item"]["liveChatTextMessageRenderer"]["message"]["runs"].map((run) =>{
                        console.log(run["text"])
                    })
                })
            }
        } catch(err) {
            console.error(err)
        }
        
    })
}

scrap(url)