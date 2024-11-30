import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  // State variables
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [noteType, setNoteType] = useState("Text");
  const [noteDuration, setNoteDuration] = useState("1 Month");
  const [notePrivacy, setNotePrivacy] = useState("Public");
  const [customColor, setCustomColor] = useState("#000000");
  
  // For search params
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  
  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allPastes = useSelector((state) => state.paste.pastes);

  // Effect to load existing paste if edit mode (pasteId exists)
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
        setNoteType(paste.noteType);
        setNoteDuration(paste.noteDuration);
        setNotePrivacy(paste.notePrivacy);
        setTextColor(paste.textColor);
      }
    }
  }, [pasteId, allPastes]);

  // Function to create or update a paste
  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content cannot be empty!", {
        position: "top-center",
      });
      return;
    }

    const paste = {
      title,
      content: value,
      noteType,
      noteDuration,
      notePrivacy,
      textColor,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success("Note updated successfully", {
        position: "top-center",
      });
      navigate("/pastes");
    } else {
      dispatch(addToPastes(paste));
      toast.success("Note created successfully", {
        position: "top-center",
      });
      navigate("/pastes");
    }

    // Clear form after submission
    resetForm();
  };

  // Function to reset the form
  const resetForm = () => {
    setTitle("");
    setValue("");
    setTextColor("#000000");
    setNoteType("Text");
    setNoteDuration("1 Month");
    setNotePrivacy("Public");
    setCustomColor("#000000");
    setSearchParams(""); // Clears the pasteId
  };

  // Function to copy content to clipboard
  const copyContent = () => {
    navigator.clipboard.writeText(value);
    toast.success("Content copied to clipboard!", {
      position: "top-center",
    });
  };

  // Function to handle color click (for text color selection)
  const handleColorClick = (color) => {
    setCustomColor(color);
    setTextColor(color);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 flex items-center justify-center pt-20"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1920x1080/?paper,texture')",
      }}
    >
      <ToastContainer position="top-center" style={{ zIndex: 9999 }} /> {/* Toast container with high z-index */}
      
      <div className="w-[1080px] h-[880px] bg-white shadow-lg rounded-lg p-6 overflow-hidden dark:bg-gray-800">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-4 text-center dark:text-gray-200 font-[Poppins]">
          {pasteId ? "Update Note" : "Create a New Note"}
        </h1>

        {/* Dropdowns and Buttons */}
        <div className="flex gap-4 items-center mb-4">
          {/* Note Type Dropdown */}
          <select
            value={noteType}
            onChange={(e) => setNoteType(e.target.value)}
            className="p-2 border rounded-lg hover:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="Code">Code</option>
            <option value="Text">Text</option>
            <option value="JSON">JSON</option>
          </select>

          {/* Note Duration Dropdown */}
          <select
            value={noteDuration}
            onChange={(e) => setNoteDuration(e.target.value)}
            className="p-2 border rounded-lg hover:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="1 Month">1 Month</option>
            <option value="1 Year">1 Year</option>
            <option value="Never">Never</option>
          </select>

          {/* Note Privacy Dropdown */}
          <select
            value={notePrivacy}
            onChange={(e) => setNotePrivacy(e.target.value)}
            className="p-2 border rounded-lg hover:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          {/* Create/Update Note Button */}
          <button
            onClick={createPaste}
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-bold"
          >
            {pasteId ? "Update Note" : "Create Note"}
          </button>

          {/* Navigate back to Create Note page */}
          {pasteId && (
            <button
              onClick={() => navigate("/")}
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <span className="text-xl">+</span> {/* Plus symbol */}
            </button>
          )}
        </div>

        {/* Title Input Field */}
        <input
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 hover:border-blue-500 dark:bg-gray-700 dark:text-gray-200 font-[Poppins]"
        />

        {/* Text Content Area */}
        <div className="relative border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-3 bg-gray-100 border-b">
            {/* Color Selector */}
            <div className="flex gap-2">
              <div
                className="w-6 h-6 rounded-full bg-orange-500 cursor-pointer hover:opacity-75"
                onClick={() => handleColorClick("#FFA500")}
                title="Orange"
              ></div>
              <div
                className="w-6 h-6 rounded-full bg-yellow-500 cursor-pointer hover:opacity-75"
                onClick={() => handleColorClick("#FFFF00")}
                title="Yellow"
              ></div>
              <div
                className="w-6 h-6 rounded-full bg-green-500 cursor-pointer hover:opacity-75"
                onClick={() => handleColorClick("#008000")}
                title="Green"
              ></div>
              {/* Custom Color Picker */}
              <input
                type="color"
                value={customColor}
                onChange={(e) => handleColorClick(e.target.value)}
                className="w-6 h-6 cursor-pointer"
              />
            </div>

            {/* Copy Icon */}
            <button onClick={copyContent} title="Copy Content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-copy hover:text-green-500"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
              </svg>
            </button>
          </div>

          {/* Text Area */}
          <textarea
            placeholder={`Enter ${
              noteType === "Code"
                ? "Enter Code here"
                : noteType === "JSON"
                ? "Enter JSON Content here"
                : "Enter Text here"
            }`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={15}
            className="w-full p-4 resize-none font-[Poppins]"
            style={{ color: textColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
