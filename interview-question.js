setTimeout(() => console.log('A'), 0);
console.log('B');
setTimeout(() => console.log('C'), 100);
setTimeout(() => console.log('D'), 0);

let i = 0;
while (i < 1_000_000_000) {
  // Assume this takes ~500ms
  let ignore = Math.sqrt(i);
  i++;
}

console.log('E');
