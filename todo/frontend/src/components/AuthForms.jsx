function AuthForms({
  registerForm,
  onRegisterChange,
  onRegisterSubmit,
  loginForm,
  onLoginChange,
  onLoginSubmit,
}) {
  return (
    <>
      <section className="card">
        <h2>Register</h2>
        <form onSubmit={onRegisterSubmit} className="row">
          <input
            value={registerForm.name}
            onChange={(event) => onRegisterChange("name", event.target.value)}
            placeholder="Name"
          />
          <input
            type="email"
            value={registerForm.email}
            onChange={(event) => onRegisterChange("email", event.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={registerForm.password}
            onChange={(event) =>
              onRegisterChange("password", event.target.value)
            }
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </form>
      </section>

      <section className="card">
        <h2>Login</h2>
        <form onSubmit={onLoginSubmit} className="row">
          <input
            type="email"
            value={loginForm.email}
            onChange={(event) => onLoginChange("email", event.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={loginForm.password}
            onChange={(event) => onLoginChange("password", event.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
}

export default AuthForms;
