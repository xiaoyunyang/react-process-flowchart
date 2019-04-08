import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import Column from "../Column";
import DecisionStep from "../DecisionStep";
import WorkflowStep from "../WorkflowStep";
import Connector from "../Connector";

// Types
import { WorkflowStepTypeT } from "../../types/workflow";
import { ConnectorTypeT } from "../../types/workflowVis";

configure({ adapter: new Adapter() });

describe("Column Spec", () => {
    let column: any;
    let nodes = [
        { id: "ba322565b1bf", name: "D", type: WorkflowStepTypeT.DECISION },
        { id: "09e6110fda58", name: "Translation", type: WorkflowStepTypeT.TRANSLATION },
        { id: "box.empty", name: "empty", containerName: "connectorContainerBox", type: ConnectorTypeT.BOX_CONNECTOR },
        { id: "diamond.lineHoriz", name: "lineHoriz", type: ConnectorTypeT.DIAMOND_CONNECTOR }
    ];
    let props;

    beforeEach(() => {
        props = {
            nodes,
            colNum: 0,
            editMode: false
        };

        column = shallow(<Column {...props} />);
    });

    describe("render", () => {
        it("renders decision step", () => {
            const decisionStep = column.find(DecisionStep);
            expect(decisionStep).toHaveLength(1);
            expect(column.at(0).childAt(0)).toEqual(decisionStep);
        });
        it("renders workflow step", () => {
            const workflowStep = column.find(WorkflowStep);
            expect(workflowStep).toHaveLength(1);
            expect(column.at(1).childAt(0)).toEqual(workflowStep);
        });
        it("renders connector", () => {
            const connectors = column.find(Connector);

            const empty = column.find({ id: "box.empty" });
            const lineHoriz = column.find({ id: "diamond.lineHoriz" });
            expect(connectors).toHaveLength(2);
            expect(empty).toHaveLength(1);
            expect(lineHoriz).toHaveLength(1);
            expect(column.at(2).childAt(0)).toEqual(empty);
            expect(column.at(3).childAt(0)).toEqual(lineHoriz);
        });
    });
});
