export async function parsereqasjson(req, res){
 const buffers = [];

 //await untill all the requisition chuncks are collected.
 for await (const chunk of req){
    buffers.push(chunk)
 }
 
 try{
    req.body = JSON.parse(Buffer.concat(buffers).toString())
 } catch{
   req.boy=null
 }

 res.setHeader("Content-type", "application/json")
 
}