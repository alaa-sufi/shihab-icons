import useOnClickOutside from '@/hooks/useOnClickOutside';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowDownIcon } from 'react-shihab-icons';



export default function SelectColor({ value, className, onChange, options }: any) {
    const [anotherValue, setAnotherValue] = useState(value.value);
    const [openUl, setOpenUl] = useState(false);
    const ref = useRef(null)
    useOnClickOutside(ref, () => setOpenUl(false))
    useEffect(() => { setAnotherValue(value.value) }, [value])
    function isColor(value: any) {
        if (value !== '') {
            // Regular expression to match hexadecimal color codes (#RRGGBB or #RGB)
            const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

            // Regular expression to match RGB color values (rgb(r, g, b))
            const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;

            // Regular expression to match RGBA color values (rgba(r, g, b, a))
            const rgbaRegex = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(1|0?\.\d+)\s*\)$/;


            var s = new Option().style;
            s.color = value;

            // return 'false' if color wasn't assigned
            const isString = s.color == value.toLowerCase();
            // Test against the regular expressions
            return hexRegex.test(value) || rgbRegex.test(value) || rgbaRegex.test(value) || isString;
        } else {
            return false
        }
    }
    return (
        <div className={`${className} w-max `} ref={ref}>
            <Listbox value={value} onChange={onChange} >
                {() => (
                    <>
                        <div className="relative mt-1 z-[2]">
                            <Listbox.Button style={{ background: value.value, color: 'white' }} className="relative w-full cursor-default rounded-3xl bg-gray text-white py-2 pl-3 pr-7 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm flex gap-1" onClick={() => setOpenUl(true)}>
                                <span> {value.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ArrowDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                show={openUl}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 h-[max-content] max-h-72  w-max rtl:left-0 ltr:right-0 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm grid    grid-cols-[1fr_1fr_1fr]  p-4">
                                    {options.map((option: any, index: number) => (
                                        <Listbox.Option
                                            onClick={() => setOpenUl(false)}
                                            key={index}
                                            className={({ active }) =>
                                                `relative  select-none text-center cursor-pointer hover:transform hover:scale-105 border border-transparent transition-colors hover:border-primary  ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={option}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate  w-8 h-8 ${selected ? 'font-medium' : 'font-normal'}`} style={{ background: option.value }}
                                                    >
                                                        {/* {option.name} */}
                                                    </span>
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                    <div className={' col-span-3 '} >
                                        <input type="text" value={anotherValue} className={`relative  select-none text-center cursor-pointer hover:transform hover:scale-105 border border-transparent transition-colors hover:border-primary w-24 `} onChange={e => { isColor(e.target.value) && onChange({ value: e.target.value }); setAnotherValue(e.target.value) }} />
                                    </div>
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    )
}
