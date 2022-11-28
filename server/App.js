import child_process from 'child_process';
import config from '../client/src/config/main.js';

child_process.exec('node Server.js', (err, stdout, stderr) => {  
    if (err) {  
      throw new Error(err);  
    }  
  })