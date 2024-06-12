import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHeadings from "@/Components/TableHeadings";

export default function index({ auth, projects, queryParameters = null}) {
    
    queryParameters = queryParameters || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParameters[name] = value
        } else {
            delete queryParameters[name]
        }

        router.get(route('project.index', queryParameters))
    }

    const sortChanged = (name) => {
        if (name === queryParameters.sort_field) {
            if (queryParameters.sort_direction === 'asc') {
                queryParameters.sort_direction = "desc";
            } else {
                queryParameters.sort_direction = "asc";
            }
        } else {
            queryParameters.sort_field = name;
            queryParameters.sort_direction = "asc";
        }
        router.get(route('project.index', queryParameters))
    }

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value)
    }

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:dark-gray-100">
                            
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-300 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className=" px-3 py-3"></th>
                                        <th className=" px-3 py-3"></th>
                                        <th className=" px-3 py-3">
                                            <TextInput className='w-full text-gray-700' defaultValue={queryParameters.name} placeholder='Project Name' onBlur={e => searchFieldChanged('name', e.target.value,)
                                        }
                                    
                                        onKeyPress={e=> onKeyPress("name", e)} />
                                        </th>
                                        <th className=" px-3 py-3">
                                            <SelectInput className='w-full text-gray-700' defaultValue={queryParameters.status} onChange={e => searchFieldChanged('status', e.target.value)} >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className=" px-3 py-3"></th>
                                        <th className=" px-3 py-3"></th>
                                        <th className=" px-3 py-3"></th>
                                        <th className=" px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-300 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                            <TableHeadings
                                                name="id"
                                                sort_field={queryParameters.sort_field}
                                                sort_direction={queryParameters.sort_direction}
                                                sortChanged={sortChanged}>
                                                ID
                                            </TableHeadings>
                                            <th className=" px-3 py-3">Image</th>
                                             <TableHeadings
                                                name="name"
                                                sort_field={queryParameters.sort_field}
                                                sort_direction={queryParameters.sort_direction}
                                                sortChanged={sortChanged}>
                                                Name
                                            </TableHeadings>
                                            <TableHeadings
                                                name="status"
                                                sort_field={queryParameters.sort_field}
                                                sort_direction={queryParameters.sort_direction}
                                                sortChanged={sortChanged}>
                                                Status
                                            </TableHeadings>
                                            <TableHeadings
                                                name="created_at"
                                                sort_field={queryParameters.sort_field}
                                                sort_direction={queryParameters.sort_direction}
                                                sortChanged={sortChanged}>
                                                Created At
                                            </TableHeadings>
                                            <TableHeadings
                                                name="due_date"
                                                sort_field={queryParameters.sort_field}
                                                sort_direction={queryParameters.sort_direction}
                                                sortChanged={sortChanged}>
                                                Due Date
                                            </TableHeadings>
                                        {/* 
                                            <th onClick={(e) => sortChanged('name')} >
                                                <div className=" px-3 py-3 flex items-center justify-between cursor-pointer">
                                                    Name
                                                    <div>
                                                    <ChevronUpIcon className="w-4" />
                                                <ChevronDownIcon className="w-4 -mt-2" />
                                                </div>
                                                </div>
                                                 
                                        </th> */}
                                        <th className=" px-3 py-3">Created By</th>
                                        <th className=" px-3 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                            <td className="px-3 py-2">{project.id}</td>
                                            <td className="px-3 py-2"><img src={ project.image_path } alt=""  style={{width:60}}/></td>
                                            <td className="px-3 py-2">{project.name}</td>
                                            <td className="px-3 py-2"><span className={
                                                "px-2 py-1 rounded text-white " + 
                                                PROJECT_STATUS_CLASS_MAP[project.status]
                                            }>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span></td>
                                            <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                                            <td className="px-3 py-2">{project.created_by.name }</td>
                                            <td className="px-3 py-2">
                                                <Link href={route('project.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                    Edit
                                                </Link>
                                                <Link href={route('project.destroy', project.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
