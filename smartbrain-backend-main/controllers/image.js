const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.API_KEY
});

const handleApiCall = (req, res) => {
  app.models
    // Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    // If that isn't working, then use a different version of their model to try and get it working.
    // So you would change from:
    // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    // to:
    // .predict('53e1df302c079b3db8a0a36033ed2d15', req.body.input)
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}