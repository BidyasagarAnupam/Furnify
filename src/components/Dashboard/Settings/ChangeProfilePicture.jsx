import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { updateDisplayPicture } from "../../../services/operations/SettingsAPI"
import IconBtn from "../../common/IconBtn"
import Modal from "../Modal"

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  // this state is used to priview the profile picture
  const [previewSource, setPreviewSource] = useState(null)


  // CODE FOR CROPPING THE IMAGE
  const [imageModal, setImageModal] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [error, setError] = useState("");


  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);

    });
    reader.readAsDataURL(file);
    setImageModal(true);

    // console.log(file)
    // if (file) {
    //   console.log("FILE IS ", file);
    //   setImageModal(true);
    //   setImageFile(file)
    //   previewFile(file)
    // }
  }

  const updateAvatar = (imgSrc) => {
    // setPreviewSource(imgSr)
    // avatar.current = imgSrc;
    const reader = new FileReader()
    reader.readAsDataURL(imgSrc)

    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
    setImgSrc(imgSrc)
  };

  const previewFile = (file) => {
    setPreviewSource(file)
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imgSrc)
      console.log("image file from change profile", imgSrc)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      console.log("Image file ", imageFile);
      previewFile(imageFile)
    }
  }, [imageFile])
  return (
    <>
      <div className="flex items-center justify-between rounded-md neomorphic p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-primary"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                loading={loading}
              >
                {!loading && (
                  <FiUpload className="text-xl" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
      {imageModal && <Modal updateAvatar={updateAvatar}
        closeModal={() => setImageModal(false)} imgSrc={imgSrc} />}
    </>
  )
}