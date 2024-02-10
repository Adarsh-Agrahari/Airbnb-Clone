export default function BookingOption({place}) {
    return (
        <div className="bg-white shadow-md p-2 rounded-2xl">
            <div className="text-2xl text-center">
              Price: ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-2">
              <div className="flex">
                <div className="py-2 px-4">
                  <label>Check In : </label>
                  <input type="date" />
                </div>
                <div className="py-2 px-4 border-l">
                  <label>Check Out : </label>
                  <input type="date" />
                </div>
              </div>
              <div className="py-2 px-4 border-t">
                <label>Guests : </label>
                <input type="number" value={1} />
              </div>
            </div>

            <button className="primary mt-2">Book this place</button>
          </div>
    );
}