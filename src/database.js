import fs from "node:fs/promises"

const databasePath = new URL( "../db.json", import.meta.url)

export class Database{
    #database = {}

    constructor(){
        const data = fs.readFile(databasePath.pathname,"utf-8").
        then( data =>{
            this.#database = JSON.parse(data);
        }).catch(()=>{
            this.#save()
        })
       
    }

    #save(){
        console.log(databasePath.pathname)
        fs.writeFile(databasePath.pathname, 
            JSON.stringify(this.#database));
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }
        this.#save()
        return data
    }

    select(table, search){
        let data = this.#database[table] ?? []
  

        if(search){
            const {title,description} = search
            console.log("entrou no search", title)
            data = data.filter(row => {
                return Object.entries(search)
                .every(([key,value])=>{
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    update(table, id, data){
      const rowIndex = this.#database[table].findIndex( row => row.id === id)
      const {title, description,updated_at} = data
      if(rowIndex > -1){
        const row = this.#database[table][rowIndex]
        row.title = title ?? row.title
        row.description= description ?? row.description
        row.updated_at= updated_at 

        this.#database[table][rowIndex] = row
        this.#save()
      }

      return rowIndex

    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex( row => row.id === id)

        if(rowIndex > -1){
            this.#database[table].splice(rowIndex,1)
            this.#save()
        }

        return rowIndex
    }

    tooglestatus(table, id){
        const rowIndex = this.#database[table].findIndex( row => row.id === id)

        if(rowIndex > -1){
          const row =   this.#database[table][rowIndex]
          row.completed_at = row.completed_at ? null : new Date()
          this.#save()
        }

        return rowIndex
    }
 

}