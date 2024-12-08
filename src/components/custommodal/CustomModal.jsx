import React from "react";
import { MdDownloadDone } from "react-icons/md";
import "./custommodal.css";
import { IoIosClose } from "react-icons/io";
import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";

const CustomModal = (props) => {
  return (
    <div className="modal-container">
      <form onSubmit={(e) => e.preventDefault} className="modal-form">
        <section className="modal-ribbon">
          <IoIosClose
            className="schedule-appointment-exit-btn" 
            onClick={() => {
              props.handleCancel(false);
            }}
          />
        </section>
        <section className="modal-body">
          {props.result ? (
            <>
              <FcApprove className="modal-icon approve" />
              <p className="approve">Approved</p>
            </>
          ) : (
            <>
              <FcDisapprove className="modal-icon reject" />
              <p className="reject">Rejected</p>
            </>
          )}
        </section>
      </form>
    </div>
  );
};

export default CustomModal;
