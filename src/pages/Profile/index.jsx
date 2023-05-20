import { useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const [fuel_price, setFuel_price] = useState("");
  const [working_hours, setWorking_hours] = useState("");
  const [isOpenNow, setisOpenNow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/v2/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fuel_price,
        place_id: "ChIJM7SXfzT1rjgRimvxXEfieZY",
        isOpenNow,
        working_hours,
      }),
    })
      .then(() => {
        toast.success("Successfully updated");
        setFuel_price("");
        setWorking_hours("");
      })
      .catch((err) => {
        toast.error(err.error);
      });
  };

  const isBtnDisabled = [fuel_price, working_hours, isOpenNow].every(Boolean);
  return (
    <div className="w-full h-auto min-h-[50vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-[1550px] min-h-[500px] m-auto px-4"
        autoComplete="off"
      >
        <div>
          <p className="text-[18px]">Fuel price</p>
          <input
            value={fuel_price}
            onChange={(e) => setFuel_price(e.target.value)}
            className="border rounded-lg indent-4 border-slate-500 focus:outline-green-600 w-full h-14 max-w-sm my-3"
            type="number"
            min="0"
            required
          />
        </div>
        <div>
          <p className="text-[18px]">Working hours</p>
          <textarea
            className="border rounded-lg indent-4 border-slate-500 focus:outline-green-600 w-full max-w-sm my-3 py-2"
            required
            rows={3}
            value={working_hours}
            onChange={(e) => setWorking_hours(e.target.value)}
          ></textarea>
        </div>
        <div>
          <p className="text-[18px]">Is open</p>
          <select
            value={isOpenNow}
            required
            onChange={(e) => setisOpenNow(e.target.value)}
            className="border rounded-lg border-slate-500 focus:outline-green-600 w-full h-14 max-w-sm my-3"
          >
            <option value={false}>Closed</option>
            <option value={true}>Open</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-5 py-3 w-full my-6 max-w-sm bg-green-400 text-white  rounded-md"
          disabled={!isBtnDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
