import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"

const PORT = process.env.PORT || 5000;

const client = new MongoClient("mongodb+srv://sans:123@cluster0.or7gb.mongodb.net/")

let todolists;
const main=async()=>{
    await client.connect()
    console.log("connected to mongodb cloud"); 
    todolists = client.db("tododatabase").collection("todolists")
}

const app = express()
app.use(cors())
app.use(express.json())


app.get("/", async (req, res) => {
    const data = await todolists.find().toArray();
    res.send({
        status: 200,
        data
    })
})

app.post("/", async(req, res) => {
    let ipvalue = req.body.ipvalue
    await todolists.insertOne({ipvalue})
    res.status(200).json({ status: true })
})

app.put("/", async(req, res) => {
    const { ipvalue } = req.body
    const  index  = req.query.index
    await todolists.updateOne({_id:new MongoClient.ObjectId(index)},{$set:{ipvalue}})
    res.status(200).json({ status: true })
})

app.delete("/:index", async(req, res) => {
    const { index } = req.params
    await todolists.deleteOne({_id:new MongoClient.ObjectId(index)})
    res.status(200).json({ status: true })
})

app.listen(PORT, () => {
    console.log("server started on port no 5000");
    main()
})


// mongodb+srv://sans:123@cluster0.or7gb.mongodb.net/