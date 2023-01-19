import React, { FC, useRef } from "react";
import ReactDataGrid, { DataGridProps } from "react-data-grid";
export const BaseGrid: FC<DataGridProps<R, SR>> = React.forwardRef(
  (props: DataGridProps<R, SR>, ref: any) => {
    return (
      <ReactDataGrid
        rowHeight={props.rowHeight ? props.rowHeight : 45}
        headerRowHeight={props.rowHeight ? props.rowHeight : 40}
        rowClass={() => {
          return "access-grid-row";
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
