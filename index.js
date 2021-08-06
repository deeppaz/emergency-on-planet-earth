const Tweeting = require('twit');
const APIs = require('./apis');
const customId = require('custom-id');

//GENERATING RANDOM AND CUSTOM ID
let GenerateRandomID = customId({
    uniqueId: 500,
    randomLength: 1,
    lowerCase: true
})

var T = new Tweeting({
    consumer_key: APIs.CONSUMER_KEY,
    consumer_secret: APIs.CONSUMER_SECRET,
    access_token: APIs.ACCESS_TOKEN,
    access_token_secret: APIs.ACCESS_SECRET_TOKEN,
    timeout_ms: 60 * 1000,
    strictSSL: true
});

//POST TO TWITTER
async function TweetingFun() {
    T.post('statuses/update', {
        status: 'emergency on planet earth ' + '(' + customId({
            uniqueId: 500,
            randomLength: 1,
            lowerCase: true
        }) + ')' + ''
    },
        function (err, data, response) {
            console.log(data);
        }
    )
}

//TIMER
setInterval(TweetingFun, 2500);
