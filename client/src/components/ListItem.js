import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import Modal from "./Modal";

function ListItem({ tasks, getData }) {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${tasks.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{tasks.title}</p>
        <ProgressBar progress={tasks.progress} />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          task={tasks}
          getData={getData}
        />
      )}
    </li>
  );
}

export default ListItem;
