import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                {loading ? (
                    <div className="text-center">
                        <p>Loading posts...</p>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">No posts available</h1>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
