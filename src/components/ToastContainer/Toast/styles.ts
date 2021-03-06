import styled, { css } from "styled-components";
import { animated } from 'react-spring'



interface ToastProps {
    type?:'success' | 'error' | 'info';
    hasDescription: boolean;
}

const toastTypesVariations = {
    info: css `
        background: #ff9000;
        color: black;
    `,
    success: css `
        background: #028a0f;
        color: #fff;
    `,
    error: css `
        background: #c53030;
        color: #FFF;
    `
}



export const Container = styled(animated.div)<ToastProps> `
    width: 360px;
    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius: 10px ;
    box-shadow: 2px 2px 8px rgba(0,0,0, 0.2) ;
    display: flex;
    background: #ff9000;
    color: black;

    ${props => toastTypesVariations[props.type || "info"]}

   > svg {
        margin: 4px 12px 0 0;
    }

    & + div {
    margin-top: 8px;
}

    div {
        flex:1;
    }

    p {
        margin-top: 4px;
        font-size: 14px;
        opacity: 0.8;
        line-height: 20px;
        
    }
    button {
        position: absolute;
        right: 16px;
        top: 19px;
        opacity: 0.8;
        border: 0;
        background: transparent;
        color: inherit;
    }

    ${props => !props.hasDescription && css `
        align-items: center;

        svg {
            margin-top: 0;

        }

        
    `}

`