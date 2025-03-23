import { cx } from 'class-variance-authority';
import { CircleAlert, CircleCheckBig, Info, TriangleAlert } from 'lucide-react';

export default function Alter({ className, msg, type, ...props }) {
    const iconsVariants = {
        success: <CircleCheckBig />,
        info: <Info />,
        warning: <TriangleAlert />,
        danger: <CircleAlert />,
    };

    return (
        <div className={cx('', className)} {...props}>
            <div>{iconsVariants[type]}</div>
            <p>{msg}</p>
        </div>
    );
}
