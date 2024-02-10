import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./userContext";

export default function BookingOption({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price: numberOfNights * place.price,
    });
    const bookindId = response.data._id;
    setRedirect("/account/bookings/" + bookindId);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow-md p-2 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-2">
        <div className="flex">
          <div className="py-2 px-4">
            <label>Check In : </label>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              type="date"
            />
          </div>
          <div className="py-2 px-4 border-l">
            <label>Check Out : </label>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              type="date"
            />
          </div>
        </div>
        <div className="py-2 px-4 border-t">
          <label>Number of Guests : </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-2 px-4 border-t">
            <label>Your full name : </label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Your phone number : </label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-2">
        Book this place
        {numberOfNights > 0 && <span> $ {numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
