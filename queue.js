class Queue {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    enqueue(element) {
        this.items[this.count] = element;
        console.log(`${element} is pushed at ${this.count}`);
        this.count++;
        return this.count - 1;
    }

    dequeue() {
        if (this.count === 0) return;
        this.items.splice(0, 1);
        this.count--;
        return this.count - 1;
    }

    isEmpty() {
        return this.count === 0;
    }

    peek() {
        console.log(`Item at front is ${this.items[0]}`);
        return this.items[0];
    }

    print() {
        let str = '';
        for (let i = 0; i < this.count; i++) {
            str += `${this.items[i]} `;
        }
        console.log(str);
        return str;
    }

}

const queue = new Queue();
queue.enqueue(100);
queue.enqueue(200);
queue.enqueue(300);
queue.dequeue();
queue.print();
queue.enqueue(400);
queue.peek();
