// THREE.JS MODULS

        import * as THREE from '../three119/build/three.module.js'; //r119 31.07.2020
        import { ColladaLoader } from '../three119/examples/jsm/loaders/ColladaLoader.js'; //31.07.2020
        import { OrbitControls } from '../three119/examples/jsm/controls/OrbitControls.js'; //31.07.2020

// THREE.JS

        var canvas, camera, scene, renderer, model, controls, collada, loader, loadingManager;

// USER
		
		var authorArray = ['alaa alhani','maggie oakshield','rey vizar','alaa alhani','rey vizar'];
		var passwordArray = ['alaa', 'maggie', 'rey', 'alaa', 'rey'];
		var mailArray = ['alaa@alhani.org','maggie@oakshield.io','rey@vizar.nerd','alaa@alhani.eu','rey@vizar.nerd'];
		
// USER MODEL

		var titleArray = ['experimental cube','glasshous jena paradise','bike frame tube','cosy attic','sons sugar cube'];
		var sizeArray = ['5.4','1.6','0.4','2.8','1.2']; // |||| Automatische Ermittlung! ||||
		var licenseArray = ['CC BY','CC BY','CC BY-SA','CC BY-ND','CC BY-NC-SA'];
		
// NAVIGATION

		var downID = document.getElementById("down");
		var upID = document.getElementById("up");
		var leftID = document.getElementById("left");
		var rightID = document.getElementById("right");

// MENUE

		var loginClick = document.getElementById("loginClick");
		var killClick = document.getElementById("killClick");

// COMMENTATION

		var commentationArray = [];
		var theTitleSaveVar, theTextSaveVar;

// ANSWER

		var answerText;
		
// PRIVATE : ACCOUNT INSIDES

		var guestName;
		var guestData = [];
		var guestDataCount = 0;
		var guestDataView;

// PUBLIC : SHOW MODEL

var modelNumber = authorArray.length - 1;

// var modelNumber = 4; // 4 Modelle in DB

// FIRST TIME : LOAD THREE.JS		

		init();
		animate();

		function init() {
            canvas = document.getElementById( 'threejsLayout' );     
			scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
            scene.add( camera );
            var light = new THREE.PointLight( 0xffffff, 1 );
			camera.add( light );			
			// LOADING COLLADA WHEN LOADING APP DISCONSTRUCT
			loadingManager = new THREE.LoadingManager();
			loader = new ColladaLoader( loadingManager );
            loader.load( getModelURL(), function ( collada ) { model = collada.scene; centeringAndFitting();scene.add( model ); meshInfo(); insertUserCommentation() } );			
			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setClearColor( 0x000000 );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			canvas.appendChild( renderer.domElement );
	        controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render );
			//controls.autoRotate = true;
			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
            controls.screenSpacePanning = false;
            controls.minDistance = 0.1;
			controls.maxDistance = 500
            controls.maxPolarAngle = Math.PI / 2;
			window.addEventListener( 'resize', onWindowResize, false );
		};

// EVERY MODEL : CENTERING AND FITTING

		function centeringAndFitting(){
			var box = new THREE.Box3();
			box.setFromObject( model );
			model.position.sub( box.getCenter( new THREE.Vector3() ) );
			var size = box.getSize(new THREE.Vector3());
			var maxSize = Math.max(size.x, size.y, size.z);
			var dist = maxSize * 1.75 / (2 * Math.tan(70 * Math.PI/360));
			camera.position.set(0,0,size.z / 2 + dist);
		};

// RESIZE

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		};

// REQUEST ANIMATION-FRAME

		function animate() {
			requestAnimationFrame( animate );
			controls.update();
			render();
		};

// RENDER

		function render() {
			renderer.render( scene, camera );			
		};
		
// PUBLIC : MODEL-URL

    	function getModelURL() {    
			var modelFileName = './models/' + modelNumber + '.dae';
			return modelFileName;
		};
		
// PRIVATE : MODEL-URL

		function getGuestModelURL() {    
			var guestModelFileName = './models/' + guestDataView + '.dae';
			return guestModelFileName;
		};

// PUBLIC : MESH-INFO

		function meshInfo() {	
			var meshinfo = document.getElementById("meshinfo");
			var modelNumberInDB = modelNumber + 1;
			meshinfo.innerHTML = "<span class=" + "klein" + ">" + "Model in DB" + "</span>" + "<br>" + "<span class=" + "hoch" + ">" + modelNumberInDB + " / " + authorArray.length + "</span>" + "<br>" +
			"<span class=" + "klein" + ">" + "Author" + "</span>" + "<br>" + "<span class=" + "hoch" + ">" + authorArray[modelNumber] + "</span>" + "<br>" + 
			"<span class=" + "klein" + ">" + "Title" + "</span>" + "<br>" + "<span class=" + "hoch" + ">" + titleArray[modelNumber] + "</span>" + "<br>" +
			"<span class=" + "klein" + ">" + "Size in MB" + "</span>" + "<br>" + "<span class=" + "hoch" + ">" + sizeArray[modelNumber] + "</span>" + "<br>" + 
			"<span class=" + "klein" + ">" + "Creative Commons License" + "</span>" + "<br>" + "<span class=" + "hoch" + ">" + licenseArray[modelNumber] + "</span>" + "<br>" +
			"<span class=" + "klein" + ">" + "upload" + "</span>" + "<br>" + "<span class=" + "hoch" + ">" + new Date().toLocaleString() + "</span>"; 
		};

// PRIVATE : MESH-INFO

function meshGuestInfo(){
    // DOM DOCKING
    var meshGuestInfo = document.getElementById("meshinfo");
    // CLEARING
    meshGuestInfo.innerHTML = null;
    // COUNTING ACTUAL AND ALL GUEST-MODELS
    var guestModelNumberInDB = guestData.indexOf(guestDataView) + 1;
    // Models in DB
    var dbSub = document.createElement("div");
    dbSub.setAttribute("class", "klein");
    dbSub.innerHTML = "Model in your DB";
    // br
    var dbSubBr = document.createElement("br");
    // Models Input
    var dbIn = document.createElement("div");
    dbIn.setAttribute("class", "hoch");
    dbIn.innerHTML = guestModelNumberInDB + " / " + guestData.length;
    // br
    var dbInBr = document.createElement("br");
    // Author
    var authorSub = document.createElement("div");
    authorSub.setAttribute("class", "klein");
    authorSub.innerHTML = "Author";
    // br
    var authorSubBr = document.createElement("br");
    // Author Input
    var authorIn = document.createElement("div");
    authorIn.setAttribute("class", "hoch");
    authorIn.innerHTML = authorArray[guestDataView];
    // br
    var authorInBr = document.createElement("br");
    // Titel
    var titSub = document.createElement("div");
    titSub.setAttribute("class", "klein");
    titSub.innerHTML = "Title";
    // br
    var titSubBr = document.createElement("br");
    // Title Input
    var titIn = document.createElement("div");
    titIn.setAttribute("class", "hoch");
    titIn.innerHTML = titleArray[guestDataView];
    // Title Func
    var titFunc = document.createElement("div");
    titFunc.setAttribute("class", "meshinfoFunc");
    titFunc.innerHTML = "&nbsp;edit&nbsp;";
    titFunc.addEventListener("click", privAssetInfoTitleEdit, false)
    // br
    var titFuncBr = document.createElement("br");    
    // Lizenz
    var lizSub = document.createElement("div");
    lizSub.setAttribute("class", "klein");
    lizSub.innerHTML = "Lizenz";
    // br
    var lizSubBr = document.createElement("br");
    // LIZENZ-DROPDOWN
    var lisForm = document.createElement("form");
    lisForm.setAttribute("name", "lizenzForm");
    lisForm.setAttribute("class", "hoch");
    lisForm.addEventListener("change", lisDrop, false);
    var lisSelect = document.createElement("select");
    lisSelect.setAttribute("name", "lizenzWahl");
    lisForm.prepend(lisSelect);
    var lisOp1 = document.createElement("option");
    lisOp1.innerHTML = "CC BY";
    var lisOp2 = document.createElement("option");
    lisOp2.innerHTML = "CC BY-SA";
    var lisOp3 = document.createElement("option");
    lisOp3.innerHTML = "CC BY-ND";
    var lisOp4 = document.createElement("option");
    lisOp4.innerHTML = "CC BY-NC";
    var lisOp5 = document.createElement("option");
    lisOp5.innerHTML = "CC BY-NC-SA";
    var lisOp6 = document.createElement("option");
    lisOp6.innerHTML = "CC BY-NC-ND";
    var lisOp7 = document.createElement("option");
    lisOp7.innerHTML = "All Rights Reserved";
    lisSelect.prepend(lisOp7);
    lisSelect.prepend(lisOp6);
    lisSelect.prepend(lisOp5);
    lisSelect.prepend(lisOp4);
    lisSelect.prepend(lisOp3);
    lisSelect.prepend(lisOp2);
    lisSelect.prepend(lisOp1);   
    // HELP
    var lisHelp = document.createElement("div");
    lisHelp.setAttribute("class", "meshinfoFunc");
    lisHelp.innerHTML = "&nbsp;help&nbsp;";
    lisHelp.addEventListener("click", helpModal, false);
    // br
    var lizFuncBr = document.createElement("br");
    // Upload
    var upSub = document.createElement("div");
    upSub.setAttribute("class", "klein");
    upSub.innerHTML = "Size/Upload";
    // br
    var upSubBr = document.createElement("br");
    // Upload Input
    var upIn = document.createElement("div");
    upIn.setAttribute("class", "hoch");
    upIn.innerHTML = sizeArray[guestDataView] + " / " + new Date().toLocaleString();
    // DOM DOCKING
    meshGuestInfo.prepend(upIn);
    meshGuestInfo.prepend(upSubBr);
    meshGuestInfo.prepend(upSub);
    meshGuestInfo.prepend(lizFuncBr);
    meshGuestInfo.prepend(lisHelp);
    meshGuestInfo.prepend(lisForm);
    meshGuestInfo.prepend(lizSubBr);
    meshGuestInfo.prepend(lizSub);
    meshGuestInfo.prepend(titFuncBr);
    meshGuestInfo.prepend(titFunc);
    meshGuestInfo.prepend(titIn);
    meshGuestInfo.prepend(titSubBr);
    meshGuestInfo.prepend(titSub);
    meshGuestInfo.prepend(authorInBr);
    meshGuestInfo.prepend(authorIn);
    meshGuestInfo.prepend(authorSubBr);
    meshGuestInfo.prepend(authorSub);
    meshGuestInfo.prepend(dbInBr);
    meshGuestInfo.prepend(dbIn);
    meshGuestInfo.prepend(dbSubBr);
    meshGuestInfo.prepend(dbSub);
    // SELECT LIZENZ
    document.lizenzForm.lizenzWahl.value = licenseArray[guestDataView];
    
};

