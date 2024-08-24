import { buildTree, insert, deleteItem } from "./tree-helper.js";

class Tree {
  #root;
  constructor(array) {
    // Sort then remove duplicates
    this.array = array
      .sort(function (a, b) {
        return a - b;
      })
      .filter((e, i, a) => e !== a[i - 1]);
  }
  get root() {
    return this.#root
      ? this.#root
      : buildTree(this.array, 0, this.array.length - 1);
  }
  set root(newRoot) {
    this.#root = newRoot;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([50, 30, 20, 40, 32, 34, 36, 70, 60, 65, 80, 75, 85]);

prettyPrint(tree.root);

tree.root = insert(tree.root, 5);

tree.root = deleteItem(tree.root, 50);

prettyPrint(tree.root);
