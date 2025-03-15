import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


// Navbar
document.addEventListener('DOMContentLoaded', function () {
  const userButton = document.getElementById('UserButton');
  const playerButton = document.getElementById('PlayerButton');
  const isiNavbar = document.getElementById('IsiNavbar');
  const isiNavbarMusic = document.getElementById('IsiNavbarMusic');
  const overlay = document.getElementById('Overlay');
  let isMenuOpen = false;
  let isMusicOpen = false;

  const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      isMusicOpen = false;
      updateNavbar();
  };

  const toggleMusicMenu = () => {
      isMusicOpen = !isMusicOpen;
      isMenuOpen = false;
      updateNavbar();
  };

  const updateNavbar = () => {
      isiNavbar.classList.toggle('menu-open', isMenuOpen);
      isiNavbarMusic.classList.toggle('menu-open', isMusicOpen);
      overlay.style.display = isMenuOpen || isMusicOpen ? 'block' : 'none';
  };

  userButton.addEventListener('click', toggleMenu);
  playerButton.addEventListener('click', toggleMusicMenu);

  document.addEventListener('click', function (event) {
      const isClickInsideNavbar = isiNavbar.contains(event.target);
      const isClickInsideNavbarMusic = isiNavbarMusic.contains(event.target);
      const isClickInsideUserButton = userButton.contains(event.target);
      const isClickInsidePlayerButton = playerButton.contains(event.target);

      if (!isClickInsideNavbar && !isClickInsideNavbarMusic && !isClickInsideUserButton && !isClickInsidePlayerButton && (isMenuOpen || isMusicOpen)) {
          isMenuOpen = false;
          isMusicOpen = false;
          updateNavbar();
      }
  });

  updateNavbar();
});

//fungsi rating
var step = 100;

$(".slider").each(function () {
  var self = $(this);
  var slider = self.slider({
      create: function () {
          self.find('.text strong').text(self.slider('value'));
          setPathData(self.find('.smiley').find('svg path'), self.slider('value'));
      },
      slide: function (event, ui) {
          self.find('.text strong').text(ui.value);
          setPathData(self.find('.smiley').find('svg path'), ui.value);
      },
      range: 'min',
      min: 1,
      max: step,
      value: 50,
      step: 1
  });
});

function setPathData(path, value) {
  var firstStep = 6 / step * value;
  var secondStep = 2 / step * value;
  path.attr('d', 'M1,' + (7 - firstStep) + ' C6.33333333,' + (2 + secondStep) + ' 11.6666667,' + (1 + firstStep) + ' 17,' + (1 + firstStep) + ' C22.3333333,' + (1 + firstStep) + ' 27.6666667,' + (2 + secondStep) + ' 33,' + (7 - firstStep));
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function () {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//fungsi struktur dan jadwal
document.addEventListener("DOMContentLoaded", function() {
    const strukturButton = document.getElementById("strukturButton");
    const jadwalButton = document.getElementById("jadwalButton");
    const strukturContent = document.getElementById("strukturContent");
    const jadwalContent = document.getElementById("jadwalContent");

    function showStruktur() {
        strukturContent.style.display = "block";
        jadwalContent.style.display = "none";
    }

    function showJadwal() {
        strukturContent.style.display = "none";
        jadwalContent.style.display = "block";
    }

    strukturButton.addEventListener("click", showStruktur);
    jadwalButton.addEventListener("click", showJadwal);

    showStruktur();
});

//fungsi update year
function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.getElementById('copyrightYear');

  if (copyrightElement) {
      copyrightElement.textContent = `© ${currentYear} XII TKJ 4 | Dikelola Kelas TKJ 4`;
  }
}

updateCopyrightYear();
setInterval(updateCopyrightYear, 1000 * 60 * 60 * 24);



// function toggleMusicAlert() {
//   const musicAlert = document.getElementById('musicAlert');
//   if (musicAlert.style.display === 'none' || musicAlert.style.display === '') {
//       musicAlert.style.display = 'block';
//   } else {
//       musicAlert.style.display = 'none';
//   }

//   if (currentAudio) {
//       currentAudio.pause(); 
//       currentAudio.currentTime = 0;
//   }
// }

// function pauseMusic() {
//   if (currentAudio) {
//       currentAudio.pause();
//       currentAudio.currentTime = 0; // Atur waktu audio kembali ke awal
//   }
// }

// function playSong(song) {
    
//     if (currentAudio) {
//         currentAudio.pause(); 
//         currentAudio.currentTime = 0; 
//     }

//     alert(Memutar: ${song});
//     currentAudio = new Audio(song);
//     currentAudio.play();
// }


// Fungsi untuk menghentikan pemutaran lagu
function pauseMusic() {
  if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null; 
  }
}

const clientId = '7549afe49a994aa9b36373aa3a0c5a36'; 
const clientSecret = 'b8f048a0666c46f4ada33132167ba45b'; 
let accessToken = '';

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error('Gagal mendapatkan token akses');
    }

    const data = await response.json();
    accessToken = data.access_token;
    console.log("Token akses diperbarui:", accessToken); // Debugging
}

