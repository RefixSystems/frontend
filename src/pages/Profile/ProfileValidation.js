import * as Yup from 'yup';

const MAX_SIZE = 1048576; // 1MB

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const ProfileSchema = (isEditName, isEditEmail,isEditPhoneNumber ) =>
  Yup.object().shape({
    userName: isEditName
      ? Yup.string()
          .max(30, 'Name must be 25 characters or less')
          .required('Name is required...!')
      : Yup.string().max(30, 'Name must be 25 characters or less'),
      
      phoneNumber: isEditPhoneNumber 
      ? Yup.string()
          .matches(/^[6-9][0-9]{9}$/, 'Invalid phone number format...!')
          .required('Phone number is required...!')
      : Yup.string()
          .matches(/^[6-9][0-9]{9}$/, 'Invalid phone number format...!')
          .test('length', 'Phone number must be 10 characters', (val) => val && val.length === 10),
     
   email: isEditEmail
  ? Yup.string()
      .email('Invalid email address')
      .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Email must be in lowercase and enter valid Email...!')
      .required('Email is required......!')
  : Yup.string()
      .email('Invalid email address')
      .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Email must be in lowercase and enter valid Email...!'),
    image: Yup.mixed()
      .test('fileSize', 'File size is too large. Max 1MB.', (value) => {
        return !value || (value && value.size <= MAX_SIZE);
      })
      .test('fileFormat', 'Unsupported file format.', (value) => {
        return !value || (value && SUPPORTED_FORMATS.includes(value.type));
      }),
  });
