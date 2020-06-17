function familyMembers(start, end){
    var startPersonLevel = start.level;
    var endPersonLevel = end.level;

    if(startPersonLevel < endPersonLevel || startPersonLevel == endPersonLevel){
        var temp;
        var tempLevel;
        // get rid of backwards (ex. Mary --> Lyle), just when the slect them, bts swap them. You get same result
        // I should be able to remove double backs
        temp = start;
        tempLevel = startPersonLevel;
        start = end;
        startPersonLevel = endPersonLevel;
        end = temp;
        endPersonLevel = tempLevel;
    }

    var parent = grandParentCheck(start);
    var grandP = grandParentCheck(parent);
    var greatP = grandParentCheck(grandP);
    var doubleGreatP = grandParentCheck(greatP);
    var tripleGreatP = grandParentCheck(doubleGreatP);

    
    var FOUND = false;

    if(!FOUND){
        FOUND = findSiblings(start, end, FOUND)
    }

    if(!FOUND){
        FOUND = findParents(start, end, FOUND);
    }
    
    if(!FOUND){
        FOUND = findUncles(start, end, FOUND, startPersonLevel, endPersonLevel, parent, grandP, greatP, doubleGreatP, tripleGreatP);
    }

    if(!FOUND){
        FOUND = findCousins(end, FOUND, startPersonLevel, endPersonLevel, parent, grandP, greatP, doubleGreatP, tripleGreatP);
    }

    if(!FOUND){
        FOUND = findSecondCousins(end, FOUND, startPersonLevel, endPersonLevel, grandP, greatP, doubleGreatP, tripleGreatP);
    }

    if(!FOUND){
        FOUND = findGrandParent(end, FOUND, startPersonLevel, endPersonLevel, grandP, greatP, doubleGreatP, tripleGreatP);
    }
}

function findSiblings(startPerson, endPerson, isSibling){
    var startPersonSibling = startPerson.siblings;
    for(var i = 0; i < startPersonSibling.length; i++){
        var sibling = startPersonSibling[i];

        if(sibling.value == endPerson.value){
            // 'Start' and 'end' are cousins by being on same level but different parents, but parents have to be siblings
            var element = document.getElementById("relation");
            element.innerHTML = "Brother/Sister";
            isSibling = true;
            break;
        }
    }
    return isSibling;
}

function findParents(startPerson, endPerson, isParent){
    var Parent = startPerson.actualAdultParent;
    var startPersonChildren = startPerson.actualChildren;

    if(Parent.value == endPerson.value){
        isParent = true;
    }

    if(!isParent){
        for(var i = 0; i < startPersonChildren.length; i++){
            var parentsChild = startPersonChildren[i];
    
            if(parentsChild.value == endPerson.value){
                isParent = true;
                break;
            }
        }
    }

    if(isParent){
        var element = document.getElementById("relation");
        element.innerHTML = "Father/Mother -- Son/Daughter";
    }

    return isParent;
}

function findGrandParent(endPerson, isGrandParent, startPersonLevel, endPersonLevel, grandP, greatP, doubleGreatP, tripleGreatP){
    if((startPersonLevel - 2) == endPersonLevel){
        var text = "Grand Father/Mother -- Grand Son/Daughter";
        isGrandParent = grandParentHelper(grandP, endPerson, isGrandParent, text);
    }
    else if((startPersonLevel - 3) == endPersonLevel){
        var text = "Great Grand Father/Mother -- Great Grand Son/Daughter";
        isGrandParent = grandParentHelper(greatP, endPerson, isGrandParent, text);
    }
    else if((startPersonLevel - 4) == endPersonLevel){
        var text = "2x Great Grand Father/Mother -- 2x Great Grand Son/Daughter";
        isGrandParent = grandParentHelper(doubleGreatP, endPerson, isGrandParent, text);
    }
    else if((startPersonLevel - 5) == endPersonLevel){
        var text = "3x Great Grand Father/Mother -- 3x Great Grand Son/Daughter";
        isGrandParent = grandParentHelper(tripleGreatP, endPerson, isGrandParent, text);
    }
    return isGrandParent;
}

function findCousins(endPerson, isCousin, startPersonLevel, endPersonLevel, parent, grandP, greatP, doubleGreatP, tripleGreatP){
    if(startPersonLevel== endPersonLevel){
        var text = "First Cousins";
        isCousin = cousinHelper(parent, isCousin, text, endPerson, startPersonLevel, endPersonLevel);
    }
    else if((startPersonLevel - 1) == endPersonLevel){
        var text = "First Cousins Once Removed";
        isCousin = cousinHelper(grandP, isCousin, text, endPerson, startPersonLevel, endPersonLevel);
    }
    else if((startPersonLevel - 2) == endPersonLevel){
        var text = "First Cousins Twice Removed";
        isCousin = cousinHelper(greatP, isCousin, text, endPerson, startPersonLevel, endPersonLevel);
    }
    else if((startPersonLevel - 3) == endPersonLevel){
        var text = "First Cousins Thrice Removed";
        isCousin = cousinHelper(doubleGreatP, isCousin, text, endPerson, startPersonLevel, endPersonLevel);
    }
    else if((startPersonLevel - 4) == endPersonLevel){
        var text = "First Cousins Fourth Removed";
        isCousin = cousinHelper(tripleGreatP, isCousin, text, endPerson, startPersonLevel, endPersonLevel);
    }
    
    return isCousin;
}

