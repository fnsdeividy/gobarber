import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiMail } from "react-icons/fi";
import { Container, Content, Background, AnimationContainer } from "./styles";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import getValidationErrors from "../../utils/getValidationErrors";
import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { useToast } from "../../hooks/Toast";

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um E-mail válido"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        //recuperção de senha

        //history.push("/dashboard");
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: "error",
          title: "Erro na recuperação de senha",
          description:
            "Ocorreu um erro na recuperação de sua senha, cheque as credenciais",
        });
      }
    },
    [addToast /*history*/]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Gobarber"></img>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperação de senha</h1>
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />

            <Button type="submit">Recuperar</Button>
          </Form>
          <Link to="/signin">
            <FiLogIn />
            Voltar ao Login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ForgotPassword;
