const express = require('express');
const app = express();
const port = 4000;
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(
  expressJwt({
    secret: 'secret12345', // 签名的密钥 或 PublicKey
    algorithms: ['HS256'],
  }).unless({
    path: ['/login', '/signup', '/second'], // 指定路径不经过 Token 解析
  }),
);

// Specify the url prefix and import routes
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
