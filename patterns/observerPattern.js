// Use observables to notify subscribers when an event occurs
class Observable{
  constructor () {
      this.observers = [];
  }

  subscribe(func) {
   this.observers.push(func)
  }

  unsubscribe(func) {
   this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
   this.observers.forEach((observer) => observer(data))
  }

}

function logger(data) {
    console.log(`${Date.now()} ${data}`);
  }
  
function toastify(data) {
    toast(data);
  }

observable.subscribe(logger);
observable.subscribe(toastify);
