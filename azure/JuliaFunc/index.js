const { spawn } = require('child_process');

module.exports = function (context, req) {
    const script = req.query.script;

    console.log(`Executing julia script named ${script}`);

    // todo - container script pathing

    const process = spawn(`julia ${script}`);

    process.stdout.on('data', console.log);
    process.stderr.on('data', console.error);

    process.on('close', (code) => {
        const body = `child process exited with code ${code}`;
        context.res = {body: body};
        context.done(body);
    });
};