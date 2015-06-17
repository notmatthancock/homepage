import cPickle

f = open('template.html', 'r')
template = f.read()
f.close()

f = open('sections.pkl', 'rb')
sections = cPickle.load(f)
f.close()

for section in sections:
    new = open(section[0]+'.html', 'w')
    new.write( template.replace("@0", " &mdash; ".join(section)).replace("@1", " &mdash; ".join(section)) )
    new.close()
