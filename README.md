[README.md](https://github.com/user-attachments/files/26332804/README.md)
# Safe Step

## Problem
Kriz anında olan, depresif hisseden ya da intihar düşüncelerine yaklaşan birçok kişi önce bir insana ulaşmak yerine internette arama yapıyor. O anda karşılarına çıkan içerikler çoğu zaman ya çok genel kalıyor ya da onları güvenli bir sonraki adıma taşımıyor.

## Çözüm
Safe Step, bu kırılgan anda kullanıcıya sakin, yargısız ve yönlendirici bir ilk temas noktası sunan AI destekli bir web prototipidir. Kullanıcı duygu modunu seçip yaşadığını yazar; uygulama buna göre tonunu ayarlayan bir yanıt üretir, acil risk durumlarını işaretler, gerçek yardıma yönlendirir, trusted contact akışı sunar ve küçük grounding / micro-action seçenekleri verir.

## AI'ın Rolü
- Kullanıcının yazdığı mesaja göre destekleyici yanıt üretir
- Seçilen moda göre tonu değiştirir
- Yüksek riskli mesajlarda daha direkt yardım yönlendirmesi yapar
- Yanıtı daha kısa, daha yumuşak veya daha direkt şekilde yeniden üretir

## Canlı Demo
Yayın Linki: [Deploy edilecek linki buraya ekle]

Demo Video: [Loom linkini buraya ekle]

## Kullanılan Teknolojiler
- HTML
- CSS
- JavaScript
- Gemini API
- Google AI Studio

## Proje Dosyaları
- `features/safe-step-v2/index.html`: yeni buildathon sürümünün arayüz yapısı
- `features/safe-step-v2/styles.css`: yeni buildathon sürümünün tasarımı
- `features/safe-step-v2/app.js`: modlar, kriz akışı, trusted contact, grounding ve AI istek akışı
- `features/safe-step-v2/netlify/functions/support.js`: Gemini API çağrısını yapan server-side function
- `idea.md`: problem, kullanıcı ve çözüm çerçevesi
- `prd.md`: ürün gereksinim belgesi
- `tasks.md`: geliştirme görev listesi
- `user-flow.md`: kullanıcı akışı
- `tech-stack.md`: teknoloji seçimi ve gerekçeler

## Nasıl Çalıştırılır?
Not: Deploy için kullanılacak tek klasör `features/safe-step-v2/` klasörüdür.

1. `features/safe-step-v2/` klasörünü kaynak uygulama olarak kullan.
2. Netlify ortamında `GEMINI_API_KEY` environment variable ekle.
3. Netlify function ile deploy et.
4. Mesaj yaz, mod seç ve `Get Support` ile AI akışını test et.

## Netlify Kurulumu
1. Netlify'da yeni site oluştururken `features/safe-step-v2/` klasörünü proje kökü olarak seç.
2. Environment Variables bölümüne `GEMINI_API_KEY` ekle.
3. Deploy sonrası uygulama `/.netlify/functions/support` üzerinden Gemini API'ye server-side istek atar.
4. API anahtarını hiçbir `.js` dosyasına yazma; yalnızca environment variable olarak tut.

## Buildathon Notu
Bu proje production-ready bir mental health ürünü değil; buildathon kapsamında çalışan ve anlamlı problem çözen bir prototip olarak tasarlandı. Ana hedef, kullanıcıyı kriz anında daha güvenli bir sonraki adıma taşımak.
