const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
console.log('Hello World!')
const mysql = require('mysql2');
const yaml = require('js-yaml');
const fs = require('fs');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'mi3-ss121.a2hosting.com',
  user: 'bdpamked',
  password: 'U;qibKs[2KC607',
  database: 'bdpamked_student_DB'
});

// Connect to the MySQL database
connection.connect();

// Get the table metadata
connection.query('SHOW TABLES', (error, results, fields) => {
  if (error) throw error;

  // Generate the Swagger file
  const swagger = {
    openapi: '3.0.0',
    info: {
      title: '<title>',
      version: '<version>'
    },
    paths: {}
  };

  results.forEach((table) => {
    const tableName = table[Object.keys(table)[0]];
    swagger.paths[`/${tableName}`] = {
      get: {
        summary: `Get all ${tableName}`,
        responses: {
          200: {
            description: `Returns all ${tableName}`,
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: `#/components/schemas/${tableName}`
                  }
                }
              }
            }
          }
        }
      }
    };
  });

  // Write the Swagger file to disk
  fs.writeFileSync('<filename>.yaml', yaml.dump(swagger));
});

// Close the connection to the MySQL database
connection.end();




  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
