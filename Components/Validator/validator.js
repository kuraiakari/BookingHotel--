const validator = (key, value, comparisons) => {
  // Măc định
  if (value.toString().trim() === "") return "This field is required";

  if (key === "email") {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(value)) return "This is not an email";
  }

  if (key === "password") {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    if (!regex.test(value))
      return "Minium 6 characters, with upper, lowercase, and number or symbol";
  }

  if (key === "confirmpassword") {
    if (value !== comparisons) return "Incorrect password";
  }

  if (key === "confirmoldpassword") {
    if (value === comparisons) return "Must be different from previous passwords";
  }

  if (key === "checkIn") {
    const currentTime = new Date();
    if (value <= currentTime) return "Invalid time check in";
  }

  if (key === "checkOut") {
    if (value <= comparisons) return "Invalid time check out";
  }

  if (key === "dateCard") {
    const data = value.split("/")
    if (data[0] > 12 ) return "Invalid date card";
    const currentTime = new Date();
    const currentMonth = currentTime.getUTCMonth() + 1;
    const currentYear = currentTime.getUTCFullYear();
    const lastYear = currentYear % 100;
    if (data[1] < lastYear ) return "Invalid date card";
    if (data [1] == lastYear && data[0] < currentMonth) return "Invalid date card";
  }

  if( key == "gender") {
    if ( value.toLowerCase() !== "male" && value.toLowerCase() !== "Female" && value.toLowerCase() !== "Other"  ) 
    return "Invalid gender. Example: Male/Female/Orther"
  }

  return undefined;
};

export default validator;
