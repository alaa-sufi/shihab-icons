import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ArrowDownIcon } from 'react-shihab-icons'



export default function Select({ value, className, onChange, options, label }: any) {

    return (
        <div className={`${className} w-max `}>
            <Listbox value={value} onChange={onChange}>
                <div className="relative mt-1 ">
                    <Listbox.Button className="relative w-full cursor-default rounded-3xl bg-gray text-white py-2 ltr:pl-3 rtl:pr-3 ltr:pr-7 rtl:pl-7 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm flex gap-1 justify-between z-[3]">
                        <span className=' m=[0_0_0_auto]  opacity-60 ltr:pr-4 rtl:pl-4'>{label}</span>
                        <span> {value.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center ltr:pr-2 rtl:pl-2">
                            <ArrowDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 h-[max-content] max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[4]">
                            {options.map((option: any, index: number) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none  text-center  ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate py-2 ${value.value === option.value ? 'font-bold bg-purple-100 text-purple-900' : 'font-normal'
                                                    }`}
                                            >
                                                {option.name}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
