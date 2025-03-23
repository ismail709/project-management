import { cx } from "class-variance-authority";


export default function InputError({className,msg, ...props}){
    return msg ? <p className={cx("text-red-500 text-sm",className)} {...props}>{msg}</p> : null
}