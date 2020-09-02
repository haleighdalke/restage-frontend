import React from "react";
import { Button, Container } from "reactstrap";
import { useHistory } from 'react-router-dom'
import logo from '../assets/img/restage_logo.png'
// import {google} from 'googleapis'

// const {google} = require('googleapis');

const LandingPage = () => {
  let history = useHistory()


  // const {google} = require('googleapis');

// Each API may support multiple version. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.
// const blogger = google.blogger({
//   version: 'v3',
//   auth: 'YOUR API KEY'
// });

// const params = {
//   blogId: '3213900'
// };

// // get the blog details
// blogger.blogs.get(params, (err, res) => {
//   if (err) {
//     console.error(err);
//     throw err;
//   }
//   console.log(`The blog url is ${res.data.url}`);
// });

  // const {google} = require('googleapis');
  // // const apis = google.getSupportedAPIs();
  // console.log(google)


// const path = require('path');
// const {authenticate} = require('@google-cloud/local-auth');

// // initialize the Youtube API library
// const youtube = google.youtube('v3');

// // a very simple example of searching for youtube videos
// async function runSample() {
//   const auth = await authenticate({
//     keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
//     scopes: ['https://www.googleapis.com/auth/youtube'],
//   });
//   google.options({auth});

//   const res = await youtube.search.list({
//     part: 'id,snippet',
//     q: 'Node.js on Google Cloud',
//   });
//   console.log(res.data);
// }

// if (module === require.main) {
//   runSample().catch(console.error);
// }
// module.exports = runSample;

    return (
      <div className="page-header-landing">
            <div className="landing-line-container">
                {/* <hr className="landing-line"/> */}
                <Button className="login-button" onClick={() => history.push('/login')}>Login</Button>
                <Button className="login-button" onClick={() => history.push('/signup')}>Sign Up</Button>
            </div>  
            <div className="landing-logo" >
                <img src={logo} alt="restage"/>
            </div>
      </div>
  );
}

export default LandingPage