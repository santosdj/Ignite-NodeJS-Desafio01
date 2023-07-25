import {parse} from "csv-parse"
import fs from 'fs';



const filePath = new URL( "./tasks.csv", import.meta.url)

const postData = async (data) => {

    const result = await fetch('http://localhost:3335/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    console.log(`${data.title} - ${result.statusText} `)
}



const processFile = async () => {
    const records = [];
    const parser = fs
      .createReadStream(filePath.pathname)
      .pipe(parse({
        from_line:2
      }));
    for await (const record of parser) {
      // Work with each record
      const [title, description] = record
      const data = {
        title ,
        description
      }
      await postData(data)
    }
    return records;
  };

  (async () => {
    const records = await processFile();
  })();

