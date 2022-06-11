const errorWeb = {
    unAuthorizedPage: function(){
        return `
        <!doctype html>
        <html>
          <head>
            <title>401 Unauthorized</title>
            <link rel="stylesheet" href="./css/styles.css"/>
            <link rel="stylesheet" href="./css/unauthorized.css"/>
          </head>
          <body>
            <div id="unauthorized-page">
                <h1 class="error-title">Unauthorized User</h1>
                <p class="error-description">The user is not authorized to sign up. Please try again. </p>
                <a href="/" class="home-link">Home</a>
            </div>
          </body>
        </html>
        `
    }
}

module.exports = errorWeb;