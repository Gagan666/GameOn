const express = require('express');
const router = express.Router();
const Room = require('../models/rooms.model.js'); // Import the Mongoose model
const Message = require('../models/communication.js')

router.post('/join-room', async (req, res) => {
  try {
    const { playerName, roomID } = req.body;

    // Check if the room with the provided roomID exists
    const room = await Room.findById(roomID);

    if (!room) {
      return res.status(404).json({ status: 404, message: 'Room not found' });
    }

    // Check if there are available slots (playersNeeded > 0)
    if (room.playersNeeded === 0) {
      return res.status(400).json({ status: 400, message: 'Room is full' });
    }

    // Update the room document to add the player's name to the players array
    room.players.push(playerName);
    // Decrement playersNeeded by 1
    room.playersNeeded--;

    // Save the updated room document
    await room.save();

    res.status(200).json({ status: 200, message: 'Joined room successfully' });
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({ status: 500, message: 'Could not join room' });
  }
});
router.post('/leave-room', async (req, res) => {
  try {
    const { playerName, roomID } = req.body;
    console.log(playerName,roomID)
    // Check if the room with the provided roomID exists
    const room = await Room.findById(roomID);
    
    if (!room) {
      return res.status(404).json({ status: 404, message: 'Room not found' });
    }

    // Check if the player's name is in the players array
    const playerIndex = room.players.indexOf(playerName);
    console.log(playerIndex)
    if (playerIndex === -1) {
      return res.status(400).json({ status: 400, message: 'Player not found in the room' });
    }

    // Remove the player's name from the players array
    // Remove the player's name from the players array
    room.players = room.players.filter(player => player !== playerName);
    console.log(room.players)
    // Increment playersNeeded by 1
    room.playersNeeded++;

    // Save the updated room document
    await room.save();

    res.status(200).json({ status: 200, message: 'Left room successfully' });
  } catch (error) {
    console.error('Error leaving room:', error);
    res.status(500).json({ status: 500, message: 'Could not leave room' });
  }
});


router.post('/create-room', async (req, res) => {
  try {
    // Extract room details from the request body
    console.log(req.body);
    const { gameName, location, playersNeeded,players } = req.body;

    // Create a new room instance
    const newRoom = new Room({
      gameName,
      location,
      playersNeeded,
      players
    });

    // Save the room to the database
    newRoom.save()
  .then((savedRoom) => {
    // Access the ID of the saved room
    const roomId = savedRoom._id;
    console.log('Room saved with ID:', roomId);

    // Send the room ID to the frontend
    res.status(200).json({ status: 200, roomID: roomId });
  })
  .catch((error) => {
    console.error('Error saving room:', error);
    // Handle the error
  });

    // res.status(200).json({ message: 'Room created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room' });
  }
});

router.delete('/delete-room/:roomID', async (req, res) => {
  const roomID = req.params.roomID;
  console.log(roomID)
  try {
    // Check if the room with the provided roomID exists
    const room = await Room.findById(roomID);

    if (!room) {
      return res.status(404).json({ status: 404, message: 'Room not found' });
    }

    // Delete the room from the rooms collection
    await Room.findByIdAndDelete(roomID);

    // Delete all messages with the specified roomID from the messages collection
    await Message.deleteMany({ roomID });

    res.status(200).json({ status: 200, message: 'Room and associated messages deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ status: 500, message: 'Could not delete room and associated messages' });
  }
});

router.get('/rooms', async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rooms' });
    }
  });
  

module.exports = router;
