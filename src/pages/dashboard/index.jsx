import "./dashboard.css";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPlanet } from "../../redux/store";
import { gsap } from "gsap/gsap-core";
const descriptions = {
  Mercury:
    "Mercury is a small, barren planet with minimal atmosphere. It's scorching hot by day and freezing at night due to its lack of atmosphere.",
  Venus:
    "Venus, Earth's twin, is incredibly hot with acidic clouds. Its harsh greenhouse effect makes it the hottest planet in our solar system.",
  Earth:
    "Earth is our home, teeming with life and diverse ecosystems. It boasts water and a protective atmosphere that sustains the unique conditions for life.",
  Mars: "Mars, the 'Red Planet,' is known for its rusty, cratered surface, deep canyons, and polar ice caps, drawing attention as a potential future destination.",
  Jupiter:
    "Jupiter, a colossal gas giant, features swirling clouds and a strong magnetic field. The Great Red Spot is a prominent feature of this massive planet.",
  Saturn:
    "Saturn is renowned for its stunning ring system, composed of countless icy particles. It's a gas giant with numerous captivating moons.",
  Uranus:
    "Uranus is a peculiar, frigid gas giant that rotates on its side. It sports a faint ring system and a collection of some interesting moons.",
  Neptune:
    "Neptune, the distant blue giant, boasts icy winds and dark storms. Its active atmosphere and unique features make it an intriguing outer planet.",
  Pluto:
    "Pluto, once considered a planet, is now a dwarf planet in the Kuiper Belt. It's a frigid, distant world with a thin and mysterious atmosphere.",
};

