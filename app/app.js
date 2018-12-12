const keyAndAudio = [
    [
        [87, "Db4"],
        [69, "Eb4"],
        [null, null],
        [84, "Gb4"],
        [89, "Ab4"],
        [85, "Bb4"]
    ], [
        [65, "C4"],
        [83, "D4"],
        [68, "E4"],
        [70, "F4"],
        [71, "G4"],
        [72, "A4"],
        [74, "B4"],
        [75, "C5"]
    ]
];

document.getElementById("audioList").innerHTML =
    keyAndAudio.map((keys, index) => `
        <div class="${index === 0 ? "key-upper" : "key-lower"}">
            ${keys.map(key => `
                <div data-key="${key[0]}" class="key ${key[0] ? "" : "key-none"}"></div>
                ${key[0] ? `<audio data-key="${key[0]}" src="/piano/${key[1]}.mp3"></audio>` : ""}
            `).join("")}
        </div>`).join("");

window.addEventListener('keydown', event => {
    if (!keyAndAudio.some(keys => keys.some(key => key[0] === event.keyCode))) return;

    const div = document.querySelector(`div[data-key="${event.keyCode}"]`);
    div.classList.add("keydown");
    div.addEventListener("transitionend", () => div.classList.remove("keydown"));

    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    audio.currentTime = 0;
    audio.play();
    audio.onended = () => div.classList.remove("keydown");
});
