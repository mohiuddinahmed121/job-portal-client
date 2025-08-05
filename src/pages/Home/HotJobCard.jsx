import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const HotJobCard = ({ job }) => {
   const { _id, title, company, company_logo, requirements, description, location, salaryRange } =
      job;

   return (
      <div className="card bg-base-100 shadow-sm">
         <div className="flex gap-2 m-2">
            <figure>
               <img className="w-16" src={company_logo} alt="Shoes" />
            </figure>
            <div>
               <h4 className="text-2xl">{company}</h4>
               <p className="flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {location}
               </p>
            </div>
         </div>
         <div className="card-body">
            <h2 className="card-title">
               {title}
               <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{description}</p>
            <div className="flex gap-2 flex-wrap">
               {requirements
                  ? requirements.map((skill, index) => (
                       <p
                          key={index}
                          className="border rounded-md text-center px-2 hover:text-blue-300 hover:bg-gray-50"
                       >
                          {skill}
                       </p>
                    ))
                  : "No requirements"}
            </div>
            <div className="card-actions justify-end items-center mt-4">
               <p className="flex items-center">
                  Salary: <FaDollarSign /> {salaryRange.min} - {salaryRange.max}{" "}
                  {salaryRange.currency}
               </p>
               <Link to={`/jobs/${_id}`}>
                  <button className="btn btn-primary">Apply</button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default HotJobCard;
