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

describe(`xArray constructor`, function() {
  it('should initialize an array if argument specified', function() {
    let values = buildRandomArray(10);
    let arr = new xArray(values);
    expect(arr.data).to.be.an('array');
    for(let i = 0; i < values.length; i++){
      expect(arr.data[i]).to.be.equal(values[i]);
    }
  });
  it('should initialize an empty array if no argument specified', function() {
    let arr = new xArray();
    expect(arr.data).to.be.an('array');
    expect(arr.data.length).to.be.equal(0);
  });
});

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
