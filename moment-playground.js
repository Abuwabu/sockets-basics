var moment = require('moment');
var now = moment();


// Formatting
console.log("***********************");
console.log("PLAYING WITH FORMATTING");
console.log("***********************");
console.log(now.format());
console.log(now.format('dddd, MMMM Do YYYY, h:mm:ss:a'));
console.log(now.format('MMM Do YYYY, h:mma')); // Oct 5th 2015, 6:45pm
console.log(now.format('h:mm a'));
console.log("\n");


//Subtracting time
console.log("************************");
console.log("PLAYING WITH SUBTRACTING");
console.log("************************");
console.log(now.format());
now.subtract(1, 'year');
console.log(now.format());
console.log("\n");


// Unix Timestamp — seconds elapsed since 1st January 1970
console.log("****************************");
console.log("PLAYING WITH UNIX TIMESTAMPS");
console.log("****************************");
console.log("Timestamp in seconds:" + now.format('X')); // in seconds
console.log("Timestamp in milliseconds:" + now.format('x')); // in miliseconds

// moment outputs strings
console.log("now.format() returns a: " + typeof now.format('X'));

// to output timestamp in ms as a number
console.log("now.valueOf() returns a: " + typeof now.valueOf());


console.log(now.valueOf());
console.log("\n");

// formatting
console.log("*******************************");
console.log("FORMATTING WITH UNIX TIMESTAMPS");
console.log("*******************************");

var timestamp = 1427534939739;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('dddd, MMM Do YYYY, h:mm a'));
