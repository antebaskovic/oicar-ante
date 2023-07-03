function Card({
  name,
  description,
  btnText,
  category,
  onDeleteClick,
  onEditClick,
}) {
  return (
    <div className="col-sm-6 py-2">
      <div className="card bg-dark text-white">
        <div className="card-header">{category}</div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>

          <div
            className="row"
            style={{ gap: "1rem", justifyContent: "center" }}
          >
            <a
              href="#"
              className="btn btn-primary col-5 "
              onClick={onEditClick}
            >
              {btnText}
            </a>
            <a
              href="#"
              className="btn btn-danger col-5"
              onClick={onDeleteClick}
            >
              Izbriši
            </a>
          </div>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
}

export default Card;
