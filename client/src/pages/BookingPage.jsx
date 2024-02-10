import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }
  return (
    <div className="mt-4 bg-gray-100 rounded-2xl px-8 py-8 lg:w-2/3 lg:mx-auto">
      <h1 className="text-3xl truncate pb-1">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 px-4 pl-8 py-4 mb-4 rounded-2xl flex gap-4 justify-between items-center">
        <div>
          <h2 className="text-xl">Your Booking Information</h2>
          <BookingDates booking={booking} className="my-2 text-gray-500" />
        </div>
        <div className="bg-primary text-white py-2 px-4 rounded-2xl">
          <div className="text-lg">Total Price</div>
          <div className="text-2xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
