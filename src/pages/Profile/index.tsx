import React, {  useCallback, useRef, ChangeEvent } from "react";
import {  Link, useHistory } from "react-router-dom";
import { FiMail,FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import api from "../../services/ApiClient";
import { Container, Content, AnimationContainer, AvatarInput } from './styles';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from 'yup'
import getValidationErrors from "../../utils/getValidationErrors";
import { useToast } from '../../hooks/Toast'
import { useAuth } from "../../hooks/Auth";

interface ProfileFormData {
    name: string;
    email: string;
    password: string
}


const Profile: React.FC = () => {
    const { addToast } = useToast()
    const  history  = useHistory()
    const formRef = useRef<FormHandles>(null)
    const { user, updateUser } = useAuth()
    const handleSubmit= useCallback( async (data:ProfileFormData)=> {
        try {

            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório') ,

                email: Yup.string().required('E-mail obrigatório').email('Digite um E-mail válido'),
                
                password: Yup.string().min(6, 'No minimo 6 digitos'), 
            });
            
            
            await schema.validate(data, {
                abortEarly:false,
            })

            await api.post('/users', data);

            history.push('/')
            
            addToast({
                type:'success',
                title:'Cadastro Realizado',
                description: 'Você já pode fazer seu Logon'
            })
        } catch (err:any)  {
            
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                
                formRef.current?.setErrors(errors)
                }
                
                addToast({
                    type:'error',
                    title:'Erro no cadastro',
                    description:'Ocorreu um erro no cadastro. Tente novamente'
                })
            }
        }, [ addToast, history]);
    
        const handleAvatarChange = useCallback((e:ChangeEvent<HTMLInputElement> ) => {
            if(e.target.files) {
                const data = new FormData();

                data.append('avatar', e.target.files[0])

                api.patch('/users/avatar', data).then(response => {
                    updateUser(response.data)
                    addToast({
                        type: 'success',
                        title: 'Avatar atualizado!'
                    })
                })
            }
        }, [addToast, updateUser])
    
    return (
        <Container>
            <header>
                <div>
                <Link to="/dashboard">
                    <FiArrowLeft title="Voltar"/>
                </Link>
                </div>
            </header>
        <Content> 
        
            <AnimationContainer>
                <Form
                ref={formRef}
                initialData={{ 
                    name: user.name,
                    email: user.email
                }}
                onSubmit={handleSubmit}>
                    <AvatarInput>
                        <img src=/*{user.avatar_url}*/ 
                        "https://avatars.githubusercontent.com/u/89440440?v=4" 
                        alt={user.name} />
                        <label htmlFor="avatar">
                            <FiCamera/>
                            <input type="file" id="avatar" onChange={handleAvatarChange} />
                        </label>
                        
                    </AvatarInput>
                    
                    <h1>Meu Perfil</h1>
                    <Input 
                    name="name" 
                    icon={FiUser} 
                    type="text" 
                    placeholder="Nome" 
                    />
                    <Input 
                    name="email" 
                    icon={FiMail} 
                    type="text" 
                    placeholder="E-mail" 
                    />
                    <Input
                    containerStyle={{ marginTop: 24 }}
                    name="old_password" 
                    icon={FiLock} 
                    type="password" 
                    placeholder="Senha atual" 
                    />
                    <Input 
                    name="password" 
                    icon={FiLock} 
                    type="password" 
                    placeholder="Nova senha" 
                    />
                    <Input 
                    name="password_confirmation" 
                    icon={FiLock} 
                    type="password" 
                    placeholder="Confirmar senha" 
                    />
                    
                    <Button type="submit"> Confirmar mudanças </Button>
                    
                </Form>
                
                
            </AnimationContainer>
        </Content>

    
    </Container>
    );
};


export default Profile;
