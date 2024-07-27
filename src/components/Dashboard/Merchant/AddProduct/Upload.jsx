import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiX, FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";

import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
    name,
    label,
    register,
    setValue,
    errors,
    color = 'text-richBlue-300',
    video = false,
    viewData = null,
    editData = null,
    editSecondaryData = null,
}) {
    const { product } = useSelector((state) => state.product);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(viewData ? viewData : editData ? editData : "");
    const [secondaryFiles, setSecondaryFiles] = useState([]);
    const [secondaryPreviews, setSecondaryPreviews] = useState(viewData ? viewData : editSecondaryData ? editSecondaryData : []);
    const inputRef = useRef(null);
    console.log("SECONDARRRRRRRRRRRRRRRRRY=======>>>>", editSecondaryData);

    const onDropPrimary = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            previewFile(file, setPreviewSource);
            setSelectedFile(file);
        }
    };

    const onDropSecondary = (acceptedFiles) => {
        const newFiles = [...secondaryFiles, ...acceptedFiles].slice(0, 3);
        setSecondaryFiles(newFiles);
        const previews = newFiles.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        });
        Promise.all(previews).then(images => {
            setSecondaryPreviews(images);
        });
    };

    const { getRootProps: getRootPropsPrimary, getInputProps: getInputPropsPrimary, isDragActive: isDragActivePrimary } = useDropzone({
        accept: !video ? { "image/*": [".jpeg", ".jpg", ".png"] } : { "video/*": [".mp4"] },
        onDrop: onDropPrimary,
    });

    const { getRootProps: getRootPropsSecondary, getInputProps: getInputPropsSecondary, isDragActive: isDragActiveSecondary } = useDropzone({
        accept: { "image/*": [".jpeg", ".jpg", ".png"] },
        onDrop: onDropSecondary,
    });

    const previewFile = (file, setPreview) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result);
        };
    };

    const handleRemoveSecondaryImage = (index) => {
        const newFiles = secondaryFiles.filter((_, i) => i !== index);
        setSecondaryFiles(newFiles);
        const newPreviews = secondaryPreviews.filter((_, i) => i !== index);
        setSecondaryPreviews(newPreviews);
    };

    useEffect(() => {
        register(name, { required: true });
        register('secondaryImages', { required: false });
    }, [register, name]);

    useEffect(() => {
        setValue(name, selectedFile);
        setValue('secondaryImages', secondaryFiles);
    }, [selectedFile, secondaryFiles, setValue, name]);

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
                <label className="text-sm text-neutral-5" htmlFor={name}>
                    {label} {!viewData && <sup className="text-secondary-red">*</sup>}
                </label>
                <div className={`${isDragActivePrimary ? "bg-primary" : "bg-[#F7FAFB]"} flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-neutral-4`}>
                    {previewSource ? (
                        <div className="flex w-full flex-col p-6">
                            {!video ? (
                                <img
                                    src={previewSource}
                                    alt="Preview"
                                    className="h-full w-full rounded-md object-cover"
                                />
                            ) : (
                                <Player aspectRatio="16:9" playsInline src={previewSource} />
                            )}
                            {!viewData && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewSource("");
                                        setSelectedFile(null);
                                        setValue(name, null);
                                    }}
                                    className="mt-3 text-neutral-4 underline"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="flex w-full flex-col items-center p-6" {...getRootPropsPrimary()}>
                            <input {...getInputPropsPrimary()} ref={inputRef} />
                            <div className="grid aspect-square w-14 place-items-center rounded-full bg-neutral-6">
                                <FiUploadCloud className={`text-2xl ${color}`} />
                            </div>
                            <p className="mt-2 max-w-[200px] text-center text-sm text-neutral-4">
                                Drag and drop an {!video ? "image" : "video"}, or click to <span className={`font-semibold ${color}`}>Browse</span> a file
                            </p>
                            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-neutral-4">
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>
                        </div>
                    )}
                </div>
                {errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-secondary-red">
                        {label} is required
                    </span>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-neutral-5" htmlFor={`${name}_secondary`}>
                    Secondary Images
                </label>
                <div className={`${isDragActiveSecondary ? "bg-primary" : "bg-[#F7FAFB]"} flex min-h-[100px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-neutral-4`}>
                    {secondaryPreviews.length > 0 ? (
                        <div className="flex w-full flex-row flex-wrap p-6 space-x-2">
                            {secondaryPreviews.map((src, index) => (
                                <div key={index} className="relative h-28 w-28">
                                    <img
                                        src={src}
                                        alt={`Preview ${index}`}
                                        className="h-full w-full rounded-md object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSecondaryImage(index)}
                                        className="absolute top-0 right-0 bg-neutral-6 rounded-full p-1 text-neutral-4"
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            ))}
                            {secondaryPreviews.length < 3 && (
                                <div className="relative h-28 w-28 flex items-center justify-center rounded-md border-2 border-dotted border-neutral-4 bg-[#F7FAFB] cursor-pointer" {...getRootPropsSecondary()}>
                                    <input {...getInputPropsSecondary()} />
                                    <FiPlus className={`text-2xl ${color}`} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex w-full flex-col items-center p-6" {...getRootPropsSecondary()}>
                            <input {...getInputPropsSecondary()} />
                            <div className="grid aspect-square w-14 place-items-center rounded-full bg-neutral-6">
                                <FiUploadCloud className={`text-2xl ${color}`} />
                            </div>
                            <p className="mt-2 max-w-[200px] text-center text-sm text-neutral-4">
                                Drag and drop up to 3 images, or click to <span className={`font-semibold ${color}`}>Browse</span> files
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
