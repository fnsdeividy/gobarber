import React from "react";
import { render } from "@testing-library/react";
import SignIn from "../../pages/SignIn";

type Children = { 
    children: React.ReactNode 
}

jest.mock("react-router-dom", () => {
    return {
        useHistory: jest.fn(),
        Link: ({ children }: Children) => children,
    };
});

describe("SignIn Page", () => {
  it("should be able to sign in", () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
