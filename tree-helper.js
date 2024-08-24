import Node from "./node.js";

export function buildTree(array, start, end) {
  /* Base Case */
  if (start > end) {
    return null;
  }
  /* Get the middle element and make it root */
  let mid = Math.floor((start + end) / 2);
  let node = new Node(array[mid]);
  /* Recursively construct the left subtree and make it 
     left child of root */
  node.left = buildTree(array, start, mid - 1);
  /* Recursively construct the right subtree and make it 
     right child of root */
  node.right = buildTree(array, mid + 1, end);
  return node;
}

// A utility function to insert a new
// node with the given data
export function insert(root, data) {
  if (root === null) return new Node(data);

  // Duplicates not allowed
  if (root.data === data) return root;

  if (data < root.data) root.left = insert(root.left, data);
  else if (data > root.data) root.right = insert(root.right, data);

  return root;
}

// Note that it is not a generic inorder successor
// function. It mainly works when the right child
// is not empty, which is  the case we need in BST
// delete.
function getSuccessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}
// This function deletes a given key x from the
// given BST and returns the modified root of the
// BST (if it is modified).
export function deleteItem(root, x) {
  // Base case
  if (root === null) {
    return root;
  }

  // If key to be searched is in a subtree
  if (root.data > x) {
    root.left = deleteItem(root.left, x);
  } else if (root.data < x) {
    root.right = deleteItem(root.right, x);
  } else {
    // If root matches with the given key

    // Cases when root has 0 children or
    // only right child
    if (root.left === null) return root.right;

    // When root has only left child
    if (root.right === null) return root.left;

    // When both children are present
    let succ = getSuccessor(root);
    root.data = succ.data;
    root.right = deleteItem(root.right, succ.data);
  }
  return root;
}
