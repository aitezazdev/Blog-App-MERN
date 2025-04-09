import React from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

const SavePostButton = ({ isSaved, savePost, unsavePost }) => {

  const toggleSave = () => {
    if (isSaved) {
      unsavePost();
    } else {
      savePost();
    }
    isSaved = !isSaved;
  };

  return (
    <div className="text-gray-600" onClick={toggleSave}>
      {isSaved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
    </div>
  );
};

export default SavePostButton;