// INSERT USER COMMENTATION IN PUBLIC AREA	
					
		function insertUserCommentation(){
			if (commentationArray[modelNumber] !== undefined) {
				var commentationDefaultDiv = document.getElementById("commentationWriteID");	
				commentationDefaultDiv.after(commentationArray[modelNumber]);
			} else {
				var insertUserComments = document.createElement("div");
				insertUserComments.setAttribute("id", "commentationSpecificModelID");
				document.getElementById("commentationWriteID").after(insertUserComments)
			}};

// INSERT USER COMMENTATION IN ACCOUNT AREA

		function insertGuestCommentation() {
			if (commentationArray[guestDataView] !== undefined) {
				var commentationDefaultDiv = document.getElementById("commentationWriteID");	
				commentationDefaultDiv.after(commentationArray[guestDataView]);
			} else {
				var insertUserComments = document.createElement("div");
				insertUserComments.setAttribute("id", "commentationSpecificModelID");
				document.getElementById("commentationWriteID").after(insertUserComments)
			};
		};

// KLICK UP + DOWN + LEFT + RIGHT

		function saveAndRemoveUserCommentation(){
			// KLICK : UP or DOWN
			if (event.target.id == "down" && modelNumber > 0 || event.target.id == "up" && modelNumber < authorArray.length - 1){			
				var commentationForSpecificModel = document.getElementById("commentationSpecificModelID");
				if (commentationForSpecificModel.hasChildNodes()){
					commentationArray[modelNumber] = commentationForSpecificModel;
				};
				commentationForSpecificModel.remove();
				// MODELNUMBER
				if ( event.target.id == "down" ){
					modelNumber = modelNumber - 1;
				} else {
					modelNumber = modelNumber + 1;
				};
				// HIDE/SHOW UP AND DOWN
				if (modelNumber == authorArray.length - 1){
					upID.style.visibility = "hidden"
				} else {
					upID.style.visibility = "visible"
				};
				if(modelNumber == 0){
					downID.style.visibility = "hidden"
				} else {
					downID.style.visibility = "visible"
				};
				// MODEL-DATA ACTIONS (CLEARING OLD AND CATCH NEW ONE)
				catchModel();	
			};
			// KLICK : LEFT
			if (event.target.id == "left"){
				// HIDE/SHOW NAVI
				upID.style.visibility = "hidden"
				downID.style.visibility = "hidden"
				rightID.style.visibility = "visible"
				// ERHÖHE HILFSVARIABLE UM 1
				guestDataCount = guestDataCount + 1;
				// VOM PUB-BEREICH IN DEN PRIV-BEREICH
				if (guestDataCount == 1) {
					// SHOW KILL-ICON
					killClick.style.visibility = "visible";
					// SPEICHERE KOMMENTAR
					var commentationForSpecificModel = document.getElementById("commentationSpecificModelID");
					if (commentationForSpecificModel.hasChildNodes()){
						commentationArray[modelNumber] = commentationForSpecificModel;
					};
					// ... SHOW MODEL
					if ( guestData.length > 0 ) {
						// LÖSCHE KOMMENTAR
						commentationForSpecificModel.remove();
						// ERZEUGE VARIABLE MIT MODELNUMMER
						guestDataView = guestData[guestData.length - guestDataCount];
						// meshInfo() + insertGuestComments() + Modell einfügen in...
						catchModel();
					};
					// ... SHOW BASICS
					if (guestData.length == 0) {
						// USER-DATA
						var accountAuthor = document.getElementById("accountUsernameIDRead");
						accountAuthor.innerHTML = authorArray[guestDataView];
						var accountPass = document.getElementById("accountPasswordIDRead");
						accountPass.innerHTML = passwordArray[guestDataView];
						var accountMail = document.getElementById("accountMailIDRead");
						accountMail.innerHTML = mailArray[guestDataView];
						// SHOW ACCOUNT MODAL
						var showAccountBasics = document.getElementById("modalAccountBasicID");
						showAccountBasics.style.visibility = "visible"
						//hide Left
						leftID.style.visibility = "hidden"
					};
				};
				// NAVIGIEREN INNERHALB DES ACCOUNT-BEREICHES NACH LINKS
				if (guestDataCount > 1) {
					var commentationForSpecificModel = document.getElementById("commentationSpecificModelID");
					if (commentationForSpecificModel.hasChildNodes()){
						commentationArray[guestDataView] = commentationForSpecificModel;
					};
					/// ... SHOW MODEL
					if (guestData.length >= guestDataCount) {
						guestDataView = guestData[guestData.length - guestDataCount];
						commentationForSpecificModel.remove();
						catchModel();
					};
					// ... SHOW ACCOUNT-BASICS
					if (guestData.length < guestDataCount){
						// USER-DATA
						var accountAuthor = document.getElementById("accountUsernameIDRead");
						accountAuthor.innerHTML = authorArray[guestDataView];
						var accountPass = document.getElementById("accountPasswordIDRead");
						accountPass.innerHTML = passwordArray[guestDataView];
						var accountMail = document.getElementById("accountMailIDRead");
						accountMail.innerHTML = mailArray[guestDataView];
						// SHOW ACCOUNT MODAL
						var showAccountBasics = document.getElementById("modalAccountBasicID");
						showAccountBasics.style.visibility = "visible"
						//hide Left
						leftID.style.visibility = "hidden"
					};
				};
			};
			// KLICK : RIGHT
			if (event.target.id == "right") {
				guestDataCount = guestDataCount - 1;
				leftID.style.visibility = "visible";
				// VOM ACCOUNT-BEREICH IN PUBLIC-BEREICH
				if (guestDataCount == 0) {
					// HIDE KILL-ICON
					killClick.style.visibility = "hidden";
					// SHOW NAVI
					rightID.style.visibility = "hidden";
					if (modelNumber < authorArray.length - 1) {
						upID.style.visibility = "visible";
					} else {
						upID.style.visibility = "hidden";
					};
					if (modelNumber > 0) {
						downID.style.visibility = "visible";
					} else {
						downID.style.visibility = "hidden";
					};
					// ... VOM MODEL NACH PUBLIC
					if (guestData.length > 0) { // ???? oder not undefined
						// KOMMENTAR SPEICHERN
						var commentationForSpecificModel = document.getElementById("commentationSpecificModelID");
						if (commentationForSpecificModel.hasChildNodes()){
							commentationArray[guestDataView] = commentationForSpecificModel;
						};
						// KOMMENTAR EINFÜGEN ETC.
						commentationForSpecificModel.remove();
						catchModel();
					};
					// ... VON ACCOUNT-BASIC NACH PUBLIC
					if (guestData.length == 0) {
						// HIDE ACCOUNT MODAL
						var hideAccountBasics = document.getElementById("modalAccountBasicID");
						hideAccountBasics.style.visibility = "hidden"
					};
				};
				// NAVIGIEREN INNERHALB DES ACCOUNTS NACH RECHTS
				if (guestDataCount > 0) {
					rightID.style.visibility = "visible";
					// ... VOM MODELL ZUM MODELL
					if (guestDataCount < guestData.length) {
						var commentationForSpecificModel = document.getElementById("commentationSpecificModelID");
						if (commentationForSpecificModel.hasChildNodes()){
							commentationArray[guestDataView] = commentationForSpecificModel;
						};
						guestDataView = guestData[guestData.length - guestDataCount];
						commentationForSpecificModel.remove(); // ??? steht diese Variable hier zur Verfügung ???
						catchModel();
					};
					// ... VON ACCOUNT-BASIC ZU MODELL
					if (guestData.length == guestDataCount) {
						var showAccountBasics = document.getElementById("modalAccountBasicID");
						showAccountBasics.style.visibility = "hidden";
						meshGuestInfo();
					};
				};
			};
		};

