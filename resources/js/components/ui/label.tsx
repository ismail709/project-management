import { cx } from "class-variance-authority";


export default function Label({className,children, ...props}){
    return <label className={cx("",className)} {...props}>{children}</label>
}