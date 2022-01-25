import express from "express"

const usersRouter = express.Router

usersRouter.get("/",(req,res)=>{
    res.send('helllo')
})
usersRouter.get("/")
usersRouter.post("/")
usersRouter.put("/")
usersRouter.delete("/")


export default usersRouter