const { spawn } = require('child_process');

module.exports = (req, res) => {
  const { arg1, arg2 } = req.query;

  // Run the bash script with the specified arguments
  let script;
  if (arg1)
    script = spawn('sh', ['openvpn-install-hardcode.sh', arg1, arg2]);
  else
    script = spawn('sh', ['openvpn-install-hardcode.sh']);

  // Log any output from the script to the console
  script.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  script.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // When the script finishes, send the output as the response to the client
  script.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.json({res: code})
    // res.status(200).send(`Script exited with code ${code}`);
  });
};