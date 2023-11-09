const validateForm = (formData) => {
  const formFields = Object.keys(formData);
  for (const field of formFields) {
    if (field !== "comments" && formData[field].trim() === "") {
      // Field is empty and not "comments"
      return false;
    }
  }
  return true;
};

export default validateForm;
