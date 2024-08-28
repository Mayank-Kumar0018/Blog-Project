import config from "../Config/config";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL) 
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)

    }
    async createAccount ({email , password , name}) {
        try {
            const userAccount = await this.account.create(ID.unique() , email , password , name)
            if (userAccount) {
                return this.login({email , password})
            }
            // await this.account.updatePrefs({
            //     name: name, 
            //   });

        } catch (error) {
            throw error;
        }
    }
    async login ({email , password}){
        try {
            const session = await this.account.createEmailPasswordSession(email , password);
            const jwt = await this.account.createJWT();
            console.log("jwt Token : ", jwt.jwt)
            localStorage.setItem("appwriteJWT", jwt.jwt);
            return session
        } catch (error) {
            throw error;
        }
    }
    async getAccount () {
        try {
            return await this.account.get();
            // Logged in
        } catch (error) {
            throw error
        }
        return null;
    }
    async logout () {
        try {
            await this.account.deleteSessions()
            localStorage.removeItem("appwriteJWT");
        } catch (error) {
            
        }
    }
    
}

const authService = new AuthService();
 export default authService;