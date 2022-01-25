import express from "express" // 3RD PARTY MODULE (npm i express)
import fs from "fs" // CORE MODULE (no need to install it)
import { fileURLToPath } from "url" // CORE MODULE
import { dirname, join } from "path" // CORE MODULE
import uniqid from "uniqid"



const currentFilePath = fileURLToPath(import.meta.url)

const parentFolderPath = dirname(currentFilePath)

const authorsJSONPath = join(parentFolderPath, "authors.json")


const authorsRouter = express.Router()
authorsRouter.post("/", (req, res) => {
  console.log("REQUEST BODY: ", req.body)

  const newUser = { ...req.body, createdAt: new Date(), id: uniqid() }
  console.log(newUser)

  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  authorsArray.push(newUser)

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

  res.status(201).send({ id: newUser.id })
})

authorsRouter.get("/", (req, res) => {
  // // 1. Read the content of authors.json file
  console.log("FILE CONTENT: ", JSON.parse(fileContent))


  res.send(authorsArray)
})

// 3.
authorsRouter.get("/:userId", (req, res) => {
  console.log("ID: ", req.params.userId)

  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  const foundUser = authorsArray.find(user => user.id === req.params.userId)


  res.send(foundUser)
})

// 4.
authorsRouter.put("/:userId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  const index = authorsArray.findIndex(user => user.id === req.params.userId)
  const oldUser = authorsArray[index]
  const updatedUser = { ...oldUser, ...req.body, updatedAt: new Date() }
  authorsArray[index] = updatedUser

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

  res.send(updatedUser)
})

authorsRouter.delete("/:userId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

 
  const remainingauthors = authorsArray.filter(user => user.id !== req.params.userId) 

  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingauthors))

  res.status(204).send()
})

export default authorsRouter