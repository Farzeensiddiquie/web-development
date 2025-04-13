import React from "react";
import PostCard from "../postcard/PostCard";
import "./PostList.css";

const PostList = ({ posts, visibleCount }) => {
  return (
    <div className="post-list">
      {posts.slice(0, visibleCount).map((post, index) => (
        <PostCard key={`${post.id}-${index}`} post={post} />
      ))}
    </div>
  );
};

export default PostList;
