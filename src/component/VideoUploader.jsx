import './videouploader.css'
import { useState, useRef } from "react";
import {uploadVideo} from '../services/videoService'

function VideoUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    
    const handleFileChange = (e)=>{
        setSelectedFile(e.target.files[0])
    }
    const handleCancel = () => {
        console.log("Cancel button clicked");
        setSelectedFile(null);
        setVideoTitle('');
        setVideoDescription('');
        setUploadProgress(0);
        setIsUploading(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const handleTitleInputChange = (e)=>{
        setVideoTitle(e.target.value)
    }

    const handleDescriptionInputChange = (e)=>{
        setVideoDescription(e.target.value)
    }
    const uploadedMB = selectedFile ? ((selectedFile.size * uploadProgress) / 100 / (1024 * 1024)).toFixed(2): 0;

    const totalMB = selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) : 0;
    const uploadVideoToBackend = async () => {
    if (!selectedFile) {
        alert("Please select a video.");
        return;
    }
    if (!videoTitle.trim()) {
        alert("Please enter video title.");
        return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    try {
        setIsUploading(true);
        setUploadProgress(0);
        await uploadVideo(formData, (progress) => {
            setUploadProgress(progress);
        });
        
        // ✅ Success - fields clear karo aur message dikhao
        setSelectedFile(null);
        setVideoTitle('');
        setVideoDescription('');
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        alert("✅ Video uploaded successfully!");
        
    } catch (error) {
        console.error("Upload failed:", error);
        alert("❌ Video upload failed.");
    } finally {
        setIsUploading(false);
    }
};
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Upload your video
          </h1>

          <p className="mt-2 text-gray-500">
            Upload and manage your videos from one place.
          </p>
        </div>

        {/* Upload Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          {/* Drop Zone */}
          <div className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center transition hover:border-indigo-400 hover:bg-indigo-50">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <svg
                className="h-8 w-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V3m0 0L8 7m4-4l4 4"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              Drag & drop your video here
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              or
            </p>
            <label htmlFor="videoInput" className="mt-3 inline-block cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
                Choose Video
            </label>

            <input type="file" accept="video/*" className="hidden" id="videoInput" onChange={handleFileChange}  ref={fileInputRef} />
            <p className="mt-4 text-xs text-gray-400">
              MP4, MOV, WebM or MKV · Maximum size 2GB
            </p>
          </div>

          {/* Video Title */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Video Title
            </label>

            <input
              type="text"
              placeholder="Enter video title"
              onChange ={handleTitleInputChange}
              value={videoTitle}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              onChange={handleDescriptionInputChange}
              value={videoDescription}
              rows="4"
              placeholder="Tell viewers about your video..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Selected Video */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Selected Video
            </label>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                  <svg
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {selectedFile ? selectedFile.name : "No file selected"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    TYPE: {selectedFile ? selectedFile.type.split('/')[1].toUpperCase() : "No file selected"} SIZE: {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : "0 MB"}
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="ml-4 rounded-lg p-2 text-gray-400 transition hover:bg-gray-200 hover:text-red-500"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={()=>{
                    setSelectedFile(null)
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

            </div>
          </div>

          {/* Upload Progress - UI only */}
          <div className="mt-6">

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Uploading...
              </span>

              <span className="text-sm font-medium text-indigo-600">
                {uploadProgress}%
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>{uploadedMB} MB of {totalMB} MB</span>
              <span>32 MB/s</span>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end gap-3">

            <button
                onClick={handleCancel}
                type="button"
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
                Cancel
            </button>

            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
              onClick = {uploadVideoToBackend}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default VideoUploader;

