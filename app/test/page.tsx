import TestComponent from "../components/TestComponent";
import Button from "./Button";
const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bold text-4xl m-4">Test Page</h1>
      <TestComponent />
      <h3 className="font-medium text-xl m-4">
        Here, we are testing the button component.
      </h3>
      <Button />
    </div>
  );
};

export default page;