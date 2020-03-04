import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import ForkStep, { DiamondIcon } from "../../lib/components/ForkStep";

// Types
import { workflowStepConfig, encodedNodeType, ForkIcon } from "../../config";

configure({ adapter: new Adapter() });

describe("ForkNode Spec", () => {
    let forkStep: any;

    beforeEach(() => {
        forkStep = shallow(<ForkStep />);
    });

    describe("render", () => {
        it("renders ForkStep in diamondContainer", () => {
            expect(forkStep.hasClass("diamondContainer")).toBe(true);
        });
        it("renders correct theme for ForkStep", () => {
            const { theme } = workflowStepConfig[encodedNodeType.fork];
            expect(forkStep.childAt(0).hasClass(`theme${theme}`)).toBe(true);
        });

        it("renders correct icon for ForkStep", () => {
            const diamondIcon = forkStep.find(DiamondIcon);
            const forkIcon = diamondIcon.dive().find(ForkIcon);
            expect(forkIcon).toHaveLength(1);
        });
    });
});
