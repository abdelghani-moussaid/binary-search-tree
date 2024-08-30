import Tree from "./tree.js";

const tree = new Tree(randomArray(16, 100));

tree.prettyPrint();

function randomArray(size, max) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * max));
  }
  return array;
}
