const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const helpers = require("handlebars-helpers")();

const outputDirectory = "./out"
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true })
}

const pdfs_tempate = handlebars.compile(fs.readFileSync("familyecho.hbs", "utf8"));
var pdfs = require("./PDFS.json");
const thePDFS = pdfs_tempate(pdfs);
const pdfslocation = path.join(outputDirectory,"familyecho.html");
fs.writeFileSync(pdfslocation, thePDFS, "utf8");
console.log("Family Echo page has been updated");