// MODEL-DATA ACTIONS

		function catchModel () {
			// DISPOSE GEOMETRY
			model.traverse(object => {
				if (!object.isMesh) return
					object.geometry.dispose()
					//console.log('dispose geometry done!')
				if (object.material.isMaterial) {
					cleanMaterial(object.material)
				} else {
					// AN ARRAY OF MATERIALS
					for (const material of object.material) cleanMaterial(material)
				}
			});
			// DISPOSE MATERIAL
			function cleanMaterial(material) {
				material.dispose();
				//console.log('dispose material done!')
				const keys = Object.keys(material);
				for (const key of keys) {
					const value = material[key];
					if (value && value.isTexture) {
						value.dispose();
						//console.log('dispose texture done!')
					}
				}
			};
			// LOADING MODEL + ZENTRIERUNG/ANPASSUNG AN SCREEN-SIZE + EINFÜGEN VON MESHINFO + KOMMENTARE
			// KLICK DOWN + UP
			if (event.target.id == "down" || event.target.id == "up") {
			loader.load ( getModelURL (), function ( collada ) {
				scene.remove(model);
				model = collada.scene;
				centeringAndFitting();
				scene.add( model );
				meshInfo(); insertUserCommentation();
			}, undefined, function ( error ) {
			})};
			// KLICK LEFT
			if (event.target.id == "left") {
			loader.load ( getGuestModelURL (), function ( collada ) {
				scene.remove(model);
				model = collada.scene;
				centeringAndFitting();
				scene.add( model );
				meshGuestInfo(); insertGuestCommentation();
			}, undefined, function ( error ) {
			})};
			// KLICK RIGHT TO GO IN PUBLIC OR LOGOUT
			if (event.target.id == "right" && guestDataCount == 0 || event.target.id == "loginClick") {
			loader.load ( getModelURL (), function ( collada ) {
				scene.remove(model);
				model = collada.scene;
				centeringAndFitting();
				scene.add( model );
				meshInfo(); insertUserCommentation();
			}, undefined, function ( error ) {
			})};
			// KLICK RIGHT TO GO TO MODEL OR UPLOAD
			if (event.target.id == "right" && guestDataCount > 0 || event.target.id == "uploadClick") {
			loader.load ( getGuestModelURL (), function ( collada ) {
				scene.remove(model);
				model = collada.scene;
				centeringAndFitting();
				scene.add( model );
				meshGuestInfo(); insertGuestCommentation();
			}, undefined, function ( error ) {
			})};
		};

// DISCUSS BUTTON

document.getElementById("discussBtn").addEventListener("click", discussButton, false);

function discussButton(){
	// CREATE USERNAME DIV
	var userDiv = document.createElement("div");
	userDiv.setAttribute("class", "commentationUsernameClass");
	userDiv.setAttribute("id", "commentationUsernameID");
	userDiv.innerHTML = "username";
	// CREATE DATE AND TIME
	var dateTimeDiv = document.createElement("div");
	dateTimeDiv.setAttribute("class", "commentationDateAndTimeClass");
	dateTimeDiv.setAttribute("id", "commentationDateAndTimeID");
	dateTimeDiv.innerHTML = new Date().toLocaleString();
	// CREATE TITLE-TEXTAREA
	var titleDiv = document.createElement("textarea");
	titleDiv.setAttribute("class", "commentationTitleWriteClass");
	titleDiv.setAttribute("id", "commentationTitleWriteID");
	titleDiv.setAttribute("rows", "1");
	titleDiv.setAttribute("minlength", "10");
	titleDiv.setAttribute("maxlength", "25");
	titleDiv.setAttribute("placeholder", "short title...");
	titleDiv.value = "";
	// CREATE FLOWING TEXT-TEXTAREA
	var textDiv = document.createElement("textarea");
	textDiv.setAttribute("class", "commentationTextWriteClass");
	textDiv.setAttribute("id", "commentationTextWriteID");
	textDiv.setAttribute("rows", "10");
	textDiv.setAttribute("minlength", "30");
	textDiv.setAttribute("maxlength", "400");
	textDiv.setAttribute("placeholder", "what you want to say or know...");
	textDiv.value = "";
	// CREATE COM-FUNC
	var commentsFunc = document.createElement("div");
	commentsFunc.setAttribute("class", "commentationFunctions");
	// CREATE POST
	var saveAns = document.createElement("div");
	saveAns.setAttribute("class", "commentationPost");
	saveAns.setAttribute("id", "commentationPost");
	saveAns.innerHTML = "post";
	saveAns.addEventListener("click", commentationPost, false);
	// CREATE EMPTY ANSWER
	var answerAns = document.createElement("div");
	answerAns.setAttribute("class", "commentationAnswer");
	answerAns.setAttribute("id", "commentationAnswer");
	answerAns.innerHTML = "";
	// CREATE CANCEL POST
	var delAns = document.createElement("div");
	delAns.setAttribute("class", "commentationCancelPost");
	delAns.setAttribute("id", "commentationCancelPost");
	delAns.innerHTML = "cancel";
	delAns.addEventListener("click", commentationCancelPost, false);
	// REMOVE BTN + BTN-SHIELD
	var insertDiscussDefault = document.getElementById("commentationWriteID");
	insertDiscussDefault.children[0].remove();
	insertDiscussDefault.children[0].remove();
	// INTEGRATE DIVS IN DOM
	commentsFunc.prepend(delAns);
	commentsFunc.prepend(answerAns);
	commentsFunc.prepend(saveAns);
	insertDiscussDefault.prepend(commentsFunc);
	insertDiscussDefault.prepend(textDiv);
	insertDiscussDefault.prepend(titleDiv);
	insertDiscussDefault.prepend(dateTimeDiv);
	insertDiscussDefault.prepend(userDiv);
	// CHANGE Z-INDEX
	var discussionDiv = document.getElementById("commentationAreaID")
	discussionDiv.style.zIndex = "6";
	var modelDiv = document.getElementById("threejsLayout");
	modelDiv.style.zIndex = "5";
	// SHIELD FUNC
	shieldOn();
};

// KOMMENTAR: CANCEL POST
		
function commentationCancelPost(){
	// CREATE SHIELD
	var createDiscussShield = document.createElement("div");
	createDiscussShield.setAttribute("id", "discussBtnShield");
	createDiscussShield.setAttribute("class", "shieldBtn");
	// CREATE BTN
	var createDiscussBtn = document.createElement("div");
	createDiscussBtn.setAttribute("id", "discussBtn");
	createDiscussBtn.innerHTML = "discuss dimensional design";
	createDiscussBtn.addEventListener("click", discussButton, false);
	// REMOVE DEFAULT DIVS
	var discussionDefault = document.getElementById("commentationWriteID");
	discussionDefault.children[4].remove();
	discussionDefault.children[3].remove();
	discussionDefault.children[2].remove();
	discussionDefault.children[1].remove();
	discussionDefault.children[0].remove();
	// INSERT SHIELD AND BTN
	discussionDefault.prepend(createDiscussBtn);
	discussionDefault.prepend(createDiscussShield);
	// CHANGE Z-INDEX
	var discussionDiv = document.getElementById("commentationAreaID")
	discussionDiv.style.zIndex = "0";
	var modelDiv = document.getElementById("threejsLayout");
	modelDiv.style.zIndex = "0";
	// SHIELD FUNC
	shieldOff();
};

// KOMMENTAR: POST IT

