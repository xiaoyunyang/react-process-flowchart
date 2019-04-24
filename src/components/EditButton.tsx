import React from 'react';

// Styles
import styles from './styles/workflowVis.module.css';

// Types
import {
    AddChildNode, AddChildNodeCommand
} from "../types/workflowVisTypes";

const noop = () => { };

interface PropsT {
    addChildNode: AddChildNode;
    isEmptyBranch?: boolean;
}

export default class EditButton extends React.PureComponent<PropsT> {
    constructor(props: PropsT) {
        super(props);
        this.addNodeWithLocationBound = this.addNodeWithLocation.bind(this);
    }

    addNodeWithLocationBound: (e: React.MouseEvent, addChildNodeMock?: AddChildNode) => void;

    addNodeWithLocation(e: React.MouseEvent, addChildNodeMock?: AddChildNode): AddChildNodeCommand {
        // eslint-disable-next-line react/destructuring-assignment
        const addChildNode: AddChildNode = addChildNodeMock || this.props.addChildNode;
        const { isEmptyBranch = false } = this.props;

        console.log(e.currentTarget.getBoundingClientRect());
        const { left, top } = e.currentTarget.getBoundingClientRect();
        return addChildNode({ left: e.clientX - left, top: e.clientY - top, isEmptyBranch });
    }

    render() {
        return (
            <span role="button" tabIndex={-1} className={styles.circle} onClick={this.addNodeWithLocationBound} onKeyPress={noop}>
                <i className="fas fa-plus" />
            </span>
        );
    }
}

