import React from "react";
import MDEditor from '@uiw/react-md-editor';
import {mark} from "@/lib/moc";

export default function Redactor() {

    const [value, setValue] = React.useState<string>(mark);

    const handleEditorChange = (val?: string) => {
        setValue(val || ""); // Убедимся, что передаем строку, а не undefined
    };

    return (

        <div className="container">
            <div className='text-7xl'>База знаний</div>
            <MDEditor
                value={value}
                onChange={handleEditorChange} // Обработчик изменений
            />
            <MDEditor.Markdown source={value} style={{whiteSpace: 'pre-wrap'}}/>
        </div>
    );
}
