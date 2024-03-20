# Flashcard-App
A local school has decided to put together a flash card application, Flashcard-o-matic, to help their students study online. Teachers will use this application to create decks of flash cards for the subjects that they teach, and students will study the decks. The school needs you to build the application that the students and teachers will use. Users can create and delete decks, cards, and study decks of cards as well.

### Learning objectives
This project is designed to test your ability to work with rendering and state management using React. Before taking on this project, you should be comfortable with the learning objectives listed below:

- Installing packages via NPM
- Running tests from the command line
- Writing React function components
- Creating routes, including nested routes, using React Router
- Using hooks like useState(), useParams(), and useHistory()
- Debugging React code through console output and using the VS Code debugger

Follow the instructions below to get this project up and running on your own machine:

Run `npm install` to install the project.

`npm test`
Most of the tests in this project wait for content to load via the API before continuing the test. Before the implementation is complete, the content never loads so the test fails with a timeout. As a result, the tests will initially run slowly. It may take perhaps a minute or more for all the tests run. The tests will speed up as the implementation nears completion.

You can run the application using the following command.

`npm start`
The start command will start two servers concurrently:

An API server, powered by json-server, running on http://localhost:5000
A React application running on http://localhost:3000
To stop the servers from running, you can `press Control+C.`

Running on Windows
If you are having problems running npm start on Windows, you may need to run the React client and server in separate terminals. 
Open a terminal and run `npm run start:react` to start the react application. Open another terminal and run `npm run start:server` to run the server.

![FlashcardApp](https://images.ctfassets.net/c7lxnbtvvcxm/6EQ6qCokZfPfkoU0MkT7EF/e310f418a00c85ca0065fed2a67850f9/Flashcard-o-matic.png)
