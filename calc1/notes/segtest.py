from pylab import *

n_segments = 7
continuous_points = sort(np.random.choice(range(7),size=4,replace=False))
segments = [[i,i+1] for i in range(n_segments)]
print continuous_points
pop_list = []

for j in range(n_segments):
    print segments,pop_list
    check_c_pts = True
    for s in segments[:j]:
        if s[1] <= segments[j][1]:
            pop_list.append(j)
            check_c_pts = False
            break
    if check_c_pts and j in continuous_points:
        segments[j][1] += 1
        k = j+1; i = where(continuous_points==j)[0][0]+1
        while k==continuous_points[i]:
            segments[j][1] += 1
            i += 1
for p in pop_list:
    segments.pop(p)
