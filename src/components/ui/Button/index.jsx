import React from 'react';

const Button = React.memo(({
  className, title, onClick, type,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {title}
    </button>
  );
});

export default Button;
