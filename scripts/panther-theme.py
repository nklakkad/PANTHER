from pathlib import Path
root=Path('dist')
face='''<div class="panther-portrait" aria-hidden="true"><img src="assets/panther-face.jpg" alt=""><i class="eyelid eye-left"></i><i class="eyelid eye-right"></i><i class="eye-aura aura-left"></i><i class="eye-aura aura-right"></i></div>'''
watch='''<section class="panther-watch" aria-label="The Panther instinct">'''+face+'''<div class="watch-top"><span class="eyebrow">THE PANTHER INSTINCT</span><span>ALWAYS WATCHING. ALWAYS CREATING.</span></div><div class="watch-copy"><h2>SILENT BY NATURE.<br><em>FEARLESS BY INSTINCT.</em></h2><a href="studio.html">MEET THE STUDIO <span>↗</span></a></div><span class="watch-index">P / 001 — EYES ON THE VISION</span></section>'''
for p in root.glob('*.html'):
 s=p.read_text()
 if 'panther-watch' in s:continue
 if p.name=='index.html':s=s.replace('<section class="section home-services">',watch+'<section class="section home-services">')
 if p.name=='studio.html':s=s.replace('<section class="section philosophy">',watch+'<section class="section philosophy">')
 s=s.replace('<section class="page-cta">','<section class="page-cta panther-cta"><div class="prowl-shadow" aria-hidden="true"><img src="assets/panther-prowl.jpg" alt=""></div>')
 s=s.replace('<section class="page-lead">','<section class="page-lead panther-lead">'+face)
 if p.name=='index.html':s=s.replace('<div class="eyebrow"><i></i> PANTHER PRODUCTIONS</div>','<div class="hero-eyes" aria-hidden="true">'+face+'</div><div class="eyebrow"><i></i> PANTHER PRODUCTIONS</div>')
 s=s.replace('<section class="section contact"','<section class="section contact panther-contact"')
 p.write_text(s)
