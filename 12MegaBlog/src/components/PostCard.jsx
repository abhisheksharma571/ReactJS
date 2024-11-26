import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Import Font Awesome Icons

function PostCard({ $id, title, featuredimage, bookmarked }) {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const userData = useSelector((state) => state.auth.userData);

  // Check bookmark status on load
  useEffect(() => {
    if (userData) {
      appwriteService.isBookmarked($id, userData.$id).then((bookmark) => {
        setIsBookmarked(!!bookmark);
      });
    }
  }, [userData, $id]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredimage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>

        {/* Display Bookmark Icon and Text */}
        <div className="flex items-center">
          {isBookmarked && (
            <FaBookmark className="text-blue-500" />
          )}
          {isBookmarked && <span className="ml-2">Bookmarked</span>}
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
