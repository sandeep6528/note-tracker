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

app.delete("/api/notes/:id",(req,res)=>{
    try {

        let notesdata = fs.readFileSync("./db/db.json","utf-8")
    let databasedata = JSON.parse(notesdata)
    const notesarray = databasedata.filter((notetodelete)=>{
        return notetodelete.id !== req.params.id

    })
    fs.writeFileSync("./db/db.json",JSON.stringify(notesarray))
    res.json("notedelete")
    
    } catch (err) {
    console.error(err)
    res.status(500).json(err)
        
    }
    
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