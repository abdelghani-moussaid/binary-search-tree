import Node from "./node.js";

export default function buildTree(array, start, end) {
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
