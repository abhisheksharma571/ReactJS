import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Import Font Awesome Icons

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isAuthor = post && userData ? post.userid === userData.$id : false;

  // Check if the post is bookmarked by the current user
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          if (userData) {
            appwriteService.isBookmarked(post.$id, userData.$id).then((bookmark) => {
              setIsBookmarked(!!bookmark);
            });
          }
        } else navigate("/"); // Navigate to home if no post found
      });
    } else navigate("/"); // Navigate to home if no slug
  }, [slug, navigate, userData]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/"); // Navigate back to home after delete
      }
    });
  };

  const handleBookmark = async () => {
    if (!userData) {
      alert("Please log in to bookmark posts.");
      return;
    }
  
    try {
      if (isBookmarked) {
        // Fetch and remove the bookmark if it exists
        const bookmark = await appwriteService.getBookmarksByUser(userData.$id, post.$id);
        if (bookmark) {
          await appwriteService.removeBookmark(bookmark.$id); // Remove bookmark by bookmark ID
          setIsBookmarked(false);
        }
      } else {
        // Add a new bookmark
        const bookmarkId = `${post.$id}_${userData.$id}`; // Unique bookmarkId
        await appwriteService.addBookmark(post.$id, userData.$id, bookmarkId);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error handling bookmark:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}

          {/* Bookmark Button in the top-left corner */}
          <div className="absolute left-6 top-6">
            <button
              onClick={handleBookmark}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full"
            >
              {isBookmarked ? (
                <>
                  <FaBookmark className="text-white" />
                  <span className="ml-2">Remove Bookmark</span>
                </>
              ) : (
                <>
                  <FaRegBookmark className="text-white" />
                  <span className="ml-2">Add Bookmark</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
