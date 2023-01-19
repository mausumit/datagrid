import React from 'react';
import { HeaderActionMenu } from './HeaderActionMenu';
import { StyledHeaderCell } from './styles/StyledDataGrid';
import { SortDirection, SortableHeaderProps } from './Types';
import { AccessText } from '../Typography';

export default function SortableHeaderCell<R, SR>({
  column,
  onSort,
  sortColumn,
  sortDirection,
  gridId,
  onActionHeaderChange,
  filterOpenToggle
}: SortableHeaderProps<R, SR>) {
  sortDirection = (sortColumn === column.key && sortDirection) || 'NONE';
  let sortText = '';
  if (sortDirection === 'ASC') {
    sortText = '\u25B2';
  } else if (sortDirection === 'DESC') {
    sortText = '\u25BC';
  }

  function onClick() {
    if (!onSort) return;
    const { sortDescendingFirst } = column;
    let direction: SortDirection;
    switch (sortDirection) {
      case 'ASC':
        direction = sortDescendingFirst ? 'NONE' : 'DESC';
        break;
      case 'DESC':
        direction = sortDescendingFirst ? 'ASC' : 'NONE';
        break;
      default:
        direction = sortDescendingFirst ? 'DESC' : 'ASC';
        break;
    }
    onSort(column.key, direction, column.columnType);
  }
  return (
    <StyledHeaderCell>
      <AccessText
        onclick={column.columnType ? onClick : () => false}
        datatestid={`${gridId}_${column.key}`}
        text={column.name}
      />
      <span onClick={onClick}>{sortText}</span>
      {column && column.headerMenu ? (
        <HeaderActionMenu
          columnData={column}
          onActionHeaderChange={onActionHeaderChange}
          gridId={gridId}
          filterOpenToggle={filterOpenToggle}
        />
      ) : null}
    </StyledHeaderCell>
  );
}
