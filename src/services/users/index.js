import express from "express" // 3RD PARTY MODULE (npm i express)
import fs from "fs" // CORE MODULE (no need to install it)
import { fileURLToPath } from "url" // CORE MODULE
import { dirname, join } from "path" // CORE MODULE
import uniqid from "uniqid"



const currentFilePath = fileURLToPath(import.meta.url)

const parentFolderPath = dirname(currentFilePath)

const usersJSONPath = join(parentFolderPath, "users.json")


const usersRouter = express.Router()
usersRouter.post("/", (req, res) => {
  console.log("REQUEST BODY: ", req.body)

  const newUser = { ...req.body, createdAt: new Date(), id: uniqid() }
  console.log(newUser)

  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  usersArray.push(newUser)

  fs.writeFileSync(usersJSONPath, JSON.stringify(usersArray))

  res.status(201).send({ id: newUser.id })
})

usersRouter.get("/", (req, res) => {
  // // 1. Read the content of users.json file
  console.log("FILE CONTENT: ", JSON.parse(fileContent))


  res.send(usersArray)
})

// 3.
usersRouter.get("/:userId", (req, res) => {
  console.log("ID: ", req.params.userId)

  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  const foundUser = usersArray.find(user => user.id === req.params.userId)


  res.send(foundUser)
})

// 4.
usersRouter.put("/:userId", (req, res) => {
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  const index = usersArray.findIndex(user => user.id === req.params.userId)
  const oldUser = usersArray[index]
  const updatedUser = { ...oldUser, ...req.body, updatedAt: new Date() }
  usersArray[index] = updatedUser

  fs.writeFileSync(usersJSONPath, JSON.stringify(usersArray))

  res.send(updatedUser)
})

usersRouter.delete("/:userId", (req, res) => {
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

 
  const remainingUsers = usersArray.filter(user => user.id !== req.params.userId) 

  fs.writeFileSync(usersJSONPath, JSON.stringify(remainingUsers))

  res.status(204).send()
})

export default usersRouter