const config = {
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config