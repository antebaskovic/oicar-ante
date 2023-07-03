function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  isDisabled,
}) {
  isDisabled = isDisabled || false;

  return (
    <div className="form-group row">
      <label className="col-md-2 col-form-label text-start">{label}:</label>
      <div className="col-md-10">
        <input
          type={type}
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          value={value}
          required
          onChange={onChange}
          disabled={isDisabled}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}

export default InputField;
