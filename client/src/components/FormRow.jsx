const FormRow = ({ type, name, labelText, handleInput }) => {
  return (
    <div className="formRow">
      <input
        className="formInput"
        type={type}
        id={name}
        name={name}
        autoComplete="off"
        placeholder={labelText || name}
        required
        onChange={handleInput}
      />
    </div>
  );
};

export default FormRow;
