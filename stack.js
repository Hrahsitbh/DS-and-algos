class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  push(element) {
    this.items[this.count] = element;
    console.log(`${element} is pushed at ${this.count}`);
    this.count++;
    return this.count - 1;
  }

  pop() {
    if (this.count === 0) return;
    let el = this.items[this.count - 1];
    this.count--;
    console.log(`${el} is removed`);
    return el;
  }

  peek() {
    console.log(`top element is ${this.items[this.count - 1]}`);
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  print() {
    let str = "";
    for (let i = 0; i < this.count; i++) {
      str += `${this.items[i]} `;
    }
    console.log(str);
    return str;
  }

  clearStack() {
    this.items = [];
    this.count = 0;
    return this.items;
  }
}

const stack = new Stack();
stack.push(100);
stack.push(200);
stack.pop();
stack.push(300);
stack.peek();
stack.push(400);
stack.print();
console.log(stack.isEmpty());
stack.clearStack();
stack.print();

// two stacks one array

class TwoStack {
  constructor(n) {
    this.size = n;
    this.items = new Array(n);
    this.top1 = -1;
    this.top2 = n;
  }

  push1(data) {
    if (this.top1 < this.top2 - 1) {
      this.top1++;
      this.items[this.top1] = data;
      return this.top1;
    }
    return "Over Flow";
  }

  push2(data) {
    if (this.top1 < this.top2 - 1) {
      this.top2--;
      this.items[this.top2] = data;
      return this.top2;
    }
    return "Over Flow";
  }

  pop1() {
    if (this.top1 < 0) return "Under flow";
    let el = this.items[this.top1];
    this.items[this.top1] = undefined;
    this.top1--;
    console.log(`${el} from stack 1 popped`);
    return el;
  }

  pop2() {
    if (this.top2 > this.size) return "Under flow";
    let el = this.items[this.top2];
    this.items[this.top2] = undefined;
    this.top2++;
    console.log(`${el} from stack 2 popped`);
    return el;
  }

  print() {
    let str = "";
    for (let i = 0; i < this.size; i++) {
      str += `${this.items[i]} `;
    }
    console.log(str);
    return str;
  }
}

const twoStack = new TwoStack(10);
twoStack.push1(100);
twoStack.push1(200);
twoStack.push2(800);
twoStack.push2(900);
twoStack.print();
twoStack.pop1();
twoStack.pop2();
twoStack.print();

function isBalanced(str) {
  const stack = [];
  for (let i = 0, len = str.length; i < len; i++) {
    const exp = str[i];
    if (["[", "{", "("].includes(exp)) {
      stack.push(exp);
      continue;
    }
    if (stack.length === 0) return false;
    switch (exp) {
      case "]": {
        const item = stack.pop();
        if (["(", "{"].includes(item)) return false;
        break;
      }
      case "}": {
        const item = stack.pop();
        if (["(", "["].includes(item)) return false;
        break;
      }
      case ")": {
        const item = stack.pop();
        if (["[", "{"].includes(item)) return false;
        break;
      }
    }
  }
  return stack.length === 0;
}
