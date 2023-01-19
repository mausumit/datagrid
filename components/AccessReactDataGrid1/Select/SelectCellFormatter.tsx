import React from 'react';
import { AccessCheckbox } from '../../Checkbox';
import { useFocusRef } from '../hooks/useFocusRef';
import { CheckboxWrapper } from './StyledCheckbox';

type SharedInputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'tabIndex' | 'onClick' | 'aria-label' | 'aria-labelledby'
>;

interface SelectCellFormatterProps extends SharedInputProps {
  isCellSelected?: boolean;
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
  checkboxHoverState?: number;
  hoverStateCheckbox?: (hoverState: number) => number;
  id: string | number;
}

export const SelectCellFormatter = ({
  value,
  tabIndex,
  isCellSelected,
  disabled,
  onClick,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  checkboxHoverState,
  hoverStateCheckbox,
  id,
}: SelectCellFormatterProps) => {
  const inputRef = useFocusRef<HTMLInputElement>(isCellSelected);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    hoverStateCheckbox && hoverStateCheckbox(1);
  };
  const handleMouseOut = (event: React.MouseEvent<HTMLElement>) => {
    hoverStateCheckbox && hoverStateCheckbox(0);
  };

  return (
    <CheckboxWrapper
      onMouseEnter={(event: React.MouseEvent<HTMLElement>) =>
        handleMouseEnter(event)
      }
      onMouseLeave={(event: React.MouseEvent<HTMLElement>) =>
        handleMouseOut(event)
      }
    >
      <AccessCheckbox
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        ref={inputRef}
        disabled={disabled}
        checked={value}
        onChange={handleChange}
        datatestid={`selecter_${id}`}
        hoverstate={checkboxHoverState}
        color="primary"
        onClick={onClick}
      ></AccessCheckbox>
    </CheckboxWrapper>
  );
};
