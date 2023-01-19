import React from 'react';
import {
  Column,
  DataGridProps,
  PasteEvent,
  FillEvent,
  CalculatedColumn,
} from 'react-data-grid';
import { SourceType } from 'dnd-core';
export interface Batch {
  label: string;
  id: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export interface Pagination {
  showMoreBtnVisible: boolean;
  totalRecords: number;
  handleShowMoreBtn: (value: boolean) => void;
}

export interface GridFooterProps {
  batchaction: Batch[];
  batchHoverState?: (hoverState: number) => number;
  batchHoverStateIn?: number;
  batchActiveState?: boolean;
  pagination: Pagination;
  onShowMore: () => void;
  disabledBatchAction: boolean;
  disableBatchToolTipMsg?: any;
  checkedRows?: any;
}

export interface AccessColumnProps<TRow, TSummaryRow = unknown>
  extends Column<TRow, TSummaryRow> {
  filterable?: boolean;
  clickable?: boolean;
  headerMenu?: boolean;
  checkboxHoverstate?: number;
  columnType:
  | 'Date'
  | 'DateRange'
  | 'String'
  | 'Number'
  | { type: string; data: any }
  | 'action'
  | 'checkbox';
  headerRenderer?: React.ComponentType<HeaderRendererProps<TRow, TSummaryRow>>;
  idx?: number;
  groupFormatter?: any;
  order?: number;
}

export class DefaultColumn {
  private width: number;
  private resizable: boolean;
  private frozen: boolean;
  private sortable: boolean;
  private filterable: boolean;
  private clickable: boolean;
  private name: string;
  private key: string;
  private columnType:
    | 'Date'
    | 'DateRange'
    | 'String'
    | 'Number'
    | { type: string; data: any }
    | 'action'
    | 'checkbox';

  get Width(): number {
    return this.width;
  }

  set Width(w: number) {
    this.width = w;
  }

  get Resizable(): boolean {
    return this.resizable;
  }

  set Resizable(resizable: boolean) {
    this.resizable = resizable;
  }

  get Frozen(): boolean {
    return this.frozen;
  }

  set Frozen(frozen: boolean) {
    this.frozen = frozen;
  }

  get Sortable(): boolean {
    return this.sortable;
  }

  set Sortable(sortable: boolean) {
    this.sortable = sortable;
  }

  get Filterable(): boolean {
    return this.filterable;
  }

  set Filterable(filterable: boolean) {
    this.filterable = filterable;
  }

  get Clickable(): boolean {
    return this.clickable;
  }

  set Clickable(clickable: boolean) {
    this.clickable = clickable;
  }

  get Name(): string {
    return this.name;
  }

  set Name(name: string) {
    this.name = name;
  }

  get Key(): string {
    return this.key;
  }

  set Key(key: string) {
    this.key = key;
  }

  get ColumnType() {
    return this.columnType;
  }

  set ColumnType(columnType) {
    this.columnType = columnType;
  }

  constructor(key: string, name: string) {
    this.key = key;
    this.name = name;
    this.width = 200;
    this.resizable = true;
    this.frozen = false;
    this.sortable = true;
    this.filterable = true;
    this.clickable = true;
    this.columnType = key === 'date' ? 'Date' : 'String';
  }
}

export interface AccessPasteEvent<TRow> extends PasteEvent<TRow> { }

export interface HeaderRenderProps<TRow, TSummaryRow = unknown>
  extends HeaderRendererProps<TRow, TSummaryRow> { }

export interface DNDproviderProps {
  children?: React.ReactNode;
}

export interface DraggableHeaderRendererProps<R> extends HeaderRenderProps<R> {
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
  onActionHeaderChange?: (
    data: HeaderActionMenuData,
    ref?: React.MouseEvent<HTMLElement>
  ) => void;
  gridId?: string;
  filterOpenToggle?: boolean;
}
export interface AccessFillEvent<TRow> extends FillEvent<TRow> { }

export interface HeaderActionMenuProps {
  headerMenu?: boolean[];
  columnData?: AccessColumnProps<R, SR>;
  onActionHeaderChange?: (
    data: HeaderActionMenuData,
    ref?: React.MouseEvent<HTMLElement>
  ) => void;
  gridId: string;
  filterOpenToggle?: boolean;
}

type SharedHeaderRowProps<R, SR> = Pick<
  HeaderRowProps<R, SR>,
  'sortColumn' | 'sortDirection' | 'onSort' | 'allRowsSelected'
>;
export interface FormatterProps<TRow = any, TSummaryRow = any> {
  rowIdx: number;
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TRow;
  isCellSelected: boolean;
  isRowSelected: boolean;
  onRowSelectionChange: (checked: boolean, isShiftClick: boolean) => void;
  onRowChange: (row: Readonly<TRow>) => void;
}

export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
  column: AccessCalculatedColumn<R, SR>;
  onResize: (column: CalculatedColumn<R, SR>, width: number) => void;
  onAllRowsSelectionChange: (checked: boolean) => void;
}

