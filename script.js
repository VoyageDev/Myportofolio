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
        statusMessageDiv.textContent = result.message;
        statusMessageDiv.classList.remove("hidden", "bg-red-500");
        statusMessageDiv.classList.add("bg-green-500");
        setTimeout(() => {
          window.location.href = result.redirect;
        }, 4000);
        form.reset();
      } else {
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

// Fungsi untuk menangani formulir kontak
function handleContactForm() {
  emailjs.init({
    publicKey: "7-BmsJP59fStHAtke",
  });

  // Dapatkan form kontak
  const contactForm = document.getElementById("contact-form");

  // Jika form tidak ditemukan, hentikan eksekusi
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const serviceID = "service_l71argn";
    const templateID = "template_8k61fih";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        showNotification("Message sent successfully!", "success");
        contactForm.reset();
      },
      (err) => {
        showNotification("Failed to send message. Please try again.", "error");
        console.error("EmailJS Error:", err);
      }
    );
  });
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

  // Fungsi untuk mengganti warna teks
  function syncThemeStyles() {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    const text = document.getElementById("voyage");
    const available = document.getElementById("available");
    const toggle = document.getElementById("themeToggle");
    const hello = document.getElementById("hello");
    const keys = document.getElementById("keys");
    const desc = document.getElementById("desc");
    const contactHref = document.getElementById("contactHref");
    const feature = document.getElementById("feature");
    const h2 = document.getElementById("h2");
    const p = document.getElementById("p");
    const laravel = document.getElementById("laravel");
    const php = document.getElementById("php");
    const js = document.getElementById("js");
    const tailwind = document.getElementById("tailwind");
    const projectTitle = document.getElementById("h3");
    const latestProject = document.getElementById("h2-1");
    const p2 = document.getElementById("p2");
    const p3 = document.getElementById("p3");
    const p4 = document.getElementById("p4");
    const reactSpan = document.getElementById("react-span");
    const tailwindSpan = document.getElementById("tailwind-span");
    const vueSpan = document.getElementById("vue-span");
    const laravelSpan = document.getElementById("laravel-span");
    const experience = document.getElementById("experience");
    const position = document.getElementById("position");
    const workStatus = document.getElementById("work-status");
    const timeWorked = document.getElementById("time-worked");
    const listWork = document.querySelectorAll("#list-work li");
    const contact = document.getElementById("contact");
    const p5 = document.getElementById("p5");
    const p6 = document.getElementById("p6");

    // 3. logika inti toggle
    setTimeout(() => {
      if (text) {
        if (isDark) {
          text.classList.remove("text-amber-400");
          text.classList.add("dark:text-blue-400");

          hello.classList.remove("text-neutral-950");

          available.classList.add(
            "text-blue-700",
            "dark:text-blue-300",
            "dark:bg-blue-500/40"
          );
          available.classList.remove("dark:bg-blue-600/50", "text-white");

          keys.classList.remove("rainbow-outline");

          desc.classList.add("text-slate-600", "dark:text-slate-300");
          desc.classList.remove("text-neutral-800");

          contactHref.classList.remove(
            "dark:bg-slate-700",
            "text-white",
            "hover:bg-slate-300",
            "hover:text-slate-800"
          );
          contactHref.classList.add(
            "dark:border-slate-700",
            "border",
            "dark:hover:bg-slate-800"
          );

          feature.classList.remove("dark:text-slate-800");
          feature.classList.add("text-slate-500", "dark:text-slate-400");

          h2.classList.remove("dark:text-zinc-800");

          p.classList.remove("dark:text-zinc-600");
          p2.classList.remove("dark:text-zinc-600");
          p3.classList.remove("dark:text-zinc-600");
          p4.classList.remove("dark:text-stone-800");

          php.classList.remove(
            "border-purple-300",
            "dark:border-purple-700",
            "bg-purple-400",
            "text-purple-200"
          );
          php.classList.add("border-slate-300", "dark:border-slate-700");

          laravel.classList.remove(
            "border-red-300",
            "dark:border-red-700",
            "bg-red-800",
            "text-red-100"
          );
          laravel.classList.add("border-slate-300", "dark:border-slate-700");

          js.classList.remove(
            "border-yellow-300",
            "dark:border-yellow-700",
            "bg-yellow-400",
            "text-yellow-50"
          );
          js.classList.add("border-slate-300", "dark:border-slate-700");

          tailwind.classList.remove(
            "border-sky-300",
            "dark:border-sky-700",
            "bg-sky-400",
            "text-sky-200"
          );
          tailwind.classList.add("border-slate-300", "dark:border-slate-700");

          projectTitle.classList.remove("text-amber-100/90");

          latestProject.classList.remove("dark:text-zinc-800");

          reactSpan.classList.remove("text-sky-400");
          tailwindSpan.classList.remove("text-sky-200");
          vueSpan.classList.remove("text-emerald-500");
          laravelSpan.classList.remove("text-red-400");

          experience.classList.remove("dark:text-zinc-800");

          position.classList.remove("text-black");

          workStatus.classList.remove("dark:text-slate-600");

          timeWorked.classList.remove("text-black");

          listWork.forEach((item) => {
            item.classList.remove("dark:text-slate-900");
          });

          contact.classList.remove("dark:text-zinc-700");

          p5.classList.remove("dark:text-zinc-600");
          p6.classList.remove("text-slate-300");
        } // white add
        else {
          text.classList.add("text-amber-400");
          text.classList.remove("dark:text-blue-400");

          hello.classList.add("text-neutral-950");

          available.classList.add("text-white", "dark:bg-blue-600/50");
          available.classList.remove(
            "text-blue-700",
            "dark:bg-blue-500/40",
            "dark:text-blue-300"
          );

          keys.classList.add("rainbow-outline");

          desc.classList.add("text-neutral-800");
          desc.classList.remove("text-slate-600", "dark:text-slate-300");

          contactHref.classList.add(
            "dark:bg-slate-700",
            "text-white",
            "hover:bg-slate-300",
            "hover:text-slate-800"
          );
          contactHref.classList.remove(
            "dark:hover:bg-slate-800",
            "border",
            "dark:border-slate-700"
          );

          feature.classList.add("dark:text-slate-800");
          feature.classList.remove("text-slate-500", "dark:text-slate-400");

          h2.classList.add("dark:text-zinc-800");

          p.classList.add("dark:text-zinc-600");
          p2.classList.add("dark:text-zinc-600");
          p3.classList.add("dark:text-zinc-600");
          p4.classList.add("dark:text-stone-800");

          php.classList.add(
            "border-purple-300",
            "dark:border-purple-700",
            "bg-purple-400",
            "text-purple-200"
          );
          php.classList.remove("border-slate-300", "dark:border-slate-700");

          laravel.classList.add(
            "border-red-300",
            "dark:border-red-700",
            "bg-red-800",
            "text-red-100"
          );
          laravel.classList.remove("border-slate-300", "dark:border-slate-700");

          js.classList.add(
            "border-yellow-300",
            "dark:border-yellow-700",
            "bg-yellow-400",
            "text-yellow-50"
          );
          js.classList.remove("border-slate-300", "dark:border-slate-700");

          tailwind.classList.add(
            "border-sky-300",
            "dark:border-sky-700",
            "bg-sky-400",
            "text-sky-200"
          );
          tailwind.classList.remove(
            "border-slate-300",
            "dark:border-slate-700"
          );

          projectTitle.classList.add("text-amber-100/90");

          latestProject.classList.add("dark:text-zinc-800");

          reactSpan.classList.add("text-sky-400");
          tailwindSpan.classList.add("text-sky-200");
          vueSpan.classList.add("text-emerald-500");
          laravelSpan.classList.add("text-red-400");

          experience.classList.add("dark:text-zinc-800");

          position.classList.add("text-black");

          workStatus.classList.add("dark:text-slate-600");

          timeWorked.classList.add("text-black");

          listWork.forEach((item) => {
            item.classList.add("dark:text-slate-900");
          });

          contact.classList.add("dark:text-zinc-700");

          p5.classList.add("dark:text-zinc-600");
          p6.classList.add("text-slate-300");
        }
      }
    }, 300);
  }

  // Fungsi untuk mengganti tema
  function toggleTheme() {
    const html = document.documentElement;

    // 1. Toggle class 'dark'
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");

    // 2. Simpan preferensi
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // 3. Panggil fungsi untuk update video dan style
    updateBackgroundVideo();
    syncThemeStyles();
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
  syncThemeStyles();
});