function DashBoard() {
  const data = useSelector((state) => state.planetData);
  const dispatch = useDispatch();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const [visible, setVisible] = useState(false);

  const currentPlanet = useSelector((state) => state.currentPlanet);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );

  const renderer = useMemo(
    () => new THREE.WebGLRenderer({ antialias: true }),
    []
  );

  const controls = new OrbitControls(camera, renderer.domElement);
  useEffect(() => {
    camera.position.z = 20;
    camera.position.y = 0;
    cameraRef.current = camera;

    controls.enableDamping = true;
    controls.zoomSpeed = 0.5;
    controls.autoRotate = true;
    controls.rotateSpeed = 0.3;
    controls.minZoom = 200;
    controlsRef.current = controls;

    scene.background = new THREE.Color(0x00000);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls.update();

    function create_hundred_stars() {
      for (let i = 0; i < 2000; i++) {
        const x = (Math.random() - 0.5) * 500;
        const y = (Math.random() - 0.5) * 1000;
        const z = (Math.random() - 0.5) * 500;

        const radius = Math.random(); // Random radius for each star

        const starGeometry = new THREE.SphereGeometry(radius, 8, 8);
        const starMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color("#c3c2c4"),
        });

        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.set(x, y, z);

        scene.add(star);
      }
    }

    create_hundred_stars();

    function loadEarthModel() {
      const loader = new GLTFLoader();
      loader.load("./Earth_1_12756.glb", function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.02, 0.02, 0.02);
        model.position.set(0, 0, 0);
      });
    }
    function loadJupiterModel() {
      const loader = new GLTFLoader();
      loader.load("./Jupiter_1_142984.glb", function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.02, 0.02, 0.02);
        model.position.set(0, 50, 0);
      });
    }
    function loadMarsModel() {
      const loader = new GLTFLoader();
      loader.load("./Mars_1_6792.glb", function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.02, 0.02, 0.02);
        model.position.set(0, 100, 0);
      });
    }
    function loadMercuryModel() {
      const loader = new GLTFLoader();
      loader.load("./Mercury_1_4878.glb", function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.02, 0.02, 0.02);
        model.position.set(0, 150, 0);
      });
    }
    function loadNeptuneModel() {
      const loader = new GLTFLoader();
      loader.load("./Neptune_1_49528.glb", function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.02, 0.02, 0.02);
        model.position.set(0, 200, 0);
      });
    }
    function loadPlutoModel() {
      const loader = new GLTFLoader();
      loader.load("./Pluto_1_2374.glb", function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.02, 0.02, 0.02);
        model.position.set(0, 250, 0);
      });
    }
    function loadSaturnModel() {
      const loader = new GLTFLoader();
      loader.load("./Saturn_1_120536.glb", function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.02, 0.02, 0.02);
        model.position.set(0, 300, 0);
        model.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.5);
      });
    }
    function loadUranusModel() {
      const loader = new GLTFLoader();
      loader.load("./Uranus_1_51118.glb", function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.02, 0.02, 0.02);
        model.position.set(0, 350, 0);
      });
    }
    function loadVenusModel() {
      const loader = new GLTFLoader();
      loader.load("./Venus_1_12103.glb", function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.02, 0.02, 0.02);
        model.position.set(0, 400, 0);
      });
    }
    function addLight() {
      const sunDirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
      sunDirectionalLight.position.set(1, 1, 1);
      sunDirectionalLight.intensity = 2;
      scene.add(sunDirectionalLight);
    }

    loadEarthModel();
    loadJupiterModel();
    loadMarsModel();
    loadMercuryModel();
    loadNeptuneModel();
    loadPlutoModel();
    loadSaturnModel();
    loadUranusModel();
    loadVenusModel();

    addLight();

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  const handleBtn = (targetPosition, targetLookAt, duration) => {
    const startPosition = cameraRef.current.position.clone();
    const startLookAt = controlsRef.current.target.clone();
    controlsRef.current.enabled = false;

    const tweenPosition = gsap.to(startPosition, {
      duration: duration,
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      overwrite: "auto",
      onUpdate: () => {
        cameraRef.current.position.set(
          startPosition.x,
          startPosition.y,
          startPosition.z
        );
      },
      onComplete: () => {
        controlsRef.current.enabled = true;
      },
    });

    const tweenLookAt = gsap.to(startLookAt, {
      duration: duration,
      x: targetLookAt.x,
      y: targetLookAt.y,
      z: targetLookAt.z,
      overwrite: "auto",
      onUpdate: () => {
        controlsRef.current.target.set(
          startLookAt.x,
          startLookAt.y,
          startLookAt.z
        );
      },
    });
  };

  function handleGoUp() {
    if (currentPlanet > 0) {
      let newCurrentPlanet = currentPlanet - 1;
      let targetPosition = new THREE.Vector3(0, 0, 0);
      let targetLookAt = new THREE.Vector3(0, 0, 0);
      let duration = 2;

      if (newCurrentPlanet == 0) {
        targetPosition = new THREE.Vector3(0, 0, 20);
        targetLookAt = new THREE.Vector3(0, 0, 0);
        duration = 2;
      } else if (newCurrentPlanet == 1) {
        targetPosition = new THREE.Vector3(10, 50, 20);
        targetLookAt = new THREE.Vector3(0, 50, 0);
        duration = 2;
      } else if (newCurrentPlanet == 2) {
        targetPosition = new THREE.Vector3(0, 100, 20);
        targetLookAt = new THREE.Vector3(0, 100, 0);
        duration = 2;
      } else if (newCurrentPlanet == 3) {
        targetPosition = new THREE.Vector3(-10, 150, 20);
        targetLookAt = new THREE.Vector3(0, 150, 0);
        duration = 2;
      } else if (newCurrentPlanet == 4) {
        targetPosition = new THREE.Vector3(10, 200, 20);
        targetLookAt = new THREE.Vector3(0, 200, 0);
        duration = 2;
      } else if (newCurrentPlanet == 5) {
        targetPosition = new THREE.Vector3(0, 250, 20);
        targetLookAt = new THREE.Vector3(0, 250, 0);
        duration = 2;
      } else if (newCurrentPlanet == 6) {
        targetPosition = new THREE.Vector3(-10, 305, 25);
        targetLookAt = new THREE.Vector3(0, 300, 0);
        duration = 2;
      } else if (newCurrentPlanet == 7) {
        targetPosition = new THREE.Vector3(10, 350, 20);
        targetLookAt = new THREE.Vector3(0, 350, 0);
        duration = 2;
      } else if (newCurrentPlanet == 8) {
        targetPosition = new THREE.Vector3(0, 400, 20);
        targetLookAt = new THREE.Vector3(0, 400, 0);
        duration = 2;
      }

      handleBtn(targetPosition, targetLookAt, duration);

      dispatch(setCurrentPlanet(currentPlanet - 1));
    }
  }

  function handleGoDown() {
    if (currentPlanet < 8) {
      let newCurrentPlanet = currentPlanet + 1;
      let targetPosition = new THREE.Vector3(0, 0, 0);
      let targetLookAt = new THREE.Vector3(0, 0, 0);
      let duration = 2;

      if (newCurrentPlanet == 0) {
        targetPosition = new THREE.Vector3(0, 0, 20);
        targetLookAt = new THREE.Vector3(0, 0, 0);
        duration = 2;
      } else if (newCurrentPlanet == 1) {
        targetPosition = new THREE.Vector3(10, 50, 20);
        targetLookAt = new THREE.Vector3(0, 50, 0);
        duration = 2;
      } else if (newCurrentPlanet == 2) {
        targetPosition = new THREE.Vector3(0, 100, 20);
        targetLookAt = new THREE.Vector3(0, 100, 0);
        duration = 2;
      } else if (newCurrentPlanet == 3) {
        targetPosition = new THREE.Vector3(-10, 150, 20);
        targetLookAt = new THREE.Vector3(0, 150, 0);
        duration = 2;
      } else if (newCurrentPlanet == 4) {
        targetPosition = new THREE.Vector3(10, 200, 20);
        targetLookAt = new THREE.Vector3(0, 200, 0);
        duration = 2;
      } else if (newCurrentPlanet == 5) {
        targetPosition = new THREE.Vector3(0, 250, 20);
        targetLookAt = new THREE.Vector3(0, 250, 0);
        duration = 2;
      } else if (newCurrentPlanet == 6) {
        targetPosition = new THREE.Vector3(-10, 305, 25);
        targetLookAt = new THREE.Vector3(0, 300, 0);
        duration = 2;
      } else if (newCurrentPlanet == 7) {
        targetPosition = new THREE.Vector3(10, 350, 20);
        targetLookAt = new THREE.Vector3(0, 350, 0);
        duration = 2;
      } else if (newCurrentPlanet == 8) {
        targetPosition = new THREE.Vector3(0, 400, 20);
        targetLookAt = new THREE.Vector3(0, 400, 0);
        duration = 2;
      }
      handleBtn(targetPosition, targetLookAt, duration);
      dispatch(setCurrentPlanet(currentPlanet + 1));
    }
  }

  useEffect(() => {
    const planetHeading = document.getElementsByClassName("planet-heading");
    const arrows = document.getElementsByClassName("arrow");
    const realName = document.getElementsByClassName("real-name-item");
    const gravityvalues = document.getElementsByClassName("g-value");
    const densityvalues = document.getElementsByClassName("density-value");
    const surfaceTemp = document.getElementsByClassName("temp-item");
    const moonlist = document.getElementsByClassName("moon-list-item");
    const escapelist = document.getElementsByClassName("escapeVelocity-value");
    const bodytypelist = document.getElementsByClassName("bodyType");
    const interfaceBtn = document.getElementById("interfaceBtnId");
    const planatarium = document.getElementsByClassName(
      "planatarium-container"
    );
    const planatariumlist = document.getElementsByClassName("planatarium-list");
    const planatariumlistkeys =
      document.getElementsByClassName("planatarium-key");
    const planatariumlistvalues =
      document.getElementsByClassName("planatarium-value");
    const planatariumrellink = document.getElementsByClassName("rel-link");

    let translateY = -200 * currentPlanet;
    if (window.innerWidth < 576) {
      translateY = -230 * currentPlanet;
    }
    const translateYRealName = -24 * currentPlanet;
    const translateYGravity = -75 * currentPlanet;
    const translateYDensity = -60 * currentPlanet;
    const translateYTemp = -24 * currentPlanet;
    const translateYMoon = -108 * currentPlanet;
    const translateYEscape = -24 * currentPlanet;
    const translateXBody = -24 * currentPlanet;

    for (let i = 0; i < planetHeading.length; i++) {
      planetHeading[i].style.transform = `translateY(${translateY}px)`;
      setTimeout(() => {
        realName[i].style.transform = `translateY(${translateYRealName}px)`;
      }, 100);
      setTimeout(() => {
        escapelist[i].style.transform = `translateY(${translateYEscape}px)`;
      }, 200);
      setTimeout(() => {
        surfaceTemp[i].style.transform = `translateY(${translateYTemp}px)`;
      }, 300);
      setTimeout(() => {
        densityvalues[i].style.transform = `translateY(${translateYDensity}px)`;
      }, 400);
      setTimeout(() => {
        gravityvalues[i].style.transform = `translateY(${translateYGravity}px)`;
      }, 500);
      setTimeout(() => {
        moonlist[i].style.transform = `translateY(${translateYMoon}px)`;
      }, 600);
      setTimeout(() => {
        bodytypelist[i].style.transform = `translateX(${translateXBody}px)`;
      }, 700);
    }

    if (data.length > 0) {
      let color = "";
      if (currentPlanet == 0) {
        document.getElementsByClassName("moon-container")[0].style.color =
          "#76b852";
        document.getElementsByClassName("moon-label")[0].style.color =
          "#76b852";
        color = "#76b852";
      } else if (currentPlanet == 1) {
        document.getElementsByClassName("moon-container")[0].style.color =
          "#D1913C";
        document.getElementsByClassName("moon-label")[0].style.color =
          "#D1913C";

        color = "#D1913C";
      } else if (currentPlanet == 2) {
        document.getElementsByClassName("moon-container")[0].style.color =
          "#f46b45";
        document.getElementsByClassName("moon-label")[0].style.color =
          "#f46b45";

        color = "#f46b45";
      } else if (currentPlanet == 3) {
        document.getElementsByClassName("moon-container")[0].style.color =
          "#304352";
        document.getElementsByClassName("moon-label")[0].style.color =
          "#304352";

        color = "#304352";
      } else if (currentPlanet == 4) {
        document.getElementsByClassName("moon-container")[0].style.color =
          "#005c97";
        document.getElementsByClassName("moon-label")[0].style.color =
          "#005c97";

        color = "#005c97";
      } else if (currentPlanet == 5) {
        document.getElementsByClassName("moon-container")[0].style.color =
          "#8c1105";
        document.getElementsByClassName("moon-label")[0].style.color =
          "#8c1105";

        color = "#8c1105";
      } else if (currentPlanet == 6) {
        document.getElementsByClassName("moon-container")[0].style.color =
          "#f97d5b";
        document.getElementsByClassName("moon-label")[0].style.color =
          "#f97d5b";

        color = "#f97d5b";
      } else if (currentPlanet == 7) {
        document.getElementsByClassName("moon-container")[0].style.color =
          "#1c92d2";
        document.getElementsByClassName("moon-label")[0].style.color =
          "#1c92d2";

        color = "#1c92d2";
      } else if (currentPlanet == 8) {
        document.getElementsByClassName("moon-container")[0].style.color =
          "#ffe700";
        document.getElementsByClassName("moon-label")[0].style.color =
          "#ffe700";

        color = "#ffe700";
      }
      arrows[0].style.color = color;
      arrows[1].style.color = color;
      interfaceBtn.style.backgroundColor = color;

      planatarium[0].style.color = color;
      planatariumlist[0].style.border = `1px solid ${color}`;
      planatariumrellink[0].style.color = color;
      for (let i = 0; i < planatariumlistkeys.length; i++) {
        planatariumlistkeys[i].style.border = `1px solid ${color}`;
      }
      for (let i = 0; i < planatariumlistvalues.length; i++) {
        planatariumlistvalues[i].style.border = `1px solid ${color}`;
      }
    }
  }, [currentPlanet, data]);

  function togglePlanatarium() {
    setVisible((visible) => !visible);
  }

  useEffect(() => {
    const planatarium = document.getElementsByClassName(
      "planatarium-container"
    );
    const planatariumlist = document.getElementsByClassName("planatarium-list");
    if (visible) {
      planatarium[0].style.animation =
        "animata-fadeIn 0.3s linear 0s 1 forwards";
      planatariumlist[0].style.pointerEvents = "all";
    }
    if (!visible) {
      planatarium[0].style.animation =
        "animata-fadeAway 0.3s linear 0s 1 forwards";
      planatariumlist[0].style.pointerEvents = "none";
    }
  }, [visible]);

  return (
    <>
      <div className="dashboard-container">
        <ul className="bodyType-container">
          {data?.map((planet, index) => (
            <li className={"bodyType " + planet.englishName} key={"b-" + index}>
              {planet.isPlanet ? "Planet" : "Dwarf Planet"}
            </li>
          ))}
        </ul>
        <ul className="avg-temp-container">
          {data?.map((planet, index) => (
            <li
              key={"temp-" + index}
              className={"temp-item " + planet.englishName}
            >
              {planet.avgTemp} °F
            </li>
          ))}
        </ul>

        <div className="moon-container">
          <div className="moon-label">Moons</div>
          <ul className="moon-list">
            {data?.map((planet, index) => (
              <li key={"planet-moon-" + index} className="moon-list-item">
                <ul className="planet-moon-list">
                  {planet.moons?.map(
                    (moon, moonIndex) =>
                      moonIndex < 4 && (
                        <li key={"moon-" + moonIndex} className="moon">
                          {moon.moon}
                        </li>
                      )
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="escapeVelocity-container">
          <ul className="escapeVelocity-value-container">
            {data?.map((planet, index) => (
              <li
                className={"escapeVelocity-value " + planet.englishName}
                key={"e-" + index}
              >
                <span className="escapeVelocity-title">v | </span>
                {Math.round((planet.escape / 1000) * 100) / 100} km/s
              </li>
            ))}
          </ul>
        </div>
        <div className="gravity-container">
          <ul className="g-value-container">
            {data?.map((planet, index) => (
              <li
                className={"g-value " + planet.englishName}
                key={"g-" + index}
              >
                <span className="g">g</span> <span className="slash">|</span>
                <span>
                  {" "}
                  {planet.gravity} m/s
                  <sup className={planet.englishName}>2</sup>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-container row h-100 m-0 p-0">
          <div className="real-name">
            <ul className="planet-name-container">
              {data?.map((planet, index) => (
                <li
                  className={"real-name-item " + planet.englishName}
                  key={"rname-" + index}
                >
                  {planet.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="density-container">
            <ul className="density-value-container">
              {data?.map((planet, index) => (
                <li
                  className={"density-value " + planet.englishName}
                  // id={planet.englishName + "DensityId"}
                  key={"d-" + index}
                >
                  <span className="density-title">¯ρ |</span>{" "}
                  {/* round up to 2 decimals  */}
                  {Math.round(planet.density * 100) / 100} g/cm
                  <sup className={planet.englishName}>3</sup>
                </li>
              ))}
            </ul>
          </div>

          <div className="up-arrow arrow" onClick={handleGoUp}>
            ^
          </div>
          <div className="down-arrow arrow" onClick={handleGoDown}>
            ^
          </div>
          <div className="main-heading col-6 w-100 ps-5 pe-5 d-flex align-items-center justify-content-center">
            <div className="content-container">
              <ul className="planet-heading-container text-center">
                {data?.map((planet, index) => (
                  <li
                    className={"planet-heading " + planet.englishName}
                    key={"h-" + index}
                  >
                    {planet.englishName}
                    <p className={"planet-description " + planet.englishName}>
                      {descriptions[planet.englishName]}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="expandBtnContainer">
                <button id="interfaceBtnId" onClick={togglePlanatarium}>
                  Interface Planatarium
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="planatarium-container row h-100 m-0 p-0 d-lg-flex d-none justify-content-center align-items-center">
        <div className="planatarium-list row w-50 m-0 p-0">
          {data.length > 0
            ? Object.keys(data[currentPlanet]).map((key, index) => (
                <div
                  className="col-12 row m-0 p-0"
                  key={"planetDetailsKey-" + index}
                >
                  <div className="col-6 m-0 ps-1 pe-1 p-0 planatarium-key">
                    {key}
                  </div>
                  <div className="col-6 m-0 ps-1 pe-1 p-0 planatarium-value">
                    {(() => {
                      const key = Object.keys(data[currentPlanet])[index];
                      const value = data[currentPlanet][key];

                      switch (key) {
                        case "moons":
                          return value ? value.length : "N/A";
                        case "mass":
                          return value
                            ? `${value.massValue} x 10^${value.massExponent}`
                            : "N/A";
                        case "vol":
                          return value
                            ? `${value.volValue} x 10^${value.volExponent}`
                            : "N/A";
                        case "rel":
                          return value ? (
                            <a className="rel-link" href={value}>
                              more
                            </a>
                          ) : (
                            "N/A"
                          );
                        default:
                          if (typeof value === "boolean") {
                            return value ? "True" : "False";
                          }
                          return value ? value : "N/A";
                      }
                    })()}
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
