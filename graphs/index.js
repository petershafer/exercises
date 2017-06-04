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
    return { 'from': this.from, 'to': this.to, 'weight': this.weight };
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

  primMST(){
    // The Prim MST algorithm generates an MST from a graph by selecting
    // an arbitrary node (vertex) and progressively adding edges that connect 
    // it to vertices outside of the tree.
    // We'll use the actual javascript set data structure here since we only
    // need to determine whether a vertex belongs to a single tree or not.
    const nodes = new Set([this.nodes[0].id]);
    // The following list will store the edges to be used for the MST.
    const edges = [];
    // Sort the edges based on their weight. We need to specify a comparison
    // function to be able to sort these custom edge instances. Subtracting
    // the weight of the first from the second will yield the correct response.
    // Other implementations may use a min-priority queue for this.
    this.edges.sort((a, b) => a.weight - b.weight);
    // We will need to repeat this process N times, where N is the number of
    // vertices in the graph.
    for(let i = 0; i < this.nodes.length; i++){
      // Next, we'll search the edges of the graph until we find one that 
      // joins a new vertex to the MST we're building.
      for(let i = 0; i < this.edges.length; i++){
        let edge = this.edges[i];
        // Basically, the criteria we use is that one end of the edge has
        // to connect to a vertex that's already in the tree, and the other
        // must connect to a vertex that's not in the tree. We can't assume
        // the order here: from does not indicate that the edge originates
        // from a vertex that already belongs to the MST.
        if((nodes.has(edge.to) && !nodes.has(edge.from)) 
          || (!nodes.has(edge.to) && nodes.has(edge.from))){
          // If our criteria is met, we grow the MST by one node/vertex
          edges.push(edge);
          // And then include the nodes that the egde connects in the set of
          // notes connected to the tree.  The javascript set allows us to
          // add values redundantly without having duplicate values. Since 
          // we can't assume which property holds the vertex that isn't already
          // in the tree, we just add both.
          nodes.add(edge.to);
          nodes.add(edge.from);
          // We can break out of the internal loop now since the criteria has
          // changed and we need to re-evaluate edges we passed over already
          // that previously might not have met our criteria.
          break;
        }
      }
    }
    this.edges = edges;
  }

  kruskalMST(){
    // The Kruskal MST algorithm generates an MST from a graph by sorting
    // edges by weight and then creating a new graph by adding them in
    // by nondecreasing order if the edge's two vertices do not already 
    // belong to the same set.
    // Rather than using sets as a data structure, we'll use an object
    // that references nodes (vertices) as the index, and the value represents
    // the set that the node currently belongs to.
    const sets = {};
    this.nodes.forEach((node) => {
      // Each node starts in its own set. We can use the total number
      // of properties for the sets object to generate the next new set #.
      sets[node.id] = Object.keys(sets).length;
    });
    // The following list will store the edges to be used for the MST.
    const edges = [];
    // Sort the edges based on their weight. We need to specify a comparison
    // function to be able to sort these custom edge instances. Subtracting
    // the weight of the first from the second will yield the correct response.
    this.edges.sort((a, b) => a.weight - b.weight);
    // Iterate through all edges in the original graph and selectively add
    // them to the MST based on which sets the nodes belong to.
    this.edges.forEach((edge) => {
      // If we add an edge that connects two nodes in the same set, we'll
      // introduce a cycle into the tree. Only proceed if they differ.
      if(sets[edge.from] != sets[edge.to]){
        // Since we know we're connecting two trees, push the edge to the list
        // used to generate the MST.
        edges.push(edge);
        // The rest of the code effectively implements the union operation
        // for the provided set management object.
        let target = sets[edge.to];
        for(node in sets){
          // Basically, if the node belongs to the same set as the second
          // node in the given edge, change its set to be the same as for
          // the first node in the given edge.
          sets[node] = sets[node] == target ? sets[edge.from] : sets[node];
        }
      }
    });
    // Replace the original graph's edges with the edges collected for the MST.
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


