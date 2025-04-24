import { render } from "@testing-library/react";
import TestingPresentation from "./TestingPresentation";

describe("TestingPresentation Render", () => {
  test("<TestingPresentation /> の message にテキストを渡せる", () => {
    const { getByRole } = render(
      <TestingPresentation message="Hello Jest!!" />
    );
    expect(getByRole("heading", { name: "Hello Jest!!" })).toBeInTheDocument();
  });
});
