export type InputFieldName = | "firstName" | "lastName" | "email" | "password";

interface InputField {
  name: InputFieldName;
  label: string;
  type: string;
  signupOnly: boolean;
}

export const inputFields: InputField[] = [
  {
     name: "firstName", label: "First Name:", type: "text", signupOnly: true,
  },
  { 
    name: "lastName", label: "Last Name:", type: "text", signupOnly: true,
  },
  { 
    name: "email", label: "Email:", type: "email", signupOnly: false,
  },
  { 
    name: "password", label: "Password:", type: "password", signupOnly: false,
  },
];