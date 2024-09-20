import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import MarkdownPreview from '@uiw/react-markdown-preview'; // Для рендеринга Markdown

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export function Redactor() {
    const [value, setValue] = useState<string | undefined>('');

    // Функция для вставки markdown-текста
    const insertText = (text: string) => {
        setValue((prev) => `${prev}\n${text}`);
    };

    return (
        <div className="markdown-editor-with-context">
            {/* Контекстное меню */}
            <ContextMenu>
                {/* Открытие меню по клику на редактор */}
                <ContextMenuTrigger>
                    <div style={{ padding: '20px' }}>
                        <MDEditor preview={'edit'} fullscreen={false} hideToolbar={true} visiableDragbar={false} value={value} onChange={setValue} />
                    </div>
                </ContextMenuTrigger>

                <ContextMenuContent className="w-64">
                    <ContextMenuItem onClick={() => insertText('# Заголовок 1')}>Добавить Заголовок 1</ContextMenuItem>
                    <ContextMenuItem onClick={() => insertText('## Заголовок 2')}>Добавить Заголовок 2</ContextMenuItem>
                    <ContextMenuItem onClick={() => insertText('### Заголовок 3')}>Добавить Заголовок 3</ContextMenuItem>
                    <ContextMenuItem onClick={() => insertText('- Элемент списка')}>Добавить список</ContextMenuItem>
                    <ContextMenuItem onClick={() => insertText('![Alt text](image-url)')}>Добавить изображение</ContextMenuItem>
                    <ContextMenuItem onClick={() => insertText('**Жирный текст**')}>Добавить жирный текст</ContextMenuItem>
                    <ContextMenuItem onClick={() => insertText('_Курсив_')}>Добавить курсив</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {/* Предпросмотр Markdown */}
            <div style={{ padding: '20px', marginTop: '20px' }}>
                <h2>Preview:</h2>
                <MarkdownPreview source={value || ''} />
            </div>
        </div>
    );
}
