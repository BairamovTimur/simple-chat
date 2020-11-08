import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Button,
  Modal,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import validator from 'validator';
import * as yup from 'yup';

import { actions, asyncActions } from '../../slices/index';

const baseSchema = yup.string()
  .min(3)
  .max(20)
  .matches(/^[\w\d\sА-Яа-я]+$/, 'Only numbers, letters, and a space are allowed in the channel name');

const validateChannelName = (channelName, channels) => {
  const name = validator.unescape(channelName);
  const channelsName = channels.map((channel) => channel.name);
  const actualSchema = baseSchema.notOneOf(channelsName, 'Must be unique');
  try {
    actualSchema.validateSync(name);
    return null;
  } catch (e) {
    return e.message;
  }
};

const onHide = (dispatch) => () => dispatch(actions.hideModal());

const asyncActionsMapping = {
  add: asyncActions.addChannel,
  rename: asyncActions.renameChannel,
  remove: asyncActions.removeChannel,
};

const handleSubmit = (dispatch, modalType, channelId, channels) => async (values,
  { setErrors }) => {
  const channelName = values.body;

  if (channelName) {
    const error = validateChannelName(channelName, channels);

    if (error) {
      setErrors({ inputRef: error });
      return;
    }
  }

  dispatch(asyncActionsMapping[modalType]({ channelName, channelId }));
};

const Add = () => {
  const { modalType, errorMessage, channelName } = useSelector((state) => state.modal);
  const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const formik = useFormik({
    onSubmit: handleSubmit(dispatch, modalType, null, channels),
    initialValues: { body: channelName },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide(dispatch)}>
      <Modal.Header closeButton onHide={onHide(dispatch)}>
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
            {errorMessage}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button disabled={formik.isSubmitting} type="button" variant="secondary" className="mr-2" onClick={onHide(dispatch)}>Cancel</Button>
            <Button disabled={formik.isSubmitting} type="submit" variant="primary">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const Remove = () => {
  const { modalType, channelId, errorMessage } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const formik = useFormik({
    onSubmit: handleSubmit(dispatch, modalType, channelId),
    initialValues: { body: '' },
  });

  return (
    <Modal show onHide={onHide(dispatch)}>
      <Modal.Header closeButton onHide={onHide(dispatch)}>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control.Feedback type="invalid" className="d-block">
            {formik.errors.inputRef}
            {errorMessage}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-between">
            <Button disabled={formik.isSubmitting} type="button" variant="secondary" className="mr-2" onClick={onHide(dispatch)}>Cancel</Button>
            <Button disabled={formik.isSubmitting} type="submit" variant="danger">Confirm</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const Rename = () => {
  const dispatch = useDispatch();
  const {
    modalType,
    channelId,
    channelName,
    errorMessage,
  } = useSelector((state) => state.modal);
  const channels = useSelector((state) => state.channels);

  const inputRef = useRef();

  const formik = useFormik({
    onSubmit: handleSubmit(dispatch, modalType, channelId, channels),
    initialValues: { body: channelName },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show onHide={onHide(dispatch)}>
      <Modal.Header closeButton onHide={onHide(dispatch)}>
        <Modal.Title>Rename channel</Modal.Title>
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
            {errorMessage}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button disabled={formik.isSubmitting} type="button" variant="secondary" className="mr-2" onClick={onHide(dispatch)}>Cancel</Button>
            <Button disabled={formik.isSubmitting} type="submit" variant="primary">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const mappingModalComponent = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

export default () => {
  const modalType = useSelector((state) => state.modal.modalType);

  if (!modalType) {
    return null;
  }

  const Component = mappingModalComponent[modalType];

  return (
    <Component />
  );
};
