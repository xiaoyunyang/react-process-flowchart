import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import WorkflowVis, { WorkflowVisPropsT } from "../../lib/components/WorkflowVis";
import Column from "../../lib/components/Column";

// Mock
import { workflowVisData, matrixBA } from "../../mocks/mockMatrices";

// Types
import { WorkflowStepTypeT } from "../../config";

// Constants
import { ConnectorName, AddNodeParams } from "../../lib/types/workflowVisTypes";

configure({ adapter: new Adapter() });

describe("WorkflowVis Spec", () => {
    let workflowVis: any;
    let props: WorkflowVisPropsT;
    const matrix = matrixBA;
    const addNodeParams = () => { };

    beforeEach(() => {
        props = {
            workflowVisData,
            matrix,
            editMode: false,
            addNodeParams: addNodeParams as any as AddNodeParams
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
            const { colEntries } = column.props();

            expect(colEntries[0].tile.type).toBe(WorkflowStepTypeT.AUTHORIZE);
        });
        it("renders arrowRight connector in the top of the second Column", () => {
            const column = columns.at(1);
            const connectorName = column.prop("colEntries")[0].tile.name;
            expect(connectorName).toBe(ConnectorName.ARROW_RIGHT);
        });
    });
});
