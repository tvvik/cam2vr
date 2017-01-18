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

	this.materialLeft = null;
	this.materialRight = null;

	this.vrActive = false;

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
        this.effect = new THREE.StereoEffect(this.renderer);
        this.camera = new THREE.PerspectiveCamera( this.camFOV, this.width / this.height, this.camNear, this.camFar );
        this.camera.position.set(0,0,0);
        //this.camera.up = new THREE.Vector3(0,0,1);
        //this.camera.lookAt(new THREE.Vector3(0,0,10));

        this.controls = new THREE.DeviceOrientationControls( this.camera );

        this.light = new THREE.AmbientLight( 0xFFFFFF, 1);
        this.light.position.set(0,-100,0);

        this.loadTextures();

        this.plane1 = new THREE.Mesh(new THREE.PlaneGeometry(640, 480), this.materialLeft);
        this.plane1.position.set(400, 0, 0);
        this.plane1.rotation.y = -Math.PI/2;

        this.plane2 = new THREE.Mesh(new THREE.PlaneGeometry(640, 480), this.materialRight);
        this.plane2.position.set(401, 0, 0);
        this.plane2.rotation.y =  -Math.PI/2;

        var axis = new THREE.AxisHelper(100);
        this.scene.add(axis);

        this.scene.add(this.camera);
        this.scene.add(this.light);
        this.scene.add(this.plane1);        
        this.scene.add(this.plane2);

		//console.log('started 2: ', this);
	};

	this.loadTextures = function() {
		this.materialLeft = new THREE.MeshStandardMaterial({
                //color:color_negru,
                color:"#FFFFFF",
                roughness : 0.2,
                metalness : 0.2//,
                //envMap: simItalia.cubeCamera.renderTarget.texture
            });

		this.materialRight = new THREE.MeshStandardMaterial({
                //color:color_negru,
                color:"#FFFFFF",
                roughness : 0.2,
                metalness : 0.2//,
                //envMap: simItalia.cubeCamera.renderTarget.texture
            });

		var loaderTex = new THREE.TextureLoader();
        loaderTex.load('images/stereo/002/left.jpg',
            function (txx){
                txx.wrapS = THREE.RepeatWrapping;
                txx.wrapT = THREE.RepeatWrapping;

                txx.repeat.set(1,1);
                console.log('this: ', this);
                this.materialLeft.map = txx;
                this.materialLeft.needsUpdate = true;
            }.bind(this),
            function ( xhr ) {
                //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
                // Function called when download errors
            function ( xhr ) {
                //console.log( 'An error happened:',xhr );
            });

        var loaderTexR = new THREE.TextureLoader();
        loaderTexR.load('images/stereo/002/left.jpg',
            function (txx){
                txx.wrapS = THREE.RepeatWrapping;
                txx.wrapT = THREE.RepeatWrapping;

                txx.repeat.set(1,1);
                this.materialRight.map = txx;
                this.materialRight.needsUpdate = true;
            }.bind(this),
            function ( xhr ) {
                //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
                // Function called when download errors
            function ( xhr ) {
                //console.log( 'An error happened:',xhr );
            });
	};

	this.addMainEvents = function() {
		document.getElementById('vrIco').addEventListener('mousedown', function (event) 
		{
			if (this.vrActive) this.vrActive = false;
			else this.vrActive = true;
			console.log('VR is now: ', this.vrActive);
		});
	}

	this.animate = function() {
		//console.log('now in animate: ', this);
		if (this!==window) {
			//this.plane1.rotation.y += 0.1;

			this.controls.update();
			if (this.getVRActive) {
				 this.effect.render(this.scene, this.camera);
				 console.log('rendering in VR mode');
			}
			else this.renderer.render(this.scene, this.camera);
			this.frameId = requestAnimationFrame(this.animate.bind(this));


			//console.log('animating...');
		}
	};

	this.getVRActive = function(){
		return this.vrActive;
	}

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
