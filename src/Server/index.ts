import jsonServer from "json-server";

const server = jsonServer.create();
const routes = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3200;

server.use(middlewares);
server.use(routes);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