function commentationPost(){
	// GET THE COMMENTATION-DIVS
	var postTitle = document.getElementById("commentationTitleWriteID");
	var postText = document.getElementById("commentationTextWriteID");
	// CHECK FOR INPUT	
	if (postTitle.value != "" && postText.value != ""){
		// CHANGE MAIN ATTRIBUTES OF THAT CLONE
		var commentationReadDiv = document.getElementById("commentationWriteID");
		commentationReadDiv.setAttribute("class", "commentationReadClass");
		commentationReadDiv.setAttribute("id", "commentationReadID");
		// CHANGE BORDER-ATTRIBUTES OF USER AND DATE-TIME
		commentationReadDiv.children[0].setAttribute("class", "usernamePostClass");
		commentationReadDiv.children[1].setAttribute("class", "dateAndTimePostClass");
		// CHANGE TITLE
		var createTitleDiv = document.createElement("div");
		createTitleDiv.setAttribute("class", "commentationTitleReadClass");
		createTitleDiv.setAttribute("id", "commentationTitleReadID");
		createTitleDiv.innerHTML = postTitle.value;
		commentationReadDiv.children[2].remove();
		commentationReadDiv.children[1].after(createTitleDiv);
		// CHANGE TEXT
		var createTextDiv = document.createElement("div");
		createTextDiv.setAttribute("class", "commentationTextReadClass");
		createTextDiv.setAttribute("id", "commentationTextReadID");
		createTextDiv.innerHTML = postText.value;
		commentationReadDiv.children[3].remove();
		commentationReadDiv.children[2].after(createTextDiv);
		// CHANGE FUNCTIONS : POST -> EDIT
		commentationReadDiv.children[4].children[0].setAttribute("class", "commentationEdit");
		commentationReadDiv.children[4].children[0].setAttribute("id", "commentationEdit");
		commentationReadDiv.children[4].children[0].removeEventListener("click", commentationPost, false);
		commentationReadDiv.children[4].children[0].addEventListener("click", commentationEdit, false);
		commentationReadDiv.children[4].children[0].innerHTML = "edit";
		// CHANGE FUNCTIONS : NULL -> ANSWER
		commentationReadDiv.children[4].children[1].setAttribute("class", "commentationAnswer");
		commentationReadDiv.children[4].children[1].setAttribute("id", "commentationAnswer");
		commentationReadDiv.children[4].children[1].addEventListener("click", newAnswer, false);
		commentationReadDiv.children[4].children[1].innerHTML = "answer";
		// CHANGE FUNCTIONS : CANCEL/NOT-POST -> DELETE
		commentationReadDiv.children[4].children[2].setAttribute("class", "commentationDelete");
		commentationReadDiv.children[4].children[2].setAttribute("id", "commentationDelete");
		commentationReadDiv.children[4].children[2].removeEventListener("click", commentationCancelPost, false);
		commentationReadDiv.children[4].children[2].addEventListener("click", commentationDelete, false);
		commentationReadDiv.children[4].children[2].innerHTML = "delete";
		// CREATE SHIELD AND INSERT IT
		var shieldForFunc = document.createElement("div");
		shieldForFunc.setAttribute("id", "comBtnShield");
		shieldForFunc.setAttribute("class", "shieldGuard");
		commentationReadDiv.children[4].prepend(shieldForFunc);
		// CREATE QUESTION DIV AND INSERT POSTING-CONSTRUCTION
		var questDiv = document.createElement("div");
		questDiv.setAttribute("id", "questDiv");
		questDiv.prepend(commentationReadDiv);
		var insertUserCommentation = document.getElementById("commentationSpecificModelID");
		insertUserCommentation.prepend(questDiv);
		// CREATE SHIELD
		var createDiscussShield = document.createElement("div");
		createDiscussShield.setAttribute("id", "discussBtnShield");
		createDiscussShield.setAttribute("class", "shieldBtn");
		// CREATE BTN
		var createDiscussBtn = document.createElement("div");
		createDiscussBtn.setAttribute("id", "discussBtn");
		createDiscussBtn.innerHTML = "discuss dimensional design";
		createDiscussBtn.addEventListener("click", discussButton, false);
		// CREATE MASTER DIV
		var masterDiv = document.createElement("div");
		masterDiv.setAttribute("class", "commentationWriteClass");
		masterDiv.setAttribute("id", "commentationWriteID");
		// INSERT ALL THREE
		var discussionDiv = document.getElementById("commentationAreaID");
		discussionDiv.prepend(masterDiv);
		masterDiv.prepend(createDiscussBtn);
		masterDiv.prepend(createDiscussShield);
		// CHANGE Z-INDEX
		discussionDiv.style.zIndex = "0";
		var modelDiv = document.getElementById("threejsLayout");
		modelDiv.style.zIndex = "0";
		// SHIELD FUNC
		shieldOff();
	};
};

// KOMMENTAR : EDIT

function commentationEdit(){
	// SHIELD FUNC
	shieldOn();
	// CATCH TARGET AND PARENTS
	var editFunc = event.target;
	var comFunc = editFunc.parentElement;
	var readDiv = comFunc.parentElement;
	// SAVE TITLE AND TEXT
	theTitleSaveVar = readDiv.children[2].innerHTML;
	theTextSaveVar = readDiv.children[3].innerHTML;
	// CHANGE READ CLASS TO WRITE CLASS
	readDiv.setAttribute("class", "commentationWriteClass");
	readDiv.setAttribute("id", "commentationWriteID");
	// CREATE TEXTAREA FOR TITLE
	var titleWrite = document.createElement("textarea");
	titleWrite.setAttribute("rows", "1");
	titleWrite.setAttribute("minlength", "10");
	titleWrite.setAttribute("maxlength", "25");
	titleWrite.setAttribute("class", "commentationTitleWriteClass");
	titleWrite.setAttribute("id", "commentationTitleWriteID");
	// FILL WITH INPUT AND INSERT IT
	titleWrite.value = theTitleSaveVar;
	readDiv.children[2].remove();
	readDiv.children[1].after(titleWrite);
	// CREATE TEXTAREA FOR TEXT
	var textWrite = document.createElement("textarea");
	textWrite.setAttribute("rows", "10");
	textWrite.setAttribute("minlength", "30");
	textWrite.setAttribute("maxlength", "400");
	textWrite.setAttribute("class", "commentationTextWriteClass");
	textWrite.setAttribute("id", "commentationTextWriteID");
	// FILL WITH INPUT AND INSERT IT
	textWrite.value = theTextSaveVar;
	readDiv.children[3].remove();
	readDiv.children[2].after(textWrite);
	// REMOVE SHIELD
	comFunc.children[0].remove();
	// CHANGE FUNCTIONS : EDIT -> SAVE
	comFunc.children[0].setAttribute("class", "commentationSave");
	comFunc.children[0].setAttribute("id", "commentationSave");
	comFunc.children[0].removeEventListener("click", commentationEdit, false);
	comFunc.children[0].addEventListener("click", commentationSave, false);
	comFunc.children[0].innerHTML = "save";
	// CHANGE FUNCTIONS : ANSWER -> NULL
	comFunc.children[1].innerHTML = "";
	// CHANGE FUNCTIONS : DELETE -> CANCEL
	comFunc.children[2].setAttribute("class", "commentationCancel");
	comFunc.children[2].setAttribute("id", "commentationCancel");
	comFunc.children[2].removeEventListener("click", commentationDelete, false);
	comFunc.children[2].addEventListener("click", commentationCancel, false);
	comFunc.children[2].innerHTML = "cancel";
	// SET Z-INDEX
	var discussionDiv = document.getElementById("commentationAreaID");
	discussionDiv.style.zIndex = "6";
	var modelDiv = document.getElementById("threejsLayout");
	modelDiv.style.zIndex = "5";
	shieldOn();
};

// KOMMENTAR + ANSWER : DELETE 

function commentationDelete() {
	// Alert vorschalten!
	var deleteTag = event.target;
	var comFunc = deleteTag.parentElement;
	var comDiv = comFunc.parentElement;
	var questDiv = comDiv.parentElement;
	// Checke, ob der ganze Kommentar-Quest-Div gelöscht werden muss 
	if (questDiv.firstElementChild == comDiv){
		questDiv.remove();
	};
	// Wenn nicht, lösche aktuellen Kindknoten und füge Answer im letzten Kindknoten ein. 
	if (comDiv != questDiv.firstElementChild){
		comDiv.remove();
		questDiv.lastElementChild.lastElementChild.children[2].innerHTML = "answer";
	};
	// SET SHIELD Z-INDEX
	var discussionDiv = document.getElementById("commentationAreaID");
	discussionDiv.style.zIndex = "0";
	var modelDiv = document.getElementById("threejsLayout");
	modelDiv.style.zIndex = "0";
	// SHIELD FUNC
	shieldOff(); 
};

// KOMMENTAR: CANCEL

function commentationCancel(){
	// CATCH TARGET AND PARENTS
	var cancelTag = event.target;
	var comFunc = cancelTag.parentElement;
	var readDiv = comFunc.parentElement;
	var questDiv = readDiv.parentElement;
	// CHANGE WRITE CLASS TO READ CLASS
	readDiv.setAttribute("class", "commentationReadClass");
	readDiv.setAttribute("id", "commentationReadID");
	// CREATE DIV FOR TITLE
	var titleWrite = document.createElement("div");
	titleWrite.setAttribute("class", "commentationTitleReadClass");
	titleWrite.setAttribute("id", "commentationTitleReadID");
	// FILL WITH INPUT AND INSERT IT
	titleWrite.innerHTML = theTitleSaveVar;
	readDiv.children[2].remove();
	readDiv.children[1].after(titleWrite);
	// CREATE DIV FOR TEXT
	var textWrite = document.createElement("div");
	textWrite.setAttribute("class", "commentationTextReadClass");
	textWrite.setAttribute("id", "commentationTextReadID");
	// FILL WITH INPUT AND INSERT IT
	textWrite.innerHTML = theTextSaveVar;
	readDiv.children[3].remove();
	readDiv.children[2].after(textWrite);
	// CREATE SHIELD
	var shieldForFunc = document.createElement("div");
	shieldForFunc.setAttribute("id", "comBtnShield");
	shieldForFunc.setAttribute("class", "shieldGuard");
	comFunc.prepend(shieldForFunc);
	// CHANGE FUNCTIONS : SAVE -> EDIT
	comFunc.children[1].setAttribute("class", "commentationEdit");
	comFunc.children[1].setAttribute("id", "commentationEdit");
	comFunc.children[1].removeEventListener("click", commentationSave, false);
	comFunc.children[1].addEventListener("click", commentationEdit, false);
	comFunc.children[1].innerHTML = "edit";
	// CHANGE FUNCTIONS : CANCEL -> DELETE
	comFunc.children[3].setAttribute("class", "commentationDelete");
	comFunc.children[3].setAttribute("id", "commentationDelete");
	comFunc.children[3].removeEventListener("click", commentationCancel, false);
	comFunc.children[3].addEventListener("click", commentationDelete, false);
	comFunc.children[3].innerHTML = "delete";
	// CHECK FOR DISPLAYING ANSWER-BTN
	if(questDiv.lastElementChild == readDiv) {
		comFunc.children[2].innerHTML = "answer";
	};
	// SET Z-INDEX
	var discussionDiv = document.getElementById("commentationAreaID");
	discussionDiv.style.zIndex = "0";
	var modelDiv = document.getElementById("threejsLayout");
	modelDiv.style.zIndex = "0";
	// SHIELD FUNC
	shieldOff();
};

