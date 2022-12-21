/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

 // module.exports = (on, config) => {
    // on('before:browser:launch', (browser = {}, args) => {
    //   const ext_path = require('path').join( __dirname, '..', 'extensions', 'ignoreXFrameHeaders', '1.1_0' );
  
    //   args = require('cypress-log-to-output').browserLaunchHandler(browser, args);
  
    //   if (browser.name === 'chrome') {
    //     args.push('--load-extension=' + ext_path);
    //     args.push('--disable-gpu');
    //     args.push('--auth-server-whitelist=_');
    //     return args;
    //   }
    // });

    const {
      addMatchImageSnapshotPlugin,
    } = require('cypress-image-snapshot/plugin');
  

    module.exports = (on, config) => {
    on('task', { queryDb: query => { return queryTestDb(query, config) }, }); //For running sql query

    on('task', {
    
      log(message) {
        var cDate = new Date(); 
        console.log('\t @ ' + (cDate.getHours()).toString() + ':'
         + cDate.getMinutes().toString()+ ':' + cDate.getSeconds().toString()+'s' + ' >>>>>> ' + message)
        return null
      }

    });

  

    addMatchImageSnapshotPlugin(on, config);
    require('cypress-mochawesome-reporter/plugin')(on);


  };


  //       Cypress  Image   Snapshot
  //For connecting to SQL Server
const mysql = require('mysql')
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}


   // or, if there is already a before:browser:launch handler, use .browserLaunchHandler inside of it
   // @see https://github.com/flotwig/cypress-log-to-output/issues/5
  

// require('@applitools/eyes-cypress')(module);


// const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  
// const exec = require('child_process').execSync;  
// module.exports = (on) => {  
//   on('before:run', async (details) => {  
//     console.log('override before:run');  
//     await beforeRunHook(details);  
//     //If you are using other than Windows remove below two lines  
//     await exec("IF EXIST cypress\\screenshots rmdir /Q /S cypress\\screenshots")  ;
//     await exec("IF EXIST cypress\\reports rmdir /Q /S cypress\\reports") ; 
//     return null;
//   });

// on('after:run', async () => {  
//     console.log('override after:run');  
//     //if you are using other than Windows remove below line starts with await exec  
//     await exec("npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml");  
//     await afterRunHook();  
//     return null;
//   });  
// };                                            
