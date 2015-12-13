from pyquery import PyQuery as pq
with open('index.html') as f:    index    = pq(f.read())
with open('template.html') as f: template = pq(f.read())

sections = [pq(a).html().split(' - ') for a in index('ul > li > ul > li a')]

for i in range(len(sections)):
    prev = '' if i==0 else (sections[i-1][0]+'.html')
    next = '' if i==(len(sections)-1) else (sections[i+1][0]+'.html')
    template('a#prev').attr('href', prev).html(prev if prev == '' else 'prev')
    template('a#next').attr('href', next).html(next if next == '' else 'next')
    template('h1').html(" - ".join(sections[i]))
    with open(sections[i][0]+'.html','w') as f: f.write( template.outer_html() )
