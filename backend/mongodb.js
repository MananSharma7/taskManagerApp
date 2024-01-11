//CRUD is for create read update delete operations

// const mongodb = require("mongodb-legacy");
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { MongoClient, ObjectId } = require("mongodb-legacy");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log("Unable to connect to database!");
	}
	console.log("Connected Successfully");

	const db = client.db(databaseName);

	db.collection("tasks").deleteOne({
		description: "lift weights"
	}).then((result) => {
		console.log(result);
	}).catch((error) => {
		console.log(error);
	})
});
