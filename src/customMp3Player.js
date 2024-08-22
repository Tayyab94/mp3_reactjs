import React, { useState, useRef, useEffect } from 'react'

export const CustomMp3Player = () => {

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)
    const [progress, setProgress] = useState(0)
    const [playlist, setPlaylist] = useState([])


    const handleFileUpload = (event) => {

        const files = Array.from(event.target.files);

        const validFiles = files.filter((file) => file.type === "audio/mpeg")
            .map((file) => ({
                name: file.name,
                url: URL.createObjectURL(file),
            }));

        setPlaylist((prevPlaylist) => [...prevPlaylist, ...validFiles]);

        if (validFiles.length > 0 && playlist.length === 0) {
            setCurrentTrackIndex(0); setIsPlaying(true)
        }
    }


    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    }

    const nextTrack = () => {
        setCurrentTrackIndex((prevIndex) => {
            return prevIndex + 1 < playlist.length ? prevIndex + 1 : 0
        }
        );
        setProgress(0);
        setIsPlaying(true)
    }

    const prevTrack = () => {
        setCurrentTrackIndex((prevIndex) =>
            prevIndex - 1 >= 0 ? prevIndex - 1 : playlist.length - 1
        )
        setIsPlaying(true)
        setProgress(0);
    }

    const updateProgress = () => {
        const { currentTime, duration } = audioRef.current;
        const progressPercentage = (currentTime / duration) * 100;
        setProgress(progressPercentage);
    }

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener('timeupdate', updateProgress);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, [currentTrackIndex]);

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setPlaylist(droppedFiles);
        console.log(droppedFiles);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    return (
        <div style={styles.container}>
            <h2 style={styles.trackName}>{playlist[currentTrackIndex]?.name}</h2>

            {isPlaying !== true && (

                <div style={styles.dropArea}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}>

                    <input type="file" accept="audio/*"
                        multiple
                        onChange={handleFileUpload}
                        style={styles.fileInput} />
                    <label htmlFor="fileInput" style={styles.fileInputLabel}>
                        {playlist[currentTrackIndex]?.name}
                    </label>
                </div>

            )}

            {
                playlist.length > 0 && (
                    <>
                        <audio
                            ref={audioRef}
                            src={playlist[currentTrackIndex]?.url}
                            onEnded={nextTrack}
                            autoPlay={isPlaying}
                        />

                        <div style={styles.controls}>
                            <button style={styles.button} onClick={prevTrack}>⏮ Prev</button>
                            <button style={styles.playButton} onClick={togglePlayPause}>
                                {isPlaying ? "⏸ Pause" : "▶ Play"}
                            </button>
                            <button style={styles.button} onClick={nextTrack}>⏭ Next</button>
                        </div>

                        <div style={styles.progressContainer}>
                            <div style={{ ...styles.progressBar, width: `${progress}%` }}>
                                {isNaN(parseInt(progress)) ? '0%' : `${parseInt(progress)}%`}
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}


const styles = {
    dropArea: {
        width: '300px',
        height: '150px',
        border: '2px dashed #4CAF50',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
        marginBottom: '20px',
        transition: 'background-color 0.3s ease',
    },
    fileInput: {
        display: 'none',
    },
    fileInputLabel: {
        fontSize: '16px',
        color: '#4CAF50',
        textAlign: 'center',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f7f7f7",
        fontFamily: "Arial, sans-serif",
    },
    trackName: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    controls: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
    },
    button: {
        fontSize: "18px",
        padding: "10px 20px",
        margin: "0 10px",
        borderRadius: "50px",
        border: "none",
        backgroundColor: "#4CAF50",
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    playButton: {
        fontSize: "18px",
        padding: "10px 40px",
        margin: "0 10px",
        borderRadius: "50px",
        border: "none",
        backgroundColor: "#2196F3",
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    progressContainer: {
        width: "80%",
        height: "18px",
        backgroundColor: "#ddd",
        borderRadius: "4px",
        overflow: "hidden",
    },
    progressBar: {
        width: "50%", // Dynamic based on the audio progress
        height: "100%",
        backgroundColor: "#4CAF50",

    },
    fileInput: {
        marginBottom: "20px",
        fontSize: "16px",
    },
}