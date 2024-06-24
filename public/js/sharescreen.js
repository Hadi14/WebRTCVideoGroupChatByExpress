const sharescr = document.getElementById('screensharingDiv');
// let peerConnection;

// const shareScreen = async () => {
//     const mediaStream = await getLocalScreenCaptureStream();
//     const screenTrack = mediaStream.getVideoTracks()[0];
//     if (screenTrack) {
//         console.log('replace camera track with screen track');
//         replaceTrack(screenTrack);
//     }
// };


// const getLocalScreenCaptureStream = async () => {
//     try {
//         const constraints = { video: { cursor: 'always' }, audio: false };
//         const screenCaptureStream = await navigator.mediaDevices.getDisplayMedia(constraints);
//         return screenCaptureStream;
//     } catch (error) {
//         console.error('failed to get local screen', error);
//     }
// };


// const replaceTrack = (newTrack) => {
//     const sender = peerConnection.getSenders().find(sender =>
//         sender.track.kind === newTrack.kind
//     );
//     if (!sender) {
//         console.warn('failed to find sender');
//         return;
//     }
//     sender.replaceTrack(newTrack);
// }


// for (const sender of peerConnection.getSenders()) {
//     sender.track.stop();
// }
var screenSharing = false;
// var peer = null;
peer = new Peer();

function startScreenShare() {
    if (screenSharing) {
        stopScreenSharing()
    }
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
        setScreenSharingStream(stream);

        screenStream = stream;
        let videoTrack = screenStream.getVideoTracks()[0];
        videoTrack.onended = () => {
            stopScreenSharing()
        }
        peer = new Peer();

        if (peer) {
            let sender = currentPeer.peerConnection.getSenders().find(function (s) {
                return s.track.kind == videoTrack.kind;
            })
            sender.replaceTrack(videoTrack)
            screenSharing = true
        }
        console.log(screenStream)
    })
}

function stopScreenSharing() {
    if (!screenSharing) return;
    let videoTrack = local_stream.getVideoTracks()[0];
    if (peer) {
        let sender = currentPeer.peerConnection.getSenders().find(function (s) {
            return s.track.kind == videoTrack.kind;
        })
        sender.replaceTrack(videoTrack)
    }
    screenStream.getTracks().forEach(function (track) {
        track.stop();
    });
    screenSharing = false
}

function setScreenSharingStream(stream) {
    // document.getElementById("screenshare-container").hidden = false;
    // let video = document.getElementById("screensharingDiv");
    // video.srcObject = stream;
    // video.muted = true;
    // video.play();
    // $('#screensharingDiv').get(0).play();
    const videoGrid = document.getElementById('videos');
    const myVideo = document.createElement('screensharingDiv');
    myVideo.muted = true;

    let myVideoStream
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        myVideoStream = stream;
        addVideoStream(myVideo, stream);
    })

    const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        })
        videoGrid.append(video);
    }
}