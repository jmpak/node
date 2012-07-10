http = require 'http'
str = 'Hello World'
http.createServer (req, res) ->
  str - 'Hello World!8'
  res.writeHead 200
  res.end str if true
.listen 4000
