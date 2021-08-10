import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  CreateAccountButton,
  CreateAccountButtonText,
  Icon,
  Title,
} from './styles';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

export function SignUp() {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data);
        await api.post('/account', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer logon na aplicação.',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer o cadastro, cheque as credenciais',
        );
      }
      navigation;
    },
    [navigation],
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
            <Title>Faça o seu cadastro</Title>

            <Form
              style={{ width: '100%' }}
              onSubmit={handleSignUp}
              ref={formRef}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
              />
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
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
                name="password"
                icon="lock"
                placeholder="Senha"
              />
              <Button
                title="Cadastrar"
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
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} />
        <CreateAccountButtonText>Voltar para login</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}
