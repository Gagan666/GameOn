const express = require('express');
const router = express.Router();
const Message = require('../models/communication')

router.get('/messages/:roomID', async (req, res) => {
    try {
      const roomID = req.params.roomID;
  
      // Retrieve messages from the database based on the roomID
      const messages = await Message.find({ roomID }); // Assuming you store the roomID in your message model
        console.log(roomID)
      res.json(messages);
    } catch (error) {
      console.error('Error retrieving messages:', error);
      res.status(500).json({ error: 'Could not retrieve messages' });
    }
  });
  module.exports = router;