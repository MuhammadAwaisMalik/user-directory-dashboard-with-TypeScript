import React from "react";
// @ import dependencies
import * as yup from "yup";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @ import components
import InputField from "@/js/components/input";
import { NewUserData } from "../..";

// Validation Schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  gender: yup.string().required("Gender is required"),
  location: yup.string().required("Location is required"),
});

const defaultValues = {
  name: "",
  email: "",
  location: "",
  gender: "male",
};

interface UserFormProps {
  onSubmit: SubmitHandler<NewUserData>;
  editData?: {
    name: string;
    email: string;
    gender: string;
    location: string;
  } | null;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, editData }) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: editData || defaultValues,
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const handleCancel = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap ml-[-12px] mr-[-12px]">
        <div className="mb-[20px] w-full px-[12px] md:w-1/2">
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  required={true}
                  label={"Username"}
                  placeholder={"Enter username"}
                  error={errors.name?.message}
                />
              );
            }}
          />
        </div>
        <div className="mb-[20px] w-full px-[12px] md:w-1/2">
          <Controller
            name={"email"}
            control={control}
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  required={true}
                  label={"Email"}
                  placeholder={"Enter Email"}
                  error={errors.email?.message}
                />
              );
            }}
          />
        </div>
        <div className="mb-[20px] w-full px-[12px] md:w-1/2">
          <Controller
            name={"location"}
            control={control}
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  required={true}
                  label={"Location"}
                  placeholder={"Enter Location"}
                  error={errors.location?.message}
                />
              );
            }}
          />
        </div>
        <div className="mb-[20px] w-full px-[12px] md:w-1/2">
          <Controller
            name={"gender"}
            control={control}
            render={({ field }) => {
              return (
                <div className="w-full">
                  <label
                    htmlFor="gender"
                    className="mb-1 block text-sm font-semibold text-gray-700 after:ml-1 after:text-red-500 after:content-['*']"
                  >
                    Select Gender
                  </label>

                  <div className="relative">
                    <select
                      {...field}
                      id="gender"
                      name="gender"
                      className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              );
            }}
          />
        </div>

        <div className="mb-[20px] w-full px-[12px] md:w-1/2">
          <button
            type="reset"
            onClick={handleCancel}
            className="bg-white text-black border px-4 py-2 rounded cursor-pointer w-full"
          >
            {editData ? "Back" : "Reset"}
          </button>
        </div>
        <div className="mb-[20px] w-full px-[12px] md:w-1/2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer w-full"
          >
            {editData ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
