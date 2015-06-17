import os

file_names = sorted(filter(lambda f: f[-4:]=="html" and f!='template.html', os.listdir('.')), key=lambda q: int(q.split(".")[0]))

for i, file_name in enumerate(file_names):
    f = open(file_name, 'r')
    s = f.read()
    f.close()
    index = s.find('main\">')+6

    base_name = file_name[:-5]
    sec, sub = base_name.split(".")

    table = '\n            <table id="nav"><tr>'
    if base_name != '3.1':
        table += '<td><a href="/~macuser/homepage/precal/notes/'+file_names[i-1]+'">&laquo; '+file_names[i-1][:-5]+'</a></td>'
    else:
        table += '<td><!--blank--></td>'
    if base_name != '11.5':
        table += '<td><a href="/~macuser/homepage/precal/notes/'+file_names[i+1]+'">'+file_names[i+1][:-5]+' &raquo;</a></td>'
    else:
        table += '<td><!--blank--></td>'
    table += '</tr></table>\n'

    f = open(file_name, 'w')
    f.write( s[:index]+table+s[index:] )
    f.close()
