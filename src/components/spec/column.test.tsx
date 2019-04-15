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
import { ConnectorTypeT } from "../../types/workflowVisTypes";

configure({ adapter: new Adapter() });

describe("Column Spec", () => {
    let column: any;
    const colEntries = [
        {
            matrixEntry: "ba322565b1bf",
            tile: { id: "ba322565b1bf", name: "D", type: WorkflowStepTypeT.DECISION }
        },
        {
            matrixEntry: "09e6110fda58",
            tile: { id: "09e6110fda58", name: "Translation", type: WorkflowStepTypeT.TRANSLATION }
        },
        {
            matrixEntry: "box.empty.0,1",
            tile: { id: "box.empty", name: "empty", containerName: "connectorContainerBox", type: ConnectorTypeT.BOX_CONNECTOR }
        },
        {
            matrixEntry: "diamond.lineHoriz.3,3.2,2",
            tile: { id: "diamond.lineHoriz", name: "lineHoriz", containerName: "connectorContainerDiamond", type: ConnectorTypeT.DIAMOND_CONNECTOR }
        },
        {
            matrixEntry: "diamond.arrowRight.3,4.2,4",
            tile: { id: "diamond.arrowRight", name: "arrowRight", containerName: "connectorContainerDiamond", type: ConnectorTypeT.DIAMOND_CONNECTOR }
        }
    ];
    let props: any;

    beforeEach(() => {
        props = {
            colEntries,
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
            const arrowRight = column.find({ id: "diamond.arrowRight" });
            expect(connectors).toHaveLength(3);
            expect(empty).toHaveLength(1);
            expect(lineHoriz).toHaveLength(1);
            expect(arrowRight).toHaveLength(1);
            expect(column.at(2).childAt(0)).toEqual(empty);
            expect(column.at(3).childAt(0)).toEqual(lineHoriz);
            expect(column.at(4).childAt(0)).toEqual(arrowRight);
        });
        it("renders edit button for connectors with parentCoord when editMode is enabled", () => {
            props = { ...props, editMode: true };
            column = shallow(<Column {...props} />);
            const lineHorizEdit = column.find({ id: "diamond.lineHoriz.edit" });
            const arrowRightEdit = column.find({ id: "diamond.arrowRight.edit" });
            expect(lineHorizEdit).toHaveLength(1);
            expect(arrowRightEdit).toHaveLength(1);
        });
    });
});
