import React, { useCallback, useRef, useState } from "react";
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
import api from "../../services/ApiClient";

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
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

        await api.post("/password/forgot", {
          email: data.email,
        });

        addToast({
          type: "success",
          title: "E-mail de recuperação enviado",
          description:
            "Enviamos um E-mail para confirmar sua recuperação de senha, cheque sua caixa de entrada.",
        });

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
      } finally {
        setLoading(false);
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

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
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
