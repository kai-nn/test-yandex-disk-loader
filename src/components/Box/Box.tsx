import cls from "./Box.module.scss"
import { ChangeEvent, useEffect, useState } from "react";
import List from "../List/List";
import { Additional } from '../../types/Additional'
import Status from "../Status/Status";
import { token } from "../../variable/variable";


const Box = () => {

    const [additionalFields, setAdditionalFields] = useState<Additional[]>([])
    const [files, setFiles] = useState<FileList>(null)
    const [isFilesRead, setIsFilesRead] = useState(true)
    const [message, setMessage] = useState<string | null>(null)

    const readFile = (ev: ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files
        setFiles(files)
        setIsFilesRead(false)
    }

    useEffect(() => {
        if (files){
            let arrNames: Additional[] = []
            for(let i=0; i<files.length; i++){
                arrNames.push({
                    name: files.item(i).name,
                    marker: '',
                    i: i,
                })
            }
            setAdditionalFields([...arrNames])
        }
    }, [files])


    const sendHandler = () => {
        for(let i=0; i<files.length; i++){
            sendFile({
                file: files.item(i),
                i: i
            })
        }

        setTimeout(() => {
            setIsFilesRead(true)
            setFiles(null)
            setAdditionalFields([])
            setMessage(null)
        }, 3000)
        
    }

    const sendFile = (item: Additional) => {

        const {file, i} = item

        let reader: FileReader = new FileReader()
        reader.readAsArrayBuffer(file)

        reader.onload = () => {
            const data = reader.result
            const fileName = file.name
            const path = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=%2Ftemp%2F${fileName}&overwrite=true`

            fetch(path, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    Accept: 'application/json',
                    Authorization: "OAuth " + token
                }
            })
                .then(response => response.json())
                .then(result => {
                    const temp = additionalFields.map((el, i ) => el.i === i ? {...el, marker: '✓'} : el)
                    setAdditionalFields([...temp])

                    fetch(result.href, {
                        method: 'PUT',
                        body: data,
                    }).then(response => {
                        // console.log(response)
                        if(response.ok){
                            setMessage('Успешно')
                        }
                    })
                })
                .catch(e => {
                    setMessage('Что-то пошло не так...')
                })
        }
    }

    return (
        <div className={cls.Box}>
            <div className={cls.header}>Yandex Disk loader</div>

            <label htmlFor='input'><button className={cls.fakeInputBtn}>Выбрать файлы</button></label>
            <input id='input' className={cls.selectFile} type='file' multiple onChange={readFile}/>
            
            <List additionalFields={additionalFields} isFilesRead={isFilesRead}/>

            <button
                className={cls.sendFile}
                onClick={sendHandler}
                disabled={isFilesRead}
            >
                Отправить
            </button>
            
            <Status message={message} isFilesRead={isFilesRead} />
        </div>
    )
}

export default Box
