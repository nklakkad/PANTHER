// Fixed-destination enquiry endpoint. Visitor input never controls the recipient.
export async function submitEnquiry(request, transport = fetch) {
  if (request.method !== 'POST') return Response.json({success:false,message:'Please submit the enquiry form.'},{status:405});
  const origin=request.headers.get('Origin');
  if(origin && origin!==new URL(request.url).origin) return Response.json({success:false,message:'Please submit from this website.'},{status:403});
  if(Number(request.headers.get('Content-Length')||0)>16384) return Response.json({success:false,message:'Please shorten your enquiry.'},{status:413});
  let input;try {const text=await request.text();if(text.length>16384)throw Error();input=JSON.parse(text)} catch {return Response.json({success:false,message:'Please check the form and try again.'},{status:400})}
  if(input._honey) return Response.json({success:false,message:'Unable to submit.'},{status:400});
  const name=String(input.name||'').trim().slice(0,150),email=String(input.email||'').trim().slice(0,254),message=String(input.message||'').trim().slice(0,6000);
  if(!name||!message||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return Response.json({success:false,message:'Please enter your name, a valid email and your project idea.'},{status:400});
  const data=new URLSearchParams({name,email,message,phone:String(input.phone||'').slice(0,80),service:String(input.type||'').slice(0,80),_subject:'Panther Productions website enquiry',_template:'table',_captcha:'false',_url:new URL('/contact.html',request.url).href});
  try {
    const response=await transport('https://formsubmit.co/ajax/pantherproductionofficial@gmail.com',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json','Origin':new URL(request.url).origin,'Referer':new URL('/contact.html',request.url).href},body:JSON.stringify(Object.fromEntries(data)),signal:AbortSignal.timeout(18000)});
    const result=await response.json();
    if(/activat|verif/i.test(result.message||''))return Response.json({success:false,state:'setup',message:'The studio email connection is awaiting activation. Please call +91 92742 53388 for now. Your details remain in this form.'},{status:503});
    if(!response.ok||!(result.success===true||result.success==='true'))return Response.json({success:false,message:'The email service could not accept this enquiry. Please try again later or call +91 92742 53388.'},{status:502});
    return Response.json({success:true,message:'Thank you. Your enquiry has been submitted to Panther Productions.'});
  } catch {return Response.json({success:false,message:'The email service is currently unavailable. Your enquiry has not been confirmed. Your details remain in this form; please call +91 92742 53388.'},{status:503})}
}
export default {async fetch(request){const url=new URL(request.url);if(url.pathname==='/api/enquiry'){const response=await submitEnquiry(request);response.headers.set('Cache-Control','no-store');return response}if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});const path=url.pathname==='/'?'/index.html':url.pathname;const asset=ASSETS[path];if(!asset)return new Response('Not found',{status:404});const bytes=Uint8Array.from(atob(asset[1]),c=>c.charCodeAt(0));return new Response(request.method==='HEAD'?null:bytes,{headers:{'Content-Type':asset[0],'Cache-Control':path.endsWith('.html')?'no-cache':'public, max-age=3600','X-Content-Type-Options':'nosniff'}})}};
