import React from 'react';

const Input = React.memo(({
  placeholder, className, required, onChange, type = 'text', defaultValue = '', name, value,
}) => {
  return (
    <input
      className={className}
      required={required}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      name={name}
      value={value}
      defaultValue={defaultValue}
    />

  );
});

export default Input;
