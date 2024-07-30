import { PrismaClient } from "@prisma/client";
import { heapStats } from "bun:jsc";
import Fastify from "fastify";

const prisma = new PrismaClient();
const fastify = Fastify();

fastify.get("/", async function (request, reply) {
  console.log(
    heapStats().objectTypeCounts["Array"],
    heapStats().objectTypeCounts["Object"],
    heapStats().objectTypeCounts["Structure"]
  );

  const users = await prisma.user.count();

  reply.send({ hello: users });
});

await fastify.listen({ port: 3010 });
