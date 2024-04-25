import React, { useState } from 'react';
import axios from 'axios';

const ConsultationShow = ({ consultation, user }) => {
    const [showVideoCallButtons, setShowVideoCallButtons] = useState(false);

    const startVideoCall = () => {
        axios.post(`/technician/consultation/${consultation.id}/start-video-call`)
            .then(response => {
                // Tindakan setelah panggilan video dimulai, jika diperlukan
                console.log('Video call started:', response.data);
            })
            .catch(error => {
                console.error('Error starting video call:', error);
            });
    };

    const acceptVideoCall = () => {
        axios.post(`/technician/consultation/${consultation.id}/accept-video-call`)
            .then(response => {
                // Tindakan setelah panggilan video diterima, jika diperlukan
                console.log('Video call accepted:', response.data);
            })
            .catch(error => {
                console.error('Error accepting video call:', error);
            });
    };

    const endVideoCall = () => {
        axios.post(`/technician/consultation/${consultation.id}/end-video-call`)
            .then(response => {
                // Tindakan setelah panggilan video diakhiri, jika diperlukan
                console.log('Video call ended:', response.data);
            })
            .catch(error => {
                console.error('Error ending video call:', error);
            });
    };

    return (
        <div>
            <h2>Consultation Details</h2>
            <p>User: {user.name}</p>
            {/* Tampilkan tombol untuk memulai panggilan video */}
            {showVideoCallButtons && (
                <div>
                    <button onClick={startVideoCall}>Start Video Call</button>
                    <button onClick={endVideoCall}>End Video Call</button>
                </div>
            )}
            {/* Tampilkan tombol untuk menerima panggilan video */}
            {!showVideoCallButtons && consultation.status === 'incoming' && (
                <button onClick={acceptVideoCall}>Accept Video Call</button>
            )}
        </div>
    );
};

export default ConsultationShow;
