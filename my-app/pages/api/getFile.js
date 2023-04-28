import fs from 'fs'
import path from 'path'

export default function download(req, res) {
  const { filename } = req.query
  const filePath = path.join(process.cwd(), 'pages', 'api', filename)
  const stat = fs.statSync(filePath)

  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename=${filename}`,
    'Content-Length': stat.size
  })

  const readStream = fs.createReadStream(filePath)
  readStream.pipe(res)
}