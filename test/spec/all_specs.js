import "./enzyme";

const testsContext = require.context(".", true, /\.spec\.([jt])sx?$/);
testsContext.keys().forEach(testsContext);
