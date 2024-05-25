import fs from 'fs'
import ytdl from 'ytdl-core'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const askForVideoUrl = () => {
  rl.question('Enter the video URL: ', async (videoUrl) => {
    await downloadByVideoUrl(videoUrl)
    askForVideoUrl()
  })
}

askForVideoUrl();

const downloadByVideoUrl = async (videoUrl) => {
  const downloadsFolder = './downloads'
  if (!fs.existsSync(downloadsFolder)) {
    fs.mkdirSync('./downloads')
  }
  const id = ytdl.getURLVideoID(videoUrl)
  const info = await ytdl.getInfo(id)
  const videos = info.formats.filter((format) => format.hasVideo)
  const itag18 = videos.find((video) => video.itag === 18)
  const url = itag18.url
  const filename = info.videoDetails.title + '.mp4'
  console.log('Downloading', filename)
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  fs.writeFileSync(`${downloadsFolder}/${filename}`, Buffer.from(buffer))
}
