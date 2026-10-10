import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class Authservice{               //class method
    client = new Client()
    account;

    constructor(){                      //constructor method
        this.client 
        .setEndpoint(config.appwriteurl)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createaccount({email,password,name}){              //method
        try {
           const useraccount = await this.account.create(ID.unique(), email,password,name)    //create method
        } catch (error) {
            throw error;
        }
        if (useraccount) {
            return this.login({email,password})
        } else {
            
        }
    }

    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw(error)
        }
    }
    async getcurrentuser(){                 //currently login kina janar jonno 
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Service :: getcurrentuser :: error",error);
            
        }
        return null;        //account na pawa gele 
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Service :: getcurrentuser :: error",error);
        }
    }

    async passwordrecovery(){
        try {
            await this.account.createRecovery()
            
        } catch (error) {
            console.log("Appwrite Service :: getcurrentuser :: error",error);  
        }
    }
}

const authservice = new Authservice()        //class theke obj create kora hoise 

export default authservice
