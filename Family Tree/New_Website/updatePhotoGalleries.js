// Requires
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const helpers = require("handlebars-helpers")();

const outputDirectory = "./out"
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true })
}

const photo_album_tempate = handlebars.compile(fs.readFileSync("photo_gallery.hbs", "utf8"));

var photo_album1 = require("./Photo_Album1.json");
var photo_album2 = require("./Photo_Album2.json");
var photo_album3 = require("./Photo_Album3.json");
var loose_photos = require("./Loose_Photos.json");

const album1 = photo_album_tempate(photo_album1);
const album2 = photo_album_tempate(photo_album2);
const album3 = photo_album_tempate(photo_album3);
const album4 = photo_album_tempate(loose_photos);

const albumLocation1 = path.join(outputDirectory,"photoAlbum1.html");
const albumLocation2 = path.join(outputDirectory,"photoAlbum2.html");
const albumLocation3 = path.join(outputDirectory,"photoAlbum3.html");
const albumLocation4 = path.join(outputDirectory,"loosephotos.html");

fs.writeFileSync(albumLocation1, album1, "utf8");
fs.writeFileSync(albumLocation2, album2, "utf8");
fs.writeFileSync(albumLocation3, album3, "utf8");
fs.writeFileSync(albumLocation4, album4, "utf8");

console.log("Photo Album 1 has been updated");
console.log("Photo Album 2 has been updated");
console.log("Photo Album 3 has been updated");
console.log("Loose Photos has been updated");

// Templates
//const index_template = handlebars.compile(fs.readFileSync("index.hbs", "utf8")) *DON'T USE*
