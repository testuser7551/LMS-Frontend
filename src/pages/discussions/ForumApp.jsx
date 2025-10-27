// src/pages/Discussion/ForumApp.jsx
import React, { useState, useMemo, useEffect, useContext } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ThreadList from "./components/ThreadList";
import ThreadDetail from "./components/ThreadDetail";
import NewThreadForm from "./components/NewThreadForm";
import { AlertCircle } from 'lucide-react';

import {
  currentUser,
  forums,
  threads as initialThreads,
  replies as initialReplies,
} from "./data/mockData";

import { fetchDiscussion, addDiscussion, likeDiscussion, deleteDiscussion } from './discussionApi.js';
import { AuthContext } from "../../context/AuthContext.jsx";
import { showToast } from "../../components/toast.js";

function ForumApp() {
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState(initialThreads);
  const [replies, setReplies] = useState(initialReplies);
  const [page, setPage] = useState('1');
  const [loading, setLoading] = useState(false);
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  

  // Filter threads
  const filteredThreads = useMemo(() => {
    let filtered = threads;
    if (selectedForum) {
      filtered = filtered.filter((thread) => thread.forumId === selectedForum);
    }
    return filtered;
  }, [threads, selectedForum]);

  const currentThread = threads.find((t) => t._id === selectedThread);
  const threadReplies = replies.filter((r) => r.threadId === selectedThread);

  useEffect(()=>{
    loadDiscussion();
  }, []);
  
  const loadDiscussion = async () => {
    try {
      setLoading(true);
      let body = { page: page, limit: 10 }
      const data = await fetchDiscussion(body);
      setThreads(data.discussions || []);
    } catch (err) {
      showToast
      setError(err.message || "Failed to load Discussion");
    } finally {
      setLoading(false);
    }
  };

  const handleNewThread = async (threadData) => {
    try {
      setLoading(true);
      const newThread = {
        heading: threadData.forumTitle,
        title: threadData.title,
        content: threadData.content,
        replies: [],
        tags: threadData.tags,
        status: "open",
        isDeleted: false
      };
      const data = await addDiscussion(newThread);
      loadDiscussion();
    } catch (err) {
      setError(err.message || "Failed to add discussion");
    } finally {
      setLoading(false);
    }
  };

  const handleLikeThread = async (threadId) => {
    try {
      const thread = threads.find(t => t._id === threadId);
      const alreadyLiked = thread?.likes?.includes(user._id) || false;
      let body = {
        contentId : threadId,
        isLiked: !alreadyLiked
      }
      setLoading(true);
      const data = await likeDiscussion(body);
      showToast(data.msg, "top-center", 3000, "dark");  
      loadDiscussion();
    } catch (err) {
      setError(err.message || "Failed to like discussion");
    } finally {
      setLoading(false);
    }
  };

  const handleLikeReply = (replyId) => {
    setReplies((prev) =>
      prev.map((r) =>
        r.id === replyId
          ? {
              ...r,
              isLiked: !r.isLiked,
              likes: r.isLiked ? r.likes - 1 : r.likes + 1,
            }
          : r
      )
    );
  };

  const handleReply = (content, parentId) => {
    if (!selectedThread) return;
    const newReply = {
      id: Date.now().toString(),
      content,
      author: currentUser,
      threadId: selectedThread,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      parentId,
      grade: 0,
      maxGrade: 10,
    };
    setReplies((prev) => [...prev, newReply]);
    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedThread
          ? {
              ...t,
              replyCount: t.replyCount + 1,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  };

  const handleGrade = (targetId, grade, isThread = false) => {
    if (isThread) {
      setThreads((prev) =>
        prev.map((t) => (t.id === targetId ? { ...t, grade } : t))
      );
    } else {
      setReplies((prev) =>
        prev.map((r) => (r.id === targetId ? { ...r, grade } : r))
      );
    }
  };

  const handleThreadDelete = async (threadId) => {
    try {
      setLoading(true);
      const data = await deleteDiscussion(threadId);
      showToast(data.msg, "top-center", 3000, "dark"); 
      loadDiscussion();
    } catch (err) {
      setError(err.message || "Failed to add discussion");
    } finally {
      setLoading(false);
    }  }

  return (
    <div className="">
      <Header
        user={currentUser}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      <div className="flex h-screen overflow-hidden">
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {selectedThread && currentThread ? (
                <ThreadDetail
                  thread={currentThread}
                  replies={threadReplies}
                  currentUser={currentUser}
                  onBack={() => setSelectedThread(null)}
                  onLike={handleLikeThread}
                  onReplyLike={handleLikeReply}
                  onReply={handleReply}
                  onGrade={handleGrade}
                />
              ) : (
                <ThreadList
                  threads={filteredThreads}
                  currentUser={currentUser}
                  onThreadSelect={setSelectedThread}
                  onNewThread={() => setShowNewThreadForm(true)}
                  onLike={handleLikeThread}
                  onDelete={handleThreadDelete}
                  searchQuery={searchQuery}
                />
              )}
            </div>
          </div>
        </main>
        <Sidebar
          selectedForum={selectedForum}
          onForumSelect={setSelectedForum}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      <NewThreadForm
        isOpen={showNewThreadForm}
        onClose={() => setShowNewThreadForm(false)}
        onSubmit={handleNewThread}
        forums={forums}
        currentUser={currentUser}
      />
    </div>
  );
}

export default ForumApp;
