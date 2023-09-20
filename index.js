const pg = require("pg");
const express = require("express");
const client = new pg.Client("git");
const app = express();
const cors = require("cors");

app.use(cors());

const server = async () => {
    await client.connect();
    console.log("DB connected");
    const SQL = `
        DROP TABLE IF EXISTS show;
        CREATE TABLE show(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            producer VARCHAR(100),
            year INT
        );
        INSERT INTO show(name, producer, year) VALUES('One Piece', 'Toei Animation', '1999'); 
    `;
    await client.query(SQL);
    console.log("tables seeded");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
};

server();
