document.addEventListener('DOMContentLoaded', () => {
    const wishButton = document.getElementById('wish-button');
    const popup = document.getElementById('popup');
    const sendWishButton = document.getElementById('send-wish');
    const closePopupButton = document.getElementById('close-popup');
    const wishesContainer = document.getElementById('wishes-container');
    const nameInput = document.getElementById('name');
    const wishInput = document.getElementById('wish');
    const stickerSelect = document.getElementById('sticker');
    const volumeToggle = document.getElementById('volume-toggle');
    const audio = document.getElementById('audio');

    // Flipdown Countdown
    const now = new Date().getTime() / 1000;
    const newYear = new Date(new Date().getFullYear() + 1, 0, 1).getTime() / 1000;

    new FlipDown(newYear, 'flipdown')
        .start()
        .ifEnded(() => {
            document.body.innerHTML = '<h1>Happy New Year! 🎉</h1>';
        });

    // Show popup
    wishButton.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });

    // Hide popup on "Close" button click
    closePopupButton.addEventListener('click', () => {
        popup.classList.add('hidden');
        nameInput.value = '';
        wishInput.value = '';
    });

    // Send Wish
    sendWishButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const wish = wishInput.value.trim();
        const sticker = stickerSelect.value;

        if (name && wish) {
            const newWish = {
                name: name,
                wish: wish,
                sticker: sticker,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()  // เวลาที่ส่งคำอวยพร
            };

            // บันทึกคำอวยพรใน Firestore
            db.collection("wishes").add(newWish)
                .then(() => {
                    console.log("คำอวยพรถูกบันทึกแล้ว");
                })
                .catch((error) => {
                    console.error("เกิดข้อผิดพลาดในการบันทึกคำอวยพร: ", error);
                });

            // แสดงคำอวยพรในหน้าจอ
            const wishElement = document.createElement('div');
            wishElement.classList.add('wish');
            wishElement.textContent = `${sticker} ${name}: ${wish}`;
            wishElement.style.left = `${Math.random() * 90}%`;
            wishElement.style.top = `${Math.random() * 90}%`;
            wishesContainer.appendChild(wishElement);

            // Make the wish float and move randomly on the screen
            wishElement.classList.add('floating-wish');

            // Remove the oldest wish if there are more than 15 on screen
            if (wishesContainer.childElementCount > 15) {
                wishesContainer.removeChild(wishesContainer.firstChild);
            }

            // Hide popup and reset form
            popup.classList.add('hidden');
            nameInput.value = '';
            wishInput.value = '';
        } else {
            alert('กรุณาใส่ชื่อและคำอวยพร');
        }
    });

    // Hide popup when clicking outside of it
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.add('hidden');
        }
    });

    // ตั้งค่าเริ่มต้นให้เสียงปิด
    audio.muted = false;  // เริ่มต้นเสียงเปิด

    // การเปิด/ปิดเสียงเพลง
    volumeToggle.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false; // เปิดเสียง
            volumeToggle.textContent = '🔊'; // เปลี่ยนปุ่มเป็นไอคอนเสียงเปิด
        } else {
            audio.muted = true; // ปิดเสียง
            volumeToggle.textContent = '🔇'; // เปลี่ยนปุ่มเป็นไอคอนเสียงปิด
        }
    });

    // ดึงคำอวยพรจาก Firestore และแสดงผล
    db.collection("wishes").orderBy("timestamp", "desc").limit(15).onSnapshot((snapshot) => {
        wishesContainer.innerHTML = ''; // เคลียร์ข้อมูลก่อนแสดงข้อมูลใหม่
        snapshot.forEach((doc) => {
            const wishData = doc.data();
            const wishElement = document.createElement('div');
            wishElement.classList.add('wish');
            wishElement.textContent = `${wishData.sticker} ${wishData.name}: ${wishData.wish}`;
            wishElement.style.left = `${Math.random() * 90}%`;
            wishElement.style.top = `${Math.random() * 90}%`;
            wishesContainer.appendChild(wishElement);

            // Make the wish float and move randomly on the screen
            wishElement.classList.add('floating-wish');
        });
    });

});
