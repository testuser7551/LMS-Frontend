// src/pages/Discussion/components/NewThreadForm.jsx
import React, { useState } from "react";
import { X, Tag, Calendar, Users } from "lucide-react";
import RichTextEditor from "./RichTextEditor";

const NewThreadForm = ({ isOpen, onClose, onSubmit, forums, currentUser }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [forumId, setForumId] = useState(forums[0]?.id || "");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [group, setGroup] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);

    const threadData = {
      title: title.trim(),
      content,
      forumId,
      tags,
      availableFrom: availableFrom || undefined,
      availableTo: availableTo || undefined,
      group: group || undefined,
    };

    await onSubmit(threadData);

    // Reset form
    setTitle("");
    setContent("");
    setTags([]);
    setTagInput("");
    setAvailableFrom("");
    setAvailableTo("");
    setGroup("");
    setIsSubmitting(false);
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm" // transparent overlay
        onClick={onClose}
      />

      <div
        className="inline-block w-full max-w-2xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create New Thread</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 max-h-[80vh] overflow-y-auto"
        >
          <div className="space-y-6">
            {/* Forum Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                Forum
              </label>
              <select
                value={forumId}
                onChange={(e) => setForumId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-poppins"
                required
              >
                {forums.map((forum) => (
                  <option key={forum.id} value={forum.id}>
                    {forum.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter thread title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-poppins"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                Content *
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your thread content..."
                height="200px"
                className="font-poppins"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                <Tag className="inline h-4 w-4 mr-1" />
                Tags
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-activecolor focus:border-activecolor font-poppins"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 bg-activecolor text-primary px-3 py-1 rounded-full text-sm"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-primary cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Instructor-only options */}
            {currentUser.role === "instructor" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Available From
                  </label>
                  <input
                    type="datetime-local"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Available To
                  </label>
                  <input
                    type="datetime-local"
                    value={availableTo}
                    onChange={(e) => setAvailableTo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                +
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                    <Users className="inline h-4 w-4 mr-1" />
                    Restrict to Group (optional)
                  </label>
                  <select
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-poppins"
                  >
                    <option value="">All Groups</option>
                    <option value="Group A">Group A</option>
                    <option value="Group B">Group B</option>
                    <option value="Group C">Group C</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-poppins"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim() || isSubmitting}
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] 
             text-[var(--color-bgcolor)] rounded-lg 
             hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)] 
             px-4 py-2 transition cursor-pointer"
            >
              {isSubmitting ? "Creating..." : "Create Thread"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewThreadForm;
