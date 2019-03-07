import { connect } from "react-redux";
import { createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";

// Action
const INCREASE_COUNTER = "INCREASE_COUNTER";
const increaseCounter = () => ({ type: INCREASE_COUNTER });

// Reducer
const initialState = { count: 0 };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_COUNTER:
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
};

// Store
const store = createStore(reducer);

// Plain (functional) component
const FunctionalCounter = ({ count, increase }) => (
  <div>
    {count}
    <button onClick={increase}>Click me</button>
  </div>
);

// Component that can be connected to store
const mapStateToProps = state => ({
  count: state.count
});

const ConnectableCounter = connect(
  mapStateToProps,
  { increase: increaseCounter }
)(FunctionalCounter);

// Component connected with store
export const ConnectedCounter = () => (
  <Provider store={store}>
    <ConnectableCounter />
  </Provider>
);
