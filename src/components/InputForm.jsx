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
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';

import { asyncActions } from '../reducers/index';
import NickNameContext from '../context';

export default () => {
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const modalType = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const nickName = useContext(NickNameContext);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [modalType, currentChannelId]);

  const handleSubmit = async (values, { setErrors, resetForm }) => {
    try {
      const messageText = values.body;
      const resultAction = await dispatch(asyncActions.addMessage({
        channelId: currentChannelId,
        message: messageText,
        nickName,
      }));
      unwrapResult(resultAction);
      resetForm();
    } catch (e) {
      setErrors({ inputRef: e.message });
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
              name="body"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              disabled={formik.isSubmitting}
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
