import { ConnectedCounter } from "src/basic/redux";
import { CounterWithState } from "src/basic/plain";
import React from "react";
import ReactDOM from "react-dom";

{
  const root = document.querySelector("#app-root");

  ReactDOM.render(
    <div>
      <CounterWithState />
      <ConnectedCounter />
    </div>,
    root
  );
}

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }
}
