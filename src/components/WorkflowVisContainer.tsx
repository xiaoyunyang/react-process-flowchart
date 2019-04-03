/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Styles
import './styles/workflowVis2D.css';

// Components
import WorkflowVis from "./WorkflowVis2D";

// Types
import { WorkflowStepT } from "../types/workflow";

// Utils
import { generateWorkflowVisData } from "../utils/workflowVizUtils";


interface PropsT {
    workflowUid: string;
    workflowSteps: any; // WorkflowStepT[];
    editMode: boolean;
}

export default class WorkflowVisContainer extends React.PureComponent<PropsT> {

    render() {
        const { workflowSteps, workflowUid, editMode } = this.props;
        const workflowVisData = generateWorkflowVisData(workflowSteps, workflowUid);

        return <WorkflowVis workflowVisData={workflowVisData} editMode={editMode} />;
    }

}