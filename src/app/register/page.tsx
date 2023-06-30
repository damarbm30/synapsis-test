"use client";

import { useRouter } from "next/navigation";
import { useRef, FormEvent, useEffect } from "react";

import useFetchSubmit from "~/hooks/useFetchSubmit";

const Register = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { isSuccess, request: registerUser } = useFetchSubmit("/users", "POST");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    registerUser(JSON.stringify(Object.fromEntries(formData)));
  };

  useEffect(() => {
    if (isSuccess) router.push("/users");
  }, [isSuccess]);

  return (
    <section className="container mx-auto my-4 min-h-full">
      <h1 className="mb-4 text-center text-xl font-bold text-slate-600">Create a New User</h1>
      <form ref={formRef} className="mx-auto w-fit" onSubmit={handleSubmit}>
        <div className="flex flex-col items-start gap-y-2">
          <div className="flex items-center gap-x-2">
            <label>Name</label>
            <input type="text" name="name" className="rounded-md border border-black px-2 outline-none" />
          </div>
          <div className="flex items-center gap-x-2">
            <label>Email</label>
            <input type="email" name="email" className="rounded-md border border-black px-2 outline-none" />
          </div>
          <div className="flex items-center gap-x-2">
            <label>Gender</label>
            <select name="gender" className="rounded-md border border-black">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4 flex items-center gap-x-2">
            <label>Status</label>
            <select name="status" className="rounded-md border border-black">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <input
            type="submit"
            value="Register"
            className="mx-auto cursor-pointer rounded-lg bg-slate-600 px-3 py-2 font-bold text-white hover:brightness-90"
          />
        </div>
      </form>
    </section>
  );
};
export default Register;
