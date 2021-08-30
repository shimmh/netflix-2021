import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    
    ${reset};

    a{
        text-decoration:none;
        color:inherit;
        cursor: pointer;
    }
    
    input:focus {
        outline: none;
    }
    
    *{
        box-sizing:border-box;
    }

    button {
        border:0; 
        outline:none;
        cursor: pointer;
    }

    body{
        font-family: 'Noto Sans KR', sans-serif;
        background-color: ${(props) => props.theme.color.background};
        color : ${(props) => props.theme.color.text};
        padding: 0px 40px;
        padding-top: 60px;
    }
`;

export default globalStyles;
