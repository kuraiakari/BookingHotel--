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
    if (value === comparisons) return "Phải khác mật khẩu cũ";
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
    if (data[1] > 12 ) return "Invalid date card"
    if (data[1] == 2) {
      if (data[0] > 28) return "Invalid date card"
    }
    if (data[1] == 1 || data[1] == 3 || data[1] == 5 || data[1] == 7 || data[1] == 10 || data[1] == 12){
      if (data[0] > 31) return "Invalid date card"
    }
    else {
      if (data[0] > 30) return "Invalid date card"
    }
  }
  return undefined;
};

export default validator;
