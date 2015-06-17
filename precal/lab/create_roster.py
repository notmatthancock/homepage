import json

per_row = 6

r = open('roster', 'r').read()
r = r.split('\n')
r = map(lambda p: " ".join(p[p.find("0025")+4:].split()[:-1]), r[:-1])
r.insert(0,'')

while (len(r) % per_row != 0): r.append('')
num_rows = len(r) / per_row

json.dump(
    [r[k*per_row:(k+1)*per_row] for k in range(num_rows)],
    open('roster.json','w')
)
