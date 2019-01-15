const SERVER = 'http://localhost:5000';

Array.from(document.getElementsByClassName('tweet')).forEach(messageElement => {
    tweet_id = messageElement.getAttribute('data-tweet-id');

    content_element = messageElement.getElementsByClassName("tweet-text")[0];
    sentimentRequest(content_element.innerHTML, messageElement, tweet_id, addSentiment);
});

function addSentiment(parent, value) {
    value = value.neg;
    console.log('addSentiment ');
    const idElement = document.createElement('div');
    idElement.className = 'tweet-sentiment';
    idElement.style.backgroundColor = getColorForPercentage(value);
    idElement.title = 'Sentiment: ' + (value * 100).toFixed(2) + '%';
    parent.parentNode.insertBefore(idElement, parent);
    //visualisedCache.set(id, idElement);
}

function sentimentRequest(tweet_message, tweet_element, tweet_id, callback) {
  console.log('sentimentRequest ' + tweet_id);

  const urlLoad = SERVER + `/get_tweet_sentiment`;
  const data = JSON.stringify({
    tweetId: tweet_id,
      tweetMessage: tweet_message
  });

  console.log(data);

  const request = new XMLHttpRequest();
  request.open('POST', urlLoad, true);
  request.setRequestHeader('Content-type', 'application/json');
  request.timeout = 500;

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callback(tweet_element, JSON.parse(request.response));
    }
  };

  request.onerror = function (error) {
    console.error(error);
    callback(tweet_element, null);
  }
  request.send(data);
}