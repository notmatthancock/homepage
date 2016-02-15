import pylidc as pl
import balloon
import numpy as np
import matplotlib
#matplotlib.use('agg')
import matplotlib.pyplot as plt


nod = pl.Nodule.select().where(pl.Nodule.id == 2196).first()
S = nod.scan.get_slice(76) 
bx,by,bz = nod.bbox()
S = S[bx[0]-20:bx[1]+21, by[0]-20:by[1]+21]

x,y = balloon.balloon(S, seed=(37,44), r=1., dt=2., gauss_coef=2, sigmoid_coef=50, tol=0.1)
x = np.vstack((x,x[0]))
y = np.vstack((y,y[0]))

wh_ratio = S.shape[1] / float(S.shape[0])
fig = plt.figure(figsize=(wh_ratio*5,5), frameon=False)
ax = plt.Axes(fig, [0.,0.,1.,1.])
ax.set_axis_off()
fig.add_axes(ax)

ax.imshow(S, aspect='auto', cmap=plt.cm.gray)
ax.axis('off')
fig.savefig('./init.png')
fig.clf()
plt.close()

for i in range(x.shape[1]):
    fig = plt.figure(figsize=(wh_ratio*5,5), frameon=False)
    ax = plt.Axes(fig, [0.,0.,1.,1.])
    ax.set_axis_off()
    fig.add_axes(ax)   
    ax.plot(x[:,i], y[:,i], '-r', lw=3)
    ax.imshow(S, aspect='auto', cmap=plt.cm.gray)
    ax.axis('off')
    fig.savefig('./basic-anim/%0.3d.png'%i)
    fig.clf()
    plt.close()
    print i
fig = plt.figure()
ax  = fig.add_subplot(111)
ax.imshow(img, cmap=plt.cm.gray)
ax.set_xticks([])
ax.set_yticks([])
ax.set_xlim(0,img.shape[1])
ax.set_ylim(img.shape[0],0)
ax.plot(np.r_[x,x[0]], np.r_[y,y[0]], c=(0,1,0), lw=2)

for i, snake in enumerate(snakes):
    if i % 10 == 0:
        ax.plot(np.r_[snake[0], snake[0][0]], np.r_[snake[1], snake[1][0]], c=(0,0,1), lw=2)

# Plot the last one a different color.
ax.plot(np.r_[snakes[-1][0], snakes[-1][0][0]], np.r_[snakes[-1][1], snakes[-1][1][0]], c=(1,0,0), lw=2)

plt.show()
