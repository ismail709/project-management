import { cx } from "class-variance-authority";


export default function Checkbox({className, ...props}){
    return <input type="checkbox" className={cx("h-4 w-4 rounded-md",className)} {...props} />
}