import pylidc as pl
import balloon
import numpy as np
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt

nod = pl.Nodule.select().where(pl.Nodule.id == 2196).first()
S = nod.scan.get_slice(76) 
bx,by,bz = nod.bbox()
S = S[bx[0]-20:bx[1]+21, by[0]-20:by[1]+21]

x,y = balloon.balloon(S, seed=(37,44), r=1., dt=5., gauss_coef=1, sigmoid_coef=1, tol=0.1, max_iters=50)
x = np.vstack((x,x[0]))
y = np.vstack((y,y[0]))

wh_ratio = S.shape[1] / float(S.shape[0])

for i in range(x.shape[1]):
    fig = plt.figure(figsize=(wh_ratio*5,5), frameon=False)
    ax = plt.Axes(fig, [0.,0.,1.,1.])
    ax.set_axis_off()
    fig.add_axes(ax)   
    ax.plot(x[:,i], y[:,i], '-r', lw=3)
    ax.imshow(S, aspect='auto', cmap=plt.cm.gray)
    ax.axis('off')
    fig.savefig('./basic-anim-bad/%0.3d.png'%i)
    fig.clf()
    plt.close()
    print i
