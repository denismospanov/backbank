function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ? <BalanceForm setShow={setShow} setStatus={setStatus} /> : <BalanceMsg setShow={setShow} setStatus={setStatus} />}
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Check different account's balance 
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');

  function handle() {
    fetch(`/account/all`)
      .then(response => response.json())
      .then(data => {
        const user = data.find(item => item.email === email);
        if (user) {
          props.setStatus(`Balance: ${user.balance}`);
          props.setShow(false);
          setBalance(user.balance);
        } else {
          props.setStatus('User not found');
        }
      })
      .catch(err => {
        props.setStatus('Error occurred');
        console.log('Error:', err);
      });
  }

  return (
    <>
      Email<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
      /><br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handle}
      >
        Check Balance
      </button>
    </>
  );
}
