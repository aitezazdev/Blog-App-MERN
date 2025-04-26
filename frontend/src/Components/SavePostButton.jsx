import React from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

const SavePostButton = ({ isSaved, toggleSavePost }) => {

  const toggleSave = () => {
    toggleSavePost();
  };

  return (
    <div className="text-emerald-400" onClick={toggleSave}>
      {isSaved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
    </div>
  );
};

export default SavePostButton;