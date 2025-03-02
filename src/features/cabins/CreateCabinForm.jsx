import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useeditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, setVisible, setIsEdit }) {
  const { id: editId, ...newCabinValue } = cabinToEdit;

  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isEditing } = useeditCabin();

  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: isEditSession ? newCabinValue : {},
  });

  function onSubmit(formData) {
    const image =
      typeof formData.image === "string" ? formData.image : formData.image[0];

    if (isEditSession) {
      updateCabin({ newCabinValue: { ...formData, image }, id: editId });
      setIsEdit((isEdit) => !isEdit);
    } else {
      createCabin(
        { ...formData, image },
        {
          onSuccess: () => reset(),
        },
      );
      setVisible((visible) => !visible);
    }
  }

  // function onError(errors) {
  //   console.log(errors);
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Min capacity must be more than 1",
            },
            max: {
              value: 9,
              message: "Max capacity must be less than 9",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This fiel is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="discount"
          defaultValue="0"
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value++ <= getValues().regularPrice++ ||
              "Discount must be less than regular price.",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isCreating}
          type="text"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          disabled={isCreating}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "EditCabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
