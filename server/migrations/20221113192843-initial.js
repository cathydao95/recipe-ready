import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let dbm;
let type;
let seed;
let Promise;

// setup function
export function setup(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
}

export function up(db) {
  const filePath = path.join(
    __dirname,
    "sqls",
    "20221113192843-initial-up.sql"
  );
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) return reject(err);
      console.log("received data: " + data);
      resolve(data);
    });
  }).then((data) => {
    return db.runSql(data);
  });
}

export function down(db) {
  const filePath = path.join(
    __dirname,
    "sqls",
    "20221113192843-initial-down.sql"
  );
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) return reject(err);
      console.log("received data: " + data);
      resolve(data);
    });
  }).then((data) => {
    return db.runSql(data);
  });
}

// _meta export
export const _meta = {
  version: 1,
};
