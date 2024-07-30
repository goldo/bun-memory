# bun-memory

### Investigation of potential bun memory leak 

heapStats().objectTypeCounts check: 

```ts
    heapStats().objectTypeCounts["Array"],
    heapStats().objectTypeCounts["Object"],
    heapStats().objectTypeCounts["Structure"]
```

at the beginning:

```bash
$ bun start
# curl http://localhost:3010
708 2252 7658
```

after `autocannon -c 30 -d 30 http://localhost:3010` :

```bash
18905 54499 15811
```

After a few minutes (waiting for GC), the objectTypeCounts seems still high, and the memory usage is still high (101mb) vs initial (71mb):
```bash
# curl http://localhost:3010
17515 51800 15549
```

The problem seems to be the same with or without the fastify plugin.

To install dependencies:

```bash
bun install
```

To run with fastify plugin:

```bash
bun start
```

Or without plugin:

```bash
bun start:without-plugin
```

This project was created using `bun init` in bun v1.1.20. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
