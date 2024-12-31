import Seo from "@/shared/layout-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useRef, useState } from "react";
import Countdown from "@/function/TimeUp";
import { postRegisterAccount, postVerifyEmail } from "@/services/apiServices";
import { ClipLoader } from "react-spinners";
import { message } from "antd";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";

const Signup = () => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [passwordshow2, setpasswordshow2] = useState(false);
  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);
  const [statusSendMail, setStatusSendMail] = useState<boolean>(false);
  const [statusTime, setStatusTime] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("user");
  const [checkTerm, setCheckTerm] = useState<boolean>(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);
  const themeClass = useSelector((state: RootState) => state.main.class);

  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleTimeUp = () => {
    setStatusTime(false);
  };

  const handleSendCodeToMail = async () => {
    if (!isValidEmail(email)) {
      message.error("Invalid email!");
      return;
    }
    setStatusSendMail(true);
    try {
      const res = await postVerifyEmail(email);
      console.log(res);
      if (res.data.status === 200) {
        message.success(res.data.message);
        setStatusSendMail(false);
        setStatusTime(true);
      } else {
        message.error(res.data.status);
      }
    } catch (e) {
      console.log(e);
      setStatusSendMail(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordMatch = (
    password: string,
    confirmPassword: string
  ): boolean => {
    return password === confirmPassword;
  };

  const registerUser = async () => {
    setIsLoadingRegister(true);
    try {
      const res = await postRegisterAccount(
        username,
        password,
        email,
        code,
        accountType
      );
      if (res.status === 200) {
        message.success(res.data.message);
        setIsLoadingRegister(false);
        router.push("/sign-in");
      }
    } catch (e) {
      console.log(e);
      setIsLoadingRegister(false);
      message.error("Don't register account now!");
    }
  };

  const validateForm = (): boolean => {
    if (
      email.length > 1 &&
      username.length > 1 &&
      password.length > 1 &&
      confirmPassword.length > 1 &&
      code.length > 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleRegisterAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      message.error("Please fill in all fields!");
      return;
    }

    if (!isValidEmail(email)) {
      message.error("Invalid email!");
      return;
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      message.error("Password must be greater than 8 characters!");
      return;
    }

    if (!isPasswordMatch(password, confirmPassword)) {
      message.error("Passwords do not match!");
      return;
    }

    if (!checkTerm) {
      message.error("Please agree to our terms!");
      return;
    }

    registerUser();
  };

  return (
    <Fragment>
      <Seo title={"Signup-basic"} />
      <form onSubmit={handleRegisterAccount}>
        <div className="container">
          <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
            <div className="grid grid-cols-12">
              <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
              <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
                <Link href={"/"} className="my-3 flex justify-center">
                  <Image
                    width={200}
                    height={200}
                    alt="logo"
                    src="/assets/images/brand-logos/logo.png"
                  />
                </Link>
                <div className="box dark:bg-bgDarkReduce">
                  <div className="box-body !p-[3rem]">
                    <p className="h5 font-semibold mb-2 text-center">Sign Up</p>
                    <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">
                      Welcome &amp; Join us by creating a free account !
                    </p>
                    <div className="grid grid-cols-12 gap-y-4">
                      <div className="xl:col-span-12 col-span-12">
                        <label
                          htmlFor="username"
                          className="form-label text-default"
                        >
                          Username
                        </label>
                        <div className="input-group">
                          <input
                            ref={usernameRef}
                            tabIndex={1}
                            type="text"
                            className="form-control form-control-lg w-full !rounded-md"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="xl:col-span-12 col-span-12">
                        <label
                          htmlFor="signup-email"
                          className="form-label text-default"
                        >
                          Email
                        </label>
                        <div className="relative">
                          {statusTime ? (
                            <p className="right-2 top-3 text-[12px] absolute">
                              <Countdown
                                onTimeUp={handleTimeUp}
                                minutes={minutes}
                                setMinutes={setMinutes}
                                seconds={seconds}
                                setSeconds={setSeconds}
                                status={statusTime}
                              />
                            </p>
                          ) : (
                            <p
                              className="right-2 top-3 text-[12px] absolute cursor-pointer"
                              onClick={handleSendCodeToMail}
                            >
                              {statusSendMail ? (
                                <ClipLoader size={18} />
                              ) : (
                                "Send"
                              )}
                            </p>
                          )}
                          <input
                            tabIndex={2}
                            type="text"
                            className="form-control form-control-lg w-full !pr-4 !rounded-md"
                            id="signup-email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                      </div>
                      <div className="xl:col-span-12 col-span-12">
                        <label
                          htmlFor="signup-password"
                          className="form-label text-default"
                        >
                          Password
                        </label>
                        <div className="input-group">
                          <input
                            tabIndex={3}
                            type={passwordshow1 ? "text" : "password"}
                            className="form-control form-control-lg !rounded-e-none"
                            id="signup-password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            onClick={() => setpasswordshow1(!passwordshow1)}
                            aria-label="button"
                            type="button"
                            className="ti-btn ti-btn-light !rounded-s-none !mb-0 dark:bg-bgDark"
                            id="button-addon2"
                          >
                            <i
                              className={`${
                                passwordshow1
                                  ? "ri-eye-line"
                                  : "ri-eye-off-line"
                              } align-middle`}
                            ></i>
                          </button>
                        </div>
                      </div>
                      <div className="xl:col-span-12 col-span-12">
                        <label
                          htmlFor="signup-confirmpassword"
                          className="form-label text-default"
                        >
                          Confirm Password
                        </label>
                        <div className="input-group">
                          <input
                            tabIndex={4}
                            type={passwordshow2 ? "text" : "password"}
                            className="form-control form-control-lg !rounded-e-none"
                            id="signup-confirmpassword"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <button
                            aria-label="button"
                            type="button"
                            className="ti-btn ti-btn-light !rounded-s-none !mb-0 dark:bg-bgDark"
                            onClick={() => setpasswordshow2(!passwordshow2)}
                            id="button-addon21"
                          >
                            <i
                              className={`${
                                passwordshow2
                                  ? "ri-eye-line"
                                  : "ri-eye-off-line"
                              } align-middle`}
                            ></i>
                          </button>
                        </div>
                        <div className="xl:col-span-12 col-span-12 mt-4">
                          <label
                            htmlFor="code"
                            className="form-label text-default"
                          >
                            Code
                          </label>
                          <div className="input-group">
                            <input
                              tabIndex={5}
                              type="text"
                              className="form-control form-control-lg w-full !rounded-md"
                              id="code"
                              placeholder="Code"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="form-check !flex !ps-0">
                            <input
                              className="form-check-input me-1"
                              type="checkbox"
                              id="defaultCheck1"
                              checked={checkTerm}
                              onClick={() => setCheckTerm(!checkTerm)}
                            />
                            <label
                              className="ps-2 form-check-label text-[#8c9097] dark:text-white/50 font-normal block"
                              htmlFor="defaultCheck1"
                            >
                              By creating a account you agree to our{" "}
                              <Link
                                href="/components/pages/terms&conditions/"
                                className="text-success"
                              >
                                <u>Terms &amp; Conditions</u>
                              </Link>{" "}
                              and{" "}
                              <Link href="#!" className="text-success">
                                <u>Privacy Policy</u>
                              </Link>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="xl:col-span-12 col-span-12 grid mt-2">
                        <button
                          tabIndex={6}
                          className="min-h-[45px] ti-btn ti-btn-lg bg-primary text-white !font-medium dark:border-defaultborder/10 flex items-center justify-center"
                          type="submit"
                        >
                          {isLoadingRegister ? (
                            <ClipLoader size={20} color="white" />
                          ) : (
                            "Create Account"
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-primary">
                          Sign In
                        </Link>
                      </p>
                    </div>
                    <div className="text-center my-4 authentication-barrier">
                      <span>OR</span>
                    </div>
                    <div className="btn-list text-center">
                      <button
                        aria-label="button"
                        type="button"
                        className="ti-btn ti-btn-icon ti-btn-light me-[0.365rem] dark:bg-bgDark"
                      >
                        <i className="ri-facebook-line font-bold text-dark opacity-[0.7]"></i>
                      </button>
                      <button
                        aria-label="button"
                        type="button"
                        className="ti-btn ti-btn-icon ti-btn-light me-[0.365rem] dark:bg-bgDark"
                      >
                        <i className="ri-google-line font-bold text-dark opacity-[0.7]"></i>
                      </button>
                      <button
                        aria-label="button"
                        type="button"
                        className="ti-btn ti-btn-icon ti-btn-light dark:bg-bgDark"
                      >
                        <i className="ri-twitter-line font-bold text-dark opacity-[0.7]"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

Signup.layout = "Authenticationlayout";
export default Signup;
