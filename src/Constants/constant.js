
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + '...';
};

export const handleWhatsappClick = (phoneNumber) => {
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
};

export const removePrefix = (number) => {
  return number.replace('+91', '');
};

export const generateDateRandomInvoiceId = () => {
  const randomPart = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `#IN${randomPart}`;
};
