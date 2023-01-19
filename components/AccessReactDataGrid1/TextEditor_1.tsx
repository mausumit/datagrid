import { EditorProps } from 'react-data-grid';
import styled from 'styled-components';
import React from 'react';
import { CellEditor } from './styles/StyledDataGrid';
import { AccessTextField } from '../TextField';
export const TextEditor = ({
  row,
  column,
  onRowChange,
  onClose
}: EditorProps<TRow, TSummaryRow>) => {
  function autoFocusAndSelect(input: HTMLInputElement | null) {
    input?.focus();
    input?.select();
  }
  const Input = styled.input`
    appearance: none;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0px 6px 0 6px;
    border: 2px solid #ccc;
    vertical-align: top;
    color: var(--color);
    background-color: var(--background-color);

    font-family: inherit;
    font-size: var(--font-size);

    &:focus {
      border-color: var(--selection-color);
      outline: none;
    }

    &::placeholder {
      color: #999;
      opacity: 1;
    }
  `;
  return (
    /** 
        * @todo
        Need to implement if inline edit is required
        */
    <CellEditor>
      <AccessTextField
        placeholder=""
        datatestid="datatestid"
        adornment={false}
        ref={autoFocusAndSelect}
        value={(row[column.key as keyof TRow] as unknown) as string}
        onChange={event =>
          onRowChange({ ...row, [column.key]: event.target.value })
        }
        onBlur={() => onClose(true)}
      />
    </CellEditor>
  );
};
