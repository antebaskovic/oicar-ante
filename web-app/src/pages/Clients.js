import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { Button } from "react-bootstrap";
import { getClients } from "../utils/getData";
import IfListEmpty from "../components/ifListISEmpty";

function Clients() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getClients()
      .then((data) => setClients(data))
      .catch(() => {});
  }, []);

  return (
    <div className="container ">
      <Header />
      <div className="row py-5 center gapMobile-2">
        <div
          className="row py-5 center gapMobile-2"
          style={{ justifyContent: "center" }}
        >
          <h1 className="col-12 col-md-9">Vaši klijenti:</h1>

          <div class="form-group pull-right col-12 col-md-3">
            <input
              type="text"
              className="search form-control"
              placeholder="Započnite pretraživanje..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <IfListEmpty list={clients} msgEnd="nijednog upisanog klijenta" />

        <div class="table-responsive ">
          <table className="table table-hover">
            <thead className="border-b-2 ">
              {clients.length !== 0 && (
                <tr>
                  <th>Email</th>
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Program</th>
                  <th></th>
                </tr>
              )}
            </thead>
            <tbody>
              {clients
                .filter(
                  (user) =>
                    user.Email.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    user.FirstName.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    user.LastName.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    user.Name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <tr key={user.UserID}>
                    <td>{user.Email}</td>
                    <td>{user.FirstName}</td>
                    <td>{user.LastName}</td>
                    <td>{user.Name}</td>
                    <td>
                      <Button href={`/clientDetails/${user.UserID}`}>
                        Detalji
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clients;
