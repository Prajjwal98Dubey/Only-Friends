import appPool from "../db/connectdb.js";

export const userSearch = async (req, res) => {
  const query = req.query.q;
  try {
    let allUsers = await appPool.query(
      "SELECT USER_NAME,USER_EMAIL FROM USERS"
    );
    let filteredUsers = allUsers.rows.filter(
      (user) =>
        user.user_name.toLowerCase().includes(query.toLowerCase()) ||
        user.user_email.toLowerCase().includes(query.toLowerCase())
    );
    return res.status(200).json({ results: filteredUsers });
  } catch (error) {
    console.log("error while searching for all the users", error);
  }
};
