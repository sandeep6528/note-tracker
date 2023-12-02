const db = require("./db/db.json")
const express = require("express")
const path = require("path")
const fs = require("fs")
const {
    v4:uuidv4
} = require("uuid")
const PORT = process.env.PORT|| 3001
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(express.static("public"))
app.get("/api/notes",(req,res)=> res.status(200).json(db))


app.post("/api/notes",(req,res)=>{
    const note = {
        title:req.body.title,
        text:req.body.text,
        id:uuidv4()
    }
    db.push(note)
    fs.writeFileSync("./db/db.json",JSON.stringify(db))
    res.json(note)
})
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/notes.html"))
})
app.get('*', (req, res) => {
    console.log('im the get route')
    res.sendFile(path.join(__dirname, '/public/index.html'))
})



app.listen(PORT,()=>{
    console.log("app listening on PORT:" +PORT)
})