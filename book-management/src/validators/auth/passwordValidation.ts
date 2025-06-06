function passwordValidation(password: string) {
  const isValid = password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

  return isValid;
}

export { passwordValidation };
