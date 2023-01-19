import React, { useState } from 'react';
// import { AccessActionMenu } from '../ActionMenus/AccessActionMenu';
import { HeaderActionMenuProps } from './Types';
import { HeaderAction } from './enums/accessDataGrid';
// import { MenuItem } from '../SelectOption';
// import { TranslatedText } from 'platform-sdk';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export const HeaderActionMenu: React.FC<HeaderActionMenuProps> = (
  props: HeaderActionMenuProps
) => {
  const [[title, actionType], setAction] = useState(['', '']);

  let ref: React.MouseEvent<HTMLElement> | undefined;
  const { columnData, onActionHeaderChange } = props;
  const optionChange = (item: string) => {
    let data = { ...columnData };
    data = {
      ...data,
      headerActionItem: item,
    };
    if (
      actionType &&
      actionType !== HeaderAction.FILTER &&
      actionType !== HeaderAction.SHOW &&
      actionType === item &&
      title === columnData.key
    ) {
      return;
    } else {
      onActionHeaderChange ? onActionHeaderChange(data, ref) : () => false;
      setAction([columnData.key, item]);
    }
  };
  const handleClick = (e?: React.MouseEvent<HTMLElement>) => {
    ref = e;
  };
  return (
    <>
      <Menu
        hideborder="true"
        datatestid={`${props.gridId}_headerActionMenu_${
          columnData && columnData.idx
        }`}
        hovercolor="secondary"
        position="bottom"
        size="small"
        handleclick={handleClick}
      >
        {columnData && columnData.sortable ? (
          <MenuItem
            // datatestid={`ascending_${columnData.idx}`}
            onClick={() => optionChange(HeaderAction.ASC)}
          >
            {"ASC"}
          </MenuItem>
        ) : null}
        {columnData && columnData.sortable ? (
          <MenuItem
            // datatestid={`descending_${columnData.idx}`}
            onClick={() => optionChange(HeaderAction.DESC)}
          >
            {"DESC"}
          </MenuItem>
        ) : null}
        {columnData && columnData.sortable ? (
          <MenuItem
            // datatestid={`unsort_${columnData.idx}`}
            onClick={() => optionChange(HeaderAction.NONE)}
          >
            {"UNSORT"}
          </MenuItem>
        ) : null}

        <MenuItem
          // datatestid={`lock_${columnData && columnData.idx}`}
          onClick={() => optionChange(HeaderAction.LOCK)}
        >
          {"LOCK"}
        </MenuItem>
        <MenuItem
          // datatestid={`unlock_${columnData && columnData.idx}`}
          onClick={() => optionChange(HeaderAction.UNLOCK)}
        >
          {"Unlock"}
        </MenuItem>
        <MenuItem
          // datatestid={`hide_${columnData && columnData.idx}`}
          onClick={() => optionChange(HeaderAction.HIDE)}
        >
          {"HIDE"}
        </MenuItem>
        <MenuItem
          // datatestid={`show_${columnData && columnData.idx}`}
          onClick={() => optionChange(HeaderAction.SHOW)}
        >
          {"SHOW_COLUMNS"}
        </MenuItem>
        {columnData && columnData.filterable && !props.filterOpenToggle ? (
          <MenuItem
            // datatestid={`filter_${columnData.idx}`}
            onClick={() => optionChange(HeaderAction.FILTER)}
          >
            {"FILTER"}
          </MenuItem>
        ) : null}
      </Menu>
    </>
  );
};
