import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols";
import { gsap } from "gsap/gsap-core";
import "./welcome.css";
import { useDispatch } from "react-redux";
import { setRouteLocation } from "../../redux/store";
export default function Welcome() {
  const dispatch = useDispatch();

  const renderer = useMemo(
    () => new THREE.WebGLRenderer({ antialias: true }),
    []
  );

  const camera = useMemo(
    () =>
      new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
        0.1,
        450
      ),
    []
  );
  camera.position.z = -5000;
  camera.lookAt(0, 0, 5000);

  const controls = useMemo(
    () => new OrbitControls(camera, renderer.domElement),
    [camera, renderer.domElement]
  );

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    scene.add(camera);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls.enableDamping = true;
    controls.target.set(0, 0, 1000);
    controls.zoomSpeed = 0.005;
    controls.update();

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      if (camera.position.z >= 5000) {
        camera.position.z = -5000;
        moveCameraTo(camera, new THREE.Vector3(0, 0, 5000), 100);
      } else if (camera.position.z <= -5000) {
        camera.position.z = 5000;
        moveCameraTo(camera, new THREE.Vector3(0, 0, -5000), 100);
      }
      renderer.render(scene, camera);
    }
    animate();

    function addReferenceObjects() {
      for (let i = 0; i < 5000; i++) {
        const geometrySphere = new THREE.SphereGeometry(1, 32, 32);
        const materialSphere = new THREE.MeshBasicMaterial({ color: "white" });
        const sphere = new THREE.Mesh(geometrySphere, materialSphere);
        sphere.position.x = Math.random() * 70 - 35;
        sphere.position.y = Math.random() * 70 - 35;
        sphere.position.z = Math.random() * 10000 - 5000;
        scene.add(sphere);
        const scale = Math.random() * 0.25;
        sphere.scale.x = scale;
        sphere.scale.y = scale;
        sphere.scale.z = scale;
      }
    }
    addReferenceObjects();
    moveCameraTo(new THREE.Vector3(0, 0, 5000), 150);
  }, [camera, controls, renderer]);

  function moveCameraTo(targetPosition, duration) {
    gsap.to(camera.position, {
      duration: duration,
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      onUpdate: () => {
        camera.position.copy(camera.position);
      },
    });
  }

  function handleEnter() {
    const welcomeContainer = document.getElementById("welcomeContainerId");
    welcomeContainer.style.animation =
      "animata-fadeAway 0.3s linear 0s 1 forwards";
    const canvas = document.getElementsByTagName("canvas");
    setTimeout(
      () =>
        (canvas[0].style.animation =
          "animata-fadeAway 0.3s linear 0s 1 forwards"),
      300
    );

    setTimeout(() => {
      canvas[0].style.display = "none";
      canvas[0].remove();
      welcomeContainer.style.display = "none";
      dispatch(setRouteLocation(1));
    }, 700);
  }
  return (
    <>
      <div className="welcome-container" id="welcomeContainerId">
        <div className="welcome-title">
          <div className="welcome-to">Welcome to</div>
          <div className="welcome-name">Cosmic Route</div>
          <div className="vapor-squad text-end">by vaporSquad</div>
        </div>

        <button className="enterBtn" onClick={handleEnter}>
          Enter The Experience
        </button>

        <div className="strip-container top-right-strip">
          <div
            className="strip strip-one"
            onClick={() =>
              window.open("https://github.com/malikgaurav626/", "_blank")
            }
          >
            Github
          </div>
          <div
            className="strip strip-two"
            onClick={() =>
              window.open(
                "https://github.com/malikgaurav626?tab=repositories",
                "_blank"
              )
            }
          >
            Other Projects
          </div>
          <div
            className="strip strip-three"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/malikgaurav626/",
                "_blank"
              )
            }
          >
            LinkedIn
          </div>
        </div>
        <div className="strip-container bottom-left-strip">
          <div
            className="strip strip-one"
            onClick={() =>
              window.open(
                "https://github.com/malikgaurav626/cosmicRoute",
                "_blank"
              )
            }
          >
            Source Code
          </div>
          <div
            className="strip strip-two"
            onClick={() =>
              window.open("https://twitter.com/gauravm444", "_blank")
            }
          >
            X
          </div>
          <div
            className="strip strip-three"
            onClick={() =>
              window.open("https://instagram.com/malik_aryan_58", "_blank")
            }
          >
            Instagram
          </div>
        </div>
      </div>
    </>
  );
}
