import React,
{
  useContext,
  useRef,
  useEffect,
} from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import validator from 'validator';
import axios from 'axios';
import { uniqueId } from 'lodash';
import routes from '../routes';
import NickNameContext from '../context';

const InputForm = () => {
  const channelId = useSelector((state) => state.currentChannelId);
  const modalType = useSelector((state) => state.modal);
  const nickName = useContext(NickNameContext);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [modalType, channelId]);

  const handleSubmit = async (values, { setErrors, resetForm }) => {
    try {
      const messageText = values.body;
      const message = validator.escape(messageText);
      await axios.post(routes.channelMessagesPath(channelId), {
        data: {
          attributes: {
            channelId,
            message,
            nickName,
            id: uniqueId(),
          },
        },
      });
      resetForm();
    } catch (e) {
      setErrors({ inputRef: e.message });
    } finally {
      inputRef.current.focus();
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { body: '' },
  });

  return (
    <div className="mt-auto">
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <InputGroup>
            <FormControl
              required
              name="body"
              aria-label="body"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              disabled={formik.isSubmitting}
              autoComplete="off"
            />
            <div className="d-flex justify-content-end">
              <Button disabled={formik.isSubmitting} type="submit" variant="primary">Submit</Button>
            </div>
            <Form.Control.Feedback type="invalid" className="d-block">
              {formik.errors.inputRef}
            </Form.Control.Feedback>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
};

export default InputForm;
