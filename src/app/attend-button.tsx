import aButton from './attend-button.module.css'
import { BsCheckLg } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { ReactNode } from 'react';
import colors from 'src/theme/colors.module.css'

export type AttendButtonState = "ENABLED" | "DONE" | "OVERTIME";

export type AttendButtonProps = {
    state: AttendButtonState;
    onClick: () => void;
}

export default function AttendButton({ state, onClick }: AttendButtonProps) {
    const variants: Record<AttendButtonState, {
        label: string;
        btnClass: string;
        icon: ReactNode;
    }> = {
        ENABLED: {
            label: "出席申請する",
            btnClass: "enabled",
            icon: null,
        },
        DONE: {
            label: "出席済み",
            btnClass: "done",
            icon: <BsCheckLg className={aButton.icon} />,
        },
        OVERTIME: {
            label: "申請時間外",
            btnClass: "overtime",
            icon: <RxCross1 className={aButton.icon} />,
        },
    };
    const { label, btnClass, icon } = variants[state];
    return (
        <div className={`${aButton.button} ${colors.primary-container}`} onClick={onClick}>
            <div className={aButton[btnClass]}>
                {icon}
            </div>
            <div>
                <span className={`${aButton[btnClass]} ${colors.on-primary-container}`}>{label}</span>
            </div>
        </div>
    )
}