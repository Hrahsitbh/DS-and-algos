class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    add(data) {
        const node = this.root;
        if (node === null) {
            this.root = new Node(data);
            return;
        } else {
            const searchTree = function (node) {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) return searchTree(node.left);
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) return searchTree(node.right);
                } else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }

    findMin() {
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    findMax() {
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }

    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) return true;
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    remove(data) {
        const removeNode = function (node, data) {
            if (node === null) return null;
            if (data = node.data) {
                // no children
                if (node.left === null && node.right === null) return null;
                // no left child
                if (node.left === null) return node.right;
                // no right child
                if (node.right === null) return node.left;
                // both child
                let tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data);
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
            } else {
                node.right = removeNode(node.right, data);
            }
        }
        this.root = removeNode(this.root, data);
    }

    isBalanced() {
        return (this.findMinHeight() >= this.findMaxHeight() - 1);
    }

    findMinHeight(node = this.root) {
        if (node === null) return -1;
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        }

    }

    findMaxHeight(node = this.root) {
        if (node === null) return -1;
        let left = this.findMaxHeight(node.left);
        let right = this.findMinHeight(node.right);
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }
    inOrder() {
        if (this.root === null) return null;
        else {
            let result = [];
            function InOrderTraversal(node) {
                node.left && InOrderTraversal(node.left);
                result.push(node.data);
                node.right && InOrderTraversal(node.right);
            }
            InOrderTraversal(this.root);
            return result;
        }
    }

    preOrder() {
        if (this.root === null) return null;
        else {
            let result = [];
            function preOrderTraversal(node) {
                result.push(node.data);
                node.left && preOrderTraversal(node.left);
                node.right && preOrderTraversal(node.right);
            }
            preOrderTraversal(this.root);
            return result;
        }
    }

    postOrder() {
        if (this.root === null) return null;
        else {
            let result = [];
            function postOrderTraversal(node) {
                node.left && postOrderTraversal(node.left);
                node.right && postOrderTraversal(node.right);
                result.push(node.data);
            }
            postOrderTraversal(this.root);
            return result;
        }
    }
    levelOrder() {
        let result = [];
        let Q = [];
        if (this.root !== null) {
            Q.push(this.root);
            while (Q.length > 0) {
                let node = Q.shift();
                result.push(node.data);
                if (node.left !== null) {
                    Q.push(node.left)
                }
                if (node.right !== null) {
                    Q.push(node.right);
                }
            }
            return result;
        } else {
            return null;
        }
    }

    findDiameter() {
        const height = function (node) {
            if (node === null) return 0;
            return Math.max(1 + height(node.left), height(node.right));
        }
        const diameter = function (node) {
            if (node === null) return 0;
            let lHeight = height(node.left);
            let rHeight = height(node.right);

            let lDiameter = diameter(node.left);
            let rDiameter = diameter(node.right);

            return Math.max(lHeight + rHeight + 1, Math.max(lDiameter, rDiameter));
        }
        return diameter(this.root);
    }

    invertBST() {
        const mirror = function (node) {
            if (node === null) return node;
            let lNode = mirror(node.left);
            let rNode = mirror(node.right);
            // swap left and righ child nodes
            node.left = rNode;
            node.right = lNode;
            return node;
        }
        this.root = mirror(this.root);
    }

    checkBST() {
        if (this.root === null) return false;
        function isBST(node) {
            let prev = null;
            node.left && isBST(node.left);
            if (prev !== null && node.data <= prev.data) return false;
            prev = node;
            node.right && isBST(node.right);
        }
        isBST(this.root);
        return true;
    }
}

const bst = new BST();
bst.add(4);
bst.add(2);
bst.add(6);
bst.add(1);
bst.add(3);
bst.add(5);
console.log(bst.findMin())
console.log(bst.findMax())
console.log(bst.isPresent(2));
console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
console.log(bst.inOrder());
console.log(bst.postOrder());
console.log(bst.preOrder());
console.log(bst.levelOrder());
console.log(bst.findDiameter());
bst.invertBST();
console.log(bst.inOrder());
console.log(bst.checkBST());