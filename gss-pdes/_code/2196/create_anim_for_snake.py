import pylidc as pl
import numpy as np
from snakes import snake as sn
import matplotlib
#matplotlib.use('agg')
import matplotlib.pyplot as plt


nod = pl.Nodule.select().where(pl.Nodule.id == 2196).first()
S = nod.scan.get_slice(76) 
bx,by,bz = nod.bbox()
S = S[bx[0]-20:bx[1]+21, by[0]-20:by[1]+21]
S = (S.astype(float) - S.min()) / (S.max() - S.min())

t = np.arange(0,2*np.pi,0.1)
x = 37+5*np.cos(t)
y = 44+5*np.sin(t)

alpha = 0.01
beta  = 0.01
gamma = 35

iterations = 50

# fx and fy are callable functions
fx, fy = sn.create_external_edge_force_gradients_from_img(S, 1)

#raise Exception()

snakes = sn.iterate_snake(
    x = x,
    y = y,
    a = alpha,
    b = beta,
    fx = fx,
    fy = fy,
    gamma = gamma,
    n_iters = iterations,
    return_all = True
)

wh_ratio = S.shape[1] / float(S.shape[0])

for i, snake in enumerate(snakes):
    fig = plt.figure(figsize=(wh_ratio*5,5), frameon=False)
    ax = plt.Axes(fig, [0.,0.,1.,1.])
    ax.set_axis_off()
    fig.add_axes(ax)   
    ax.plot(np.r_[snake[0], snake[0][0]], np.r_[snake[1], snake[1][0]], '-r', lw=3)
    ax.imshow(S, aspect='auto', cmap=plt.cm.gray)
    fig.savefig('./snakes-bad-anim/%0.3d.png'%i)
    fig.clf()
    plt.close()
    print i

# Plot the last one a different color.
#ax.plot(np.r_[snakes[-1][0], snakes[-1][0][0]], np.r_[snakes[-1][1], snakes[-1][1][0]], c=(1,0,0), lw=2)
