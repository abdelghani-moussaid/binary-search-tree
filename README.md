# Tree Class Implementation

## Overview
A custom implementation of a balanced binary search tree in JavaScript, featuring basic tree operations and dynamic resizing.

## Features
- **Initialization**: Constructs a balanced binary search tree from a sorted, unique array of numbers.
- **Traversal Methods**: Implements level-order, pre-order, in-order, and post-order traversals with callback support.
- **Balance Check**: Methods to check if the tree is balanced and to rebalance it if necessary.
- **Height and Depth**: Computes the height of a node and the depth of a specific node.
- **Node Operations**: Supports insertion, deletion, and searching of nodes.
- **Pretty Print**: Displays the tree structure in a visually appealing format.
- **Dynamic Resizing**: Rebuilds the tree to maintain balance when adding new elements.

## Key Methods
- `levelOrder(callback)`: Iterates through the tree level by level.
- `preOrder(callback, root)`: Recursively traverses nodes in pre-order.
- `inOrder(callback, root)`: Recursively traverses nodes in in-order.
- `postOrder(callback, root)`: Recursively traverses nodes in post-order.
- `height(node)`: Returns the height of a node.
- `isBalanced(node)`: Checks if the tree is balanced.
- `depth(node, root)`: Returns the depth of a node.
- `insert(data, root)`: Inserts a new node with specified data.
- `deleteItem(x, root)`: Deletes a node with specified data.
- `reBalance()`: Rebalances the tree if it’s unbalanced.
- `prettyPrint(node, prefix, isLeft)`: Prints the tree structure.

## Usage Example
- Initializes the tree with a random array.
- Demonstrates various operations: insertion, deletion, balancing, and different traversal methods.
- Prints the tree structure before and after rebalancing.
