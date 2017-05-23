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

  mergeSort(start=0, finish=this.data.length, basecase=true) {
    // Merge sort will recursively decompose the array into individual
    // values, and then merge them together in sorted order. Then the
    // sorted sets are merged together in sorted order as recursion
    // progresses, until the entire array has been sorted.
    let merge = (arr1, arr2) => {
      // Merge will create a new array of sorted values which will
      // be returned to mergesort.
      let sorted = [];
      // While there are values in both given arrays, select the lesser
      // of the two and add them to the newly sorted array.
      while(arr1.length && arr2.length){
        if(arr1[0] < arr2[0]){
          sorted.push(arr1.shift());
        }else{
          sorted.push(arr2.shift());
        }
      }
      // Add any remaining values from the first array to the new array.
      // (We can assume that this only occurs if the second array is now empty,
      // and that the remaining elements in the array are already sorted.)
      while(arr1.length){
        sorted.push(arr1.shift());
      }
      // Add any remaining values from the second array to the new array.
      // (We can assume that this only occurs if the second array is now empty,
      // and that the remaining elements in the array are already sorted.)
      while(arr2.length){
        sorted.push(arr2.shift());
      }
      return sorted;
    }
    // If we're being asked to perform mergesort on more than one value, then
    // recursively call mergesort on those values.
    if(finish - start > 1){
      // Compose two arrays, each representing one half of the values being
      // requested to be sorted.
      const arr1 = this.mergeSort(start, start + Math.floor((finish - start)/2), false);
      const arr2 = this.mergeSort(start + Math.floor((finish - start)/2), finish, false);
      // Merge the two halves and then splice it into 
      const merged = merge(arr1, arr2);
      if(this.debug){
        this.data.splice(start, merged.length, ...merged);
        this.log(this.data);
      }
      if(basecase){
        this.data = merged;
      }else{
        return merged;
      }
    }else{
      return finish - start > 0 ? [this.data[start]] : [];
    }
  }

  quickSort(start=0, finish=this.data.length-1) {
    // Quicksort will sort an array of values by selecting a pivot and
    // then creating two sub-arrays of values that are less than the
    // pivot and then greater than the pivot. Each sub-array is then
    // quicksorted, until the sub-arrays cannot be divided any further.
    let partition = (start, finish) => {
      // We will just use the last value in the sub-array as our pivot.
      let pivot = this.data[finish];
      // The variable i represents where the "less-than" sub-array ends.
      // The start variable will also indicate where it begins.
      let i = start;
      // Walk all values in the sub-array
      for(let j = start; j < finish; j++){
        // If we find that the next value is less than the pivot, we'll
        // swap it to the end of the "less-than" sub-array and increment
        // the value of i to indicate this sub-array has grown. In doing
        // this, we move the value that is being swapped into the "less-
        // than" sub-array with an item that's already been walked and 
        // assigned to the "greater-than" sub-array. Since j will be 
        // incremented, these values will not be inadvertantly re-processed.
        if(this.data[j] <= pivot){
          let temp = this.data[i];
          this.data[i] = this.data[j];
          this.data[j] = temp;
          i = i + 1;
        }
      }
      // Swap the pivot to the end of the "less-than" sub-array and move
      // the first value in the "greater-than" sub-array to the end of it.
      // Since we don't need to assume the "greater-than" sub-array is
      // sorted, we can move these values around at our convenience.
      let temp = this.data[i];
      this.data[i] = this.data[finish];
      this.data[finish] = temp;
      // Pass back the index of the pivot so that quicksort can call
      // itself on the "less-than" and "greater-than" sub-arrays.
      return i;
    }
    // Check to see if the sub-array we're handling actually contains values.
    if(start < finish){
      // Determine how to partition the sub-array into less-than and greater-
      // than sub-arrays.  Partition will create these sub-arrays (as a side-
      // effect) and return the index of the pivots.
      let pivot = partition(start, finish);
      // Recursively call quicksort on the partitioned sub-arrays.
      this.quickSort(start, pivot - 1);
      this.quickSort(pivot + 1, finish);
    }
    this.log(this.data);
  }

  maxHeapify(i=0, heapSize=this.data.length){
    // Max-heapify will perform one pass through the heap/tree at the specified
    // node, and bubble up larger values from its children, then repeat the process
    // for each node that a value bubbles up from.
    // We need to set left and right in a manner that works with zero-indexing.
    // If this weren't zero-indexed, we could use left = 2*i and right = 2*i+1.
    let left = 2*(i+1)-1;
    let right = 2*(i+1);
    let largest = null;
    // Check if the left child is larger than the current value. Remember which
    // is the larger value.
    if(left < heapSize && this.data[left] > this.data[i]){
      largest = left;
    }else{
      largest = i;
    }
    // Check to see if the previous larger value is larger than the right child.
    if(right < heapSize && this.data[right] > this.data[largest]){
      largest = right;
    }
    // If a child needs to bubble up to the top...
    if(largest != i){
      // Swap the current value with the larger child.
      let temp = this.data[i];
      this.data[i] = this.data[largest];
      this.data[largest] = temp;
      // Run max-heapify for the child that was just replaced.
      this.maxHeapify(largest, heapSize);
    }
  }

  buildMaxHeap(heapSize=this.data.length){
    // To initially make a heap a max-heap, we need to call heapify enough
    // times to settle the values in the tree where the leaves are the smallest
    // values, and the root is the largest. Since each row of children in the 
    // heap/tree is twice the number of parents, we only need to run maxHeapify
    // for the first half of values in the array to settle the values as desired.
    for(let i = Math.floor(heapSize/2); i >= 0; i--){
      this.maxHeapify(i);
    }
  }

  heapSort(){
    // Heap sort uses the properties of a max-heap to arrange values
    // of an array in-place, in ascending order. It takes the first value
    // of the array, which is assumed to be the largest value, and moves
    // it to the end of the array, and partitions off the sorted values
    // from the heap values.
    // First, the array has to be built into a max-heap.
    this.buildMaxHeap();
    this.log(this.data);
    // We'll start with the size of the heap being the size of the array.
    let heapSize = this.data.length;
    // Repeatedly pull the top value from the heap.
    for(let i = this.data.length-1; i >= 1; i--){
      // Swap the top of the heap to the back of the array where the partition is.
      let temp = this.data[0];
      this.data[0] = this.data[i];
      this.data[i] = temp;
      // Reduce the heap size to move the partition.
      heapSize--;
      // Run maxHeapify once to restore the max-heap property.
      this.maxHeapify(0, heapSize);
      this.log(this.data);
    }
  }

  nativeSort(){
    this.data.sort((a, b) => a - b);
  }

  sort(algorithm="nativeSort"){
    switch(algorithm){
      case "nativeSort":
        this.nativeSort();
        break;
      case "heapSort":
        this.heapSort();
        break;
      case "mergeSort":
        this.mergeSort();
        break;
      case "quickSort":
        this.quickSort();
        break;
      case "bubbleSort":
        this.bubbleSort();
        break;
      case "insertionSort":
        this.insertionSort();
        break;
      case "selectionSort":
        this.selectionSort();
        break;
    }
  }

  isSorted(){
    for(let i = 1; i < this.data.length; i++){
      if(this.data[i] < this.data[i-1]){
        return false;
      }
    }
    return true;
  }

}

/* Utility Functions */

var buildRandomArray = (size=1000) => {
  var arr = [];
  for(let i = 0; i < size; i++){
    arr.push(Math.floor(Math.random()*size));
  }
  return arr;
}

var validate = (data) => {
  if(!data.isSorted()){
    console.log("!! VALUES NOT SORTED");
  }
}

var testPerformance = (algorithm, values) => {
  var data = new xArray(values.slice());
  console.time(algorithm);
  data.sort(algorithm);
  console.timeEnd(algorithm);
  validate(data);
}

/* Basic validation of sorts. */
// var data = new xArray([7,6,5,4,3,2,1], true);
// var data = new xArray([1,2,3,4,5,6,7], true);
// data.shuffle();
// console.log(data);
// data.selectionSort();
// data.bubbleSort();
// data.insertionSort();
// data.mergeSort();
// data.quickSort();
// data.heapSort();
// console.log(data);


/* Sort performance tracking. */
var values = buildRandomArray(100000);

testPerformance("heapSort", values);
testPerformance("nativeSort", values);
testPerformance("quickSort", values);
testPerformance("mergeSort", values);
testPerformance("bubbleSort", values);
testPerformance("insertionSort", values);
testPerformance("selectionSort", values);
