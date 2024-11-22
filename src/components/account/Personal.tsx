import { useUser } from "@/providers/User";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SwalMessage } from "../common/SwalMessage";
import { updateUser } from "@/utils/globalApi";
import {
  Button,
  CountryField,
  DateField,
  Input,
  Message,
  PhoneField,
} from "../common";

interface PersonalForm {
  firstName: string;
  lastName: string;
  mobilePhone: string;
  homePhone?: string;
  birthDate: string;
  country: string;
  address: string;
  city: string;
  zipCode: string;
}

export const Personal = () => {
  const { user, jwt, fetchUserData } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalForm>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      mobilePhone: user?.mobilePhone || "",
      homePhone: user?.homePhone || "",
      birthDate: user?.birthDate || "",
      country: user?.country || "",
      address: user?.address || "",
      city: user?.city || "",
      zipCode: user?.zipCode || "",
    },
  });

  const onSubmit = async (data: PersonalForm) => {
    setIsLoading(true);

    if (!user?.id || !jwt) {
      setError("User is not authenticated.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await updateUser(user.id, data, jwt);
      if (typeof response === "string") {
        setError(response);
      } else {
        setError(null);
        fetchUserData(jwt);
        SwalMessage({
          title: "Success",
          message: "User information updated successfully.",
        });
      }
    } catch (error) {
      setError("Failed to update user information.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full 2xl:col-span-9 lg:col-span-8 col-span-12 p-5">
      <h5 className="mb-5">Personal Information</h5>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-y-5"
      >
        {error && <Message message={error} type="error" />}
        <div className="flex sm:flex-row flex-col sm:gap-x-5 gap-y-5">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            register={register("firstName", {
              required: "First Name is required",
            })}
            error={errors.firstName}
            placeholder="Jane"
            className="w-full"
          />

          <Input
            id="lastName"
            label="Last Name"
            type="text"
            register={register("lastName", {
              required: "Last Name is required",
            })}
            error={errors.lastName}
            placeholder="Smith"
            className="w-full"
          />
        </div>

        <div className="flex sm:flex-row flex-col sm:gap-x-5 gap-y-5">
          <PhoneField
            id="mobilePhone"
            label="Mobile Number"
            control={control}
            name="mobilePhone"
            error={errors.mobilePhone}
            className="w-full"
          />

          <PhoneField
            id="homePhone"
            label="Home Number"
            control={control}
            name="homePhone"
            isRequired={false}
            className="w-full"
          />
        </div>

        <div className="flex sm:flex-row flex-col sm:gap-x-5 gap-y-5">
          <DateField
            id="birthDate"
            label="Birth Date"
            control={control}
            name="birthDate"
            error={errors.birthDate}
            className="w-full"
          />

          <CountryField
            id="country"
            label="Country"
            control={control}
            name="country"
            error={errors.country}
            className="w-full"
          />
        </div>

        <div className="flex sm:flex-row flex-col sm:gap-x-5 gap-y-5">
          <Input
            id="address"
            label="Address"
            type="text"
            register={register("address", {
              required: "Address is required",
            })}
            error={errors.address}
            placeholder="Main Street 123"
            className="w-full"
          />

          <div className="flex sm:flex-row flex-col sm:gap-x-5 gap-y-5 w-full">
            <Input
              id="city"
              label="City"
              type="text"
              register={register("city", {
                required: "City is required",
              })}
              error={errors.city}
              placeholder="New York"
              className="sm:w-2/3 w-full"
            />

            <Input
              id="zipCode"
              label="Zip Code"
              type="text"
              register={register("zipCode", {
                required: "Zip Code is required",
              })}
              error={errors.zipCode}
              placeholder="12345"
              className="sm:w-1/3 w-full"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="sm:w-1/4 w-full mt-5 self-end"
          onClick={() => onSubmit}
          disabled={isLoading}
          isLoading={isLoading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
