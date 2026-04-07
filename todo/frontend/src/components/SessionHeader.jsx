function SessionHeader({ currentUser, onLogout }) {
  return (
    <section className="card">
      <div className="row header-row">
        <h2>Welcome, {currentUser.name}</h2>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <p className="hint">Logged in as {currentUser.email}</p>
    </section>
  );
}

export default SessionHeader;
