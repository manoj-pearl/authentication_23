import React, { useEffect, useRef, useState } from "react";
import useOtpTimer from "../common/useOtpTimer";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpForSignup = () => {
  const { state } = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [confirmOtp, setConfirmOtp] = useState(null);
  const [minutes, seconds] = useOtpTimer();


  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const handleOtp = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    if (e.target.value !== "" && index < 5) {
      inputRefs[index + 1].current.focus();
    }
    setOtp(newOtp);
  };

  useEffect(() => {
    if (otp.every((item) => item !== "")) {
      setConfirmOtp(Number(otp.join("")));
    }
  }, [otp]);

  useEffect(() => {
    if (confirmOtp !== null) {
      sendPayload();
    }
  }, [confirmOtp]);

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs[index - 1].current.focus();
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index - 1] = "";
        return newOtp;
      });
    }
  };

  const sendPayload = () => {
    const otpObj = {
      email: state,
      otp: `${confirmOtp}`,
    };
    // dispatch(verfiyOTP(otpObj));
  };

//   useEffect(() => {
//     if (isOtpVerified) {
//       navigate("/createnewpassword", {
//         state: { email: state, otp: confirmOtp },
//       });
//     }
//   }, [isOtpVerified]);

  return (
    <>
      <section className="otp_wrapper shadow-lg my-10 mx-auto w-[700px] p-12">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="">
              <div>
                <img className="img" 
                 width={"400px"}
                 height={"400px"}
                src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5280.jpg?size=626&ext=jpg&ga=GA1.1.1445045098.1701328375&semt=ais" alt="verification" />
              </div>
            </div>
            <div className="flex justify-center flex-col items-center gap-5">
              <div className="my-2">
                <h1 className="font-bold text-[#10B981] text-2xl">Email Verification</h1>
              </div>
              <div className="my-3">
                <p className="text-gray-400 text-[16px]">
                  Please enter your 6 digits verification code, which have been
                  sent to your registered email account.
                </p>
              </div>
              <div>
                <form className="flex flex-row gap-5">
                  {otp.map((item, index) => {
                    return (
                      <input
                        onChange={(e) => {
                          handleOtp(e, index);
                        }}
                        maxLength={1}
                        key={index}
                        onKeyDown={(e) => {
                          handleBackspace(e, index);
                        }}
                        value={item}
                        type="text"
                        ref={inputRefs[index]}
                        // style={{
                        //   cursor: `${isLoading ? "not-allowed" : "pointer"}`,
                        //   opacity: `${isLoading ? 0.5 : 1}`,
                        // }}
                        className="input text-center rounded w-[50px]"
                      />
                    );
                  })}
                </form>
                <div className="flex justify-end my-1 px-4">
                  <p className="paragraph">
                    00:{seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                </div>
              </div>
              <div>
                <p className="resend">
                  Didn’t receive code?{" "}
                  <span
                    style={{
                      cursor: `${seconds > 0 ? "not-allowed" : "pointer"}`,
                      opacity: `${seconds > 0 ? 0.5 : 1}`,
                    }}
                    className="recieveCode"
                  >
                    Resend
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtpForSignup;
