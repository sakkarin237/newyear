
document.getElementById("wish-button").addEventListener("click", () => {
    document.getElementById("popup").classList.remove("hidden");
});

document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("popup").classList.add("hidden");
});

document.getElementById("send-wish").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const wish = document.getElementById("wish").value;
    const sticker = document.getElementById("sticker").value;

    if (name && wish) {
        await addDoc(collection(db, "wishes"), { name, wish, sticker });
        alert("คำอวยพรของคุณถูกบันทึกแล้ว!");
        document.getElementById("popup").classList.add("hidden");
        loadWishes();
    } else {
        alert("กรุณากรอกข้อมูลให้ครบ");
    }
});

async function loadWishes() {
    const wishesContainer = document.getElementById("wishes-container");
    wishesContainer.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "wishes"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const wishItem = document.createElement("div");
        wishItem.className = "wish-item";
        wishItem.innerHTML = `<p>${data.sticker} ${data.wish} - <strong>${data.name}</strong></p>`;
        wishesContainer.appendChild(wishItem);
    });
}

loadWishes();

// Volume Toggle
const audio = document.getElementById("audio");
const volumeToggle = document.getElementById("volume-toggle");

volumeToggle.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        volumeToggle.textContent = "🔊";
    } else {
        audio.pause();
        volumeToggle.textContent = "🔇";
    }
});
