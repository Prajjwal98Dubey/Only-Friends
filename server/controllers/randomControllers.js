import appPool from "../db/connectdb.js";

export const generateRandomPeople = async (req, res) => {
  const { userId } = req.user;
  try {
    let allUsers = await appPool.query("SELECT USER_ID,USER_NAME FROM USERS");
    let updatedAllUsers = [];
    for (let i = 0; i < allUsers.rows.length; i++) {
      if (allUsers.rows[i].user_id === userId) continue;
      else updatedAllUsers.push(allUsers.rows[i]);
    }
    let randomPersonIndex = Math.floor(Math.random() * updatedAllUsers.length);
    let { user_id, user_name } = updatedAllUsers[randomPersonIndex];
    let randomPersonDetails = await appPool.query(
      "SELECT SUPER_LIKES,LIKES,GENDER,AGE FROM USER_DETAILS WHERE USER_ID = $1",
      [user_id]
    );
    return res.status(200).json({
      user_id,
      user_name,
      superLikes: randomPersonDetails.rows[0].super_likes,
      likes: randomPersonDetails.rows[0].likes,
      gender: randomPersonDetails.rows[0].gender,
      age: randomPersonDetails.rows[0].age,
    });
  } catch (error) {
    console.log("error while generating random people", error);
  }
};
