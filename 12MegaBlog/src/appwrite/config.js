import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredimage, status, userid}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticlesCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredimage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticlesCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticlesCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticlesCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteArticlesCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    async addBookmark(postId, userId) {
        try {
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBookmarksCollectionId,
                ID.unique(),
                {
                    postId,
                    userId,
                    createdAt: new Date().toISOString(),
                }
            );
            return response;
        } catch (error) {
            console.error("Error adding bookmark:", error);
            throw error;
        }
    }

    async removeBookmark(documentId) {
        try {
            console.log(`Attempting to remove bookmark with ID: ${documentId}`);
            const response = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBookmarksCollectionId,
                documentId
            );
            console.log("Bookmark removed successfully:", response);
            return response;
        } catch (error) {
            console.error(`Error removing bookmark with ID ${documentId}:`, error);
            throw error;
        }
    }
    

    async isBookmarked(postId, userId) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteBookmarksCollectionId,
                [
                    Query.equal("postId", postId),
                    Query.equal("userId", userId),
                ]
            );
            return response.documents.length > 0 ? response.documents[0] : null;
        } catch (error) {
            console.error("Error checking bookmark:", error);
            throw error;
        }
    }

    async getBookmarksByUser(userId, postId) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteBookmarksCollectionId,
                [
                    Query.equal('userId', userId), // Match userId
                    Query.equal('postId', postId), // Match postId
                ]
            );
            return response.documents[0] || null; // Return the first matching document (or null if not found)
        } catch (error) {
            console.error("Error fetching bookmark:", error);
            throw error; // Handle the error appropriately
        }
    } 

}


const service = new Service()
export default service