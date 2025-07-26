import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ViewApplications = () => {
   const application = useLoaderData();

   const handleStatusUpdate = (e, id) => {
      console.log(e.target.value, id);
      const data = {
         status: e.target.value,
      };
      fetch(`http://localhost:5000/job-application/${id}`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.modifiedCount) {
               Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Status has been updated.",
                  showConfirmButton: false,
                  timer: 1500,
               });
            }
         });
   };

   return (
      <div>
         <h2>Applications for this job : {application.length}</h2>
         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th></th>
                     <th>Email</th>
                     <th>Status</th>
                     <th>Update Status</th>
                  </tr>
               </thead>
               <tbody>
                  {application.map((app, index) => (
                     <tr key={app.id}>
                        <th>{index + 1}</th>
                        <td>{app.applicant_email}</td>
                        <td>Quality Control Specialist</td>
                        <td>
                           <select
                              onChange={(e) => handleStatusUpdate(e, app._id)}
                              defaultValue={app.status || "Change Status"}
                              className="select select-xs"
                           >
                              <option disabled={true}>Change Status</option>
                              <option>Under Review</option>
                              <option>Hired</option>
                              <option>Rejected</option>
                           </select>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ViewApplications;
