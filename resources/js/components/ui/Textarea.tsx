import { cx } from "class-variance-authority";


export default function Textarea({className, ...props}){
    return <textarea className={cx("block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black",className)} {...props}></textarea>
}