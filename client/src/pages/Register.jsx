import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp
        routing="path"
        path="/signup"
        signInUrl="/login"
        afterSignUpUrl="/"
        appearance={{
          elements: {
            card: "shadow-none border",
            headerTitle: "prata-regular text-3xl",
          },
        }}
      />
    </div>
  );
};

export default Register;

