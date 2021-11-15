function Logout(props) {

  return (
    <div>
      <div className="logout">
        <button>Username: {props.username}</button>
      </div>
      <div className="logout buffer">
      </div>
    </div>
  );
}

export default Logout;