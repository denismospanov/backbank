const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');

app.use(express.static('public'));
app.use(cors());

app.get('/account/create/:name/:email/:password', function(req, res, next) {
  dal.create(req.params.name, req.params.email, req.params.password)
    .then(user => {
      console.log(user);
      res.send(user);
    })
    .catch(next); // Pass the error to the error handling middleware
});

app.get('/account/all', function(req, res, next) {
  dal.all()
    .then(docs => {
      console.log(docs);
      res.send(docs);
    })
    .catch(next); // Pass the error to the error handling middleware
});

app.get('/account/update/:email/:amount', function(req, res, next) {
    dal.update(req.params.email, parseFloat(req.params.amount))
      .then(updatedDoc => {
        console.log(updatedDoc);
        res.send(updatedDoc);
      })
      .catch(next); // Pass the error to the error handling middleware
  });
  
  app.get('/account/find/:email', function(req, res, next) {
    dal.find(req.params.email)
      .then(docs => {
        console.log(docs);
        res.send(docs);
      })
      .catch(next); // Pass the error to the error handling middleware
  });
  
  app.delete('/account/delete/:email', function(req, res, next) {
    dal.deleteUser(req.params.email)
      .then(result => {
        console.log('User deleted:', result);
        res.send('User deleted');
      })
      .catch(next); // Pass the error to the error handling middleware
  });
  
  app.get('/account/check/:email/:password', function(req, res, next) {
    const { email, password } = req.params;
  
    dal.find(email)
      .then(docs => {
        if (docs.length === 0) {
          res.status(401).send('Invalid credentials'); // No matching email found
        } else {
          const user = docs[0];
          if (user.password === password) {
            res.status(200).send({ email: user.email, password: user.password });
          } else {
            res.status(401).send('Invalid credentials'); // Password does not match
          }
        }
      })
      .catch(next); // Pass the error to the error handling middleware
  });
  
  app.get('/account/checkemail/:email', (req, res) => {
    const email = req.params.email;
  
    // Check if the email exists in the database
    dal.find(email)
      .then(docs => {
        if (docs.length === 0) {
          res.status(404).json({ message: 'Email does not exist in the database' });
        } else {
          res.status(200).json({ message: 'Email exists in the database' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Error checking email existence in the database' });
      });
  });
  
  
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

const port = 3000;
app.listen(port, function() {
  console.log('Running on port: ' + port);
});
