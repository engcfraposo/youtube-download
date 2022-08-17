import express from "express";
import ytdl from "ytdl-core";

const app = express();

app.use(express.json());

app.get("/watch", (req: express.Request, res: express.Response) => {
    const { v } = req.query;
    res.header("Content-Disposition", `attachment; filename=video-${v}.mp4`);
    
    return ytdl(`https://www.youtube.com/watch?v=${v}`,{
    }).pipe(res);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});