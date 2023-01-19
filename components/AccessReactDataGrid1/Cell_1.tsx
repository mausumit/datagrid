import React, { FC } from 'react';
import { forwardRef, memo } from 'react';
import { RefAttributes } from 'react';
import { CellRendererProps, AccessCalculatedColumn } from './types';
import clsx from 'clsx';

const cellFrozenLastClassname = `rdg-cell-frozen-last`;

const cellFrozenClassname = `rdg-cell-frozen`;

const cellClassname = `rdg-cell`;
const cellSelectedClassname = `rdg-cell-selected`;
function getCellStyle<R, SR>(
  column: AccessCalculatedColumn<R, SR>
): React.CSSProperties {
  return column.frozen
    ? { left: `var(--frozen-left-${column.key})` }
    : { gridColumnStart: column.idx + 1 };
}

function getCellClassname<R, SR>(
  column: AccessCalculatedColumn<R, SR>,
  ...extraClasses: Parameters<typeof clsx>
): string {
  return clsx(
    column.columnType === 'action' ? 'actionButtonCell' : '',
    cellClassname,
    {
      [cellFrozenClassname]: column.frozen,
      [cellFrozenLastClassname]: column.isLastFrozenColumn
    },
    ...extraClasses
  );
}

const cellCopiedClassname = `rdg-cell-copied`;

const cellDraggedOverClassname = `rdg-cell-dragged-over`;

const cellDragHandleClassname = `rdg-cell-drag-handle`;

const Cell: FC<CellRendererProps<R, SR> & RefAttributes<HTMLDivElement>> = (
  {
    className,
    column,
    isCellSelected,
    isCopied,
    isDraggedOver,
    isRowSelected,
    row,
    rowIdx,
    dragHandleProps,
    onRowClick,
    onClick,
    onDoubleClick,
    onContextMenu,
    onRowChange,
    selectCell,
    selectRow,
    ...props
  }: CellRendererProps<R, SR>,
  ref: React.Ref<HTMLDivElement>
) => {
  const { cellClass } = column;
  className = getCellClassname(
    column,
    {
      [cellSelectedClassname]: isCellSelected,
      [cellCopiedClassname]: isCopied,
      [cellDraggedOverClassname]: isDraggedOver
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  );

  function selectCellWrapper(openEditor?: boolean) {
    selectCell({ idx: column.idx, rowIdx }, openEditor);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    selectCellWrapper(
      column && column.editorOptions && column.editorOptions.editOnClick
    );
    onRowClick && onRowClick(rowIdx, row, column);
    onClick && onClick(event);
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    selectCellWrapper();
    onContextMenu && onContextMenu(event);
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    selectCellWrapper(true);
    onDoubleClick && onDoubleClick(event);
  }

  function handleRowChange(newRow: R) {
    onRowChange(rowIdx, newRow);
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    selectRow({ rowIdx, checked, isShiftClick });
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected={isCellSelected}
      ref={ref}
      className={className}
      style={getCellStyle(column)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      {...props}
    >
      {!column.rowGroup && (
        <>
          <column.formatter
            column={column}
            rowIdx={rowIdx}
            row={row}
            isCellSelected={isCellSelected}
            isRowSelected={isRowSelected}
            onRowSelectionChange={onRowSelectionChange}
            onRowChange={handleRowChange}
          />
          {dragHandleProps && (
            <div className={cellDragHandleClassname} {...dragHandleProps} />
          )}
        </>
      )}
    </div>
  );
};

export default memo(forwardRef(Cell)) as <R, SR = unknown>(
  props: CellRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element;
