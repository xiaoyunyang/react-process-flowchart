import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import DecisionStep, { DiamondIcon } from "../../lib/components/DecisionStep";

// Types
import { workflowStepConfig, encodedNodeType, ForkIcon } from "../../config";

configure({ adapter: new Adapter() });

describe("DecisionStep Spec", () => {
    let decisionStep: any;

    beforeEach(() => {
        decisionStep = shallow(<DecisionStep />);
    });

    describe("render", () => {
        it("renders decisionStep in diamondContainer", () => {
            expect(decisionStep.hasClass("diamondContainer")).toBe(true);
        });
        it("renders correct theme for decisionStep", () => {
            const { theme } = workflowStepConfig[encodedNodeType.fork];
            expect(decisionStep.childAt(0).hasClass(`theme${theme}`)).toBe(true);
        });

        it("renders correct icon for decisionStep", () => {
            const diamondIcon = decisionStep.find(DiamondIcon);
            const forkIcon = diamondIcon.dive().find(ForkIcon);
            expect(forkIcon).toHaveLength(1);
        });
    });
});
