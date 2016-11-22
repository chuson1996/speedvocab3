import request from 'superagent';
import config from '../../src/config';

export default function loadAuth(req) {
  /* Step 2: https://quizlet.com/api/2.0/docs/authorization-code-flow */
  const code = req.body.code;
  if (!code) {
    return Promise.reject('Code is empty');
  }

  const redirectUri = config.auth.quizlet.redirectUri;
  const clientId = config.auth.quizlet.clientId;
  const clientSecret = config.auth.quizlet.clientSecret;
  return new Promise((resolve, reject) => {
    request
      .post('https://api.quizlet.com/oauth/token')
      .send({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        Authorization: `Basic ${new Buffer(`${clientId}:${clientSecret}`).toString('base64')}`
      })
      .set('Authorization', `Basic ${new Buffer(`${clientId}:${clientSecret}`).toString('base64')}`)
      .end((error, res) => {
        if (error) {
          return reject(error);
        }

        const response = JSON.parse(res.text);
        req.session.accessToken = response.access_token;
        req.session.userId = response.user_id;
        console.log(req.session);
        return resolve(response);
      });
  });
}
