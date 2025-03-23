import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Input from '@/components/ui/Input';
import InputError from '@/components/ui/InputError';
import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Create({ projectTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        project_name: '',
        project_description: '',
        project_type_id: '',
        start_date: '',
        end_date: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('projects.store'));
    }

    return (
        <div className="grid h-screen items-center justify-center">
            <form onSubmit={submit} className="flex min-w-80 flex-col gap-4">
                <Heading title="Create project" description="Enter your project details." />
                <div className='flex flex-col gap-2'>
                    <div className="flex flex-col gap-1">
                        <Label>Project name</Label>
                        <Input placeholder="Your project name" type="text" value={data.project_name} onChange={(e) => setData('project_name', e.target.value)} />
                        <InputError msg={errors.project_name} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Project type</Label>
                        <Select value={data.project_type_id} onChange={(e) => setData('project_type_id', e.target.value)}>
                            <option>Select a type</option>
                            {projectTypes.map((type, i) => (
                                <option key={i} value={type.id}>
                                    {type.project_type_name}
                                </option>
                            ))}
                        </Select>
                        <InputError msg={errors.project_type_id} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Project description</Label>
                        <Textarea placeholder="Your project description" value={data.project_description} onChange={(e) => setData('project_description', e.target.value)} />
                        <InputError msg={errors.project_description} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Start date</Label>
                        <Input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} />
                        <InputError msg={errors.start_date} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>End date</Label>
                        <Input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} />
                        <InputError msg={errors.end_date} />
                    </div>
                    <Button type="submit" disabled={processing}>
                        Create project
                    </Button>
                </div>
            </form>
        </div>
    );
}
