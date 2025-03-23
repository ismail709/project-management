import { cx } from "class-variance-authority";


export default function Heading({className,title,description, ...props}){
    return <div className={cx("",className)} {...props}>
        <h2 className="text-xl capitalize">{title}</h2>
        {description && <p className="text-gray-500">{description}</p>}
    </div>
}