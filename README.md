# word-smith
**Rhyme**: Find 10 words that rhyme with your input word.

**Topic**: Find 10 adjectives that describe your input word (topic)

<h2>How to use word-smith?</h2>
Enter a word from the English-language in the input box to display 10 English-language words that rhyme with your word.

Utilized the XMLHttpRequest (XHR) web API to make a GET request to the Datamuse API to find words that rhyme and used AJAX to handle the data from the request.

Future work
This is v1.2 of word-smith, which was created by Brian Nwaeke.
Ongoing work for /v2/ is focused on the following areas:

→ Create a request to set a topic and find adjectives that describe the input word using query strings. (✅)

→ This resource is useful as a backend for “autocomplete” widgets on websites and apps when the vocabulary of possible search terms is very large. It provides word suggestions given a partially-entered query using a combination of the operations described in the “/words” resource above. 

→ The suggestions perform live spelling correction and intelligently fall back to choices that are phonetically or semantically similar when an exact prefix match can't be found.


<h2>What is the Datamuse API?</h2>
The Datamuse API is a word-finding query engine for developers. You can use it in your apps to find words that match a given set of constraints and that are likely in a given context. You can specify a wide variety of constraints on meaning, spelling, sound, and vocabulary in your queries, in any combination.

The API gives you programmatic access to most of the functionality of Datamuse's websites, including OneLook, RhymeZone, Rimar.io, and WikSearch.

<h2>What is it good for?</h2>
Applications use the API for a wide range of features, including autocomplete on text input fields, search relevancy ranking, assistive writing apps, word games, and more. The following examples illustrate the kinds of queries you can make:

