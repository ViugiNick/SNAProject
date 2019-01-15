from flask import Flask
from flask import request, make_response, Response, jsonify
from keras.models import model_from_json
from keras.utils.np_utils import to_categorical
from keras.preprocessing.sequence import pad_sequences
import pickle
import pandas as pd
import numpy as np
import sys
from bs4 import BeautifulSoup

app = Flask(__name__)

with open('models/sent_tokenizer.pickle', 'rb') as handle:
    sent_tokenizer = pickle.load(handle)

max_len = 130

json_file = open('models/SentModel.json', 'r')
loaded_sent_model = model_from_json(json_file.read())
json_file.close()
loaded_sent_model.load_weights("models/SentModel.h5")
loaded_sent_model.compile(optimizer='Adagrad', loss='categorical_crossentropy', metrics=['acc'])

@app.route('/get_tweet_sentiment', methods=['POST', 'GET'])
def pos_neg_request():
    if request.method == 'POST':
        try:
            body = request.json
            tweet_id = body["tweetId"]
            tweet_message = BeautifulSoup(body["tweetMessage"], "lxml").text
#            tweet_message = ''.join([s for s in tweet_message if s in
#                          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '])

            seq = sent_tokenizer.texts_to_sequences(tweet_message)
            padded = pad_sequences(seq, maxlen=max_len)
            pred = loaded_sent_model.predict(padded)

            return jsonify(neg=pred[2], pos=pred[3])
        except KeyError as err:
            app.logger.warning("Bad post data")
    else:
        app.logger.warning("Someone doing get reqest for prediction, ignoring")
    return Response(status=201)


if __name__ == "__main__":
    app.run()
