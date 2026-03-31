/* ascii-engine.js — Typographic ASCII rendering core */

const ASCII = (() => {

  // ─── Perlin-style noise ───────────────────────────────────
  const _p = new Uint8Array(512);
  const _perm = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,
    103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,
    252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,
    68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,
    230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,
    76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,
    186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,
    59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,
    70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
    178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,
    81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,
    115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,
    195,78,66,215,61,156,180];
  for (let i = 0; i < 256; i++) _p[i] = _p[i+256] = _perm[i];

  function _fade(t) { return t*t*t*(t*(t*6-15)+10); }
  function _lerp(a,b,t) { return a+t*(b-a); }
  function _grad(h,x,y) {
    const v = h&3;
    const u = v<2?x:y, w = v<2?y:x;
    return ((h&1)?-u:u) + ((h&2)?-w:w);
  }

  function noise2(x, y) {
    const X = Math.floor(x)&255, Y = Math.floor(y)&255;
    x -= Math.floor(x); y -= Math.floor(y);
    const u = _fade(x), v = _fade(y);
    const a=_p[X]+Y, b=_p[X+1]+Y;
    return _lerp(
      _lerp(_grad(_p[a],x,y),   _grad(_p[b],x-1,y),   u),
      _lerp(_grad(_p[a+1],x,y-1),_grad(_p[b+1],x-1,y-1),u), v
    );
  }

  function fbm(x, y, octaves=4, lacunarity=2.1, gain=0.5) {
    let val=0, amp=0.5, freq=1, max=0;
    for (let i=0; i<octaves; i++) {
      val += noise2(x*freq, y*freq)*amp;
      max += amp; amp*=gain; freq*=lacunarity;
    }
    return val/max;
  }

  // ─── Character palettes ───────────────────────────────────
  const PALETTES = {
    // general: lightest → darkest
    standard: ' .\'`,-_:;~!i|lI1/(\\){}[]rftjJcvxznsaoeykhdpqgwmTYCSFZUPVXREBKGDNQAOHWM#&%$@',
    // for flowing/organic shapes — more mid-density chars
    organic:  ' .,\'`:-_~!;|lIi1/\\(){}rfjtcvxznsoaeydpqgwmTCSFUPVXBKNQAOHWM#&%@',
    // for sharp geometric — likes contrast
    sharp:    ' .:;!|Il1/\\()[]{}+=-<>rftcvxzTYFZUPVXREBKGDNHWM#%$@',
    // for faces — preserves mid-tones better
    portrait: ' .\',`-_:;~!|lIi1rftjcvxznsoaeykhdpqgwTCSFUPBKNQOHWM#&@',
  };

  function charAt(brightness, palette='standard') {
    const chars = PALETTES[palette];
    const idx = Math.floor(Math.pow(1 - Math.max(0, Math.min(1, brightness)), 1.0) * (chars.length - 1));
    return chars[idx];
  }

  // ─── Shape SDFs ───────────────────────────────────────────
  const SDF = {
    circle:  (x,y,r) => Math.sqrt(x*x+y*y) - r,
    ellipse: (x,y,rx,ry) => Math.sqrt((x/rx)**2+(y/ry)**2) - 1,
    box:     (x,y,w,h) => Math.max(Math.abs(x)-w, Math.abs(y)-h),
    line:    (x,y,x1,y1,x2,y2) => {
      const dx=x2-x1, dy=y2-y1, t=Math.max(0,Math.min(1,((x-x1)*dx+(y-y1)*dy)/(dx*dx+dy*dy)));
      return Math.sqrt((x-x1-t*dx)**2+(y-y1-t*dy)**2);
    },
  };

  // ─── Core renderer ────────────────────────────────────────
  function render(cols, rows, fn) {
    let out = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        out += fn(c, r, cols, rows);
      }
      out += '\n';
    }
    return out;
  }

  // ─── Scene: Eye (hero) ────────────────────────────────────
  function sceneEye(cols, rows, t=0) {
    return render(cols, rows, (c, r) => {
      const nx = (c/cols)*2 - 1;
      const ny = (r/rows)*2 - 1;
      // Eye outer shape — wider than tall
      const eyeD = SDF.ellipse(nx, ny*1.6, 1, 1);
      // outside eye
      if (eyeD > 0) {
        const bg = fbm(c*0.06+t*0.12, r*0.08+t*0.08, 3)*0.5+0.5;
        return charAt(bg*0.18, 'standard');
      }
      // pupil center
      const px = 0 + Math.sin(t*0.4)*0.06;
      const py = 0 + Math.cos(t*0.3)*0.04;
      const pupilD = SDF.ellipse(nx-px, (ny-py)*1.1, 0.22, 0.22);
      if (pupilD < 0) {
        const deep = fbm(c*0.25+t, r*0.25+t*0.7, 2)*0.5+0.5;
        return charAt(deep*0.06, 'sharp');
      }
      // iris
      const dist = Math.sqrt((nx-px)**2+(ny-py)**2);
      const angle = Math.atan2(ny-py, nx-px);
      const irisRipple = fbm(Math.cos(angle)*4+t*0.3, Math.sin(angle)*4+dist*8, 4)*0.5+0.5;
      const irisRadial = fbm(dist*6+t*0.15, angle*2, 3)*0.5+0.5;
      const edgeDim = Math.max(0, 1 - Math.pow(Math.abs(eyeD)*12, 0.5));
      const bright = (irisRipple*0.5 + irisRadial*0.4 + edgeDim*0.1)*0.85 + 0.05;
      return charAt(Math.max(0.1, Math.min(0.92, bright)), 'organic');
    });
  }

  // ─── Scene: Cascade (waterfall flow) ─────────────────────
  function sceneCascade(cols, rows, t=0) {
    return render(cols, rows, (c, r) => {
      const nx = c/cols, ny = r/rows;
      const flow = fbm(nx*3, ny*6 - t*0.4, 5);
      const turb = fbm(nx*8+flow, ny*8, 3)*0.5+0.5;
      const edge = Math.min(nx, 1-nx)*4;
      const bright = (flow*0.4+0.5)*edge*0.6 + turb*0.4;
      const b = Math.pow(Math.max(0,Math.min(1, bright*1.1)), 1.2);
      return charAt(b, 'organic');
    });
  }

  // ─── Scene: Meridian (diagonal beam) ─────────────────────
  function sceneMeridian(cols, rows, t=0) {
    return render(cols, rows, (c, r) => {
      const nx = c/cols, ny = r/rows;
      // Diagonal light beam
      const beam = Math.abs((nx - ny + Math.sin(t*0.15)*0.05)*2.4);
      const beamLight = Math.max(0, 1 - beam*2.5);
      const noise = fbm(nx*5+t*0.08, ny*5, 4)*0.5+0.5;
      const vignette = Math.min(nx, 1-nx, ny, 1-ny)*5;
      const b = Math.min(1, beamLight*0.85 + noise*0.25) * Math.min(1, vignette);
      return charAt(Math.pow(Math.max(0,b), 0.8), 'sharp');
    });
  }

  // ─── Scene: Penumbra (eclipse / sphere shadow) ───────────
  function scenePenumbra(cols, rows, t=0) {
    return render(cols, rows, (c, r) => {
      const nx = (c/cols)*2-1, ny = (r/rows)*2-1;
      // sphere
      const sphereD = Math.sqrt(nx*nx + ny*ny) - 0.7;
      const lightX=-0.6, lightY=-0.5;
      const ldx=nx-lightX, ldy=ny-lightY;
      const lightDist = Math.sqrt(ldx*ldx+ldy*ldy);
      if (sphereD < 0) {
        // lit vs shadow on sphere
        const nX=nx/0.7, nY=ny/0.7;
        const diffuse = Math.max(0, (nX*(-lightX) + nY*(-lightY)));
        const sub = fbm(nx*4+t*0.05, ny*4, 4)*0.5+0.5;
        const b = diffuse*0.7 + sub*0.25;
        return charAt(Math.max(0.02,Math.min(0.95,b)), 'portrait');
      }
      // penumbra glow around sphere
      const glow = Math.max(0, 1 - Math.abs(sphereD)*5) * 0.3;
      const bg = fbm(nx*3+t*0.06, ny*3, 3)*0.5+0.5;
      const ambient = Math.max(0, 1-lightDist*0.9)*0.2;
      return charAt(Math.max(0, bg*0.15 + glow + ambient), 'standard');
    });
  }

  // ─── Scene: Liminal (threshold / fog) ────────────────────
  function sceneLiminal(cols, rows, t=0) {
    return render(cols, rows, (c, r) => {
      const nx = c/cols, ny = r/rows;
      // Horizon line with fog layers
      const horizon = 0.45 + fbm(nx*2+t*0.06, 0, 2)*0.08;
      const distH = Math.abs(ny - horizon);
      const fog = fbm(nx*4 - t*0.1, ny*3, 5)*0.5+0.5;
      const sky = ny < horizon ? (1-ny)*0.15 + fog*0.12 : 0;
      const ground = ny > horizon ? (ny-horizon)*0.6 + fog*0.3 : 0;
      const glow = Math.max(0, 1 - distH*12)*0.5;
      const b = Math.min(1, sky + ground + glow);
      return charAt(Math.pow(Math.max(0,b), 0.9), 'organic');
    });
  }

  // ─── Scene: Threshold (vortex spiral) ────────────────────
  function sceneThreshold(cols, rows, t=0) {
    return render(cols, rows, (c, r) => {
      const nx = (c/cols)*2-1, ny = (r/rows)*2-1;
      const dist = Math.sqrt(nx*nx+ny*ny);
      const angle = Math.atan2(ny, nx);
      // Logarithmic spiral arms
      const spiral = Math.abs(Math.sin(angle*4 - dist*8 + t*0.3))*0.5;
      const radial = Math.max(0, 1 - dist*0.9);
      const center = Math.max(0, 1 - dist*4);
      const noise = fbm(nx*3+t*0.1, ny*3, 4)*0.5+0.5;
      const b = spiral*radial*0.6 + center*0.4 + noise*0.15;
      return charAt(Math.min(0.95, Math.max(0, b)), 'sharp');
    });
  }

  // ─── Portrait scene ───────────────────────────────────────
  function scenePortrait(cols, rows) {
    return render(cols, rows, (c, r) => {
      const nx = (c/cols)*2-1, ny = (r/rows)*2-1;
      // Face oval
      const faceD = SDF.ellipse(nx, ny-0.05, 0.75, 0.92);
      if (faceD > 0) return ' ';
      // Hair
      if (ny < -0.52) {
        const h = fbm(c*0.2, r*0.2, 3)*0.5+0.5;
        return charAt(h*0.1+0.02, 'portrait');
      }
      // Eyes
      const leyeD = SDF.ellipse(nx+0.3, ny+0.12, 0.15, 0.09);
      const reyeD = SDF.ellipse(nx-0.3, ny+0.12, 0.15, 0.09);
      if (leyeD < 0 || reyeD < 0) {
        const pupil = Math.min(
          SDF.circle(nx+0.3, ny+0.12, 0.05),
          SDF.circle(nx-0.3, ny+0.12, 0.05)
        );
        return charAt(pupil < 0 ? 0.02 : 0.1, 'portrait');
      }
      // Nose bridge
      const noseD = SDF.ellipse(nx, ny-0.18, 0.04, 0.14);
      if (noseD < 0) return charAt(0.5, 'portrait');
      // Lips
      if (ny > 0.3 && ny < 0.46 && Math.abs(nx) < 0.22) {
        const liphalf = ny < 0.38;
        return charAt(liphalf ? 0.2 : 0.12, 'portrait');
      }
      // Skin with directional light from upper-left
      const light = Math.max(0, (-nx*0.4 + (-ny)*0.6 + 0.5));
      const sub = fbm((c*0.3), (r*0.3), 3)*0.5+0.5;
      const b = 0.25 + light*0.45 + sub*0.1;
      return charAt(Math.min(0.9, b), 'portrait');
    });
  }

  // ─── Animated renderer helper ─────────────────────────────
  function animate(el, sceneFn, cols, rows, speed=1) {
    let t = 0, raf;
    function frame() {
      el.textContent = sceneFn(cols, rows, t);
      t += 0.016 * speed;
      raf = requestAnimationFrame(frame);
    }
    frame();
    return () => cancelAnimationFrame(raf);
  }

  // ─── Intersection observer helper ─────────────────────────
  function whenVisible(el, cb) {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) cb();
    }, { threshold: 0.1 });
    obs.observe(el);
    return obs;
  }

  // ─── Measure text (simple canvas approach) ────────────────
  let _ctx = null;
  function measureChar(ch, font='12px IBM Plex Mono') {
    if (!_ctx) { _ctx = document.createElement('canvas').getContext('2d'); }
    _ctx.font = font;
    return _ctx.measureText(ch).width;
  }

  return { noise2, fbm, charAt, render, SDF,
    sceneEye, sceneCascade, sceneMeridian, scenePenumbra, sceneLiminal, sceneThreshold, scenePortrait,
    animate, whenVisible, measureChar, PALETTES };
})();
