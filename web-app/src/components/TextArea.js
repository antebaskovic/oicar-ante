function TextArea({
  label,
  placeholder,
  value,
  onChange,
  error,
  isDisabled,
  isRequired,
}) {
  isDisabled = isDisabled || false;
  isRequired = isRequired || false;

  return (
    <div className="form-group row">
      <label className="col-md-2 col-form-label text-start">{label}:</label>
      <div className="col-md-10">
        <textarea
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          required={isRequired}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}

export default TextArea;
