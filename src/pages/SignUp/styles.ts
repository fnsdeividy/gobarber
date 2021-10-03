import styled, { keyframes } from "styled-components";
import signUpBackgroundImg from'../../assets/sign-up-background.png'
import { shade } from 'polished'

export const Container = styled.div `
    height: 100vh;
    display: flex;

    align-items: stretch;
`;

export const Content = styled.div `
     display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 750px;
   
`;

const appearFromRight = keyframes`
    from {
        opacity:0;
        transform: translateX(50px)
    }
    to {
        opacity:1;
        transform: translateX(0)
    }
`;

export const AnimationContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

animation: ${appearFromRight} 1s;
 
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
    background: url(${signUpBackgroundImg}) no-repeat , center;
    background-size: cover;

`;