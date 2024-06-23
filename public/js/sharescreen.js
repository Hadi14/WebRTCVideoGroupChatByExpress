const sharescr = document.getElementById('screensharingDiv');
let peerConnection;

const shareScreen = async () => {
    const mediaStream = await getLocalScreenCaptureStream();
    const screenTrack = mediaStream.getVideoTracks()[0];
    if (screenTrack) {
        console.log('replace camera track with screen track');
        replaceTrack(screenTrack);
    }
};


const getLocalScreenCaptureStream = async () => {
    try {
        const constraints = { video: { cursor: 'always' }, audio: false };
        const screenCaptureStream = await navigator.mediaDevices.getDisplayMedia(constraints);
        return screenCaptureStream;
    } catch (error) {
        console.error('failed to get local screen', error);
    }
};


const replaceTrack = (newTrack) => {
    const sender = peerConnection.getSenders().find(sender =>
        sender.track.kind === newTrack.kind
    );
    if (!sender) {
        console.warn('failed to find sender');
        return;
    }
    sender.replaceTrack(newTrack);
}


// for (const sender of peerConnection.getSenders()) {
//     sender.track.stop();
// }
