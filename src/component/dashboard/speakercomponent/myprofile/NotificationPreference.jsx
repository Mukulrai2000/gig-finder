import React, { Fragment, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { Typeahead } from "react-bootstrap-typeahead";
import { FaTimes } from "react-icons/fa";

import MyProfileSidebar from "./MyProfileSidebar";
import { toast } from "react-toastify";

const NotificationPreference = () => {
  const [recEmails, setRecEmails] = useState("");
  const [digEmails, setDigEmails] = useState("");
  const [eventOrganize, setEventOrganize] = useState("");
  const [gigFinderPlus, setGigFinderPlus] = useState("");
  const [remindeEmail, setRemindeEmail] = useState("");
  const [interviewAndTrends, setInterviewAndTrends] = useState("");
  const [recommendEmails, setRecommendEmails] = useState("");
  const [applyFor, setApplyFor] = useState("");
  const [comments, setComments] = useState("");
  const [assistantEmail, setAssistantEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [chips, setChips] = useState([]);
  const [specificTopics, setSpecificTopics] = useState("");
  const [validationError, setValidationError] = useState("");
  const [interestEvents, setInterestEvents] = useState("");
  

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const receiveEmails = ["me only", "my assistant only", "both of us"];
  const digestEmail = ["no", "yes"];
  const eventOrganizers = ["no", "yes"];
  const viaGigfinderplus = ["no", "yes"];
  const reminderEmails = ["no", "yes"];
  const interviewTrends = ["no", "yes"];
  const recommendationEmails = ["no", "yes"];
  const appliedFor = ["no", "yes"];
  const eventComments = ["no", "yes"];
  const Topics = ["one", "two", "three"];
  const interestedEvents = [
    "Conference (Full-day Event)",
    "Workshop (3+ hour Event)",
    "Session (1-2 hour Event)",
    "Moderator",
    "Webinar (Virtual Event)",
    "School (incl. charity)",
    "Meetup",
    "Panel",
    "Certificate Program",
    "Emcee",
  ];
  const includeEvents = [
    {
      speakingFee: "negotiable",
      eventLocation: ["Worldwide", "United States", "North America", "Idaho"],
    },
    {
      speakingFee: "Up to $250",
      eventLocation: ["Worldwide", "United States", "North America", "Idaho"],
    },
    {
      speakingFee: "$250 - $1,500",
      eventLocation: ["Worldwide", "United States", "North America", "Idaho"],
    },
    {
      speakingFee: "$1,500 - $5,000",
      eventLocation: ["Worldwide", "United States", "North America", "Idaho"],
    },
    {
      speakingFee: "$5,000 - $10,000",
      eventLocation: ["Worldwide", "United States", "North America", "Idaho"],
    },
    {
      speakingFee: "more than $10,000",
      eventLocation: ["Worldwide", "United States", "North America", "Idaho"],
    },
    {
      speakingFee: "free",
      eventLocation: ["Worldwide", "United States", "North America", "Idaho"],
    },
  ];


  const handleSaveDataValidation = () => {
    if (!recEmails) {
      toast.warn("Please choose who shall recieve emails");
    } else if (
      (recEmails === "my assistant only" || recEmails === "both of us") &&
      !assistantEmail
    ) {
      toast.warn("Enter my assistant email");
    } else if (
      (recEmails === "my assistant only" || recEmails === "both of us") &&
      !emailRegex.test(assistantEmail)
    ) {
      toast.warn("Invalid email!");
    } else if (!digEmails) {
      toast.warn("Please choose calls for speaker weekly digest email");
    } else if (!eventOrganize) {
      toast.warn("Please choose emails from event organizers");
    } else if (interestEvents.length < 1) {
      toast.warn("Please select which types of events are you interested in");
    } else if (selectedTopics.length < 1) {
      toast.warn("Please select which board topics are you interested");
    } else if (specificTopics) {
      toast.warn("Please press enter in specific topics");
    } else if (chips.length < 1) {
      toast.warn("Please select specific topics are you interested");
    } else if (!gigFinderPlus) {
      toast.warn("Please choose can speakers contact you via gigfinderplus");
    } else if (!remindeEmail) {
      toast.warn("Please choose profile reminder emails");
    } else if (!interviewAndTrends) {
      toast.warn("Please choose speaking tips, interviews and trends");
    } else if (!recommendEmails) {
      toast.warn("Please choose recommendation emails");
    } else if (!applyFor) {
      toast.warn("Please choose updates about an event you have applied for");
    } else if (!comments) {
      toast.warn("Please choose emails about event comments");
    } else {
      toast.warn("Successfull");
    }
  };

  // Handle specific topics tags add
  const handlePressEnter = (e) => {
    // don't submit the form if the user presses 'Enter'
    if (e.key === "Enter") e.preventDefault();
    // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
    if (e.key !== "Enter" || !specificTopics) return;
    // need to show error if the user tries to add the same input more than once
    if (chips.includes(specificTopics)) {
      return setValidationError("Cannot add the same input more than once");
    }
    // adding the input value to chips array
    setChips((prevState) => [...prevState, e.target.value]);
    // clearing the input box
    setSpecificTopics("");
    // clearing error message
    setValidationError("");
  };

  const removeChip = (chipToRemove) => {
    // filtering out the chip that the user wants to remove
    const updatedChips = chips.filter((chip) => chip !== chipToRemove);
    setChips(updatedChips);
  };

  const handleCheckboxInterestedEvent = (d) => {
    setInterestEvents((data) => {
      if (data?.includes(d)) {
        return data?.filter((data) => data !== d);
      } else {
        return [...data, d];
      }
    });
  };

  const [selectedFees, setSelectedFees] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({});

  console.log("selectedFees",selectedFees);
  console.log("selectedLocations",selectedLocations);
  

  const handleFeeSelection = (fee) => {
    const updatedFees = selectedFees.includes(fee.speakingFee)
      ? selectedFees.filter((selectedFee) => selectedFee !== fee.speakingFee)
      : [...selectedFees, fee.speakingFee];

    setSelectedFees(updatedFees);
    setSelectedLocations((prevLocations) => ({
      ...prevLocations,
      [fee.speakingFee]: prevLocations[fee.speakingFee] || fee.eventLocation[0]
    }));
    console.log("??????????",getSelectedData(updatedFees));
  };

  const handleLocationSelection = (fee, event) => {
    setSelectedLocations((prevLocations) => ({
      ...prevLocations,
      [fee.speakingFee]: event.target.value
    }));
  };

  const getSelectedData = (fees) => {
    const selectedData = [];
    includeEvents.forEach((event) => {
      if (fees.includes(event.speakingFee)) {
        const eventData = {
          speakingFee: event.speakingFee,
          eventLocation: selectedLocations[event.speakingFee]
        };
        selectedData.push(eventData);
      }
    });
    return selectedData;
  };

  return (
    <Fragment>
      <Helmet>
        <title>Notification-Preferences</title>
      </Helmet>
      <div className="my-profile-page">
        <MyProfileSidebar />
        <div className="mp-right-panel" id="mp-notification-preference">
          <div className="mp-form-heading">Notification Preferences</div>
          <form action="" className="row">
            <span className="form-caption text-grey first-form-caption">
              You can adjust your event alerts and emails from organizers under
              the Event invitations & Alerts tab.
            </span>
            <div className="col-md-12 form-group-head">
              <label htmlFor="" className="form-label">
                Who shall receive emails
              </label>
              <div className="form-group">
                {receiveEmails.map((data, index) => {
                  return (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="recEmails"
                        // id="me-only"
                        value={data}
                        checked={recEmails === data}
                        onChange={(e) => setRecEmails(e.target.value)}
                      />
                      <label className="form-check-label">{data}</label>
                    </div>
                  );
                })}
              </div>
              <span className="form-caption text-grey">
                Event alerts and other messages will be sent to the email you
                provide.
              </span>
              {recEmails === "my assistant only" ||
              recEmails === "both of us" ? (
                <>
                  {" "}
                  <label htmlFor="" className="form-label">
                    My assistant's email
                  </label>
                  <input
                    type="text"
                    id="tags"
                    className="form-control"
                    placeholder="Enter my assistant email..."
                    value={assistantEmail}
                    onChange={(e) => setAssistantEmail(e.target.value)}
                  />
                </>
              ) : (
                ""
              )}
            </div>

            <div className="col-md-12 form-group-head">
              <label htmlFor="" className="form-label">
                Calls for speaker weekly digest email
              </label>
              <div className="form-group">
                {digestEmail.map((data, index) => {
                  return (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="digEmails"
                        // id="no"
                        value={data}
                        checked={digEmails === data}
                        onChange={(e) => setDigEmails(e.target.value)}
                      />
                      <label className="form-check-label">{data}</label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-md-12 form-group-head">
              <label htmlFor="" className="form-label">
                E-mails from event organizers
              </label>
              <div className="form-group">
                {eventOrganizers.map((data, index) => {
                  return (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="eventOrganize"
                        // id="flexRadioDefault1"
                        value={data}
                        checked={eventOrganize === data}
                        onChange={(e) => setEventOrganize(e.target.value)}
                      />
                      <label className="form-check-label">{data}</label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-md-12 form-group">
              <label htmlFor="" className="form-label">
                Get email alerts about events seeking speakers
              </label>

              <div
                className="generate-panel row"
                id="alerts-events-seek-speakers-panel"
              >
                <label htmlFor="" className="form-label first-form-label">
                  INCLUDE EVENTS WITH SPEAKING FEES
                </label>
                <div className="col-md-6">Speaking fee</div>
                <div className="col-md-6">Event location</div>
                {includeEvents.map((data, index) => {
                  return (
                    <>
                      <div className="col-md-6" key={index}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedFees.includes(data.speakingFee)}
                            onChange={() => handleFeeSelection(data)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={data.speakingFee}
                          >
                            {data.speakingFee}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          defaultValue="0"
                          value={selectedLocations[data.speakingFee] || data.eventLocation[0]}
                          onChange={(event) => {handleLocationSelection(data, event)}}
                        >
                          <option value="0">Select</option>
                          {data.eventLocation.map((opt, index) => {
                            return <option key={index} value={opt}>{opt}</option>;
                          })}
                        </select>
                      </div>
                    </>
                  );
                })}
                <div className="col-md-12">
                  <label htmlFor="" className="form-label">
                    WHICH TYPES OF EVENTS ARE YOU INTERESTED IN?
                  </label>
                  {interestedEvents.map((data, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="flexRadioDefault"
                          id={data}
                          checked={interestEvents?.includes(data)}
                          onChange={() => handleCheckboxInterestedEvent(data)}
                        />
                        <label className="form-check-label" htmlFor={data}>
                          {data}
                        </label>
                      </div>
                    );
                  })}
                </div>

                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    WHICH BROAD TOPICS ARE YOU INTERESTED IN?
                  </label>
                  <Typeahead
                    labelKey="topic"
                    id="basic-example"
                    className={`${
                      selectedTopics?.length < 1 ? `empty-select-tag` : ``
                    }`}
                    onChange={setSelectedTopics}
                    options={Topics}
                    placeholder="Choose topics..."
                    selected={selectedTopics}
                    multiple
                  />

                  <span className="form-caption text-grey">
                    We'll send you alerts based on your broad topic preferences.
                  </span>
                </div>

                <div className="col-md-12 form-group">
                  <label htmlFor="" className="form-label">
                    WHICH SPECIFIC TOPICS ARE YOU INTERESTED IN?
                  </label>
                  <div className="chip-tag-head">
                    <ul className="chips">
                      {chips &&
                        chips?.map((chip, index) => (
                          <div key={index} className="chip">
                            <span>{chip}</span>
                            <FaTimes onClick={() => removeChip(chip)} />
                          </div>
                        ))}
                    </ul>
                    <input
                      type="text"
                      id="tags"
                      className="form-control"
                      placeholder="Press Enter to add tag"
                      value={specificTopics}
                      onChange={(e) => setSpecificTopics(e.target.value)}
                      onKeyDown={handlePressEnter}
                    />
                    <div>
                      {validationError && (
                        <p className="error-message">{validationError}</p>
                      )}
                    </div>
                  </div>
                  {/* ADD KEYWORD INPUT */}

                  <span className="form-caption text-grey">
                    Each time we find an event with a matching tag, we'll alert
                    you about it. Add as many tags as you like.
                  </span>
                </div>
              </div>

              <div className="col-md-12 form-group-head">
                <label htmlFor="" className="form-label">
                  Can speakers contact you via gigfinderplus?
                </label>
                <div className="form-group">
                  {viaGigfinderplus.map((data, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gigFinderPlus"
                          // id="flexRadioDefault1"
                          value={data}
                          checked={gigFinderPlus === data}
                          onChange={(e) => setGigFinderPlus(e.target.value)}
                        />
                        <label className="form-check-label">{data}</label>
                      </div>
                    );
                  })}
                </div>
                <span className="form-caption text-grey">
                  Registered speakers, event organizers and agencies can contact
                  you on your speaker page.
                </span>
              </div>

              <div className="col-md-12 form-group-head">
                <label htmlFor="" className="form-label">
                  Profile reminder emails
                </label>
                <div className="form-group">
                  {reminderEmails.map((data, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="remindeEmail"
                          // id="flexRadioDefault1"
                          value={data}
                          checked={remindeEmail === data}
                          onChange={(e) => setRemindeEmail(e.target.value)}
                        />
                        <label className="form-check-label">{data}</label>
                      </div>
                    );
                  })}
                </div>
                <span className="form-caption text-grey">
                  E-mail reminders about making your speaker profile more
                  robust.
                </span>
              </div>

              <div className="col-md-12 form-group-head">
                <label htmlFor="" className="form-label">
                  Speaking tips, interviews and trends
                </label>
                <div className="form-group">
                  {interviewTrends.map((data, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="interviewAndTrends"
                          // id="flexRadioDefault1"
                          value={data}
                          checked={interviewAndTrends === data}
                          onChange={(e) =>
                            setInterviewAndTrends(e.target.value)
                          }
                        />
                        <label className="form-check-label">{data}</label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col-md-12 form-group-head">
                <label htmlFor="" className="form-label">
                  Recommendation emails
                </label>
                <div className="form-group">
                  {recommendationEmails.map((data, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="recommendEmails"
                          // id="flexRadioDefault1"
                          value={data}
                          checked={recommendEmails === data}
                          onChange={(e) => setRecommendEmails(e.target.value)}
                        />
                        <label className="form-check-label">{data}</label>
                      </div>
                    );
                  })}
                </div>
                <span className="form-caption text-grey">
                  Get notified when someone recommends your speaker profile.
                </span>
              </div>

              <div className="col-md-12 form-group-head">
                <label htmlFor="" className="form-label">
                  Updates about an event you've applied for
                </label>
                <div className="form-group">
                  {appliedFor.map((data, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="applyFor"
                          // id="flexRadioDefault1"
                          value={data}
                          checked={applyFor === data}
                          onChange={(e) => setApplyFor(e.target.value)}
                        />
                        <label className="form-check-label">{data}</label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col-md-12 form-group-head">
                <label htmlFor="" className="form-label">
                  E-mails about event comments
                </label>
                <div className="form-group">
                  {eventComments.map((data, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="comments"
                          // id="flexRadioDefault1"
                          value={data}
                          checked={comments === data}
                          onChange={(e) => setComments(e.target.value)}
                        />
                        <label className="form-check-label">{data}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="sap-btn-light mt-4">
                <button
                  type="button"
                  // {...(commonLoader.bookLoader && { disabled: true })}
                  onClick={() => handleSaveDataValidation()}
                >
                  save data
                  {/* <span className="btn-loader">
                  {commonLoader.bookLoader && <FaCircleNotch />}
                </span> */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NotificationPreference;