function findSecondCousins(endPerson, isSecondCousin, startPersonLevel, endPersonLevel, grandP, greatP, doubleGreatP, tripleGreatP){
    if(startPersonLevel == endPersonLevel){
        var text = "Second Cousins";
        isSecondCousin = secondCousinHelper(grandP, isSecondCousin, text, endPerson, startPersonLevel, endPersonLevel);
    }
    else if((startPersonLevel - 1) == endPersonLevel){
        var text = "Second Cousins Once Removed";
        isSecondCousin = secondCousinHelper(greatP, isSecondCousin, text, endPerson, startPersonLevel, endPersonLevel);
    }
    else if((startPersonLevel - 2) == endPersonLevel){
        var text = "Second Cousins Twice Removed";
        isSecondCousin = secondCousinHelper(doubleGreatP, isSecondCousin, text, endPerson, startPersonLevel, endPersonLevel);
    }
    else if((startPersonLevel - 3) == endPersonLevel){
        var text = "Second Cousins Thrice Removed";
        isSecondCousin = secondCousinHelper(tripleGreatP, isSecondCousin, text, endPerson, startPersonLevel, endPersonLevel);
    }
    return isSecondCousin;
}

function findUncles(startPerson, endPerson, isUncle, startPersonLevel, endPersonLevel, parent, grandP, greatP, doubleGreatP, tripleGreatP){
    if(((startPersonLevel + 1) == endPersonLevel || (startPersonLevel - 1) == endPersonLevel)){
        var text = "Uncle/Aunt -- Nephew/Niece";
        return isUncle = uncleHelper(startPerson, isUncle, parent, text, endPerson);
    }
    else if((startPersonLevel - 2) == endPersonLevel){
        var text = "Great Uncle/Aunt -- Grand Nephew/Niece";
        return isUncle = uncleHelper(startPerson, isUncle, grandP, text, endPerson);
    }
    else if((startPersonLevel - 3) == endPersonLevel){
        var text = "Great Grand Uncle/Aunt -- Great Grand Nephew/Niece";
        return isUncle = uncleHelper(startPerson, isUncle, greatP, text, endPerson);
    }
    else if((startPersonLevel - 4) == endPersonLevel){
        var text = "2x Great Grand Uncle/Aunt -- 2x Great Grand Nephew/Niece";
        return isUncle = uncleHelper(startPerson, isUncle, doubleGreatP, text, endPerson);
    }
    else if((startPersonLevel - 5) == endPersonLevel){
        var text = "3x Great Grand Uncle/Aunt -- 3x Great Grand Nephew/Niece";
        return isUncle = uncleHelper(startPerson, isUncle, tripleGreatP, text, endPerson);
    }
}

function grandParentHelper(grandParent, endPerson, isGrandParent, text){
    if(grandParent != undefined && grandParent.value == endPerson.value){
        isGrandParent = true;
    }

    if(isGrandParent){
        var element = document.getElementById("relation");
        element.innerHTML = text;
    }

    return isGrandParent;
}

function grandParentCheck(grandP){
    if(grandP == undefined || grandP == "None"){
        
    }
    else{
        grandP = grandP.actualAdultParent;
    }
    return grandP;
}

function cousinHelper(parent, isCousin, text, endPerson){
    var parentSiblings = parent.siblings;
    
    if(!isCousin){
        if(parentSiblings != undefined){

            for(var i = 0; i < parentSiblings.length; i++){
                var sibling = parentSiblings[i];
    
                if(sibling.actualChildren.length > 0){
                    for(var j = 0; j < sibling.actualChildren.length; j++){
                        var child = sibling.actualChildren[j];

                        if(child.value == endPerson.value){
                            isCousin = true;
                            break;
                        }
                    }
                }
            }
        }
    }

    if(isCousin){
        var element = document.getElementById("relation");
        element.innerHTML = text;
    }

    return isCousin;
}


function secondCousinHelper(parent, isSecondCousin, text, endPerson){
    var parentSiblings = parent.siblings;
    
    if(!isSecondCousin){
        if(parentSiblings != undefined && parentSiblings.length > 0){

            for(var i = 0; i < parentSiblings.length; i++){
                var sibling = parentSiblings[i];

                if(sibling.actualChildren.length > 0 && !isSecondCousin){
                    for(var k = 0; k < sibling.actualChildren.length; k++){
                        var child = sibling.actualChildren[k];

                        if(child.actualChildren.length > 0 && !isSecondCousin){
                            for(var j = 0; j < child.actualChildren.length; j++){
                                var childsChild = child.actualChildren[j];

                                if(childsChild.value == endPerson.value){
                                    isSecondCousin = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if(isSecondCousin){
        var element = document.getElementById("relation");
        element.innerHTML = text;
    }

    return isSecondCousin;
}

function uncleHelper(parent, isUncle, text, endPerson){
    var parentSiblings = parent.siblings;

    if(!isUncle){
        if(parentSiblings != undefined){
            for(var i = 0; i < parentSiblings.length; i++){
                var sibling = parentSiblings[i];
        
                if(sibling.value == endPerson.value){
                    isUncle = true;
                    break;
                }
            }
        }
    }  
   
    if(isUncle){
        var element = document.getElementById("relation");
        element.innerHTML = text;
    }
    return isUncle;
}