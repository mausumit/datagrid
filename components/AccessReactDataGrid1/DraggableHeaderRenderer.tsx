import { useDrag, useDrop } from 'react-dnd';
import React from 'react';
import SortableHeaderCell from './SortableHeaderCell';
import { useCombinedRefs } from './hooks/useCombinedRefs';
import { DraggableHeaderRendererProps, ColumnDragObject } from './Types';

export function DraggableHeaderRenderer<R>({
  onColumnsReorder,
  column,
  sortColumn,
  sortDirection,
  onSort,
  onActionHeaderChange,
  gridId,
  filterOpenToggle,
}: DraggableHeaderRendererProps<R>) {
  const [{ isDragging }, drag] = useDrag({
    item: { key: column.key, type: 'COLUMN_DRAG' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'COLUMN_DRAG',
    drop({ key, type }: ColumnDragObject) {
      if (type === 'COLUMN_DRAG') {
        onColumnsReorder(key, column.key);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={useCombinedRefs(drag, drop)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? '#ececec' : 'inherit',
        cursor: 'move',
        height: '100%',
      }}
    >
      <SortableHeaderCell
        column={column}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
        onActionHeaderChange={onActionHeaderChange}
        gridId={gridId}
        filterOpenToggle={filterOpenToggle}
      >
        {column.name}
      </SortableHeaderCell>
    </div>
  );
}
