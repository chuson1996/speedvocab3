import request from 'superagent';
import config from '../../src/config';

export default function loadAuth(req) {
  /* Step 2: https://quizlet.com/api/2.0/docs/authorization-code-flow */
  const code = req.body.code;

  const fetchUser = (accessToken, userId) => new Promise((resolve, reject) => {
    request
      .get(`https://api.quizlet.com/2.0/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .end((error, res) => {
        if (error) {
          return reject(error);
        }

        const response = JSON.parse(res.text);
        return resolve(response);
      });
  });
  if (!code) {
    const { accessToken, userId } = req.session;
    if (accessToken) {
      return fetchUser(accessToken, userId);
    }
    return Promise.reject({
      status: 400,
      message: 'Code is empty'
    });
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
        return resolve({
          accessToken: req.session.accessToken,
          userId: req.session.userId
        });
      });
  }).then(({ accessToken, userId }) => fetchUser(accessToken, userId));
}
