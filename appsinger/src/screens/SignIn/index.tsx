import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  CreateAccountButton,
  CreateAccountButtonText,
  Title,
} from './styles';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';

type SignInFormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais',
        );
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Title>Faça o seu Login</Title>
            <Form
              style={{ width: '100%' }}
              ref={formRef}
              onSubmit={handleSignIn}
            >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                name="email"
                icon="mail"
                placeholder="E-mail"
              />
              <Input
                secureTextEntry
                returnKeyType="send"
                name="password"
                icon="lock"
                placeholder="Senha"
              />
              <Button
                title="Entrar"
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton
        onPress={() => {
          formRef.current?.submitForm();
        }}
      >
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        <Icon name="arrow-right" size={20} />
      </CreateAccountButton>
    </>
  );
}
