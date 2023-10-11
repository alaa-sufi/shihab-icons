import { Dialog, Transition } from '@headlessui/react';
import html2canvas from 'html2canvas';
import { useTranslation } from 'next-i18next';
import React, { Fragment, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactDOMServer from 'react-dom/server';
import { CloseIcon, CopyIcon } from 'react-shihab-icons';

export default function Modal({ open, onClose, currentItem, filter }: any) {
    const { t } = useTranslation();
    const Icon = currentItem.icon;
    const [showCopied, setShowCopied] = useState(false);
    const svgRef = React.useRef(null);
    const handleDownloadSvg = () => {
        const svgString = ReactDOMServer.renderToString(<Icon color={filter.color} size={filter.size} variant={filter.variant} />);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${currentItem.name}.svg`;
        link.click();
        URL.revokeObjectURL(url);
    }

    const handleDownloadPng = () => {
        if (svgRef.current) {
            html2canvas(svgRef?.current, { useCORS: true, backgroundColor: null })
                .then(canvas => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = `${currentItem.name}.png`;

                    link.click();
                });
        }
    }
    const copyValue = `<${currentItem.icon.name}
  color="${filter.color}"
  size="${filter.size}px" 
  ${filter.variant === 'TwoTone' ? `variant="${filter.variant}"
/>` : '/>'}`

    function toPascalCase(str: string) {
        const words = str.split(/[\s-]+/);
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        return capitalizedWords.join("") + 'Icon';

    }
    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10 " onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-t from-primary   to-black  p-6 text-left align-middle shadow-xl transition-all relative [direction:ltr]">
                                    <button className='bg-white rounded-full text-red-500 absolute p-2 hover:scale-105 top-4 left-4' onClick={onClose}><CloseIcon /></button>
                                    <div className="bg-darkGray rounded-3xl  p-4 text-white m-auto text-center mb-4 w-max  flex justify-center items-center"  >
                                        <div ref={svgRef}>
                                            <Icon color={filter.color} size={filter.size} variant={filter.variant} />
                                        </div>
                                    </div>
                                    <p className='ltr:capitalize text-center mb-4'>{currentItem.name}</p>


                                    <pre className='bg-black text-white px-4 py-2 rounded-lg block relative'>
                                        <code>
                                            <pre ><span className="text-blue-300">&lt;</span><span className="text-yellow">{toPascalCase(currentItem.name)}{"\n"}{""}</span><span className="text-purple-400"> size</span><span className="text-gray-200">=</span><span className="text-green-400">&quot;{filter.size}px&quot;{"\n"}{""}</span><span className="text-purple-400"> color</span><span className="text-gray-200">=</span><span className="text-green-400">&quot;{filter.color}&quot;{"\n"}{""}</span>{filter.variant === 'TwoTone' && <><span className="text-purple-400"> variant</span><span className="text-gray-200">=</span><span className="text-green-400">&quot;{filter.variant}&quot;{"\n"}{""}</span></>}<span className="text-blue-300">/&gt;</span></pre>
                                            <button className='cursor-pointer absolute top-2 right-2  bg-gray p-1 w-8 h-8 rounded-sm hover:scale-105 '>
                                                <CopyToClipboard text={copyValue} onCopy={() => { setShowCopied(true); setTimeout(() => setShowCopied(false), 1000) }}>
                                                    <CopyIcon />
                                                </CopyToClipboard>
                                            </button>
                                            {showCopied && <span className='absolute right-2 top-10 bg-[gray] px-[0.2rem] py-[0.1rem] rounded-[0.4rem]'>{t('copied')}</span>}
                                        </code>
                                    </pre>
                                    <div className='flex gap-2 justify-center mt-10 mb-6'>
                                        <button className='bg-primary text-white text-center px-4 py-2 text-sm rounded-3xl hover:bg-white hover:text-primary transition-colors hover:border-primary border' onClick={handleDownloadPng}>{t('download_png')}</button>
                                        <button className='bg-primary text-white text-center px-4 py-2 text-sm rounded-3xl hover:bg-white hover:text-primary transition-colors hover:border-primary border' onClick={handleDownloadSvg}>{t('download_svg')}</button>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
