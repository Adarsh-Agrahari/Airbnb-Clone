import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingOption from "../BookingOption";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 rounded-2xl px-8 py-8 lg:w-2/3 lg:mx-auto">
      <h1 className="text-3xl truncate pb-1">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-4">
        <div>
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-In : {place.checkIn}
          <br />
          Check-Out : {place.checkOut}
          <br />
          Max no. of guests : {place.maxGuests}
        </div>
        <div>
          <BookingOption place={place} />
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-2xl">Extra Info</h2>
        <div className="my-2 text-md text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
