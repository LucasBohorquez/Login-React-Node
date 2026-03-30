
import { createApp } from "./index.js";
import { UserModel } from "./database/users.js";

createApp({ userModel: UserModel })