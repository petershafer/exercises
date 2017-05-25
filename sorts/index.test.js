'use strict';

var expect = require('chai').expect;
var xArray = require('./index');

var buildRandomArray = (size=1000) => {
  var arr = [];
  for(let i = 0; i < size; i++){
    arr.push(Math.floor(Math.random()*size));
  }
  return arr;
}

var algorithms = ["nativeSort", "heapSort", "radixSort", "mergeSort", "quickSort", "bubbleSort", "insertionSort", "selectionSort", "countingSort"];

algorithms.forEach((algorithm) => {
  let values = buildRandomArray();
  let arr = new xArray(values);
  arr.sort(algorithm);
  describe(`${algorithm}`, function() {
    it('should sort values in ascending order', function() {
      for(let i = 1; i < arr.data.length; i++){
        expect(arr.data[i] >= arr.data[i-1]).to.be.true;
      }
    });
  });

});


