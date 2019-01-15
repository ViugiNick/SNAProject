from keras.models import model_from_json
from keras.utils.np_utils import to_categorical
from keras.preprocessing.sequence import pad_sequences
import pickle
import pandas as pd
import numpy as np
import sys

if len(sys.argv) < 2:
    print("Please give argument. Exiting...")
    exit()

with open('models/sent_tokenizer.pickle', 'rb') as handle:
    sent_tokenizer = pickle.load(handle)

max_len = 130

json_file = open('models/SentModel.json', 'r')
loaded_sent_model = model_from_json(json_file.read())
json_file.close()
loaded_sent_model.load_weights("models/SentModel.h5")
loaded_sent_model.compile(optimizer='Adagrad', loss='categorical_crossentropy', metrics=['acc'])

seq = sent_tokenizer.texts_to_sequences(str(sys.argv[1]))
padded = pad_sequences(seq, maxlen=max_len)
pred = loaded_sent_model.predict(padded)
labels = ['neutral', 'irrelevant', 'negative', 'positive']
print(pred[0])
