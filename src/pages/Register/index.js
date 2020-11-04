import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

function Register() {
  const dispath = useDispatch();

  const id = useSelector(state => state.auth.user.id);
  const nameStored = useSelector(state => state.auth.user.name);
  const emailStored = useSelector(state => state.auth.user.email);
  const isLoading = useSelector(state => state.auth.isLoading);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if(!id) return;

    setName(nameStored);
    setEmail(emailStored);
  }, [emailStored, id, nameStored]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if(name.length < 3 || name.length > 20) {
      formErrors = true;
      toast.error('The name must be between 3 and 20 characters');
    }

    if(!id && (password.length < 6 || password.length > 20)) {
      formErrors = true;
      toast.error('The password must be between 3 and 20 characters');
    }

    if(!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid E-mail');
    }

    if(formErrors) return;

    dispath(actions.registerRequest({ name, email, password, id }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Edit data' : 'Create my count'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="You name"
          />
        </label>

        <label htmlFor="name">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="You E-mail"
          />
        </label>

        <label htmlFor="name">
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="You password"
          />
        </label>

        <button type="submit">{id ? 'Save' : 'Create my count'}</button>
      </Form>
    </Container>
  );
}

export default Register;
