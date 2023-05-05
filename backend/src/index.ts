import "@/lib/fire"; // for initialize

import cors from "cors";
import express, { json } from "express";

import { yoga } from "./yoga";

const port = process.env.PORT || 3000;
const app = express();

app.use(json());
app.use(cors());
app.use("/graphql", yoga);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/graphql`);
});
