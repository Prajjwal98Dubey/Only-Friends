import appPool from "../db/connectdb.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    let isUserPresent = await appPool.query(
      "SELECT * FROM USERS WHERE USER_NAME = $1 OR USER_EMAIL=$2",
      [userName, email]
    );
    if (isUserPresent.rows.length) {
      return res.status(200).json({ message: "user already present." });
    } else {
      let userId = nanoid();
      let token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
      let salt = await bcrypt.genSalt(4);
      let encryptedPassword = await bcrypt.hash(password, salt);
      await appPool.query(
        "INSERT INTO USERS (USER_ID,USER_NAME,USER_EMAIL,USER_PASSWORD,USER_REFRESH_TOKEN) VALUES ($1,$2,$3,$4,$5)",
        [userId, userName, email, encryptedPassword, token]
      );
      res.cookie("accessToken", token, {
        httpOnly: true,
      });
      return res.status(201).json({ message: "user registered." });
    }
  } catch (error) {
    console.log("error while registering user", error);
  }
};

export const loginUser = async (req, res) => {
  const { user, password } = req.body; // user can be user_email or user_name
  try {
    let isUserPresent = await appPool.query(
      "SELECT USER_PASSWORD,USER_REFRESH_TOKEN FROM USERS WHERE USER_NAME = $1 OR USER_EMAIL=$1",
      [user]
    );
    if (isUserPresent.rows.length) {
      let userDetails = isUserPresent.rows;
      let { user_password, user_refresh_token } = userDetails[0];
      bcrypt
        .compare(password, user_password)
        .then((result) => {
          if (result) {
            res.cookie("accessToken", user_refresh_token, {
              httpOnly: true,
            });
            return res.status(200).json({ message: "login success." });
          } else
            return res.status(200).json({ message: "invalid credentials." });
        })
        .catch((err) => console.log("something went wrong in passwords", err));
    } else {
      return res.status(200).json({ message: "user not present." });
    }
  } catch (error) {
    console.log("error while login", error);
  }
};

export const getMyDetails = async (req, res) => {
  const { userId } = req.user;
  try {
    let myDetails = await appPool.query(
      "SELECT USER_NAME,USER_EMAIL FROM USERS WHERE USER_ID=$1",
      [userId]
    );
    return res.status(200).json(myDetails.rows[0]);
  } catch (error) {
    console.log("error while fetching my details", error);
  }
};
