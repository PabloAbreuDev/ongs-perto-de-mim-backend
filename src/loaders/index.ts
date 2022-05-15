import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import express from "express";

const startModules = async ({ app }: { app: express.Application }) => {
  await mongooseLoader();
  expressLoader({ app });
};

export default startModules;
