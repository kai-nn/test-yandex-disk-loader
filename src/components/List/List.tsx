import { FC } from "react";
import cls from './List.module.scss'

interface IList {
    filesName: string[];
    isFilesRead: boolean;
}

const List: FC<IList> = (props) => {
    const {filesName, isFilesRead} = props
    // console.log(filesName)
    const classes = !isFilesRead
        ? cls.List
        : cls.List_disabled
    console.log('isFilesRead', isFilesRead, 'classes', classes)
    return(
        <div className={classes}>
            
            { filesName.map(fileName => {

                return (
                    <div key={fileName} className={cls.str}>
                        <div className={cls.marker}>.</div>
                        <div className={cls.text}>{fileName}</div>
                    </div>
                )
            }) }
        </div>
    )
}

export default List