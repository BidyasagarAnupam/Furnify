import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { FaTimes } from "react-icons/fa"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

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
}) {
    console.log("EDIT DATA FROM UPLOAD", editData)
    const { product } = useSelector((state) => state.product)

    const [selectedFiles, setSelectedFiles] = useState([])
    const [previewSources, setPreviewSources] = useState(
        viewData ? viewData : editData ? editData : []
    )
    const [primaryImageIndex, setPrimaryImageIndex] = useState(0)
    const inputRef = useRef(null)

    // Ensure the new files and previews are appended to the end
    const onDrop = (acceptedFiles) => {
        const files = acceptedFiles.slice(0, 4 - selectedFiles.length)
        if (files && files.length > 0) {
            const newPreviews = files.map(file => URL.createObjectURL(file))
            setPreviewSources(prev => [...prev, ...newPreviews])
            setSelectedFiles(prev => [...prev, ...files])
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video
            ? { "image/*": [".jpeg", ".jpg", ".png"] }
            : { "video/*": [".mp4"] },
        onDrop,
        multiple: selectedFiles.length < 4
    })

    useEffect(() => {
        register(name, { required: true })
    }, [register])

    useEffect(() => {
        console.log("Selected files", selectedFiles)
        setValue(name, selectedFiles)
    }, [selectedFiles, setValue])

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-neutral-5" htmlFor={name}>
                {label} {!viewData && <sup className="text-secondary-red">*</sup>}
            </label>
            <div className="flex flex-row space-x-4">
                <div className="flex flex-col max-h-[250px] overflow-y-auto">
                    {previewSources.length > 0 && (
                        <div className="flex flex-col gap-4">
                            {previewSources.map((src, index) => (
                                <div key={index} className="relative">
                                    {!video ? (
                                        <img
                                            src={src}
                                            alt="Preview"
                                            className="h-24 w-24 rounded-md object-cover"
                                        />
                                    ) : (
                                        <Player aspectRatio="16:9" playsInline src={src} />
                                    )}
                                    {!viewData && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newPreviews = previewSources.filter((_, i) => i !== index)
                                                    const newFiles = selectedFiles.filter((_, i) => i !== index)
                                                    setPreviewSources(newPreviews)
                                                    setSelectedFiles(newFiles)
                                                    setValue(name, newFiles)
                                                    if (index === primaryImageIndex) {
                                                        setPrimaryImageIndex(0)
                                                    }
                                                }}
                                                className="absolute top-0 right-0 mt-1 mr-1 text-red-600"
                                            >
                                                <FaTimes />
                                            </button>
                                            <div className="absolute bottom-0 left-0 ml-1 mb-1">
                                                <input
                                                    type="radio"
                                                    name="primaryImage"
                                                    checked={primaryImageIndex === index}
                                                    onChange={() => setPrimaryImageIndex(index)}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div
                    className={`${isDragActive ? "bg-primary" : "bg-[#F7FAFB]"
                        } flex min-h-[250px] w-full cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-neutral-4`}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} ref={inputRef} disabled={selectedFiles.length >= 4} />
                    {previewSources.length >= 4 || selectedFiles.length >= 4 ? (
                        <div className="text-center text-sm text-red-600">
                            Maximum of 4 images can be uploaded.
                        </div>
                    ) : (
                        <div className="flex flex-col items-center p-6">
                            <div className="grid aspect-square w-14 place-items-center rounded-full bg-neutral-6">
                                <FiUploadCloud className={`text-2xl ${color}`} />
                            </div>
                            <p className="mt-2 max-w-[200px] text-center text-sm text-neutral-4">
                                Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                                <span className={`font-semibold ${color}`}>Browse</span> a
                                file
                            </p>
                            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-neutral-4">
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-secondary-red">
                    {label} is required
                </span>
            )}
        </div>
    )
}
