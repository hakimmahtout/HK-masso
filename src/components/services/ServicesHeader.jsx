import React from "react";
import Dialog from "../ui/Dialog";
import PageHeader from "../dashboard/PageHeader";
import ServicesFormHeader from "./ServicesFormHeader";
import ServicesFormBody from "./ServicesFormBody";
import Button from "../ui/Button";
import { Plus } from "lucide-react";

export default function ServicesHeader() {
  return (
    <PageHeader
      title="Services"
      description="Your full catalogue — pricing, durations and visibility."
      actions={
        <>
          <Dialog.Open opens="createService">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New service
            </Button>
          </Dialog.Open>
          <Dialog.Overlay name="createService">
            <Dialog.Window className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
              <ServicesFormHeader
                title="Create service"
                description="Configure pricing, durations, benefits and visibility."
              />
              <Dialog.Body>
                <ServicesFormBody />
              </Dialog.Body>
            </Dialog.Window>
          </Dialog.Overlay>
        </>
      }
    />
  );
}
