import { cva, cx } from 'class-variance-authority';
import Logo from '../ui/Logo';

const headerVariants = cva('font-bold', {
    variants: {
        mode: {
            light: '',
            dark: '',
        },
    },
    defaultVariants: {
        mode: 'light',
    },
});

export default function Header({ mode, className, ...props }) {
    return <header className={cx(headerVariants({ mode }),className)}>
        <Logo />
        <p className=''>
            dhfsdjfhdslk
        </p>
    </header>;
}
