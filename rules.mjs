export const DEFAULT_WINDOWS=[{start:'17:00',end:'20:00'}];
export const fmtDate=d=>{const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),n=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${n}`};
export const parseDate=s=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return null;const [y,m,d]=s.split('-').map(Number);const x=new Date(y,m-1,d);return x.getFullYear()===y&&x.getMonth()===m-1&&x.getDate()===d?x:null};
export const plusDays=(s,n)=>{const x=parseDate(s);if(!x)throw Error('Fecha inválida');x.setDate(x.getDate()+n);return fmtDate(x)};
export const mins=t=>{if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(t))throw Error('Hora inválida');return Number(t.slice(0,2))*60+Number(t.slice(3))};
export const hhmm=n=>`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
export const overlaps=(a,b,c,d)=>a<d&&c<b;
export const isWorkday=date=>{const dow=parseDate(date)?.getDay();return dow!==undefined&&dow!==0&&dow!==6};
export const windowsFor=(date,override)=>override===undefined?(isWorkday(date)?DEFAULT_WINDOWS:[]):override;
export function slotsFor(windows,duration,buffer=0){const out=[];for(const w of windows){let a=mins(w.start),b=mins(w.end);if(b<=a)continue;for(let t=Math.ceil(a/30)*30;t+duration+buffer<=b;t+=30)out.push(hhmm(t))}return [...new Set(out)].sort()}
export const formatMoney=n=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(Number(n||0));
export const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export const futureDateTime=(day,time,now=new Date())=>{const d=parseDate(day);if(!d)return false;const [h,m]=time.split(':').map(Number);d.setHours(h,m,0,0);return d.getTime()>now.getTime()};
