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
