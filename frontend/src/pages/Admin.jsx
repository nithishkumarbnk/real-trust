import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  getClients,
  createClient,
  deleteClient,
  updateClient,
  getContacts,
  deleteContact,
  getSubscribers,
  deleteSubscriber,
} from "../services/api";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("projects");
  const [loading, setLoading] = useState(false);

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [projectImagePreview, setProjectImagePreview] = useState("");
  const [editingProject, setEditingProject] = useState(null);

  // Clients state
  const [clients, setClients] = useState([]);
  const [clientForm, setClientForm] = useState({
    name: "",
    description: "",
    designation: "",
    image: null,
  });
  const [clientImagePreview, setClientImagePreview] = useState("");
  const [editingClient, setEditingClient] = useState(null);

  // Contacts state
  const [contacts, setContacts] = useState([]);
  const [contactSearch, setContactSearch] = useState("");

  // Subscribers state
  const [subscribers, setSubscribers] = useState([]);
  const [subscriberSearch, setSubscriberSearch] = useState("");

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [projectsRes, clientsRes, contactsRes, subscribersRes] =
        await Promise.all([
          getProjects(),
          getClients(),
          getContacts(),
          getSubscribers(),
        ]);
      setProjects(projectsRes.data);
      setClients(clientsRes.data);
      setContacts(contactsRes.data);
      setSubscribers(subscribersRes.data);
    } catch (error) {
      toast.error("Failed to load data");
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Project handlers
  const handleProjectImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      setProjectForm({ ...projectForm, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setProjectImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    if (!projectForm.name || !projectForm.description) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!editingProject && !projectForm.image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", projectForm.name);
    formData.append("description", projectForm.description);
    if (projectForm.image) {
      formData.append("image", projectForm.image);
    }

    try {
      setLoading(true);
      if (editingProject) {
        await updateProject(editingProject._id, formData);
        toast.success("Project updated successfully!");
        setEditingProject(null);
      } else {
        await createProject(formData);
        toast.success("Project added successfully!");
      }
      setProjectForm({ name: "", description: "", image: null });
      setProjectImagePreview("");
      loadAllData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await deleteProject(id);
      toast.success("Project deleted successfully!");
      loadAllData();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      description: project.description,
      image: null,
    });
    setProjectImagePreview(project.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditProject = () => {
    setEditingProject(null);
    setProjectForm({ name: "", description: "", image: null });
    setProjectImagePreview("");
  };

  // Client handlers
  const handleClientImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setClientForm({ ...clientForm, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setClientImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();

    if (
      !clientForm.name ||
      !clientForm.description ||
      !clientForm.designation
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!editingClient && !clientForm.image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", clientForm.name);
    formData.append("description", clientForm.description);
    formData.append("designation", clientForm.designation);
    if (clientForm.image) {
      formData.append("image", clientForm.image);
    }

    try {
      setLoading(true);
      if (editingClient) {
        await updateClient(editingClient._id, formData);
        toast.success("Client updated successfully!");
        setEditingClient(null);
      } else {
        await createClient(formData);
        toast.success("Client added successfully!");
      }
      setClientForm({
        name: "",
        description: "",
        designation: "",
        image: null,
      });
      setClientImagePreview("");
      loadAllData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save client");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await deleteClient(id);
      toast.success("Client deleted successfully!");
      loadAllData();
    } catch (error) {
      toast.error("Failed to delete client");
    }
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setClientForm({
      name: client.name,
      description: client.description,
      designation: client.designation,
      image: null,
    });
    setClientImagePreview(client.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditClient = () => {
    setEditingClient(null);
    setClientForm({ name: "", description: "", designation: "", image: null });
    setClientImagePreview("");
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      await deleteContact(id);
      toast.success("Contact deleted successfully!");
      loadAllData();
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  const handleDeleteSubscriber = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?"))
      return;

    try {
      await deleteSubscriber(id);
      toast.success("Subscriber deleted successfully!");
      loadAllData();
    } catch (error) {
      toast.error("Failed to delete subscriber");
    }
  };

  // Export to CSV
  const exportContactsToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Full Name,Email,Mobile,City,Date\n" +
      contacts
        .map(
          (c) =>
            `${c.fullName},${c.email},${c.mobile},${c.city},${new Date(c.createdAt).toLocaleDateString()}`,
        )
        .join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute(
      "download",
      `contacts_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.click();
    toast.success("Contacts exported successfully!");
  };

  const exportSubscribersToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Email,Date\n" +
      subscribers
        .map((s) => `${s.email},${new Date(s.createdAt).toLocaleDateString()}`)
        .join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute(
      "download",
      `subscribers_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.click();
    toast.success("Subscribers exported successfully!");
  };

  // Filter functions
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(contactSearch.toLowerCase()) ||
      contact.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
      contact.city.toLowerCase().includes(contactSearch.toLowerCase()),
  );

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(subscriberSearch.toLowerCase()),
  );

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div>
          <h1>Admin Panel</h1>
          <p>Manage your real estate platform</p>
        </div>
        <div className="admin-stats">
          <div className="stat-box">
            <span className="stat-number">{projects.length}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{clients.length}</span>
            <span className="stat-label">Clients</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{contacts.length}</span>
            <span className="stat-label">Contacts</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{subscribers.length}</span>
            <span className="stat-label">Subscribers</span>
          </div>
        </div>
        <a href="/" className="back-btn">
          ← Back to Home
        </a>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          📂 Projects
        </button>
        <button
          className={`tab-btn ${activeTab === "clients" ? "active" : ""}`}
          onClick={() => setActiveTab("clients")}
        >
          👥 Clients
        </button>
        <button
          className={`tab-btn ${activeTab === "contacts" ? "active" : ""}`}
          onClick={() => setActiveTab("contacts")}
        >
          📧 Contacts ({contacts.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "subscribers" ? "active" : ""}`}
          onClick={() => setActiveTab("subscribers")}
        >
          📬 Subscribers ({subscribers.length})
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="admin-section">
          <h2>{editingProject ? "Edit Project" : "Add New Project"}</h2>
          <form onSubmit={handleProjectSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Project Name *</label>
                <input
                  type="text"
                  required
                  value={projectForm.name}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, name: e.target.value })
                  }
                  placeholder="Enter project name"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>
                  Project Image *{" "}
                  {editingProject && "(Leave empty to keep current)"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProjectImageChange}
                  disabled={loading}
                />
              </div>
            </div>

            {projectImagePreview && (
              <div className="image-preview">
                <img src={projectImagePreview} alt="Preview" />
              </div>
            )}

            <div className="form-group">
              <label>Project Description *</label>
              <textarea
                required
                rows="4"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value,
                  })
                }
                placeholder="Enter project description"
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading
                  ? "Processing..."
                  : editingProject
                    ? "Update Project"
                    : "Add Project"}
              </button>
              {editingProject && (
                <button
                  type="button"
                  onClick={cancelEditProject}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <h3>All Projects ({projects.length})</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td>
                      <img
                        src={project.image}
                        alt={project.name}
                        className="table-img"
                      />
                    </td>
                    <td>{project.name}</td>
                    <td className="description-cell">{project.description}</td>
                    <td>
                      <button
                        onClick={() => handleEditProject(project)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === "clients" && (
        <div className="admin-section">
          <h2>{editingClient ? "Edit Client" : "Add New Client"}</h2>
          <form onSubmit={handleClientSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Client Name *</label>
                <input
                  type="text"
                  required
                  value={clientForm.name}
                  onChange={(e) =>
                    setClientForm({ ...clientForm, name: e.target.value })
                  }
                  placeholder="Enter client name"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Designation *</label>
                <input
                  type="text"
                  required
                  value={clientForm.designation}
                  onChange={(e) =>
                    setClientForm({
                      ...clientForm,
                      designation: e.target.value,
                    })
                  }
                  placeholder="e.g., CEO, Homeowner"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Client Image *{" "}
                {editingClient && "(Leave empty to keep current)"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleClientImageChange}
                disabled={loading}
              />
            </div>

            {clientImagePreview && (
              <div className="image-preview">
                <img src={clientImagePreview} alt="Preview" />
              </div>
            )}

            <div className="form-group">
              <label>Testimonial *</label>
              <textarea
                required
                rows="4"
                value={clientForm.description}
                onChange={(e) =>
                  setClientForm({ ...clientForm, description: e.target.value })
                }
                placeholder="Enter client testimonial"
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading
                  ? "Processing..."
                  : editingClient
                    ? "Update Client"
                    : "Add Client"}
              </button>
              {editingClient && (
                <button
                  type="button"
                  onClick={cancelEditClient}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <h3>All Clients ({clients.length})</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Testimonial</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td>
                      <img
                        src={client.image}
                        alt={client.name}
                        className="table-img"
                      />
                    </td>
                    <td>{client.name}</td>
                    <td>{client.designation}</td>
                    <td className="description-cell">{client.description}</td>
                    <td>
                      <button
                        onClick={() => handleEditClient(client)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contacts Tab */}
      {activeTab === "contacts" && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Contact Form Submissions ({contacts.length})</h2>
            <div className="header-actions">
              <input
                type="text"
                placeholder="Search contacts..."
                value={contactSearch}
                onChange={(e) => setContactSearch(e.target.value)}
                className="search-input"
              />
              {contacts.length > 0 && (
                <button onClick={exportContactsToCSV} className="export-btn">
                  📥 Export to CSV
                </button>
              )}
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>City</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-cell">
                      {contactSearch
                        ? "No contacts found"
                        : "No contact submissions yet"}
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.fullName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.mobile}</td>
                      <td>{contact.city}</td>
                      <td>
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subscribers Tab */}
      {activeTab === "subscribers" && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Newsletter Subscribers ({subscribers.length})</h2>
            <div className="header-actions">
              <input
                type="text"
                placeholder="Search subscribers..."
                value={subscriberSearch}
                onChange={(e) => setSubscriberSearch(e.target.value)}
                className="search-input"
              />
              {subscribers.length > 0 && (
                <button onClick={exportSubscribersToCSV} className="export-btn">
                  📥 Export to CSV
                </button>
              )}
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Email Address</th>
                  <th>Subscribed Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="empty-cell">
                      {subscriberSearch
                        ? "No subscribers found"
                        : "No subscribers yet"}
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber._id}>
                      <td>{subscriber.email}</td>
                      <td>
                        {new Date(subscriber.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteSubscriber(subscriber._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
