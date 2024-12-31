import { basePath } from "@/next.config";
import { postLogin } from "@/services/apiServicesAdmin";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "@/shared/redux/authSlice";
import { ClipLoader } from "react-spinners";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import { auth } from "@/ultis/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

interface UserState {
  name: string;
  userId: number;
  email: string;
  role: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [passwordshow1, setpasswordshow1] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const [isCheckRemember, setIsCheckRemember] = useState<boolean>();

  const usernameRef = useRef<HTMLInputElement>(null);

  const loginAccount = async () => {
    setIsLoadingLogin(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      const idToken = await userCredential.user.getIdToken();

      const res = await postLogin(idToken);

      if (res.status === 200 && res.data.role === "admin") {
        const decodedUser: any = jwtDecode<any>(idToken);

        const userData: UserState = {
          name: decodedUser.name,
          userId: decodedUser.user_id,
          email: decodedUser.email,
          role: res.data.role,
        };

        if (isCheckRemember) {
          localStorage.setItem("accessToken", idToken);
        } else {
          sessionStorage.setItem("accessToken", idToken);
        }

        dispatch(setUser(userData));
        dispatch(setAccessToken(idToken));
        message.success("Login success");
        router.push("/dashboard");
      } else {
        message.error(res.data.message);
      }
      setIsLoadingLogin(false);
    } catch (e) {
      console.log(e);
      message.error("Don't login now!");
      setIsLoadingLogin(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      // Chuyển hướng người dùng hoặc thực hiện các hành động khác sau khi đăng xuất
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const validateDataLogin = () => {
    return username.length > 5 || password.length > 8;
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateDataLogin()) {
      message.error("Invalid username or password!");
      return;
    }
    loginAccount();
  };

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  return (
    <Fragment>
      <form onSubmit={handleLogin}>
        <div className="conta iner">
          <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
            <div className="grid grid-cols-12">
              <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
              <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
                <div className="box !p-[3rem] dark:bg-bgDarkReduce dark:text-black">
                  <nav
                    className="!block px-6 mx-auto firebase-data"
                    aria-label="Tabs"
                  >
                    <div className="flex justify-center space-x-2 bg-light dark:bg-bgDark p-2 rounded-md rtl:space-x-reverse">
                      <button
                        type="button"
                        className="hs-tab-active:bg-primary hs-tab-active:text-white py-2 px-2 inline-flex items-center gap-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-sm hover:text-primary dark:text-white/70 dark:hover:text-white active"
                        id="pills-with-brand-color-item-1"
                        data-hs-tab="#pills-with-brand-color-01"
                        aria-controls="pills-with-brand-color-01"
                      >
                        <Image
                          width={100}
                          height={100}
                          src={`${
                            process.env.NODE_ENV === "production"
                              ? basePath
                              : ""
                          }/assets/images/brand-logos/nextjs.png`}
                          alt="user-img"
                          className="avatar avatar-sm w-6 h-6 rounded-full ring-0"
                        />
                      </button>
                      <button
                        type="button"
                        className="hs-tab-active:bg-primary hs-tab-active:text-white py-2 px-2 inline-flex items-center gap-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-sm hover:text-primary  dark:text-white/70 dark:hover:text-white"
                        id="pills-with-brand-color-item-2"
                        data-hs-tab="#pills-with-brand-color-02"
                        aria-controls="pills-with-brand-color-02"
                      >
                        <Image
                          width={100}
                          height={100}
                          src={`${
                            process.env.NODE_ENV === "production"
                              ? basePath
                              : ""
                          }/assets/images/brand-logos/firbase.png`}
                          alt="user-img"
                          className="avatar avatar-sm w-6 h-6 rounded-full ring-0"
                        />
                      </button>
                    </div>
                  </nav>
                  <div
                    className="box-body"
                    role="tabpanel"
                    id="pills-with-brand-color-01"
                    aria-labelledby="pills-with-brand-color-item-1"
                  >
                    <p className="h5 font-semibold mb-2 text-center">Sign In</p>

                    <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">
                      Welcome back!
                    </p>
                    <div className="grid grid-cols-12 gap-y-4">
                      <div className="xl:col-span-12 col-span-12">
                        <label
                          htmlFor="signin-email"
                          className="form-label text-default"
                        >
                          Username
                        </label>
                        <input
                          ref={usernameRef}
                          tabIndex={1}
                          type="text"
                          name="email"
                          placeholder="Username"
                          className="form-control form-control-lg w-full !rounded-md"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="xl:col-span-12 col-span-12 mb-2">
                        <label
                          htmlFor="signin-password"
                          className="form-label text-default block"
                        >
                          Password
                          <Link
                            href="/components/authentication/reset-password/reset-basic/"
                            className="float-right text-danger"
                          >
                            Forget password ?
                          </Link>
                        </label>
                        <div className="input-group">
                          <input
                            tabIndex={2}
                            name="password"
                            type={passwordshow1 ? "text" : "password"}
                            className="form-control form-control-lg !rounded-s-md"
                            id="signin-password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            onClick={() => setpasswordshow1(!passwordshow1)}
                            aria-label="button"
                            className="ti-btn ti-btn-light dark:bg-bgDark !rounded-s-none !mb-0"
                            type="button"
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
                        <div className="mt-2">
                          <div className="form-check !ps-0 flex !items-center">
                            <input
                              tabIndex={3}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="defaultCheck1"
                              checked={isCheckRemember}
                              onChange={(e) =>
                                setIsCheckRemember(e.target.checked)
                              }
                            />
                            <label
                              className="form-check-label text-[#8c9097] dark:text-white/50 font-normal"
                              htmlFor="defaultCheck1"
                            >
                              Remember password ?
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="xl:col-span-12 col-span-12 grid mt-2">
                        <button
                          tabIndex={4}
                          className={`ti-btn ti-btn-primary !min-h-[45px] !bg-primary !text-white !font-medium${
                            isLoadingLogin && "cursor-not-allowed"
                          }`}
                          disabled={isLoadingLogin}
                          type="submit"
                        >
                          {isLoadingLogin ? (
                            <ClipLoader size={20} color="white" />
                          ) : (
                            "Sign In"
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">
                        Don't have an account?
                        <Link href="/sign-up/" className="text-primary">
                          Sign Up
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
                        className="ti-btn ti-btn-icon ti-btn-light dark:bg-bgDark me-[0.365rem]"
                      >
                        <i className="ri-facebook-line font-bold text-dark opacity-[0.7]"></i>
                      </button>
                      <button
                        aria-label="button"
                        type="button"
                        className="ti-btn ti-btn-icon ti-btn-light dark:bg-bgDark me-[0.365rem]"
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
                  <div
                    className="box-body hidden"
                    role="tabpanel"
                    id="pills-with-brand-color-02"
                    aria-labelledby="pills-with-brand-color-item-2"
                  >
                    <p className="h5 font-semibold mb-2 text-center">Sign In</p>
                    <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">
                      Welcome back Jhon !
                    </p>
                    <div className="grid grid-cols-12 gap-y-4">
                      <div className="xl:col-span-12 col-span-12">
                        <label
                          htmlFor="signin-email"
                          className="form-label text-default"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          name="email"
                          className="form-control form-control-lg w-full !rounded-md"
                          id="email"
                          placeholder="Username"
                        />
                      </div>
                      <div className="xl:col-span-12 col-span-12 mb-2">
                        <label
                          htmlFor="signin-password"
                          className="form-label text-default block"
                        >
                          Password
                          <Link
                            href="/components/authentication/reset-password/reset-basic/"
                            className="float-right text-danger"
                          >
                            Forget password ?
                          </Link>
                        </label>
                        <div className="input-group">
                          <input
                            name="password"
                            type={passwordshow1 ? "text" : "password"}
                            className="form-control form-control-lg !rounded-s-md"
                            id="signin-password"
                            placeholder="password"
                          />
                          <button
                            onClick={() => setpasswordshow1(!passwordshow1)}
                            aria-label="button"
                            className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                            type="button"
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
                        <div className="mt-2">
                          <div className="form-check !ps-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="defaultCheck1"
                              onChange={(e) =>
                                setIsCheckRemember(e.target.checked)
                              }
                              checked={isCheckRemember}
                            />
                            <label
                              className="form-check-label text-[#8c9097] dark:text-white/50 font-normal"
                              htmlFor="defaultCheck1"
                            >
                              Remember password ?
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="xl:col-span-12 col-span-12 grid mt-2">
                        <button
                          className={`!min-h-[45px] ti-btn ti-btn-primary !bg-primary !text-white !font-medium ${
                            isLoadingLogin && "cursor-not-allowed"
                          }`}
                          type="submit"
                          disabled={isLoadingLogin}
                        >
                          {isLoadingLogin ? (
                            <ClipLoader size={20} color="white" />
                          ) : (
                            "Sign In"
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">
                        Dont have an account?{" "}
                        <Link href="/sign-up" className="text-primary">
                          Sign Up
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
                        className="ti-btn ti-btn-icon ti-btn-light me-[0.365rem]"
                      >
                        <i className="ri-facebook-line font-bold text-dark opacity-[0.7]"></i>
                      </button>
                      <button
                        aria-label="button"
                        type="button"
                        className="ti-btn ti-btn-icon ti-btn-light me-[0.365rem]"
                      >
                        <i className="ri-google-line font-bold text-dark opacity-[0.7]"></i>
                      </button>
                      <button
                        aria-label="button"
                        type="button"
                        className="ti-btn ti-btn-icon ti-btn-light"
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

Login.layout = "Authenticationlayout";
export default Login;
