
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("MONGODB_URI is not set");
}
await mongoose.connect(uri)
console.log("Connected to MongoDB");

const shortUrlSchema = new mongoose.Schema({
    originalUrl: String,
    shortPath: {
        type: String,
        unique: true,
    },
    expireAt: {
        type: Date,
    }
});

shortUrlSchema.index({ shortPath: "text", originalUrl: "text"});
shortUrlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

export default ShortUrl;