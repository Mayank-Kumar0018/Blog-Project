import config from "../Config/config";
import { Client, ID, Storage } from "appwrite";

export class appwriteStorage {
    client  = new Client()
    storage;
    constructor (){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId);
        this.storage = new Storage(this.client)
    }

    async uploadFile (fileID) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketID,
                ID.unique(),
                fileID
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile (fileID) {
        try {
             await this.storage.deleteFile(
                config.appwriteBucketID,
                fileID
            )
        } catch (error) {
            throw error
        }
    }

    async getFilePreview (fileID) {
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketID,
                fileID
            )
            // return `https://${config.appwriteURL}/v1/storage/buckets/${config.appwriteBucketID}/files/${fileID}/preview`;
        } catch (error) {
            throw error
        }
    }
}

const storage = new appwriteStorage()
export default storage;