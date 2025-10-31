import React, { useState, useMemo, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ThreadList from "./components/ThreadList";
import ThreadDetail from "./components/ThreadDetail";
import NewThreadForm from "./components/NewThreadForm";
import { AlertCircle, Loader2 } from 'lucide-react';
import {   threads as initialThreads, replies as initialReplies } from "./data/mockData";
import { fetchDiscussion, addDiscussion, likeDiscussion, deleteDiscussion } from './discussionApi.js';
import { AuthContext } from "../../context/AuthContext.jsx";
import { showToast } from "../../components/toast.js";
import {
  fetchCoursesAPI
} from "../../api/courses/courses";

function ForumApp({ threadId }) {
  const navigate = useNavigate();
  // State management
  const [selectedForum, setSelectedForum] = useState(null);
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState(initialThreads);
  const [replies, setReplies] = useState(initialReplies);
  const [page, setPage] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
   const selectedThread = threadId || null;
  // Context
  const { user, token } = useContext(AuthContext);
  const currentUser = user;

  // Memoized computations
  const filteredThreads = useMemo(() => {
    if (!selectedForum) return threads;
    return threads.filter((thread) => thread.forumId === selectedForum);
  }, [threads, selectedForum]);
  //console.log("gdfgyguisefsdfndlkfdsfgdf",selectedThread);;
  const currentThread = threads.find((t) => t._id === selectedThread);
  const threadReplies = replies.filter((r) => r.threadId === selectedThread);
  const [allCourses, setAllCourses] = useState([]);

  const handleThreadSelect = (threadId) => {
    //console.log("Selected thread ID:", threadId);
    navigate(`/courses/discussions/${threadId}`);
  };
  const handleBack = () => {
    navigate('/courses/discussions');
  };
  // Effects
  useEffect(() => {
    loadDiscussion();
  }, []);

  // Remove the static forums array and create forums from courses
const [forums, setForums] = useState([]);

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const coursesData = await fetchCoursesAPI();
      console.log("✅ Fetched courses:", coursesData);
      setAllCourses(coursesData);
      
      // Convert courses to forums format
      const courseForums = coursesData.map((course, index) => ({
        id: course._id,
        name: course.title,
        description: course.description || `Discussion for ${course.title}`,
        threadCount: 0, // You can update this later with actual thread counts
        icon: "MessageSquare",
        color: `bg-${['blue', 'green', 'purple', 'orange', 'red', 'indigo'][index % 6]}-500`,
      }));
      
      setForums(courseForums);
      
    } catch (error) {
      console.error("❌ Failed to fetch courses:", error);
      showToast("Failed to fetch courses.","top-center",10000,"dark");
    }
  };

  fetchCourses();
}, [user]);

  // API handlers
  const loadDiscussion = async () => {
    try {
      setLoading(true);
      setError("");
      const body = { page: page, limit: 10 };
      const data = await fetchDiscussion(body);
      //console.log("Fetched discussions:", data);
      setThreads(data.discussions || []);
    } catch (err) {
      setError(err.message || "Failed to load Discussion");
    } finally {
      setLoading(false);
    }
  };

  const handleNewThread = async (threadData) => {
    try {
      setLoading(true);
      setError("");
      const newThread = {
        heading: threadData.forumTitle,
        title: threadData.title,
        content: threadData.content,
        replies: [],
        tags: threadData.tags,
        status: "open",
        isDeleted: false
      };
      await addDiscussion(newThread);
      loadDiscussion();
      setShowNewThreadForm(false);
      showToast("Thread created successfully!", "top-center", 3000, "success");
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
      const body = { 
        contentId: threadId, 
        isLiked: !alreadyLiked 
      };
      
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
        r.id === replyId ? { 
          ...r, 
          isLiked: !r.isLiked, 
          likes: r.isLiked ? r.likes - 1 : r.likes + 1 
        } : r 
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
        t.id === selectedThread ? { 
          ...t, 
          replyCount: t.replyCount + 1, 
          updatedAt: new Date().toISOString() 
        } : t 
      )
    );
  };

  const handleGrade = (targetId, grade, isThread = false) => {
    if (isThread) {
      setThreads((prev) => 
        prev.map((t) => 
          t.id === targetId ? { ...t, grade } : t
        )
      );
    } else {
      setReplies((prev) => 
        prev.map((r) => 
          r.id === targetId ? { ...r, grade } : r
        )
      );
    }
  };

  const handleThreadDelete = async (threadId) => {
    try {
      setLoading(true);
      setError("");
      const data = await deleteDiscussion(threadId);
      showToast(data.msg, "top-center", 3000, "dark");
      loadDiscussion();
    } catch (err) {
      setError(err.message || "Failed to delete discussion");
    } finally {
      setLoading(false);
    }
  };

  // Render methods
  const renderError = () => (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
      <AlertCircle size={18} className="flex-shrink-0" />
      <span className="text-sm font-medium">{error}</span>
    </div>
  );

  const renderLoading = () => (
    <div className="flex justify-center items-center py-8">
      <Loader2 size={24} className="animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );

  const renderContent = () => {
    if (loading) return renderLoading();

    if (selectedThread && currentThread) {
      return (
        <ThreadDetail 
          thread={currentThread}
          replies={threadReplies}
          currentUser={currentUser}
          onBack={handleBack}
          onLike={handleLikeThread}
          onReplyLike={handleLikeReply}
          onReply={handleReply}
          onGrade={handleGrade}
           onReplyAdded={loadDiscussion} 
        />
      );
    }

    return (
      <ThreadList 
        threads={filteredThreads}
        currentUser={currentUser}
        onThreadSelect={handleThreadSelect}
        onNewThread={() => setShowNewThreadForm(true)}
        onLike={handleLikeThread}
        onDelete={handleThreadDelete}
        searchQuery={searchQuery}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <Header 
        user={currentUser} 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        isMobileMenuOpen={isMobileMenuOpen} 
      /> */}

      {/* Error Display */}
      {error && renderError()}

      {/* Main Content */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        {/* <Sidebar 
          selectedForum={selectedForum}
          onForumSelect={setSelectedForum}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        /> */}

        {/* Main Area */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      {/* New Thread Modal */}
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