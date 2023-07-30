import cls from './List.module.scss'
import { FC } from "react";
import { Additional } from '../../types/Additional'

interface IList {
    additionalFields: Additional[];
    isFilesRead: boolean;
}

const List: FC<IList> = (props) => {
    const {additionalFields, isFilesRead} = props
    const classes = !isFilesRead
        ? cls.List
        : cls.List_disabled
    return(
        <div className={classes}>
            { additionalFields.map((el, i) => {
                return (
                    <div key={i} className={cls.str}>
                        <div className={cls.marker}>{el.marker}</div>
                        <div className={cls.text}>{el.name}</div>
                    </div>
                )
            }) }
        </div>
    )
}

export default List