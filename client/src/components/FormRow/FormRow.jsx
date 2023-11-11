// Reusable input for login/register/create/edit forms
const FormRow = ({ type, name, labelText, handleInput, value }) => {
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
        value={value}
      />
    </div>
  );
};

export default FormRow;
