import mongoose from "mongoose";

const connectDB = async (databaseUrl) => {
    try {
        const dbOption = {
            dbName: "Event",
        };
        await mongoose.connect(databaseUrl, dbOption);
        console.log("Database Connected..");
    } catch (error) {
        console.log(error);
    }
}

export { connectDB };