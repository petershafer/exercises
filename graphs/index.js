class node {
  constructor(id,label=id){
    if(!id){
      throw("Node requires an identifier!");
    }
    this.id = id;
    this.label = label;
  }
  obj(){
    return { 'id': this.id, 'label': this.label };
  }
}

class edge {
  constructor(from, to, weight=1){
    if(!from || !to){
      throw("Edge requires 'from' and 'to' to be specified!");
    }
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
  obj(){
    return { 'from': this.from, 'to': this.to };
  }
}

class graph {
  constructor(graphToCopy){
    if(graphToCopy && graphToCopy instanceof graph){
      this.nodes = graphToCopy.nodes.slice();
      this.edges = graphToCopy.edges.slice();
    }else{
      this.nodes = [];
      this.edges = [];
    }
  }
  addNode(id, label){
    if(this.hasNode(id)){
      throw("Node is already present in graph!");
    }
    this.nodes.push(new node(id, label));
  }
  addEdge(from, to){
    if(this.hasNode(from) && this.hasNode(to)){
      this.edges.push(new edge(from, to));
    }else{
      throw("Cannot add edge since it references non-existent node.");
    }
  }
  hasNode(id){
    return this.nodes.filter((node) => node.id == id).length > 0;
  }
  removeNode(id){
    this.nodes = this.nodes.filter((node) => node.id != id);
    this.edges = this.edges.filter((edge) => edge.from != id && edge.to != id);
  }
  removeEdge(from, to){
    this.edges = this.edges.filter((edge) => edge.from != from || edge.to != to);
  }
  bulkAdd(data){
    if(data && data.nodes){
      data.nodes.forEach((item) => this.nodes.push(new node(...item)));
    }
    if(data && data.edges){
      data.edges.forEach((item) => this.edges.push(new edge(...item)));
    }
  }

}

var randomGraph = function(nodeNum=10, edgeNum=10, weightRange=3){
  let nodes = [];
  let edges = [];
  for(let i = 0; i < nodeNum; i++){
    nodes.push([`node${i}`]);
  }
  for(let i = 0; i < edgeNum; i++){
    let copyNodes = nodes.slice();
    let selectTo, selectFrom, weight;
    selectFrom = copyNodes.splice(Math.floor(Math.random()*copyNodes.length),1).pop()[0];
    selectTo = copyNodes.splice(Math.floor(Math.random()*copyNodes.length),1).pop()[0];
    weight = Math.ceil(Math.random()*weightRange);
    edges.push([selectTo, selectFrom, weight]);
  }
  return {'nodes': nodes, 'edges': edges};
}


