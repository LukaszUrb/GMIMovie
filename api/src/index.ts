import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(path.dirname(require.main.filename), "../.env") });
import { APP_PORT, MONGO_URI, MONGO_OPTIONS, APP_ORIGIN } from "./config";
import { createApp } from "./app";


(async (): Promise<void> => {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    const app = createApp();
    app.listen(APP_PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server is up on ${APP_ORIGIN}`);
    });
})();