import PropTypes from "prop-types"

const LoginForm = ({ 
  handleSubmit, 
  handleUsernameChange, 
  handlePasswordChange, 
  username, 
  password }) => {

  return (
    <form onSubmit={handleSubmit} data-testid="login-form" >
      <h2>Log in</h2>
      <div>
        <label>
          {"Username: "}
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
      </div>
      <div>
        <label>
          {"Password: "}
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm