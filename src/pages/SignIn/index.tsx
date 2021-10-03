import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Container, Content, Background, AnimationContainer } from './styles'
import { Form } from '@unform/web'
import { FormHandles } from "@unform/core";
import getValidationErrors from "../../utils/getValidationErrors";
import { useAuth } from "../../hooks/Auth";
import logoImg from '../../assets/logo.svg';
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from 'yup'
import { useToast } from "../../hooks/Toast";

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null)
    const { signIn } = useAuth( )
    const { addToast } = useToast()


    const handleSubmit= useCallback( async (data:SignInFormData)=> {
        try {

           formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                
                email: Yup.string().required('E-mail obrigatório').email('Digite um E-mail válido'),
                
                password: Yup.string().required('Senha Obrigatória'), 
            });
            
            
            await schema.validate(data, {
                 abortEarly:false,
            })

            await signIn({
                email:data.email,
                password:data.password
            })
           
            
        } catch (err:any)  {
           if(err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            
            formRef.current?.setErrors(errors)
           }
           
            addToast({
                type:'error',
                title:'Erro na autenticação',
                description:'Ocorreu um erro na autenticação, cheque as credenciais'
            })
        }
    }, [signIn, addToast]);
    
    
    return (
    <Container>
        <Content> 
            <AnimationContainer>
                <img src={logoImg} alt="Gobarber"></img>
                <Form ref={formRef} 
                onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit"> Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>
                </Form>
                <Link to="/signup">
                    <FiLogIn/>
                    Criar conta
                </Link>
            </AnimationContainer>
        </Content>

        <Background/>
    </Container>
);
}

export default SignIn;
