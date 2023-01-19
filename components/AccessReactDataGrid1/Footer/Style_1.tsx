import styled from 'styled-components';
import * as Style from '../../../resources/styles/StyleConstants';

export const FooterStyle = styled.div`
  display: flex;
  width: calc(100% - 24px);
  margin: 17px 4px 4px 4px;
  border-top: 1px solid ${Style.COLOR_RGBA.meth};
  & .batch-action-label {
    flex: 0 0 calc(50% - 34px);
  }
  & .pagination-label {
    flex-grow: 1;
  }
`;
