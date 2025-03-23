import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Input from '@/components/ui/Input';
import InputError from '@/components/ui/InputError';
import Label from '@/components/ui/Label';
import Logo from '@/components/ui/Logo';
import { Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/register');
    }

    return (
        <div className="grid h-screen items-center justify-center">
            <form onSubmit={submit} className="flex min-w-80 flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <Logo className="mx-auto w-60" uni />
                    <Heading title="Sign up" description="Create an account" />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className="flex flex-col gap-1">
                        <Label>Name</Label>
                        <Input placeholder="Your name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError msg={errors.name} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Email</Label>
                        <Input placeholder="example@mail.com" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        <InputError msg={errors.email} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Password</Label>
                        <Input placeholder="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                        {errors.password && <InputError msg={errors.password} />}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Password confirmation</Label>
                        <Input
                        placeholder="password confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        {errors.password_confirmation && <InputError msg={errors.password_confirmation} />}
                    </div>
                    <Button type="submit" disabled={processing}>
                        Register
                    </Button>
                </div>
                <p className="text-center">
                    Already have an account?{' '}
                    <Link className="hover:underline" href={route('login')}>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
