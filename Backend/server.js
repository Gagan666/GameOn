const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');


const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(express.json());


// Connect to MongoDB Atlas
const connectionString = 'mongodb+srv://vij:vijith@cluster0.d2yq6pg.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Define and use routes
const auth = require('./routes/auth'); // Create this file with your route definitions
const rooms = require('./routes/rooms')
const messages = require('./routes/messages')
app.use('/api', auth);
app.use('/api', rooms);
app.use('/api',messages)
const Message = require('./models/communication');
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  
    socket.on('chat message', (message) => {
        // Store the message in the database
        // const messageString = message.toString();
        const newMessage = new Message({ content: message.content,roomID:message.roomID,sender:message.sender });
        console.log(message)
        newMessage.save();
        io.emit('chat message', message);
    })
  });
 
server.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});



