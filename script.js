
/**
 * NovaScale Contact Form → Webhook (Airtable/Make/Zapier)
 * 1) Replace WEBHOOK_URL below with your Airtable Automation Webhook URL
 * 2) Deploy to any static host (Netlify, Vercel, GitHub Pages)
 */
const WEBHOOK_URL = "https://your-airtable-webhook-url.example"; // TODO: replace

async function handleContactSubmit(e){
  e.preventDefault();
  const form = e.target;
  const data = {
    fullName: form.fullName.value.trim(),
    businessName: form.businessName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    message: form.message.value.trim(),
    submittedAt: new Date().toISOString(),
    source: "novascale.ca"
  };
  try{
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error("Request failed: " + res.status);
    form.reset();
    alert("Thanks for reaching out! We’ll get back to you shortly.");
  }catch(err){
    console.error(err);
    alert("Hmm, something went wrong sending your message. Please email us instead.");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const f = document.getElementById("contact-form");
  if(f) f.addEventListener("submit", handleContactSubmit);
});
