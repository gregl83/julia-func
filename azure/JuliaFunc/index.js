const { spawn } = require('child_process');

module.exports = function (context, req) {
    const script = req.query.script;

    console.log(`Executing julia script named ${script}`);

    // fixme - script name should not allow relative paths (security!!!)

    const subprocess = spawn('julia', [script]);

    subprocess.stdout.on('data', data => {
        console.log(`${data}`);
    });

    subprocess.stderr.on('data', data => {
        console.error(`${data}`);
    });

    subprocess.on('close', (code) => {
        context.res = {
            body: {
                message: `child process exited with code ${code}`
            }
        };
        context.done();
    });
};