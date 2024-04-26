import fs from 'fs'
import ytdl from 'ytdl-core'

const id = process.argv[2]

if (!id) {
  console.log('Usage: node index.js <video-id>')
  process.exit(1)
}

const info = await ytdl.getInfo(id)
const videos = info.formats.filter((format) => format.hasVideo)
const itag18 = videos.find((video) => video.itag === 18)
const url = itag18.url
const filename = info.videoDetails.title + '.mp4'
console.log('Downloading', filename)
const response = await fetch(url)
const buffer = await response.arrayBuffer()
fs.writeFileSync(filename, Buffer.from(buffer))
