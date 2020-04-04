const electron = require('electron');
const axios = require('axios');

function login() {
    const BrowserWindow = electron.remote.BrowserWindow;

    var options = {
        client_id: '',
        client_secret: '',
        redirect_uri: 'http://empty'
        // scopes: ["user:email", "notifications"] // Scopes limit access for OAuth tokens.
    };
    
    // Build the OAuth consent page URL
    var authWindow = new BrowserWindow({
        width: 800,
        height: 600, 
        show: false, 
        webPreferences: {
            nodeIntegration: false
        }
    });
    var authUrl = '';
    //var authUrl = fireflyUrl + 'client_id=' + options.client_id + '&redirect_uri=' + options.redirect_uri;
    authWindow.loadURL(authUrl);
    authWindow.show();
    
    function handleCallback (url) {
      var raw_code = /code=([^&]*)/.exec(url) || null;
      var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
      var error = /\?error=(.+)$/.exec(url);
    
      if (code || error) {
        // Close the browser if code found or error
        authWindow.destroy();
      }
    
      // If there is a code, proceed to get token from firefly
      if (code) {
        self.requestFireflyToken(options, code);
      } else if (error) {
        alert('Oops! Something went wrong and we couldn\'t' +
          'log you in using Firefly. Please try again.');
      }
    }

    authWindow.webContents.on('will-navigate', function (event, url) {
        handleCallback(url);
      });
    
    // Reset the authWindow on close
    authWindow.on('close', function() {
        authWindow = null;
    }, false);
}

function requestFireflyToken(options, code) {
    axios.post('', {
        client_id: options.client_id,
        client_secret: options.client_secret,
        code: code,
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    })
}
