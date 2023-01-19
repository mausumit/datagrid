import React from 'react';
import { stopPropagation } from '../utils/domUtils';
import { SelectCellFormatter } from './SelectCellFormatter';
import { AccessColumnProps } from './../Types';
export const SELECT_COLUMN_KEY = 'select-row';

export const SelectColumn: AccessColumnProps<any, any> = {
  key: SELECT_COLUMN_KEY,
  name: '',
  width: 45,
  maxWidth: 45,
  resizable: false,
  frozen: true,
  clickable: false,
  columnType: 'checkbox',
  order: 0,
  headerRenderer(props) {
    return (
      <SelectCellFormatter
        aria-label="Select All"
        value={props.allRowsSelected}
        onChange={props.onAllRowsSelectionChange}
        checkboxHoverState={props.column.checkboxHoverstate}
        hoverStateCheckbox={props.column.hoverStateCheckbox}
        id={`header_${props.column.idx}`}
      />
    );
  },
  formatter(props) {
    return (
      <SelectCellFormatter
        aria-label="Select"
        tabIndex={-1}
        isCellSelected={props.isCellSelected}
        value={props.isRowSelected}
        onClick={stopPropagation}
        onChange={props.onRowSelectionChange}
        checkboxHoverState={props.column.checkboxHoverstate}
        hoverStateCheckbox={props.column.hoverStateCheckbox}
        id={`row_${props.rowIdx}`}
      />
    );
  },
  groupFormatter(props) {
    return (
      <SelectCellFormatter
        aria-label="Select Group"
        tabIndex={-1}
        isCellSelected={props.isCellSelected}
        value={props.isRowSelected}
        onChange={props.onRowSelectionChange}
        // Stop propagation to prevent row selection
        onClick={stopPropagation}
        id={`group_${props.column.idx}`}
      />
    );
  },
};
