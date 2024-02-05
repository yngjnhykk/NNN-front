import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordError(true);
      return;
    }
    if (!term) {
      setTermError(true);
      return;
    }
    dispatch({ type: SIGN_UP_REQUEST, data: { email, password, nickname } });
  }, [email, password, passwordCheck, term]);

  const onChangePasswordCheck = (e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };

  const onChangeTerm = (e) => {
    setTermError(false);
    setTerm(e.target.checked);
  };

  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit} style={{ padding: 10 }}>
          <div>
            <label htmlFor='user-email'>이메일</label>
            <br />
            <Input name='user-email' type='email' value={email} required onChange={onChangeEmail} />
          </div>
          <div>
            <label htmlFor='user-nick'>닉네임</label>
            <br />
            <Input name='user-nick' value={nickname} required onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor='user-password'>비밀번호</label>
            <br />
            <Input name='user-password' type='password' value={password} required onChange={onChangePassword} />
          </div>
          <div>
            <label htmlFor='user-password-check'>비밀번호체크</label>
            <br />
            <Input name='user-password-check' type='password' value={passwordCheck} required onChange={onChangePasswordCheck} />
            {passwordError && <RedText style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</RedText>}
          </div>
          <div>
            <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
              개인정보 이용에 동의합니다.
            </Checkbox>
            {termError && <RedText style={{ color: 'red' }}>약관에 동의하셔야 합니다.</RedText>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type='primary' htmlType='submit' loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default Signup;

const RedText = styled.div`
  color: red;
`;
