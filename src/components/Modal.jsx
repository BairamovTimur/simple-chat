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
import * as yup from 'yup';

import { actions, asyncActions } from '../slices/index';

const getValidateSchema = (channelsName) => yup.object().shape({
  channelName: yup.string()
    .min(3)
    .max(20)
    .matches(/^[\w\d]+$/, 'Only numbers, letters are allowed in the channel name')
    .notOneOf(channelsName, 'Must be unique'),
});

const onHide = (dispatch) => () => dispatch(actions.hideModal());

const asyncActionsMapping = {
  add: asyncActions.addChannel,
  rename: asyncActions.renameChannel,
  remove: asyncActions.removeChannel,
};

const handleSubmit = (dispatch, modalType, channelId) => async (values) => {
  const { channelName } = values;

  const asyncAction = asyncActionsMapping[modalType];
  dispatch(asyncAction({ channelName, channelId }));
};

const Add = () => {
  const { modalType, errorMessage, channelName } = useSelector((state) => state.modal);
  const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const channelsNames = channels.map((channel) => channel.name);
  const validateSchema = getValidateSchema(channelsNames);

  const formik = useFormik({
    onSubmit: handleSubmit(dispatch, modalType, null),
    initialValues: { channelName },
    validationSchema: validateSchema,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
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
              value={formik.values.channelName}
              name="channelName"
            />
          </FormGroup>
          <Form.Control.Feedback type="invalid" className="d-block">
            {formik.errors.channelName}
            {errorMessage}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button disabled={formik.isSubmitting} type="button" variant="secondary" className="mr-2" onClick={onHide(dispatch)}>Cancel</Button>
            <Button disabled={formik.isSubmitting} type="submit" variant="primary">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

const Remove = () => {
  const { modalType, channelId, errorMessage } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const formik = useFormik({
    onSubmit: handleSubmit(dispatch, modalType, channelId),
    initialValues: { channelName: '' },
  });

  return (
    <>
      <Modal.Header closeButton onHide={onHide(dispatch)}>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control.Feedback type="invalid" className="d-block">
            {errorMessage}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-between">
            <Button disabled={formik.isSubmitting} type="button" variant="secondary" className="mr-2" onClick={onHide(dispatch)}>Cancel</Button>
            <Button disabled={formik.isSubmitting} type="submit" variant="danger">Confirm</Button>
          </div>
        </Form>
      </Modal.Body>
    </>
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

  const channelsNames = channels.map((channel) => channel.name);
  const validateSchema = getValidateSchema(channelsNames);

  const formik = useFormik({
    onSubmit: handleSubmit(dispatch, modalType, channelId),
    initialValues: { channelName },
    validationSchema: validateSchema,
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <>
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
              value={formik.values.channelName}
              name="channelName"
            />
          </FormGroup>
          <Form.Control.Feedback type="invalid" className="d-block">
            {formik.errors.channelName}
            {errorMessage}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button disabled={formik.isSubmitting} type="button" variant="secondary" className="mr-2" onClick={onHide(dispatch)}>Cancel</Button>
            <Button disabled={formik.isSubmitting} type="submit" variant="primary">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

const mappingModalComponent = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

export default () => {
  const modalType = useSelector((state) => state.modal.modalType);
  const dispatch = useDispatch();

  if (!modalType) {
    return null;
  }

  const Component = mappingModalComponent[modalType];

  return (
    <Modal show onHide={onHide(dispatch)}>
      <Component />
    </Modal>
  );
};
