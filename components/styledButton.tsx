import { Button } from '@mui/material';
import styled from 'styled-components';

const StyledButton = styled(Button)`
   background-color: white;
   color: black;
   width: min-content;
   white-space: nowrap;
   border-color: white;
   border-radius: 10rem;
   height: 3rem;
   box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
   font-family: ${(props: any) => props.theme.font};
`;
export default StyledButton;
