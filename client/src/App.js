import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks, setTasks] = useState(null);

  //Fetch data from server
  const getData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`
      );
      const data = await res.json();
      console.log(data);
      setTasks(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Use useEffect to fetch data
  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  console.log(tasks);

  //Sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"🧾 My to-do-list"} getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} tasks={task} getData={getData} />
          ))}
        </>
      )}
      <p className="copyright">©️ Nelskie 2023</p>
    </div>
  );
}

export default App;
