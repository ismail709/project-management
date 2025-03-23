import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import { route } from 'ziggy-js';

export default function Header() {
    const { user } = usePage().props;
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const menuRef = useRef();
    const profileRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target) && !profileRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);
    return (
        <header className="flex h-full items-center justify-between px-4 border-b border-gray-200">
            <Logo />
            <div>
                <div className="relative">
                    <Button style="none" ref={profileRef} onClick={() => setIsProfileMenuOpen((prev) => !prev)}>
                        <Avatar user={user} />
                    </Button>
                    {isProfileMenuOpen && (
                        <div
                            ref={menuRef}
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg"
                        >
                            <div className="">
                                <Link
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                    href="#"
                                >
                                    Profile
                                </Link>
                                <Link
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                    href="#"
                                >
                                    Settings
                                </Link>
                            </div>
                            <div>
                                <Link
                                    onClick={() => setIsProfileMenuOpen(false)}
                                    className="block w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                    href={route('logout')}
                                    method='post'
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