// KOMMENTAR: SAVE

function commentationSave(){
	// CATCH TARGET AND PARENTS
	var saveTag = event.target;
	var comFunc = saveTag.parentElement;
	var readDiv = comFunc.parentElement;
	var questDiv = readDiv.parentElement;
	// Check for valid Inputs
	var titleExist = readDiv.children[2].value;
	var textExist = readDiv.children[3].value;
	if (titleExist != "" && textExist != ""){
		// SAVE TITLE AND TEXT
		var saveTitle = readDiv.children[2].value;
		var saveText = readDiv.children[3].value;
		// CHANGE WRITE CLASS TO READ CLASS
		readDiv.setAttribute("class", "commentationReadClass");
		readDiv.setAttribute("id", "commentationReadID");
		// CREATE DIV FOR TITLE
		var titleWrite = document.createElement("div");
		titleWrite.setAttribute("class", "commentationTitleReadClass");
		titleWrite.setAttribute("id", "commentationTitleReadID");
		// FILL WITH INPUT AND INSERT IT
		titleWrite.innerHTML = saveTitle;
		readDiv.children[2].remove();
		readDiv.children[1].after(titleWrite);
		// CREATE DIV FOR TEXT
		var textWrite = document.createElement("div");
		textWrite.setAttribute("class", "commentationTextReadClass");
		textWrite.setAttribute("id", "commentationTextReadID");
		// FILL WITH INPUT AND INSERT IT
		textWrite.innerHTML = saveText;
		readDiv.children[3].remove();
		readDiv.children[2].after(textWrite);
		// CREATE SHIELD
		var shieldForFunc = document.createElement("div");
		shieldForFunc.setAttribute("id", "comBtnShield");
		shieldForFunc.setAttribute("class", "shieldGuard");
		comFunc.prepend(shieldForFunc);
		// CHANGE FUNCTIONS : SAVE -> EDIT
		comFunc.children[1].setAttribute("class", "commentationEdit");
		comFunc.children[1].setAttribute("id", "commentationEdit");
		comFunc.children[1].removeEventListener("click", commentationSave, false);
		comFunc.children[1].addEventListener("click", commentationEdit, false);
		comFunc.children[1].innerHTML = "edit";
		// CHANGE FUNCTIONS : CANCEL -> DELETE
		comFunc.children[3].setAttribute("class", "commentationDelete");
		comFunc.children[3].setAttribute("id", "commentationDelete");
		comFunc.children[3].removeEventListener("click", commentationCancel, false);
		comFunc.children[3].addEventListener("click", commentationDelete, false);
		comFunc.children[3].innerHTML = "delete";
		// CHECK FOR DISPLAYING ANSWER-BTN
		if(questDiv.lastElementChild == readDiv) {
			comFunc.children[2].innerHTML = "answer";
		};
		// SET Z-INDEX
		var discussionDiv = document.getElementById("commentationAreaID");
		discussionDiv.style.zIndex = "0";
		var modelDiv = document.getElementById("threejsLayout");
		modelDiv.style.zIndex = "0";
		// SHIELD FUNC
		shieldOff();
}};

// ANSWER : NEW ANSWER

function newAnswer() {
	// CATCH TARGET AND PARENTS
	var answerFunc = event.target;
	var comFunc = answerFunc.parentElement;
	comFunc.children[2].innerHTML = "";
	var readDiv = comFunc.parentElement;
	// CREATE MAIN-DIV
	var answerMode = document.createElement("div");
	answerMode.setAttribute("class", "commentationWriteClass");
	answerMode.setAttribute("id", "commentationWriteID");
	// CREATE USERNAME
	var userDiv = document.createElement("div");
	userDiv.setAttribute("class", "usernameAnswerClass");
	userDiv.setAttribute("id", "commentationUsernameID");
	userDiv.innerHTML = "username";
	// CREATE DATE-TIME
	var dateTimeDiv = document.createElement("div");
	dateTimeDiv.setAttribute("class", "dateAndTimeAnswerClass");
	dateTimeDiv.setAttribute("id", "commentationDateAndTimeID");
	dateTimeDiv.innerHTML = new Date().toLocaleString();
	// CREATE TEXT-DIV
	var userTextDiv = document.createElement("textarea");
	userTextDiv.setAttribute("class", "commentationTextWriteClass");
	userTextDiv.setAttribute("id", "commentationTextWriteID");
	userTextDiv.value = "";
	// CREATE COM-FUNC-DIV
	var commentsFunc = document.createElement("div");
	commentsFunc.setAttribute("class", "commentationFunctions");
	// CREATE SAVE
	var saveAns = document.createElement("div");
	saveAns.setAttribute("class", "commentationSave");
	saveAns.setAttribute("id", "commentationSave");
	saveAns.innerHTML = "save";
	saveAns.addEventListener("click", postAnswer, false);
	// CREATE EMPTY-ANSWER
	var answerAns = document.createElement("div");
	answerAns.setAttribute("class", "commentationAnswer");
	answerAns.setAttribute("id", "commentationAnswer");
	answerAns.innerHTML = "";
	answerAns.addEventListener("click", newAnswer, false);
	// CREATE DELETE
	var delAns = document.createElement("div");
	delAns.setAttribute("class", "commentationDelete");
	delAns.setAttribute("id", "commentationDelete");
	delAns.innerHTML = "delete";
	delAns.addEventListener("click", commentationDelete, false);
	// INTEGRATE DIVS IN DOM
	readDiv.after(answerMode);
	answerMode.prepend(commentsFunc);
	commentsFunc.prepend(delAns);
	commentsFunc.prepend(answerAns);
	commentsFunc.prepend(saveAns);
	answerMode.prepend(userTextDiv);
	answerMode.prepend(dateTimeDiv);
	answerMode.prepend(userDiv);
	// SET Z-INDEX
	var discussionDiv = document.getElementById("commentationAreaID");
	discussionDiv.style.zIndex = "6";
	var modelDiv = document.getElementById("threejsLayout");
	modelDiv.style.zIndex = "5";
	// SHIELD FUNC
	shieldOn();
};

// ANSWER : POST ANSWER

function postAnswer(){
	// CATCH TARGET AND PARENTS
	var saveFunc = event.target;
	var comFunc = saveFunc.parentElement;
	var readDiv = comFunc.parentElement;
	var readDivParent = readDiv.parentElement;
	// CHECK IF TEXTAREA IS FILLED
	if (readDiv.children[2].value != ""){
		// CHANGE CLASSES
		readDiv.setAttribute("class", "commentationReadClass");
		readDiv.setAttribute("id", "commentationReadID");
		// CREATE DIV FOR TEXTAREA
		var answerTextDiv = document.createElement("div");
		answerTextDiv.setAttribute("class", "commentationTextReadClass");
		answerTextDiv.setAttribute("id", "commentationTextReadID");
		// GRAP TEXTAREA-INPUT AND HAND OVER TO THE DIV
		var answerContent = readDiv.children[2].value;
		answerTextDiv.innerHTML = answerContent;
		// REMOVE TEXTAREA FROM AND INSERT DIV INTO DOM
		readDiv.children[2].remove();
		readDiv.children[1].after(answerTextDiv);
		// CREATE SHIELD
		var shieldForFunc = document.createElement("div");
		shieldForFunc.setAttribute("id", "comBtnShield");
		shieldForFunc.setAttribute("class", "shieldGuard");
		comFunc.prepend(shieldForFunc);
		// CHANGE EVENT-LISTENERS
		comFunc.children[1].removeEventListener("click", postAnswer, false);
		comFunc.children[1].addEventListener("click", editAnswer, false);
		comFunc.children[1].innerHTML = "edit";
		// CHECK FOR DISPLAYING ANSWER-BTN
		if(readDivParent.lastElementChild == readDiv) {
			comFunc.children[2].innerHTML = "answer";
		};
		// SET Z-INDEX
		var discussionDiv = document.getElementById("commentationAreaID");
		discussionDiv.style.zIndex = "0";
		var modelDiv = document.getElementById("threejsLayout");
		modelDiv.style.zIndex = "0";
		// SHIELD FUNC
		shieldOff();
	};	
};

