class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // insert at First
    insertFirst(data) {
        this.head = new Node(data, this.head);
        this.size++;
    }

    // insert at Last
    insertLast(data) {
        const node = new Node(data);
        let current;
        if (!this.head) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    // insert at index
    inserAt(data, index) {
        if (index > 0 && index > this.size) return;
        if (index === 0) { this.insertFirst(data); return; }
        const node = new Node(data);
        let current = this.head;
        let previous;
        let count = 0;
        while (count < index) {
            previous = current; // node before index
            count++;
            current = current.next; // node after index
        }
        node.next = current; // new node next points to current(before insertion)
        previous.next = node; // previous node points to new node
        this.size++;
    }

    // remove at index 
    removeAt(index) {
        if (index > 0 && index > this.size) return;
        if (!this.head) return;
        let current = this.head;
        let previous;
        let count = 0;
        if (index === 0) {
            console.log(`${current.data} at ${index} is deleted`);
            this.head = current.next;
        }
        else {
            while (count < index) {
                previous = current; // point prev to index before
                current = current.next; //  node after index
                count++;
            }
            console.log(`${current.data} at ${index} is deleted`);
            previous.next = current.next; // prev next to be pointed to current next
        }
        this.size--;
    }

    // get at index 
    getAt(index) {
        let current = this.head;
        let count = 0;
        while (current) {
            if (count === index) { console.log(`data at ${index} is`, current.data); }
            count++;
            current = current.next;
        }
        return;
    }

    // clear list
    clearList() {
        this.head = null;
        this.size = 0;
    }

    // reverse list
    reverseList() {
        let current = this.head;
        let previous = null;
        let nextNode = null;
        while (current != null) {
          nextNode = current.next;
          current.next = previous;
          previous = current;
          current = nextNode;
        }
        this.head = previous;
    }

    // print the list
    printList() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
}
const ll = new LinkedList();
ll.insertFirst(100);
ll.insertLast(200, 1)
ll.insertLast(300);
ll.inserAt(400, 2);
ll.inserAt(500, 3);
ll.printList();
ll.getAt(2);
ll.removeAt(3);
ll.printList();

ll.reverseList();
ll.printList();

ll.clearList();
ll.printList();
