import React, { useState } from 'react';
import { AccessActionMenu } from '../ActionMenus/AccessActionMenu';
import { HeaderActionMenuProps } from './Types';
import { HeaderAction } from './enums/accessDataGrid';
import { AccessOption } from '../SelectOption';
import { TranslatedText } from 'platform-sdk';

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
      <AccessActionMenu
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
          <AccessOption
            datatestid={`ascending_${columnData.idx}`}
            onClick={() => optionChange(HeaderAction.ASC)}
          >
            {TranslatedText('SORT_ASCENDING')}
          </AccessOption>
        ) : null}
        {columnData && columnData.sortable ? (
          <AccessOption
            datatestid={`descending_${columnData.idx}`}
            onClick={() => optionChange(HeaderAction.DESC)}
          >
            {TranslatedText('SORT_DESCENDING')}
          </AccessOption>
        ) : null}
        {columnData && columnData.sortable ? (
          <AccessOption
            datatestid={`unsort_${columnData.idx}`}
            onClick={() => optionChange(HeaderAction.NONE)}
          >
            {TranslatedText('UNSORT')}
          </AccessOption>
        ) : null}

        <AccessOption
          datatestid={`lock_${columnData && columnData.idx}`}
          onClick={() => optionChange(HeaderAction.LOCK)}
        >
          {TranslatedText('LOCK')}
        </AccessOption>
        <AccessOption
          datatestid={`unlock_${columnData && columnData.idx}`}
          onClick={() => optionChange(HeaderAction.UNLOCK)}
        >
          {TranslatedText('UNLOCK')}
        </AccessOption>
        <AccessOption
          datatestid={`hide_${columnData && columnData.idx}`}
          onClick={() => optionChange(HeaderAction.HIDE)}
        >
          {TranslatedText('HIDE')}
        </AccessOption>
        <AccessOption
          datatestid={`show_${columnData && columnData.idx}`}
          onClick={() => optionChange(HeaderAction.SHOW)}
        >
          {TranslatedText('SHOW_COLUMNS')}
        </AccessOption>
        {columnData && columnData.filterable && !props.filterOpenToggle  ? (
          <AccessOption
            datatestid={`filter_${columnData.idx}`}
            onClick={() => optionChange(HeaderAction.FILTER)}
          >
            {TranslatedText('FILTER')}
          </AccessOption>
        ) : null}
      </AccessActionMenu>
    </>
  );
};
