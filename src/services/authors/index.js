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

  console.log("FILE CONTENT: ", JSON.parse(fileContent))

  res.send(authorsArray)
})

authorsRouter.get("/:authorId", (req, res) => {
  console.log("ID: ", req.params.authorId)

  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  const foundAuthor = authorsArray.find(author => author.id === req.params.authorId)

  res.send(foundAuthor)
})

// 4.
authorsRouter.put("/:authorId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  const index = authorsArray.findIndex(author => author.id === req.params.authorId)
  const oldAuthor = authorsArray[index]
  const updatedAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() }
  authorsArray[index] = updatedAuthor

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

  res.send(updatedAuthor)
})

authorsRouter.delete("/:authorId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

 
  const remainingauthors = authorsArray.filter(author => author.id !== req.params.authorId) 

  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingauthors))

  res.status(204).send()
})

export default authorsRouter