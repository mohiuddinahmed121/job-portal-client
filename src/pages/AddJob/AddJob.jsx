import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddJob = () => {
   const navigate = useNavigate();
   const { user } = useAuth();

   const handleAddJOb = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const initialData = Object.fromEntries(formData.entries());

      const { min, max, currency, ...newJob } = initialData;

      newJob.salaryRange = { min, max, currency };
      newJob.requirements = newJob.requirements.split("\n");
      newJob.responsibilities = newJob.responsibilities.split("\n");

      fetch("https://job-portal-server-blue-seven.vercel.app/jobs", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newJob),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.insertedId) {
               Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Job  has been added.",
                  showConfirmButton: false,
                  timer: 1500,
               });
               navigate("/myPostedJobs");
            }
         });
   };

   return (
      <div>
         <h2>post a new job</h2>
         {/* <form className="card-body">
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Email</span>
               </label>
               <input type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Password</span>
               </label>
               <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
               />
               <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                     Forgot password?
                  </a>
               </label>
            </div>
            <div className="form-control mt-6">
               <button className="btn btn-primary">Login</button>
            </div>
         </form> */}
         <div className="card bg-base-100 w-full   shadow-2xl">
            <div className="card-body">
               <form onSubmit={handleAddJOb} className="fieldset">
                  {/* job title */}
                  <label className="label">Job Title</label>
                  <input
                     type="text"
                     name="title"
                     className="input w-full"
                     placeholder="Job Title"
                     required
                  />
                  {/* job location */}
                  <label className="label">Job Location</label>
                  <input
                     type="text"
                     name="location"
                     className="input w-full"
                     placeholder="Job Location"
                     required
                  />
                  {/* job Type */}
                  <label className="label">Job Type</label>
                  <select defaultValue="Pick a Job type" className="select select-ghost">
                     <option disabled>Pick a Job type</option>
                     <option>Full-time</option>
                     <option>Intern</option>
                     <option>Part-time</option>
                  </select>
                  {/* job Field */}
                  <label className="label">Job Field</label>
                  <select defaultValue="Pick a Job Field" className="select select-ghost">
                     <option disabled={true}>Pick a Job Field</option>
                     <option>Engineering</option>
                     <option>Marketing</option>
                     <option>Finance</option>
                     <option>Teaching</option>
                  </select>
                  {/* salary range */}

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                     <div>
                        <label className="label">Salary Range</label>
                        <input type="text" name="min" className="input w-full" placeholder="min" />
                     </div>
                     <div>
                        <input type="text" name="max" className="input w-full" placeholder="max" />
                     </div>
                     <div>
                        <select
                           name="currency"
                           defaultValue="Currency"
                           className="select select-ghost"
                        >
                           <option disabled>Currency</option>
                           <option>BDT</option>
                           <option>USD</option>
                           <option>ERO</option>
                           <option>BDT</option>
                        </select>
                     </div>
                  </div>
                  {/* job Description */}
                  <label className="label">Job Description</label>
                  <textarea
                     className="textarea textarea-bordered w-full"
                     name="description"
                     placeholder="Job Description"
                     required
                  ></textarea>
                  {/* Company Name */}
                  <label className="label">Company Name</label>
                  <input
                     type="text"
                     name="Company"
                     className="input w-full"
                     placeholder="Company Name"
                     required
                  />
                  {/* requirements */}
                  <label className="label">Job Requirements</label>
                  <textarea
                     className="textarea textarea-bordered w-full"
                     name="requirements"
                     placeholder="Put each requirements in a new line"
                     required
                  ></textarea>
                  {/* responsibilities */}
                  <label className="label">Job Responsibilities</label>
                  <textarea
                     className="textarea textarea-bordered w-full"
                     name="responsibilities"
                     placeholder="Put each responsibilities in a new line"
                     required
                  ></textarea>
                  {/* HR Name */}
                  <label className="label">HR Name</label>
                  <input
                     type="text"
                     name="hr_name"
                     className="input w-full"
                     placeholder="HR Name"
                     required
                  />
                  {/* HR  email*/}
                  <label className="label">HR Email</label>
                  <input
                     type="text"
                     name="hr_email"
                     defaultValue={user?.email}
                     className="input w-full"
                     placeholder="HR Email"
                     required
                  />
                  {/* applicationDeadline*/}
                  <label className="label">Deadline</label>
                  <input
                     type="date"
                     name="applicationDeadline"
                     className="input w-full"
                     placeholder="Deadline"
                     required
                  />
                  {/*Conpany Logo*/}
                  <label className="label">Company Logo URL</label>
                  <input
                     type="text"
                     name="company_logo"
                     className="input w-full"
                     placeholder="Company Logo URL"
                     required
                  />
                  {/* submit button */}
                  <button className="btn btn-neutral mt-4">Submit</button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddJob;
