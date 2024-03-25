import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size={"xl"} />
      </div>
    </>
  );
}
