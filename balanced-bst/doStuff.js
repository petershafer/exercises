/* Let's do some none-BST stuff here so we can work with them on a web page. */
var renderTree = (node, path="") => {
  if(!node){
    return;
  }
  if(document.getElementById(`cell${path}`)){
    let value;
    if(path[path.length-1] == "1"){
      value = `\\ ${node.value}`;
    }else if(path[path.length-1] == "0"){
      value = `${node.value} /`;
    }else{
      value = node.value;
    }
    document.getElementById(`cell${path}`).innerHTML = value;
  }
  renderTree(node.lt, `${path}0`);
  renderTree(node.gt, `${path}1`);
}

var cleanSlate = () => {
  for(var i = 0; i < document.getElementsByClassName("cell").length; i++){
    document.getElementsByClassName("cell")[i].innerHTML = " ";
  }
}

var reset = () => {
  cleanSlate();
  myTree = new bst([1,2,3,4,5,6,7]);
  renderTree(myTree.node);
}

var balance = () => {
  cleanSlate();
  myTree.balance();
  renderTree(myTree.node);
}

var custom = (raw, doReset=false) => {
  if(doReset){
    cleanSlate();
    myTree = new bst();
  }
  data = JSON.parse(raw);
  data.forEach((item) => myTree.insert(item));
  renderTree(myTree.node);
}

var myTree;
document.addEventListener("DOMContentLoaded", function(event) { 
  reset();
});

