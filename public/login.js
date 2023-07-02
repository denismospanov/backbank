function Login() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [status, setStatus] = React.useState('');

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setStatus('');
  };

  const handleLogIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        isLoggedIn ? (
          <LoggedInMsg handleLogOut={handleLogOut} />
        ) : (
          <LoginForm
            handleLogIn={handleLogIn}
            setStatus={setStatus}
          />
        )
      }
    />
  );
}

function LoggedInMsg(props) {
  return (
    <>
      <button
        type="submit"
        className="btn btn-light"
        onClick={props.handleLogOut}
      >
        Log out
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handle() {
    console.log(email, password);
    const url = `account/check/${email}/${password}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Credentials are valid:', data);
      // Proceed with other actions or show success message
      props.handleLogIn();
    } else {
      console.log('Invalid credentials');
      // Handle the error or show error message
      props.setStatus('Invalid Credentials');
      setTimeout(() => {
        props.setStatus('');
      }, 3000); // 3 seconds delay
    }
  }

  return (
    <>
      {props.status === 'Invalid Credentials' && (
        <div className="error-message">Invalid credentials</div>
      )}

      Email<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />

      Password<br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />

      <button type="submit" className="btn btn-light" onClick={handle}>
        Log In
      </button>
    </>
  );
}
