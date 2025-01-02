const Message = require('../models/Message')
const Chat = require('../models/Chat');

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { chatId, senderId, text, media } = req.body;

    const message = new Message({
      chatId,
      senderId,
      text,
      media
    });

    await message.save();

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all messages for a chat
const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
     console.log(chatId)
    const messages = await Message.find({ chatId });
    console.log(messages,"mesages")
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new chat
const createChat = async (req, res) => {
  try {
    console.log(req.body)
    const { participants, isGroup, groupName } = req.body;

    const chat = new Chat({
      participants,
      isGroup,
      groupName
    });

    await chat.save();

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all chats where user is a participant
    // const chats = await Chat.find({ participants: userId })
    // .populate('participants', 'username profilePicture') // Populate participants' details
    // .select('_id participants isGroup groupName');
 
  const chats = await Chat.find({participants:userId})
                      .populate('participants','username , profilePicture')
                      .select('_id participants isGroup groupName')

    // Format the response
    const chatJSON = chats.map(chat => chat.toJSON()); 
    const formattedChats = chats.map((chat) => {
      // If it's a direct chat, filter out the logged-in user
      const otherParticipants = chat.isGroup 
        ? chat.participants // Include all participants for groups
        : chat.participants.filter((participant) => participant._id.toString() !== userId); // Exclude logged-in user
 
        console.log(otherParticipants)

      return {
        chatId: chat._id,
        isGroup: chat.isGroup,
        name: chat.isGroup ? chat.groupName : otherParticipants[0].username,
        avatar: chat.isGroup
          ? 'https://example.com/group-avatar.png' // Placeholder for group icon
          : otherParticipants[0].profilePicture,
        participants: chat.participants, // Keep full participant details
      };
    });

    res.status(200).json(formattedChats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  createChat,
  getUserChats
};
