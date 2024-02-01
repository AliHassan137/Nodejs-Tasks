// Task 1: Asynchronous Operations
const asyncOperations = require('./src/controllers/asyncOperations');

const urlsToDownload = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://www.example.com'
  ];
asyncOperations.downloadContents(urlsToDownload)
  .then((downloadedContents) => {
    console.log('Downloaded contents:', downloadedContents);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Task 2: Error Handling
const errorHandling = require('./src/controllers/errorHandling');

const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
errorHandling.fetchDataFromAPI(apiUrl)
  .then((data) => {
    console.log('handling data: ', data)
  })
  .catch((error) => {
    console.error('error: ', error)
  });

// Task 3: File System Operations
const fileSystemOperations = require('./src/controllers/fileSystemOperations');

const directoryPath = __dirname;
const fileExtension = 'txt';
const txtFiles = fileSystemOperations.listFilesWithExtension(directoryPath, fileExtension);
console.log(`List of .${fileExtension} files:`, txtFiles);

// Task 4 and 5: Database Interaction and Authentication
const databaseInteraction = require('./src/controllers/databaseInteraction');

databaseInteraction.setupServer();
