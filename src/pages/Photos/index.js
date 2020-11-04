import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

import { Title, Form } from './styled';

function Photos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        setPhoto(get(data, 'Photos[0].url', ''));
        setIsLoading(false);
      } catch(err) {
        toast.error('error getting image');
        setIsLoading(false);
        history.push('/');
      }
    };

    getData();
  }, [id]);

  async function handleChange(e) {
    const file = e.target.files[0];
    const photoURL = URL.createObjectURL(file);

    setPhoto(photoURL);

    const formData = new FormData();
    formData.append('student_id', id);
    formData.append('photo', file);

    try {
      setIsLoading(true);

      await axios.post('/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Photo sent successfully');

      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Error sending photo');

      if(status === 401) dispatch(actions.loginFailure());
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Photos</Title>
      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt="Photo" /> : 'Select'}
          <input type="file" id="photo" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Photos;