type SharedDataGridProps<R, SR> = Pick<
  DataGridProps<R, SR>,
  | 'rows'
  | 'onSelectedRowsChange'
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
  | 'rowKeyGetter'
>;
export declare type Filters = Record<string, any>;

export declare interface HeaderRendererProps<TRow, TSummaryRow = unknown> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (columnKey: string, direction: SortDirection) => void;
  allRowsSelected: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
}

export declare type SortDirection = 'ASC' | 'DESC' | 'NONE';

export interface AccessCalculatedColumn<R, SR> extends CalculatedColumn<R, SR> {
  filterable?: boolean;
  clickable?: boolean;
  headerMenu?: boolean;
  columnType:
  | 'Date'
  | 'DateRange'
  | 'String'
  | 'Number'
  | { type: string; data: any }
  | 'action'
  | 'checkbox';
}
export interface AccessGridProps {
  resetFilterValue?: any;
  /** An array of objects representing each column on the grid */
  columns: AccessColumnProps<R, SR>[];
  /**An array of objects representing each row on the grid */
  rows: any[];
  /** Set of selected row keys */
  selectedRows?: Set<React.Key>;
  /** Set of selected row object */
  checkedRows?: Array<T>;
  onSelectedRowsChange?: (selectedRows: Set<React.Key>) => void;
  /** Function called whenever a row is clicked */
  onRowClick?: (
    rowIdx: number,
    row: R,
    column: AccessCalculatedColumn<R, SR>
  ) => void;
  datatestid: string;
  /** The getter should return a unique key for each row */
  rowKeyGetter?: (row: any) => void;
  onRowsChange?: React.Dispatch<React.SetStateAction<R[]>>;
  allowColumnReorder?: boolean;
  batchaction?: Array<Batch>;
  checkboxSelection?: boolean;
  /** The height of each row in pixels */
  rowHeight?: number;
  pagination?: Pagination;
  onShowMore?: () => void;
  height?: string;
  groupBy?: string[];
  rowGrouper?: (
    rows: readonly R[],
    columnKey: string
  ) => Record<string, readonly R[]>;
  expandedGroupIds?: ReadonlySet<unknown>;
  onExpandedGroupIdsChange?: (expandedGroupIds: Set<unknown>) => void;
  /** Handle server side filtering of rows  */
  handleFilters?: (filtersObj: unknown) => void;
  dynamicColumnsWidth?: boolean;
  onColumnResize?: (setting) => void;
  onColumnReorder?: (setting, reorderedColumns) => void;
  onColumnShowHide?: (setting) => void;
  minHeight?: string | boolean;
  disabledBatchAction?: boolean;
  disableBatchToolTipMsg?: any;
  enableFilterRow?: boolean;
  filterOpenToggle?: boolean;
}

export interface HeaderRowProps<R, SR> extends SharedDataGridProps<R, SR> {
  columns: CalculatedColumn<R, SR>;
  columnType:
  | 'Date'
  | 'DateRange'
  | 'String'
  | 'Number'
  | { type: string; data: any }
  | 'action'
  | 'checkbox';
  headerMenu?: boolean[];
  allRowsSelected: boolean;
  onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
}

