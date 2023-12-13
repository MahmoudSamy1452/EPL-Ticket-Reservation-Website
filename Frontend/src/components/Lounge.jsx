import Selected from "../assets/seat1.png";
import Seat from "../assets/Selected.png";
import MySeat from "../assets/Mine.png";
import ReservedSeat from "../assets/reserved.png";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect, useState, useContext } from "react";
import { checkToken } from "../scripts/checkToken";
import { ReserveContext } from "../contexts/ReserveContext";

const Lounge = ({ match_id, rows, columns }) => {
  const { toReserve, setToReserve } = useContext(ReserveContext);
  const [arr, setArr] = useState([]);
  const loadSeats = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
      "token"
    )} `;
    await axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/ticket/getTicketsByMatchID/${match_id}`
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (!rows && !columns) return;
          let seats = [];
          for (let i = 0; i < rows; i++) {
            seats.push([]);
            for (let j = 0; j < columns; j++) {
              seats[i].push(0);
            }
          }
          for (let i = 0; i < res.data.tickets.length; i++) {
            let seat_no = res.data.tickets[i].seat_no;
            let row = Math.floor(seat_no / columns);
            let col = seat_no % columns;
            if (res.data.tickets[i].username === Cookie.get("username"))
              seats[row][col] = 2;
            else seats[row][col] = -1;
          }
          setArr(seats);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkToken();
    loadSeats();
  }, [rows, columns]);

  const reserveSeat = (i, j) => {
    setToReserve([...toReserve, i * columns + j]);
    setArr((prev) => {
      let newArr = [...prev];
      newArr[i][j] = 1;
      return newArr;
    });
    // axios.defaults.headers.common["Authorization"] = `Bearer ${Cookie.get(
    //   "token"
    // )}`;
    // axios
    //   .post(`${import.meta.env.VITE_BACKEND_URL}/ticket/addTicket`, {
    //     match_id: match_id,
    //     seat_no: i * columns + j,
    //     username: Cookie.get("username"),
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       loadSeats();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div id="lounge" className="w-full py-8">
      <div className="flex flex-row flex-wrap justify-center items-center w-full">
        {arr.map((row, i) => {
          return (
            <div
              key={i}
              className={`flex flex-wrap justify-center items-center h-12 w-full -translate-y-[${
                i * 22
              }px]`}
            >
              {row.map((col, j) => {
                return (
                  <div
                    key={j}
                    className="h-10 w-10 md:h-16 md:w-16"
                    onClick={() => {
                      if (arr[i][j] == 0 && Cookie.get("role") == 'F') reserveSeat(i, j);
                    }}
                  >
                    <img
                      src={
                        arr[i][j] == -1
                          ? ReservedSeat
                          : arr[i][j] == 0
                          ? Seat
                          : arr[i][j] == 1
                          ? Selected
                          : MySeat
                      }
                    ></img>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lounge;
