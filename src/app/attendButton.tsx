import aButton from './attendButton.module.css'
import {BsCheckLg} from 'react-icons/bs'
import {RxCross1} from 'react-icons/rx'

interface AttendButtonProps{
    state: number;
}

export default function AttendButton({state}: AttendButtonProps) {
    let label;
    let btnClass = '';
    let iconConponent = null;
    if(state === 1){
        label ='出席申請する';
        btnClass='apply';
    }else if(state === 2){
        label = '出席済み';
        btnClass = 'applied';
        iconConponent = <BsCheckLg className={aButton.icon} />;
    }else if(state === 3){
        label = '申請時間外';
        btnClass = 'overtime';
        iconConponent = <RxCross1 className={aButton.icon} />
    }
    return (
        <div>
        <button className={aButton[btnClass]}>
            {iconConponent}
            <span className={aButton.label}>{label}</span>
        </button>
        </div>
    )
}