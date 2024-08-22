import React, { useState, useRef, useEffect } from 'react'

export const Mp3Player = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)
    const [progress, setProgress] = useState(0)

    const playlist = [
        {
            name: "Track 1",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
        {
            name: "Track 2",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        },
        {
            name: "Track 3",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        },
    ];

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


        console.log("----- Calling Update Progress -----------")
        console.log("Current Time : " + currentTime + " Duration is : " + duration);
        console.log("Progress Percentage : " + progressPercentage);
        setProgress(progressPercentage);
    }

    useEffect(() => {
        const audioElement = audioRef.current;
        audioElement.addEventListener('timeupdate', updateProgress);

        return () => {
            audioElement.removeEventListener('timeupdate', updateProgress);
        };
    }, []);
    return (
        <div style={styles.container}>
            <h2 style={styles.trackName}>{playlist[currentTrackIndex].name}</h2>

            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex].url}
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
        </div>
    )
}


const styles = {
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
}