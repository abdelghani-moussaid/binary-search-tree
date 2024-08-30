import Tree from "./tree.js";

const tree = new Tree(randomArray(16, 100));

tree.prettyPrint();
console.log(tree.isBalanced());
tree.levelOrder((current) => {
  console.log(current.data);
});
console.log();
tree.preOrder((current) => {
  console.log(current.data);
});
console.log();
tree.inOrder((current) => {
  console.log(current.data);
});
console.log();
tree.postOrder((current) => {
  console.log(current.data);
});

tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(106);

tree.prettyPrint();
console.log(tree.isBalanced());

tree.reBalance();
tree.prettyPrint();
console.log(tree.isBalanced());

tree.levelOrder((current) => {
  console.log(current.data);
});
console.log();
tree.preOrder((current) => {
  console.log(current.data);
});
console.log();
tree.inOrder((current) => {
  console.log(current.data);
});
console.log();
tree.postOrder((current) => {
  console.log(current.data);
});

function randomArray(size, max) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * max));
  }
  return array;
}
