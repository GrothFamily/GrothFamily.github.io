function addToDropDown1(personName){
    var dropdown = document.getElementById("fam1");
    var option = document.createElement("option");
    option.innerHTML = personName;
    option.value = personName;
    dropdown.appendChild(option);
}

function addToDropDown2(personName){
    var dropdown = document.getElementById("fam2");
    var option = document.createElement("option");
    option.innerHTML = personName;
    option.value = personName;
    dropdown.appendChild(option);
}

function getValueFromDropdown1(){
    var selected = document.getElementById("fam1");
    if(selected != undefined){
        var opt = selected.options[selected.selectedIndex];
        return opt.value;
    }
}

function getValueFromDropdown2(){
    var selected = document.getElementById("fam2");
    if(selected != undefined){
        var opt = selected.options[selected.selectedIndex];
        return opt.value;
    }
}