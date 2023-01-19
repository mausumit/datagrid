import React, { FC } from 'react';
import type { EditorProps } from 'react-data-grid';
const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'] as const;

export const DropDown:FC<EditorProps<any>>=({ row, onRowChange }: EditorProps<any>)=> {
  return (
    <select
      value={row.title}
      onChange={event => onRowChange({ ...row, title: event.target.value }, true)}
      autoFocus
    >
      {titles.map(title => (
        <option key={title} value={title}>{title}</option>
      ))}
    </select>
  );
}
