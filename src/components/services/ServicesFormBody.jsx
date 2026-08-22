import { useCreateService } from "../../features/services/useCreateService";
import { useEditService } from "../../features/services/useEditService";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import Dialog from "../ui/Dialog";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";

import { Plus, Upload, X, Loader2 } from "lucide-react";
import Switch from "../ui/SwitchTemp";

const DURATION_OPTIONS = [15, 30, 45, 60, 75, 90, 120, 150, 180];

export default function ServicesFormBody({ service = null, onCloseModal }) {
  // State for holding binary file chosen via file input
  const [selectedFile, setSelectedFile] = useState(null);

  // 1. Identify edit session & extract ID
  const isEditSession = Boolean(service?.id || service?._id);
  const serviceId = service?._id || service?.id;

  // 2. Custom Mutations Hooks
  const { createNewService, isCreating } = useCreateService();
  const { updateService, isEditing } = useEditService();
  const isSubmittingApi = isCreating || isEditing;

  // 3. React Hook Form Setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      index: service?.index ?? "",
      name: service?.name ?? "",
      category: service?.category ?? "",
      tag: service?.tag ?? "",
      description: service?.description ?? "",
      benefits: service?.benefits?.length
        ? service.benefits.map((b) => ({ value: b }))
        : [{ value: "" }],
      durations: service?.durations ?? [],
      prices: service?.prices ?? {},
      image: service?.image ?? "",
      icon: service?.icon ?? "",
      isActive: service?.isActive ?? true,
      isFeatured: service?.isFeatured ?? false,
    },
  });

  // Sync form state when service prop updates
  useEffect(() => {
    if (service) {
      reset({
        index: service.index ?? "",
        name: service.name ?? "",
        category: service.category ?? "",
        tag: service.tag ?? "",
        description: service.description ?? "",
        benefits: service.benefits?.length
          ? service.benefits.map((b) => ({ value: b }))
          : [{ value: "" }],
        durations: service.durations ?? [],
        prices: service.prices ?? {},
        image: service.image ?? "",
        icon: service.icon ?? "",
        isActive: service.isActive ?? true,
        isFeatured: service.isFeatured ?? false,
      });
      setSelectedFile(null);
    }
  }, [service, reset]);

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: "benefits",
  });

  const watchedDurations = useWatch({ control, name: "durations" }) || [];
  const watchedImage = useWatch({ control, name: "image" });
  const watchedPrices = useWatch({ control, name: "prices" }) || {};

  // Duration toggle handler
  const toggleDuration = (duration) => {
    const key = `d${duration}`;
    const active = watchedDurations.includes(duration);

    const updatedDurations = active
      ? watchedDurations.filter((val) => val !== duration)
      : [...watchedDurations, duration].sort((a, b) => a - b);

    const updatedPrices = { ...watchedPrices };
    if (active) {
      delete updatedPrices[key];
    }

    setValue("durations", updatedDurations, { shouldValidate: true });
    setValue("prices", updatedPrices, { shouldValidate: true });
  };

  // 4. Form Submit Handler using FormData for Cloudinary Uploads
  const handleFormSubmit = (data) => {
    const sortedDurations = [...data.durations].sort((a, b) => a - b);

    const sortedPrices = {};
    sortedDurations.forEach((dur) => {
      const key = `d${dur}`;
      if (data.prices[key] !== undefined && data.prices[key] !== "") {
        sortedPrices[key] = Number(data.prices[key]);
      }
    });

    const benefitsArray = data.benefits.map((b) => b.value).filter(Boolean);

    // Build Multipart FormData
    const formData = new FormData();
    formData.append("index", data.index);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("tag", data.tag);
    formData.append("description", data.description);
    formData.append("icon", data.icon || "");
    formData.append("isActive", data.isActive);
    formData.append("isFeatured", data.isFeatured);

    // 💥 Clean JSON stringification for nested objects & arrays
    formData.append("prices", JSON.stringify(sortedPrices));
    formData.append("durations", JSON.stringify(sortedDurations));
    formData.append("benefits", JSON.stringify(benefitsArray));

    // Handle Image Upload
    if (selectedFile) {
      // A NEW binary file was chosen -> append as binary file
      formData.append("image", selectedFile);
    } else if (data.image && !data.image.startsWith("blob:")) {
      // NO new file chosen -> send the existing Cloudinary URL string
      formData.append("image", data.image);
    }

    console.log(formData);

    if (isEditSession) {
      updateService(
        { formData, _id: serviceId },
        { onSuccess: () => onCloseModal?.() },
      );
    } else {
      createNewService(formData, { onSuccess: () => onCloseModal?.() });
    }
  };

  return (
    <form
      className="space-y-5"
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Basic Info Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="svc-index">Index</Label>
          <Input
            id="svc-index"
            {...register("index", { required: "Index is required" })}
          />
          {errors.index && (
            <p className="text-xs text-destructive">{errors.index.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="svc-name">Name</Label>
          <Input
            id="svc-name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="svc-category">Category</Label>
          <Input
            id="svc-category"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && (
            <p className="text-xs text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="svc-tag">Tag</Label>
          <Input
            id="svc-tag"
            {...register("tag", { required: "Tag is required" })}
          />
          {errors.tag && (
            <p className="text-xs text-destructive">{errors.tag.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="svc-description">Description</Label>
        <Textarea
          id="svc-description"
          rows={4}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Dynamic Benefits Array */}
      <div className="space-y-2">
        <Label>Benefits</Label>
        <div className="space-y-2">
          {benefitFields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-1">
              <div className="flex gap-2">
                <Input
                  placeholder={`Benefit ${index + 1}`}
                  {...register(`benefits.${index}.value`, {
                    required: "Benefit line cannot be empty",
                  })}
                />
                {benefitFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Remove benefit"
                    onClick={() => removeBenefit(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {errors.benefits?.[index]?.value && (
                <p className="text-xs text-destructive">
                  {errors.benefits[index].value.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendBenefit({ value: "" })}
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Add benefit
        </Button>
      </div>

      {/* Duration Options */}
      <div className="space-y-2">
        <Label>Durations (minutes)</Label>
        <input
          type="hidden"
          {...register("durations", {
            validate: (v) => v.length > 0 || "Select at least one duration",
          })}
        />
        <div className="flex flex-wrap gap-2">
          {DURATION_OPTIONS.map((duration) => {
            const selected = watchedDurations.includes(duration);
            return (
              <button
                key={duration}
                type="button"
                onClick={() => toggleDuration(duration)}
                className={`
                  rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors
                  ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-muted"
                  }
                `}
              >
                {duration} min
              </button>
            );
          })}
        </div>
        {errors.durations && (
          <p className="text-xs text-destructive">{errors.durations.message}</p>
        )}
      </div>

      {/* Prices mapped with "d" prefix */}
      {watchedDurations.length > 0 && (
        <div className="space-y-2">
          <Label>Price per duration ($)</Label>
          <div className="grid gap-3 sm:grid-cols-3">
            {watchedDurations.map((duration) => {
              const priceKey = `d${duration}`;
              return (
                <div key={duration} className="space-y-1.5">
                  <span className="text-xs text-muted-foreground">
                    {duration} min
                  </span>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="Price"
                    {...register(`prices.${priceKey}`, {
                      required: "Price required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.prices?.[priceKey] && (
                    <p className="text-xs text-destructive">
                      {errors.prices[priceKey].message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Image Upload Input */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="svc-image">Image</Label>
          <div className="flex gap-2">
            <Input
              id="svc-image"
              placeholder="https://… or upload"
              {...register("image", { required: "Image is required" })}
            />
            <Button type="button" variant="outline" size="icon" asChild>
              <label className="cursor-pointer">
                <Upload className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      // Display filename/preview state in text input
                      setValue("image", file.name, { shouldValidate: true });
                    }
                  }}
                />
              </label>
            </Button>
            {watchedImage && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Clear uploaded image"
                onClick={() => {
                  setSelectedFile(null);
                  setValue("image", "", { shouldValidate: true });
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {errors.image && (
            <p className="text-xs text-destructive">{errors.image.message}</p>
          )}
        </div>

        {/* Icon: Optional */}
        <div className="space-y-2">
          <Label htmlFor="svc-icon">Icon (Optional)</Label>
          <Input id="svc-icon" placeholder="sparkles" {...register("icon")} />
        </div>
      </div>

      {/* Switches for Active & Featured */}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center justify-between rounded-xl border p-3 transition-colors hover:bg-muted/50 cursor-pointer">
          <span className="text-sm font-medium">Active</span>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </label>

        {/* Featured: Optional */}
        <label className="flex items-center justify-between rounded-xl border p-3 transition-colors hover:bg-muted/50 cursor-pointer">
          <span className="text-sm font-medium">Featured</span>
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </label>
      </div>

      {/* Footer with Loading state */}
      <Dialog.Footer>
        <Button type="submit" disabled={isSubmittingApi}>
          {isSubmittingApi && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditSession ? "Save changes" : "Create service"}
        </Button>
      </Dialog.Footer>
    </form>
  );
}
