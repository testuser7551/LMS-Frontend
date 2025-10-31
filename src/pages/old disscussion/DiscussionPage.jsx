// src/pages/Discussion/DiscussionPage.jsx
import React from "react";
import ForumApp from "./ForumApp";
import { useParams } from "react-router-dom";

const DiscussionPage = () => {
  const { threadId } = useParams(); 
  return (
    <div className="">
      <ForumApp threadId={threadId}/>
    </div>
  );
};

export default DiscussionPage;
