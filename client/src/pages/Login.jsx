import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="flex justify-center items-center mt-16">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
        afterSignInUrl="/"
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

export default Login;
