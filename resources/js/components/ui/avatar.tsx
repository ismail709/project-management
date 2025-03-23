import { usePage } from '@inertiajs/react';
import { cx } from 'class-variance-authority';

function usernameToColor(username) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360; // Keep within 0-360 range
    return `hsl(${hue}, 70%, 50%)`; // 70% saturation, 50% lightness
}

export default function Avatar({ className,user,size, ...props }) {
    size = size ?? "normal";

    const sizeVariants = {
        'normal':"size-8",
        'small':"size-6 text-sm",
    }
    if(!user) return <div className={cx("rounded-full bg-gray-200",className,sizeVariants[size])} title='Unassigned'></div>
    if (user.profile_image_path) return <img title={user.name} src={user.profile_image_path} className={cx('', className)} {...props} />;
    return (
        <div title={user.name} className={cx("rounded-full flex justify-center items-center text-white",className,sizeVariants[size])} style={{backgroundColor:usernameToColor(user.name)}}>
            <div>{user.name.toUpperCase().charAt(0)}</div>
        </div>
    );
}