import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import FloatButton from "../../components/Chat/FloatButton";

afterEach(cleanup);
describe("Testing Float Buttons", () => {
    test("Testing Float Buttons rendering", () => {
        const htmlFor = "image-upload";
        const type = "";
        const icon = "icon-class";
        const accept = "";
        const color = "black";
        const toggleVisibility = jest.fn();
        const onChange = jest.fn();

        const { container } = render(
            <FloatButton
                htmlFor={htmlFor}
                type={type}
                icon={icon}
                accept={accept}
                onClick={toggleVisibility}
                onChange={onChange}
                color={color}
            />
        );
        const btnLabel = container.getElementsByTagName("label")[0];
        const btnIcon = btnLabel.children[0];
        const btnInput = container.getElementsByTagName("input")[0];

        expect(btnLabel).toHaveStyle(`background-color: ${color}`);
        expect(btnIcon).toHaveClass(icon);
        expect(btnInput).toHaveAttribute("id", htmlFor);

        expect(toggleVisibility).toBeCalledTimes(0);
        fireEvent.click(btnInput);
        expect(toggleVisibility).toBeCalledTimes(1);

        fireEvent.change(btnInput);
        expect(onChange).toBeCalledTimes(1);
    });
});
