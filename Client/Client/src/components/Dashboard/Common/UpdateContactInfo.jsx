import UpdateContactInfoForm from "./UpdateContactInfoForm";

const UpdateContactInfo = () => {
  const handleSubmit = (e) => {
    console.log("pressed");
  };
  return (
    <div className="h-screen flex justify-center">
      <UpdateContactInfoForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateContactInfo;
