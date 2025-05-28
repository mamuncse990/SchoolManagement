"use client";

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './local-upload-widget-scrollbar.css'; // We'll add a CSS file for hiding the scrollbar

interface LocalUploadWidgetProps {
  onSuccess: (filePaths: string[]) => void;
  folderName: string;
  onClose?: () => void;
}

const topBarIcons = [
  {
    label: 'My Files',
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" fill="none"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
    ),
  },
  {
    label: 'Web Address',
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>
    ),
  },
  {
    label: 'Camera',
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3l2-3h4l2 3h3a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
    ),
  },
  {
    label: 'Google Drive',
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 17.25 15 6 21 17.25 9 17.25 3 17.25"/><polygon points="3 17.25 9 17.25 15 6 9 6 3 17.25"/></svg>
    ),
  },
  {
    label: 'Dropbox',
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6.5 5 12 8.5 17.5 5 12 1.5 6.5 5"/><polygon points="6.5 19 12 22.5 17.5 19 12 15.5 6.5 19"/><polygon points="1.5 12 6.5 15 12 11.5 6.5 8 1.5 12"/><polygon points="22.5 12 17.5 15 12 11.5 17.5 8 22.5 12"/></svg>
    ),
  },
  {
    label: 'Shutterstock',
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
    ),
  },
  {
    label: 'gettyimages',
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
    ),
  },
];

interface FileQueueItem {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'uploaded' | 'error';
  uploadedPath?: string;
  errorMsg?: string;
}

const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'; // <-- Replace with your Google API key
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // <-- Replace with your Google Client ID
const DROPBOX_APP_KEY = 'YOUR_DROPBOX_APP_KEY'; // <-- Replace with your Dropbox App Key

