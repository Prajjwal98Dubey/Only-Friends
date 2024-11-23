import appPool from "../db/connectdb.js";
import { onlineMap } from "../onlinestatus.js";

export const generateRandomPeople = async (req, res) => {
  const { userId } = req.user;
  let interested_age = req.query.interested_age ? req.query.interested_age : "";
  let interested_gender = req.query.interested_gender
    ? req.query.interested_gender
    : "";
  try {
    let allUsers = await appPool.query(
      "SELECT USERS.USER_ID,USERS.USER_NAME,USER_DETAILS.GENDER,USER_DETAILS.AGE FROM USERS INNER JOIN USER_DETAILS ON USERS.USER_ID = USER_DETAILS.USER_ID"
    );
    let updatedAllUsers = [];
    for (let i = 0; i < allUsers.rows.length; i++) {
      if (
        allUsers.rows[i].user_id === userId ||
        (interested_gender.length > 0 &&
          allUsers.rows[i].gender !== interested_gender) ||
        (interested_age.length > 0 &&
          parseInt(allUsers.rows[i].age) > parseInt(interested_age))
      )
        continue;
      else updatedAllUsers.push(allUsers.rows[i]);
    }
    let randomPersonIndex = Math.floor(Math.random() * updatedAllUsers.length);
    let { user_id, user_name } = updatedAllUsers[randomPersonIndex];
    let randomPersonDetails = await appPool.query(
      "SELECT SUPER_LIKES,LIKES,GENDER,AGE FROM USER_DETAILS WHERE USER_ID = $1",
      [user_id]
    );
    let onlineStatus = false;
    if (onlineMap.has(user_name)) {
      onlineStatus = true;
    }
    return res.status(200).json({
      user_id,
      user_name,
      superLikes: randomPersonDetails.rows[0].super_likes,
      likes: randomPersonDetails.rows[0].likes,
      gender: randomPersonDetails.rows[0].gender,
      age: randomPersonDetails.rows[0].age,
      online_status: onlineStatus,
    });
  } catch (error) {
    console.log("error while generating random people", error);
  }
};
