import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

// Icons
import { FaEdit, FaTrashAlt, FaShareAlt, FaEye, FaCopy } from "react-icons/fa";
import { IoIosCalendar } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [selectedPasteLink, setSelectedPasteLink] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(pasteLink) {
    setSelectedPasteLink(pasteLink);
    setShowSharePopup(true);
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[950px] mt-20 border"
        type="search"
        placeholder="Search by title or content"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-2xl font-bold mb-4">All Notes</h2>
        {filterData.length > 0 &&
          filterData.map((paste) => (
            <div
              key={paste?._id}
              className="border p-4 rounded-xl flex gap-4"
              style={{
                width: "950px",
                height: "auto",
                maxHeight: "128px", // Fixed height for the card
                overflow: "hidden", // Content overflow hidden
                margin: "16px", // Margin from all sides of the card
              }}
            >
              {/* Left Section (Title & Content) */}
              <div className="flex flex-col justify-between w-3/5">
                {/* Title */}
                <div
                  className="font-bold text-lg"
                  style={{
                    width: "570px",
                    height: "40px",
                    textAlign: "left",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {paste.title}
                </div>

                {/* Content */}
                <div
                  className="text-sm text-gray-600"
                  style={{
                    width: "458px",
                    height: "60px",
                    textAlign: "left",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {paste.content}
                </div>
              </div>

              {/* Right Section (Buttons, Date & Content Type) */}
              <div className="flex flex-col justify-between w-2/5 items-end">
                <div className="flex gap-3 mb-3">
                  <button onClick={() => handleShare(paste?._id)}>
                    <FaShareAlt />
                  </button>
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>
                      <FaEdit />
                    </a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>
                      <FaEye />
                    </a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    <FaCopy />
                  </button>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-lg text-gray-500">
                  <IoIosCalendar />
                  <div>{new Date(paste.createdAt).toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</div>
                </div>

                {/* Selected Content Type */}
                <div className="text-sm font-medium text-gray-700">
                  {paste.contentType}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Share Pop-up */}
      {showSharePopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Share Link</h3>
              <button onClick={() => setShowSharePopup(false)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="mt-3">
              <input
                type="text"
                className="p-2 w-full mb-3 border"
                value={`http://yourapp.com/?pasteId=${selectedPasteLink}`}
                readOnly
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `http://yourapp.com/?pasteId=${selectedPasteLink}`
                  );
                  toast.success("Link copied to clipboard");
                }}
                className="flex items-center gap-2"
              >
                <FaCopy /> Copy Link
              </button>
              <div className="flex justify-around mt-4">
                <a href="https://twitter.com/login" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M23.643 4.937a9.745 9.745 0 0 1-2.827.775 4.929 4.929 0 0 0 2.165-2.725 9.753 9.753 0 0 1-3.127 1.195A4.912 4.912 0 0 0 16.772 4c-2.721 0-4.933 2.211-4.933 4.933 0 .387.043.765.125 1.12A13.973 13.973 0 0 1 1.671 3.149a4.92 4.92 0 0 0-.667 2.478c0 1.712.87 3.219 2.188 4.103a4.91 4.91 0 0 1-2.233-.616v.062a4.933 4.933 0 0 0 3.95 4.837c-.278.075-.57.115-.861.115-.211 0-.415-.02-.617-.058.415 1.295 1.629 2.238 3.062 2.263a9.886 9.886 0 0 1-7.22 2.036c2.148 1.37 4.713 2.169 7.426 2.169 8.91 0 13.78-7.387 13.78-13.78 0-.21-.003-.419-.01-.627a9.822 9.822 0 0 0 2.35-2.48z"
                      fill="#1DA1F2"
                    />
                  </svg>
                </a>
                <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2.16c3.188 0 3.572 0 4.838.07 1.212.068 2.177.42 2.848 1.09.671.67 1.023 1.636 1.09 2.848.07 1.267.07 1.65.07 4.838s0 3.572-.07 4.838c-.068 1.212-.42 2.177-1.09 2.848-.67.67-1.636 1.023-2.848 1.09-1.267.07-1.65.07-4.838s-3.572 0-4.838-.07c-1.212-.068-2.177-.42-2.848-1.09-.67-.671-1.023-1.636-1.09-2.848-.07-1.267-.07-1.65-.07-4.838s0-3.572.07-4.838c.068-1.212.42-2.177 1.09-2.848.67-.67 1.636-1.023 2.848-1.09C8.428 2.16 8.812 2.16 12 2.16z"
                      fill="#E4405F"
                    />
                  </svg>
                </a>
                <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.09 4.91a9.727 9.727 0 1 0-13.72 13.72 9.727 9.727 0 0 0 13.72-13.72zM17.6 17.6a7.91 7.91 0 1 1-11.2-11.2c2.8 2.88 5.56 5.8 8.4 8.4a6.76 6.76 0 0 0 2.8-2.8c.14-.32-.32-.76-.56-.88-3.2-1.76-6.4-3.52-9.6-5.28-2.08-1.16-4.16-2.4-6.4-.32-1.68 1.92-.56 4.56.8 6.72a2.25 2.25 0 0 0 2.08.96c.4-.04.72-.08 1.12-.08s.56-.04.88-.12c1.6-.64 2.8-.32 3.68.72a8.18 8.18 0 0 1 2.8 5.6c-.72.24-1.6-.08-2.08-.64z"
                      fill="#25D366"
                    />
                  </svg>
                </a>
                <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.09 4.91a9.727 9.727 0 1 0-13.72 13.72 9.727 9.727 0 0 0 13.72-13.72z"
                      fill="#3b5998"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paste;
