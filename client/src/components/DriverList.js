import React from "react";
import { useNavigate } from "react-router-dom";

const DriverList = ({ driver }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/driver/apply/${driver._id}`)}
      >
        <div className="card-header">
          Dr. {driver.firstName} {driver.lastName}
        </div>
        <div className="card-body text-danger">
          <p>
            <b>Vehicle</b> {doctor.vehicle}
          </p>
          <p>
            <b>Experience</b> {doctor.experience}
          </p>
          {/* <p>
            <b>Fees Per Cunsaltation</b> {doctor.feesPerCunsaltation}
          </p> */}
          {/* <p>
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p> */}
        </div>
      </div>
    </>
  );
};

export default DriverList;