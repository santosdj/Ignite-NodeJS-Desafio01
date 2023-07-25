import http from "node:http";
import { parsereqasjson } from "./middlewares/parsereqasjson.js";
import { routes } from "./routes.js";
import { extractQueryParameters } from "./utils/extract-query-params.js";

const SERVER_PORT = 3335;

const server = http.createServer(async (req, res)=>{
    const {method, url} = req;
    console.log(method,url)

    await parsereqasjson(req,res)
    
    const route = routes.find( route => {
        return route.method===method && route.path.test(url)
    });

    if(route){
        const routeParams = req.url.match(route.path)

        const {query, ...params } = routeParams.groups
        req.params = params

        console.log("route server", query)
        const reqquery = query ? extractQueryParameters(query) : {}
        console.log("req query", reqquery)
        req.query = reqquery
        console.log("pendurei query" , req.query)
        //executes the function defined on the route property handler
        return route.handler(req,res)
    }



    res.writeHead(404).end()

});


server.listen(SERVER_PORT,()=>{
    console.log(`Ignite - Desafio 01 - Task API started on port ${SERVER_PORT}`)
})
