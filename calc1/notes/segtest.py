from pylab import *

n_segments = 7
continuous_points = sort(np.random.choice(range(n_segments-1),size=5,replace=False))
segments = [[i,i+1] for i in range(n_segments)]
print continuous_points
pop_list = []

for j in range(n_segments):
    print "Round",j
    print segments[j]
    check_c_pts = True
    for s in segments[:j]:
        if s[1] >= segments[j][1]:
            pop_list.append(j)
            check_c_pts = False
            print "Skipping",j
            break
    if check_c_pts and j in continuous_points:
        segments[j][1] += 1
        k = j+1; i = where(continuous_points==j)[0][0]+1
        while i < len(continuous_points) and k==continuous_points[i]:
            segments[j][1] += 1
            i += 1
            k += 1
        print segments[j],"\n"
segments = [s for j,s in enumerate(segments) if j not in pop_list]
