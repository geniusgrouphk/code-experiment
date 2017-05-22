an experiment to try axios sending CORS request.

server side needs to cater OPTIONS method for the request

sample setup of the server in ExpressJS:
```
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Request-Methods', '*')
  next()
})
```

for people who are too lazy to setup a static file server, the `package.json` includes http-server, just run `npm start` and amend index.html accordingly to send requests
