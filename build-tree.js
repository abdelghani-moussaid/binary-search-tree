
import Node from "./node.js";

function buildTree(array)
{
    /* Base Case */
    if (start > end)
    {
        return null;
    }
    /* Get the middle element and make it root */
    let mid = Math.floor((array.length - 1) / 2);
    let node = new Node(arr[mid]);
    /* Recursively construct the left subtree and make it 
     left child of root */
    node.left = buildTree(array.slice(0, mid));
    /* Recursively construct the right subtree and make it 
     right child of root */
    node.right = buildTree(array.slice(mid + 1));
    return node;
}

