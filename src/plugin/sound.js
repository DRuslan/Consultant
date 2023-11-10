// Данный плагин нужен для звука увдомлиний в чате (пока что)
export default {
    install: (app) => {
            app.provide('sound', (audio) => {
                // document.body.addEventListener('mousemove', function() {
                    console.log('connect', audio);
                    audio.autoplay = true;
                    audio.play().then(() => {
                        console.log("Мелодия воспроизведена успешно!");
                    }).catch((error) => {
                        console.error("Произошла ошибка при воспроизведении мелодии:", error);
                        audio.resume().then(() => {
                            console.log('Playback resumed successfully');
                        });
                    });
                });
            // });
        // app.config.globalProperties.$sound = (audio) => {
        //     alert('sd');
        //     console.log(audio);
        //     audio.play().then(() => {
        //         console.log("Мелодия воспроизведена успешно!");
        //     }).catch((error) => {
        //         console.error("Произошла ошибка при воспроизведении мелодии:", error);
        //         audio.resume().then(() => {
        //             console.log('Playback resumed successfully');
        //         });
        //     });
        // }
    }
};