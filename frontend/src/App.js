import React from "react";
import Form from "./components/Form";
import './styles/custom.css';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-semibold" href="#">User Manager</a>
        </div>
      </nav>

      <main className="container my-4">
        <Form />
      </main>
    </div>
  );
}

export default App;