// EDIT-ANSWER
function editAnswer(){
	// CATCH TARGET AND PARENTS
	var editFunc = event.target;
	var comFunc = editFunc.parentElement;
	var readDiv = comFunc.parentElement;
	// REMOVE SHIELD
	comFunc.children[0].remove();
	// HIDE ANSWER-BTN
	comFunc.children[1].innerHTML = "";
	// CATCH TEXT
	answerText = readDiv.children[2].innerHTML
	// CREATE TEXTAREA WITH TEXT-INPUT
	var answerTextArea = document.createElement("textarea");
	answerTextArea.setAttribute("class", "commentationTextWriteClass");
	answerTextArea.setAttribute("id", "commentationTextWriteID");
	answerTextArea.value = answerText;
	// REPLACE DIV WITH TEXTAREA
	readDiv.children[2].remove();
	readDiv.children[1].after(answerTextArea);
	// CHANGE LISTENER EDIT -> SAVE
	comFunc.children[0].removeEventListener("click", editAnswer, false);
	comFunc.children[0].addEventListener("click", saveAnswer, false);
	comFunc.children[0].innerHTML = "save";
	// CHANGE LISTENER DELETE -> CANCEL
	comFunc.children[2].removeEventListener("click", commentationDelete, false);
	comFunc.children[2].addEventListener("click", cancelAnswer, false);
	comFunc.children[2].innerHTML = "cancel";
	// SET Z-INDEX
	var discussionDiv = document.getElementById("commentationAreaID");
	discussionDiv.style.zIndex = "6";
	var modelDiv = document.getElementById("threejsLayout");
	modelDiv.style.zIndex = "5";
	// SHIELD FUNC
	shieldOn();
};

// ANSWER : SAVE

	function saveAnswer(){
		// CATCH TARGET AND PARENTS
		var saveFunc = event.target;
		var comFunc = saveFunc.parentElement;
		var readDiv = comFunc.parentElement;
		var readDivParent = readDiv.parentElement;
		// CHECK IF TEXTAREA IS FILLED
		if (readDiv.children[2].value != ""){
			// CHANGE ATTRIBUTES
			readDiv.setAttribute("class", "commentationReadClass");
			readDiv.setAttribute("id", "commentationReadID");
			// CREATE DIV FOR TEXTAREA
			var answerTextDiv = document.createElement("div");
			answerTextDiv.setAttribute("class", "commentationTextReadClass");
			answerTextDiv.setAttribute("id", "commentationTextReadID");
			// GRAP TEXTAREA-INPUT AND HAND OVER TO THE DIV
			var answerContent = readDiv.children[2].value;
			answerTextDiv.innerHTML = answerContent;
			// REMOVE TEXTAREA FROM AND INSERT DIV INTO DOM
			readDiv.children[2].remove();
			readDiv.children[1].after(answerTextDiv);
			// CREATE SHIELD
			var shieldForFunc = document.createElement("div");
			shieldForFunc.setAttribute("id", "comBtnShield");
			shieldForFunc.setAttribute("class", "shieldGuard");
			comFunc.prepend(shieldForFunc);
			// CHANGE EVENT-LISTENERS
			comFunc.children[1].removeEventListener("click", saveAnswer, false);
			comFunc.children[1].addEventListener("click", editAnswer, false);
			comFunc.children[1].innerHTML = "edit";
			comFunc.children[3].removeEventListener("click", cancelAnswer, false);
			comFunc.children[3].addEventListener("click", commentationDelete, false);
			comFunc.children[3].innerHTML = "delete";
			// CHECK FOR DISPLAYING ANSWER-BTN
			if(readDivParent.lastElementChild == readDiv) {
				comFunc.children[1].innerHTML = "answer";
			};
			// SET Z-INDEX
			var discussionDiv = document.getElementById("commentationAreaID");
			discussionDiv.style.zIndex = "0";
			var modelDiv = document.getElementById("threejsLayout");
			modelDiv.style.zIndex = "0";
			// SHIELD FUNC
			shieldOff();
		};				
	};

// CANCEL-ANSWER
function cancelAnswer(){
	// CATCH TARGET AND PARENTS
	var cancelFunc = event.target;
	var comFunc = cancelFunc.parentElement;
	var readDiv = comFunc.parentElement;
	var readDivParent = readDiv.parentElement;
	// CREATE DIV FOR TEXTAREA AND FILL WITH SAVED INPUT
	var answerTextDiv = document.createElement("div");
	answerTextDiv.setAttribute("class", "commentationTextReadClass");
	answerTextDiv.setAttribute("id", "commentationTextReadID");
	answerTextDiv.innerHTML = answerText;
	// REMOVE TEXTAREA FROM AND INSERT DIV INTO DOM
	readDiv.children[2].remove();
	readDiv.children[1].after(answerTextDiv);
	// CREATE SHIELD
	var shieldForFunc = document.createElement("div");
	shieldForFunc.setAttribute("id", "comBtnShield");
	shieldForFunc.setAttribute("class", "shieldGuard");
	comFunc.prepend(shieldForFunc);
	// CHANGE EVENT-LISTENERS
	comFunc.children[1].removeEventListener("click", saveAnswer, false);
	comFunc.children[1].addEventListener("click", editAnswer, false);
	comFunc.children[1].innerHTML = "edit";
	comFunc.children[3].removeEventListener("click", cancelAnswer, false);
	comFunc.children[3].addEventListener("click", commentationDelete, false);
	comFunc.children[3].innerHTML = "delete";
	// CHECK FOR DISPLAYING ANSWER-BTN
	if(readDivParent.lastElementChild == readDiv) {
		comFunc.children[1].innerHTML = "answer";
	};
	// SET Z-INDEX
	var discussionDiv = document.getElementById("commentationAreaID");
	discussionDiv.style.zIndex = "0";
	var modelDiv = document.getElementById("threejsLayout");
	modelDiv.style.zIndex = "0";
	// SHIELD FUNC
	shieldOff();			
};

// SHOW/HIDE CONSTRUCTION-INFO

document.getElementById("infoClick").addEventListener('click', infoView, false );

function infoView () {
	var meshInfoDiv = document.getElementById('meshinfo');
	if (meshInfoDiv.style.visibility == 'visible') {
		meshInfoDiv.style.visibility = 'hidden';
	} else {
		meshInfoDiv.style.visibility = 'visible';
	};
};

// SHOW/HIDE DISCUSSION

document.getElementById("commentsClick").addEventListener('click', commentsView, false );

function commentsView () {
	var commentationDiv = document.getElementById('commentationAreaID');
	if (commentationDiv.style.visibility == 'visible') {
		commentationDiv.style.visibility = 'hidden';
	} else {
		commentationDiv.style.visibility = 'visible';
	};
};

// SHOW LOGIN OR LOGOUT
		
function loginView () {
    var accountVisibility = document.getElementById("accountFunc");
    // WENN ACCOUNT-ICONS HIDDEN DANN ZEIGE LOGIN-TEMPLATE
    if (accountVisibility.style.visibility == "hidden") {
		// LEERE VAR GUESTNAME
        guestName = "";
		// SCHALTE TEMPLATE AUF SICHTBAR
        var loginDiv = document.getElementById("loginModalMasterClass");
		loginDiv.style.visibility = "visible";
		// LEERE NAME, PW AND MAIL
        var loginCreateUsername = document.getElementById("loginTextareaUsername");
		var loginCreatePassword = document.getElementById("loginTextareaPassword");
		var loginCreateMail = document.getElementById("loginTextareaMail");
		loginCreateUsername.value = "";
		loginCreatePassword.value = "";
		loginCreateMail.value = "";
    // WENN ACCOUNT-ICONS VISIBLE DANN LOGOUT
    // SCHALTE "LINKS" AUF UNSICHTBAR UND TELEPORTATION TO PUBLIC AREA
	} else { 
		// HIDE "LEFT" + "RIGHT" + ACCOUNT-FUNC
		var naviLeft = document.getElementById("left");
		naviLeft.style.visibility = "hidden";
		var naviRight = document.getElementById("right");
		naviRight.style.visibility = "hidden";
        accountVisibility.style.visibility = "hidden";
		// LOGOUT FROM ACCOUNT AREA
		if (guestDataCount >= 1) {
			if (modelNumber < authorArray.length - 1) {
				upID.style.visibility = "visible";
			} else {
				upID.style.visibility = "hidden";
			};
			if (modelNumber > 0) {
				downID.style.visibility = "visible";
			} else {
				downID.style.visibility = "hidden";
			};
			var commentationForSpecificModel = document.getElementById("commentationSpecificModelID");
			if (commentationForSpecificModel.hasChildNodes()){
				commentationArray[guestDataView] = commentationForSpecificModel;
			};
			// KOMMENTAR WEGLÖSCHEN ETC.
			commentationForSpecificModel.remove();
			// MAGIC
			catchModel();
			// CLEAR VARS
			guestData = [];
			guestDataCount = 0;
		} else {
			guestData = [];
			guestDataCount = 0;
		};
	};
};

// LOGIN-MODAL : LOGIN

document.getElementById("loginBtn").addEventListener('click', loginFunction, false);

