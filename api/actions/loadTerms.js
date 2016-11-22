import request from 'superagent';

export default function loadTerms(req) {
  const setId = req.query.setId;
  if (!setId) {
    return Promise.reject({
      status: 401,
      message: 'Access token is expired'
    });
  }

  const { accessToken } = req.session;
  if (!accessToken) {
    return Promise.reject('Access token is expired');
  }

  return new Promise((resolve, reject) => {
    request
      .get(`https://api.quizlet.com/2.0/sets/${setId}/terms`)
      .set('Authorization', `Bearer ${accessToken}`)
      .end((error, res) => {
        if (error) {
          return reject(error);
        }

        const response = JSON.parse(res.text);
        return resolve(response);
      });
  });
}
