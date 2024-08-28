import config from "../Config/config"
import { Client, Databases, ID } from "appwrite";

export class Database {
    client = new Client()
    database;
    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.database = new Databases(this.client)
    }

    async createPost({Title, slug, Content, FeatureImage, UserId, Status}) {
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    Title,
                    Content,
                    FeatureImage,
                    UserId,
                    Status
                })
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, {Title, Content, FeatureImage, UserId, Status}) {
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    Title,
                    Content,
                    FeatureImage,
                    Status
                },

            );

        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
            );

        } catch (error) {
            throw error
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
            );

        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries,
                

            )
        } catch (error) {
            throw error

        }
    }
};

const DB = new Database();
export default DB;