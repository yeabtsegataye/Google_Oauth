const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')

const userRoutes = require("./routes/auth")

const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path , req.method)
    next()
})
app.use("/users", userRoutes)

const PORT = process.env.PORT || 5000;
const MONGOOSE_URL = "mongodb+srv://tatipassword:tatipassword@cluster0.j12sxcz.mongodb.net/google_Oauth"
mongoose.set('strictQuery', false);

mongoose.connect(MONGOOSE_URL)
.then(()=> app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
}))
.catch(err=>{
    console.log(err)
})