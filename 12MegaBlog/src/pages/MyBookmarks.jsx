import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import PostCard from '../components/PostCard';

function MyBookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            fetchBookmarks();
        }
    }, [userData]);

    const fetchBookmarks = async () => {
        try {
            const userBookmarks = await appwriteService.getBookmarksByUser(userData.$id);
            const postsPromises = userBookmarks.map(async (bookmark) => {
                // Fetch the post details for each bookmark
                return await appwriteService.getPost(bookmark.postId);
            });

            const posts = await Promise.all(postsPromises);
            setBookmarks(posts);
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return <div>Please log in to view your bookmarks.</div>;
    }
    if (loading) {
        return <div>Loading your bookmarks...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>
            {bookmarks.length === 0 ? (
                <p>You have no bookmarks yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {bookmarks.map((post) => (
                        <PostCard
                            key={post.$id}
                            $id={post.$id}
                            title={post.title}
                            featuredimage={post.featuredimage}
                            bookmarked={true} // Bookmarked by default in this view
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookmarks;
