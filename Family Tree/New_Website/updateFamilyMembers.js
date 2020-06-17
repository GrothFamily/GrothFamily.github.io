const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const helpers = require("handlebars-helpers")();

const outputDirectory = "./out"
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true })
}

var KarlGrothFamily = require("./KarlGrothFamily.json");
var HermanGrothFamily = require("./HermanAGrothFamily.json");
var AlbertinaGrothFamily = require("./AlbertinaGrothFamily.json");
var AdelinaGrothFamily = require("./AdelinaGrothFamily.json");
var AlbertGrothFamily = require("./AlbertGrothFamily.json");
var JuliusGrothFamily = require("./JuliusGrothFamily.json");
var HeinrichGrothFamily = require("./HeinrichJGrothFamily.json");
var OttoGrothFamily = require("./OttoGrothFamily.json");
var hammanFamily = require("./hammanFamily.json");
var petersFamily = require("./petersFamily.json");
var gipphalliganFamily = require("./gipphalliganFamily.json");

handlebars.registerHelper('fileExist', function(){
    var fileName = "./out/" + this + ".html";
    if(fs.existsSync(fileName)){
        fileName = this + ".html";
        return fileName;
    }
    else{
        fileName = "NoPerson.html";
        return fileName;
    }
});

handlebars.registerHelper('spouseExist', function(name){
    var spouseName = "./out/" + name + ".html";
    if(fs.existsSync(spouseName)){
        spouseName = name + ".html";
        return spouseName;
    }
    else{
        spouseName = "NoPerson.html";
        return spouseName;
    }
});

const person_template = handlebars.compile(fs.readFileSync("person.hbs", "utf8"));

function inards(member){
    const person_output = person_template(member);

    const firstName = member.firstName;
    const lastName = member.lastName;
    const personLocation = path.join(outputDirectory, firstName + " " + lastName + ".html")
    fs.writeFileSync(personLocation, person_output, "utf8")
}

KarlGrothFamily.familyMembers.forEach((member)=>{
    inards(member);
});

console.log("Karl Groth Family updated");

HermanGrothFamily.familyMembers.forEach((member)=>{
    inards(member);
});

console.log("Herman Groth Family updated");

AlbertinaGrothFamily.familyMembers.forEach((member)=>{
    inards(member);
});

console.log("Albertina Groth Family updated");

AdelinaGrothFamily.familyMembers.forEach((member)=>{
    inards(member);
});

console.log("Adelina Groth Family updated");

AlbertGrothFamily.familyMembers.forEach((member)=>{
    inards(member);
});

console.log("Albert Groth Family updated");

JuliusGrothFamily.familyMembers.forEach((member)=>{
    inards(member);
});

console.log("Julius Groth Family updated");

HeinrichGrothFamily.familyMembers.forEach((member)=>{
    inards(member);
});

console.log("Heinrich Groth Family updated");

OttoGrothFamily.familyMembers.forEach((member)=>{
    inards(member);
});

console.log("Otto Groth Family updated");

hammanFamily.HammanFamily.forEach((member)=>{
    const person_output = person_template(member);

    const firstName = member.firstName;
    const lastName = member.lastName;
    const personLocation = path.join(outputDirectory, firstName + " " + lastName + ".html")
    fs.writeFileSync(personLocation, person_output, "utf8")

});

petersFamily.petersFamily.forEach((member)=>{
    const person_output = person_template(member);

    const firstName = member.firstName;
    const lastName = member.lastName;
    const personLocation = path.join(outputDirectory, firstName + " " + lastName + ".html")
    fs.writeFileSync(personLocation, person_output, "utf8")

});

gipphalliganFamily.GippHalliganFamily.forEach((member)=>{
    const person_output = person_template(member);

    const firstName = member.firstName;
    const lastName = member.lastName;
    const personLocation = path.join(outputDirectory, firstName + " " + lastName + ".html")
    fs.writeFileSync(personLocation, person_output, "utf8")

});
console.log("All family members pages have been updated");