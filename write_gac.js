require('dotenv').config()

const fs = require('fs');

fs.writeFileSync('gac.json' , process.env.GAC_JSON_TOKEN);
