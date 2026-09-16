const googleAnalyticsId = 'G-3MSW24JZNV';
const yandexMetrikaId = 36687435;

const googleAnalyticsBootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');
`;

const yandexMetrikaBootstrap = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j=0; j<document.scripts.length; j++) {
    if (document.scripts[j].src === r) return;
  }
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
ym(${yandexMetrikaId},'init',{
  webvisor:true,
  clickmap:true,
  referrer:document.referrer,
  url:location.href,
  accurateTrackBounce:true,
  trackLinks:true
});
`;

export function SiteAnalytics() {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
      <script dangerouslySetInnerHTML={{ __html: googleAnalyticsBootstrap }} />
      <script dangerouslySetInnerHTML={{ __html: yandexMetrikaBootstrap }} />
    </>
  );
}

export function YandexMetrikaFallback() {
  return (
    <noscript>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height="1"
          src={`https://mc.yandex.ru/watch/${yandexMetrikaId}`}
          style={{ position: 'absolute', left: '-9999px' }}
          width="1"
        />
      </div>
    </noscript>
  );
}
