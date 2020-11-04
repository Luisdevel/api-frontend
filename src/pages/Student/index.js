import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

function Student({ match }) {
  const dispath = useDispatch();

  const id = get(match, 'params.id', '');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        const Photo = get(data, 'Photos[0].url', '');

        setPhoto(Photo);

        setName(data.name);
        setSurname(data.surname);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);

        setIsLoading(false);
      } catch(err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if(status === 400) {
          errors.map(error => toast.error(error));
          history.push('/');
        }
      }
    }

    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false

    if (name.length < 3 || name.length > 20) {
      toast.error('The name must be between 3 and 20 characters');
      formErrors = true;
    }

    if (surname.length < 3 || surname.length > 20) {
      toast.error('The surname must be between 3 and 20 characters');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('Invalid E-mail.');
      formErrors = true;
    }

    if (!isInt(String(age))) {
      toast.error('Age must be an integer.');
      formErrors = true;
    }

    if (!isFloat(String(weight))) {
      toast.error('Weight must be a whole number separated by periods.');
      formErrors = true;
    }

    if (!isFloat(String(height))) {
      toast.error('Height must be a whole number separated by periods');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`/students/${id}`, {
          name,
          surname,
          email,
          age,
          weight,
          height,
        });

        toast.success('Student successfully edited');
      } else {
        const { data } = await axios.post(`/students/`, {
          name,
          surname,
          email,
          age,
          weight,
          height,
        });

        toast.success('Student successfully created');
        history.push(`/student/${data.id}/edit`);
      }

      setIsLoading(false);
    } catch(err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map(error => toast.error(error));
      } else {
        toast.error('Unknown error');
      }

      if (status === 400) dispath(actions.loginFailure());
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Edit student' : 'New student'}</Title>

      {id && (
        <ProfilePicture>
          {photo ? <img src={photo} alt={name} /> : <FaUserCircle size={180} />}
            <Link to={`/photos/${id}`}>
              <FaEdit size={24} />
            </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        />
        <input
        type="text"
        value={surname}
        onChange={e => setSurname(e.target.value)}
        placeholder="Surname"
        />
        <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
        />
        <input
        type="number"
        value={age}
        onChange={e => setAge(e.target.value)}
        placeholder="Age"
        />
        <input
        type="text"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        placeholder="weight"
        />
        <input
        type="text"
        value={height}
        onChange={e => setHeight(e.target.value)}
        placeholder="Height"
        />

        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
}

export default Student;
