import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

function Login(props) {
  const dispath = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector(state => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if(password.length < 6 || password.length > 20) {
      formErrors = true;
      toast.error('The password must be between 3 and 20 characters');
    }

    if(!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid E-mail');
    }

    if(formErrors) return;

    dispath(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter you email"
        />
        <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter you passowrd"
        />
        <button type="submit">Access</button>
      </Form>
    </Container>
  );
}

export default Login;
