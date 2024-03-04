import fs from "fs";
import { format } from "date-fns";
import express from "express";
const app = express();
const PORT = 2000;

app.get("/write", (req, res) => {
  let today = format(new Date(), "dd-MM-yyyy HH-mm-ss");
  console.log("today:", today);
  let folderPath = "TimeStamp";

  let filepath = `${folderPath}/${today}.txt`;

  fs.writeFileSync(filepath, today, "utf8");

  res.status(200).json({ message: "File created successfully" });
});

app.get("/read", (req, res) => {
  let folderPath = "TimeStamp";

  let files = fs.readdirSync(folderPath);

  if (files.length > 0) {
    let latestFile = files[files.length - 1];
    let filepath = `${folderPath}/${latestFile}`;

    let data = fs.readFileSync(filepath, "utf8");
    res.status(200).send(data);
  } else {
    res.status(404).json({ error: "No files found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
