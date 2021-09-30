import styled from "styled-components";
import signInBackgroundImg from'../../assets/sign-in-background.png'
import { shade } from 'polished'

export const Container = styled.div `
    height: 100vh;
    display: flex;

    align-items: stretch;
`;

export const Content = styled.div `
    display: flex;
    margin-top: 80px;
    flex-direction: column;
    place-content: center;
    width: 100%;
    max-width: 750px;
    align-items: center;

    form {
        margin: 80px 0 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 25px;
        }

        

       
        > a {
            text-decoration: none;
            display: block;
            color: #F4EDE8;
            margin: 24px;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#f4ede8')}
            }
            
        }
    }
    > a {
        color: #ff9000;
        display: block;
        text-decoration: none;
        margin-top: 24px;
        transition: color 0.2s;

        display: flex;
        align-items: center;

        &:hover {
                color: ${shade(0.2, "#ff9000")} ;
            }
            

        svg {
            margin-right: 15px;

        }

    }
`;

export const Background = styled.div `
    flex:1;
    background: url(${signInBackgroundImg}) no-repeat , center;
    background-size: cover;

`;