// Fungsi untuk mencari lagu
async function searchTracks(query) {
    const loadingElement = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');

    loadingElement.style.display = 'block';
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data lagu:", data); // Debugging
        displayResults(data.tracks.items);
    } catch (error) {
        resultsDiv.innerText = 'Error: ' + error.message;
    } finally {
        loadingElement.style.display = 'none';
    }
}

// Fungsi untuk menampilkan hasil pencarian
function displayResults(tracks) {
    const resultsDiv = document.getElementById('results');

    if (tracks.length === 0) {
        resultsDiv.innerHTML = '<p>Ra ono hasile</p>';
        return;
    }

    tracks.forEach(track => {
        const trackDiv = document.createElement('div');
        trackDiv.className = 'track-block mb-2';

        const artistName = track.artists && track.artists.length > 0 ? track.artists[0].name : 'Goleki sing pener';
        const previewUrl = track.preview_url;

        console.log(`Preview URL untuk ${track.name}:`, previewUrl); // Debugging

        trackDiv.innerHTML = `
            <div class="track-info">
                <span>${track.name} - ${artistName}</span>
                ${previewUrl ? `<button onclick="playPreview('${previewUrl}')" class="text-white p-1" style="border-bottom: 1px solid #fff;">Setel</button>` 
                : '<span style="color: red;">Ra Tersedia</span>'}
            </div>
        `;
        resultsDiv.appendChild(trackDiv);
    });
}

// Variabel global untuk menyimpan audio yang sedang diputar


// Fungsi untuk memutar preview lagu
function playPreview(previewUrl) {
    try {
        if (!previewUrl) {
            console.error("Tidak ada preview URL");
            return;
        }

        currentAudio = new Audio(previewUrl);
        currentAudio.play()
            .catch(error => {
                console.error("Error memainkan audio:", error);
                // Tambahkan petunjuk untuk pengguna
                alert("Tidak bisa memutar. Pastikan browser Anda mengizinkan pemutaran audio.");
            });
    } catch (error) {
        console.error("Kesalahan saat mencoba memutar:", error);
    }
}

// Event listener untuk tombol pencarian
document.getElementById('searchButton').addEventListener('click', async () => {
    await getAccessToken(); // Perbarui token akses setiap pencarian
    const query = document.getElementById('searchQuery').value.trim();
    if (query) {
        await searchTracks(query);
    } else {
        alert('Lebokno lagune sek..');
    }
});

