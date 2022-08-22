// useState
const React = (function () {
  const hooks = [];
  let idx = 0;
  function useState(initVal) {
    const state = hooks[idx] || initVal;
    const _idx = idx;
    function setState(newVal) {
      hooks[_idx] = newVal;
    }
    idx++;
    return [state, setState];
  }
  function render(Comp) {
    idx = 0;
    const c = Comp();
    c.render();
    return c;
  }
  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState("thing");
  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word),
  };
}

let App = React.render(Component);
App.click();
App = React.render(Component);
App.type("anything");
App = React.render(Component);
