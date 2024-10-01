import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Form } from 'react-bootstrap';
import { FiUploadCloud } from 'react-icons/fi';
import { useTheme } from '../Contexts/ThemeContext';
import { toast } from 'react-toastify';

const DragAndDropImageUpload = ({
  setFieldValue = () => {},
  touched = {},
  errors = {},
  labelText = 'Upload Image',
  nameText = 'image',
  accepts = { 'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp', '.gif'] },
  handleFileChange = null,
  disabled = false,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accepts || '',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const acceptedExtensions = accepts['image/*'].map((ext) =>
        ext.replace('.', '').toLowerCase().trim()
      );
      if (acceptedExtensions.includes(fileExtension)) {
        setFieldValue(nameText, file);
        if (handleFileChange) {
          handleFileChange(file);
        }
      } else {
        toast.warning(`This file type not accepted`, {
          autoClose: 2000,
          position: 'bottom-center',
        });
      }
    },

    onDropRejected: (rejectedFiles) => {
      toast.warning(`This file type not accepted`, {
        autoClose: 2000,
        position: 'bottom-center',
      });
    },
    disabled: disabled,
  });
  const { color } = useTheme();

  return (
    <>
      <Form.Group>
        <Form.Label>
          {labelText} <span className="text-danger"></span>
        </Form.Label>
        <div
          {...getRootProps()}
          className={`form-control dropzone ${isDragActive ? 'active' : ''} ${
            touched[nameText] && errors[nameText] ? 'is-invalid' : ''
          }`}
          style={{
            border: '2px dashed #ced4da',
            padding: '20px',
            textAlign: 'center',
            borderRadius: '5px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            background: isDragActive ? '#f8f9fa' : 'transparent',
          }}
        >
          <input {...getInputProps()} disabled={disabled} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <>
              <FiUploadCloud size={50} color={color} />
              <p>Drag & drop an image here, or click to select one</p>
            </>
          )}
        </div>
        {touched[nameText] && errors[nameText] && (
          <p className="text-danger">{errors[nameText]}</p>
        )}
      </Form.Group>
    </>
  );
};

export default DragAndDropImageUpload;
