'use strict'
require('./check-project').checkProject()

const cp = require('child_process')
let cmd = `cross-env PROJECT_ENV=${process.env.PROJECT_ENV} webpack-dev-server --inline --progress --config build/webpack.dev.conf.js`
let dev = cp.exec(cmd, {detached: true}, (error, stdout, stderr)=>{
    if(error) console.log(error);
})
dev.stdout.pipe(process.stdout)
dev.stderr.pipe(process.stderr)