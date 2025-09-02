function handlePasswordForm() {
  const form = document.getElementById("password-form");
  if (!form) return;

  const statusMessageDiv = document.getElementById("status-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const inputPassword = formData.get("password");

    // Hapus logika pengecekan password dari sini
    // Ganti dengan memanggil API kita
    try {
      const response = await fetch("/api/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: inputPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        // Jika status HTTP 200-299
        statusMessageDiv.textContent = result.message;
        statusMessageDiv.classList.remove("hidden", "bg-red-500");
        statusMessageDiv.classList.add("bg-green-500");
        setTimeout(() => {
          window.location.href = result.redirect;
        }, 4000);
        form.reset();
      } else {
        // Jika status HTTP 401 atau lainnya
        statusMessageDiv.textContent = result.message;
        statusMessageDiv.classList.remove("hidden", "bg-green-500");
        statusMessageDiv.classList.add("bg-red-500");
        setTimeout(() => {
          statusMessageDiv.classList.add("hidden");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      statusMessageDiv.textContent =
        "Terjadi kesalahan saat menghubungi server.";
      statusMessageDiv.classList.remove("hidden", "bg-green-500");
      statusMessageDiv.classList.add("bg-red-500");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  handlePasswordForm();
  handleContactForm();
});

// Fungsi untuk menangani formulir kontak
function handleContactForm() {
  const emailForm = document.getElementById("email-form");
  if (emailForm) {
    emailForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(emailForm);
      const name = formData.get("name");
      const fromEmail = formData.get("email");
      const message = formData.get("message");

      // Validasi sederhana
      if (!name || !fromEmail || !message) {
        showNotification("Please fill all fields correctly.", "error");
        return;
      }

      // --- ALTERNATIF AMAN UNTUK email.php ---
      // Membuat link `mailto` untuk membuka aplikasi email default pengguna
      const subject = `Pesan dari Formulir Kontak - ${name}`;
      const body = `Nama Pengirim: ${name}\nEmail Pengirim: ${fromEmail}\n\nPesan:\n${message}`;
      const mailtoLink = `mailto:voyage4ev@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // Buka link di tab baru
      window.open(mailtoLink, "_blank");

      showNotification("Your email client has been opened!", "success");
      this.reset();
    });
  }
}

// Fungsi untuk menampilkan notifikasi pop-up
function showNotification(message, type = "success") {
  const successIcon = `<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  const errorIcon = `<svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  const config = {
    success: { icon: successIcon, style: "bg-white border-green-400" },
    error: { icon: errorIcon, style: "bg-yellow-50 border-yellow-400" },
  };
  const notificationConfig = config[type] || config.success;
  let container = document.getElementById("notification-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "notification-container";
    container.className =
      "fixed top-5 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-5 md:right-5 z-50 flex flex-col items-center md:items-end gap-3 w-11/12 md:w-auto";
    document.body.appendChild(container);
  }
  const notification = document.createElement("div");
  notification.className = `flex items-center gap-3 w-full max-w-sm p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ${notificationConfig.style} animate-pop-in`;
  notification.innerHTML = `${notificationConfig.icon}<p class="text-sm font-medium text-slate-700">${message}</p>`;
  container.appendChild(notification);
  setTimeout(() => {
    notification.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => {
      notification.remove();
      if (container.children.length === 0) container.remove();
    }, 300);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi semua penangan formulir
  handlePasswordForm();
  handleContactForm();

  // Dapatkan elemen-elemen yang dibutuhkan
  const html = document.documentElement;
  const videoEl = document.getElementById("bg-video");
  const videoSourceEl = videoEl ? videoEl.querySelector("source") : null;
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const yearEl = document.getElementById("year");

  // Path untuk video mode gelap dan terang
  const videoPaths = {
    dark: "image/black-waves.mp4",
    light: "image/white-waves.mp4",
  };

  // Fungsi untuk mengganti video dengan efek fade
  function updateBackgroundVideo() {
    if (!videoEl || !videoSourceEl) return;
    const isDark = html.classList.contains("dark");
    const newSrc = isDark ? videoPaths.dark : videoPaths.light;
    if (videoSourceEl.getAttribute("src") !== newSrc) {
      videoEl.classList.add("video-fade");
      setTimeout(() => {
        videoSourceEl.setAttribute("src", newSrc);
        videoEl.load();
        videoEl.play();
        videoEl.classList.remove("video-fade");
      }, 300);
    }
  }

  // Fungsi untuk mengganti tema
  function toggleTheme() {
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateBackgroundVideo();
  }

  // Tahun otomatis
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Toggle mobile menu
  menuBtn?.addEventListener("click", () =>
    mobileMenu.classList.toggle("hidden")
  );

  // Event listeners for theme toggles
  document
    .getElementById("themeToggle")
    ?.addEventListener("click", toggleTheme);
  document
    .getElementById("themeToggleMobile")
    ?.addEventListener("click", toggleTheme);

  // Inisialisasi video background saat halaman pertama kali dimuat
  updateBackgroundVideo();
});
