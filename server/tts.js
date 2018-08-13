const googleTTS = require('google-tts-api')

module.exports = function(phrase) {
  const promise = new Promise((resolve, reject) => {
    googleTTS(phrase, 'en', 1)
    .then((url) => {
      resolve({ url, phrase })
    })
    .catch((err) => {
      reject(new Error(err.message))
    })
  })
  return promise
}
