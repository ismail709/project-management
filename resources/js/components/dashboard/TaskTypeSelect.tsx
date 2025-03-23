import { cx } from "class-variance-authority";
import Select from "../ui/Select";
import { usePage } from "@inertiajs/react";
import { MonitorX, SquareCheck } from "lucide-react";


export default function TaskTypeSelect({task,className, ...props}){

    const {taskTypes} = usePage().props
    
    console.log(taskTypes)

    const taskTypesVariants = {
        "task":{
            title: "Task",
            icon: <SquareCheck />,
        },
        "bug": {
            title: "Bug",
            icon: <MonitorX color="red" />
        }

    }


    return <Select name="type" className={cx("",className)} {...props}>
        {taskTypes.map((task,i) => {
            return <option>{taskTypesVariants[task.task_type_name].icon}</option>
        })}
    </Select>
}