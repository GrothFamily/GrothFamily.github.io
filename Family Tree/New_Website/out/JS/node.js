function Node(value){
    this.value = value;
    this.edges = [];
    this.level = 1;
    this.searched = false;
    this.parentFromPath = null;
    this.siblings = [];
    this.sibsSearched = false;
    this.actualChildren = [];
    this.actualAdultParent = "None";
}

Node.prototype.addEdge = function(neighbor) {
    this.edges.push(neighbor);
    neighbor.edges.push(this);
}

Node.prototype.addSibling = function(possibleSibling) {
    this.siblings.push(possibleSibling);

}