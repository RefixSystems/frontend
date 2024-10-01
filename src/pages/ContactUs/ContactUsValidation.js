import * as Yup from 'yup';

export const ContactUsSchema = Yup.object().shape({
  fullName: Yup.string()
  .max(25, 'Name must be 25 characters or less...!')
  .required('Name is required...!'),
email: Yup.string()
  .email('Invalid email address...!')
    .required('Email is required...!')
    .matches(
      /^[a-zA-Z0-9._%+-]+[0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
      'Invalid email format'
    ),
message: Yup.string()
  .max(500, 'Message must be 500 characters or less...!')
  .required('Message is required...!'),
phoneNumber: Yup.string()
  .matches(/^[6-9][0-9]{9}$/, 'Invalid phone number format...!')
  .required('Phone Number is required...!'),
});
