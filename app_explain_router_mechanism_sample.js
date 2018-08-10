const express = require('express')
const app = express()

// Case-1
app.all('/api/*', (req, res, next) => {  // match wildcard "/api/*"
  console.log(1, `api`);
  next();
});

app.all('/api/*', (req, res, next) => {  // match wildcard "/api/*"
  console.log(2, `api`);
  next();
});

app.get('/api/', (req, res, next) => {  // only match strict "/api/"
  console.log(3, `api`);
  res.send('Hello World!');
  next();
});

// Case-2
app.get('/api2/', (req, res, next) => {  // match wildcard "/api2/*"
  console.log(1, `api2`);
  res.send('Hello World!');
  next();
});

app.all('/api2/*', (req, res, next) => {  // match strict "/api2/*" because "/api2/*" also startsWith "/api2/"
  console.log(2, `api2`);
  next();
});

app.all('/api2/*', (req, res, next) => {  // match strict "/api2/*" because "/api2/*" also startsWith "/api2/"
  console.log(3, `api2`);
  next();
});

// conclusion
//  1. hoist detailed path to top, and put wildcard path to be final.
//  2. also can hoist wildcard path for middleware purpose and then execute the next() function.

app.listen(3000, () => console.log('Example app listening on port 3000!'));
