import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookie from "js-cookie";
import Pyramids from "../assets/pyramids.png";
import Zed from "../assets/ZED.png";
import Ittihad from "../assets/Ittihad.png";
import Mahalla from "../assets/Mahalla.png";

const Ticket = ({
  ticket_no,
  team1_id,
  team2_id,
  team1,
  team2,
  date,
  seat_no,
  stadium,
  tickets,
  setTickets,
}) => {
  const handleClick = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
      "token"
    )}`;
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/deleteTicket/${ticket_no}`
      )
      .then((res) => {
        console.log(res);
        setTickets(tickets.filter((ticket) => ticket.ticket_no !== ticket_no));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const matchDate = new Date(date);
  const maxDelete = new Date(date);
  maxDelete.setDate(matchDate.getDate() - 3);
  return (
    <div className=" min-w-fit w-2/3 mt-8">
      <h1 className="bg-blue-950 p-3 rounded-t-md">
        Ticket
        <FontAwesomeIcon
          style={{ visibility: new Date() > maxDelete ? "hidden" : "visible" }}
          icon={faTrashCan}
          className="w-6 float-right text-red-600 cursor-pointer hover:text-red-900"
          onClick={handleClick}
        />
      </h1>
      <div className="bg-white text-black p-3 rounded-b-md">
        <p>Seat No: {seat_no}</p>
        <p>Ticket No: {ticket_no}</p>
        <p>Match Date: {matchDate.toDateString()}</p>
        <p>Stadium: {stadium}</p>
        <div className="flex justify-around">
          <div className="flex flex-col justify-center align-text-bottom">
            <img
              className="max-w-[100px]  m-auto"
              src={
                team1_id > 4
                  ? `https://media.api-sports.io/football/teams/${team1_id}.png`
                  : team1_id == 1
                  ? Zed
                  : team1_id == 2
                  ? Ittihad
                  : team1_id == 3
                  ? Pyramids
                  : Mahalla
              }
              alt=""
            />
            <h3>{team1}</h3>
          </div>
          <p className="my-auto text-4xl">vs</p>
          <div className="flex flex-col justify-center align-text-bottom">
            <img
              className="max-w-[100px] m-auto"
              src={
                team2_id > 4
                  ? `https://media.api-sports.io/football/teams/${team2_id}.png`
                  : team2_id == 1
                  ? Zed
                  : team2_id == 2
                  ? Ittihad
                  : team2_id == 3
                  ? Pyramids
                  : Mahalla
              }
              alt=""
            />
            <h3>{team2}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
