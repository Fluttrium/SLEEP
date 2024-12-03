import React from 'react';
import { MdEditor } from 'md-editor-rt';
import { motion } from 'framer-motion';
import { usePostRedactorStore } from "@/app/admin/_store/adminpageStore";
import { PostTable } from "@/components/admincomps/PostTable";
import { Button } from "@/components/ui/button";

// Не забудь подключить стили md-editor-rt
import 'md-editor-rt/lib/style.css';
import {PostRedacor} from "@/components/admincomps/PostRedacor";

export function Redactor() {
    const { isCreatingPost, setIsCreatingPost, setCreatedPost } = usePostRedactorStore();


    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-screen px-5"
        >
            <section className="relative ps-5 h-full flex flex-col">
                <div className='flex text-7xl mb-4'>Создание статей</div>

                {isCreatingPost ? (
                    <PostRedacor/>
                ) : (
                    <PostTable/>
                )}
            </section>
        </motion.div>
    );
}
