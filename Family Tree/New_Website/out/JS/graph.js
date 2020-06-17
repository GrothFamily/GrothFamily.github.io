function Graph(){
    this.nodes = [];
    this.graph = {};
    this.end = null;
    this.start = null;
}

Graph.prototype.addNode = function(n){
    //node into array
    this.nodes.push(n);
    var peep = n.value;

    this.graph[peep] = n;
}

Graph.prototype.reset = function(){
    for(var i = 0; i < this.nodes.length; i++){
        this.nodes[i].searched = false;
        this.nodes[i].parent = null;
        this.nodes[i].sibsSearched = false;
        this.nodes[i].siblings = [];
        this.nodes[i].parentFromPath = null;
    }
}

Graph.prototype.getNode = function(child){
    var n = this.graph[child];
    return n;
}

Graph.prototype.setStart = function(person){
    this.start = this.graph[person];
    return this.start;
}

Graph.prototype.setEnd = function(person){
    this.end = this.graph[person];
    return this.end;
}