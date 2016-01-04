from pylab import *
from scipy.interpolate import spline
plt.style.use('calc')

def random_piecewise_plot(
    n_segments=4,
    n_continuous=1,
    max_degree=3,
    n_jump_holes=1,
    degrees=None ):
    """
    Generate a random piecewise plot on the interval: [0,n_segments].

    The plot will be continuous across the n_continuous intervals, meaning n_continous interval partition points will be chosen at random, and the function will be continuous across the adjoining intervals.

    If degrees is None, the degree of the spline on each interval is of random degree between 1 and max_degree. Otherwise, degrees should be a list specifying the degree on each interval.

    n_jump_holes will place random single point discontinuities in the middle of random intervals
    """
    assert n_continuous <= n_segments-1
    if degrees is not None:
        assert len(degrees) == n_segments
    assert n_jump_holes <= n_segments

    N = 400 # resample resolution on each interval
    x = linspace(0,n_segments,n_segments*N)
    y = zeros_like(x)

    continuous_points = sort(np.random.choice(range(n_segments-1), size=n_continuous, replace=False))
    degrees = randint(1,max_degree+1,size=n_segments)
    knots = []

    # Create the knots.
    for i in range(n_segments):
        xi = linspace(i,i+1,degrees[i]+1)
        yi = randn(xi.shape[0])
        knots.append((xi,yi))

    # Tie knots, and evaluate function points via spline to create y array.
    for i in range(n_segments):
        if i in continuous_points:
            knots[i][1][-1] = knots[i+1][1][0] # tie the knot
        elif i != n_segments-1:
            s = (1+rand()) if rand() < 0.5 else (-1-rand())
            knots[i][1][-1] = knots[i+1][1][0] + s
        y[i*N:(i+1)*N] = spline(knots[i][0],knots[i][1],x[i*N:(i+1)*N],order=degrees[i])

    # Determine connected segments.
    segments = [[i,i+1] for i in range(n_segments)]
    
    for j in range(n_segments):
        check_c_pts = True
        for s in segments[:j]:
            if s[1] <= segments[j][1]:
                segments.pop(j)
                check_c_pts = False
                break
        if check_c_pts and j in continuous_points:
            segments[j][1] += 1
            k = j+1; i = where(continuous_points==j)[0][0]+1
            while k==i:
                segments[j][1] += 1
            

    #for s in segments:
    #    plot(x[s[0]*N:s[1]*N], y[s[0]*N:s[1]*N],'-k')

    # Draw open / closed interval markers.
    for i in range(n_segments-1):
        if i in continuous_points: continue

        # Otherwise, randomly choose the left / right segment to be open / closed
        if rand() < 0.5: L,R = 'w','k'
        else:            L,R = 'k','w'
        plot(knots[ i ][0][-1],knots[ i ][1][-1],'o',ms=10,markeredgecolor='k',markerfacecolor=L)
        plot(knots[i+1][0][ 0],knots[i+1][1][ 0],'o',ms=10,markeredgecolor='k',markerfacecolor=R)

    # Draw jump holes
    for i in np.random.choice(range(n_segments),size=n_jump_holes,replace=False):
        jx = i+0.5; jy = y[i*N+N/2]; r = randn(); jy+=r
        jy += 0.5 if r > 0 else -0.5
        plot(jx, jy, 'o', ms=10, markeredgecolor='k', markerfacecolor='k')
        plot(jx, y[i*N+N/2], 'o', ms=10, markeredgecolor='k', markerfacecolor='w')
        y[i*N+N/2] = jy

    dx = (x.max()-x.min()) / 16.
    xlim(x.min()-dx,x.max()+dx)
    dy = (y.max()-y.min()) / 16.
    ylim(y.min()-dy,y.max()+dy)
    xlabel('$x$',fontsize=20); ylabel('$f(x)$',fontsize=20)
    tight_layout()
    show()

random_piecewise_plot(n_segments=3)