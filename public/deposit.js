function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  // Function to set the error message
  function setError(message) {
    setStatus(message);
    setShow(true);
    setTimeout(() => {
      setStatus('');
    }, 3000); // 3 seconds delay
  }

  function DepositMsg(props) {
    return (
      <>
        <h5>Success!</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >
          Deposit again
        </button>
      </>
    );
  }

  function DepositForm(props) {
    const [email, setEmail] = React.useState('');
    const [amount, setAmount] = React.useState('');

    // Connect to backend
    async function handle() {
      console.log(email, amount);

      if (!isPositiveNumber(amount)) {
        props.setError('Amount must be a positive number');
        setTimeout(() => {
          props.setError('');
        }, 3000); // 3 seconds delay
        return;
      }

      // Check if the email exists in the database
      const checkRes = await fetch(`account/checkemail/${email}`, {
        method: 'GET',
      });

      if (checkRes.status === 200) {
        console.log('Email exists in the database');

        // Proceed with the deposit
        const updateRes = await fetch(`account/update/${email}/${amount}`, {
          method: 'GET',
        });

        // Check if the update was successful
        if (updateRes.status === 200) {
          console.log('Database updated successfully');
          // Proceed with other actions or show success message
        } else {
          console.log('Failed to update the database');
          // Handle the error or show error message
        }

        props.setShow(false);
      } else {
        console.log('Email does not exist in the database');
        props.setError('Email does not exist in the database');
      }

      setTimeout(() => {
        props.setError('');
      }, 3000); // 3 seconds delay
    }

    // Helper function to check if a value is a positive number
    function isPositiveNumber(value) {
      return !isNaN(parseFloat(value)) && parseFloat(value) > 0;
    }

    return (
      <>
        Email<br />
        <input
          type="input"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />

        Amount<br />
        <input
          type="number"
          className="form-control"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.currentTarget.value)}
        />
        <br />

        <button type="submit" className="btn btn-light" onClick={handle}>
          Deposit
        </button>
      </>
    );
  }

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setShow={setShow} setError={setError} />
        ) : (
          <DepositMsg setShow={setShow} />
        )
      }
    />
  );
}
