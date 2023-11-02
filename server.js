import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()
const pathJoin = path.join(__dirname, 'dist')

app.use(express.static(pathJoin))

app.get('/', function (req, res) {
  res.sendFile(pathJoin + '/index.html')
})

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
