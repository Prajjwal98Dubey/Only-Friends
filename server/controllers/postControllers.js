import appPool from "../db/connectdb.js";
import { nanoid } from "nanoid";
export const createPost = async (req, res) => {
  const { userId } = req.user;
  const { title, desc } = req.body;
  try {
    const postId = nanoid();
    await appPool.query(
      "INSERT INTO POST (POST_ID,POST_TITLE,POST_DESC,POST_UPVOTE,POST_DOWNVOTE,POST_USER) VALUES ($1,$2,$3,$4,$5,$6)",
      [postId, title, desc, 0, 0, userId]
    );
    return res.status(201).json({ message: "post created." });
  } catch (error) {
    console.log("error while creating a post", error);
  }
};

export const showMyPosts = async (req, res) => {
  const { userId } = req.user;
  try {
    const allPosts = await appPool.query(
      "SELECT * FROM POST WHERE POST_USER = $1",
      [userId]
    );
    return res.status(200).status(allPosts);
  } catch (error) {
    console.log("error while fetching all my posts", error);
  }
};

export const editMyPost = async (req, res) => {
  const { postId, title, desc } = req.body;
  try {
    await appPool.query(
      "UPDATE POST SET POST_TITLE = $1 , POST_DESC = $2 WHERE POST_ID = $3",
      [title, desc, postId]
    );
    return res.status(200).json({ message: "edit success." });
  } catch (error) {
    console.log("error while updating my post", error);
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await appPool.query("DELETE FROM POST WHERE POST_ID = $1", [postId]);
    return res.status(200).json({ message: "delete success." });
  } catch (error) {
    console.log("error while deleting the post", error);
  }
};