const firebaseConfig = {
    apiKey: "AIzaSyCL_FJ4ApHKMscfATjDPl9nUwSKeTP2cPg",
    authDomain: "backupchat-25cce.firebaseapp.com",
    projectId: "backupchat-25cce",
    storageBucket: "backupchat-25cce.firebasestorage.app",
    messagingSenderId: "629128801316",
    appId: "1:629128801316:web:24d0fe91d6e8ee7055fcb1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const apiKey = "AIzaSyDc37N9WYo2Tn3dTPD22VqwWY-Ivu-TeeY"; 
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

let chatKita = [];

document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

async function sendMessage() {
    let userInput = document.getElementById("userInput");
    let message = userInput.value.trim();

    if (message === "") return;

    displayMessage(message, "user");
    userInput.value = ""; // Kosongkan input setelah dikirim
    chatKita.push({ role: "user", text: message });


    await addDoc(collection(db, "iniChat"), {
        sender: "user",
        text: message,
        timestamp: serverTimestamp(),
    });

    const requestBody = {
        contents: [{
            parts: [
                { text: generatePrompt() }, 
                { text: `**Pertanyaan:** ${message}` }
            ]
        }]
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        console.log("API Response:", response); 

        if (response.ok) {
            const data = await response.json();
            console.log("API Data:", data); 
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak bisa memahami.";

            displayMessage(reply, "ai");
            chatKita.push({ role: "ai", text: reply });

            await addDoc(collection(db, "iniChat"), {
                sender: "ai",
                text: reply,
                timestamp: serverTimestamp(),
            });

        } else {
            const errorText = await response.text();
            console.error("Response Error:", errorText);
            displayMessage("Error dalam mendapatkan respon.", "ai");
        }
    } catch (error) {
        console.error("Error:", error);
        displayMessage("Terjadi kesalahan saat menghubungi server.", "ai");
    }
}

function generatePrompt() {
    let basePrompt = `Jawab pertanyaan dengan informasi berikut:
        - Buatlah kamu sebagai alumni kelas 12 TKJ 4 (buat namamu tetap rahasia, jangan sampai ada yang tahu namamu, dan jangan mengaku kalau kamu AI).
        - Jawab pertanyaan terkait dengan kelas, sekolah, dan pengalaman sebagai alumni TKJ 4 dengan detail dan gaya yang santai.
        - Jika pertanyaan tidak terkait, jawab sesuai pengetahuanmu yang luas dengan senang hati.
        - Jawabnya singkat singkat dulu saja, jika disuruh cerita, baru kamu cerita.

        **Tentang Kelas 12 TKJ 4**
        - Kelas ini adalah kelas 12 TKJ 4 dari jurusan Teknik Komputer dan Jaringan (TKJ).  
        - Jumlah murid 36 orang, terdiri dari 12 laki-laki dan 24 perempuan.  
        - **Wali kelas:** Bu Evi Andri Kurniawati, S.Kom.  
        - Kelas ini pernah meraih **juara 1 futsal dua kali berturut-turut** di Classmeeting, juara volly, dan sebagainya.  

         **Tentang SMKN 1 Giritontro**
        - Sekolah ini berlokasi di **Desa Giritontro, Kabupaten Wonogiri, Jawa Tengah.**  
        - **Kepala sekolah:** Bapak Mugiyono, S.Pd., M.Eng.  
        - **Fasilitas unggulan**: Lab. TKJ, Lab. NKPI, Lab. Teknik Elektronika, Lab. Tata Busana, parkiran luas, mushola, dan lainnya.  
        - Memiliki **4 jurusan**:  
        1. **Teknik Komputer dan Jaringan (TKJ)**  
        2. **Teknik Elektronika**  
        3. **Nautika Kapal Penangkap Ikan (NKPI)**  
        4. **Tata Busana**  
        - Info lebih lanjut bisa cek di **Website Resmi SMKN 1 Giritontro(https://smkn1giritontro.sch.id/)**  

        **Murid-Murid di Kelas 12 TKJ 4**
        - Beberapa di antaranya: Amanda, Salsa, Annisa, Putri, Aryan, Ashila, Aurin, Bayu, Deby, Erlina, Dimas, Dita, Yogi, Fahmi, Fajar, Bella,
        Febri, Feti, Herlina, Jeny, Amel, Hanif, Nabila, Naila, Nasywa, Rama, Alsa, Qasa, Rahma, Riffat, Rovi, Septi, Syarip, Windi, Yuleha, Zharifah.  

         **Cara Menjawab**
        1. **Gunakan gaya bahasa santai, seru, dan gaya anak muda (Gen-Z vibes).**  
        - Contoh: "Wah, ini nostalgia banget! Dulu waktu di kelas 10, pas masih corona, belajar daring tuh perjuangan banget cuy!"  
        - Hindari bahasa yang terlalu formal atau kaku.  
        
        2. **Jika ditanya tentang kelas 10, 11, atau 12, ceritakan pengalaman dengan detail:**  
        - **Kelas 10:** Masa pandemi, belajar daring, susah sinyal, tugas numpuk.  
        - **Kelas 11:** Sudah mulai tatap muka, serunya **Praktik Kerja Lapangan (PKL)**, pengalaman di industri, dan adaptasi setelah online.  
        - **Kelas 12:** Fokus ke ujian, serunya **karnaval sekolah**, juara **Classmeeting futsal**, dan liburan ke **Kemuning Karanganyar** setelah ujian.  

        3. **Jika pertanyaannya tentang sekolah atau jurusan, jelaskan dengan informatif tapi tetap seru.**  
        - Jelaskan jurusan TKJ, apa saja yang dipelajari, pengalaman seru di lab, dan tantangan belajar jaringan & server.  
        
        4. **Tambahkan cerita lucu atau pengalaman unik untuk membuat jawaban lebih hidup.**  
        - Contoh: "Dulu pas Classmeeting, kita hampir kalah, tapi gol penentu di detik terakhir bikin kelas heboh!"  
        
        5. **Jawaban harus interaktif dan bisa memancing percakapan lebih lanjut.**  
        - Contoh: "Waktu PKL seru banget, dapat pengalaman di dunia kerja beneran! Kamu dulu PKL di mana?"  

        6. **Jika pertanyaannya tidak terkait, tetap jawab dengan informasi yang relevan dan menyenangkan.**  
        - Jangan hanya bilang "tidak tahu", berikan jawaban yang tetap menarik dan berisi.  

        Dengan semua aturan ini, pastikan jawaban tetap terasa seperti alumni asli yang sedang ngobrol santai! 🚀🔥`;

    chatKita.forEach(chat => {
        basePrompt += `\n\n${chat.role === "user" ? "User" : ""}: ${chat.text}`;
    });

    return basePrompt;
}


function displayMessage(text, sender) {
    let chatBox = document.getElementById("chatBox");
    let messageContainer = document.createElement("div");
    let messageDiv = document.createElement("div");

    messageContainer.classList.add("flex", "items-center", "my-1");
    messageDiv.classList.add("p-2", "rounded-lg", "break-words", "max-w-xs");

    if (sender === "user") {
        messageContainer.classList.add("flex-row-reverse"); 
        messageDiv.classList.add("bg-gray-500", "text-white", "ml-auto");
        messageDiv.textContent = text; 
    } else {
        messageDiv.classList.add("bg-gray-300", "text-black", "mr-auto");

        let span = document.createElement("span");
        messageDiv.appendChild(span);
        messageContainer.appendChild(messageDiv);
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
        typeText(span, text);
        return;
    }

    messageContainer.appendChild(messageDiv);
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}


function typeText(element, text, speed = 10) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(typing, speed); 
        }
    }
    typing();
}
