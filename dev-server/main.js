const fastify = require("fastify")()
const path = require("path")

fastify.register(require("@fastify/static"), {
  root: path.resolve(__dirname, "../"),
  prefix: "/",
})

fastify.get("/", function (req, reply) {
  return reply.sendFile("weibo-dl.js")
})

fastify.listen(3001, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})
