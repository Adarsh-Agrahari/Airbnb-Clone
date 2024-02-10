import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="w-2/3 mx-auto">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={"/account/bookings/" + booking._id}
              className="mt-4 flex cursor-pointer gap-4 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className=" flex w-40 h-30 bg-gray-300 shrink-0">
                <PlaceImg place={booking.place} />
              </div>
              <div className="grow pr-3 my-2">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="">
                  <BookingDates
                    booking={booking}
                    className="mb-2 mt-2 text-gray-500"
                  />
                  <div className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    <span className="text-xl">
                      Total Price : ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