const LocalUploadWidget = ({ onSuccess, folderName, onClose }: LocalUploadWidgetProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [queue, setQueue] = useState<FileQueueItem[]>([]);
  const [showQueue, setShowQueue] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 = My Files
  const [webUrl, setWebUrl] = useState("");
  const [webUrlPreview, setWebUrlPreview] = useState<string | null>(null);
  const [webUrlError, setWebUrlError] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraPreview, setCameraPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [pickerLoaded, setPickerLoaded] = useState(false);
  const [dropboxLoaded, setDropboxLoaded] = useState(false);
  const [shutterstockUrl, setShutterstockUrl] = useState('https://www.shutterstock.com/image-photo/mountain-landscape-nepal-tourism-trekking-himalayas-260nw-1937023502.jpg');
  const tabBarRef = useRef<HTMLDivElement>(null);

  // Start camera when Camera tab is active
  useEffect(() => {
    if (activeTab === 2) {
      setCameraError(null);
      setCameraPreview(null);
      if (!cameraStream) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            setCameraStream(stream);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch(() => setCameraError("Could not access camera."));
      } else {
        if (videoRef.current) {
          videoRef.current.srcObject = cameraStream;
        }
      }
    } else {
      // Stop camera when leaving tab
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      }
      setCameraPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Google Picker loader
  useEffect(() => {
    if (activeTab === 3 && !gapiLoaded) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => setGapiLoaded(true);
      document.body.appendChild(script);
    }
    if (activeTab === 3 && !pickerLoaded) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => setPickerLoaded(true);
      document.body.appendChild(script);
    }
    if (activeTab === 4 && !dropboxLoaded) {
      const script = document.createElement('script');
      script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
      script.id = 'dropboxjs';
      script.setAttribute('data-app-key', DROPBOX_APP_KEY);
      script.onload = () => setDropboxLoaded(true);
      document.body.appendChild(script);
    }
  }, [activeTab, gapiLoaded, pickerLoaded, dropboxLoaded]);

  // Take photo from video
  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setCameraPreview(dataUrl);
    }
  };

  // Add camera photo to queue
  const addCameraToQueue = () => {
    if (!cameraPreview) return;
    // Convert dataURL to File
    fetch(cameraPreview)
      .then(res => res.arrayBuffer())
      .then(buf => {
        const file = new File([buf], `photo-${Date.now()}.png`, { type: 'image/png' });
        setQueue(prev => [
          ...prev,
          {
            file,
            preview: cameraPreview,
            status: 'pending',
          },
        ]);
        setShowQueue(true);
        setCameraPreview(null);
      });
  };

  // Handle file selection (input or drop)
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    // Filter duplicates within the new selection itself
    const seen = new Set<string>();
    const newItems: FileQueueItem[] = [];
    Array.from(files).forEach(file => {
      const key = file.name + '-' + file.size;
      if (!seen.has(key)) {
        seen.add(key);
        newItems.push({
          file,
          preview: URL.createObjectURL(file),
          status: 'pending',
        });
      }
    });
    setQueue(prev => {
      // Prevent duplicates by name+size in the queue
      const existing = new Set(prev.map(item => item.file ? item.file.name + '-' + item.file.size : 'web-' + item.preview));
      const filtered = newItems.filter(item => {
        if (item.file) {
          return !existing.has(item.file.name + '-' + item.file.size);
        } else {
          return !existing.has('web-' + item.preview);
        }
      });
      return [...prev, ...filtered];
    });
    setShowQueue(true);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Always clear the file input so selecting the same file again works
    if (e.target.value) e.target.value = "";
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  // Remove file from queue
  const removeFromQueue = (idx: number) => {
    setQueue(prev => prev.filter((_, i) => i !== idx));
  };

  // Upload all files in queue
  const uploadAll = async () => {
    setUploading(true);
    const updatedQueue = [...queue];
    for (let i = 0; i < updatedQueue.length; i++) {
      if (updatedQueue[i].status !== 'pending') continue;
      updatedQueue[i].status = 'uploading';
      setQueue([...updatedQueue]);
      const formData = new FormData();
      formData.append('file', updatedQueue[i].file);
      formData.append('folderName', folderName);
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Upload failed');
        const data = await response.json();
        updatedQueue[i].status = 'uploaded';
        updatedQueue[i].uploadedPath = data.filePath;
      } catch (error: any) {
        updatedQueue[i].status = 'error';
        updatedQueue[i].errorMsg = error?.message || 'Upload failed';
      }
      setQueue([...updatedQueue]);
    }
    setUploading(false);
    // Only call onSuccess if all files uploaded
    if (updatedQueue.every(item => item.status === 'uploaded')) {
      onSuccess(updatedQueue.map(item => item.uploadedPath!));
      if (onClose) onClose();
    }
  };

  // Add web image to queue
  const addWebUrlToQueue = async () => {
    setWebUrlError(null);
    if (!webUrl) {
      setWebUrlError("Please enter an image URL.");
      return;
    }
    // Validate image URL by trying to load it
    try {
      const res = await fetch(webUrl, { method: 'HEAD' });
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.startsWith('image/')) {
        setWebUrlError("URL does not point to an image.");
        return;
      }
      // Add to queue as a 'web' item
      setQueue(prev => [
        ...prev,
        {
          file: null as any, // Not a File object
          preview: webUrl,
          status: 'pending',
          uploadedPath: webUrl, // For web images, just use the URL
        },
      ]);
      setShowQueue(true);
      setWebUrl("");
      setWebUrlPreview(null);
    } catch {
      setWebUrlError("Could not load image from URL.");
    }
  };

  // Show preview when typing a URL
  const handleWebUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebUrl(e.target.value);
    setWebUrlPreview(e.target.value ? e.target.value : null);
    setWebUrlError(null);
  };

  // Google Drive Picker
  const openGooglePicker = () => {
    if (!(window as any).gapi) return alert('Google API not loaded');
    const gapi = (window as any).gapi;
    gapi.load('auth', { callback: onAuthApiLoad });
    gapi.load('picker', { callback: onPickerApiLoad });
    let oauthToken = '';
    function onAuthApiLoad() {
      gapi.auth.authorize(
        {
          client_id: GOOGLE_CLIENT_ID,
          scope: ['https://www.googleapis.com/auth/drive.readonly'],
          immediate: false,
        },
        (authResult: any) => {
          if (authResult && !authResult.error) {
            oauthToken = authResult.access_token;
            createPicker();
          }
        }
      );
    }
    function onPickerApiLoad() {
      // nothing needed here
    }
    function createPicker() {
      const picker = new (window as any).google.picker.PickerBuilder()
        .addView((window as any).google.picker.ViewId.DOCS_IMAGES)
        .setOAuthToken(oauthToken)
        .setDeveloperKey(GOOGLE_API_KEY)
        .setCallback((data: any) => {
          if (data.action === 'picked' && data.docs && data.docs.length > 0) {
            const url = data.docs[0].url || data.docs[0].thumbnails?.[0]?.url;
            if (url) {
              setQueue(prev => [
                ...prev,
                {
                  file: null as any,
                  preview: url,
                  status: 'pending',
                  uploadedPath: url,
                },
              ]);
              setShowQueue(true);
            }
          }
        })
        .build();
      picker.setVisible(true);
    }
  };

  // Dropbox Chooser
  const openDropboxChooser = () => {
    if (!(window as any).Dropbox) return alert('Dropbox API not loaded');
    (window as any).Dropbox.choose({
      linkType: 'direct',
      multiselect: false,
      extensions: ['.png', '.jpg', '.jpeg', '.gif'],
      success: (files: any[]) => {
        if (files && files.length > 0) {
          setQueue(prev => [
            ...prev,
            {
              file: null as any,
              preview: files[0].link,
              status: 'pending',
              uploadedPath: files[0].link,
            },
          ]);
          setShowQueue(true);
        }
      },
    });
  };

  // Scroll tab bar left/right
  const scrollTabBar = (direction: 'left' | 'right') => {
    if (!tabBarRef.current) return;
    const container = tabBarRef.current;
    const scrollAmount = 120;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // UI: Upload area or queue
  return (
    <div className="w-full max-w-2xl mx-auto border rounded-lg bg-white shadow-md relative">
      {/* Top bar with scroll and arrows outside */}
      <div className="relative flex items-center border-b bg-white rounded-t-lg" style={{ minHeight: 70 }}>
        <button
          type="button"
          className="absolute left-0 z-10 h-full flex items-center px-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
          onClick={() => scrollTabBar('left')}
          style={{ background: 'white', borderRadius: '0 8px 8px 0' }}
        >
          <FaChevronLeft />
        </button>
        <div
          ref={tabBarRef}
          className="flex items-end overflow-x-auto local-upload-widget-scrollbar mx-8 w-full"
          style={{ scrollBehavior: 'smooth', minWidth: 0, whiteSpace: 'nowrap' }}
        >
          {topBarIcons.map((icon, idx) => (
            <button
              key={icon.label}
              type="button"
              onClick={() => setActiveTab(idx)}
              className="flex flex-col items-center justify-end focus:outline-none min-w-[80px] mx-4"
              style={{ flex: '0 0 auto' }}
            >
              <div className={`w-7 h-7 flex items-center justify-center ${activeTab === idx ? 'text-blue-600' : 'text-gray-500'}`}>{icon.svg}</div>
              <span className={`text-xs mt-1 ${activeTab === idx ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>{icon.label}</span>
              {activeTab === idx && <div className="w-full h-1 bg-blue-500 rounded-t mt-1" />}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="absolute right-0 z-10 h-full flex items-center px-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
          onClick={() => scrollTabBar('right')}
          style={{ background: 'white', borderRadius: '8px 0 0 8px' }}
        >
          <FaChevronRight />
        </button>
        <button
          className="text-gray-400 hover:text-gray-700 text-2xl font-bold ml-auto absolute right-2 top-2"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
      </div>
      {/* Only show upload area for My Files tab (index 0) */}
      {activeTab === 0 && (
        showQueue && queue.length > 0 ? (
          <div className="p-6 bg-gray-100 min-h-[320px]">
            <div className="mb-4 text-lg font-semibold">Upload Queue</div>
            <div className="flex flex-wrap gap-6">
              {queue.map((item, idx) => (
                <div key={idx} className="w-40 bg-white rounded shadow p-2 flex flex-col items-center relative">
                  <img src={item.preview} alt={item.file?.name || item.preview} className="w-32 h-24 object-contain bg-gray-100 rounded" />
                  <div className="text-xs mt-2 truncate w-full text-center" title={item.file?.name || item.preview}>{item.file?.name || item.preview}</div>
                  {item.status === 'uploading' && <div className="text-xs text-blue-500 mt-1">Uploading...</div>}
                  {item.status === 'uploaded' && <div className="text-xs text-green-600 mt-1">Uploaded</div>}
                  {item.status === 'error' && <div className="text-xs text-red-500 mt-1">Failed</div>}
                  <button
                    className="absolute top-1 right-1 text-gray-400 hover:text-red-500"
                    onClick={() => removeFromQueue(idx)}
                    disabled={item.status === 'uploading'}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded font-semibold disabled:opacity-60"
                onClick={uploadAll}
                disabled={uploading || queue.length === 0 || queue.every(item => item.status !== 'pending')}
              >
                {uploading ? 'Uploading...' : 'Done'}
              </button>
              <button
                className="bg-gray-300 px-6 py-2 rounded font-semibold"
                onClick={onClose}
                type="button"
                disabled={uploading}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // Drag and drop area
          <div
            className={`flex flex-col items-center justify-center py-16 px-4 transition-all ${dragActive ? 'bg-blue-50 border-blue-400' : 'bg-gray-100 border-gray-300'} border-2 border-dashed rounded-b-lg`}
            onDragOver={e => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            style={{ cursor: 'pointer', minHeight: 320 }}
          >
            <div className="flex flex-col items-center">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7"/><rect x="3" y="17" width="18" height="4" rx="2"/></svg>
              <p className="mt-4 text-gray-500 text-lg">Drag and Drop assets here</p>
              <span className="my-2 text-gray-400">Or</span>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold mt-2"
                onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
              >
                Browse
              </button>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={onInputChange}
                accept="image/*"
                multiple
              />
            </div>
          </div>
        )
      )}
      {/* For Web Address tab, show input and preview */}
      {activeTab === 1 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-b-lg min-h-[320px]">
          <div className="w-full max-w-md flex flex-col items-center gap-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Paste image URL here..."
              value={webUrl}
              onChange={handleWebUrlChange}
              disabled={showQueue}
            />
            {webUrlPreview && (
              <img
                src={webUrlPreview}
                alt="Preview"
                className="w-40 h-32 object-contain bg-white border rounded shadow"
                onError={() => setWebUrlError("Invalid image URL.")}
              />
            )}
            {webUrlError && <span className="text-red-500 text-xs">{webUrlError}</span>}
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded font-semibold disabled:opacity-60"
              onClick={addWebUrlToQueue}
              disabled={!webUrl || !!webUrlError || showQueue}
            >
              Add to Queue
            </button>
          </div>
        </div>
      )}
      {/* For Camera tab, show camera UI */}
      {activeTab === 2 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-b-lg min-h-[320px]">
          <div className="w-full max-w-md flex flex-col items-center gap-4">
            {cameraError && <span className="text-red-500 text-xs">{cameraError}</span>}
            {!cameraPreview && (
              <>
                <video ref={videoRef} autoPlay playsInline className="w-64 h-48 bg-black rounded" />
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded font-semibold mt-2"
                  onClick={takePhoto}
                  type="button"
                >
                  Take Photo
                </button>
              </>
            )}
            {cameraPreview && (
              <>
                <img src={cameraPreview} alt="Camera Preview" className="w-40 h-32 object-contain bg-white border rounded shadow" />
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded font-semibold"
                    onClick={addCameraToQueue}
                    type="button"
                  >
                    Add to Queue
                  </button>
                  <button
                    className="bg-gray-300 px-6 py-2 rounded font-semibold"
                    onClick={() => setCameraPreview(null)}
                    type="button"
                  >
                    Retake
                  </button>
                </div>
              </>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
      {/* For Google Drive tab */}
      {activeTab === 3 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-b-lg min-h-[320px]">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded font-semibold"
            onClick={openGooglePicker}
            type="button"
          >
            Pick from Google Drive
          </button>
          <div className="text-xs text-gray-400 mt-2">You must configure your Google API key and Client ID in the code.</div>
        </div>
      )}
      {/* For Dropbox tab */}
      {activeTab === 4 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-b-lg min-h-[320px]">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded font-semibold"
            onClick={openDropboxChooser}
            type="button"
          >
            Pick from Dropbox
          </button>
          <div className="text-xs text-gray-400 mt-2">You must configure your Dropbox App Key in the code.</div>
        </div>
      )}
      {/* For Shutterstock tab (demo) */}
      {activeTab === 5 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-b-lg min-h-[320px]">
          <div className="w-full max-w-md flex flex-col items-center gap-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Paste Shutterstock image URL here..."
              value={shutterstockUrl}
              onChange={e => setShutterstockUrl(e.target.value)}
            />
            <img
              src={shutterstockUrl}
              alt="Shutterstock Preview"
              className="w-40 h-32 object-contain bg-white border rounded shadow"
            />
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded font-semibold"
              onClick={() => {
                setQueue(prev => [
                  ...prev,
                  {
                    file: null as any,
                    preview: shutterstockUrl,
                    status: 'pending',
                    uploadedPath: shutterstockUrl,
                  },
                ]);
                setShowQueue(true);
              }}
              type="button"
            >
              Add to Queue
            </button>
            <div className="text-xs text-gray-400 mt-2">This is a demo. Real Shutterstock integration requires API keys and OAuth.</div>
          </div>
        </div>
      )}
      {/* For other tabs, just show a placeholder */}
      {activeTab !== 0 && activeTab !== 1 && activeTab !== 2 && activeTab !== 3 && activeTab !== 4 && activeTab !== 5 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-b-lg min-h-[320px]">
          <span className="text-gray-400 text-lg">This source is not yet supported.</span>
        </div>
      )}
      
      {/* Bottom close button - always visible */}
      <div className="flex justify-center p-4 bg-gray-50 border-t">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-2 rounded font-semibold transition-colors"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LocalUploadWidget;