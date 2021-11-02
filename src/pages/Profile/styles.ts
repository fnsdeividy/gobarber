import styled, { keyframes } from "styled-components";
import signUpBackgroundImg from "../../assets/sign-up-background.png";
import { shade } from "polished";

export const Container = styled.div`
    > header {
        height: 144px;
        background: #28262e;
        display: flex;
        align-items: center;

        div {
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;
            text-decoration: none;
            font-size: 20px;
            color:#999591;

            svg {
                color:#999591;
                width: 30px;
                height: 30px;
                &:hover {
                    color: #ff9000;
                }
            }
        }

    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: -176px auto 0;
    width: 100%;
    max-width: 750px;
`;

const appearFromDown = keyframes`
    from {
        opacity:0;
        transform: translateY(50px)
    }
    to {
        opacity:1;
        transform: translateY(0)
    }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromDown} 1s;

  form {
    margin: 80px 0 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 25px;
      font-size: 20px;
      text-align: left;
    }

    > a {
      text-decoration: none;
      display: block;
      color: #f4ede8;
      margin: 24px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#f4ede8")};
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
      color: ${shade(0.2, "#ff9000")};
    }

    svg {
      margin-right: 15px;
    }
  }
`;
export const AvatarInput = styled.div `
    margin-bottom: 32px;
    position: relative;
    align-self: center;
    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }
    label{
        position: absolute;
        width: 48px;
        height: 48px;
        
        background: #ff9000;
        border-radius:50% ;
        bottom: 0;
        right: 0;
        border: 0;
        cursor: pointer;
        transition: background-color 0.2s;
        

        display: flex;
        align-items: center;
        justify-content: center;

        input {
            display: none;
        }

        svg {
            width: 20px;
            height: 20px;
            color:#312e38
        } 
        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }
    }
`;
