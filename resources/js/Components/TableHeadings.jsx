import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function TableHeadings({ sort_field = null, sort_direction = null, name, sortable = true, sortChanged = () => { }, children }) {
    return (
        <th onClick={(e) => sortChanged(name)}>
             <div className=" px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                { children }
                {sortable && <div>
                    <ChevronUpIcon className={"w-4 " + ((sort_field === name &&
                        sort_direction === "asc") ? "text-black" : "")} />
                    <ChevronDownIcon className={"w-4 -mt-2 " + ((sort_field === name &&
                        sort_direction === "desc") ? "text-black" : "")} />
                
                   </div>}
             </div>
                                                
         </th>
    )
}