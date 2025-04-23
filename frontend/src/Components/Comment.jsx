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
    <div className="border-b border-gray-800 pb-5 last:border-0">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium text-emerald-400">
          {comment.user?.name || "Unknown"}
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3">
          <div className="text-xs text-gray-500">{formattedDate}</div>
          
          {isAuthor && (
            <div className="relative" ref={menuRef}>
              <button 
                className="text-gray-400 hover:text-emerald-400 cursor-pointer py-1 rounded-full float-right"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaEllipsisV size={14} />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-1 w-36 bg-[#252525] rounded-md shadow-lg z-10 border border-gray-700">
                  <div className="py-1">
                    <button
                      onClick={handleEditComment}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#333333] flex items-center gap-2"
                    >
                      <FaEdit size={12} /> Edit
                    </button>
                    <button
                      onClick={handleDeleteComment}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#333333] flex items-center gap-2"
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
            className="w-full px-3 py-2 bg-[#252525] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-gray-200"
            rows="2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex gap-2 mt-2 justify-end">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmitEdit}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition text-sm"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-300">{comment.content}</p>
      )}
    </div>
  );
};

export default Comment;