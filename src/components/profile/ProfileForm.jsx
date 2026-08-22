import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Camera, Loader2, UserIcon } from "lucide-react";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Button from "../ui/Button";
import { useUser } from "../../features/authentication/useUser";
import { useEditMe } from "../../features/users/useEditeMe";

export default function ProfileForm() {
  const { user = {} } = useUser();
  const { editMe, isEditing } = useEditMe();

  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  // Keep form values in sync when user data arrives or changes
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      reset({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
      });
      setAvatarPreview(user?.photo || null);
    }
  }, [user, reset]);

  // Handle local image preview with memory cleanup
  function handleFilePreview(e) {
    const file = e.target.files?.[0];
    if (file) {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);

    // Append image file if a new photo was selected
    if (data.photo?.[0]) {
      formData.append("photo", data.photo[0]);
    }

    editMe(formData, {
      onSuccess: () => {
        // Reset file field state after successful upload
        reset({ ...data, photo: undefined });
      },
    });
  }

  const initials = (user?.name ?? user?.email ?? "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="surface-card space-y-6 p-6 lg:col-span-2"
      noValidate
    >
      {/* Avatar Upload Section */}
      <div className="flex items-center gap-5 border-b pb-6">
        <div className="relative group">
          <Avatar className="h-20 w-20 border shadow-sm">
            <AvatarImage src={user?.photo} alt="Profile photo" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              {initials || <UserIcon className="h-8 w-8" />}
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="me-avatar"
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity cursor-pointer group-hover:opacity-100"
          >
            <Camera className="h-5 w-5" />
          </label>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="me-avatar"
            className="cursor-pointer text-sm font-medium"
          >
            Profile picture
          </Label>
          <Input
            id="me-avatar"
            type="file"
            accept="image/*"
            className="mt-2 max-w-xs text-xs file:mr-2 file:rounded-md file:border-0 file:bg-muted file:px-2.5 file:py-1 file:text-xs file:font-medium"
            {...register("photo", {
              onChange: handleFilePreview,
            })}
          />
          <p className="text-muted-foreground text-xs">
            Supports JPG, PNG, or WEBP up to 5MB.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="me-name">Full name</Label>
          <Input
            id="me-name"
            {...register("name", { required: "Name is required" })}
          />
          {errors?.name && (
            <p className="text-destructive text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="me-email">Email</Label>
          <Input
            id="me-email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors?.email && (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="me-phone">Phone</Label>
          <Input
            id="me-phone"
            {...register("phone", { required: "Email is required" })}
          />
          {errors?.phone && (
            <p className="text-destructive text-xs">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isEditing}>
        {isEditing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save changes
      </Button>
    </form>
  );
}
