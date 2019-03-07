// @ts-ignore
import { FunctionalComponent } from "src/basic/plain.js";
import React from "react";
import { shallow } from "enzyme";
import styles from "src/basic/basic.scss";

describe("FunctionalComponent", () => {
  it("wraps children", () => {
    const context = shallow(
      <FunctionalComponent>
        <span>first</span>
        <span>second</span>
      </FunctionalComponent>
    );
    expect(context.children().length).to.equal(2);
    expect(context.childAt(0).text()).to.equal("first");
    expect(context.childAt(1).text()).to.equal("second");
  });

  it("has great style", () => {
    const context = shallow(
      <FunctionalComponent>
        <div />
      </FunctionalComponent>
    );
    expect(context.find(`.${styles.great}`).length).to.equal(1);
  });
});
