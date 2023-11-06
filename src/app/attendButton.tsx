import aButton from './attendButton.module.css'

interface AttendButtonProps{
    state: number;
}

export default function AttendButton({state}: AttendButtonProps) {
    let label;
    let btnClass = '';
    if(state === 1){
        label ='出席申請する';
        btnClass='apply'
    }else if(state === 2){
        label = '出席済み'
        btnClass = 'applied'
    }else if(state === 3){
        label = '申請時間外'
        btnClass = 'overtime'
    }
    return (
        <div>
        <button className={aButton[btnClass]}>
            <span className='label'>{label}</span>
        </button>
        </div>
    )
}