import appPool from "../db/connectdb.js";

export const handleNewMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;
  try {
    let time = Date.now();
    let roomId = [sender, receiver].sort().join("-");
    await appPool.query(
      "INSERT INTO CHAT_INFO (SENDER,RECEIVER,MESSAGE,ROOM_ID,TIMESTAMP) VALUES ($1,$2,$3,$4,$5)",
      [sender, receiver, message, roomId, time]
    );
    return res.status(201).json({ message: "message ingest success." });
  } catch (error) {
    console.log("error while adding a message into the DB", error);
  }
};

export const allChats = async (req, res) => {
  const { roomId } = req.query;
  try {
    let chats = await appPool.query(
      "SELECT SENDER,RECEIVER,MESSAGE,TIMESTAMP FROM CHAT_INFO WHERE ROOM_ID = $1",
      [roomId]
    );
    return res.status(200).json({ chats: chats.rows });
  } catch (error) {
    console.log("error while getting all chats.", error);
  }
};
