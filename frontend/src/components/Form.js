import React, { useEffect, useState } from "react";
import axios from "axios";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    country: ""
  });

  const [message, setMessage] = useState(null);  // Add state for success message
  const [users, setUsers] = useState([]); // List of users to display

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/submit", formData)
      .then((response) => {
        setMessage(response.data.message);  // Set the success message
        console.log(response.data);
        // Refresh users list after successful submit
        fetchUsers();
        // Optionally clear the form
        setFormData({ name: "", email: "", city: "", country: "" });
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
        setMessage("Error submitting data. Please try again.");
      });
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Add User</h5>
            </div>
            <div className="card-body">
              <form className="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      id="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      id="country"
                      placeholder="Enter your country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>

              {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Users</h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={fetchUsers}>Refresh</button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">No users found</td>
                      </tr>
                    ) : (
                      users.map(u => (
                        <tr key={u.id}>
                          <td><span className="badge bg-secondary">{u.id}</span></td>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.city}</td>
                          <td>{u.country}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