![4D52766C-C453-4FD1-A90C-9070656F086B](https://user-images.githubusercontent.com/94656081/145165402-af703eb2-ec6e-4e94-87df-2bda1d9ff787.jpeg)


<h3>How can I use it?</h3>
You can access most of the features of the API at the URL api.datamuse.com/words, with the query parameters described below. An additional endpoint, api.datamuse.com/sug, is useful as a backend for an autocomplete function on search input fields. This is a strictly read-only service and an API token is not required. The service supports both HTTP and HTTPS requests.


<h3>/words endpoint</h3>
This endpoint returns a list of words (and multiword expressions) from a given vocabulary that match a given set of constraints.

In the table below, the first four parameters (rd, sl, sp, rel_[code], and v) can be thought of as hard constraints on the result set, while the next three (topics, lc, and rc) can be thought of as context hints. The latter only impact the order in which results are returned. All parameters are optional.

<h4>Query parameters</h4>

_ml_	**Means like constraint**: require that the results have a meaning related to this string value, which can be any word or sequence of words. (This is effectively the reverse dictionary feature of OneLook.)

_sl_	**Sounds like constraint**: require that the results are pronounced similarly to this string of characters. (If the string of characters doesn't have a known pronunciation, the system will make its best guess using a text-to-phonemes algorithm.)

_sp_	**Spelled like constraint**: require that the results are spelled similarly to this string of characters, or that they match this wildcard pattern. A pattern can include any combination of alphanumeric characters, spaces, and two reserved characters that represent placeholders — * (which matches any number of characters) and ? (which matches exactly one character).

_rel_[code]_:	**Related word constraints**: require that the results, when paired with the word in this parameter, are in a predefined lexical relation indicated by [code]. Any number of these parameters may be specified any number of times. An assortment of semantic, phonetic, and corpus-statistics-based relations are available. At this time, these relations are available for English-language vocabularies only.

[code] is a three-letter identifier from the list below:

![4E0D28EC-3AA2-4598-AB4B-F2FD5C0449B2](https://user-images.githubusercontent.com/94656081/145166081-9edee50d-81e1-48e5-af8d-5c44efc7654b.jpeg)

_v_	Identifier for the vocabulary to use. If none is provided, a 550,000-term vocabulary of English words and multiword expressions is used. (The value es specifies a 500,000-term vocabulary of words from Spanish-language books. The value enwiki specifies an approximately 6 million-term vocabulary of article titles from the English-language Wikipedia, updated monthly.) Please contact us to set up a custom vocabulary for your application.

_topics_	**Topic words**: An optional hint to the system about the theme of the document being written. Results will be skewed toward these topics. At most 5 words can be specified. Space or comma delimited. Nouns work best.

_lc_	**Left context**: An optional hint to the system about the word that appears immediately to the left of the target word in a sentence. (At this time, only a single word may be specified.)

_rc_	**Right context**: An optional hint to the system about the word that appears immediately to the right of the target word in a sentence. (At this time, only a single word may be specified.)

_max_	Maximum number of results to return, not to exceed 1000. (default: 100)

_md_	**Metadata flags**: A list of single-letter codes (no delimiter) requesting that extra lexical knowledge be included with the results. The available metadata codes are as follows:

![638A37BF-DC5B-412A-A186-7953652FFAE5](https://user-images.githubusercontent.com/94656081/145166139-ecb882f2-6c28-41f6-b934-5aaa94bf7371.jpeg)

**qe:**	Query echo: The presence of this parameter asks the system to prepend a result to the output that describes the query string from some other parameter, specified as the argument value. This is useful for looking up metadata about specific words. For example, /words?sp=flower&qe=sp&md=fr can be used to get the pronunciation and word frequency for flower.

<h3>/sug endpoint</h3>
This resource is useful as a backend for “autocomplete” widgets on websites and apps when the vocabulary of possible search terms is very large. It provides word suggestions given a partially-entered query using a combination of the operations described in the “/words” resource above. The suggestions perform live spelling correction and intelligently fall back to choices that are phonetically or semantically similar when an exact prefix match can't be found. Here is a Wikipedia search box that demonstrates this endpoint in action:   

The endpoint produces JSON output similar to the /words resource and is suitable for widgets such as JQuery Autocomplete, used in the above demo.

<h4>Query parameters</h4>
_s_	**Prefix hint string**; typically, the characters that the user has entered so far into a search box. (Note: The results are sorted by a measure of popularity. The results may include spell-corrections of the prefix hint or semantically similar terms when exact matches cannot be found; that is to say, the prefix hint will not necessarily form a prefix of each result.)

_max_	Maximum number of results to return, not to exceed 1000. (default: 10)

_v_	Identifier for the vocabulary to use. Equivalent to the v parameter in /words.

<h4>Interpreting the results</h4>
For both /words and /sug, the result of an API call is always a JSON list of word objects, like so:

$ curl "https://api.datamuse.com/words?ml=ringing+in+the+ears&max=4" | python -mjson.tool

[  
   {  
      "word":"tinnitus",
      "score":57312
   },
   {  
      "word":"ring",
      "score":50952
   },
   {  
      "word":"cinchonism",
      "score":50552
   },
   {  
      "word":"acouasm",
      "score":48952
   }
]

Each list item is an object that contains the matching vocabulary entry ("word") and some metadata, currently just an integer score. An empty list ([]) will be returned if no words or phrases are found that match your constraints. Note that popular multiword expressions like "hot dog" are included in the default vocabulary, and these will appear as space-delimited strings.

For queries that have a semantic constraint, results are ordered by an estimate of the strength of the relationship, most to least. Otherwise, queries are ranked by an estimate of the popularity of the word in written text, most to least. At this time, the "score" field has no interpretable meaning, other than as a way to rank the results.

<h4>Usage limits</h4>
You can use this service without restriction and without an API key for up to 100,000 requests per day. Please be aware that beyond that limit, requests may be rate-limited without notice. If you'd like to use this in a customer-facing application, or if you need a custom vocabulary, or if you plan to make more than 100,000 requests per day, please describe your application (and a traffic estimate) in a message to us. (Note: While we are committed keeping the API freely available for the foreseeable future, we cannot commit to any improvements and may not be able to respond to all support requests.)

If you use the API within a publicly available app, kindly acknowledge the Datamuse API within your app's documentation. Here are some examples of projects that we know about which use the Datamuse API.

<h4>Privacy</h4>
The Datamuse API servers keep a log of the queries made to the service in the last 24 hours, but not beyond that. We save no long-term usage data other than a count of the number of requests broken out by the broad category of the request.

<h4>Data sources</h4>
The Datamuse API leans on many freely available data sources to do its work:

**Phonetic data**: The CMU pronouncing dictionary is used as a source of phonetic transcriptions for the "sounds-like" constraint and for the various English-language phonetic relations such as perfect rhymes and homophones. The "approximate rhymes" constraint ("rel_nry") is based on this data as well as an analysis of lyrics and poetry on the Web (via the Common Crawl).

**Corpus-based data**: The Google Books Ngrams data set is used to build the language model that scores candidate words by context, and also for some of the lexical relations. word2vec is used for reranking result sets by topic (the "topics" parameter). word2vec as well as the excellent Paraphrase Database are used to backfill the results for single-word "means-like" constraints (the "ml" parameter); in particular, the "XXL" lexical paraphrases are used, without modification.

**Semantic knowledge**: WordNet 3.0 is used for several of the static semantic lexical relations. For the "means-like" ("ml") constraint, dozens of online dictionaries crawled by OneLook are used in addition to WordNet.


