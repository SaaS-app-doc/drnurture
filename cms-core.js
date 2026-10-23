'use strict';
(() => {
  const key = 'dr-nurture-content-draft-v2';
  const clone = value => JSON.parse(JSON.stringify(value));
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const asset = value => {
    if (!value) return '';
    const s = String(value);
    if (/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(s)) return s;
    if (/^[A-Za-z0-9][A-Za-z0-9_./-]*\.(?:png|jpe?g|webp|avif|gif)$/i.test(s) && s.split('/').every(part => part && part !== '.' && part !== '..')) {
      // Keep backups and existing browser drafts from the folder-based version usable.
      return s.startsWith('assets/') ? s.slice(7) : s;
    }
    return '';
  };
  const text = (value, name, max=12000) => { if (typeof value !== 'string' || value.length > max) throw new Error(`${name} must be text, up to ${max} characters.`); return value; };
  const companyKeys = ['name','shortName','tagline','location','email','phone','address','intro','overview','invitation','logo','document','gst','drugLicences','fssai','scheduleX'];
  function validate(input) {
    if (!input || input.schemaVersion !== 2 || !input.company || !input.home) throw new Error('Choose a Dr. Nurture content backup (schema version 2).');
    if (JSON.stringify(input).length > 3600000) throw new Error('This draft is too large. Use smaller images to keep the update below 3.6 MB.');
    const out = {schemaVersion:2,company:{},home:{},products:[],resources:[]};
    for (const k of companyKeys) out.company[k] = text(input.company[k] ?? '', `Company ${k}`, ['logo','document'].includes(k)?1500000:12000);
    if (!out.company.name.trim() || !out.company.shortName.trim()) throw new Error('Enter the company name and short name.');
    if (!/^[^\s<>@?&"']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(out.company.email)) throw new Error('Enter a valid business email address.');
    if (!/^[+\d\s()-]{8,30}$/.test(out.company.phone) || out.company.phone.replace(/\D/g,'').length < 8) throw new Error('Enter a valid business telephone number.');
    for (const k of ['logo','document']) { if (out.company[k] && !asset(out.company[k])) throw new Error(`Choose a valid ${k} image.`); }
    for (const k of ['title','lead','emphasis','description']) out.home[k] = text(input.home[k] ?? '', `Home ${k}`, 1200);
    if (!Array.isArray(input.products) || input.products.length > 80 || !Array.isArray(input.resources) || input.resources.length > 80) throw new Error('The editor supports up to 80 products and 80 resources.');
    for (const item of input.products) {
      const p={};
      for(const k of ['id','name','category','form','summary','composition','detail','image','resource']) p[k]=text(item[k]??'',`Product ${k}`,k==='image'?1500000:12000);
      if(!/^[a-z0-9][a-z0-9-]{0,63}$/.test(p.id)||!p.name.trim()) throw new Error('Each product needs a name and a valid unique id.');
      if(!['gastro','nutrition','injection'].includes(p.category))throw new Error(`Choose a category for ${p.name}.`);
      if(p.image&&!asset(p.image))throw new Error(`Choose a valid product image for ${p.name}.`);
      p.featured=Boolean(item.featured);out.products.push(p);
    }
    for(const item of input.resources){
      const r={id:text(item.id??'','Resource id',64),name:text(item.name??'','Resource name',200),image:text(item.image??'','Resource image',1500000),lowResolution:Boolean(item.lowResolution)};
      if(!/^[a-z0-9][a-z0-9-]{0,63}$/.test(r.id)||!r.name.trim()||!asset(r.image))throw new Error('Each resource needs a name and a PNG, JPEG, or WebP image.');
      out.resources.push(r);
    }
    for(const list of [out.products,out.resources])if(new Set(list.map(x=>x.id)).size!==list.length)throw new Error('Product and resource ids must be unique within each list.');
    for(const p of out.products)if(p.resource&&!out.resources.some(r=>r.id===p.resource))throw new Error(`Select an existing resource for ${p.name}, or choose No literature.`);
    return out;
  }
  async function loadPublished(){
    if(location.protocol==='file:')return {content:validate(window.NURTURE_FALLBACK),snapshot:true};
    try{const response=await fetch('content.json',{cache:'no-store'});if(!response.ok)throw new Error('Content unavailable');return {content:validate(await response.json()),snapshot:false};}
    catch(error){return {content:validate(window.NURTURE_FALLBACK),snapshot:true,error};}
  }
  function readDraft(){try{const raw=localStorage.getItem(key);if(!raw)return null;const d=JSON.parse(raw);return {content:validate(d.content),savedAt:d.savedAt};}catch{return null;}}
  function saveDraft(content){const normalized=validate(content);const savedAt=new Date().toISOString();localStorage.setItem(key,JSON.stringify({content:normalized,savedAt}));return savedAt;}
  function download(data,name,type){const blob=data instanceof Blob?data:new Blob([data],{type:type||'application/octet-stream'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);}
  const crcTable=Array.from({length:256},(_,i)=>{let c=i;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
  function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=crcTable[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
  function zip(files){
    const encoder=new TextEncoder(),parts=[],centers=[];let offset=0;
    for(const [filename,body]of Object.entries(files)){
      const name=encoder.encode(filename),bytes=encoder.encode(body),crc=crc32(bytes),local=new Uint8Array(30+name.length),l=new DataView(local.buffer);
      l.setUint32(0,0x04034b50,true);l.setUint16(4,20,true);l.setUint16(6,0x800,true);l.setUint16(12,33,true);l.setUint32(14,crc,true);l.setUint32(18,bytes.length,true);l.setUint32(22,bytes.length,true);l.setUint16(26,name.length,true);local.set(name,30);
      const center=new Uint8Array(46+name.length),c=new DataView(center.buffer);c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x800,true);c.setUint16(14,33,true);c.setUint32(16,crc,true);c.setUint32(20,bytes.length,true);c.setUint32(24,bytes.length,true);c.setUint16(28,name.length,true);c.setUint32(42,offset,true);center.set(name,46);
      parts.push(local,bytes);centers.push(center);offset+=local.length+bytes.length;
    }
    const centerSize=centers.reduce((n,p)=>n+p.length,0),end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,centers.length,true);e.setUint16(10,centers.length,true);e.setUint32(12,centerSize,true);e.setUint32(16,offset,true);
    return new Blob([...parts,...centers,end],{type:'application/zip'});
  }
  window.Nurture={key,clone,escape,asset,validate,loadPublished,readDraft,saveDraft,download,zip};
})();
