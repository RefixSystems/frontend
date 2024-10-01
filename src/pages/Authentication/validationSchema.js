import * as Yup from 'yup';
export const AccountCreationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[6-9][0-9]{9}$/, 'Invalid phone number format'),
  email: Yup.string()
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+[0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
      'Invalid email format'
    )
    .required('Email is required'),

  dob: Yup.date().required('Date of birth is required').nullable(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[6-9][0-9]{9}$/, 'Invalid phone number format'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
