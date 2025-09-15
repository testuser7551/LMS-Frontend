// src/pages/Discussion/ForumApp.jsx
import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ThreadList from "./components/ThreadList";
import ThreadDetail from "./components/ThreadDetail";
import NewThreadForm from "./components/NewThreadForm";
import {
  currentUser,
  forums,
  threads as initialThreads,
  replies as initialReplies,
} from "./data/mockData";

function ForumApp() {
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState(initialThreads);
  const [replies, setReplies] = useState(initialReplies);

  // Filter threads
  const filteredThreads = useMemo(() => {
    let filtered = threads;
    if (selectedForum) {
      filtered = filtered.filter((thread) => thread.forumId === selectedForum);
    }
    return filtered;
  }, [threads, selectedForum]);

  const currentThread = threads.find((t) => t.id === selectedThread);
  const threadReplies = replies.filter((r) => r.threadId === selectedThread);

  const handleNewThread = (threadData) => {
    const newThread = {
      id: Date.now().toString(),
      title: threadData.title,
      content: threadData.content,
      author: currentUser,
      forumId: threadData.forumId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replyCount: 0,
      likes: 0,
      isLiked: false,
      availableFrom: threadData.availableFrom,
      availableTo: threadData.availableTo,
      group: threadData.group,
      isPinned: false,
      tags: threadData.tags,
      grade: 0,
      maxGrade: 10,
    };
    setThreads((prev) => [newThread, ...prev]);
  };

  const handleLikeThread = (threadId) => {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              isLiked: !t.isLiked,
              likes: t.isLiked ? t.likes - 1 : t.likes + 1,
            }
          : t
      )
    );
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

  return (
    <div className="">
      <Header
        user={currentUser}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

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
