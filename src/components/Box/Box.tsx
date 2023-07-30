import cls from "./Box.module.scss"
import { ChangeEvent, useEffect, useState } from "react";
import List from "../List/List";


const Box = () => {




    const [filesName, setFilesName] = useState<string[]>([])
    const [files, setFiles] = useState<FileList>(null)
    const [isFilesRead, setIsFilesRead] = useState(true)

    const readFile = (ev: ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files
        setFiles(files)
        setIsFilesRead(false)
    }

    useEffect(() => {
        if (files){
            let arrNames: string[] = []
            for(let i=0; i<files.length; i++){
                arrNames.push(files.item(i).name)
            }
            setFilesName([...arrNames])
            // console.log('arrNames', arrNames)
        }
        console.log('filesName', filesName)
    }, [files])


    const sendHandler = () => {
        for(let i=0; i<files.length; i++){
            sendFile(files.item(i))
        }

        setTimeout(() => {
            setIsFilesRead(true)
            setFiles(null)
            setFilesName([]) 
        }, 2000)
        
    }

    
    const sendFile = (file: File) => {
        
        let reader: FileReader = new FileReader()
        reader.readAsArrayBuffer(file)

        reader.onload = () => {
            const data = reader.result

            // console.log(data)
            const fileName: string = file.name
            // console.log(fileName)

            let path: string = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=%2Ftemp%2F${fileName}&overwrite=true`

            fetch(path, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    Accept: 'application/json',
                    Authorization: "OAuth y0_AgAAAAAJlBpGAAo-ZQAAAADoxuYVwMK5E3s2RkiUnRsNUeOdB0anSOs"
                }
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    
                    fetch(result.href, {
                        method: 'PUT',
                        body: data,
                    }).then()
                })
                .catch(e => {
                    console.log('Error!', e)
                })
            
        }
    }

    return (
        <div className={cls.Box}>
            <div className={cls.header}>Yandex Disk loader</div>

            <label htmlFor='input'><button className={cls.fakeInputBtn}>Выбрать файлы</button></label>
            <input id='input' className={cls.selectFile} type='file' multiple onChange={readFile}/>
            
            <List filesName={filesName} isFilesRead={isFilesRead}/>

            <button
                className={cls.sendFile}
                onClick={sendHandler}
                disabled={isFilesRead}
            >
                Отправить
            </button>
        </div>
    )
}

export default Box
