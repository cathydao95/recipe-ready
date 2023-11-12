// Reusable input for login/register/create/edit forms
const FormRow = ({ type, name, labelText, handleInput, value }) => {
  return type === "textarea" ? (
    <div>
      <textarea
        className="formTextArea"
        id={name}
        name={name}
        autoComplete="off"
        placeholder={labelText || name}
        required
        onChange={handleInput}
        value={value}
        rows={7}
      ></textarea>
    </div>
  ) : (
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
