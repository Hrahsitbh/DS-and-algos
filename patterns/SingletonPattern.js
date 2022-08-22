// singelton - Share a single global instance throughout our application

const Singleton = (function () {
  let instance;
  function createInstance() {
    return new Object("Instace created");
  }
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
        {
          /* new Object('Instace created'); */
        }
      }
      return instance;
    },
  };
})();

var instance1 = new Singleton();
var instance2 = new Singleton();
instance1.getInstance() === instance2.getInstance();

// alternatively you can use an object too
let count = 0;

const counter = {
  increment() {
    return ++count;
  },
  decrement() {
    return --count;
  },
};

Object.freeze(counter);
export { counter };
