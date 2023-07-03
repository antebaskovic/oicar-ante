import { Edit3, Eye } from "lucide-react";
import { Button } from "react-bootstrap";

function HomeCard({
  list,
  btnText,
  category,
  allHref,
  href,
  emptyText,
  edit,
  btnAddText,
  addHref,
}) {
  return (
    <div className="col-sm-6 py-2 ">
      <div className="card bg-dark text-white " style={{ minHeight: "20rem" }}>
        <div className="card-header">
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div>{category}</div>

            {edit ? <Button href={addHref}> {btnAddText}</Button> : ""}
          </div>
        </div>
        <div className="card-body">
          <div
            className="row flex "
            style={{
              justifyContent: "space-between",
              maxHeight: "15rem",
              overflow: "scroll",
            }}
          >
            {list.length > 0 ? (
              list.map((el) => (
                <>
                  <div
                    className="col-10"
                    style={{ borderBottom: "2px dotted" }}
                  >
                    {el.name}
                  </div>
                  <div
                    className="col-2 text-center "
                    style={{ borderBottom: "2px dotted" }}
                  >
                    <a className="text-white" href={`${href}/${el.id}`}>
                      {edit ? <Edit3 /> : <Eye />}
                    </a>
                  </div>
                </>
              ))
            ) : (
              <div className="col-12">{emptyText}</div>
            )}
          </div>
        </div>
        <div className="card-footer">
          <a href={allHref} className="btn btn-primary col-12 ">
            {btnText}
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
