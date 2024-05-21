const Chat = require("../Model/ChatModel");
const mongoose = require("mongoose");
class ChatController {
  // [GET] http:localhost:5000/chat?id=123
  index(req, res, next) {
    // console.log(req.query.id);
    Chat.find({ userID: req.query.id })
      .then((chat) => {
        res.status(200).json({ chat });
      })
      .catch(next);
  }
  //   [POST] chat
}

module.exports = new ChatController();
