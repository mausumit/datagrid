import React, { FC, useState } from 'react';
// import { AccessActionMenu } from '../../ActionMenus';
import Menu from "@mui/material/Menu";
// import { HBox } from '../../Boxes';
import Box from "@mui/material/Box";
// import { Link } from '../../Links';
import Link from "@mui/material/Link";
// import { AccessOption } from '../../SelectOption';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import { H4 } from '../../Typography';
import { GridFooterProps } from '../Types';
import { FooterStyle } from './Style';
// import { PlaceholderTranslatedText, TranslatedText } from 'platform-sdk';
// import { AccessTooltip } from '../../Tooltip';
import Tooltip from "@mui/material/Tooltip";



const DataGridFooter: FC<any> = (props: GridFooterProps) => {
  const {
    pagination,
    onShowMore,
    batchaction,
    batchHoverState,
    batchActiveState,
    batchHoverStateIn,
    disabledBatchAction,
    disableBatchToolTipMsg,
    checkedRows,
  } = props;

  const [hoverState, setHoverState] = useState(0);
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setHoverState(1);
    batchHoverState && batchHoverState(1);
  };
  const handleMouseOut = (event: React.MouseEvent<HTMLElement>) => {
    setHoverState(0);
    batchHoverState && batchHoverState(0);
  };
  return (
    <FooterStyle>
      {batchaction ? (
        <Tooltip
          describeChild
          title={
            disabledBatchAction &&
            checkedRows.length !== 0 &&
            disableBatchToolTipMsg
              ? disableBatchToolTipMsg
              : ''
          }
          placement="bottom"
        >
          <Menu
            // batchaction="true"
            // hovercolor="secondary"
            // hoverstate={hoverState || batchHoverStateIn}
            // activestate={batchActiveState}
            // size={'small'}
            onMouseEnter={
              !batchActiveState
                ? (event: React.MouseEvent<HTMLElement>) =>
                    handleMouseEnter(event)
                : () => null
            }
            onMouseLeave={
              !batchActiveState
                ? (event: React.MouseEvent<HTMLElement>) =>
                    handleMouseOut(event)
                : () => null
            }
            // disabled={disabledBatchAction || checkedRows.length === 0}
          >
            {batchaction.map((option) => (
              <MenuItem
                key={option.id}
                // onClick={option.onClick}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Tooltip>
      ) : (
        <></>
      )}
      <Box width="100%" padding={['zero', 'xs']} alignItems="center">
        <div className="batch-action-label">
          {batchaction ? (
            <h4 color="#4a90e2">{'BATCH_ACTION'}</h4>
          ) : (
            <></>
          )}
        </div>
        {pagination && pagination.showMoreBtnVisible ? (
          <div className="pagination-label">
            <Link
              id="blueLink"
              onClick={onShowMore}
              type="button"
              color="primary"
              title={'Show More'}
              // datatestid="Show More"
            />
          </div>
        ) : (
          <></>
        )}
      </Box>
    </FooterStyle>
  );
};

export default DataGridFooter;
