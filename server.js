//importiamo le librerie express e mongoose
import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import blogAuthorsRoute from './routes/blogAuthors.js'
import blogPostsRoute from './routes/blogPosts.js'

//specifichiamo la porta di ascolto del server
const PORT = 5050;

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', blogAuthorsRoute)
app.use('/', blogPostsRoute)

//metodo di connessione al DB
mongoose.connect('mongodb+srv://andreacampetella:nqGQL0OLT2LTM9I4@cluster0.vdwisml.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//salviamo la connessione al DB in una variabile
const db = mongoose.connection;

//definizione dei listener relativi al DB
db.on('error', console.error.bind(console, 'DB connection error')) //listener degli errori
db.once('open', ()=>{console.log('DB connected')}) //listener della connessione al DB

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))