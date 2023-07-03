import { Link } from "react-router-dom";
import { useEffect } from "react";
import fitnessImage from "../img/fitness.jpeg";
function Welcome() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      window.location.href = "/home";
      return;
    }
  }, []);

  return (
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row flex-lg-row align-items-center g-5 py-5">
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-3">FitnessApp</h1>
          <p class="lead">
            Otkrijte snagu izvan granica svoje mašte s našom inovativnom
            aplikacijom za trenere! Uz našu platformu, možete jednostavno
            upravljati svojim trening programima, pratiti napredak svojih
            klijenata i pružiti im personaliziranu podršku na putu do njihovih
            fitness ciljeva. S izobiljem alata za planiranje, praćenje i
            komunikaciju, naša aplikacija će vam omogućiti da postanete najbolji
            trener koji možete biti. Budite korak ispred konkurencije i
            transformirajte živote svojih klijenata. Pridružite se našoj
            zajednici trenera i započnite svoju inspirativnu priču danas!
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-center text-center">
            <Link to="/login">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2"
              >
                Prijavi se
              </button>
            </Link>
            <Link to="/register">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Registriraj se
              </button>
            </Link>
          </div>
        </div>

        <div class="col-12 col-sm-8 col-lg-6">
          <img
            src={fitnessImage}
            class="d-block mx-lg-auto img-fluid"
            alt="fitness img"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
