import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";




const port = process.env.PORT;

const app: Express = express();





app.get("/", (req:Request, res:Response) => {
    res.status(200).send('Hello from Home Route');
})


app.get("/hi", (req:Request, res:Response) => {
    res.send("Hello from Hi Route")
})




app.listen(port, () => {
    console.log(`now listening on port ${port}`);    
});