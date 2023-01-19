import React, { FC, useState } from 'react';
import { AccessActionMenu } from '../../ActionMenus';
import { HBox } from '../../Boxes';
import { AccessLink } from '../../Links';
import { AccessOption } from '../../SelectOption';
import { H4 } from '../../Typography';
import { GridFooterProps } from '../Types';
import { FooterStyle } from './Style';
import { PlaceholderTranslatedText, TranslatedText } from 'platform-sdk';
import { AccessTooltip } from '../../AccessTooltip';

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
        <AccessTooltip
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
          <AccessActionMenu
            datatestid="actionMenu"
            batchaction="true"
            hovercolor="secondary"
            hoverstate={hoverState || batchHoverStateIn}
            activestate={batchActiveState}
            size={'small'}
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
            disabled={disabledBatchAction || checkedRows.length === 0}
          >
            {batchaction.map((option) => (
              <AccessOption
                key={option.id}
                datatestid={option.id}
                onClick={option.onClick}
              >
                {option.label}
              </AccessOption>
            ))}
          </AccessActionMenu>
        </AccessTooltip>
      ) : (
        <></>
      )}
      <HBox width="100%" padding={['zero', 'xs']} alignItems="center">
        <div className="batch-action-label">
          {batchaction ? (
            <H4 color="#4a90e2">{TranslatedText('BATCH_ACTION')}</H4>
          ) : (
            <></>
          )}
        </div>
        {pagination && pagination.showMoreBtnVisible ? (
          <div className="pagination-label">
            <AccessLink
              id="blueLink"
              onClick={onShowMore}
              type="button"
              color="primary"
              title={PlaceholderTranslatedText('SHOW_MORE')}
              datatestid="Show More"
            />
          </div>
        ) : (
          <></>
        )}
      </HBox>
    </FooterStyle>
  );
};

export default DataGridFooter;
