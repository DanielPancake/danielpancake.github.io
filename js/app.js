// Drawing that cool background
var home = document.getElementById("home");
function homeGetWidth() { return home.innerWidth || home.clientWidth; }
function homeGetHeight() { return home.innerHeight || home.clientHeight; }

var clock = new THREE.Clock();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, homeGetWidth() / homeGetHeight());
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.15));
renderer.setSize(home.offsetWidth, home.offsetHeight - 8);

var geometry = new THREE.TorusGeometry(30, 20, 36, 100);
var material = new THREE.ShaderMaterial({
    vertexShader: [
        "varying vec2 vUv;",
        "varying vec3 vPos;",
        "uniform float uTime;",
        
        "void main() {",
        "float time = uTime * 0.05;",
        "vUv = uv;",
    
        "vec3 transformed = position;",
        "transformed.x *= 1.5;",
        "transformed += sin((position.x / 25.0 - time) * 5.0);",
        "transformed += cos((position.y / 25.0 - time) * 5.0);",
    
        "vPos = transformed;",
    
        "gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.5);",
        "}"].join("\n"),
    fragmentShader: [
        "varying vec2 vUv;",
        "varying vec3 vPos;",
        "uniform float uTime;",
        "uniform sampler2D uTexture;",
        
        "void main() {",
        "float time = uTime * 0.05;",
        "vec2 uv = vUv;",
        "vec2 repeat = vec2(1.0, 8.0);",
        "uv = fract(uv * repeat - vec2(time / 3.0, time));",

        "vec4 tex = texture2D(uTexture, uv);",
        "tex.a *= clamp(vPos.z / 20.0, 0.0, 1.0);",
        
        "gl_FragColor = tex;",
        "}"].join("\n"),
    uniforms: {
        uTime: { value: 0 },
        uTexture: {
            value: new THREE.TextureLoader().load("./images/genius.png")
        }
    },
    transparent: true
});

var shape = new THREE.Mesh(geometry, material);
shape.position.z = -20;
scene.add(shape);

home.prepend(renderer.domElement);

function animate() {
    renderer.render(scene, camera);
    material.uniforms.uTime.value = clock.getElapsedTime();
    requestAnimationFrame(animate);
}

animate();

function resize() {
    camera.aspect = homeGetWidth() / homeGetHeight();
    camera.updateProjectionMatrix();
    renderer.setSize(homeGetWidth(), homeGetHeight());
}

window.onresize = () => resize();
window.onload = () => resize();

// Portfolio section
function Project(title="", brief="", description="", banner="", bannerPosition="center") {
    return {
        title: title,
        brief: brief,
        description: description, // HTML
        banner: banner,
        bannerPosition: bannerPosition
    };
}

