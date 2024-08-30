import { buildTree, insert, deleteItem, find } from "./tree-helper.js";

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
  levelOrder(callback) {
    if (callback && typeof callback == "function") {
      if (this.#root == null) return;
      let queue = [];
      queue.push(this.#root);
      while (queue.length > 0) {
        const current = queue[0];
        callback(current);
        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
        queue.shift();
      }
    } else {
      throw new Error("No callback function is provided!");
    }
  }
  preOrder(callback, root = this.#root) {
    if (callback && typeof callback == "function") {
      if (root == null) return;
      callback(root);
      this.preOrder(callback, root.left);
      this.preOrder(callback, root.right);
    } else {
      throw new Error("No callback function is provided!");
    }
  }
  inOrder(callback, root = this.#root) {
    if (callback && typeof callback == "function") {
      if (root == null) return;
      this.inOrder(callback, root.left);
      callback(root);
      this.inOrder(callback, root.right);
    } else {
      throw new Error("No callback function is provided!");
    }
  }
  postOrder(callback, root = this.#root) {
    if (callback && typeof callback == "function") {
      if (root == null) return;
      this.postOrder(callback, root.left);
      this.postOrder(callback, root.right);
      callback(root);
    } else {
      throw new Error("No callback function is provided!");
    }
  }
  height(node) {
    if (node == null) return 0;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }
  depth(node, root = this.#root) {
    if (root == null) {
      return null;
    } else if (root == node) {
      return 1;
    } else if (root.data > node.data) {
      return 1 + this.depth(node, root.left);
    } else if (root.data < node.data) {
      return 1 + this.depth(node, root.right);
    }
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

console.log(find(tree.root, 36));

// tree.levelOrder((current) => {
//   if (current.data > 33) {
//     console.log(current.data + " is big");
//   } else {
//     console.log(current.data + " is small");
//   }
// });
// tree.preOrder((current) => {
//   if (current.data > 33) {
//     console.log(current.data + " is big");
//   } else {
//     console.log(current.data + " is small");
//   }
// });

// tree.inOrder((current) => {
//   if (current.data > 33) {
//     console.log(current.data + " is big");
//   } else {
//     console.log(current.data + " is small");
//   }
// });

// tree.postOrder((current) => {
//   if (current.data > 33) {
//     console.log(current.data + " is big");
//   } else {
//     console.log(current.data + " is small");
//   }
// });

// tree.levelOrder((index = 0) => {
//   index++;
// });
// console.log(tree.height(find(tree.root, 5)));
console.log(tree.depth(find(tree.root, 32)));
