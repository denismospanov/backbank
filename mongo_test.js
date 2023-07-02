const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'badbank';

(async () => {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Connected!');
  
    const db = client.db(dbName);
  
    // New user
    const name = 'user' + Math.floor(Math.random() * 10000);
    const email = name + '@mit.edu';
  
    // Insert into customer table
    const collection = db.collection('customers');
    const doc = { name, email };
  
    const result = await collection.insertOne(doc);
    console.log('Document inserted:', result.insertedId);

    const customers = await collection.find().toArray();
    console.log('Collection:', customers);
  
    client.close();
  } catch (err) {
    console.error('Error:', err);
  }
})();
