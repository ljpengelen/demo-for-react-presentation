import React from "react";
import styles from "./basic.scss";

export const FunctionalComponent = ({ children }) => (
  <span className={styles.great}>{children}</span>
);

export class CounterWithState extends React.Component {
  state = {
    count: 0
  };

  render() {
    return (
      <div>
        <FunctionalComponent>{this.state.count}</FunctionalComponent>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
        {this.props.children}
      </div>
    );
  }
}
