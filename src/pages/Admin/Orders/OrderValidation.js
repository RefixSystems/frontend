import * as Yup from 'yup';

export const OrderSchema = Yup.object().shape({
  status: Yup.string().required('Status is required'),
  assignedTo: Yup.string().required('Assigned To is required'),
  assignedOn: Yup.date().required('Assigned On is required').nullable(),
  technicianComments: Yup.string().required('Technician Comments are required'),
  notes: Yup.string().required('Notes is required'),
  closedOn: Yup.date().required('Closed On is required').nullable(),
  totalAmount: Yup.number().required('Total Amount is required').min(100, 'Total Amount must be at least 100'),
  paidThrough: Yup.string().required('Paid Through is required'),
  finalTransaction: Yup.string().required('Final Transaction is required'),
  finalAmountPaid: Yup.string().required('Final Amount Paid is required'),

});