function loginFunction () {
	var loginUsername = document.getElementById("loginTextareaUsername").value;
	var loginPassword = document.getElementById("loginTextareaPassword").value;
	var arrayPosition = authorArray.indexOf(loginUsername);
	var passwordValue = passwordArray[arrayPosition];
    // FÜHRE AUTHENTIFIZIERUNG DURCH : ERFOLGREICH
	if (loginUsername != "empty" && authorArray.indexOf(loginUsername) != -1 && passwordValue == loginPassword) {
		guestName = loginUsername;
		// FALLS MÖGLICH, FÜLLE ARRAY 
		for (var i = 0; i < authorArray.length; i++) {
        	if (authorArray[i] == guestName) {
				guestData.push(i);
			};
		};	
		var naviLeft = document.getElementById("left");
		naviLeft.style.visibility = "visible";
		var loginDiv = document.getElementById("loginModalMasterClass");
		loginDiv.style.visibility = "hidden";
        var accountVisibility = document.getElementById("accountFunc");
        accountVisibility.style.visibility = "visible";	
	} else { 
		window.alert("login with valid name and password.")
	};
};

// LOGIN-MODAL: CANCEL

document.getElementById("loginCancelBtn").addEventListener('click', loginCancelFunction, false);

function loginCancelFunction(){
	var loginDiv = document.getElementById("loginModalMasterClass");
	loginDiv.style.visibility = "hidden";
};

// LOGIN-MODAL: CREATE

document.getElementById("loginCreatBtn").addEventListener('click', loginCreateFunction, false);

function loginCreateFunction(){			
	var loginCreateUsername = document.getElementById("loginTextareaUsername").value;
	var loginCreatePassword = document.getElementById("loginTextareaPassword").value;
	var loginCreateMail = document.getElementById("loginTextareaMail").value;
	var arrayPosition = authorArray.indexOf(loginCreateUsername);	
	if (loginCreateUsername != "" && loginCreatePassword != "" && loginCreateMail != "" && authorArray.indexOf(loginCreateUsername) == -1) {
		window.alert("check your mails.");
		var loginCreateDiv = document.getElementById("loginModalMasterClass");
		loginCreateDiv.style.visibility = "hidden";
	} else { 
        window.alert("name and mail has to be unique.");
    };
};

// LOGIN-MODAL: LOST

document.getElementById("loginLostBtn").addEventListener('click', loginLostFunction, false);

function loginLostFunction () {
	var loginLostMail = document.getElementById("loginTextareaMail").value;
	if (loginLostMail != "") {
		window.alert("check your mails.");
		var loginCreateDiv = document.getElementById("loginModalMasterClass");
		loginCreateDiv.style.visibility = "hidden";
	} else { 
		window.alert("use a valid mail.")
	};
};

// ACCOUNT-MODAL : EDIT

document.getElementById("accountEditSaveID").addEventListener('click', accountEditFunction, false);

function accountEditFunction () {
		// HIDE ARROW RIGHT
		var riseModalToHideArrowRight = document.getElementById("modalAccountBasicID");
		riseModalToHideArrowRight.style.zIndex = "4";
		var accountEditBtn = event.target;
		var accountEditBtnParent = accountEditBtn.parentElement;
		var accountFrame = accountEditBtnParent.parentElement;
		var accountUser = accountFrame.children[0].innerHTML;
		var accountPass = accountFrame.children[1].innerHTML;
		var accountMail = accountFrame.children[2].innerHTML;
		// CHANGE USER-DIV
		var accountUserTextarea = document.createElement("textarea");
			accountUserTextarea.setAttribute("rows", "1");
			accountUserTextarea.setAttribute("class", "accountUserPassMailClassWrite");
			accountUserTextarea.setAttribute("id", "accountUsernameIDWrite");
			accountUserTextarea.innerHTML = accountUser;
			var accountUserReadDiv = document.getElementById("accountUsernameIDRead");
			accountFrame.replaceChild(accountUserTextarea, accountUserReadDiv);
		// CHANGE PASSWORD-DIV
		var accountPassTextarea = document.createElement("textarea");
			accountPassTextarea.setAttribute("rows", "1");
			accountPassTextarea.setAttribute("class", "accountUserPassMailClassWrite");
			accountPassTextarea.setAttribute("id", "accountPasswordIDWrite");
			accountPassTextarea.innerHTML = accountPass;
			var accountPassReadDiv = document.getElementById("accountPasswordIDRead");
			accountFrame.replaceChild(accountPassTextarea, accountPassReadDiv);
		// CHANGE MAIL-DIV
		var accountMailTextarea = document.createElement("textarea");
			accountMailTextarea.setAttribute("rows", "1");
			accountMailTextarea.setAttribute("class", "accountUserPassMailClassWrite");
			accountMailTextarea.setAttribute("id", "accountMailIDWrite");
			accountMailTextarea.innerHTML = accountMail;
			var accountMailReadDiv = document.getElementById("accountMailIDRead");
			accountFrame.replaceChild(accountMailTextarea, accountMailReadDiv);
		// CHANGE EVENT-LISTERNERS AND BUTTONS
			accountEditBtnParent.children[0].removeEventListener("click", accountEditFunction, false);
			//accountEditBtnParent.children[1].removeEventListener("click", accountDeleteFunction, false);
			accountEditBtnParent.children[0].innerHTML = "save";
			accountEditBtnParent.children[1].innerHTML = "cancel";
			accountEditBtnParent.children[0].addEventListener("click", accountSaveFunction, false);
			accountEditBtnParent.children[1].addEventListener("click", accountCancelFunction, false);
		};

// ACCOUNT-MODAL : DELETE

// ACCOUNT-MODAL : SAVE

function accountSaveFunction() {

	// SHOW ARROW RIGHT
	var riseModalToHideArrowRight = document.getElementById("modalAccountBasicID");
	riseModalToHideArrowRight.style.zIndex = "2";

	var accountSaveBtn = event.target;
	var accountSaveBtnParent = accountSaveBtn.parentElement;
		var accountFrameSave = accountSaveBtnParent.parentElement;
		var	accountUserChange = accountFrameSave.children[0].value;
		var	accountPassChange = accountFrameSave.children[1].value;
		var	accountMailChange = accountFrameSave.children[2].value;

	for (var i = 0; i < authorArray.length; i++) {
        if (authorArray[i] == guestName) {
			authorArray[i] = accountUserChange;
			passwordArray[i] = accountPassChange;
			mailArray[i] = accountMailChange;
		};
	};

	guestName = accountUserChange;

	// CHANGE USER-DIV
		var accountUserRead = document.createElement("div");
			accountUserRead.setAttribute("class", "accountUserPassMailClassRead");
			accountUserRead.setAttribute("id", "accountUsernameIDRead");
			accountUserRead.innerHTML = accountUserChange;
			var accountUsernameIDWrite = document.getElementById("accountUsernameIDWrite");
			accountFrameSave.replaceChild(accountUserRead, accountUsernameIDWrite);
		// CHANGE PASSWORD-DIV
		var accountPassRead = document.createElement("div");
			accountPassRead.setAttribute("class", "accountUserPassMailClassRead");
			accountPassRead.setAttribute("id", "accountPasswordIDRead");
			accountPassRead.innerHTML = accountPassChange;
			var accountPassIDWrite = document.getElementById("accountPasswordIDWrite");
			accountFrameSave.replaceChild(accountPassRead, accountPassIDWrite);
		// CHANGE MAIL-DIV
		var accountMailRead = document.createElement("div");
			accountMailRead.setAttribute("class", "accountUserPassMailClassRead");
			accountMailRead.setAttribute("id", "accountMailIDRead");
			accountMailRead.innerHTML = accountMailChange;
			var accountMailIDWrite = document.getElementById("accountMailIDWrite");
			accountFrameSave.replaceChild(accountMailRead, accountMailIDWrite);
		// CHANGE EVENT-LISTERNERS AND BUTTONS
			accountSaveBtnParent.children[0].removeEventListener("click", accountSaveFunction, false);
			accountSaveBtnParent.children[1].removeEventListener("click", accountCancelFunction, false);
			accountSaveBtnParent.children[0].innerHTML = "edit";
			accountSaveBtnParent.children[1].innerHTML = "delete";
			accountSaveBtnParent.children[0].addEventListener("click", accountEditFunction, false);
			//accountEditBtnParent.children[1].addEventListener("click", accountDeleteFunction, false);

};
// ACCOUNT-MODAL : CANCEL

