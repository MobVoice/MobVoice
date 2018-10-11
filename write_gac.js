require('dotenv').config()

const fs = require('fs')
console.log(process.env.GAC_JSON_TOKEN)
fs.writeFileSync('gac.json', process.env.GAC_JSON_TOKEN)

