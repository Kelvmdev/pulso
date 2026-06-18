# Pulso — Monitor de mercado cripto en vivo

Un dashboard del mercado cripto que se siente como un monitor de signos vitales: cifras que laten y precios que voltean como un tablero de aeropuerto cuando cambian.

🔗 **En vivo:** https://pulso-bay-two.vercel.app

---

## Qué es

Pulso es un dashboard del mercado cripto **en vivo**: muestra las métricas globales del mercado y las principales monedas con sus precios, actualizándose solos sin recargar la página.

## Características

- **Top monedas con precios en vivo** — refresco automático cada ~60s, sin recargar.
- **Animación split-flap** — al cambiar un precio, solo el dígito que cambia voltea (estilo tablero de aeropuerto).
- **Métricas globales** — capitalización total, volumen 24h y dominancia BTC/ETH.
- **Página de detalle por moneda** — con gráfico de evolución (**SVG propio, sin librerías**), selector de rango (24h / 7d / 30d / 90d / 1a) y crosshair + tooltip al pasar el cursor.
- **Accesible** — contraste AA, skip-link, foco visible, `prefers-reduced-motion`.
- **Rendimiento** — 100/100/100/100 en PageSpeed (móvil).

## Stack

- **Next.js** (App Router, JavaScript)
- **Tailwind CSS v4**
- **API de CoinGecko**
- Deploy en **Vercel**

## Decisiones técnicas

- **Seguridad de la API key:** el fetch se hace en el servidor y la key viaja en una cabecera (`x-cg-demo-api-key`), **nunca al navegador**.
- **Respeto al rate limit:** caché y revalidación de Next (~60s para precios, ~10min para histórico) → una sola llamada a CoinGecko aunque haya muchos visitantes.
- **Gráfico en SVG propio:** sin librerías de charts (que pesan 50–150 KB), manteniendo el bundle ligero.
- **Estados de carga y error:** esqueletos al cargar y degradado elegante ante fallos (conserva los últimos datos buenos y muestra "reconectando" en vez de romper la página).

## Correr localmente

```bash
git clone https://github.com/Kelvmdev/pulso.git
cd pulso
npm install
```

Crea un archivo `.env.local` en la raíz con tu API key de CoinGecko:

```bash
COINGECKO_API_KEY=tu_demo_key
```

> Consigue una **Demo key gratis** creando una cuenta en CoinGecko: https://www.coingecko.com/en/api/pricing

Arranca el servidor de desarrollo:

```bash
npm run dev
```

Abre http://localhost:3000.

## Datos

Datos proporcionados por **CoinGecko**.

> ⚠️ Solo informativo. **No es asesoría financiera.**

## Autor

**Kervin Martínez**
- Portafolio: https://mi-portafolio-eta-hazel.vercel.app
- X: [@Kelvmdev](https://x.com/Kelvmdev)
