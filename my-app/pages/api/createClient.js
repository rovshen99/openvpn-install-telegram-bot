import { spawn } from 'child_process'

export default function runScript(req, res) {
  const { arg1, arg2 } = req.query
  const scriptPath = path.join(process.cwd(), 'pages', 'api', 'openvpn-install-hardcode.sh')

  const scriptProcess = spawn(scriptPath, [arg1, arg2])

  scriptProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  scriptProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  scriptProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Script process exited with code ${code}`)
      res.status(500).send('An error occurred while running the script.')
    } else {
      console.log('The script has been executed successfully.')
      res.send('The script has been executed successfully.')
    }
  })
}
