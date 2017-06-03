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
    edge.counter = edge.counter || 0;
    this.id = edge.counter++;
  }
  obj(){
    return { 'from': this.from, 'to': this.to };
  }
}

class graph {
  constructor(directional=true, graphToCopy){
    if(graphToCopy && graphToCopy instanceof graph){
      this.nodes = graphToCopy.nodes.slice();
      this.edges = graphToCopy.edges.slice();
    }else{
      this.nodes = [];
      this.edges = [];
    }
    this.directional = directional;
  }
  addNode(id, label){
    if(this.hasNode(id)){
      throw("Node is already present in graph!");
    }
    this.nodes.push(new node(id, label));
  }
  addEdge(from, to, weight){
    if(this.hasNode(from) && this.hasNode(to)){
      this.edges.push(new edge(...arguments));
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
  removeEdge(id){
    this.edges = this.edges.filter((edge) => edge.id != id);
  }
  edgesTo(id){
    if(this.directional){
      return this.edges.filter((edge) => edge.to == id);
    }else{
      return this.edges.filter((edge) => edge.to == id || edge.from == id);
    }
  }
  edgesFrom(id){
    if(this.directional){
      return this.edges.filter((edge) => edge.from == id);
    }else{
      return this.edges.filter((edge) => edge.to == id || edge.from == id);
    }
  }
  bulkAdd(data){
    if(data && data.nodes){
      data.nodes.forEach((item) => this.nodes.push(new node(...item)));
    }
    if(data && data.edges){
      data.edges.forEach((item) => this.edges.push(new edge(...item)));
    }
  }
  obj(){
    return {
      'nodes': this.nodes.map((node) => node.obj()),
      'edges': this.edges.map((edge) => edge.obj())
    }
  }

  kruskalMST(){
    const sets = {};
    let i = 0;
    this.nodes.forEach((node) => {
      sets[node.id] = i++;
    });
    const edges = [];
    this.edges.sort((a, b) => a.weight - b.weight);
    this.edges.forEach((edge) => {
      if(sets[edge.from] != sets[edge.to]){
        edges.push(edge);
        let target = sets[edge.to];
        for(node in sets){
          sets[node] = sets[node] == target ? sets[edge.from] : sets[node];
        }
      }
    });
    this.edges = edges;
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
    [selectFrom] = copyNodes.splice(Math.floor(Math.random()*copyNodes.length),1).pop();
    [selectTo] = copyNodes.splice(Math.floor(Math.random()*copyNodes.length),1).pop();
    weight = Math.ceil(Math.random()*weightRange);
    edges.push([selectTo, selectFrom, weight]);
  }
  return {'nodes': nodes, 'edges': edges};
}


