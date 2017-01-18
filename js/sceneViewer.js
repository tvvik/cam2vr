var ViewerScene = function() {
	this.container = null;
	this.scene = null;
	this.renderer = null;
	this.effect= null;
	this.light = null;
	this.controls = null;
	this.plane1 = null;
	this.plane2 = null;
	this.width = 0;
	this.height = 0;
	this.frameId = null;
	this.camFOV = 70;
	this.camNear = 1;
	this.camFar = 2000;

	this.initialise = function(container)
	{
		this.container = container;
		this.scene = new THREE.Scene();
		this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }) 
        this.renderer.sortElements = true;
        this.renderer.setSize( this.width, this.height );        
        this.renderer.domElement.id = 'webGLcanvas';
        this.renderer.setClearColor( 0xf3f3f3 );
        this.container.appendChild( this.renderer.domElement );
        //this.renderer.alpha = true;
        //this.effect = new THREE.StereoEffect(simItalia.renderer);
        this.camera = new THREE.PerspectiveCamera( this.camFOV, this.width / this.height, this.camNear, this.camFar );
        this.camera.position.set(125,125,125);
        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(new THREE.Vector3(0,0,10));

        this.controls = new THREE.DeviceOrientationControls( this.camera );

        this.light = new THREE.AmbientLight( 0xFFFFFF, 1);
        this.light.position.set(0,100,0);

        this.plane1 = new THREE.Mesh(new THREE.PlaneGeometry(640, 480), new THREE.MeshStandardMaterial({color:'#00ff00'}));

        this.scene.add(this.camera);
        this.scene.add(this.light);
        this.scene.add(this.plane1);        


		console.log('started 2: ', this);
	};

	this.animate = function() {
		//console.log('now in animate: ', this);
		if (this!==window) {
			this.renderer.render(this.scene, this.camera);
			this.frameId = requestAnimationFrame(this.animate.bind(this));
			console.log('animating...');
		}
	};

	return this;
} 


/*
ViewerScene.prototype = {
	initialise : function(container) {
		
	},
	animate : function() {
		
	}
}
*/
