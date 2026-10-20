import { useEffect, useState } from 'react';
import {getVideos} from '../services/videoService'
import './videouploader.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VideoList() {
 const[videos,setVideos] = useState([]);
 const [sortOption, setSortOption] = useState('NewestFirst');
 // VideoList.jsx - useEffect mein sortOption pass karo
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getVideos(sortOption); // ✅ sortOption pass karo
                setVideos(response.data);
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos();
    }, [sortOption]);
    const handleSortingChange=(e)=>{
        setSortOption(e.target.value);
    }
    const navigate = useNavigate(); 
    const navigateToUploadPage = ()=>{
      navigate('/upload');
    }
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-indigo-400">
              VIDEO LIBRARY
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              My Videos
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage and watch all your uploaded videos.
            </p>
          </div>

          <button
          onClick={navigateToUploadPage}
            type="button"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
          >
            + Upload Video
          </button>
        </div>

        {/* Search + Filter */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">

          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search videos..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <select
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300 outline-none focus:border-indigo-500"
          >
            <option>All Videos</option>
            <option>Ready</option>
            <option>Processing</option>
            <option>Failed</option>
          </select>

        </div>

        {/* Video Count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            <span className="font-medium text-slate-200">
              {videos.length}
            </span>{" "}
            videos
          </p>

          <select
            className="bg-transparent text-sm text-slate-500 outline-none"
            value={sortOption}
            onChange = {handleSortingChange}
            
          >
            <option value='NewestFirst'>Newest first</option>
            <option value='OldestFirst'>Oldest first</option>
            <option value='Name'>Name</option>
          </select>
        </div>

        {/* Video Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* Video Card */}

          {videos.map((video) => (
            <div
                key={video.id}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-black/20"
            >

                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-800">

                <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800">

                    <svg
                    className="h-14 w-14 text-indigo-400 opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path d="M8 5v14l11-7z" />
                    </svg>

                </div>

                {/* Duration */}
                {video.durationSeconds && (
                    <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium">
                    {Math.floor(video.durationSeconds / 60)}:
                    {String(
                        Math.floor(video.durationSeconds % 60)
                    ).padStart(2, "0")}
                    </span>
                )}

                {/* Status */}
                <span
                    className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-xs font-medium text-white ${
                    video.status === 4
                        ? "bg-emerald-500/90"
                        : video.status === 3
                        ? "bg-amber-500/90"
                        : video.status === 5
                        ? "bg-red-500/90"
                        : "bg-slate-600/90"
                    }`}
                >
                    {video.status === 1
                    ? "Uploading"
                    : video.status === 2
                    ? "Uploaded"
                    : video.status === 3
                    ? "Processing"
                    : video.status === 4
                    ? "Ready"
                    : video.status === 5
                    ? "Failed"
                    : "Unknown"}
                </span>

                </div>

                {/* Card Content */}
                <div className="p-4">

                <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                    <h3 className="truncate font-semibold text-slate-100">
                        {video.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {video.description || "No description available."}
                    </p>

                    </div>

                    {/* More */}
                    <button
                    type="button"
                    className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white"
                    >
                    ⋮
                    </button>

                </div>

                {/* Metadata */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">

                    <span>
                    {(video.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </span>

                    <span>
                    {new Date(video.createdAt).toLocaleDateString()}
                    </span>

                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">

                    <button
                    type="button"
                    disabled={video.status !== 4}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                        video.status === 4
                        ? "bg-indigo-600 text-white hover:bg-indigo-500"
                        : "cursor-not-allowed bg-slate-800 text-slate-600"
                    }`}
                    >
                    {video.status === 4 ? "Watch" : "Not Ready"}
                    </button>

                    <button
                    type="button"
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                    >
                    Delete
                    </button>

                </div>

                </div>

            </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default VideoList;

