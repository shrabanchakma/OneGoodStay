import { FaArrowLeft, FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Shared/Logo";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import axiosSecure from "../../Api";
import { uploadImage } from "../../Api/utils";

const Signup = () => {
  const { createUser, googleSignIn, updateUserProfile, facebookSignIn } =
    useAuth();
  const navigate = useNavigate();
  // sign up methods
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const newUser = {
      name: name,
      email: email,
      role: "user",
    };
    if (password.length < 6)
      return toast.error("Password should be at least 6 characters");
    try {
      const { data } = await axiosSecure.put(`/users/${email}`, newUser);
      console.log(data);
      if (data.upsertedCount > 0) {
        await createUser(email, password);
        const { display_url } = await uploadImage(image);
        await updateUserProfile(name, display_url);
        toast.success("Sign Up Successful!");
        navigate("/");
      } else {
        toast("User already exist");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
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
        <title>OneGoodStay | Signup</title>
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
              Sign up to access your account
            </p>
            <p className="text-sm">
              Unlock a world of travel with one account across Expedia,
              onegoodstay.com
            </p>
          </div>
          {/* google sign up */}
          <div
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center  border my-3 p-2 cursor-pointer bg-[#4285F4] rounded-lg  text-white"
          >
            <div className="bg-white w-10 h-9 flex justify-center items-center rounded-md">
              <FcGoogle size={20} />
            </div>

            <p className="text-center flex-grow">Sign up with Google</p>
          </div>
          <p className="my-3 w-full text-center">or</p>
          {/* sign up */}
          <form
            onSubmit={handleSignUp}
            noValidate=""
            action=""
            className="space-y-6 "
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  autoComplete={"on"}
                  required
                  placeholder="Enter Your name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
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
                  autoComplete={"on"}
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
              <div>
                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="ConfirmPassword"
                      className="block mb-2 text-sm font-medium"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    autoComplete="current-password"
                    id="ConfirmPassword"
                    required
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  />
                </div>
                <div className=" relative cursor-pointer ">
                  <label
                    htmlFor="image"
                    className="block mb-2 mt-1 text-sm font-medium"
                  >
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    required
                    className=""
                  />
                </div>
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
              sign up with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          {/* signin with socials*/}
          <FaFacebookSquare
            onClick={handleFacebookSignIn}
            color={"#1877F2"}
            size={32}
            className="text-center w-full my-3"
          />
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?
            <Link
              to="/login"
              className="hover:underline hover:text-rose-500 text-gray-600"
            >
              Sign in
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
