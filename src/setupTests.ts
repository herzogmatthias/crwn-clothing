// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { configure, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });
global.actions = async (wrapper: ReactWrapper, _actions: any) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    _actions();
    wrapper.update();
  });
};