var projectData = [
    new Project(
        "ShinyInu",
        "Dungeon generator for GameMaker Studio",
        `<p>ShinyInu is an android gallery app that shows random pictures of Shiba Inu from <a target="_blank" href="https://shibe.online">shibe.online</a> website.</p>
        <br>
        <p>Features:</p>
        <p>- Open-source android application</p>
        <p>- Images can be saved to favourite collection</p>
        <p>- A good mood after each cute and fluffy Shiba is guaranteed :)</p>
        <p>- Built-in image viewer</p>
        <br>
        <p>Download release .apk file from <a target="_blank" href="https://github.com/danielpancake/shinyinu/releases">_github_</a></p>
        <p>ShinyInu's repository is available on <a target="_blank" href="https://github.com/danielpancake/shinyinu">_github_</a></p>`,
        "shiny"
    ),

    new Project(
        "gmdungeon",
        "Procedural dungeon generator for GameMaker Studio 2",
        `<p><span>gmdungeon</span> is a dungeon template generating asset for GameMaker: Studio 1.4 and GameMaker Studio 2</p>
        <br>
        <p>This asset can be used in projects that require the procedual generation of dungeons. It's pretty easy to use!</p>
        <br>
        <p>Features:</p>
        <p>- Procedual generated dungeon</p>
        <p>- Ability to add icons to be displayed on the minimap and custom types of the rooms</p>
        <p>- Masks can be used to define shape of the dungeon</p>
        <br>
        <p>Project is available on <a target="_blank" href="https://github.com/danielpancake/gmdungeon">_github_</a></p>`,
        "dungeon"
    ),

    new Project(
        "Dr.Helper",
        "A game for Ludum Dare 42 competition",
        `<p>"Do you want to remove a dangerous virus from your computer, but can't afford expensive software licences? Let us introduce our latest invention - the best free antivirus software, made in the span of just two days - Dr. Helper. He knows more than 1.000.000 types of malwares, 350.000 types of spywares and tons of jokes!</p>
        <br>
        <p>If there is a problem, Dr. Helper can help you! He will help not only you, but your friends and even your grandma defeat any type of computer, microwave and java-based mobile phone viruses.</p>
        <br>
        <p>Keep viruses away, get Dr.Helper today!"</p>
        <br>
        <p>In 2018, I entered Ludum Dare 42 competition. It was my first experience in game speed-development.</p>
        <br>
        <p>Dr.Helper is available on <a target="_blank" href="https://gamejolt.com/games/drhelper/361111">_gamejolt_</a></p>`,
        "drhelper"
    ),

    new Project(
        "Cubicus",
        "Weird indie demo",
        `<p>"Someone who looks like the devil himself appears on the screen of your computer. He says that something is broken. Should you listen to him? What can this lead us to? You have to find out."</p>
        <br>
        <p>This is the description of my first game ever made. It's weird but still I like it. It was very intersting experience.</p>
        <br>
        <p>Cubicus is available on <a target="_blank" href="https://gamejolt.com/games/nocubicus/260121">_gamejolt_</a></p>`,
        "old"
    ),

    new Project(
        "Epic dungeon game",
        "Grid-based dungeon rpg",
        `<p>Monsters and explostions ahead! This is a game which takes place in the underground world. Only devlog is available for now.</p>
        <br>
        <p>Devlog is available on <a target="_blank" href="https://gamejolt.com/games/edg/507835">_gamejolt_</a></p>`,
        "edg"
    ),

    new Project(
        "TEDxYouth at Limassol",
        "⋆ Beyound!",
        `<p>I made a webpage for the TEDxYouth event @ Agiou Andreou.</p>
        <br>
        <p>Check it out <a target="_blank" href="https://danielpancake.github.io/tedxyouth-agiouandreou">here</a> or on <a target="_blank" href="https://github.com/danielpancake/tedxyouth-agiouandreou">_github_</a></p>`,
        "tedxyouth",
        "right"
    ),

    new Project(
        "spongebob-search",
        '"In which episode did they say that?.."',
        `<p>spongebob-search is CLI with which you can search through transcripts from SpongeBob wiki page.</p>
        <br>
        <p>You can find it on the <a target="_blank" href="https://github.com/danielpancake/spongebobsearch">_github_</a></p>`,
        "sponge"
    ),
    
    new Project(
        "Even this webpage",
        "yeah, it's open-source too",
        '<p>The source code of this webpage is available on <a target="_blank" href="https://github.com/danielpancake/danielpancake.github.io">_github_</a></p>',
        "little_website",
        "right"
    ),
];

// Appending projects to portfolio
var projects = document.getElementById("projects");
for (let project of projectData) {
    projects.innerHTML += Mustache.render(
        '<li class="toggle withBorder projectBanner" style="background: url(images/projects/{{banner}}.png); background-position: {{bannerPosition}};"><div class="shape"><div></div><p><span class="title">{{title}}</span><br>{{brief}}</p></div></li><div class="inner withBorder description">{{{description}}}</div>',
        project
    );
}

// Changing example name
var nameList = ["Alexander", "Danila", "Steve", "Maria", "David", "Henry", "Owen", "Daisy", "Daniel", "George", "Dolores", "Yaraslava", "Oscar", "Jacob"];

var nameListPos = 0;
var nameListLength = nameList.length;

let nameInput = document.getElementById("name");
setInterval(() => {
    nameListPos = ++nameListPos % nameListLength;
    nameInput.placeholder = "* For example, " + nameList[nameListPos];
}, 5000);

// Sending feedback
function sendemail(name, email, subject, body) {
    var message = name + " wrote to you: " + body;
    if (email != "") { message += "Write back, " + email; }
    Email.send({
        SecureToken: "2d60c5e6-b738-4a95-8e38-45075cf81d32",
        To: "inboxpancake@gmail.com",
        From: "inboxpancake@gmail.com",
        Subject: subject,
        Body: message
    }).then((response) => {
        if (response == "OK") {
            alert(`❤ Thank you for your letter, ${name}!`);
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("body").value = "";
            window.scrollTo(0, 0);
        } else {
            alert("< ! > Error occurred!");
        }
    });
}

function sendfeedback() {
    sendemail(document.getElementById("name").value, document.getElementById("email").value,
        document.getElementById("subject").value, document.getElementById("body").value);
}