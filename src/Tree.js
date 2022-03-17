import React from 'react';
import './tree.css';
import { TreeViz } from './tree-visualizer';
import _ from 'lodash';

class Tree {
  constructor() {
    this.root = null;
    // return this;
  }
  add(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.root.add(value);
    }
  }
  toObject() {
    return this.root;
  }
}

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   //  this.height = 1// always update height after adding nodes
//   }
//   get height() {
//      const left = this.left ? 1 : 0
//     const right = this.right ? 1 : 0
//     return Number(Boolean(this.left)) + Number(Boolean(this.right))
//    }
//   add(value) {
//     // recursively call add method on children
//     if (this.value > value) {
//       // go left
//       if (this.left) {
//         this.left.add(value)
//       } else {
//         this.left = value
//       }
//     } else {
//       // go right
//       if (this.right) {
//         this.right.add(value)
//       } {
//         else this.right.add(value)
//       }
//     }
//     // decide to go left or right

//     this.balance();
//   }
//   balance() {
//     // ask if this node is out of balance by checking height
//     // out of balance if the height has 2 or more differences
//     // if balanced, do nothing
//     // call rotate if out of balance
//     // if out of balance, do we need single or double rotate
//     // if single, call rotate on self
//     // if double, call roate on child then self
//     if(this.left.value && !this.right.value && this.left.value.left || this.left.value.right)
//   }
//   rotateRR() {
//     // call if right child is heavy

//     this.right.updateInNewLocation();
//     this.updateInNewLocation();
//   }
//   rotateLL() {
//     // call if left child is heavy
//     this.left.updateInNewLocation();
//     this.updateInNewLocation();
//   }
//   updateInNewLocation() {
//     // calculate new height
//     // empty child = height 1
//   }
// }

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1; // always update height after adding nodes
  }

  add(value) {
    // recursively call add method on children
    if (this.value > value) {
      // go left
      if (this.left) {
        this.left.add(value);
      } else {
        this.left = new Node(value);
      }
      if (!this.right || this.right.height < this.left.height) {
        this.height = this.left.height + 1;
      }
    } else {
      //  go right
      if (this.right) {
        this.right.add(value);
      } else {
        this.right = new Node(value);
      }
      if (!this.left || this.right.height > this.left.height) {
        this.height = this.right.height + 1;
      }
    }
    // decide to go left or right

    this.balance();
  }
  balance() {
    // ask if this node is out of balance by checking height
    // out of balance if the height has 2 or more differences
    // if balanced, do nothing
    // call rotate if out of balance
    // if out of balance, do we need single or double rotate
    // if single, call rotate on self
    // if double, call roate on child then self
    const rightHeight = this.right ? this.right.height : 0;
    const leftHeight = this.left ? this.left.height : 0;
    if (leftHeight > rightHeight + 1) {
      // need to do a double rotation
      const leftRightHeight = this.left.right ? this.left.right.height : 0;
      const leftLeftHeight = this.left.left ? this.left.left.height : 0;
      // TODO try with nullish coalescing

      if (leftRightHeight > leftLeftHeight) {
        // double rotation
        this.left.rotateRR();
      }
      this.rotateLL();
    } else if (rightHeight > leftHeight + 1) {
      const rightRightHeight = this.right.right ? this.right.right.height : 0;
      const rightLeftHeight = this.right.left ? this.right.left.height : 0;

      if (rightLeftHeight > rightRightHeight) {
        // double rotation
        this.right.rotateLL();
      }
      this.rotateRR();
    }
  }
  rotateRR() {
    // call if right child is heavy
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;
    this.left.updateInNewLocation();
    this.updateInNewLocation();
  }
  rotateLL() {
    // call if left child is heavy
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;
    this.right.updateInNewLocation();
    this.updateInNewLocation();
  }
  updateInNewLocation() {
    // calculate new height
    // empty child = height 1
    if (!this.right && !this.left) {
      // no children
      this.height = 1;
    } else if (
      !this.right ||
      (this.left && this.right.height < this.left.height)
    ) {
      // need to take height from the left
      this.height = this.left.height + 1;
    } else {
      this.height = this.right.height + 1;
    }
  }
}

export default function TreeComponent() {
  const nums = _.shuffle(_.range(50));
  const tree = new Tree();
  nums.map((num) => tree.add(num));
  const objs = tree.toObject();
  return <TreeViz root={objs} />;
}
