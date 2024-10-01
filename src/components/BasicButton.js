import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useTheme } from '../Contexts/ThemeContext';
const BasicButton = (props) => {
  const { color } = useTheme();
  const {
    onClick,
    label,
    size,
    icon,
    className,
    isLoading,
    loaderVariant,
    loaderSize,
    type,
  } = props;
  const buttonStyle = {
    backgroundColor: color,
    borderColor: color,
    color: 'white',
  };
  return (
    <Button
      style={buttonStyle}
      className={className}
      size={size}
      type={type}
      onClick={onClick}
      disabled={!isLoading ? false : true}
    >
      {!isLoading ? (
        <>
          {icon} {label}
        </>
      ) : (
        <>
          <Spinner
            className="mx-1"
            size={`${!loaderSize ? 'sm' : loaderSize}`}
            variant={`${!loaderVariant ? color : loaderVariant}`}
          />
          {label}...
        </>
      )}
    </Button>
  );
};
export default BasicButton;
