import requests
from bs4 import BeautifulSoup
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
import string
import re
from nltk.stem.snowball import SnowballStemmer
from nltk.tokenize import TweetTokenizer
from flask_cors import CORS  # Import CORS from flask_cors module
from flask import Flask, request, jsonify

# Contraction map and other functions defined previously...
app = Flask(__name__)
CORS(app)
# Contraction map
c_dict = {
    "ain't": "am not",
    "aren't": "are not",
    "can't": "cannot",
    "can't've": "cannot have",
    "'cause": "because",
    "could've": "could have",
    "couldn't": "could not",
    "couldn't've": "could not have",
    "didn't": "did not",
    "doesn't": "does not",
    "don't": "do not",
    "hadn't": "had not",
    "hadn't've": "had not have",
    "hasn't": "has not",
    "haven't": "have not",
    "he'd": "he would",
    "he'd've": "he would have",
    "he'll": "he will",
    "he'll've": "he will have",
    "he's": "he is",
    "how'd": "how did",
    "how'd'y": "how do you",
    "how'll": "how will",
    "how's": "how is",
    "i'd": "I would",
    "i'd've": "I would have",
    "i'll": "I will",
    "i'll've": "I will have",
    "i'm": "I am",
    "i've": "I have",
    "isn't": "is not",
    "it'd": "it had",
    "it'd've": "it would have",
    "it'll": "it will",
    "it'll've": "it will have",
    "it's": "it is",
    "let's": "let us",
    "ma'am": "madam",
    "mayn't": "may not",
    "might've": "might have",
    "mightn't": "might not",
    "mightn't've": "might not have",
    "must've": "must have",
    "mustn't": "must not",
    "mustn't've": "must not have",
    "needn't": "need not",
    "needn't've": "need not have",
    "o'clock": "of the clock",
    "oughtn't": "ought not",
    "oughtn't've": "ought not have",
    "shan't": "shall not",
    "sha'n't": "shall not",
    "shan't've": "shall not have",
    "she'd": "she would",
    "she'd've": "she would have",
    "she'll": "she will",
    "she'll've": "she will have",
    "she's": "she is",
    "should've": "should have",
    "shouldn't": "should not",
    "shouldn't've": "should not have",
    "so've": "so have",
    "so's": "so is",
    "that'd": "that would",
    "that'd've": "that would have",
    "that's": "that is",
    "there'd": "there had",
    "there'd've": "there would have",
    "there's": "there is",
    "they'd": "they would",
    "they'd've": "they would have",
    "they'll": "they will",
    "they'll've": "they will have",
    "they're": "they are",
    "they've": "they have",
    "to've": "to have",
    "wasn't": "was not",
    "we'd": "we had",
    "we'd've": "we would have",
    "we'll": "we will",
    "we'll've": "we will have",
    "we're": "we are",
    "we've": "we have",
    "weren't": "were not",
    "what'll": "what will",
    "what'll've": "what will have",
    "what're": "what are",
    "what's": "what is",
    "what've": "what have",
    "when's": "when is",
    "when've": "when have",
    "where'd": "where did",
    "where's": "where is",
    "where've": "where have",
    "who'll": "who will",
    "who'll've": "who will have",
    "who's": "who is",
    "who've": "who have",
    "why's": "why is",
    "why've": "why have",
    "will've": "will have",
    "won't": "will not",
    "won't've": "will not have",
    "would've": "would have",
    "wouldn't": "would not",
    "wouldn't've": "would not have",
    "y'all": "you all",
    "y'alls": "you alls",
    "y'all'd": "you all would",
    "y'all'd've": "you all would have",
    "y'all're": "you all are",
    "y'all've": "you all have",
    "you'd": "you had",
    "you'd've": "you would have",
    "you'll": "you you will",
    "you'll've": "you you will have",
    "you're": "you are",
    "you've": "you have"
}

# Compiling the contraction dict
c_re = re.compile('(%s)' % '|'.join(c_dict.keys()))

# List of stop words
add_stop = ['said', 'say', '...', 'like', 'cnn', 'ad', 'album', 'song', 'track', 'songs', 'produced', 'tracks', 'produce', 'record', 'genre']
stop_words = ENGLISH_STOP_WORDS.union(add_stop)

# List of punctuation
punc = list(set(string.punctuation))

# Function to clean and preprocess text
def clean_text(text):
    text = text.replace("\n", "").strip()
    text = ' '.join(text.split())
    return text

# Function to expand contractions
def expand_contractions(text, c_re=c_re):
    def replace(match):
        return c_dict[match.group(0)]
    return c_re.sub(replace, text)

# Function to process text
def process_text(text):
    text = expand_contractions(text)
    tokenizer = TweetTokenizer()
    tokens = tokenizer.tokenize(text)
    tokens = [token.lower() for token in tokens]
    tokens = [re.sub('[0-9]+', '', token) for token in tokens]
    # stemmer = SnowballStemmer('english')
    # tokens = [stemmer.stem(token) for token in tokens]
    tokens = [token for token in tokens if token not in punc]
    tokens = [token for token in tokens if token not in stop_words]
    tokens = [token for token in tokens if len(token) > 1]
    tokens = [token for token in tokens if ' ' not in token]
    return ' '.join(tokens)

# Initialize Flask app
@app.route("/", methods=['POST'])
def scrape():

# URL and request setup moved here for clarity
    data = request.get_json()
    url = data.get('url')  # Extract URL from the JSON payload
    # url = 'https://www.metacritic.com/music/brat/charli-xcx/critic-reviews'
    user_agent = {'User-agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=user_agent)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract reviews (moved from previous snippet)
    review_dict = {'reviews': []}
    for review in soup.find_all('div', class_='review_content'):
        if review.find('div', class_='review_body'):
            review_text = review.find('div', class_='review_body').text
            cleaned_review = clean_text(review_text)
            processed_review = process_text(cleaned_review)
            review_dict['reviews'].append(processed_review)
    

    # # Create DataFrame (moved from previous snippet)
    album_reviews = pd.DataFrame(review_dict)
    print(url)
    print(album_reviews);

    # # Initialize TF-IDF Vectorizer (moved from previous snippet)
    vectorizer = TfidfVectorizer(max_df=0.95, min_df=2)
    tfidf = vectorizer.fit_transform(album_reviews['reviews'])

    # # Initialize NMF model (moved from previous snippet)
    num_topics = 5  # Number of topics
    nmf_model = NMF(n_components=num_topics, max_iter=500, random_state=42)
    nmf_model.fit(tfidf)

    # Define a route in Flask

        # # Processing (same logic as before, adjusted for Flask context)
        # reviews = []
        # for review in soup.find_all('div', class_='review_content'):
        #     if review.find('div', class_='review_body'):
        #         review_text = review.find('div', class_='review_body').text
        #         cleaned_review = clean_text(review_text)
        #         processed_review = process_text(cleaned_review)
        #         reviews.append(processed_review)

        # # Creating DataFrame
        # album_reviews = pd.DataFrame({'reviews': reviews})

    # # Fit and transform TF-IDF
    # tfidf = vectorizer.transform(album_reviews['reviews'])

    # # Fit NMF model
    # nmf_model.fit(tfidf)

    # # Display top words for each topic
    num_top_words = 5
    feature_names = vectorizer.get_feature_names_out()
    topics = []
    for topic_idx, topic in enumerate(nmf_model.components_):
        topics.append({
            f"Topic {topic_idx}": [feature_names[i] for i in topic.argsort()[:-num_top_words - 1:-1]]
        })

    return jsonify({
        'topics': topics
    })
    # pass

if __name__ == "__main__":
    app.run(debug=True)
