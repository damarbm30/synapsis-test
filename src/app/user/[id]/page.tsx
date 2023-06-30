"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

import { Loader, Modal } from "~/components";
import useFetch from "~/hooks/useFetch";
import useFetchSubmit from "~/hooks/useFetchSubmit";

const UserProfile = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isModify, setIsModify] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { id } = useParams();
  const { data: userApi, isLoading: isUserLoading } = useFetch(`/users/${id}`);
  const {
    data: modifiedUser,
    isLoading: isModifyUserSuccess,
    request: editUser,
  } = useFetchSubmit(`/users/${id}`, "PUT");
  const { isSuccess: isDeleteSuccess, request: deleteUser } = useFetchSubmit(`/users/${id}`, "DELETE");
  const [user, setUser] = useState<User>(Object);
  const router = useRouter();

  const { name, email, gender, status }: User = user;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    await editUser(JSON.stringify(Object.fromEntries(formData)));
    setIsModify(false);
  };

  const handleDeleteUser = () => {
    deleteUser();
  };

  useEffect(() => {
    if (isDeleteSuccess) router.push("/users");
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (Object.keys(modifiedUser).length === 0) setUser(userApi);
    else setUser(modifiedUser);
  }, [isModifyUserSuccess, isUserLoading]);

  return (
    <section className="container mx-auto">
      {!isUserLoading ? (
        <div className="mt-4 flex flex-col items-center justify-center">
          {!isModify ? (
            <>
              <div className="mb-4 flex flex-col gap-2">
                <p>ID: {id}</p>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Gender: {gender?.charAt(0).toUpperCase() + gender?.slice(1)}</p>
                <p>Status: {status?.charAt(0).toUpperCase() + status?.slice(1)}</p>
              </div>
              <div className="flex gap-4">
                <button
                  className="rounded-md bg-slate-800 px-3 py-2 font-medium text-white transition-all hover:brightness-50"
                  onClick={() => setIsModify(true)}
                >
                  Modify
                </button>
                <button
                  className="rounded-md bg-red-600 px-3 py-2 font-medium text-white transition-all hover:brightness-50"
                  onClick={() => setShowModal(true)}
                >
                  Delete
                </button>
              </div>
              <Modal showModal={showModal}>
                <p className="mb-4 text-center text-lg font-bold">Are you sure you want to delete {name}?</p>
                <div className="flex justify-center gap-2">
                  <button
                    className="rounded-md bg-red-600 px-6 py-2 font-medium text-white transition-all hover:brightness-50"
                    onClick={handleDeleteUser}
                  >
                    Yes
                  </button>
                  <button
                    className="rounded-md bg-slate-600 px-6 py-2 font-medium text-white transition-all hover:brightness-50"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </Modal>
            </>
          ) : (
            <form ref={formRef} className="mb-4 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="flex items-center gap-x-2">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={name}
                  className="rounded-md border border-black px-2 outline-none"
                />
              </div>
              <div className="flex items-center gap-x-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={email}
                  className="rounded-md border border-black px-2 outline-none"
                />
              </div>
              <div className="flex items-center gap-x-2">
                <label>Gender</label>
                <select name="gender" defaultValue={gender} className="rounded-md border border-black">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-4 flex items-center gap-x-2">
                <label>Status</label>
                <select name="status" defaultValue={status} className="rounded-md border border-black">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <input
                type="submit"
                className="cursor-pointer rounded-md bg-slate-600 px-3 py-2 font-medium text-white transition-all hover:brightness-50"
              />
            </form>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};
export default UserProfile;
