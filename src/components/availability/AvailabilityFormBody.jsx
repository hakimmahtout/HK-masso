import React from "react";
import Label from "../ui/Label";
import Input from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import Dialog from "../ui/Dialog";
import Button from "../ui/Button";
import { Loader2 } from "lucide-react";
import { useCreateAvailability } from "../../features/availability/useCreateAvailability";
import { useEditAvailability } from "../../features/availability/useEditAvailability";
import { Controller, useForm } from "react-hook-form";
import { useUsers } from "../../features/users/useUsers";
import SwitchTemp from "../ui/SwitchTemp";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AvailabilityFormBody({ record = {}, onCloseModal }) {
  const { isCreating, createAvailability } = useCreateAvailability();
  const { isEditing, editAvailability } = useEditAvailability();
  const { isLoading, users = [] } = useUsers();

  const isWorking = isCreating || isEditing || isLoading;

  const { _id: editId, ...editValues } = record;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState, control } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });

  const { errors } = formState;

  function onSubmit({
    worker,
    workerGender,
    dayOfWeek,
    startWorking,
    endWorking,
    isOpen,
  }) {
    if (isEditSession) {
      editAvailability(
        {
          _id: editId,
          worker,
          workerGender,
          dayOfWeek,
          startWorking,
          endWorking,
          isOpen,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createAvailability(
        {
          worker,
          workerGender,
          dayOfWeek,
          startWorking,
          endWorking,
          isOpen,
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
        <div className="space-y-2">
          <Label htmlFor="worker">Worker</Label>
          <Controller
            name="worker"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
                disabled={isWorking}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a worker" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.worker?.message && (
            <p className="text-destructive text-xs">
              {errors?.worker?.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Worker gender</Label>
          <Controller
            name="workerGender"
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
          {errors?.workerGender?.message && (
            <p className="text-destructive text-xs">
              {errors?.workerGender?.message}
            </p>
          )}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Day of week</Label>
          <Controller
            name="dayOfWeek"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
                disabled={isWorking}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.dayOfWeek?.message && (
            <p className="text-destructive text-xs">
              {errors?.dayOfWeek?.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="startWorking">Start working</Label>
          <Input
            id="startWorking"
            type="time"
            {...register("startWorking", {
              required: "This field is required",
            })}
          />
          {errors?.startWorking?.message && (
            <p className="text-destructive text-xs">
              {errors?.startWorking?.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="endWorking">End working</Label>
          <Input
            id="endWorking"
            type="time"
            {...register("endWorking", {
              required: "This field is required",
            })}
          />
          {errors?.endWorking?.message && (
            <p className="text-destructive text-xs">
              {errors?.endWorking?.message}
            </p>
          )}
        </div>

        <label className="hover:bg-muted/50 flex items-center justify-between rounded-xl border p-3 transition-colors sm:mt-7">
          <span className="text-sm font-medium">Is open</span>
          <Controller
            name="isOpen"
            control={control}
            render={({ field }) => (
              <SwitchTemp
                disabled={isWorking}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </label>
      </div>
      <Dialog.Footer>
        <Button type="submit" disabled={isWorking}>
          {isWorking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {isEditSession ? "Save changes" : "Create"}
        </Button>
      </Dialog.Footer>
    </form>
  );
}
