import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateToPastes } from "../redux/pasteSlice";
import { FaEdit, FaSave, FaArrowLeft } from "react-icons/fa";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (paste) {
      setTitle(paste.title);
      setContent(paste.content);
    } else {
      // Redirect to a fallback page or display a "not found" message
      alert("Paste not found");
      navigate("/pastes");
    }
  }, [paste, navigate]);

  const handleUpdate = () => {
    if (title && content) {
      dispatch(updateToPastes({ _id: id, title, content }));
      setIsEditing(false);
    } else {
      alert("Please fill in both the title and content.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => navigate("/pastes")}
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FaArrowLeft />
            <span>Back to all pastes</span>
          </button>
        </div>

        <div className="flex justify-between items-center">
          <input
            type="text"
            className="w-3/4 p-3 text-xl font-semibold rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            disabled={!isEditing}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
          />
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="ml-4 p-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            {isEditing ? <FaSave /> : <FaEdit />}
          </button>
        </div>

        <div className="mt-6">
          <textarea
            className="w-[900px] h-[500px] p-4 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            disabled={!isEditing}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content here"
            rows={10}
          />
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPaste;
