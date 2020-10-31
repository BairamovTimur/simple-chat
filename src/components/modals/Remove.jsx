import React from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { actions, asyncActions } from '../../reducers/index';

export default () => {
  const dispatch = useDispatch();
  const onHide = () => dispatch(actions.hideModal());
  const channelId = useSelector((state) => state.modal.channelId);

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const resultAction = await dispatch(asyncActions.removeChannel(channelId));
      unwrapResult(resultAction);
      onHide();
    } catch (e) {
      setErrors({ inputRef: e.message });
    }
  };

  const formik = useFormik({ onSubmit: handleSubmit, initialValues: { body: '' } });

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control.Feedback type="invalid" className="d-block">
            {formik.errors.inputRef}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-between">
            <Button disabled={formik.isSubmitting} type="button" variant="secondary" className="mr-2" onClick={onHide}>Cancel</Button>
            <Button disabled={formik.isSubmitting} type="submit" variant="danger">Confirm</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
