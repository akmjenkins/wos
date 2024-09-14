import { render } from "@testing-library/react";
import App from "./App";
import { withQueryClient } from "./test/decorators";
describe("App", () => {
  it("should render", () => {
    render(<App />, { wrapper: withQueryClient() });
  });
});
