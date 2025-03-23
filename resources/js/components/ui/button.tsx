import { cx } from "class-variance-authority";


export default function Button({className,children,style,size, ...props}){

    style = style ?? "primary";
    size = size ?? "normal";

    const styleVariants = {
        'primary':"bg-black text-white",
        'secondary':"bg-gray-200",
        'danger': "bg-red-500 text-white"
    }
    const sizeVariants = {
        'normal':"px-4 py-2",
        'small':"px-4 py-2 text-sm",
        'xs':"px-2 py-2 text-sm",
    }

    if(style=="none") return <button className={cx("cursor-pointer",className)} {...props}>{children}</button>
    return <button className={cx("rounded-md cursor-pointer",className,styleVariants[style],sizeVariants[size])} {...props}>{children}</button>
}