import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, PostCard, Button } from "../components";
import appwriteService from "../appwrite/config";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData); // Logged-in user data
    const userId = userData?.$id;

    useEffect(() => {
        if (userId) {
            appwriteService.getPosts().then((response) => {
                if (response) {
                    const userPosts = response.documents.filter((post) => post.userid === userId);
                    setPosts(userPosts);
                }
            });
        }
    }, [userId]);

    return (
        <div className="w-full py-8">
            <Container>
                {/* Stylish Add Post Button */}
                <div className="flex items-center mb-6">
                    <Link to="/add-post">
                        <Button className="bg-blue-700 text-white py-2 px-4 rounded-full">
                            + Create New Post
                        </Button>
                    </Link>
                </div>

                {/* Posts Section */}
                {posts.length > 0 ? (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        You haven't created any posts yet.
                    </div>
                )}
            </Container>
        </div>
    );
}

export default MyPosts;
