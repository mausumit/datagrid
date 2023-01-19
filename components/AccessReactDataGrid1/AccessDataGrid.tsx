import React, { FC, useState, useCallback, useMemo, useEffect, useContext } from 'react';
import {
  AccessGridProps,
  SortDirection,
  Filters,
  AccessCalculatedColumn,
  HeaderActionMenuData,
} from './Types';
import DragAndDrop from './DragAndDrop';
import { DraggableHeaderRenderer } from './DraggableHeaderRenderer';
import { SELECT_COLUMN_KEY, SelectColumn } from './Select/SelectColumn';
import DataGridFooter from './Footer/DataGridFooter';
import {
  RenderTextField,
  RenderDatePicker,
  RenderDateRange,
  RenderDropdown,
} from './FilterRenderer';
import { StyledDataGrid } from './styles/StyledDataGrid';
import Row from './Row';
// import { AccessPopover } from '../Modals';
import { HideShowColumn } from './HideShowColumn';
import { HeaderAction } from './enums/accessDataGrid';
import SortableHeaderCell from './SortableHeaderCell';
import { groupBy as rowGrouper } from 'lodash';
// import { HBox } from '../Boxes';
// import { ErrorBoundary } from 'react';
import Popover from "@mui/material/Popover";


const AccessDataGrid: FC<AccessGridProps> = (props: AccessGridProps) => {
  let [rows, setRows] = useState(() => new Array());
  let [columns, setColumns] = useState(props.columns);
  const [setting, setSetting] = useState([]);
  useEffect(() => {
    if (props.checkboxSelection) {
      setColumns([SelectColumn, ...columns]);
    }
  }, []);

  const getDynamicWidth = (ele) => {
    if (ele.width) {
      return ele;
    } else {
      const temp = {
        ...ele,
        width: ele.name.length * 9 + (ele.headerMenu ? 22 : 0),
      };
      return temp;
    }
  };
  const getDynWidthHideCol = () => {
    return props.columns
      .map((ele) => {
        return getDynamicWidth(ele);
      })
      .filter((item) => item);
  };

  const getDynamicColumnsWidth = () => {
    return props.columns
      .map((ele) => {
        if (!ele.hide) {
          return getDynamicWidth(ele);
        }
      })
      .filter((item) => item);
  };
  const getDefaultSetting = (arr) => {
    const defaultSet = arr.map((ele, index) => {
      return {
        key: ele.key,
        width: ele.width,
        order: ele.order ? ele.order : index,
      };
    });
    setSetting(defaultSet);
  };
  useEffect(() => {
    switch (true) {
      case props.checkboxSelection && props.dynamicColumnsWidth:
        const reqArr = getDynamicColumnsWidth();
        setColumns([SelectColumn, ...reqArr]);
        const reqArrWithHideCol = getDynWidthHideCol();
        getDefaultSetting([SelectColumn, ...reqArrWithHideCol]);
        break;
      case props.dynamicColumnsWidth:
        const newArr = getDynamicColumnsWidth();
        setColumns([...newArr]);
        const newArrWithHideCol = getDynWidthHideCol();
        getDefaultSetting([...newArrWithHideCol]);
        break;
      case props.checkboxSelection:
        setColumns([SelectColumn, ...props.columns]);
        getDefaultSetting([SelectColumn, ...props.columns]);
        break;
      default:
        break;
    }
  }, [props.columns]);

  useEffect(() => {
    setRows(props.rows);
  }, [props.rows]);

  /* 
    Inserts Filter textbox 
    */
  let filtersObj: Filters = {};
  const filterKeysArray: Array<string> = [];
  columns.forEach(function (obj: any) {
    if (obj.filterable) {
      if (obj.columnType && obj.columnType === 'Date') {
        obj.filterRenderer = RenderDatePicker;
        filtersObj[obj.key] = '';
        filterKeysArray.push(obj.key);
      } else if (obj.columnType && obj.columnType === 'DateRange') {
        obj.filterRenderer = RenderDateRange;
        filtersObj[obj.key] = '';
        filterKeysArray.push(obj.key);
      } else if (typeof obj.columnType === 'object') {
        obj.filterRenderer = RenderDropdown;
        filtersObj[obj.key] = '';
        filterKeysArray.push(obj.key);
      } else {
        obj.filterRenderer = RenderTextField;
        filtersObj[obj.key] = '';
        filterKeysArray.push(obj.key);
      }
    }
  });

  const [filters, setFilters] = useState<Filters>(filtersObj);
  const [enableFilterRow, setEnableFilterRow] = useState(props.filterOpenToggle);
  const [actionHoverState, setActionHoverState] = useState(0);
  const [hoverStateIn, setHoverStateIn] = useState(0);
  const [activestate, setActiveState] = useState(0);
  const [columnclicked, setColumnclicked] = useState('');
  useEffect(() => {
    setEnableFilterRow(props.filterOpenToggle)
  }, [props.filterOpenToggle]);
  useEffect(() => {
    clearFilters();
  }, [props.resetFilterValue]);
  /**
   * Hover State of batch action
   */
  const onHoverAction = (value: number) => {
    setActionHoverState(value);
  };

  /**
   * Hover State of batch action when Checkbox is hovered
   */
  const batchHoverStateIn = (value: number) => {
    setHoverStateIn(value);
  };

  const draggableColumns = useMemo(() => {
    function HeaderRenderer(dragProps: any) {
      return (
        <>
          {props.allowColumnReorder && (
            <DraggableHeaderRenderer
              {...dragProps}
              onColumnsReorder={handleColumnsReorder}
              onActionHeaderChange={onActionHeaderChange}
              gridId={props.datatestid}
              filterOpenToggle={props.filterOpenToggle}
            />
          )}
          {!props.allowColumnReorder && (
            <SortableHeaderCell
              {...dragProps}
              onColumnsReorder={handleColumnsReorder}
              onActionHeaderChange={onActionHeaderChange}
              gridId={props.datatestid}
              filterOpenToggle={props.filterOpenToggle}
            />
          )}
        </>
      );
    }

    function handleColumnsReorder(sourceKey: string, targetKey: string) {
      const sourceColumnIndex = columns.findIndex(
        (c: any) => c.key === sourceKey
      );
      const targetColumnIndex = columns.findIndex(
        (c: any) => c.key === targetKey
      );
      const reorderedColumns = [...columns];
      reorderedColumns.splice(
        targetColumnIndex,
        0,
        reorderedColumns.splice(sourceColumnIndex, 1)[0]
      );
      setColumns(reorderedColumns);
      if (props.onColumnReorder) {
        const reorderedSetting = [...setting];
        const set = reorderedColumns.map((ele, index) => {
          const temp = reorderedSetting.find((e) => e.key === ele.key);
          return { ...temp, order: index };
        });
        props.onColumnReorder(set, reorderedColumns);
        setSetting(set);
      }
    }

    return columns.map((c) => {
      if (c.key === SELECT_COLUMN_KEY) {
        return {
          ...c,
        };
      }
      return { ...c, headerRenderer: HeaderRenderer };
    });
  }, [columns, enableFilterRow]); // actionHoverState

  const checkDateColumnType = (filterKey: string) => {
    if (columns && columns.length > 0) {
      return columns.find((ele) => ele.key === filterKey).columnType === 'Date';
    } else {
      return null;
    }
  };
  let filteredRows = useMemo(() => {
    if (props.handleFilters) {
      return rows;
    }
    return rows.filter((r: any) => {
      let flag: boolean = true;
      for (let i = 0; i < filterKeysArray.length; i++) {
        if (
          !checkDateColumnType(filterKeysArray[i]) &&
          filters[filterKeysArray[i]]
        ) {
          flag =
            flag &&
            r[filterKeysArray[i]] &&
            r[filterKeysArray[i]]
              .toString()
              .trim()
              .toLowerCase()
              .includes(
                filters[filterKeysArray[i]].toString().trim().toLowerCase()
              );
        } else if (
          filters[filterKeysArray[i]] &&
          checkDateColumnType(filterKeysArray[i])
        ) {
          flag =
            flag &&
            r[filterKeysArray[i]] &&
            new Date(r[filterKeysArray[i]]).getTime() ===
              new Date(filters[filterKeysArray[i]]).getTime();
        }
      }
      return flag;
    });
  }, [rows, filters]);

  const [[sortColumn, sortDirection, columnType], setSort] = useState<
    [string, SortDirection, string]
  >(['id', 'NONE', '']);

  let sortedRows = useMemo(() => {
    if (sortDirection === 'NONE') return rows;
    let sortedRows: any[] = enableFilterRow ? [...filteredRows] : [...rows];

    switch (columnType) {
      case 'Date':
        sortedRows = sortedRows
          .sort(
            (a: any, b: any) =>
              new Date(b[sortColumn]).valueOf() -
              new Date(a[sortColumn]).valueOf()
          )
          .reverse();
        break;
      default:
        sortedRows = sortedRows.sort(
          (a, b) =>
            a[sortColumn] &&
            a[sortColumn].toString().localeCompare(b[sortColumn], undefined, {
              numeric: true,
              sensitivity: 'base',
            })
        );
    }
    if (enableFilterRow) {
      if (sortDirection === 'DESC') {
        filteredRows = [...sortedRows.reverse()];
        return filteredRows;
      } else {
        filteredRows = [...sortedRows];
        return filteredRows;
      }
    } else {
      return sortDirection === 'DESC' ? sortedRows.reverse() : sortedRows;
    }
  }, [rows, sortDirection, sortColumn, columnType]);

  const handleSort = useCallback(
    (reqColumnKey: string, direction: SortDirection, reqColumnType: string) => {
      setSort([reqColumnKey, direction, reqColumnType]);
    },
    []
  );
  const onActionHeaderChange = (
    data: HeaderActionMenuData,
    ref: React.MouseEvent<HTMLElement>
  ) => {
    const headerAction = data.headerActionItem;
    setColumnclicked(data.key);
    switch (headerAction) {
      case HeaderAction.LOCK:
        const lockedData = columns.map((el: any) =>
          el.key === data.key ? { ...el, frozen: true } : el
        );
        setColumns(lockedData);
        break;
      case HeaderAction.UNLOCK:
        const unlockedData = columns.map((el: any) =>
          el.key === data.key ? { ...el, frozen: false } : el
        );
        setColumns(unlockedData);
        break;
      case HeaderAction.SHOW:
        handlePopoverClick(ref);
        break;
      case HeaderAction.HIDE:
        hideColumn(data);
        break;
      case HeaderAction.FILTER:
        toggleFilters();
        break;
      default:
        handleSort(data.key, headerAction, 'string');
        break;
    }
  };

  const rowClicked = (
    rowIdx: number,
    row: R,
    column: AccessCalculatedColumn<R, SR>
  ) => {
    if (column.hasOwnProperty('clickable') && !column.clickable) {
      return;
    } else {
      props.onRowClick && props.onRowClick(rowIdx, row, column);
    }
  };
  const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());
  if (props.checkedRows && props.checkedRows.length > 0) {
    props.checkedRows.forEach((item) => {
      selectedRows.add(item.id);
    });
  }
  const [selectedRowsObj, setselectedRowsObj] = useState([]);
  const onRowsSelected = (rowIds: any) => {
    setSelectedRows(rowIds);
    let arr = rows.filter(
      (item: any) => [...rowIds].indexOf(item.id && item.id) != -1
    );
    props.onSelectedRowsChange && props.onSelectedRowsChange(arr);
    setselectedRowsObj(arr);
    /**
     * Active State of batch action when Checkbox is checked
     */
    {
      arr.length ? setActiveState(true) : setActiveState(false);
    }
  };

  function clearFilters(): void {
    if (JSON.stringify(filtersObj) !== JSON.stringify(filters)) {
      setFilters(filtersObj);
    }
  }

  const toggleFilters = () => {
    clearFilters();
    setEnableFilterRow(!enableFilterRow);
    sortedRows = [...rows];
  };
  const RowRenderer = (rowProps: any) => {
    return (
      <Row
        {...rowProps}
        datatestid={`${props.datatestid}_row_${rowProps.rowIdx}`}
        gridId={props.datatestid}
      />
    );
  };
  const [anchorEl, setAnchorEl] = React.useState();
  const [left, setLeft] = React.useState();
  const [top, setTop] = React.useState();

  const handlePopoverClick = (event: any) => {
    setAnchorEl({});
    setLeft(event.clientX);
    setTop(event.clientY);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const initialCheckedData = () => {
    return props.columns
      .map((ele: any) => {
        if (ele && ele.name !== '') {
          return {
            id: `${ele.key}`,
            name: ele.name,
            isChecked: ele.hide ? !ele.hide : true,
          };
        }
      })
      .filter((item: any) => item);
  };
  const [checkedColumnsData, setCheckedColumnsData] = useState(
    initialCheckedData()
  );
  useEffect(() => {
    const data = initialCheckedData();
    setCheckedColumnsData(data);
  }, [props.columns]);

  const hideColumn = (data: any) => {
    let tempData = [...columns];
    const dataIndex = tempData.findIndex((ele) => ele.key === data.key);
    if (dataIndex > -1) {
      tempData.splice(dataIndex, 1);
    }
    const reqCheckedColumnsData = checkedColumnsData.map((ele: any) => {
      if (ele.id === data.key) {
        return { ...ele, isChecked: false };
      } else if (ele && ele.name !== '') {
        return ele;
      }
    });
    setCheckedColumnsData(reqCheckedColumnsData);
    setColumns(tempData);
    if (props.onColumnShowHide) {
      const tempSet = [...setting];
      const reqSet = tempSet.map((ele) => {
        if (ele.key === data.key) {
          return { ...ele, hide: true };
        } else {
          return ele;
        }
      });
      props.onColumnShowHide(reqSet);
      setSetting(reqSet);
    }
  };

  const handleScroll = (e: any) => {
    if (
      e.target.scrollTop >=
        e.target.scrollHeight - e.target.offsetHeight - 80 &&
      props.pagination &&
      props.pagination.totalRecords > (props.rows && props.rows.length)
    ) {
      props.pagination.handleShowMoreBtn(true);
    }
  };

  useEffect(() => {
    if (enableFilterRow && props.handleFilters) {
      props.handleFilters(filters);
    }
  }, [filters]);

  useEffect(() => {
    const { checkedRows } = props;
    if (checkedRows && checkedRows.length > 0 && props.rows.length > 0) {
      let tempData = [...props.rows];
      checkedRows.map((item) => {
        const dataIndex = tempData.findIndex((ele) => ele.id === item.id);
        if (dataIndex > -1) {
          tempData.splice(dataIndex, 1);
        }
        tempData.unshift(item);
      });
      setRows(tempData);
    } else {
      setRows(props.rows);
    }
  }, [props.rows]);

  const handleColumnResize = (columnIndex: number, width: number) => {
    if (props.onColumnResize) {
      const reqSet = setting.map((ele, index) => {
        if (index === columnIndex) {
          return { ...ele, key: ele.key, width };
        } else {
          return { ...ele, key: ele.key };
        }
      });
      setSetting(reqSet);
      props.onColumnResize(reqSet);
    }
  };
  return (
    <>
      <DragAndDrop condition={props.allowColumnReorder}>
        <StyledDataGrid
          {...props}
          showMore={props.batchaction || props.pagination?.showMoreBtnVisible}
          norecord={!props.rows?.length}
          minHeight={
            props.minHeight && props.rows?.length ? props.minHeight : ""
          }
          rowGrouper={props.groupBy ? rowGrouper : undefined}
          rows={enableFilterRow ? filteredRows : sortedRows}
          columns={draggableColumns}
          rowKeyGetter={props.rowKeyGetter}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          enableFilterRow={enableFilterRow}
          filters={filters}
          onFiltersChange={setFilters}
          selectedRows={selectedRows}
          onSelectedRowsChange={onRowsSelected}
          onRowClick={rowClicked}
          rowRenderer={RowRenderer}
          onScroll={
            props.pagination && !props.pagination.showMoreBtnVisible
              ? handleScroll
              : null
          }
          onColumnResize={handleColumnResize}
        />
        {props.rows?.length === 0 && (
          <HBox
            justifyContent="center"
            padding={["zero", "zero", "zero", "xs"]}
          >
            <span className="no-record">No Record Found</span>
          </HBox>
        )}
      </DragAndDrop>
      {props.rows?.length &&
      (props.batchaction || props.pagination?.showMoreBtnVisible) ? (
        <DataGridFooter
          pagination={props.pagination}
          batchaction={props.batchaction}
          batchHoverStateIn={hoverStateIn}
          batchActiveState={activestate}
          onShowMore={props.onShowMore}
          disabledBatchAction={props.disabledBatchAction}
          checkedRows={props.checkedRows}
          disableBatchToolTipMsg={props.disableBatchToolTipMsg}
        ></DataGridFooter>
      ) : (
        <></>
      )}

      <Popover
        id={"id"}
        open={open}
        anchorEl={anchorEl}
        handleClose={handlePopoverClose}
        anchorOrigin={{
          vertical: top,
          horizontal: left,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        content={
          <HideShowColumn
            columns={props.columns}
            setColumns={setColumns}
            draggableColumns={draggableColumns}
            columnclicked={columnclicked}
            checkedColumnsData={checkedColumnsData}
            setCheckedColumnsData={setCheckedColumnsData}
            isCheckboxSelection={props.checkboxSelection}
            onColumnShowHide={props.onColumnShowHide}
            setting={setting}
            setSetting={setSetting}
          />
        }
        datatestid="popOver"
      />
    </>
  );
};
export default AccessDataGrid;
