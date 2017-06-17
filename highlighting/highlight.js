'use strict';

var highlight = (function(){
  var findDiffs = (before, after, by='word') => {
    let a, b;
    if(by == 'character'){
      a = before.split("");
      b = after.split("");
    }else{
      a = before.split(" ");
      b = after.split(" ");
    }
    let i = 0;
    let j = 0;
    let output = [];
    var key = [];
    while(j < b.length){
      if(a[i] == b[j]){
        output.push(b[j]);
        key.push(0);
        i++;
        j++;
      }else{
        var k = i;
        var found = false;
        var tempOut = [];
        var tempKey = [];
        while(k < a.length){
          if(a[k] == b[j]){
            i = k;
            found = true;
            output = output.concat(tempOut);
            key = key.concat(tempKey);
            break;
          }
          tempOut.push(a[k]);
          tempKey.push(-1);
          k++;
        }
        if(!found){
          output.push(b[j]);
          key.push(1);
          j++;
        }
      }
    }
    while(i < a.length){
      output.push(a[i]);
      key.push(-1);
      i++;
    }
    return [output, key, by]
  };
  var render = (data, options, destination) => {
    let { inserts=true, deletes, deleted=true, insertClass, deleteClass, sameClass } = options;
    let [union, key, by] = data;
    let mode = 0;
    let output = "";
    let classList = [deleteClass, sameClass, insertClass];
    for(let i = 0; i < union.length; i++){
      if(mode != key[i] && i > 0){
        output += `</span><span class="${classList[key[i]+1]}">`;
        mode = key[i];
      }else if(mode != key[i] || i == 0){
        output += `<span class="${classList[key[i]+1]}">`;
        mode = key[i];
      }
      if((mode == -1 && deleted) || (mode == 1 && inserts) || mode == 0){
        output += union[i];
      }
      if(mode == -1 && deletes){
        output += " ";
      }
      if(by == "word" && i < union.length - 1){
        output += " ";
      }
    }
    output += `</span>`;
    if(destination){
      document.getElementById(destination).innerHTML = output;
    }
    return output;
  };
  return {
    'findDiffs': findDiffs,
    'render': render
  }
})()

