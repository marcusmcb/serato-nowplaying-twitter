const Twit = require('twit')
const dotenv = require('dotenv')
const axios = require('axios')
const cheerio = require('cheerio')

dotenv.config()

var currentTrack = ''

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const seratoPlaylistScrape = async () => {
  const url = 'https://serato.com/playlists/DJ_Marcus_McBride/live'
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const results = $('div.playlist-trackname')
    let currentSong = results.last().text()
    let tweet = { status: `${currentSong.trim()}` }
    return tweet
  } catch (err) {
    console.error(err)
  }
}

const tweetIt = () => {
  seratoPlaylistScrape().then((response) => {
    console.log('- - - - - - - - - - - - - - -')
    console.log('RESPONSE: ', response.status)
    if (response.status !== currentTrack) {
      // set currentTrack to newly scraped track if different
      currentTrack = response.status
      // callback to handle twitter response
      let tweeted = (err, data, response) => {
        if (err) {
          console.log('ERROR: ', err.allErrors[0].message)
        } else {
          console.log(
            'NEW TWEET SUCCESSFULLY POSTED @',
            new Date().toLocaleString()
          )
          console.log("Twitter Response: ", response)
        }
      }
      T.post('statuses/update', response, tweeted)
      return
    } else {
      return
    }
  })
}

tweetIt()
setInterval(() => {
  tweetIt()
}, 30000)
