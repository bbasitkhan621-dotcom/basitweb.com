// Ultra 3D Scene Configuration
class Ultra3DScene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if(!this.canvas) return;
        
        this.init();
        this.animate();
    }
    
    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050510);
        this.scene.fog = new THREE.FogExp2(0x050510, 0.002);
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 2, 8);
        
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: false });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        this.createCentralObject();
        this.createParticleSystem();
        this.createOrbitingSpheres();
        this.createLights();
        
        this.setupMouseTracking();
        this.setupResizeHandler();
    }
    
    createCentralObject() {
        const geometry = new THREE.IcosahedronGeometry(1.2, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00f3ff,
            emissive: 0x00f3ff,
            emissiveIntensity: 0.3,
            metalness: 0.8,
            roughness: 0.2,
            wireframe: false
        });
        this.centerObject = new THREE.Mesh(geometry, material);
        this.scene.add(this.centerObject);
        
        // Wireframe outer layer
        const wireframeMat = new THREE.MeshBasicMaterial({
            color: 0x8a2be2,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        this.wireframeObj = new THREE.Mesh(geometry, wireframeMat);
        this.wireframeObj.scale.set(1.1, 1.1, 1.1);
        this.scene.add(this.wireframeObj);
    }
    
    createParticleSystem() {
        const particleCount = 5000;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for(let i = 0; i < particleCount; i++) {
            positions[i*3] = (Math.random() - 0.5) * 100;
            positions[i*3+1] = (Math.random() - 0.5) * 60;
            positions[i*3+2] = (Math.random() - 0.5) * 80;
            
            colors[i*3] = Math.random();
            colors[i*3+1] = Math.random() * 0.5;
            colors[i*3+2] = Math.random();
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMat = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(particlesGeometry, particleMat);
        this.scene.add(this.particles);
    }
    
    createOrbitingSpheres() {
        this.orbitSpheres = [];
        const orbitCount = 12;
        
        for(let i = 0; i < orbitCount; i++) {
            const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
            const sphereMat = new THREE.MeshStandardMaterial({
                color: 0xff006e,
                emissive: 0xff006e,
                emissiveIntensity: 0.5
            });
            const sphere = new THREE.Mesh(sphereGeo, sphereMat);
            this.scene.add(sphere);
            this.orbitSpheres.push(sphere);
        }
    }
    
    createLights() {
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(2, 3, 4);
        this.scene.add(mainLight);
        
        const backLight = new THREE.PointLight(0x8a2be2, 0.5);
        backLight.position.set(-2, 1, -3);
        this.scene.add(backLight);
        
        const fillLight = new THREE.PointLight(0x00f3ff, 0.3);
        fillLight.position.set(3, 2, 2);
        this.scene.add(fillLight);
    }
    
    setupMouseTracking() {
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = (event.clientY / window.innerHeight) * 2 - 1;
        });
    }
    
    setupResizeHandler() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if(this.centerObject) {
            this.centerObject.rotation.y += 0.005;
            this.centerObject.rotation.x += 0.003;
            this.wireframeObj.rotation.y += 0.005;
            this.wireframeObj.rotation.x += 0.003;
        }
        
        if(this.particles) {
            this.particles.rotation.y += 0.0005;
            this.particles.rotation.x += 0.0003;
        }
        
        if(this.orbitSpheres) {
            const time = Date.now() * 0.002;
            this.orbitSpheres.forEach((sphere, index) => {
                const angle = (time + (index * Math.PI * 2 / this.orbitSpheres.length)) * 0.8;
                const radius = 2.5;
                sphere.position.x = Math.cos(angle) * radius;
                sphere.position.z = Math.sin(angle) * radius;
                sphere.position.y = Math.sin(angle * 2) * 0.5;
            });
        }
        
        if(this.mouseX) {
            this.camera.position.x += (this.mouseX * 0.5 - this.camera.position.x) * 0.05;
            this.camera.position.y += (-this.mouseY * 0.3 - this.camera.position.y) * 0.05;
            this.camera.lookAt(0, 0, 0);
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize scenes on different pages
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('canvas-3d-main')) {
        new Ultra3DScene('canvas-3d-main');
    }
    if(document.getElementById('login-canvas')) {
        new Ultra3DScene('login-canvas');
    }
    if(document.getElementById('signup-canvas')) {
        new Ultra3DScene('signup-canvas');
    }
});