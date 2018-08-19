const fs = require('fs')
const textToSpeech = require('@google-cloud/text-to-speech')
const client = new textToSpeech.TextToSpeechClient()

module.exports = async function(phrase, dir) {
  const text = phrase
  const request = {
    input: {text: text},
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    audioConfig: {audioEncoding: 'MP3'},
  }
  const file = dir || `output${new Date().getTime()}.mp3`
  return new Promise((resolve, reject) => {
    client.synthesizeSpeech(request, (err, response) => {
      if (err) {
        reject(err)
      }
      fs.writeFile('./public/mobs/'+file, response.audioContent, 'binary', err => {
        if (err) {
          reject(err)
        }
        resolve({file, text})
      })
    })
  })
}
