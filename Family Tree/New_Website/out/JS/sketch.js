var graph;

function main() {
    graph = new Graph();
    var family = data.familyRelation;

    makeGraph(family);

    console.log(graph);
}

function makeGraph(personToTraverse, parentNode){
    for (var i = 0; i < personToTraverse.length; i++){
        var person = personToTraverse[i].Name;
        var children = personToTraverse[i].Children;
        var level = personToTraverse[i].Level;
        var personNode = new Node(person);

        graph.addNode(personNode);
        addToDropDown1(person);
        addToDropDown2(person);

        if(parentNode != undefined){
            parentNode.addEdge(personNode);
            personNode.actualAdultParent = parentNode;
            personNode.level = level;
            parentNode.actualChildren.push(personNode);
        }

        for(var j = 0; j < children.length; j++){
            var child = children[j].Name;
            var childsChildren = children[j].Children;
            var childLevel = children[j].Level;
            var childNode = graph.getNode(child);

            if(childNode == undefined){
                childNode = new Node(child);
                childNode.actualAdultParent = personNode;
                childNode.level = childLevel;
                personNode.actualChildren.push(childNode);
                addToDropDown1(child);
                addToDropDown2(child);
            }

            graph.addNode(childNode);
            personNode.addEdge(childNode);
            makeGraph(childsChildren, childNode);
        }
    }
}

function bfs(){
    graph.reset();
    var queue = [];
    var start = graph.setStart(getValueFromDropdown1());
    var end = graph.setEnd(getValueFromDropdown2());

    if(start != undefined && end != undefined){
        start.searched = true; // 'start' node is visited
        queue.push(start); // add 'start' to the queue
    
        while(queue.length > 0){ // Run until queue is empty
            var currentPerson = queue.shift(); // remove the first value from queue
            if(currentPerson == end){
                // YAY we found the match
                break;
            }
        
            var edges = currentPerson.edges; // grab the edges from person
            var edges2 = currentPerson.edges;
            for(var i = 0; i < edges.length; i++){
                // for all the edges from person
                var neighbor = edges[i];
                if(!neighbor.searched){
                    neighbor.searched = true; // this edge has been searched
                    neighbor.parentFromPath = currentPerson; // show where it came from
                    queue.push(neighbor); // add edge to queue
                }

                createSiblings(currentPerson, edges2);
            }
        }

        var path = [];
        path.push(end);
        var next = end.parentFromPath;
        while(next != null){
            path.push(next);
            next = next.parentFromPath;
        }
        
        var txt = '';
        for(var i = path.length - 1; i >= 0; i--){
            var n = path[i];
            txt += n.value;
            if(i != 0){
                txt += ' --> '
            };
        }
        
        var element = document.getElementById("linnear");
        element.innerHTML = txt;

        familyMembers(start, end);
    }
}

function createSiblings(currentPerson, edges){
    if(currentPerson.sibsSearched == false){
        for(var j = 0; j < edges.length; j++){
            var possibleParent = edges[j];

            // Does currentPerson have a parent?
            if(currentPerson.actualAdultParent.value == possibleParent.value){

                // Get currentPerson's parent edges
                var currentPersonsParent = possibleParent.edges;
                for(var k = 0; k < currentPersonsParent.length; k++){
                    var possibleSibling = currentPersonsParent[k];
                    if( currentPerson.actualAdultParent.value == possibleSibling.actualAdultParent.value && 
                        currentPerson.value != possibleSibling.value){
                        currentPerson.addSibling(possibleSibling);
                        currentPerson.sibsSearched = true;
                    }
                }
            }
        }
    }
}

main();