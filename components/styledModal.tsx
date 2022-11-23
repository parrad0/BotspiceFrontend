/* eslint-disable import/no-extraneous-dependencies */
import { Modal } from '@mui/material';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
   position: fixed;
   z-index: 1300;
   right: 0;
   bottom: 0;
   top: 0;
   left: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   overflow: 'hidden';
   width: 100% !important;
`;
export default StyledModal;
