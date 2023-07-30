import { FC } from "react";
import cls from './Status.module.scss'

interface IStatus {
    message: string;
    isFilesRead: boolean;
}

const Status: FC<IStatus> = (props) => {
    const {message, isFilesRead} = props
    return (
        <div className={cls.Status}>
            {!isFilesRead && <span className={message === 'Успешно' ? cls.ok : cls.error}>{message}</span>}
        </div>
    )
}

export default Status