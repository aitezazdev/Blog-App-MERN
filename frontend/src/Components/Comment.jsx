import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

const Comment = ({ comment, user, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const menuRef = useRef(null);

  const isAuthor = user && comment.user && user._id === comment.user._id;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditComment = () => {
    setShowMenu(false);
    setIsEditing(true);
  };

  const handleDeleteComment = () => {
    setShowMenu(false);
    onDelete(comment._id);
  };

  const handleSubmitEdit = () => {
    if (editedContent.trim()) {
      onEdit(comment._id, editedContent);
      setIsEditing(false);
    }
  };

  const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="border-b border-gray-100 pb-5 last:border-0">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium text-gray-800">
          {comment.user?.name || "Unknown"}
        </div>
        <div className="flex flex-col-reverse gap-3">
          <div className="text-xs text-gray-500">{formattedDate}</div>
          
          {isAuthor && (
            <div className="relative" ref={menuRef}>
              <button 
                className="text-gray-500 hover:text-gray-700 cursor-pointer py-1 rounded-full float-right"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaEllipsisV size={14} />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={handleEditComment}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaEdit size={12} /> Edit
                    </button>
                    <button
                      onClick={handleDeleteComment}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaTrash size={12} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <div className="mt-2">
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows="2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex gap-2 mt-2 justify-end">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmitEdit}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-sm"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">{comment.content}</p>
      )}
    </div>
  );
};

export default Comment;