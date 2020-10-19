class Node {
  constructor(data){
    this.data = data;
  }
}

/*3. Create a BST class
Walk through the binary search tree code in the curriculum and understand it well. Then write a BinarySearchTree class with its core functions (insert(), remove(), find()) from scratch.*/

class BinarySearchTree {
  constructor(key = null, value = null, parent = null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }
    /* If the tree already exists, then start at the root, and compare it to the key you want to insert. If the new key is less than the node's key then the new node needs to live in the left-hand branch */
    else if (key < this.key) {
      /* If the existing node does not have a left child, meaning that if the `left` pointer is empty, then we can just instantiate and insert the new node as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /*If the node has an existing left child, then we recursively call the `insert` method so the node is added further down the tree */
      else {
        this.left.insert(key, value);
      }
    }
    /*Similarly, if the new key is greater than the node's key then you do the same thing, but on the right-hand side */
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    /* If the item you are looking for is less than the root then follow the left child. If there is an existing left child, then recursively check its left and/or right child until you find the item */
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    /* If the item you are looking for is greater than the root then follow the right child. If there is an existing right child, then recursively check its left and/or right child until you find the item */
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child, then you replace the node with its left child */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /* And similarly if the node only has a right child then you replace it with its right child */
      else if (this.right) {
        this._replaceWith(this.right);
      }
      /* If the node has no children then simply remove it and any references to it by calling "this._replaceWith(null)" */
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  findMax() {
    let current = this;
    while (current.right !== null) {
        current = current.right;
    }
    return current;
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
}

_findMin() {
    if (!this.left) {
        return this;
    }
    return this.left._findMin();
    }
}

/*Create a binary search tree called BST and insert 3,1,4,6,9,2,5,7 into your tree. Compare your result with the result from the 1st exercise.*/

const firstTree = new BinarySearchTree;

firstTree.insert(3);
firstTree.insert(1);
firstTree.insert(4);
firstTree.insert(6);
firstTree.insert(9);
firstTree.insert(2);
firstTree.insert(5);
firstTree.insert(7);

// console.log(thirdLargestNode(firstTree));

/*Create a binary search tree called BST and insert E A S Y Q U E S T I O N into your tree. Compare your result with the result from the 1st exercise.*/

const secondTree = new BinarySearchTree;

secondTree.insert('E');
secondTree.insert('A');
secondTree.insert('S');
secondTree.insert('Y');
secondTree.insert('Q');
secondTree.insert('U');
secondTree.insert('E');
secondTree.insert('S');
secondTree.insert('T');
secondTree.insert('I');
secondTree.insert('O');
secondTree.insert('N');

/*4. What does this program do?
Without running this code in your code editor, explain what the following program does. Show with an example the result of executing this program. What is the runtime of this algorithm?*/

function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

// ANSWER: Adding up the node values

/*5. Height of a BST
Write an algorithm to find the height of a binary search tree. What is the time complexity of your algorithm?*/

function bstHeight(bst){
  //starting point
  let leftH = 0;
  let rightH = 0;

  // if no binary tree, then height is 0
    if(!bst){
      return 0;
    } else {
        leftH = bstHeight(bst.left);
        rightH = bstHeight(bst.right);
          if (leftH > rightH) {
            return leftH + 1;
            // add 1 to the left side height
          } else {
            return rightH + 1;
            // add 1 to the right side height
          }
    }
}

/*6. Is it a BST?
Write an algorithm to check whether an arbitrary binary tree is a binary search tree, assuming the tree does not contain duplicates.*/

function isBst(bst){
  // If the key is null then the object represents an empty tree.
  if(!bst.key){
    return false;
  } 
  // if the left key is greater than root, it is not BST
  if (bst.left) {
    if (bst.left.key > bst.key) {
      return false;
    } else {
      // if less than key, add to the left of the tree
      return isBst(bst.left);
    }
  }
  // if the right key is less than root, it is not BST
  if (bst.right) {
    if (bst.right.key < bst.key) {
      return false;
    } else {
      // if greater than key, add to the right of the tree
      return isBst(bst.right);
    }
  }

}



/*7. 3rd largest node
Write an algorithm to find the 3rd largest node in a binary search tree.*/

function thirdLargestNode(tree){
  let largestNode = tree.findMax();
  let counter = 1;

  while(counter < 3){
    let largestNode = tree.findMax();

    if(!largestNode){
      return;
    }
    tree.remove(largestNode.key);
    counter++;
  }

  return tree.findMax();
}

/*8. Balanced BST
Write an algorithm that checks if a BST is balanced (i.e., a tree where no 2 leaves differ in distance from the root by more than 1).*/

function balancedBst(tree){
  let leftcount = 0;
  let rightcount = 0;
  let current = tree;

  while (current.left !== null) {
    current = current.left;
    leftcount++;
  }

  current = tree;
  while (current.right !== null) {
    current = current.right;
    rightcount++;
  }
  
  return leftcount === rightcount;
  
}

console.log(balancedBst(firstTree));

/*9. Are they the same BSTs?
You are given two arrays which represent two sequences of keys that are used to create two binary search trees. Write a program that will tell whether the two BSTs will be identical or not without actually constructing the tree. You may use another data structure such as an array or a linked list but don't construct the BST. What is the time complexity of your algorithm? E.g., 3, 5, 4, 6, 1, 0, 2 and 3, 1, 5, 2, 4, 6, 0 are two sequences of arrays but will create the exact same BSTs and your program should return true.*/

let arr1 = [3, 5, 4, 6, 1, 0, 2];
                  3
                /   \
               1  -    5
             /  \    /   \
            0  -  2  4 - 6
let arr2 = [3, 1, 5, 2, 4, 6, 0];


// MUST CREATE A LINKED LIST

function sameBST(arr1, arr2){
  let arr1 = arr1.sort();
  if(arr1.length !== arr2.length){
    return false
  }
  
  for(let i=0; i < arr1.length; i++){
    for(let j=0; j < arr2.length; j++){
      if(arr1[i] !== arr2[j]){
        return false
      }
      else{
        return true
      }
    }
  }
}
