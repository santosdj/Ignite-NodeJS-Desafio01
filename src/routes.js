//defining the api routes as an array of objects with the atributes:
// method: HTTP Method [GET,POST,PUT,DELETE...]
// path: [route path]
// handler: arrow function that handles the route with the request and response as parameters.

import { Database } from "./database.js"
import { randomUUID } from "node:crypto";
import { getRoutePath } from "./utils/get-route-path.js";

const database = new Database()

export const routes = [
    {
        method:"GET",
        path: getRoutePath("/tasks"),
        handler:(req,res) => {

            const query = req.query

            return res.end(JSON.stringify(database.select("tasks", JSON.stringify(query)==='{}' ? null : query)))
        }
    },
    {
        method:"POST",
        path: getRoutePath("/tasks"),
        handler:(req,res) => {
            const {title, description} = req.body
            console.log("handling post /tasks body=", req.body)

            if(title && description) {

            const task = {
                id : randomUUID(),
                title,
                description,
                completed_at:null,
                created_at: new Date(),
                updated_at : new Date()
            }
    
            database.insert("tasks", task)
    
    
            return res.writeHead(201,"Task Created").end()}
            else return res.writeHead(400, "Invalid arguments").end()
        }
  
    },
    {
        method:"DELETE",
        path: getRoutePath('/tasks/:id'),
        handler:(req,res) => {
            const{id}=req.params

            const rowIndex = database.delete("tasks", id)
            if (rowIndex > -1)  return res.writeHead(204).end()
            return res.writeHead(400).end("Invalid id")
        }
  
    },
    {
        method:"PUT",
        path: getRoutePath('/tasks/:id'),
        handler:(req,res) => {
            const{id}=req.params
            const{title, description} = req.body
            const data = {
                title, 
                description, 
                updated_at:new Date()
            }
           const rowIndex =  database.update("tasks", id, data)   
            
            if (rowIndex > -1)  return res.writeHead(200).end()
            return res.writeHead(400).end("Invalid id")
    
        }
  
    },
    {
        method:"PATCH",
        path: getRoutePath('/tasks/:id/complete'),
        handler:(req,res) => {
            const{id}=req.params
           const rowIndex = database.tooglestatus("tasks", id)                
    
            if (rowIndex > -1)  return res.writeHead(200).end()
            return res.writeHead(400).end("Invalid id")
        }
  
    }
]