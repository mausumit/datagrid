import { BaseGrid } from '../BaseGrid';
import styled, { css } from 'styled-components';
import * as Style from '../../../resources/styles/StyleConstants';

const ActionMenuStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const StyledDataGrid = styled(BaseGrid)<any>`
  &.rdg {
    border: 0px;
    height: ${(props) =>
      props.showMore ? 'calc(100vh - 175px)': props.minHeight === true ? 'calc(100vh - 120px)': props.minHeight && `calc(100vh - ${props.minHeight})`};
    height: ${(props) =>
      props.norecord ? '79vh' : props.height};
    .rdg-focus-sink > div {
      height: 780px !important;
    }
    .rdg-header-row {
      background-color: ${Style.COLOR_RGBA.eth};
      .rdg-cell {
        border-right: 0px;
        font-family: ${Style.FONT_FAMILY.NunitoRegular};
        font-size: ${Style.FONT_SIZE.secondary};
        color: ${Style.COLOR_RGBA.primary};
        border-bottom: 0;
        &.actionButtonCell {
          ${ActionMenuStyle}
        }
        :hover {
          background-color: ${Style.COLOR_RGBA.secondary1};
        }
        .rdg-checkbox {
          border: 1px solid ${Style.COLOR_RGBA.meth};
        }

        &:first-of-type.rdg-cell-frozen {
          padding-left: 12px;
        }
        &:first-of-type {
          padding-left: 20px;
        }
        &:last-of-type {
          padding-right: 20px;
        }
        &::before {
          content: '';
          height: 1px;
          position: absolute;
          width: calc(100% - 14px);
          bottom: 0;
          background-color: ${Style.COLOR_RGBA.meth};
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .rdg-filter-row {
      contain: none !important;
      & .rdg-cell {
        contain: none !important;
        overflow: inherit;
        &:first-of-type {
          padding-left: 20px;
        }
        &:last-of-type {
          padding-right: 20px;
        }
      }
    }
    .access-grid-row {
      --summary-row-height: 44px;
      contain: strict;
      contain: size layout style paint;
      display: grid;
      grid-template-rows: var(--summary-row-height);
      grid-template-columns: var(--template-columns);
      position: absolute;
      left: 0;
      width: var(--row-width);
      height: var(--summary-row-height); // needed on Firefox
      line-height: var(--summary-row-height);
      background-color: var(--background-color);

      &:hover {
        background-color: var(--row-hover-background-color);
      }

      border-bottom: 1px solid ${Style.COLOR_RGBA.meth};
      align-items: center;
      cursor: ${(props) => (props.onRowClick ? 'pointer' : 'default')};
      .rdg-cell {
        border-right: 0px;
        font-family: ${Style.FONT_FAMILY.NunitoRegular};
        font-size: ${Style.FONT_SIZE.tertiary};
        color: ${Style.COLOR_RGBA.textPrimary};
        box-shadow: inset 0 0 0 0px var(--selection-color);
        height: ${Style.DIMENSION.full};
        contain: strict;
        contain: size layout style paint;
        padding: 0 8px;
        background-color: white;
        white-space: nowrap;
        overflow: hidden;
        overflow: clip;
        text-overflow: ellipsis;

        &:first-of-type.rdg-cell-frozen {
          padding-left: 12px;
        }
        &.rdg-cell-frozen {
          position: sticky;
          z-index: 1;
        }
        &:first-of-type {
          padding-left: 20px;
        }
        &.actionButtonCell {
          ${ActionMenuStyle}
        }
        &:focus {
          outline: none;
        }
        .rdg-checkbox {
          border: 1px solid ${Style.COLOR_RGBA.meth};
        }
        /* &.rdg-row-selected {
          background: ${Style.COLOR_RGBA.secondary2};
        } */
        &.rdg-cell-frozen-last {
          box-shadow: 2px 0 5px -2px hsl(0deg 0% 53% / 30%);
          &::after {
            content: '';
            cursor: col-resize;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 10px;
          }
        }
      }
      &.rdg-row-selected {
        .rdg-cell {
          background: ${Style.COLOR_RGBA.secondary1};
        }
      }
      &:hover {
        /* background: ${Style.COLOR_RGBA.secondary2}; */
        .rdg-cell {
          background: ${Style.COLOR_RGBA.secondary2};
        }
        .MuiIconButton-label {
          background: ${Style.COLOR_RGBA.eth};
          border-radius: 5px;
        }
      }
      & .new-data {
        padding-right: 24px;
        display: block;
        &::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: ${Style.COLOR_RGBA.primary};
          border-radius: 50%;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      & .high-priority {
        color: ${Style.COLOR_RGBA.negative};
        display: block;
      }
      & .medium-priority {
        color: ${Style.COLOR_RGBA.info};
        display: block;
      }
      & .low-priority {
        color: ${Style.COLOR_RGBA.positive};
        display: block;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
  }
`;
export const CellEditor = styled.div`
  padding: 10px 8px 0;
`;

export const StyledHeaderCell = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  & > p {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: 700;
  }
`;

export const StyledHideShow = styled.div`
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  position: relative;
  border-bottom: 4px solid transparent;
  height: 100%;
  padding-top: 0;
  padding-right: ${(props: any) => (props.value && props.value ? '15px' : '')};
  padding-left: ${(props: any) =>
    props.columnType && typeof props.columnType === 'object' ? '' : '17px'};
  &.filter-focused {
    border-bottom-color: ${Style.COLOR_RGBA.secondary};
    height: 100%;
    padding-top: 0;
  }
  & .dropdown--wrapper {
    flex-grow: 1;
    max-width: 100%;
    display: inline-flex;
  }
  & .icon--wrapper {
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: -5px;
    & > svg {
      color: ${Style.COLOR_RGBA.octonary};
    }
    &.search--icon {
      right: calc(100% - 14px);
    }
  }
  & .textField {
    & .textFieldInput {
      margin-top: 8px;
      &::before,
      &::after {
        border-bottom-width: 0;
      }
      &:hover:not(.textFieldInputDisabled)::before {
        border-bottom-width: 0;
      }
    }
  }
`;