export interface DnDWrapperProps {
  condition: boolean | undefined;
  children: React.ReactElement;
  // wrapper: React.FunctionComponent;
}
type SharedHeaderCellProps<R, SR> = Pick<
  HeaderCellProps<R, SR>,
  'column' | 'sortColumn' | 'sortDirection' | 'onSort'
>;

export interface SortableHeaderProps<R, SR>
  extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode;
  onActionHeaderChange?: (
    data: HeaderActionMenuData,
    ref?: React.MouseEvent<HTMLElement>
  ) => void;
  gridId: string;
  filterOpenToggle?: boolean;
}

export interface CheckedColumnData {
  id: string;
  name: string;
  isChecked: boolean;
}
export interface HideShowColumnProps {
  columns: AccessColumnProps<R, SR>[];
  setColumns: (data: any) => void;
  draggableColumns: AccessColumnProps<R, SR>[];
  checkedColumnsData: CheckedColumnData[];
  setCheckedColumnsData: (data: any) => void;
  isCheckboxSelection: boolean | undefined;
  onColumnShowHide?: (setting) => void;
  setting?: any;
  setSetting?: any;
}

export type sourceType = SourceType;
export interface ColumnDragObject {
  key: string;
  type: SourceType;
}

export interface SelectRowEvent {
  rowIdx: number;
  checked: boolean;
  isShiftClick: boolean;
}
interface SelectedCellPropsBase {
  idx: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface EditCellProps<TRow> extends SelectedCellPropsBase {
  mode: 'EDIT';
  // editorProps: SharedEditorProps<TRow>;
}

export interface SelectedCellProps extends SelectedCellPropsBase {
  mode: 'SELECT';
  onFocus: () => void;
  dragHandleProps?: Pick<
    React.HTMLAttributes<HTMLDivElement>,
    'onMouseDown' | 'onDoubleClick'
  >;
}

export interface CellRendererProps<TRow, TSummaryRow = unknown>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  rowIdx: number;
  column: AccessCalculatedColumn<TRow, TSummaryRow>;
  row: TRow;
  isCopied: boolean;
  isDraggedOver: boolean;
  isCellSelected: boolean;
  isRowSelected: boolean;
  dragHandleProps?: Pick<
    React.HTMLAttributes<HTMLDivElement>,
    'onMouseDown' | 'onDoubleClick'
  >;
  onRowChange: (rowIdx: number, newRow: TRow) => void;
  onRowClick?: (
    rowIdx: number,
    row: TRow,
    column: AccessCalculatedColumn<TRow, TSummaryRow>
  ) => void;
  selectCell: (position: Position, enableEditor?: boolean) => void;
  selectRow: (selectRowEvent: SelectRowEvent) => void;
}

export interface RowRendererProps<TRow, TSummaryRow = unknown>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  viewportColumns: readonly AccessCalculatedColumn<TRow, TSummaryRow>[];
  row: TRow;
  cellRenderer?: React.ComponentType<CellRendererProps<TRow, TSummaryRow>>;
  rowIdx: number;
  copiedCellIdx?: number;
  draggedOverCellIdx?: number;
  isRowSelected: boolean;
  top: number;
  selectedCellProps?: EditCellProps<TRow> | SelectedCellProps;
  onRowChange: (rowIdx: number, row: TRow) => void;
  onRowClick?: (
    rowIdx: number,
    row: TRow,
    column: CalculatedColumn<TRow, TSummaryRow>
  ) => void;
  rowClass?: (row: TRow) => string | undefined;
  setDraggedOverRowIdx?: (overRowIdx: number) => void;
  selectCell: (position: Position, enableEditor?: boolean) => void;
  selectRow: (selectRowEvent: SelectRowEvent) => void;
  datatestid?: string;
  gridId?: string;
}
export interface HeaderActionMenuData extends AccessColumnProps<R, SR> {
  headerActionItem:
  | SortDirection
  | 'LOCK'
  | 'UNLOCK'
  | 'SHOW'
  | 'HIDE'
  | 'FILTER';
}
