import { Button, Upload, UploadFile } from 'antd';
import React, { useState } from 'react'

type AddFileProps = {
    limit: number;
    initial?: UploadFile[]
}

const uploadButton = (
    <Button type='primary'>+</Button>
)

function AddFile({ limit, initial }: Readonly<AddFileProps>) {

    const [fileList, setFileList] = useState<UploadFile[]>(initial || [])

    return (
        <Upload>
            {
                fileList.length <= limit && uploadButton
            }
        </Upload>
    )
}

export default AddFile