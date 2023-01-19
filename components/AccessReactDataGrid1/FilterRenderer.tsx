import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { setHours, setMinutes, setSeconds, addDays } from "date-fns";
// import { AccessDatePicker } from '../DatePicker';
// import { AccessDateRange } from '../DateRange';
import { FilterWrapper } from './styles/StyledDataGrid';
// import { TextField } from '../TextField';
import TextField from "@mui/material/TextField";
// import { AccessOption } from '../SelectOption';
// import { AccessSelect } from '../Select';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

// import { AccessIcon } from '../AccessIcon/AccessIcon';

export const RenderTextField = (p: any) => {
  const [focusEvent, setFocusEvent] = useState(false);
  const handleFocus = (e: React.SyntheticEvent) => {
    if (e.type === 'focus') {
      setFocusEvent(true);
    } else if (e.type === 'blur') {
      setFocusEvent(false);
    }
  };
  return (
    <FilterWrapper
      value={p.value}
      columnType={p.column.columnType}
      className={focusEvent || p.value ? 'filter-focused' : ''}
      id={p.column.key}
    >
      <div className="icon--wrapper search--icon">
        {/* <AccessIcon icon={'faSearch'} /> */}
      </div>
      <TextField
        id={`${p.column.key}TextField`}
        placeholder=""
        // datatestid={`${p.column.key}TextField`}
        onChange={(e) => p.onChange(e.target.value)}
        adornment={false}
        value={p.value}
        autoComplete="off"
        onFocus={(e: any) => handleFocus(e)}
        onBlur={(e: any) => handleFocus(e)}
      />
      {p.value ? (
        <div className="icon--wrapper">
          {/* <AccessIcon
            id={`${p.column.key}icon`}
            icon={'faTimesCircle'}
            onClick={() => p.onChange('')}
          /> */}
        </div>
      ) : null}
    </FilterWrapper>
  );
};

const handleDateChange = (date: any, p: any) => {
  const formattedDate = moment(date).format('MM/DD/YYYY');
  p.onChange(formattedDate);
};
export const RenderDatePicker = (p: any) => {
  const [focusEvent, setFocusEvent] = useState(false);
  const handleOpen = () => {
    setFocusEvent(true);
  };
  const handleClose = () => {
    setFocusEvent(false);
  };
  return (
    <FilterWrapper
      value={p.value}
      columnType={p.column.columnType}
      className={focusEvent || p.value ? 'filter-focused' : ''}
      id={p.column.key}
    >
      <label
        htmlFor={`date-picker-inline-${p.column.key}`}
        className="icon--wrapper search--icon"
      >
        {/* <AccessIcon icon={'faCalendar'} id={`${p.column.key}`} /> */}
      </label>
      {/* <AccessDatePicker
        datatestid={`${p.column.key}datePicker`}
        value={p.value ? p.value : null}
        onChange={(date) => handleDateChange(date, p)}
        format="MM/DD/YYYY"
        id={`date-picker-inline-${p.column.key}`}
        autoOk={true}
        disableToolbar
        label=""
        onClose={handleClose}
        onOpen={handleOpen}
      /> */}
      {p.value ? (
        <div className="icon--wrapper">
          {/* <AccessIcon
            id={`${p.column.key}icon`}
            icon={'faTimesCircle'}
            onClick={() => p.onChange(null)}
          /> */}
        </div>
      ) : null}
    </FilterWrapper>
  );
};


export const RenderDateRange = (p: any) => {
  const [focusEvent, setFocusEvent] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const onChangeRange = (update: any) => {
    setDateRange(update);
  }

  useEffect(() => {
    const [startDate, endDate] = dateRange;
    if (startDate && endDate) {
      const dateFormat = "yyyy-MM-DDTHH:mm:ss.SSS";

      const newStartDate = moment(setHours(setMinutes(setSeconds(new Date(startDate), 0), 0), 0)).format(dateFormat);
      const newEndDate = moment(setHours(setMinutes(setSeconds(new Date(endDate), 59), 59), 23)).format(dateFormat);

      p.onChange(`${newStartDate}Z,${newEndDate}Z`);
    }
  }, [dateRange]);

  return (
    <FilterWrapper
      value={p.value}
      columnType={p.column.columnType}
      className={focusEvent || p.value ? 'filter-focused' : ''}
      id={p.column.key}
    >
      <label
        htmlFor={`date-range-inline-${p.column.key}`}
        className="icon--wrapper search--icon"
      >
        {/* <AccessIcon icon={'faCalendar'} id={`${p.column.key}`} /> */}
      </label>
      {/* <AccessDateRange
        id={`date-range-inline-${p.column.key}`}
        datatestid={`${p.column.key}-dateRange`}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        maxDate={addDays(new Date(), 0)}
        onChange={(update: any) => onChangeRange(update)}
        className="access-grid-date-range"
      /> */}
    </FilterWrapper>
  );
};

export const RenderDropdown = (p: any) => {
  const [focusEvent, setFocusEvent] = useState(false);
  const handleOpen = (e: React.ChangeEvent) => {
    setFocusEvent(true);
  };
  const handleClose = (e: React.ChangeEvent) => {
    setFocusEvent(false);
  };
  return (
    <FilterWrapper
      id={`${p.column.key}`}
      value={p.value}
      columnType={p.column.columnType}
      className={focusEvent || p.value ? 'filter-focused' : ''}
    >
      <div className="dropdown--wrapper">
        <Select
          onChange={(e) => p.onChange(e.target.value)}
          name="simple_dropdown"
          id={`${p.column.key}dropDown`}
          // datatestid={`${p.column.key}dropDown`}
          value={p.value}
          label=""
          onClose={(e: any) => handleClose(e)}
          onOpen={(e: any) => handleOpen(e)}
        >
          {p.column.columnType.data.map((option: any, index: any) => {
            return (
              <MenuItem
                key={index}
                value={option.value}
                id={option.value}
                // datatestid={option.value}
                disabled={!option.value}
              >
                {option.text}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      {p.value ? (
        <div className="icon--wrapper">
          {/* <AccessIcon
            id={`${p.column.key}icon`}
            icon={'faTimesCircle'}
            onClick={() => p.onChange(null)}
          /> */}
        </div>
      ) : null}
    </FilterWrapper>
  );
};
