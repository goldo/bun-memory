import { heapStats } from "bun:jsc";
import Fastify from "fastify";
import prismaPlugin from "./fastify-plugin";

const fastify = Fastify();

fastify.register(prismaPlugin);

fastify.get("/", async function (request, reply) {
  console.log(
    heapStats().objectTypeCounts["Array"],
    heapStats().objectTypeCounts["Object"],
    heapStats().objectTypeCounts["Structure"]
  );

  const users = await request.server.prisma.user.count();

  reply.send({ hello: users });
});

await fastify.listen({ port: 3010 });
