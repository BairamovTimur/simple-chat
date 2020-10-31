import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Modal,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { actions, asyncActions } from '../../reducers/index';

export default () => {
  const dispatch = useDispatch();
  const onHide = () => dispatch(actions.hideModal());

  const handleSubmit = async (values, { setErrors, resetForm }) => {
    try {
      const channelName = values.body;
      const resultAction = await dispatch(asyncActions.addChannel(channelName));
      unwrapResult(resultAction);
      resetForm();
      onHide();
    } catch (e) {
      setErrors({ inputRef: e.message });
    }
  };

  const formik = useFormik({ onSubmit: handleSubmit, initialValues: { body: '' } });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              name="body"
            />
          </FormGroup>
          <Form.Control.Feedback type="invalid" className="d-block">
            {formik.errors.inputRef}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button disabled={formik.isSubmitting} type="button" variant="secondary" className="mr-2" onClick={onHide}>Cancel</Button>
            <Button disabled={formik.isSubmitting} type="submit" variant="primary">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
