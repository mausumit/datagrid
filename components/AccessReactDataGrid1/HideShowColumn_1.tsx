import React, { FC, useEffect, useState } from 'react';
import { FormLabel } from '../FormLabel';
import { VBox } from '../Boxes';
import { HideShowColumnProps } from './Types';
import { StyledHideShow } from './styles/StyledDataGrid';
import { SelectColumn } from './Select/SelectColumn';
import { AccessCheckbox } from '../Checkbox';
import { AccessSecondaryButton } from '../Button';
import { PlaceholderTranslatedText, TranslatedText } from 'platform-sdk';

export const HideShowColumn: FC<HideShowColumnProps> = (
  props: HideShowColumnProps
) => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>();

  useEffect(() => {
    if (props.columns.length !== props.draggableColumns.length) {
      props.setCheckedColumnsData(props.checkedColumnsData);
    }
  }, []);

  useEffect(() => {
    handleShowAllButton();
  }, [props.checkedColumnsData]);

  const handleShowAllButton = () => {
    const ifChecked = props.checkedColumnsData.find(
      (column) => !column.isChecked
    );
    if (ifChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };

  const handleChange = (e: any) => {
    let tempData = [...props.draggableColumns];
    let checkedData = [...props.checkedColumnsData];
    props.checkedColumnsData.map((ele: any) => {
      if (e.target.id === ele.id) {
        if (!e.target.checked) {
          const dataIndex = tempData.findIndex(
            (item) => item.key === e.target.id
          );
          if (dataIndex > -1) {
            tempData.splice(dataIndex, 1);
          }
        } else {
          const columnData = [...props.columns];
          const data = columnData.find((ele) => ele.key === e.target.id);
          const dataIndex = columnData.findIndex(
            (item) => item.key === e.target.id
          );
          if (dataIndex > -1) {
            tempData.splice(0, 0, data);
          }
        }
      }
    });
    checkedData = props.checkedColumnsData.map((ele: any) => {
      if (e.target.id === ele.id && ele.isChecked) {
        return { ...ele, isChecked: e.target.checked };
      } else if (e.target.id === ele.id && !ele.isChecked) {
        return { ...ele, isChecked: !ele.isChecked };
      } else {
        return ele;
      }
    });
    const sortedCol = props.onColumnShowHide
      ? tempData.sort((a, b) => a.order - b.order)
      : tempData;
    props.setColumns(sortedCol);
    props.setCheckedColumnsData(checkedData);

    if (props.onColumnShowHide) {
      const tempSet = [...props.setting];
      const reqSet = tempSet.map((ele) => {
        if (ele.key === e.target.id) {
          return { ...ele, hide: !e.target.checked };
        } else {
          return ele;
        }
      });
      props.onColumnShowHide(reqSet);
      props.setSetting(reqSet);
    }
  };
  const showAllColumns = () => {
    if (props.isCheckboxSelection) {
      props.setColumns([SelectColumn, ...props.columns]);
      setIsAllChecked(false);
    } else {
      props.setColumns([...props.columns]);
      setIsAllChecked(false);
    }
    props.setCheckedColumnsData(
      props.columns
        .map((ele: any) => {
          if (ele && ele.name !== '') {
            return {
              id: `${ele.key}`,
              name: ele.name,
              isChecked: true,
              hide: false,
            };
          }
        })
        .filter((item: any) => item)
    );
    if (props.onColumnShowHide) {
      const tempSet = [...props.setting];
      const reqSet = tempSet.map((ele) => {
        return { ...ele, hide: false };
      });
      props.onColumnShowHide(reqSet);
      props.setSetting(reqSet);
    }
  };
  const chkdDatalengthOne = () => {
    const tempData = props.checkedColumnsData
      .map((item) => {
        if (item.isChecked) {
          return item;
        } else {
          return;
        }
      })
      .filter((item: any) => item);
    return tempData.length === 1 ? tempData[0] : {};
  };
  const getObj = (ele) => {
    return {
      ...ele,
      name: PlaceholderTranslatedText(ele.name.props.id),
    };
  };
  return (
    <>
      <VBox height="180px" margin={['zero', 'zero', 'xs', 'zero']}>
        {(props.checkedColumnsData || []).map((ele: any) => {
          if (typeof ele.name === 'object') {
            ele = getObj(ele);
          }
          return (
            <StyledHideShow>
              <FormLabel
                datatestid={`${props.columnclicked}_${ele.name}_label`}
                id={ele.name}
              >
                <AccessCheckbox
                  onChange={handleChange}
                  key={ele.id}
                  id={ele.id}
                  datatestid={`${props.columnclicked}_${ele.name}_checkbox`}
                  name={ele.name}
                  color="secondary"
                  checked={ele.isChecked}
                  disabled={
                    chkdDatalengthOne() && chkdDatalengthOne().id === ele.id
                  }
                ></AccessCheckbox>
                {ele.name}
              </FormLabel>
            </StyledHideShow>
          );
        })}
      </VBox>
      <AccessSecondaryButton
        type="button"
        onClick={showAllColumns}
        size="small"
        color="secondary"
        disabled={!isAllChecked}
        datatestid="showhide_close_btn"
      >
        {TranslatedText('SHOW_ALL')}
      </AccessSecondaryButton>
    </>
  );
};
