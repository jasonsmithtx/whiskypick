const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 3001);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'client/build/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
