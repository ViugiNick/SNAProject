Array.from(document.getElementsByClassName('tweet')).forEach(messageElement => {
    addSentiment(messageElement, 0);
});

function addSentiment(parent, value) {
    // if (value == null || visualisedCache.has(id)) {
    //     return;
    // }
    console.log("addSentiment");
    console.log(parent.getAttribute('data-tweet-id'));

    const idElement = document.createElement('div');
    idElement.className = 'tweet-sentiment';
    idElement.style.backgroundColor = getColorForPercentage(value);
    idElement.title = 'Sentiment: ' + (value * 100).toFixed(2) + '%';
    parent.appendChild(idElement);
    //visualisedCache.set(id, idElement);
}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'OPEN_DIALOG') {
//         tabId = message.tabId;
//         timer = createTimer();
//     } else if (message.type === 'CLOSE_DIALOG' && timer) {
//         clearInterval(timer);
//         removeInputSentiment();
//     }
// });
//
// function createTimer() {
//     console.log("createTimer");
//     return setInterval(() => {
//         chrome.storage.sync.get(['enabled'], () => {
//             Array.from(document.getElementsByClassName('js-tweet-text-container')).forEach(messageElement => {
//                 addSentiment(messageElement);
//             });
//         });
//     }, 300);
// }
//
// function addSentiment(parent) {
//     // if (value == null || visualisedCache.has(id)) {
//     //     return;
//     // }
//     const idElement = document.createElement('div');
//     idElement.className = 'message-sentiment';
//     idElement.style.backgroundColor = getColorForPercentage(value);
//     idElement.title = 'Сентимент: ' + (value * 100).toFixed(2) + '%';
//     parent.appendChild(idElement);
//     //visualisedCache.set(id, idElement);
// }
//
// function removeInputSentiment() {
//     if (!inputSentiment)
//         return;
//     const input = document.getElementsByClassName('im_editable im-chat-input--text _im_text').item(0);
//     if (input) {
//         input.removeEventListener('input', inputListener);
//     }
//     if (!inputSentiment.parent) {
//         inputSentiment = null;
//         return;
//     }
//     inputSentiment.parent.removeChild(inputSentiment);
//     inputSentiment = null;
// }