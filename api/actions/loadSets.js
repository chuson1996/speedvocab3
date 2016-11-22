import request from 'superagent';

export default function loadSets(req) {
  const { accessToken, userId } = req.session;
  if (!(accessToken && userId)) {
    return Promise.reject('Access token is expired');
  }

  return new Promise((resolve, reject) => {
    request
      .get(`https://api.quizlet.com/2.0/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .end((error, res) => {
        if (error) {
          return reject(error);
        }

        const response = JSON.parse(res.text);
        return resolve(response.sets);
      });
  });
}
