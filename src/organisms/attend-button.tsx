import aButton from "./attend-button.module.css";
import { BsCheckLg } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { ReactNode } from "react";
import { FilledButton } from "@/atoms/button";

export type AttendButtonState = "ENABLED" | "DONE" | "OVERTIME" | "DISABLED";

export type AttendButtonProps = {
  state: AttendButtonState;
  onClick?: () => void;
};

export default function AttendButton({ state, onClick }: AttendButtonProps) {
  const variants: Record<
    AttendButtonState,
    {
      label: string;
      disabled: boolean;
      icon: ReactNode;
    }
  > = {
    ENABLED: {
      label: "出席申請する",
      disabled: false,
      icon: null,
    },
    DONE: {
      label: "出席済み",
      disabled: true,
      icon: <BsCheckLg className={aButton.icon} />,
    },
    OVERTIME: {
      label: "申請時間外",
      disabled: false,
      icon: <RxCross1 className={aButton.icon} />,
    },
    DISABLED: {
      label: "…",
      disabled: true,
      icon: null,
    },
  };
  const { label, disabled, icon } = variants[state];
  return (
    <FilledButton
      label={label}
      leadingIcon={icon}
      innerProps={{ onClick, disabled }}
    />
  );
}
