import React,
{
  useContext,
  useRef,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';

import { asyncActions } from '../reducers/index';
import NickNameContext from '../context';

export default (props) => {
  const { currentChannelId } = props;
  const dispatch = useDispatch();

  const nickName = useContext(NickNameContext);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = async (values, { setErrors, resetForm }) => {
    try {
      const messageText = values.body;
      const resultAction = await dispatch(asyncActions.postMessage({
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
      <form noValidate="" className="" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input ref={inputRef} name="body" aria-label="body" className="mr-2 form-control" disabled={formik.isSubmitting} value={formik.values.body} onChange={formik.handleChange} />
            <button aria-label="submit" type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Submit</button>
            <div className="d-block invalid-feedback">{formik.errors.inputRef}</div>
          </div>
        </div>
      </form>
    </div>
  );
};
