import React, { RefAttributes, FC } from 'react';
import { memo, forwardRef } from 'react';
import clsx from 'clsx';
import Cell from './Cell';
import { RowRendererProps, SelectedCellProps } from './types';

export const rowClassname = `rdg-row`;

export const rowSelectedClassname = `rdg-row-selected`;

export const groupRowSelectedClassname = `rdg-group-row-selected`;

const Row: FC<RowRendererProps<R, SR> & RefAttributes<HTMLDivElement>> = (
  {
    cellRenderer: CellRenderer = Cell,
    className,
    rowIdx,
    isRowSelected,
    copiedCellIdx,
    draggedOverCellIdx,
    row,
    viewportColumns,
    selectedCellProps,
    onRowClick,
    rowClass,
    setDraggedOverRowIdx,
    onMouseEnter,
    top,
    onRowChange,
    selectCell,
    selectRow,
    'aria-rowindex': ariaRowIndex,
    'aria-selected': ariaSelected,
    gridId,
    ...props
  }: RowRendererProps<R, SR>,
  ref: React.Ref<HTMLDivElement>
) => {
  function handleDragEnter(event: React.MouseEvent<HTMLDivElement>) {
    setDraggedOverRowIdx && setDraggedOverRowIdx(rowIdx);
    onMouseEnter && onMouseEnter(event);
  }

  className = clsx(
    rowClassname,
    `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
    {
      [rowSelectedClassname]: isRowSelected,
      [groupRowSelectedClassname]:
        selectedCellProps && selectedCellProps.idx === -1
    },
    rowClass && rowClass(row),
    className
  );

  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
      aria-selected={ariaSelected}
      ref={ref}
      className={className}
      onMouseEnter={handleDragEnter}
      style={{ top, fontWeight: row.highlight && 900 }}
      {...props}
    >
      {viewportColumns.map(column => {
        const isCellSelected =
          selectedCellProps && selectedCellProps.idx === column.idx;
        return (
          <CellRenderer
            key={`${column.idx}${rowIdx}`}
            rowIdx={rowIdx}
            column={column}
            row={row}
            isCopied={copiedCellIdx === column.idx}
            isDraggedOver={draggedOverCellIdx === column.idx}
            isCellSelected={isCellSelected}
            isRowSelected={isRowSelected}
            dragHandleProps={
              isCellSelected
                ? (selectedCellProps as SelectedCellProps).dragHandleProps
                : undefined
            }
            onFocus={
              isCellSelected
                ? (selectedCellProps as SelectedCellProps).onFocus
                : undefined
            }
            onKeyDown={
              isCellSelected ? selectedCellProps!.onKeyDown : undefined
            }
            onRowClick={onRowClick}
            onRowChange={onRowChange}
            selectCell={selectCell}
            selectRow={selectRow}
            datatestid={`${gridId}_row_${rowIdx}_col_${column.idx}`}
          />
        );
      })}
    </div>
  );
};

export default memo(forwardRef(Row)) as <R, SR = unknown>(
  props: RowRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element;
