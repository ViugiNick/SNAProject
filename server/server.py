from flask import Flask
from flask import request, make_response, Response, jsonify

app = Flask(__name__)


@app.route('/get_tweet_sentiment', methods=['POST', 'GET'])
def pos_neg_request():
    if request.method == 'POST':
        try:
            body = request.json
            tweet_id = body["tweetId"]

            # TODO
            # count sentiment

            return jsonify(neg=1, pos=0)
        except KeyError as err:
            app.logger.warning("Bad post data")
    else:
        app.logger.warning("Someone doing get reqest for prediction, ignoring")
    return Response(status=201)


if __name__ == "__main__":
    app.run()
