import "dotenv/config";
import express from "express";
import ytdl from "ytdl-core";
import cors from "cors";
import packageJson from "../package.json";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/healthcheck", (_req, res) => {
    return res.json({
        green: true,
        version: packageJson.version,
    });
});

app.get("/watch", (req: express.Request, res: express.Response) => {
    const { v } = req.query;
    res.header("Content-Disposition", `attachment; filename=video-${v}.mp4`);
    
    return ytdl(`https://www.youtube.com/watch?v=${v}`,{
    }).pipe(res);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});