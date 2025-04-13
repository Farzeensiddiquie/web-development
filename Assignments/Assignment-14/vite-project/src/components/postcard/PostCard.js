import React from "react";
import "./PostCard.css";

const PostCard = ({ post }) => {


  return (
    <div  className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      <div className="post-meta">User ID: {post.userId}</div>
    </div>
  );
};

export default PostCard;
