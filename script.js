/*
  WEB3FORMS EMAIL SOZLAMASI:
  1) https://web3forms.com/ saytiga kiring.
  2) Email manzilingizni kiriting va Access Key oling.
  3) Pastdagi YOUR_ACCESS_KEY o'rniga o'sha kalitni yozing.
  4) Saytni qayta joylang (Netlify/Vercel yoki hosting).

  Eslatma: Access Key — email parolingiz emas. Email parolingizni kodga yozmang.
*/
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY";

const form = document.querySelector("#loveForm");
const gift = document.querySelector("#gift");
const submitBtn = document.querySelector("#submitBtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const visitorName = String(formData.get("Ismi") || "").trim();
  const senderName = String(formData.get("Saytni yuborgan inson") || "").trim();
  const answer = String(formData.get("U inson sizga yoqadimi") || "");

  if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY") {
    alert("Avval script.js ichiga Web3Forms Access Key kalitingizni kiriting.");
    return;
  }

  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("subject", "Romantik saytdan yangi javob 💗");
  formData.append("from_name", "Romantik sovg'a sayti");
  formData.append("replyto", "no-reply@example.com");

  submitBtn.disabled = true;
  submitBtn.textContent = "Javob yuborilmoqda... 💌";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Email yuborilmadi");
    }

    document.querySelector("#giftTitle").textContent =
      `${visitorName}, sizga kichkina sovg‘a bor! 🎁`;
    document.querySelector("#giftText").textContent =
      `${senderName} sizga ushbu shirin sovg‘ani yubordi. Javobingiz: ${answer}`;
    gift.classList.remove("hidden");
    gift.scrollIntoView({ behavior: "smooth", block: "start" });
    submitBtn.textContent = "Javob yuborildi 💗";
  } catch (error) {
    alert("Xabar yuborilmadi. Access Key va internet aloqasini tekshiring.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Qayta yuborish 💌";
  }
});
