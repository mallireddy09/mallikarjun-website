export const initSkillSphere = () => {
    const DOT_RADIUS = 64;
    const SCALE = 1.1;
    const MIN_SPEED = 0.0007;
    const MOUSE_SPEED = 0.05;

    let svgs = document.getElementById("svg-container");
    const canvasElement = document.getElementById("myCanvas");
    if (!svgs || !(canvasElement instanceof HTMLCanvasElement)) {
        return () => {};
    }
    const canvas = canvasElement;

    const COLORS: string[][] = Array.from({ length: svgs.children.length }, () => []);
    let PATHS = [...svgs?.children].map((svg, i) => {
        if (svg.children[0].tagName === "g") {
            svg = svg.children[0];
            COLORS[i] = Array(svg.children.length);
            COLORS[i][0] = svg.getAttribute("fill") ?? "#FFF";
        } else {
            COLORS[i] = Array(svg.children.length);
        }
        return [...svg.children].map((e, j) => {
            let c = e.getAttribute("fill");
            if (c !== null) {
                COLORS[i][j] = c;
            } else {
                COLORS[i][j] = COLORS[i][0] ? COLORS[i][0] : "#FFF";
            }
            return new Path2D(e.getAttribute("d") ?? "");
        });
    });

    const SAMPLES = PATHS.length;
    const context = canvas.getContext("2d");
    if (!context) return () => {};
    const ctx = context;

    let width = 0;
    let height = 0;
    let PERSPECTIVE = 0;
    let PROJECTION_CENTER_X = 0;
    let PROJECTION_CENTER_Y = 0;
    let GLOBE_RADIUS = 0;
    let rafId: number | null = null;
    let slowDownTimer: number | undefined;
    let disposed = false;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rect = canvas.getBoundingClientRect();
    let isInView = rect.bottom > 0 && rect.top < window.innerHeight &&
        rect.right > 0 && rect.left < window.innerWidth;

    const canAnimate = () => !disposed && isInView && !document.hidden && !motionPreference.matches;

    function clearSlowDownTimer() {
        window.clearTimeout(slowDownTimer);
        slowDownTimer = undefined;
    }

    function resizeCanvas() {
        // CSS controls display size; attributes must be numeric pixels for the buffer.
        width = Math.max(1, Math.floor(canvas.clientWidth || canvas.offsetWidth));
        height = Math.max(1, Math.floor(canvas.clientHeight || canvas.offsetHeight));

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        PERSPECTIVE = width * (window.innerWidth > 768 ? 0.8 : 1.2);
        PROJECTION_CENTER_X = width / (window.innerWidth > 768 ? 1.8 : 1.5);
        PROJECTION_CENTER_Y = height / 1.6;
        GLOBE_RADIUS = Math.min(width, height) / (window.innerWidth > 768 ? 2.6 : 3);
    }

    resizeCanvas();

    let PHI = Math.PI * (3.0 - Math.sqrt(5.0));
    let VX = MIN_SPEED;
    let VY = MIN_SPEED;
    let VZ = MIN_SPEED;
    let mouse_x = 0;
    let mouse_y = 0;
    let mouse_moving = false;

    const onMouseMove = (e: MouseEvent) => {
        if (!canAnimate()) return;
        clearSlowDownTimer();
        mouse_moving = true;
        mouse_x = e.offsetX - width / 2;
        mouse_y = e.offsetY - height / 2;
        VY = MOUSE_SPEED * mouse_x / width;
        VZ = MOUSE_SPEED * mouse_y / height;
    };
    function slowDownSpin() {
        slowDownTimer = undefined;
        if (mouse_moving || !canAnimate()) return;
        VZ /= 1.3;
        VY /= 1.3;
        if (Math.abs(VZ) <= MIN_SPEED) {
            VZ = (Math.sign(VZ) || 1) * MIN_SPEED;
        }
        if (Math.abs(VY) <= MIN_SPEED) {
            VY = (Math.sign(VY) || 1) * MIN_SPEED;
        }
        if (Math.abs(VZ) <= MIN_SPEED && Math.abs(VY) <= MIN_SPEED) return;
        slowDownTimer = window.setTimeout(slowDownSpin, 200);
    }

    const onMouseOut = () => {
        mouse_moving = false;
        clearSlowDownTimer();
        slowDownSpin();
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseout", onMouseOut);

    class Dot {
        colors: string[];
        paths: Path2D[];
        x: number;
        y: number;
        z: number;
        theta: number;
        xProjected: number;
        yProjected: number;
        scaleProjected: number;

        constructor(i: number, paths: Path2D[]) {
            this.colors = COLORS[i];
            this.y = 1 - (i / (SAMPLES - 1)) * 2;
            let radius = Math.sqrt(1 - this.y * this.y);
            this.theta = PHI * i;
            this.x = Math.cos(this.theta) * radius;
            this.z = Math.sin(this.theta) * radius;
            this.paths = paths;
            this.xProjected = 0;
            this.yProjected = 0;
            this.scaleProjected = 0;
        }
        rotate() {
            let x1 = this.x * Math.cos(VX) - this.y * Math.sin(VX);
            let y1 = this.x * Math.sin(VX) + this.y * Math.cos(VX);
            let x2 = x1 * Math.cos(VY) - this.z * Math.sin(VY);
            let z2 = x1 * Math.sin(VY) + this.z * Math.cos(VY);
            let y3 = y1 * Math.cos(VZ) - z2 * Math.sin(VZ);
            let z3 = y1 * Math.sin(VZ) + z2 * Math.cos(VZ);
            this.x = x2;
            this.y = y3;
            this.z = z3;
        }
        project(animate: boolean) {
            if (animate) this.rotate();
            this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z * GLOBE_RADIUS);
            this.xProjected = (this.x * GLOBE_RADIUS * this.scaleProjected) + PROJECTION_CENTER_X - DOT_RADIUS * this.scaleProjected;
            this.yProjected = (this.y * GLOBE_RADIUS * this.scaleProjected) + PROJECTION_CENTER_Y - DOT_RADIUS * this.scaleProjected;
        }
        draw(animate: boolean) {
            this.project(animate);
            ctx.save();
            ctx.globalAlpha = Math.abs(1 - this.z * 3 * GLOBE_RADIUS / width);
            ctx.beginPath();
            ctx.translate(this.xProjected, this.yProjected);
            ctx.scale(this.scaleProjected * SCALE * width / 1920, this.scaleProjected * SCALE * width / 1920);
            this.paths.forEach((path, i) => {
                ctx.fillStyle = this.colors[i];
                ctx.fill(path);
            });
            ctx.restore();
        }
    }
    const dots = PATHS.map((e, i) => new Dot(i, e));

    function drawFrame(animate: boolean) {
        if (disposed) return;
        ctx.clearRect(0, 0, width, height);
        dots.sort((dot1, dot2) => {
            return dot1.scaleProjected - dot2.scaleProjected;
        });
        dots.forEach(dot => {
            dot.draw(animate);
        });
    }

    function render() {
        rafId = null;
        if (!canAnimate()) return;
        drawFrame(true);
        rafId = window.requestAnimationFrame(render);
    }

    function pause() {
        if (rafId !== null) window.cancelAnimationFrame(rafId);
        rafId = null;
        clearSlowDownTimer();
        mouse_moving = false;
        VY = (Math.sign(VY) || 1) * MIN_SPEED;
        VZ = (Math.sign(VZ) || 1) * MIN_SPEED;
    }

    function syncAnimation() {
        if (disposed) return;
        if (canAnimate()) {
            if (rafId === null) render();
        } else {
            pause();
            if (!document.hidden) drawFrame(false);
        }
    }

    const onResize = () => {
        resizeCanvas();
        drawFrame(false);
    };
    const observer = new IntersectionObserver(([entry]) => {
        isInView = entry.isIntersecting;
        syncAnimation();
    });
    observer.observe(canvas);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", syncAnimation);
    motionPreference.addEventListener("change", syncAnimation);
    syncAnimation();

    return () => {
        disposed = true;
        pause();
        observer.disconnect();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", syncAnimation);
        motionPreference.removeEventListener("change", syncAnimation);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseout", onMouseOut);
    };
};
