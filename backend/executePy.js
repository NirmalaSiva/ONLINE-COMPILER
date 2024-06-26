const { exec } = require("child_process");

const executePy = (filepath) => {
  console.log('printing python ');
   return new Promise((resolve,reject)=>{
    exec (
        `python ${filepath} `,
          (error, stdout, stderr) => {
            error && reject({error, stderr});
            stderr && reject(stderr);
            resolve(stdout);
          }
          );
   });
};

module.exports = {
    executePy,
};