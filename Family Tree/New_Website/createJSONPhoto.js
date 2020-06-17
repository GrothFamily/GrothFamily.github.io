//requiring path and fs modules
const path = require('path');
const fs = require('fs');
var sortJsonArray = require('sort-json-array');

//joining path of directory 
//const directoryPath = path.dirname('J:/Grandpa Groths Family Tree/Groth_Family_Tree/New_Website/OldestLadyOnFront/..');
//const directoryPath = path.dirname('D:/Grandpa Groths Family Tree/Groth_Family_Tree/New_Website/NotShoeStringBlack/..');
//const directoryPath = path.dirname('D:/Grandpa Groths Family Tree/Groth_Family_Tree/New_Website/ShoeStringBlack/..');
//const directoryPath = path.dirname('D:/Grandpa Groths Family Tree/Groth_Family_Tree/New_Website/PDFs/..');
const directoryPath = path.dirname('D:/Grandpa Groths Family Tree/Groth_Family_Tree/New_Website/Loose Photos/..');
const galleries = ['loosePhotos']
const photoGalleries = { 

};

console.log("Start!");

// Loop through all the gallery (paths) and make a mapping (object) of them all.
galleries.forEach((gallery)=> {
    // getPhotopaths object and set it to the gallery.
    photoGalleries[gallery] = getPhotoPaths(path.join(directoryPath), gallery);
    console.log(gallery);
});

//sortJsonArray(photoGalleries.photo_album.filePath, "asc");

fs.writeFile("./Loose_Photos.json", JSON.stringify(photoGalleries), (err) =>{
    if(err){
        console.error(err);
        return;
    }
})

//passsing directoryPath and callback function
/*fs.readdir(directoryPath, function (err, photoGalleries) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    photoGalleries.forEach(function (file) {

        photoGalleries.push(file);

        fs.writeFile("./Photo_Album_1.json", JSON.stringify(photoGalleries), (err) =>{
            if(err){
                console.error(err);
                return;
            }
        })
    });
});*/
console.log("Done!");

function getPhotoPaths(directoryPath)
{
    return fs.readdirSync(directoryPath).map((file)=> {
        // Note that file is actually just the file name in the directory
        return {
            fileName: file.replace(/\.[^/.]+$/, ""), // removes the extension from the name
            filePath: "../../New_Website/Loose Photos/" + file, // restoring the (relative) path of the file
			peopleInPhoto: "",
            row: ""
        };
    });
}