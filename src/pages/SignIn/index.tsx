import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Container, Content, Background } from './styles'
import { Form } from '@unform/web'
import { FormHandles } from "@unform/core";
import getValidationErrors from "../../utils/getValidationErrors";
import logoImg from '../../assets/logo.svg';
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from 'yup'

const SignIn: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null)
    const handleSubmit= useCallback( async (data:object)=> {
        try {

           formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                
                email: Yup.string().required('E-mail obrigatório').email('Digite um E-mail válido'),
                
                password: Yup.string().required('Senha Obrigatória'), 
            });
            
            
            await schema.validate(data, {
                 abortEarly:false,
            })
           
            
        } catch (err:any)  {
           
           const errors = getValidationErrors(err);
           formRef.current?.setErrors(errors)
            
        }
    }, []);
    
    
    return (
    <Container>
        <Content> 
        <img src={logoImg} alt="Gobarber"></img>
        <Form ref={formRef} 
        onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit"> Entrar</Button>
            <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a>
            <FiLogIn/>
            Criar conta
        </a>
        </Content>

        <Background/>
    </Container>
);
}

export default SignIn;
