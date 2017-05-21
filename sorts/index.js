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
    this.data = next;
  }

  selectionSort() {
    // Selection sort sorts an array by partitioning it and "selecting"
    // the next value by finding the maximum in the remaining unsorted
    // values, until none remain. 
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
    // Bubble sort will "bubble" up the maximum value on each subsequent pass.
    // The maximum value isn't explicitly sought each time, but it creates
    // a partition on the latter half of the array of sorted values in
    // ascending order. It's not implemented as the inverse of selection sort
    // but that's what we find happening with each pass.
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

  insertionSort() {
    // Insertion sort is similar to selection sort, but instead of finding
    // the exact value you want to add to the partition of sorted values,
    // you just take the next unsorted value and then move it through the
    // sorted values in the partition until you find where it should be
    // inserted.
    const arr = this.data;
    // We can assume the first item has already been inserts, so start
    // at i = 1 to begin.
    for(let i = 1; i < arr.length; i++){
      // Next, we need to iterate through the sorted values from greatest
      // to least. So we set up the next loop to start at the item just
      // before the value to be inserted.
      let j = i-1;
      while(arr[i] < arr[j] && j >= 0){
        j--;
      }
      // We know where to insert the item, insert it into the index 
      // immediately following the first item (found in reverse order) 
      // in the sorted list that the inserted item is greater than.
      let temp = arr.splice(i,1).pop();
      arr.splice(j+1,0,temp);
      this.log(arr);
    }
    this.data = arr;
  }

  mergeSort(arr, baseCase=true) {

  }

}

var data = new xArray([7,6,5,4,3,2,1], true);

//data.selectionSort();
data.bubbleSort();
