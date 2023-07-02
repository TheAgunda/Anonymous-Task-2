import { render, screen } from "@testing-library/react";
import Home from "../page/Home";
describe("Home component", () => {
    it("should render Home component correctly", () => {
        render(<Home />);
        const element = screen.getByLabelText("Add Post");
        expect(element).toBeInTheDocument();
    });
});