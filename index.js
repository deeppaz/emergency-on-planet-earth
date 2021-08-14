const Tweeting = require('twit');
const fs = require('fs');
const customId = require('custom-id');
const imageDownloader = require('node-image-downloader')

const postData = require('./data/naturephotos.js');
const APIs = require('./apis');
const Hashtags = require('./hashtags');

var posted = [];
var readyToPost = postData.posts;

//CLEAR TERMINAL
process.stdout.write('\x1B[2J\x1B[0f');
console.log("wait getting ready...")

//RANDOM HASHTAGS BY LIST
console.log("Hashtag: " + Hashtags());

////////////////////////////TEXT TWEET TO TWITTER//////////////////////////////

//API
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
        status: 'emergency on planet earth ' + Hashtags() + ' ' + '(' + customId({
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
setInterval(TweetingFun, 360000);
////////////////////////////TEXT TWEET TO TWITTER END/////////////////////////

////////////////////////////IMAGE TWEET TO TWITTER//////////////////////////////
//POST THE IMAGE ON TWITTER
async function TweetImageFunction() {
    var currentPost = readyToPost.pop();
    posted.push(currentPost);

    var T = new Tweeting(
        {
            consumer_key: APIs.CONSUMER_KEY,
            consumer_secret: APIs.CONSUMER_SECRET,
            access_token: APIs.ACCESS_TOKEN,
            access_token_secret: APIs.ACCESS_SECRET_TOKEN,
        }
    );

    var myimage = currentPost.photo_url_1280

    imageDownloader({
        imgs: [
            {
                uri: myimage
            }
        ],
        dest: './data/testdata', //destination folder
    }).then((info) => {
            console.log('all done in twitter function', info);
            var photoTwitter = fs.readFileSync('./data/testdata' + '/' + currentPost.photo_url_1280.split("/").pop(), { encoding: 'base64' });

            // var twittertag = JSON.parse(JSON.stringify(currentPost.tags.toString()));

            T.post('media/upload', { media_data: photoTwitter }, uploaded);

            function uploaded(err, data, response) {
                var mediaIdStr = data.media_id_string;
                var params = { status: "by " + currentPost.photo_caption.split(/[\(<p></p>\+\(,)\)]+/), media_ids: [mediaIdStr] }
                T.post('statuses/update', params, tweeted);
            };

            function tweeted(err, data, response) {
                if (err) {
                    console.log(err);
                } else {
                    var now = getDateTime()
                    var charAyir = currentPost.photo_url_1280.split("/")
                    console.log('posted to twitter: ' + now + ": " + data.text);
                    // MOVE IMAGE TO ANOTHER FOLDER AS
                    fs.renameSync('./data/testdata' + "/" + charAyir[4], './data/testdata' + "/postedbefore/" + charAyir[4]);
                }
            };
        }).catch((error, response, body) => {
            console.log('something goes bad in twitter function!')
            console.log(error)
        })
};

//TIMER
setInterval(TweetImageFunction, 2600);

////////////////////////////IMAGE TWEET TO TWITTER END/////////////////////////

//GET DATE TIME AFTER POST
function getDateTime() {
    var date = new Date();
    var hour = date.getHours(); hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes(); min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds(); sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear(); year = (month < 10 ? "0" : "") + year;
    var month = date.getMonth() + 1; month = (month < 10 ? "0" : "") + month;
    var day = date.getDate(); day = (day < 10 ? "0" : "") + day;
    return hour + ":" + min + ":" + sec;
}
