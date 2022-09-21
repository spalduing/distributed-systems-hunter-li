// This example cover the poll, check and timers phases.

const fs = require('fs');

setImmediate(() => console.log(1)); // [MY_GUESS] ==> 8 |||| [CORRECT_ORDER] ==> 4
Promise.resolve().then(() => console.log(2)); // [MY_GUESS] ==> 3 |||| [CORRECT_ORDER] ==> 3
process.nextTick(() => console.log(3)); // [MY_GUESS] ==> 2 |||| [CORRECT_ORDER] ==> 2
fs.readFile(__filename, () => {
  console.log(4); // [MY_GUESS] ==> 4 |||| [CORRECT_ORDER] ==> 5
  setTimeout(() => console.log(5)); // [MY_GUESS] ==> 7 |||| [CORRECT_ORDER] ==> 8
  setImmediate(() => console.log(6)); // [MY_GUESS] ==> 6 |||| [CORRECT_ORDER] ==> 7
  process.nextTick(() => console.log(7)); // [MY_GUESS] ==> 5 |||| [CORRECT_ORDER] ==> 6
});
console.log(8); // [MY_GUESS] ==> 1 |||| [CORRECT_ORDER] ==> 1

// [MY_GUESS] ==> The printed numbers will be: 8 3 2 4 7 6 5 1

// [CORRECT_ORDER] ==> 8 3 2 1 4 7 6 5

/////////////////////////////////////////////////////////////////////

const sleep_st = (t) => new Promise((r) => setTimeout(r, t));
const sleep_im = () => new Promise((r) => setImmediate(r));

(async () => {
  setImmediate(() => console.log(1)); //[MY_GUESS] ==> 7 =>
  console.log(2); //[MY_GUESS] ==> 1
  await sleep_st(0); //[MY_GUESS] ==> 2
  setImmediate(() => console.log(3)); //[MY_GUESS] ==> 8
  console.log(4); //[MY_GUESS] ==> 3
  await sleep_im(); //[MY_GUESS] ==> 4
  setImmediate(() => console.log(5)); //[MY_GUESS] ==> 9
  console.log(6); //[MY_GUESS] ==> 5
  await 1; //[MY_GUESS] ==> wtf?
  setImmediate(() => console.log(7)); //[MY_GUESS] ==> 10
  console.log(8); //[MY_GUESS] ==> 6
})();

setImmediate(() => console.log(1));

console.log(2);

Promise.resolve().then(() =>
  setTimeout(() => {
    setImmediate(() => console.log(3));

    console.log(4);

    Promise.resolve().then(() =>
      setImmediate(() => {
        setImmediate(() => console.log(5));

        console.log(6);

        Promise.resolve().then(() => {
          setImmediate(() => console.log(7));
          console.log(8);
        });
      })
    );
  }, 0)
);
