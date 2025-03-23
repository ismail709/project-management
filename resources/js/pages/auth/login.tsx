import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Input from '@/components/ui/Input';
import InputError from '@/components/ui/InputError';
import Label from '@/components/ui/Label';
import Logo from '@/components/ui/Logo';
import { Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Login() {
    const { props } = usePage();

    console.log(props);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <div className="grid h-screen items-center justify-center">
            <form onSubmit={submit} className="flex min-w-80 flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <Logo className="mx-auto w-60" uni />
                    <Heading title="Log in" description="Enter your login info." />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="example@mail.com"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <InputError msg={errors.email} />}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <InputError msg={errors.password} />}
                    </div>
                    <Button type="submit" disabled={processing}>
                        Login
                    </Button>
                </div>
                <p className="text-center">
                    Don't have an account?{' '}
                    <Link className="hover:underline" href={route('register')}>
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
