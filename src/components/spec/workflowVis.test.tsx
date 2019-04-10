import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import WorkflowVis from "../WorkflowVis";
import Column from "../Column";

// Mock
import { workflowVisData, matrixBA } from "./mockMatrices";

// Types
import { WorkflowStepTypeT } from "../../types/workflow";

// Constants
import { connectors } from "../Connector";

configure({ adapter: new Adapter() });

describe("WorkflowVis Spec", () => {
    let workflowVis: any;
    let props;
    const matrix = matrixBA;

    beforeEach(() => {
        props = {
            workflowVisData,
            matrix,
            editMode: false
        };

        workflowVis = shallow(<WorkflowVis {...props} />);
    });

    describe("render", () => {
        let columns: any;
        beforeEach(() => {
            columns = workflowVis.find(Column);
        });

        it("renders correct number of Columns", () => {
            expect(columns).toHaveLength(matrix.length);
        });
        it("renders Authorize in the first Column", () => {
            const column = columns.at(0);
            expect(column.props().nodes[0].type).toBe(WorkflowStepTypeT.AUTHORIZE);
        });
        it("renders arrowRight connector in the second Column", () => {
            const column = columns.at(1);
            const connectorId = matrix[1][0];
            expect(column.props().nodes[0]).toBe(connectors[connectorId]);
        });
    });
});
