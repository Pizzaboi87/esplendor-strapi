import { useUser } from "@/providers/User";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
}

export const Personal = () => {
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

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
    },
  });

  const onSubmit = (data: PersonalForm) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className="h-full">
      <h5 className="mb-5">Personal Information</h5>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-y-5"
      >
        {error && <Message message={error} type="error" />}
        <div className="flex gap-x-5">
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

        <div className="flex gap-x-5">
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

        <div className="flex gap-x-5">
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

        <Button
          type="submit"
          className="w-1/4 mt-5 self-end"
          onClick={() => onSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
