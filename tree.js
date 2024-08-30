import BuildTree from "./build-tree.js";
import Node from "./node.js";

class Tree {
  #root;
  constructor(array) {
    // Sort then remove duplicates
    this.array = array
      .sort(function (a, b) {
        return a - b;
      })
      .filter((e, i, a) => e !== a[i - 1]);

    this.#root = BuildTree(this.array, 0, this.array.length - 1);
  }
  get root() {
    return this.#root;
  }
  set root(newRoot) {
    this.#root = newRoot;
  }
  levelOrder(callback) {
    if (callback && typeof callback == "function") {
      if (this.root == null) return;
      let queue = [];
      queue.push(this.root);
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
  preOrder(callback, root = this.root) {
    if (callback && typeof callback == "function") {
      if (root == null) return;
      callback(root);
      this.preOrder(callback, root.left);
      this.preOrder(callback, root.right);
    } else {
      throw new Error("No callback function is provided!");
    }
  }
  inOrder(callback, root = this.root) {
    if (callback && typeof callback == "function") {
      if (root == null) return;
      this.inOrder(callback, root.left);
      callback(root);
      this.inOrder(callback, root.right);
    } else {
      throw new Error("No callback function is provided!");
    }
  }
  postOrder(callback, root = this.root) {
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
  isBalanced(node = this.root) {
    if (node == null) return true;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (leftHeight - rightHeight > 1 || leftHeight - rightHeight < -1) {
      return false;
    } else {
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
  }
  depth(node, root = this.root) {
    if (node == null || root == null) {
      return null;
    } else if (root == node) {
      return 1;
    } else if (root.data > node.data) {
      return 1 + this.depth(node, root.left);
    } else if (root.data < node.data) {
      return 1 + this.depth(node, root.right);
    }
  }
  // Note that it is not a generic inorder successor
  // function. It mainly works when the right child
  // is not empty, which is  the case we need in BST
  // delete.
  #getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }
  // This function deletes a given key x from the
  // given BST and returns the modified root of the
  // BST (if it is modified).
  deleteItem(x, root = this.root) {
    // Base case
    if (root === null) {
      return root;
    }

    // If key to be searched is in a subtree
    if (root.data > x) {
      root.left = this.deleteItem(x, root.left);
    } else if (root.data < x) {
      root.right = this.deleteItem(x, root.right);
    } else {
      // If root matches with the given key

      // Cases when root has 0 children or
      // only right child
      if (root.left === null) return root.right;

      // When root has only left child
      if (root.right === null) return root.left;

      // When both children are present
      let succ = this.#getSuccessor(root);
      root.data = succ.data;
      root.right = this.deleteItem(root.right, succ.data);
    }
    return root;
  }
  insert(data, root = this.root) {
    if (root === null) return new Node(data);

    // Duplicates not allowed
    if (root.data === data) return root;

    if (data < root.data) root.left = this.insert(data, root.left);
    else if (data > root.data) root.right = this.insert(data, root.right);

    return root;
  }

  find(value, root = this.root) {
    if (root == null) {
      return null;
    } else if (root.data === value) {
      return root;
    } else if (root.data > value) {
      return this.find(value, root.left);
    } else if (root.data < value) {
      return this.find(value, root.right);
    }
  }
  reBalance() {
    if (!this.isBalanced()) {
      let newArray = [];
      tree.inOrder((current) => {
        newArray.push(current.data);
      });
      this.root = BuildTree(newArray, 0, newArray.length - 1);
      return this.root;
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

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(tree.root);
// console.log(tree.root);

tree.root = tree.insert(7151);
tree.root = tree.insert(7152);
tree.root = tree.insert(7133);
tree.root = tree.insert(7154);
tree.root = tree.insert(7155);
tree.root = tree.insert(7156);
tree.root = tree.insert(7157);

prettyPrint(tree.root);

console.log(tree.find(67));

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

tree.inOrder((current) => {
  if (current.data > 33) {
    console.log(current.data + " is big");
  } else {
    console.log(current.data + " is small");
  }
});

// tree.postOrder((current) => {
//   if (current.data > 33) {
//     console.log(current.data + " is big");
//   } else {
//     console.log(current.data + " is small");
//   }
// });

tree.levelOrder((index = 0) => {
  index++;
});
console.log(tree.height(tree.find(5)));
console.log(tree.depth(tree.find(32)));
console.log(tree.isBalanced());
tree.reBalance();
console.log(tree.isBalanced());
prettyPrint(tree.root);
