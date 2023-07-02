const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://denis:cookiemonster123@cluster0.0yh6qce.mongodb.net/?retryWrites=true&w=majority";
let client; // Updated: Declare the client variable

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const clientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

async function connectToDB() {
  try {
    client = new MongoClient(uri, clientOptions); // Updated: Create the MongoClient instance
    await client.connect(); // Updated: Connect the client to the MongoDB Atlas cluster
    console.log('Connected successfully to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

connectToDB();

// Create user account
async function create(name, email, password) {
  try {
    const collection = client.db('badbank').collection('users'); // Updated: Access the collection using the client object
    const doc = { name, email, password, balance: 0 };
    const result = await collection.insertOne(doc);
    return doc;
  } catch (err) {
    throw err;
  }
}

// Find user account
async function find(email) {
  try {
    const collection = client.db('badbank').collection('users'); // Updated: Access the collection using the client object
    const docs = await collection.find({ email: email }).toArray();
    return docs;
  } catch (err) {
    throw err;
  }
}

// Find one user account
async function findOne(email) {
  try {
    const collection = client.db('badbank').collection('users'); // Updated: Access the collection using the client object
    const doc = await collection.findOne({ email: email });
    return doc;
  } catch (err) {
    throw err;
  }
}

// Update - deposit/withdraw amount
async function update(email, amount) {
  try {
    const collection = client.db('badbank').collection('users'); // Updated: Access the collection using the client object
    const documents = await collection.findOneAndUpdate(
      { email: email },
      { $inc: { balance: amount } },
      { returnOriginal: false }
    );
    return documents;
  } catch (err) {
    throw err;
  }
}

// Get all users
async function all() {
  try {
    const collection = client.db('badbank').collection('users'); // Updated: Access the collection using the client object
    const docs = await collection.find({}).toArray();
    return docs;
  } catch (err) {
    throw err;
  }
}

// Delete user account
async function deleteUser(email) {
  try {
    const collection = client.db('badbank').collection('users'); // Updated: Access the collection using the client object
    const result = await collection.deleteOne({ email: email });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = { create, findOne, find, update, all, deleteUser };
