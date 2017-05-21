
class node {
  constructor(value=null){
    this.value = value;
    this.gt = null;
    this.lt = null;
  }
  dump(){
    // Generate a JSON string representation of the tree.
    let ltDump = this.lt ? this.lt.dump() : "null";
    let gtDump = this.gt ? this.gt.dump() : "null";
    return `{ value: '${this.value}', children: [${ltDump}, ${gtDump}] }`;
  }
}

class bst {
  // An ES6 binary search tree implementation.
  // Balanced on demand.
  constructor(items=[]){
    // Initialize the binary search tree with a root node.
    console.log(`Building new tree from items: ${items}`);
    this.node = new node();
    // Populate the tree with any items included with the constructor.
    items.forEach((item) =>{
      this.insert(item);
    });
  }
  insert_recursive(value, current=this.node){
    let next;
    // Determine if the node is open.
    if(current.value){
      // Interrogate node's value against value of item being inserted.
      if(value > current.value){
        next = "gt";
      }else{
        next = "lt";
      }
      if(!current[next]){
        // Initialize the next node if it doesn't exist.
        current[next] = new node();
      }
      // Traverse to the next node to attempt to set a value.
      this.insert(value, current[next]);
    }else{
      // If the node is open, set its value.
      current.value = value;
    }
  }
  insert_norecursion(value){
    let current = this.node;
    while(current.value){
      if(value > current.value){
        current.gt = current.gt || new node();
        current = current.gt;
      }else{
        current.lt = current.lt || new node();
        current = current.lt;
      }
    }
    current.value = value;
  }
  insert(...args){
    this.insert_norecursion(...args);
  }
  balance(){
    // The tree is balanced by retrieving an ascending order list of item in the tree
    // and then breaking them down into sublists while iteratively adding the middle
    // values to a new list which represents the optimal insertion order.
    const getValues = (node=this.node) => {
      // Retrieve a list of values in the tree in ascending order.
      if(!node){
        // We're at a leaf - stop recursing.
        return [];
      }
      let list = [];
      // recursively prepend the list with all values less than current node's value.
      list = list.concat(getValues(node.lt));
      // add the node's current value to the list.
      list.push(node.value);
      // recursively append the list with all the values greater than the current node's value.
      list = list.concat(getValues(node.gt));
      return list;
    }
    const getValuesNoRecursion = (node=this.node) => {
      // Retrieve a list of values in the tree in ascending order.
      // Since we're not using recursion, we need to maintain our own stack.
      const stack = [];
      // This will hold the values for the list we'll return.
      const node_order = [];
      // We'll also need a variable to hold our position in the tree.
      let current = this.node;
      // Repeat these steps until we can determine that we've traversed the tree.
      do {
        // Traverse down the tree until a leaf node is reached.
        while(current != null){
          // Add each node traversed to the stack, and reset current.
          stack.push(current);
          current = current.lt;
        }
        // add the leaf node to the node_order list, then continue.
        let popped_item = stack.pop();
        node_order.push(popped_item.value);
        current = popped_item.gt;
      } while(stack.length > 0 || current != null);
      return node_order;
    }
    const list = getValuesNoRecursion();
    // The final order of the elements to insert to ensure tree is balanced.
    const order = [];
    // A list of undigested chunks of the tree's values.
    let queue = [list];
    let newList, middle, second, third;
    // Digest the queue while values are still present.
    while(queue.length){
      newList = [];
      queue.forEach((item) => {
        // Find the middle item of the current sublist and add it to the order list.
        middle = Math.ceil(item.length/2);
        order.push(item[middle-1]);
        // Create the sublists before and after the middle value and concat them to the new list.
        second = item.slice(0,middle-1);
        third = item.slice(middle);
        if(second.length){
          newList.push(second);
        }
        if(third.length){
          newList.push(third);
        }
      });
      // Reduce the queue to undigested sublists.
      queue = newList;
    }
    // Rebuild the tree by discarding the old root node and creating a new one.
    // ~ Trust the garbage collector ~
    this.node = new node();
    // Then insert all of the items from the order list that was generated.
    while(order.length){
      this.insert(order.shift());
    }

  }
}
