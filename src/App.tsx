
import userService, { User } from "./services/userService";
import useUsers from "./hooks/useUsers";

function App() {


  const { users,error,isLoading,setUsers,setError}= useUsers()

  const ogUsers = [...users];

  const addUser = () => {
    const newUser = { name: "Daniel", id: Date.now() };

    setUsers([newUser, ...users]);
      userService.add(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((error) => {
        setError(error.message);
        setUsers(ogUsers);
      });
  };

  const deleteUser = (user: User) => {
    setUsers(users.filter((userObj) => user.id !== userObj.id));

    userService.delete(user.id).catch((error) => {
      setError(error.message);
      setUsers(ogUsers);
    });
  };

  const updateUser = (user: User) => {
    const updatedUser = { ...user, name: user.name + "!" };

    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

      userService.update(updatedUser)
      .catch((error) => {
        setError(error.message);
        setUsers(ogUsers);
      });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>{" "}
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
