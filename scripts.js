const electron = require('electron');
const axios = require('axios');

async function login() {
    const BrowserWindow = electron.remote.BrowserWindow;

    const electronOauth2 = require('electron-oauth2');

    var config = {
        clientId: '',
        clientSecret: '',
        authorizationUrl: '',
        tokenUrl: '',
        useBasicAuthorizationHeader: true,
        redirectUri: 'http://empty'
    };
    const windowParams = {
      alwaysOnTop: true,
      autoHideMenuBar: true,
      webPreferences: {
          nodeIntegration: false
      }
    }
  
    const options = {
      //scope: 'SCOPE',
      //accessType: 'AUTHORIZATION_CODE'
    };
    console.log("beforeapi")
    const myApiOauth = electronOauth2(config, windowParams);
    console.log("afterapi")
  
    myApiOauth.getAccessToken(options)
      .then(token => {
        // use your token.access_token
        myApiOauth.refreshToken(token.refresh_token)
          .then(newToken => {
            //use your new token
          });
      });
}
