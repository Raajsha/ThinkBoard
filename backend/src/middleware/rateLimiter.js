import ratelimit from "../config/upstashConfig.js";
const rateLimiter = async(req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }
        next();
    } catch (error) {
        console.log("Rate Limit error");
    }
}
export default rateLimiter;