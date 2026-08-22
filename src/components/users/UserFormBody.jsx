import { useForm, Controller } from "react-hook-form";
import Button from "../ui/Button";
import Dialog from "../ui/Dialog";
import Input from "../ui/Input";
import Label from "../ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useCreateUser } from "../../features/users/useCreateUser";
import { useEditUser } from "../../features/users/useEditUser";
import { Loader2 } from "lucide-react";
import Switch from "../ui/switch";

const ROLES = ["user", "admin", "worker", "receptionist"];

export default function UserFormBody({ userToEdit = {}, onCloseModal }) {
  const { isCreating, createUser } = useCreateUser();
  const { isEditing, editUser } = useEditUser();
  const isWorking = isCreating || isEditing;

  const { _id: editId, ...editValues } = userToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState, control } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  function onSubmit({
    name,
    email,
    phone,
    gender,
    role,
    active,
    password,
    passwordConfirm,
  }) {
    if (isEditSession) {
      editUser(
        { _id: editId, name, email, phone, role, active },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createUser(
        {
          name,
          email,
          phone,
          gender,
          role,
          password,
          passwordConfirm,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            disabled={isWorking}
            {...register("name", {
              required: "This field is required",
            })}
          />
          {errors?.name?.message && (
            <p className="text-destructive text-xs">{errors?.name?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            disabled={isWorking}
            {...register("email", {
              required: "This field is required",
            })}
          />
          {errors?.email?.message && (
            <p className="text-destructive text-xs">{errors?.email?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            disabled={isWorking}
            {...register("phone", {
              required: "This field is required",
            })}
          />
          {errors?.phone?.message && (
            <p className="text-destructive text-xs">{errors?.phone?.message}</p>
          )}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Role</Label>
          <Controller
            name="role"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
                disabled={isWorking}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors?.role?.message && (
            <p className="text-destructive text-xs">{errors?.role?.message}</p>
          )}
        </div>

        {isEditSession && (
          <label className="hover:bg-muted/50 flex items-center justify-between rounded-xl border p-3 transition-colors sm:mt-7">
            <span className="text-sm font-medium">Is active</span>
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <Switch
                  disabled={isWorking}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </label>
        )}

        {!isEditSession && (
          <>
            <div className="space-y-2 sm:col-span-2">
              <Label>Gender</Label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    disabled={isWorking}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors?.gender?.message && (
                <p className="text-destructive text-xs">
                  {errors?.gender?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                disabled={isWorking}
                {...register("password", {
                  required: "This field is required",
                })}
              />
              {errors?.password?.message && (
                <p className="text-destructive text-xs">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirm password</Label>
              <Input
                id="passwordConfirm"
                type="password"
                disabled={isWorking}
                {...register("passwordConfirm", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues().password || "Passwords need to match",
                })}
              />
              {errors?.passwordConfirm?.message && (
                <p className="text-destructive text-xs">
                  {errors?.passwordConfirm?.message}
                </p>
              )}
            </div>
          </>
        )}
      </div>
      <Dialog.Footer>
        <Button type="submit" disabled={isWorking}>
          {isWorking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {isEditSession ? "Save changes" : "Create user"}
        </Button>
      </Dialog.Footer>
    </form>
  );
}
