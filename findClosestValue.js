var test = [0, 1, 1.45, 2, 3, 4, 5, 6, 7, 7.65, 8, 9, 10, 11, 11.78, 12, 13, 14, 15, 16, 16.8];

var findClosestValue = function(array, target, start, end) {
    start = start || 0;
    end = end || array.length - 1;
    console.log('target: ', target, 'start: ', start, 'end: ', end);
    var median = Math.floor((end - start)/2) + start;

    if(array[median] === target){ return median; }
    else if(end - start === 0) {
        console.log(median, array[median], array[median-1], array[median+1]);

        // target > array[median] -> right side else elft side
        return array[median] < target ? median + 1 : median - 1;
    }
    else if(array[median] > target) { return findClosestValue(array, target, start, median - 1); }
    else if (array[median] < target) { return findClosestValue(array, target, median + 1, end); }
};

console.log(findClosestValue(test, 3.5));
