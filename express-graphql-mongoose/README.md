Experiment to use GraphQL to manage data in Mongo Atlas

# Setup
1. duplicate `credentials.example.js`
1. rename `credentials.example.js` as `credentials.js`
1. replace the `dbUrl` as your own url
1. npm i
1. npm start
1. make a POST request with body `{ name: 'test author' }` to `http://localhost/authors/`

After inserting authors, you can try querying by
`http://localhost:3000/query/authors?query=%7Bauthors(name%3A%22Test%22)%7B_id%2Cname%7D%7D`
OR
`http://localhost:3000/query/authors?query=%7Bauthors(name%3A%22Test%22)%7Bname%7D%7D`
