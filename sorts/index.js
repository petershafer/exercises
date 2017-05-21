class xArray {

  constructor(startsWith=[],debug=false) {
    this.data = startsWith;
    this.debug = debug;
  }

  log(msg){
    if(this.debug){
      console.log(msg);
    }
  }

  shuffle(){
    const arr = this.data;
    const next = [];
    while(arr.length > 0){
      let temp = arr.splice(Math.floor(Math.random() * arr.length),1).pop();
      next.push(temp);
    }
    this.log(next);
    this.log("-=-=-=-=-=-=-=");
    this.data = next;
  }

  selectionSort() {
    const arr = this.data;
    this.log(arr);
    for(let i = 0; i < arr.length; i++){
      // Assume with each iteration that first i values are all less than
      // remaining values and are sorted.
      let min = i;
      for(let j = i + 1; j < arr.length; j++){
        if(arr[j] < arr[min]){
          min = j;
        }
      }
      let temp = arr.splice(min,1).pop();
      arr.splice(i,0,temp);
      this.log(arr);
    }
    this.data = arr;
  }

  bubbleSort() {
    const arr = this.data;
    for(let i = 0; i < arr.length - 1; i++){
      // Assume with each iteration that max value has bubbled to top.
      // So we only need to do comparisons on remaining values.
      // We subtract 1 from arr.length because we are iterating through
      // comparisons rather than values.
      for(let j = 0; j < arr.length - 1 - i; j++){
        if(arr[j+1] < arr[j]){
          let temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        }
      }
      this.log(arr);
    }
    this.log(arr);
    this.data = arr;
  }

}

var data = new xArray([7,6,5,4,3,2,1], true);

//data.selectionSort();
data.bubbleSort();
