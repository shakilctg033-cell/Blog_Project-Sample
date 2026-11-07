import config from "../config/config";
import {Client, Account, ID} from "appwrite";

export class Authservice {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteurl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createaccount({email, password, name}) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (useraccount) {
        return this.login({email, password});
      }
      return useraccount;
    } catch (error) {
      throw error;
    }
  }

  async login({email, password}) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getcurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: getcurrentuser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Service :: getcurrentuser :: error", error);
    }
  }

  async passwordrecovery() {
    try {
      await this.account.createRecovery();
    } catch (error) {
      console.log("Appwrite Service :: getcurrentuser :: error", error);
    }
  }
}

const authservice = new Authservice();

export default authservice;
