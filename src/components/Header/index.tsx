import {FC} from "react";
import styled from 'styled-components';

const Headerc = styled.header`
  display: flex;
  padding: 6px 12px;
  background: linear-gradient(#404264, #10111a, #404264);
  color: #e6e7ea;
  margin-bottom: 4px;

`;

const Header: FC = (props) => {
  return (
    <Headerc>
      {props.children}
    </Headerc>
  )
}

export default Header;
