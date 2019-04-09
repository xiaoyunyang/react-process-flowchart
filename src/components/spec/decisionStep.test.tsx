import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import DecisionStep from "../DecisionStep";

// Types
import { WorkflowStepTypeT } from "../../types/workflow";

// Constants
import { workflowStepConfig } from "../../constants/workflowStepConfig";

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
            const { theme } = workflowStepConfig[WorkflowStepTypeT.DECISION];
            expect(decisionStep.childAt(0).hasClass(`theme${theme}`)).toBe(true);
        });
        // TODO: Add this to main project later
        it("renders correct icon for decisionStep", () => {
            const icon = decisionStep.childAt(0).childAt(0).props().icon;
            const { icon: expectedIcon } = workflowStepConfig[WorkflowStepTypeT.DECISION];
            expect(icon).toEqual(expectedIcon);
        });
    });
});
