const Tweeting = require('twit');
const APIs = require('./apis');

var T = new Tweeting({
    consumer_key: APIs.CONSUMER_KEY,
    consumer_secret: APIs.CONSUMER_SECRET,
    access_token: APIs.ACCESS_TOKEN,
    access_token_secret: APIs.ACCESS_SECRET_TOKEN,
    timeout_ms: 60 * 1000,
    strictSSL: true
});

async function TweetingFun() {
    T.post('statuses/update', { status: 'test tweet5' },
        function (err, data, response) {
            console.log(data);
        }
    )
}

setInterval(TweetingFun, 2500);
