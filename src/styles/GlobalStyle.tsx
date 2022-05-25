import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: monospace, 'Open Sans', sans-serif; 
  }
  body {
    background: linear-gradient(to right, #E4FEE9, #DAE7FE);
  }
`;
export default GlobalStyle;
