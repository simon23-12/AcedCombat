"""Shared geometry spec of the carrier (CVN-77 'ACED'): used by tools/make_deck.py (markings), blender/ships.py
(model) and exported to assets/models/carrier.json for the game (deck collision, cats, wires, lens).

Blender axes: bow = -Y, up = +Z, port = +X (pilot's left), starboard = -X.  Units: metres.
"""
import math

DECK_Z = 19.0                    # flight deck height above the waterline
DECK_X = (-45.0, 45.0)           # texture rectangle
DECK_Y = (-170.0, 170.0)
TEX_W, TEX_H = 1024, 4096

# flight deck outline (x, y), counter-clockwise seen from above
OUTLINE = [(-13, -168), (13, -168), (21, -140), (24, -80), (29, -52), (40, -18), (43, 30), (40, 120), (34, 158), (27, 167),
           (-25, 167), (-31, 140), (-35, 60), (-36, -20), (-33, -70), (-27, -118), (-19, -152)]

ANG = math.radians(9.0)          # angled deck, rotated towards port
LAND_DIR = (math.sin(ANG), -math.cos(ANG))      # stern -> bow along the landing area
LAND_ORIGIN = (6.0, 167.0)       # centreline crosses the stern edge here
LAND_HALF = 13.0                 # half width of the landing area
WIRES = [118.0, 106.0, 94.0, 82.0]   # distance of wires 1..4 measured from the ramp along LAND_DIR? -> y on centreline
# catapults: start (x,y) and end (x,y)  (bow cats 1,2; waist cats 3,4)
CATS = [((-9.0, -62.0), (-9.0, -163.0)), ((7.0, -62.0), (7.0, -163.0)),
        ((22.0, 8.0), (13.5, -74.0)), ((33.0, 14.0), (24.5, -68.0))]
ISLAND = dict(x0=-36.5, x1=-26.5, y0=-2.0, y1=34.0)
LENS = (41.0, 74.0, DECK_Z + 1.5)   # Fresnel lens (meatball) on the port deck edge
ELEVATORS = [(-33.5, -46.0, 'S'), (-33.5, -24.0, 'S'), (-31.0, 52.0, 'S'), (39.0, 70.0, 'P')]


def land_xy(s, d=0.0):
    """point on the landing area: s metres forward from the stern origin, d metres to port."""
    ox, oy = LAND_ORIGIN
    fx, fy = LAND_DIR
    px, py = -fy, fx          # perpendicular (towards port, +X)
    return ox + fx * s + px * d, oy + fy * s + py * d


def wire_points():
    """wires cross the landing area perpendicular to its axis"""
    out = []
    for i, yv in enumerate(WIRES):
        s = (LAND_ORIGIN[1] - yv) / math.cos(ANG)
        out.append((land_xy(s, -LAND_HALF + 1.5), land_xy(s, LAND_HALF - 1.5)))
    return out


def to_px(x, y):
    u = (x - DECK_X[0]) / (DECK_X[1] - DECK_X[0])
    v = (y - DECK_Y[0]) / (DECK_Y[1] - DECK_Y[0])
    return u * TEX_W, (1.0 - v) * TEX_H
