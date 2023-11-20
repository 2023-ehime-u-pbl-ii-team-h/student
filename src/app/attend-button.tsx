import aButton from './attend-button.module.css'
import { BsCheckLg } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'

export type AttendButtonState = "ENABLED" | "DONE" | "OVERTIME";

export type AttendButtonProps = {
    state: AttendButtonState;
    onClick: () => void;
}

    export default function AttendButton({ state, onClick }: AttendButtonProps) {
        let label;
        let btnClass = '';
        let iconConponent = null;
        if (state === 'ENABLED') {
            label = '出席申請する';
            btnClass = 'enabled';
        } else if (state === 'DONE') {
            label = '出席済み';
            btnClass = 'done';
            iconConponent = <BsCheckLg className={aButton.icon} />;
        } else if (state === 'OVERTIME') {
            label = '申請時間外';
            btnClass = 'overtime';
            iconConponent = <RxCross1 className={aButton.icon} />;
        }
        return (
            <div className={aButton.button} onClick={onClick}>
                <div className={aButton[btnClass]}>
                    {iconConponent}
                    <span className={aButton.label}>{label}</span>
                </div>
            </div>
        )
    }