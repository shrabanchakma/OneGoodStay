import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../components/Shared/Logo";
import { FaFacebookSquare, FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import axiosSecure from "../../Api";
const SignIn = () => {
  const { signInUser, googleSignIn, facebookSignIn } = useAuth();
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const userData = await signInUser(email, password);
      console.log(userData);
      toast.success("Sign In Successful!");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message.slice(10));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const {
        user: { displayName, email },
      } = await googleSignIn();

      const data = await axiosSecure.put(`/users/${email}`, {
        name: displayName,
        email: email,
      });
      console.log(data);
      toast.success("Sign In Successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const data = await facebookSignIn();
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>OneGoodStay | Login</title>
      </Helmet>
      <Link to="/">
        <FaArrowLeft
          color={"#e41b43"}
          size={18}
          className="absolute left-4 top-4 cursor-pointer"
        />
      </Link>
      <div className="flex justify-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 text-gray-900">
          <div className="mb-8 ">
            <div className="flex justify-center items-center mb-2">
              <Logo />
            </div>
            <p className="text-[26px] font-medium text-start">
              Sign in to access your account
            </p>
            <p className="text-sm">
              Unlock a world of travel with one account across Expedia,
              onegoodstay.com
            </p>
          </div>
          {/* google sign in */}
          <div
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center  border my-3 p-2 cursor-pointer bg-[#4285F4] rounded-lg  text-white"
          >
            <div className="bg-white w-10 h-9 flex justify-center items-center rounded-md">
              <FcGoogle size={20} />
            </div>

            <p className="text-center flex-grow">Sign in with Google</p>
          </div>
          <p className="my-3 w-full text-center">or</p>
          {/* sign in */}
          <form
            onSubmit={handleSignIn}
            noValidate=""
            action=""
            className="space-y-6 "
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-[#4285F4] w-full rounded-md py-3 text-white"
              >
                Continue
              </button>
            </div>
          </form>
          <div className="space-y-1">
            <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
              Forgot password?
            </button>
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Sign in with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          {/* login with socials*/}
          <FaFacebookSquare
            onClick={handleFacebookSignIn}
            color={"#1877F2"}
            size={32}
            className="text-center w-full my-3 cursor-pointer"
          />
          <p className="px-6 text-sm text-center text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/signup"
              className="hover:underline hover:text-rose-500 text-gray-600"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