function accountCancelFunction () {

	// SHOW ARROW RIGHT
	var riseModalToHideArrowRight = document.getElementById("modalAccountBasicID");
	riseModalToHideArrowRight.style.zIndex = "2";

	var accountCancelBtn = event.target;
		var accountCancelBtnParent = accountCancelBtn.parentElement;
		var accountFrame = accountCancelBtnParent.parentElement;
		var accountUser = accountFrame.children[0].innerHTML;
		var accountPass = accountFrame.children[1].innerHTML;
		var accountMail = accountFrame.children[2].innerHTML;
		// CHANGE USER-DIV
		var accountUserRead = document.createElement("div");
			accountUserRead.setAttribute("class", "accountUserPassMailClassRead");
			accountUserRead.setAttribute("id", "accountUsernameIDRead");
			accountUserRead.innerHTML = accountUser;
			var accountUsernameIDWrite = document.getElementById("accountUsernameIDWrite");
			accountFrame.replaceChild(accountUserRead, accountUsernameIDWrite);
		// CHANGE PASSWORD-DIV
		var accountPassRead = document.createElement("div");
			accountPassRead.setAttribute("class", "accountUserPassMailClassRead");
			accountPassRead.setAttribute("id", "accountPasswordIDRead");
			accountPassRead.innerHTML = accountPass;
			var accountPassIDWrite = document.getElementById("accountPasswordIDWrite");
			accountFrame.replaceChild(accountPassRead, accountPassIDWrite);
		// CHANGE MAIL-DIV
		var accountMailRead = document.createElement("div");
			accountMailRead.setAttribute("class", "accountUserPassMailClassRead");
			accountMailRead.setAttribute("id", "accountMailIDRead");
			accountMailRead.innerHTML = accountMail;
			var accountMailIDWrite = document.getElementById("accountMailIDWrite");
			accountFrame.replaceChild(accountMailRead, accountMailIDWrite);
		// CHANGE EVENT-LISTERNERS AND BUTTONS
			accountCancelBtnParent.children[0].removeEventListener("click", accountSaveFunction, false);
			accountCancelBtnParent.children[1].removeEventListener("click", accountCancelFunction, false);
			accountCancelBtnParent.children[0].innerHTML = "edit";
			accountCancelBtnParent.children[1].innerHTML = "delete";
			accountCancelBtnParent.children[0].addEventListener("click", accountEditFunction, false);
			//accountCancelBtnParent.children[1].addEventListener("click", accountDeleteFunction, false);
}

// NAVI-ARROWS LISTENERS

		downID.addEventListener('click', saveAndRemoveUserCommentation, false);
		upID.addEventListener('click', saveAndRemoveUserCommentation, false);
		leftID.addEventListener('click', saveAndRemoveUserCommentation, false);
		rightID.addEventListener('click', saveAndRemoveUserCommentation, false);
		loginClick.addEventListener('click', loginView, false);

// SHIELD MANAGEMENT

function shieldOn () {
	var elemOne = document.querySelectorAll("div.shieldGuard");
    var index = 0, length = elemOne.length;
    for ( ; index < length; index++) {
        elemOne[index].style.visibility = "visible";
	};
	var elemTwo = document.querySelectorAll("div.shieldBtn");
    var index = 0, length = elemTwo.length;
    for ( ; index < length; index++) {
        elemTwo[index].style.visibility = "visible";
	};
};

function shieldOff () {
	var elemOne = document.querySelectorAll("div.shieldGuard");
    var index = 0, length = elemOne.length;
    for ( ; index < length; index++) {
        elemOne[index].style.visibility = "hidden";
	};
	var elemTwo = document.querySelectorAll("div.shieldBtn");
    var index = 0, length = elemTwo.length;
    for ( ; index < length; index++) {
        elemTwo[index].style.visibility = "hidden";
	};
};

// ASSET INFO MANAGEMENT

function privAssetInfoTitleEdit(){
    // SAVE
    var evDiv = event.target;
    evDiv.removeEventListener("click", privAssetInfoTitleEdit, false);
    evDiv.innerHTML = "&nbsp;save&nbsp;"
    evDiv.addEventListener("click", privAssetInfoTitleSave, false);
    var meshDiv = document.getElementById("meshinfo");
    // REMOVE
    meshDiv.children[10].remove();
    // INPUT
    var inputDiv = document.createElement("input");
    inputDiv.value = titleArray[guestDataView];
    // APPEND
    meshDiv.children[9].after(inputDiv);
    // REMOVE DROPDOWN & EVENT
    var reDrop = meshDiv.children[15];
    reDrop.remove();
    var reHelp = meshDiv.children[15];
    reHelp.remove();
    // CREATE DIV FOR LIS
    var lisDiv = document.createElement("div");
    lisDiv.setAttribute("class", "hoch")
    lisDiv.innerHTML = licenseArray[guestDataView];
    // APPEND
    meshDiv.children[14].after(lisDiv);
};

function privAssetInfoTitleSave() {
    var meshDiv = document.getElementById("meshinfo");
    // CHECK
    if (meshDiv.children[10].value != "") {
    var evDiv = event.target;
    // CHANGE EVENT
    evDiv.removeEventListener("click", privAssetInfoTitleSave, false);
    evDiv.innerHTML = "&nbsp;edit&nbsp;"
    evDiv.addEventListener("click", privAssetInfoTitleEdit, false);
    // SAVE TITLE
    titleArray[guestDataView] = meshDiv.children[10].value;
    // REMOVE INPUT
    meshDiv.children[10].remove();
    // CREATE DIV
    var titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "hoch");
    // APPEND NEW TITLE
    titleDiv.innerHTML = titleArray[guestDataView];
    // APPEND DIV
    meshDiv.children[9].after(titleDiv);
    // REMOVE LIS-DIV
    meshDiv.children[15].remove();
    // CREATE DROPDOWN
    var lisForm = document.createElement("form");
    lisForm.setAttribute("name", "lizenzForm");
    lisForm.setAttribute("class", "hoch");
    lisForm.addEventListener("change", lisDrop, false);
    var lisSelect = document.createElement("select");
    lisSelect.setAttribute("name", "lizenzWahl");
    lisForm.prepend(lisSelect);
    var lisOp1 = document.createElement("option");
    lisOp1.innerHTML = "CC BY";
    var lisOp2 = document.createElement("option");
    lisOp2.innerHTML = "CC BY-SA";
    var lisOp3 = document.createElement("option");
    lisOp3.innerHTML = "CC BY-ND";
    var lisOp4 = document.createElement("option");
    lisOp4.innerHTML = "CC BY-NC";
    var lisOp5 = document.createElement("option");
    lisOp5.innerHTML = "CC BY-NC-SA";
    var lisOp6 = document.createElement("option");
    lisOp6.innerHTML = "CC BY-NC-ND";
    var lisOp7 = document.createElement("option");
    lisOp7.innerHTML = "All Rights Reserved";
    lisSelect.prepend(lisOp7);
    lisSelect.prepend(lisOp6);
    lisSelect.prepend(lisOp5);
    lisSelect.prepend(lisOp4);
    lisSelect.prepend(lisOp3);
    lisSelect.prepend(lisOp2);
    lisSelect.prepend(lisOp1);
    meshDiv.children[14].after(lisForm);
    document.lizenzForm.lizenzWahl.value = licenseArray[guestDataView];
    // CREATE HELP
    var lisHelp = document.createElement("div");
    lisHelp.setAttribute("class", "meshinfoFunc");
    lisHelp.innerHTML = "&nbsp;help&nbsp;";
    lisHelp.addEventListener("click", helpModal, false);
    meshDiv.children[15].after(lisHelp);
}};

function lisDrop () {
    licenseArray[guestDataView] = document.lizenzForm.lizenzWahl.value;
};

function helpModal () {
    var lisHelpShow = document.getElementById("lisConOne");
    lisHelpShow.style.visibility = "visible";
    lisHelpShow.scrollTop = 0;
};

function closeLisHelper () {
    var lisHelpHide = document.getElementById("lisConOne");
    lisHelpHide.style.visibility = "hidden";
};

// UPLOAD

function uploadFunc() {
	// Kommentar-Management
	var commentationForSpecificModel = document.getElementById("commentationSpecificModelID");
	// Save Comment from Priv-Area
	if (guestDataCount >= 1) {
		if (commentationForSpecificModel.hasChildNodes()){
			commentationArray[guestDataView] = commentationForSpecificModel;
		};
	// Save Comment from Public-Area
	} else {
		if (commentationForSpecificModel.hasChildNodes()){
			commentationArray[modelNumber] = commentationForSpecificModel;
		};
	};
	// KILL Comment-Area from DOM
	commentationForSpecificModel.remove();
	// Array 1
	authorArray.push(guestName);
	// Array 2 
	for (var i = 0; i < authorArray.length; i++) {
        if (authorArray[i] == guestName) {
			passwordArray.push(passwordArray[i]);
	}};
	// Array 3
	for (var i = 0; i < authorArray.length; i++) {
        if (authorArray[i] == guestName) {
			mailArray.push(mailArray[i]);
	}};
	// Array 4
	var defaultValue = guestData.length + 1;
	titleArray.push("Number " + defaultValue + " by " + guestName);
	// Array 5
	sizeArray.push("1.9");
	// Array 6
	licenseArray.push('CC BY-NC-SA');
	// Ändere die Priv-Variablen
	guestData.push(authorArray.length - 1);
	guestDataCount = 1;
	guestDataView = guestData[guestData.length - guestDataCount];
	// Navi
	upID.style.visibility = "hidden";
	downID.style.visibility = "hidden";
	rightID.style.visibility = "visible";
	leftID.style.visibility = "visible";
	// SHOW KILL-ICON
	killClick.style.visibility = "visible";
	// 
 	catchModel();
};

document.getElementById("lisHelpClose").addEventListener("click", closeLisHelper, false);

document.getElementById("uploadClick").addEventListener("click", uploadFunc, false);